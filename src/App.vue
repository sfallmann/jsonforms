<template>
  <div id="app">
    <p-object
      :title="schema.title"
      :properties="schema.properties"
      :options="options"
      :value.sync="value"
      is-root
    />
    <br />
    {{ JSON.stringify(value) }}
  </div>
</template>

<script>
import ObjectProperty from "./components/properties/ObjectProperty/ObjectProperty";

export default {
  name: "app",
  components: {
    "p-object": ObjectProperty
  },
  data() {
    return {
      schema: {
        type: "object",
        title: "Contact Form",
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
                title: "City"
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
      value: {}
    };
  }
};
</script>
