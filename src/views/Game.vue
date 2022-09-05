<template>
  <div class="game">
    <h1>Bienvenue 👋</h1>
    <h2>Sélectionne un jeu</h2>
    <router-link class="button-secondary" to="/smash">Super Smash Bros </router-link>
    <router-link class="button-secondary" to="/mk8">Mario Kart </router-link>
    <img id="mk_img" src="@/assets/img/mario_home.png" alt="Mario Home">
  </div>
</template>

<style scoped lang="scss">
.game{
  text-align:center;
  display: flex;
  gap:10px;
  flex-direction: column;
  align-items:center;
  overflow: hidden;

  #mk_img{
    position: absolute;
    width: 125%;
    left: -100px;
    top: 350px;
    z-index: -100
  }
  h1{
    margin-top: 200px;
    margin-bottom: 0;
    font-weight: 700;
    font-size: 32px;
  }

  h2{
    font-weight: 700;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.63);
  }

  .button-secondary{
    text-decoration: none;
    margin-bottom: 25px;
    background: rgba(0, 0, 0, 0.63);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0px 10px 30px rgba(20, 20, 20, 0.52);
    backdrop-filter: blur(20px);
    border-radius: 31px;
  }
  

}

</style>
