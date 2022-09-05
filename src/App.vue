<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

html{
  background: linear-gradient(180deg, #1C1C1C 0%, #111111 100%);
  height: 100%;
  font-family: 'Orbitron', sans-serif;
  color: white;
  
}

body{
  margin: 0 0 0 0;
  padding: 0 0 69px 0;
  box-sizing: border-box;
}


.button{
  background: #4529EC;
  box-shadow: 0px 10px 30px rgba(69, 41, 236, 0.52);
  border-radius: 31px;
  outline: none;
  color: white;
  font-family: 'Orbitron', sans-serif;
  border: none;
  font-size: 1rem;
  padding: 15px 0;
  text-align: center;
  width: 80%;
}

.button-secondary{
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 31px;
  outline: none;
  color: white;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  padding: 15px 0;
  text-align: center;
  width: 80%;
}


</style>

<script>
export default {
  mounted() {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
};
</script>
