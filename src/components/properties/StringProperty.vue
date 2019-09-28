<template>
  <text-input
    @input="eventHandler($event, 'input')"
    @change="eventHandler($event, 'change')"
    @blur="eventHandler($event, 'blur')"
    :label="title"
  />
</template>
<script>
import TextInput from "../controls/TextInput";

// v-for="(name, index) in propertyNames"
// v-bind:is="getProperty(name).type"
// :key="getProperty(name).type + '-' + index"
// :value.sync="formData[name]"
// :title="getProperty(name).title"
// :description="getProperty(name).description"
// :min-length="getProperty(name).minLength"
// :max-length="getProperty(name).maxLength"
// :pattern="getProperty(name).pattern"
// :format="getProperty(name).format"

export default {
  name: "string",
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  components: {
    "text-input": TextInput
  },
  data() {
    return { event: "input, change" };
  },
  methods: {
    eventHandler(event, type) {
      const { value } = event.target;

      if (value === this.value) return;

      this.$emit("update:value", value);
    }
  }
};
</script>
