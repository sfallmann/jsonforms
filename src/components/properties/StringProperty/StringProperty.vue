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
      <div v-show="validationErrors.length">{{ validationErrors[0] }}</div>
    </template>
  </component>
</template>
<script>
import { inputMixin } from "../../../mixins";

export default {
  name: "p-string",
  mixins: [inputMixin]
};
</script>
