import TextInput from "@/components/controls/TextInput/TextInput";
import SelectInput from "@/components/controls/SelectInput/SelectInput";
import validationMixin from './validationMixin';

export default {
  mixins: [validationMixin],
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
    },
  },
  components: {
    "text-input": TextInput,
    "select-input": SelectInput
  },
  methods: {
    eventHandler(event, type) {
      const { value } = event.target;

      if ((type === "input" || type === "change") && value === this.value)
        return;

      if (type === "input" && !this.options.lazy && !this.enum) {
        this.$emit("update:value", value);
        this.updateValidity();
      } else if (type === "change" && (this.options.lazy || this.enum)) {
        this.$emit("update:value", value);
        this.updateValidity();
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
    },
  },
  computed: {
    component() {
      return this.enum ? "select-input" : "text-input";
    },
    label() {
      return this.title || this.name;
    },
  },
  mounted() {
    this.updateValidity();
  },
};
