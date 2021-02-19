<template>
  <v-app>
    <v-app-bar app color="teal darken-2" dark>
      <h1>Vue Meme Forum</h1>
      <v-spacer></v-spacer>
      <span v-if="user">
        <router-link to="/my-memes">
          <v-btn text>My Memes</v-btn>
        </router-link>
        |
      </span>
      <span v-if="user">
        <router-link to="/create">
          <v-btn text> Create </v-btn>
        </router-link>
        |
      </span>
      <router-link to="/feed">
        <v-btn text> Memes </v-btn>
      </router-link>
      |
      <v-btn v-if="user" text @click="signOut">Sign Out </v-btn>
      <v-btn v-else text @click="signIn"> Sign In </v-btn>
    </v-app-bar>

    <v-main>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { signIn, signOut, auth } from "./firebase";

export default {
  data() {
    return {
      user: auth.currentUser
    };
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    signIn() {
      return signIn();
    },
    signOut() {
      signOut();
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.router-link-active .v-btn {
  color: rgb(255, 200, 100);
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s linear;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
