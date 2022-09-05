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
