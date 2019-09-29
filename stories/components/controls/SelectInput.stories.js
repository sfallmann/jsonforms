import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import SelectInput from "../../../src/components/controls/SelectInput/SelectInput.vue";

export const methods = {
  onInput: action("onInput"),
  onChange: action("onChange"),
  onBlur: action("onBlur"),
  onFocus: action("onFocus")
};

export const data = {
  disabled: true,
  value: 2,
  options: [
    { value: 1, text: "One" },
    { value: 2, text: "Two" },
    { value: 3, text: "Three" }
  ],
  emojiOptions: [
    { value: "zebra", text: "Zebra &#129427;" },
    { value: "t_rex", text: "T.Rex &#129430" },
    { value: "gorilla", text: "Gorilla &#129421" },
    { value: "fox", text: "Fox &#129418" }
  ]
};

storiesOf("SelectInput", module)
  .add("default", () => {
    return {
      components: { SelectInput },
      template: `<select-input label="Default" :options="options" :value="value" />`,
      data: () => data
    };
  })
  .add("with emoji options", () => {
    return {
      components: { SelectInput },
      template: `<select-input label="Default" :options="emojiOptions" value="gorilla" />`,
      data: () => data
    };
  })
  .add("with change handler", () => {
    return {
      components: { SelectInput },
      template: `<select-input label="With Change Handler" :options="options" :value="value" @change="onChange" />`,
      methods,
      data: () => data
    };
  })
  .add("with input handler", () => {
    return {
      components: { SelectInput },
      template: `<select-input label="With Input Handler" :options="options" :value="value" @input="onInput" />`,
      methods,
      data: () => data
    };
  })
  .add("with focus handler", () => {
    return {
      components: { SelectInput },
      template: `<select-input label="With Focus Handler" :options="options" :value="value" @focus="onFocus" />`,
      methods,
      data: () => data
    };
  })
  .add("with blur handler", () => {
    return {
      components: { SelectInput },
      template: `<select-input label="With Blur Handler" :options="options" :value="value" @blur="onBlur" />`,
      methods,
      data: () => data
    };
  })
  .add("disabled", () => {
    return {
      components: { SelectInput },
      template: `<select-input label="Disabled" :options="options" :value="value" :disabled="disabled" />`,
      data: () => data
    };
  });
