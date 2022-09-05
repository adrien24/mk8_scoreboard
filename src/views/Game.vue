<template>
  <div class="game">
    <h1>Bienvenue 👋</h1>
    <h2>Sélectionne un jeu</h2>
    <router-link class="button-secondary" to="/smash">Super Smash Bros </router-link>
    <router-link class="button-secondary" to="/mk8">Mario Kart </router-link>
  </div>
</template>

<style scoped lang="scss">
.game{
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100) !important;
  text-align:center;
  display: flex;
  flex-direction: column;
  align-items:center;

  h1{
    margin-bottom: 0
  }

  .button-secondary{
    text-decoration: none;
    margin-bottom: 25px;
  }
  

}

</style>
