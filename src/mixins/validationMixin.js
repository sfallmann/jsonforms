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
        this.$emit('update:isValid', this.currentValidity, this.value);
      });
    },
  },
  computed: {
    currentValidity() {
      let validFlag = !this.required ? true
        : this.value === '' || this.value === undefined ? false : true;

      return validFlag;
    },    
  },
};