<template functional>
  <div class="text-input">
    <label class="text-input__label">{{ props.label }}</label>
    <input class="text-input__control" v-bind="data.attrs" v-on="listeners" />
  </div>
</template>
<style lang="scss">
@import "./TextInput.scss";
</style>
