import { mount } from "@vue/test-utils";
import StringProperty from "@/components/properties/StringProperty/StringProperty";

describe("StringProperty", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(StringProperty);
    expect(wrapper.isVueInstance()).toBeTruthy();
  }),
    test('emit "input" with value', () => {
      const wrapper = mount(StringProperty, {
        propsData: {
          value: "ab"
        }
      });

      const event = { target: { value: "abc" } };

      wrapper.vm.eventHandler(event, "input");
      const [[value]] = wrapper.emitted()["update:value"];
      expect(value).toBe("abc");
    });
  test('emit "change" with value', () => {
    const wrapper = mount(StringProperty, {
      propsData: {
        value: "ab",
        options: { lazy: true }
      }
    });

    const event = { target: { value: "abc" } };

    wrapper.vm.eventHandler(event, "change");
    const [[value]] = wrapper.emitted()["update:value"];
    expect(value).toBe("abc");
  });
});
