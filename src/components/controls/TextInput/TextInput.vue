<template functional>
  <div class="text-input input">
    <label class="text-input__label input__label">{{ props.label }}</label>
    <input
      class="text-input__control input__control"
      v-bind="data.attrs"
      v-on="listeners"
    />
    <div v-if="props.validationError">{{ props.validationError }}</div>
  </div>
</template>
<style lang="scss">
@import "./TextInput";
</style>
