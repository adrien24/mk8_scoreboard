<template>
  <div id="app">
    <div class="logo">
      <img id="logo_img" src="@/assets/img/logo.png" alt="Logo" /> SCOREBOARD
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <div class="navbar">
      <nav>
        <ul>
          <li>
            <button @click="goBack">
              <SystemUiconsWrapBack class="menu_button" />
            </button>
          </li>
          <li>
            <router-link to="/"
              ><SystemUiconsHome class="menu_button"
            /></router-link>
          </li>
          <li>
            <router-link to="/Graphique"
              ><IconParkOutlineRanking class="menu_button"
            /></router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import SystemUiconsHome from "@/assets/img/SystemUiconsHome.vue";
import IconParkOutlineRanking from "@/assets/img/IconParkOutlineRanking.vue";
import SystemUiconsWrapBack from "@/assets/img/SystemUiconsWrapBack.vue";

export default {
  components: {
    SystemUiconsHome,
    IconParkOutlineRanking,
    SystemUiconsWrapBack,
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap");

html {
  background: linear-gradient(180deg, #1c1c1c 0%, #111111 100%);
  height: 100%;
  font-family: "Orbitron", sans-serif;
  color: white;
}

body {
  margin: 0 0 0 0;
  padding: 0 0 69px 0;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.logo{
  display: flex;
  align-items: center;
  padding: 10px 0 0 10px;
  font-weight: 800;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  gap: 5px;
  img {
    width: 25px;
  }
}
.button {
  background: #4529ec;
  box-shadow: 0px 10px 30px rgba(69, 41, 236, 0.52);
  border-radius: 31px;
  outline: none;
  color: white;
  font-family: "Orbitron", sans-serif;
  border: none;
  font-size: 1rem;
  padding: 15px 0;
  text-align: center;
  width: 80%;
}

.button-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 31px;
  outline: none;
  color: white;
  font-family: "Orbitron", sans-serif;
  font-size: 1rem;
  padding: 15px 0;
  text-align: center;
  width: 80%;
}

.navbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #111111;
  border-top: 1px solid #fff;

  // box-shadow: 0px 10px 30px rgba(69, 41, 236, 0.52);

  nav {
    ul {
      display: flex;
      padding: 0;
      width: 100%;
      gap: 15%;
      justify-content: center;
      list-style-type: none;

      li {
        button {
          background: none;
          outline: none;
          border: none;
          padding: 0;
        }
        .menu_button {
          font-size: 2rem;
          color: #fff;
        }
      }
    }
  }
}
</style>


