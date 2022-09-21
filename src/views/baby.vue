<template>
  <div id="mk8Page" class="mk8Page">
    <div id="blur">
      <img id="toad_img" src="@/assets/img/toad.png" alt="Champigngon" />
      <h1>Ajouter un résultat</h1>
      <div class="Versus__tableau">
        <div class="Versus__tableau__player1">
          <h3>{{ player.Name1 }}</h3>
        </div>

        <div class="Versus__tableau__score">
          <h3>{{ setScore }} - {{ setScore2 }}</h3>
        </div>

        <div class="Versus__tableau__player1">
          <h3>{{ player.Name2 }}</h3>
        </div>
      </div>
      <form @submit.prevent="addScore()" id="score_form">
        <div class="player">
          <p class="name">Gagnant de la partie</p>
          <select class="score_input" v-model="winner">
            <option>Choisir un joueur</option>
            <option v-if="player.Name1">
              {{ player.Name1 }}
            </option>
            <option v-if="player.Name2">
              {{ player.Name2 }}
            </option>
            <option v-if="player.Name3">
              {{ player.Name3 }}
            </option>
            <option v-if="player.Name4">
              {{ player.Name4 }}
            </option>
          </select>
          <br /><br />
        </div>
        <button class="button">Envoyer</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      player: [],
      winner: "",
      key: "",
      winner1: "",
      winner2: "",
      setScore: 0,
      setScore2: 0,
    };
  },

  mounted() {
    this.getplayer();
  },

  methods: {
    async getplayer() {
      var urlcourante = document.location.href;
      let key = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);

      await axios
        .get("https://6ooontrv.directus.app/items/baby?filter[key][_eq]=" + key)
        .then((player) => {
          this.player = player.data.data[0];
          this.winner = "Choisir un joueur";
          this.setScore = this.player.Score1;
          this.setScore2 = this.player.Score2;
        });
    },

    addScore() {
      var urlcourante = document.location.href;
      let key = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);

      axios
        .get(
          "https://6ooontrv.directus.app/items/baby?filter[Name1][_eq]=" +
            this.winner +
            "&filter[key][_eq]=" +
            key
        )
        .then((res) => {
          this.winner1 = res.data.data[0];
          axios.patch(
            "https://6ooontrv.directus.app/items/baby/" + this.winner1.id,
            {
              Score1: this.winner1.Score1 + 1,
            }
          );
        })
        .then(() => {});

      axios
        .get(
          "https://6ooontrv.directus.app/items/baby?filter[Name2][_eq]=" +
            this.winner +
            "&filter[key][_eq]=" +
            key
        )
        .then((res) => {
          this.winner2 = res.data.data[0];
          axios.patch(
            "https://6ooontrv.directus.app/items/baby/" + this.winner2.id,
            {
              Score2: this.winner2.Score2 + 1,
            }
          );
        })
        .then(() => {
          alert("le score a bien été mis à jour");

          if (this.winner === this.player.Name1) {
            this.setScore += 1;
            console.log("ok" + this.setScore);
          } else if (this.winner === this.player.Name2) {
            this.setScore2 += 1;
            console.log("ok" + this.setScore2);
          }
        });
    },

    resetScore() {
      const form = document.getElementById("score_form");
      form.reset();
      this.call();
    },
  },
};
</script>
  
  <style scoped lang="scss">
.mk8 {
  filter: blur(4px) brightness(40%);
}

.mk8Page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;

  #blur {
    text-align: center;
    width: 100%;
  }

  #toad_img {
    position: absolute;
    width: 150px;
    z-index: -10;
    bottom: 10%;
    left: -30px;
  }

  .button_player {
    display: flex;
    gap: 5%;
    margin: 0 15px;
  }

  .buttonAddPlayer {
    display: flex;
    background: #343434;
    font-size: 1rem;
    gap: 10px;
    outline: none;
    border: none;
    align-self: flex-start;
    color: rgba(255, 255, 255, 0.62);
    align-items: center;
    padding: 10px 20px;
    border-radius: 25px;
    margin: auto;
    margin-bottom: 25px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    font-family: "Orbitron";

    .addPlayers {
      display: flex;
      align-self: center;
      color: rgba(255, 255, 255, 0.62);
      font-size: 1rem;
    }
  }

  .modal {
    display: none;
    position: absolute;
  }

  .show {
    display: flex !important;
    filter: blur(0px) !important;
    flex-direction: column;

    .cross {
      display: flex;
      font-size: 3rem;
      align-self: flex-end;
      color: rgba(255, 255, 255, 0.62);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    .player {
      background-color: #4529ec;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      .name {
        background: #343434;
        border-radius: 5px 0 0 5px;
        font-family: "Orbitron";
        font-weight: 500;
        color: rgba(255, 255, 255, 0.62);
        outline: none;
        border: none;
        padding: 15px 25px 15px 15px;
        font-size: 1rem;
        margin: 0;
      }

      select {
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;

        text-overflow: "";
        font-family: "Orbitron";
        font-weight: 700;
        font-family: 1rem;
        color: #ffffff;
        background: #4529ec;
        border-radius: 0 5px 5px 0;
        outline: none;
        border: none;
        padding: 17px;

        option {
          font-size: 2rem;
        }
      }

      #addPlayer {
        border-radius: 5px !important;
      }
    }
  }
}

.Versus__tableau {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  text-decoration: none;
  margin: 0 29px 15px 26px;

  &__player1 {
    width: 35%;

    h3 {
      display: flex;
      justify-content: flex-end;
    }

    &:first-child {
      h3 {
        justify-content: flex-start;
      }
    }
  }
}
</style>
  
  