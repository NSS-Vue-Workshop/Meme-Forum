<template>
  <div>
    <h1 class="teal--text text-center">My Memes</h1>
    <div v-for="meme in memes" :key="meme.id" class="py-5 list-item">
      <router-link :to="`/meme/${meme.id}`">
        <meme
          class="mx-auto"
          :top="meme.topText"
          :bottom="meme.bottomText"
          :imageURL="meme.imageURL"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase";
import Meme from "../components/Meme";

export default {
  components: { Meme },
  data() {
    return {
      memes: []
    };
  },
  async mounted() {
    const currentUserId = auth.currentUser.uid;
    const snapshot = await db
      .collection("memes")
      .where("userId", "==", currentUserId)
      .get();

    this.memes = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
  }
};
</script>

<style></style>
