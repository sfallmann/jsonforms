<template>
  <div id="app">
    <p-object
      :title="schema.title"
      :properties="schema.properties"
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
        properties: {
          firstName: {
            type: "string",
            title: "First Name"
          }
        }
      },
      value: {}
    };
  }
};
</script>
