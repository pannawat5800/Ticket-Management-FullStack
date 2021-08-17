<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      flat
    >
      <v-app-bar-title>Ticket Management</v-app-bar-title>
      <v-spacer></v-spacer>
      <div class="pt-5">
        <v-switch
        v-model="$vuetify.theme.dark"
        color="accent"
        :label="$vuetify.theme.dark | themeString"
      ></v-switch>
      </div>
    </v-app-bar>

    <v-main class="bg">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({}),
  filters: {
    themeString: (value) => value ? "Light" : "Dark"
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
<style scoped>
  .bg {
    background: var(--v-background-base) !important;
  }
</style>