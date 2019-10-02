<template>
  <div id="app">
    <complex-property
      :title="schema.title"
      :properties="schema.properties"
      :options="options"
      :value.sync="value"
      is-root
      :required="schema.required"
      @submitting="handleSubmit"
    />
    <br />
    {{ JSON.stringify(value) }}
    <br />
    Is the form valid? {{ isFormValid }}
  </div>
</template>

<script>
import ComplexProperty from "./components/properties/ComplexProperty/ComplexProperty";

export default {
  name: "app",
  components: {
    "complex-property": ComplexProperty
  },
  methods: {
    handleSubmit(isValid) {
      this.isFormValid = isValid;
    }
  },
  data() {
    return {
      isFormValid: null,
      schema: {
        type: "object",
        title: "Contact Form",
        required: ["firstName", "favoriteColor"],
        properties: {
          firstName: {
            type: "string",
            title: "First Name"
          },
          favoriteColor: {
            type: "string",
            title: "Favorite Color",
            enum: ["red", "blue", "green"]
          },
          email: {
            type: "string",
            title: "Email",
            format: "email"
          },
          address: {
            title: "Address",
            type: "array",
            maxItems: 3,
            items: [
              {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["home", "work"]
                  },
                  street: {
                    type: "string",
                    title: "Street"
                  }
                }
              }
            ]
          }
        }
      },
      options: {
        favoriteColor: {
          enumText: ["RED &#128540;", "BLUE", "GREEN"]
        }
      },
      value: {
        firstName: "Test Value",
        address: [{ type: "home" }, { type: "work" }]
      }
    };
  }
};
</script>
