import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import TextInput from "../src/components/controls/TextInput";

export const methods = {
  onInput: action("onInput"),
  onChange: action("onChange"),
  onBlur: action("onBlur")
};

export const attributes = {
  disabled: true,
  readonly: true,
  value: "test value"
};

storiesOf("TextInput", module)
  .add("default", () => {
    return {
      components: { TextInput },
      template: `<text-input label="Default" />`
    };
  })
  .add("with input handler", () => {
    return {
      components: { TextInput },
      template: `<text-input @input="onInput" label="With Input Handler"/>`,
      methods
    };
  })
  .add("with change handler", () => {
    return {
      components: { TextInput },
      template: `<text-input @change="onChange" label="With Change Handler"/>`,
      methods
    };
  })
  .add("with blur handler", () => {
    return {
      components: { TextInput },
      template: `<text-input @blur="onBlur" label="With Blur Handler"/>`,
      methods
    };
  })
  .add("readonly", () => {
    return {
      components: { TextInput },
      template: `<text-input :readonly="readonly" :value="value" label="Readonly"/>`,
      data: () => attributes
    };
  })
  .add("disabled", () => {
    return {
      components: { TextInput },
      template: `<text-input :disabled="disabled" :value="value" label="Disabled"/>`,
      data: () => attributes
    };
  });
