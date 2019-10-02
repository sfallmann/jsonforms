<template>
  <component v-bind:is="layout" :title="title">
    <component
      v-for="(name, index) in propertyNames"
      v-bind:is="getComponent(name)"
      :key="getProperty(name).type + '-' + index"
      :value.sync="formData[name]"
      v-bind="getProperty(name)"
      :options="getOptions(name)"
      :name="name"
      :is-valid.sync="validData[name]"
      :required="isRequired(name)"
      :uniqueItems="uniqueItems"
    />
    <a href="#" v-if="showAddButton">Add another</a>
    <template v-if="isRoot" v-slot:footer>
      <button @click.prevent="submitForm">Submit</button>
    </template>
  </component>
</template>
<script>
import cloneDeep from "lodash/cloneDeep";
import FormLayout from "@/components/layout/form/FormLayout/FormLayout";
import SubFormLayout from "@/components/layout/form/SubFormLayout/SubFormLayout";
import SimpleProperty from "@/components/properties/SimpleProperty/SimpleProperty";
import { isArray } from "util";

export default {
  name: "complex-property",
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
    items: {
      type: [Object, Array]
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
      type: [Object, Array],
      default: _ => ({})
    },
    isValid: {
      type: [Object, Array],
      default: _ => ({})
    },
    required: {
      type: [Array, Boolean],
      default: _ => []
    },
    minItems: {
      type: Number,
      default: 0
    },
    maxItems: {
      type: Number,
      default: Infinity
    },
    uniqueItems: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "form-layout": FormLayout,
    "sub-form-layout": SubFormLayout,
    "simple-property": SimpleProperty
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
      if (!this.isArray) return Object.keys(this.properties);

      const itemKeys = Object.keys(this.items);
      if (!this.value) return itemKeys;

      const valueKeys = Object.keys(this.value);
      return valueKeys.length <= itemKeys.length ? itemKeys : valueKeys;
    },
    isArray() {
      return this.items;
    },
    showAddButton() {
      if (!this.isArray) return false;

      const numOfItems = this.propertyNames.length;
      if (numOfItems < this.minItems || numOfItems >= this.maxItems)
        return false;

      return true;
    }
  },
  methods: {
    getComponent(name) {
      const { type } = this.isArray
        ? this.getArrayItem(name)
        : this.properties[name];

      return type === "object" || type === "array"
        ? "complex-property"
        : "simple-property";
    },
    getProperty(name) {
      return this.isArray ? this.getArrayItem(name) : this.properties[name];
    },
    getArrayItem(name) {
      if (this.items[name] === undefined) {
        const newItem = cloneDeep(this.items[this.propertyNames[0]]);
        return newItem;
      }
      return this.items[name];
    },
    getOptions(name) {
      if (!this.isArray || this.items[name]) return this.options[name];

      if (this.items[name] === undefined && this.isArray) {
        const newOptions = cloneDeep(this.options[this.propertyNames[0]]);
        return newOptions;
      }
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
