<template>
  <div class="profil">
    <div class="profil__top">
      <img
        :src="'https://6ooontrv.directus.app/assets/' + profil.Profil_image"
      />
      <h1>{{profil.Name}}</h1>
    </div>
    <hr/>
    <div class="profil__middle">
        <h2>{{profil.Count_mk8_courses}}<br><span>Courses</span></h2>
        <h2>{{profil.Count_mk8_win}}<br><span>Victoires</span></h2>
        <h2>{{profil.Count_mk8}}<br><span>Points</span></h2>
    </div>
    <hr/>
    <div class="profil__">
        <p>🏆 Taux de victoires : <span>{{(profil.Count_mk8_win / profil.Count_mk8_courses)*100}} %</span></p>
        <p>🍾 Place moyenne : <span>{{position}}</span></p>
         <p>Points : <span>{{profil.Count_mk8}} / {{profil.Count_mk8_courses*15}} pts</span></p>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profil: "",
      position: ""
    };
  },

  mounted() {
    this.callProfil();
  },

  methods: {
    callProfil() {
      var urlcourante = document.location.href;
      const queue_url = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);
      console.log(queue_url);

      axios
        .get("https://6ooontrv.directus.app/items/scoreboard/" + queue_url)
        .then((profil) => {
          this.profil = profil.data.data;
          console.log(this.profil);
          this.calcPlace()
        });
    },

    calcPlace(){
        let point_moyen = this.profil.Count_mk8/this.profil.Count_mk8_courses
        console.log(point_moyen);
        if (point_moyen >= 13.5 && point_moyen < 15) {
            this.position = "1er";
        } else if (point_moyen >= 11 && point_moyen < 13.5) {
            this.position = "2eme";
        } else if (point_moyen >= 9.5 && point_moyen < 11) {
            this.position = "3eme";
        } else if (point_moyen >= 8.5 && point_moyen < 9.5) {
            this.position = "4eme";
        } else if (point_moyen >= 7.5 && point_moyen < 8.5) {
            this.position = "5eme";
        } else if (point_moyen >= 6.5 && point_moyen < 7.5) {
            this.position = "6eme";
        } else if (point_moyen >= 5.5 && point_moyen < 6.5) {
            this.position = "7eme";
        } else if (point_moyen >= 4.5 && point_moyen < 5.5) {
            this.position = "8eme";
        } else if (point_moyen >= 3.5 && point_moyen < 4.5) {
            this.position = "9eme";
        } else if (point_moyen >= 2.5 && point_moyen < 3.5) {
            this.position = "10eme";
        } else if (point_moyen >= 1.5 && point_moyen < 2.5) {
            this.position = "11eme";
        } else if (point_moyen >= 0 && point_moyen < 1.5) {
            this.position = "12eme";
        }
    }
  },
};
</script>

<style scoped lang="scss">

</style>
