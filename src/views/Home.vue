<template>
  <div class="container">
    <v-alert
      v-if="errorMessage"
      elevation="2"
      border="left"
      colored-border
      type="error"
    >
      <h5>{{ errorMessage }}</h5>
    </v-alert>
    <div class="my-6">
      <v-img class="mx-auto" src="@/assets/logo.png" height="200" width="200" />
      <h1 class="text-center teal--text">Welcome to the Vue Meme Forum</h1>
    </div>
    <v-row class="justify-center">
      <v-btn to="/feed" color="teal" dark x-large>View Memes</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: null
    };
  },
  mounted() {
    const hasAuthErr = this.$route.query.unauthorized === "true";
    if (hasAuthErr) {
      this.errorMessage = "You must be logged in to do that";
    }
  }
};
</script>

<style></style>
