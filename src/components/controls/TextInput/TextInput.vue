<template functional>
  <div class="text-input input">
    <label class="text-input__label control__label">{{ props.label }}</label>
    <input
      class="text-input__control control"
      v-bind="data.attrs"
      v-on="listeners"
    />
  </div>
</template>
<style lang="scss">
@import "./TextInput.scss";
</style>
