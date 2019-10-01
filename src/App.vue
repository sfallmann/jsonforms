<template>
  <div id="app">
    <p-object
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
import ObjectProperty from "./components/properties/ObjectProperty/ObjectProperty";

export default {
  name: "app",
  components: {
    "p-object": ObjectProperty
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
            type: "object",
            properties: {
              street: {
                type: "string",
                title: "Street"
              },
              city: {
                type: "string",
                title: "City",
                required: true
              }
            }
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
        address: {
          street: "Vermont Street"
        }
      }
    };
  }
};
</script>
