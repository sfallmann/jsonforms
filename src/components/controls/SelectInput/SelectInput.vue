<template functional>
  <div class="select-input input">
    <label class="select-input__label input__label">{{ props.label }}</label>
    <select
      class="select-input__control input__control"
      :autcomplete="autcomplete"
      :autofocus="autofocus"
      :disabled="disabled"
      :multiple="multiple"
      :size="size"
      :value="props.value"
      v-on="listeners"
    >
      <option
        v-for="(option, index) in props.options || []"
        :key="index"
        :value="option.value"
        :selected="props.value === option.value"
        v-html="option.text"
      />
    </select>
    <slot name="error"></slot>
  </div>
</template>
<style lang="scss">
@import "./SelectInput";
</style>
