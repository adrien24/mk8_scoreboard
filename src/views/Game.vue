<template>
  <div class="game">
    <router-link to="/smash">
      <div class="smash"></div>
    </router-link>

    <router-link to="/mk8">
      <div class="mk8"></div>
    </router-link>
  </div>
</template>

<style scoped>
  .game{
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100) !important;
}
.smash {
  height: 50vh;
  background-image: url("../assets/img/smash.png");
  background-position: center;

  background-size: cover;
}

.mk8 {
  height: 50vh;
  background-image: url("../assets/img/mk8.webp");
  background-position: center;
  background-size: cover;
}
</style>
