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
    :validationError="isValid ? '' : 'Required'"
  />
</template>
<script>
import { inputMixin } from "../../../mixins";

export default {
  name: "p-string",
  mixins: [inputMixin]
};
</script>
