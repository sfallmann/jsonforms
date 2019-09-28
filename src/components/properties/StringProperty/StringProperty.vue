<template>
  <text-input
    @input="eventHandler($event, 'input')"
    @change="eventHandler($event, 'change')"
    @blur="eventHandler($event, 'blur')"
    @focus="eventHandler($event, 'focus')"
    :label="title"
    v-bind="options"
  />
</template>
<script>
import TextInput from "../../controls/TextInput/TextInput";

export default {
  name: "p-string",
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: _ => ({})
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

      if ((type === "input" || type === "change") && value === this.value)
        return;

      if (type === "input" && !this.options.lazy) {
        this.$emit("update:value", value);
      } else if (type === "change" && this.options.lazy) {
        this.$emit("update:value", value);
      } else {
        this.$emit(type, event);
      }
    }
  }
};
</script>
