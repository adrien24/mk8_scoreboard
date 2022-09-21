<template>
  <div id="mk8Page" class="mk8Page">
    
    <div id="blur">
      <img id="toad_img" src="@/assets/img/toad.png" alt="Champigngon"/>
        <h1>Ajouter un résultat</h1>
        <button class="buttonAddPlayer" @click="togglePlayer()">
          <font-awesome-icon icon="fa-solid fa-user-plus" class="addPlayers" />Add
          player
        </button>
        <form @submit.prevent="callplayer()" id="score_form">
            <div class="player" v-for="items in info" :key="items.info">
                <input class="name_input name" v-model="items.Name" />
                <select class="score_input" value="0">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <br /><br />
            </div>
            <button class="button">submit</button>
        </form>
    </div>

  <div id="modal" class="modal">
    <font-awesome-icon icon="fa-solid fa-xmark" id="cross" class="cross" @click="cross()"/>
    <form @submit.prevent="addplayer()">
      <div class="addPlayer player">
        <input
          id="addPlayer"
          class="name_player name"
          v-model="playerName"
          placeholder="Player Name"
        />
      </div>
      <button class="add button-secondary" @click="cross()">Add player</button>
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
    };
  },

  mounted() {
    this.call();
  },

  methods: {

    togglePlayer(){
      let modal = document.getElementById('modal');
      let mk8 = document.getElementById('blur')

      modal.classList.add('show')
      mk8.classList.add('mk8')
    },

    cross(){
      let cross = document.getElementById('modal')
      let mk8 = document.getElementById('blur')

      cross.classList.remove('show')
      mk8.classList.remove('mk8')
    },

    call() {
      axios
        .get("https://6ooontrv.directus.app/items/scoreboard")
        .then((info) => {
          this.info = info.data.data;
        });
    },

    callplayer() {
      const players = Array.from(document.querySelectorAll(".player"));
      alert("Les resultats ont été comptabilisé");
      players.forEach((item) => {
        const name = item.querySelector(".name_input").value;
        const score = item.querySelector(".score_input").value;

        axios
          .get(
            "https://6ooontrv.directus.app/items/scoreboard?filter[Name][_eq]=" +
              name
          )
          .then((player) => {
            this.player = player.data.data[0];
            var nb_count = this.player.Count_mk8;
            var nb_mk8_courses = this.player.Count_mk8_courses;
            var nb_win = this.player.Count_mk8_win;

            var integer = parseInt(score);

            if (integer === 12) {
              this.points = 1;
            } else if (integer === 11) {
              this.points = 2;
            } else if (integer === 10) {
              this.points = 3;
            } else if (integer === 9) {
              this.points = 4;
            } else if (integer === 8) {
              this.points = 5;
            } else if (integer === 7) {
              this.points = 6;
            } else if (integer === 6) {
              this.points = 7;
            } else if (integer === 5) {
              this.points = 8;
            } else if (integer === 4) {
              this.points = 9;
            } else if (integer === 3) {
              this.points = 10;
            } else if (integer === 2) {
              this.points = 12;
            } else if (integer === 1) {
              this.points = 15;
              nb_win++;
            } else if (integer === 0) {
              this.points = 0;
              nb_mk8_courses--;
            }

            axios
              .patch(
                "https://6ooontrv.directus.app/items/scoreboard/" +
                  this.player.id,
                {
                  Count_mk8: this.points + nb_count,
                  Count_mk8_courses: nb_mk8_courses + 1,
                  Count_mk8_win: nb_win,
                }
              )
              .then(() => {
                this.resetScore();
              });
          });
      });
    },

    resetScore(){
      const form = document.getElementById('score_form');
      form.reset();
      this.call();
    },

    addplayer() {
      axios
        .post("https://6ooontrv.directus.app/items/scoreboard/", {
          Name: this.playerName,
        })
        .then(() => {
          this.call();
        });
    },
  },
};
</script>

<style scoped lang="scss">

.mk8{
  filter: blur(4px) brightness(40%);
}

.mk8Page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;

  #toad_img{
    position:absolute;
    width: 150px;
    z-index:-10;
    bottom:10%;
    left:-30px;
  }

  .buttonAddPlayer {
    display: flex;
    background: #343434;
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
    font-family: 'Orbitron';

    .addPlayers {
      display: flex;
      align-self: center;
      color: rgba(255, 255, 255, 0.62);
      font-size: 1rem;
    }
  }

  .modal{
    display: none;
    position: absolute;
  }

  .show{
    display: flex!important;
    filter: blur(0px)!important;
    flex-direction: column;

    .cross{
      display: flex;
      font-size: 3rem;
      align-self: flex-end;
      color: rgba(255, 255, 255, 0.62)
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
      }

      select {
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

