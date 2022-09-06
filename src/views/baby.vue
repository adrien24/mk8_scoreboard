<template>
  <div id="mk8Page" class="mk8Page">
    <div id="blur">
      <img id="toad_img" src="@/assets/img/toad.png" alt="Champigngon" />
      <h1>Ajouter un résultat</h1>
      <div class="button_player">
        <button class="buttonAddPlayer" @click="togglePlayer()">
          <font-awesome-icon
            icon="fa-solid fa-user-plus"
            class="addPlayers"
          />Ajouter un joueur
        </button>
        <button class="buttonAddPlayer" @click="togglePlayer()">
          <font-awesome-icon
            icon="fa-solid fa-user-minus"
            class="addPlayers"
          />Supprimer un joueur
        </button>
      </div>
      <form @submit.prevent="callplayer()" id="score_form">
        <div class="player">
          <p class="name">Gagnant de la partie</p>
          <select class="score_input" value="0">
            <option v-for="items in info" :key="items.info">
              {{ items.Name }}
            </option>
          </select>
          <br /><br />
        </div>
        <button class="button">submit</button>
      </form>
    </div>

    <div id="modal" class="modal">
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        id="cross"
        class="cross"
        @click="cross()"
      />
      <form @submit.prevent="addplayer()">
        <div class="addPlayer player">
          <input
            id="addPlayer"
            class="name_player name"
            v-model="playerName"
            placeholder="Player Name"
          />
        </div>
        <button class="add button-secondary" @click="cross()">
          Ajouter un joueur
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      info: "",
      scorePlayer: 0,
      points: 0,
      player: "",
      playerName: "",
      id: "",
      newPlayer: "",
    };
  },

  mounted() {
    this.call();
  },

  methods: {
    togglePlayer() {
      let modal = document.getElementById("modal");
      let mk8 = document.getElementById("blur");

      modal.classList.add("show");
      mk8.classList.add("mk8");
    },

    cross() {
      let cross = document.getElementById("modal");
      let mk8 = document.getElementById("blur");

      cross.classList.remove("show");
      mk8.classList.remove("mk8");
    },

    call() {
      axios
        .get(
          "https://6ooontrv.directus.app/items/scoreboard?filter[role][_eq]=baby"
        )
        .then((info) => {
          this.info = info.data.data;
          console.log(this.info);
        });
    },

    callplayer() {
      const players = Array.from(document.querySelectorAll(".player"));
      console.log(players);
      alert("Les resultats ont été comptabilisé");
      players.forEach((item) => {
        const score = item.querySelector(".score_input").value;
        console.log(score);

        axios
          .get(
            "https://6ooontrv.directus.app/items/scoreboard?filter[Name][_eq]=" +
              score
          )
          .then((player) => {
            console.log(player);
            this.player = player.data.data[0];
            var nb_baby_parties = this.player.Count_baby_parties;
            var nb_win = this.player.Count_baby_win;

            axios
              .patch(
                "https://6ooontrv.directus.app/items/scoreboard/" +
                  this.player.id,
                {
                  Count_baby_parties: nb_baby_parties + 1,
                  Count_baby_win: nb_win + 1,
                }
              )
              .then((res) => {
                console.log(res);
                this.resetScore();
              });
          });
      });
    },

    resetScore() {
      const form = document.getElementById("score_form");
      form.reset();
      this.call();
    },

    addplayer() {
      const newPlayer = this.playerName;

      axios
        .get(
          "https://6ooontrv.directus.app/items/scoreboard/?filter[Name][_eq]=" +
            this.playerName
        )
        .then((id) => {
          this.id = id.data.data;

          axios.patch(
            "https://6ooontrv.directus.app/items/scoreboard/" + this.id[0].id,
            {
              role: "baby",
            }
          );
        })
        .catch(function (error) {
          console.log(error);
          axios.post("https://6ooontrv.directus.app/items/scoreboard/", {
            Name: newPlayer,
            role: "baby",
          });
        })
        .then(() => {
          this.call();
        });

      // axios
      //   .post("https://6ooontrv.directus.app/items/scoreboard/", {
      //     Name: this.playerName,
      //     role: 'baby'
      //   })
      //   .then((res) => {
      //     this.call();
      //     console.log(res);
      //   });
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

  #blur{
    text-align: center;
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
    font-size: 0.8rem;
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
        color: #ffffff;
        background: #4529ec;
        border-radius: 0 5px 5px 0;
        outline: none;
        border: none;
        padding: 17px;
      }

      #addPlayer {
        border-radius: 5px !important;
      }
    }
  }
}
</style>
  
  