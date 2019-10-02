import { mount } from "@vue/test-utils";
import SimpleProperty from "@/components/properties/SimpleProperty/SimpleProperty";

describe("SimpleProperty", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(SimpleProperty);
    expect(wrapper.isVueInstance()).toBeTruthy();
  }),
    test('emit "input" with value', () => {
      const wrapper = mount(SimpleProperty, {
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
    const wrapper = mount(SimpleProperty, {
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
