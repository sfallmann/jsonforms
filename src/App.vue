<template>
  <div id="app">
    <FormObject
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
import FormObject from "./components/properties/FormObject";

export default {
  name: "app",
  components: {
    FormObject
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

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
