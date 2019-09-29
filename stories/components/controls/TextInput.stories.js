import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import "./../../../src/scss/_variables.scss";
import "./../../../src/scss/_base.scss";
import TextInput from "../../../src/components/controls/TextInput/TextInput.vue";

export const methods = {
  onInput: action("onInput"),
  onChange: action("onChange"),
  onBlur: action("onBlur"),
  onFocus: action("onFocus")
};

export const data = {
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
  .add("with focus handler", () => {
    return {
      components: { TextInput },
      template: `<text-input @focus="onFocus" label="With Focus Handler"/>`,
      methods
    };
  })
  .add("readonly", () => {
    return {
      components: { TextInput },
      template: `<text-input :readonly="readonly" :value="value" label="Readonly"/>`,
      data: () => data
    };
  })
  .add("disabled", () => {
    return {
      components: { TextInput },
      template: `<text-input :disabled="disabled" :value="value" label="Disabled"/>`,
      data: () => data
    };
  });
