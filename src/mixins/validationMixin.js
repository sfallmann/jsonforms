export default {
  props: {
    isValid: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValidity() {
      this.$nextTick(() => {
        this.$emit("update:isValid", this.currentValidity, this.value);
      });
    }
  },
  computed: {
    isRequiredSatisfied() {
      let validFlag = !this.required
        ? true
        : this.value === "" || this.value === undefined
        ? false
        : true;
      return validFlag;
    },
    currentValidity() {
      let validFlag = this.isRequiredSatisfied;

      // TODO: Add more validation!
      return validFlag;
    },
    validationErrors() {
      const errors = [];
      if (!this.isRequiredSatisfied) {
        errors.push("This is a required field");
      }
      // TODO: Add more errors!
      return errors;
    }
  }
};
