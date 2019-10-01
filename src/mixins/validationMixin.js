import validator from "validator";

export default {
  props: {
    isValid: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    minLength: {
      type: Number
    },
    maxLength: {
      type: Number
    },
    pattern: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: ""
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
    isMinLengthSatisfied() {
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
      if (!this.pattern || (!this.required && !this.value)) return true;

      const regex = new RegExp(this.pattern);
      return regex.test(this.value);
    },
    isFormatSatisfied() {
      if (!this.format || (!this.required && !this.value)) return true;

      switch (this.format) {
        case "date":
          return validator.isRFC3339(this.value);
        case "email":
          return validator.isEmail(this.value);
        case "hostname":
          return validator.isFQDN(this.value);
        case "ipv4":
          return validator.isIP(this.value, 4);
        case "ipv6":
          return validator.isIP(this.value, 6);
        case "uri":
          // NOT COMPLETE!!
          return validator.isURL(this.value);
        default:
          return true;
      }
    },
    currentValidity() {
      return !this.validationErrors.length;
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
        errors.push(`Pattern "${this.pattern}" not matched`);
      }

      if (!this.isFormatSatisfied) {
        errors.push(`Format "${this.format}" not matched`);
      }

      return errors;
    }
  }
};
