<template>
  <component v-bind:is="layout" :title="title">
    <component
      v-for="(name, index) in propertyNames"
      v-bind:is="`p-${getProperty(name).type.toLowerCase()}`"
      :key="getProperty(name).type + '-' + index"
      :value.sync="formData[name]"
      v-bind="getProperty(name)"
      :options="getOptions(name)"
      :name="name"
      :is-valid.sync="validData[name]"
      :required="isRequired(name)"
    />
    <template v-if="isRoot" v-slot:footer>
      <button @click.prevent="submitForm">Submit</button>
    </template>
  </component>
</template>
<script>
import cloneDeep from "lodash/cloneDeep";
import FormLayout from "@/components/layout/form/FormLayout/FormLayout";
import SubFormLayout from "@/components/layout/form/SubFormLayout/SubFormLayout";
import StringProperty from "@/components/properties/StringProperty/StringProperty";

export default {
  name: "p-object",
  props: {
    isRoot: {
      type: Boolean,
      default: false
    },
    isFormValid: {
      type: Boolean,
      default: false
    },
    properties: {
      type: Object,
      default: _ => ({})
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: _ => ({})
    },
    value: {
      type: Object,
      default: _ => ({})
    },
    isValid: {
      type: Object,
      default: _ => ({})
    },
    required: {
      type: [Array, Boolean],
      default: _ => []
    }
  },
  components: {
    "form-layout": FormLayout,
    "sub-form-layout": SubFormLayout,
    "p-string": StringProperty
  },
  data() {
    return {
      formData: cloneDeep(this.value) || {},
      validData: {}
    };
  },
  mounted() {
    this.mapNamesToValues();
  },
  computed: {
    layout() {
      return this.isRoot ? "form-layout" : "sub-form-layout";
    },
    propertyNames() {
      return Object.keys(this.properties);
    }
  },
  methods: {
    getProperty(name) {
      return this.properties[name];
    },
    getOptions(name) {
      return this.options[name];
    },
    isRequired(name) {
      const property = this.getProperty(name);

      if (property.type === "object" && !property.required) return false;
      if (property.required) return property.required;

      return this.required && this.required.find(p => name === p)
        ? true
        : false;
    },
    mapNamesToValues() {
      // TODO : Expand conditions beyond string and object types
      for (let name of this.propertyNames) {
        const property = this.getProperty(name);
        const type = property.type.toLowerCase();

        switch (type) {
          case "object":
            this.$set(this.formData, name, this.value[name] || {});
            this.$set(this.validData, name, this.validData[name] || {});
            break;
          case "array":
            this.$set(this.formData, name, this.value[name] || []);
            this.$set(this.validData, name, []);
            break;
          default:
            this.$set(this.formData, name, this.value[name] || "");
            this.$set(this.validData, name, true);
        }
      }
    },
    checkValidity() {
      return this.$children.reduce((isValid, child) => {
        const { type } = child.$attrs;

        if (type === "object" || type === "array") {
          return child.checkValidity() && isValid;
        } else {
          return child.isValid && isValid;
        }
      }, true);
    },
    submitForm() {
      this.$emit("submitting", this.checkValidity());
    }
  },
  watch: {
    formData: {
      deep: true,
      handler(newValue) {
        this.$emit("update:value", newValue);
      }
    }
  }
};
</script>
