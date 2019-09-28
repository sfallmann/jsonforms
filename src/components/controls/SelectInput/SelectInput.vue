<template functional>
  <div class="select-input input">
    <label class="select-input__label control__label">{{ props.label }}</label>
    <select
      class="select-input__control control"
      v-bind="data.attrs"
      v-on="listeners"
    >
      <option
        v-for="(option, index) in props.options || []"
        :key="index"
        :value="option.value"
        :selected="props.value === option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<style lang="scss">
@import "./SelectInput.scss";
</style>
