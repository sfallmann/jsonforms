<template>
  <component
    v-bind:is="component"
    @input="eventHandler($event, 'input')"
    @change="eventHandler($event, 'change')"
    @blur="eventHandler($event, 'blur')"
    @focus="eventHandler($event, 'focus')"
    :label="label"
    v-bind="options"
    :options="mappedEnum()"
  />
</template>
<script>
import TextInput from "../../controls/TextInput/TextInput";
import SelectInput from "../../controls/SelectInput/SelectInput";

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
    name: {
      type: String,
      default: ""
    },
    enum: {
      type: Array,
      default: _ => null
    },
    options: {
      type: Object,
      default: _ => ({})
    }
  },
  components: {
    "text-input": TextInput,
    "select-input": SelectInput
  },
  data() {
    return { event: "input, change" };
  },
  methods: {
    eventHandler(event, type) {
      const { value } = event.target;

      if ((type === "input" || type === "change") && value === this.value)
        return;

      if (type === "input" && !this.options.lazy && !this.enum) {
        this.$emit("update:value", value);
      } else if (type === "change" && (this.options.lazy || this.enum)) {
        this.$emit("update:value", value);
      } else {
        this.$emit(type, event);
      }
    },
    mappedEnum() {
      if (!this.enum) return;

      return this.enum.map((value, index) => {
        return {
          value,
          text: this.options.enumText ? this.options.enumText[index] : value
        };
      });
    }
  },
  computed: {
    component() {
      return this.enum ? "select-input" : "text-input";
    },
    label() {
      return this.title || this.name;
    }
  }
};
</script>
