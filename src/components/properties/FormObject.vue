<template>
  <component v-bind:is="layout" :title="title">
    <component
      v-for="(name, index) in propertyNames"
      v-bind:is="getProperty(name).type.toLowerCase()"
      :key="getProperty(name).type + '-' + index"
      :value.sync="formData[name]"
      :title="getProperty(name).title"
      :description="getProperty(name).description"
      :min-length="getProperty(name).minLength"
      :max-length="getProperty(name).maxLength"
      :pattern="getProperty(name).pattern"
      :format="getProperty(name).format"
    />
  </component>
</template>
<script>
import FormLayout from "../layout/FormLayout";
import SubFormLayout from "../layout/SubFormLayout";
import StringProperty from "./StringProperty";

export default {
  name: "form-object",
  props: {
    isRoot: {
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
    displayOptions: {
      type: Object,
      default: _ => ({})
    },
    value: {
      type: Object,
      default: _ => ({})
    }
  },
  components: {
    "form-layout": FormLayout,
    "sub-form-layout": SubFormLayout,
    string: StringProperty
  },
  data() {
    return {
      formData: {}
    };
  },
  mounted() {
    this.mapNamesToValues();
    this.mergeValues();
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
    mapNamesToValues() {
      // TODO : Expand conditions beyond string and object types
      for (let name of this.propertyNames) {
        this.$set(
          this.formData,
          name,
          this.getProperty(name).type.toLowerCase() === "string" ? "" : {}
        );
      }
    },
    mergeValues() {
      return Object.assign(this.formData, this.value);
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
