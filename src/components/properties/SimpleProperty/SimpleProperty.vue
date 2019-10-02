<template>
  <component
    v-bind:is="component"
    @input="eventHandler($event, 'input')"
    @change="eventHandler($event, 'change')"
    @blur="eventHandler($event, 'blur')"
    @focus="eventHandler($event, 'focus')"
    :label="label"
    v-bind="options"
    :value="value"
    :options="mappedEnum()"
  >
    <template v-slot:error v-show="validationErrors.length">
      <div class="validation-error" v-show="validationErrors.length">
        {{ validationErrors[0] }}
      </div>
    </template>
  </component>
</template>
<script>
import { inputMixin } from "../../../mixins";
import TextInput from "@/components/controls/TextInput/TextInput";
import SelectInput from "@/components/controls/SelectInput/SelectInput";

export default {
  name: "simple-property",
  mixins: [inputMixin],
  components: {
    "text-input": TextInput,
    "select-input": SelectInput
  }
};
</script>
<style lang="scss">
.validation-error {
  padding: 0.5rem 0.2rem;
  color: red;
  font-weight: bold;
  font-size: $font-size-sm;
}
</style>
