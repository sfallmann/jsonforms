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
    isMinLengthSatisified() {
      const minLength = Number.parseInt(this.minLength);
      const length = Number.parseInt(this.value.length);

      return isNaN(minLength)
        ? true
        : minLength && isNaN(length)
        ? false
        : length < minLength
        ? false
        : true;
    },
    isMaxLengthSatisfied() {
      const maxLength = Number.parseInt(this.maxLength);
      const length = Number.parseInt(this.value.length);

      return isNaN(maxLength)
        ? true
        : maxLength && isNaN(length)
        ? true
        : length > maxLength
        ? false
        : true;
    },
    isPatternSatisfied() {
      if (!this.pattern) return true;
      const regex = new RegExp(this.pattern);
      return regex.test(this.value);
    },
    currentValidity() {
      let validFlag = this.isRequiredSatisfied;

      // TODO: Add more validation!
      return validFlag;
    },
    validationErrors() {
      const errors = [];

      // TODO: Add more errors!

      if (!this.isRequiredSatisfied) {
        errors.push("This is a required field");
      }

      if (!this.isMinLengthSatisfied) {
        errors.push(`Less than minlength ${this.minlength}`);
      }

      if (!this.isMaxLengthSatisfied) {
        errors.push(`Greater than maxlength ${this.maxlength}`);
      }

      if (!this.isPatternSatisfied) {
        errors.push(`Pattern ${this.pattern} not matched`);
      }

      return errors;
    }
  }
};
