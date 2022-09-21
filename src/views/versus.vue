<template>
  <div class="versus">
    <div id="modalVersus" class="modal" v-if="showModal === true">
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        id="cross"
        class="cross"
        @click="showTheModal()"
      />
      <form @submit.prevent="addplayer()">
        <div class="addPlayer player">
          <input
            id="addPlayer"
            class="name_player name"
            v-model="playerName1"
            placeholder="Joueur 1"
          />
          <input
            id="addPlayer"
            class="name_player name"
            v-model="playerName2"
            placeholder="Joueur 2"
          />
        </div>
        <button class="add button-secondary">Ajouter un versus</button>
      </form>
    </div>

    <div id="blur">
      <h1>Versus</h1>
      <div class="addVersus" @click="showTheModal()">
        <FluentPeopleAdd20Filled class="addVersus__icon" />
        <p>Ajouter un versus</p>
      </div>

      <div class="searchBar">
        <form @submit.prevent="callplayer()">
          <div class="player">
            <input type="text" v-model="searchplayer" />
            <button type="submit"><IcBaselineSearch class="search" /></button>
          </div>
        </form>
      </div>
      <div class="Versus__tableau" v-for="items in player" :key="items.player">
        <router-link
          :to="{ name: 'baby', params: { key: items.key } }"
          v-if="show === false"
        >
          <div class="Versus__tableau__player1">
            <h3>{{ items.Name1 }}</h3>
          </div>

          <div class="Versus__tableau__score">
            <h3>{{ items.Score1 }} - {{ items.Score2 }}</h3>
          </div>

          <div class="Versus__tableau__player1">
            <h3>{{ items.Name2 }}</h3>
          </div>
        </router-link>
      </div>
    </div>

    <div
      class="Versus__tableau"
      v-for="items in uniquePlayer"
      :key="items.uniquePlayer"
    >
      <router-link
        :to="{ name: 'baby', params: { key: items.key } }"
        v-if="show !== false"
      >
        <div class="Versus__tableau__player1">
          <h3>{{ items.Name1 }}</h3>
        </div>

        <div class="Versus__tableau__score">
          <h3>{{ items.Score1 }} - {{ items.Score2 }}</h3>
        </div>

        <div class="Versus__tableau__player1">
          <h3>{{ items.Name2 }}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import IcBaselineSearch from "../assets/img/IcBaselineSearch.vue";
import FluentPeopleAdd20Filled from "../assets/img/FluentPeopleAdd20Filled.vue";

export default {
  data() {
    return {
      searchplayer: "",
      playerName1: "",
      playerName2: "",
      player: "",
      uniquePlayer: "",
      show: false,
      showModal: false,
    };
  },

  components: {
    IcBaselineSearch,
    FluentPeopleAdd20Filled,
  },

  mounted() {
    this.callGlobal();
  },

  methods: {
    callGlobal() {
      axios
        .get(
          "https://6ooontrv.directus.app/items/baby?filter[categorie][_eq]=principale"
        )
        .then((player) => {
          this.player = player.data.data;
        });
    },

    showTheModal() {
      this.showModal = !this.showModal;
      const blur = document.getElementById("blur");
      blur.classList.toggle("blured");
    },

    callplayer() {
      axios
        .get(
          "https://6ooontrv.directus.app/items/baby?filter[Name1][_eq]=" +
            this.searchplayer
        )
        .then((uniquePlayer) => {
          this.uniquePlayer = uniquePlayer.data.data;
          this.show = true;

          if (this.uniquePlayer.length === 0) {
            this.show = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.show = false;
        });
    },

    addplayer() {
      let key = Math.floor(Math.random() * 10000);

      axios
        .post("https://6ooontrv.directus.app/items/baby", {
          Name1: this.playerName1,
          Name2: this.playerName2,
          categorie: "principale",
          key: key,
        })
        .then(() => {
          axios.post("https://6ooontrv.directus.app/items/baby", {
            Name1: this.playerName2,
            Name2: this.playerName1,
            categorie: "secondaire",
            key: key,
          });
        })
        .then(() => {
          this.callGlobal();
          this.showTheModal();
        });
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.blured {
  filter: blur(4px);
}

.addVersus {
  display: flex;
  align-items: center;
  gap: 3%;
  margin-left: 9%;

  p {
    font-size: 1rem;
  }

  .addVersus__icon {
    font-size: 2rem;
  }
}

.Versus__tableau {
  &:first-child {
    margin-top: 20px;
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    text-decoration: none;
    margin: 0 20px;

    .Versus__tableau__player1 {
      display: flex;
      align-items: center;
      width: 35%;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .Versus__tableau__player1:nth-child(3) {
      display: flex;
      justify-content: flex-end;
    }

    .Versus__tableau__score {
      display: flex;
    }
  }
}

.searchBar {
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    .player{
      background-color: #343434;
      border-radius: 5px;
    }

    button,
    input {
      background: #343434;
      border-radius: 5px 0 0 5px;
      font-family: "Orbitron";
      font-weight: 500;
      color: rgba(255, 255, 255, 0.62);
      outline: none;
      border: none;
      padding: 8px 25px 8px 15px;
      font-size: 1rem;
    }

    input {
      width: 200px;
    }

    button {
      padding: 7px 25px 7px 15px;
      border-radius: 0 5px 5px 0;
      .search {
        color: #fff;
        font-size: 2rem;
        fill: #fff;
      }
    }
  }
}

.modal {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5%;
    margin-top: 70%;

    .player {
      input {
        color: #fff;
      }
    }

    button {
      margin-top: 5%;
    }
  }
  .cross {
    position: absolute;
    right: 25px;
    top: 27%;
    font-size: 2rem;
  }
}

.player {
  display: flex;

  input {
    background-color: transparent;
    height: 35px;
    outline: none;
    border: 1px solid white;
  }
}
</style>