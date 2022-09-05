<template>
    <div class="mk8Classement">
        <div class="classement" v-for="items in classement" :key="items.classement">
            <span>{{ items.Name }}</span>
            <span v-if="param === 'Count_mk8'">{{ items.Count_mk8 }} <span class="pts"> pts</span></span>
            <span v-else-if="param === 'Count_mk8_win'">
              {{ items.Count_mk8_win }} <span class="pts">/ {{ items.Count_mk8_courses }}</span>
            </span>
        </div>
        <div class="filter">
            <button id="win" class="button-secondary" @click="toggleParam(true)">
                Win
            </button><br>
            <button id="courses" class="button" @click="toggleParam(false)">
                Courses
            </button>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
  
    data() {
      return {
        classArr: [],
        classement: "",
        param: "Count_mk8",
        para: false
      };
    },
  
    mounted() {
      this.getClassement(this.param);
    },
  
    methods: {
      toggleParam(param){
          if(this.para !== param){
              this.para = param
              let win = document.getElementById("win");
              let courses = document.getElementById("courses");
              
              if(param === true){
                  win.classList.add("button");
                  win.classList.remove("button-secondary");
                  courses.classList.remove("button");
                  courses.classList.add("button-secondary");

                  this.param = "Count_mk8_win";
              }
              else if(param === false){
                  courses.classList.add("button");
                  courses.classList.remove("button-secondary");
                  win.classList.remove("button");
                  win.classList.add("button-secondary");

                  this.param = "Count_mk8";
              }
              this.getClassement();
          }
      },
      getClassement() {
        axios
          .get(
            "https://6ooontrv.directus.app/items/scoreboard?sort=-" + this.param
          )
          .then((res) => {
            this.classement = res.data.data;
            console.log(res);
          });
      },
    },
  };
  </script>
  
  <style scoped lang="scss">

  .classement {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px rgba(255,255,255,0.2);
    padding: 15px;
    .pts {
      font-size:10px;
      color: rgba(255,255,255,0.5);
    }
  }
  .filter {
    display: flex;
    gap: 5%;
    padding: 5%;
  }
  </style>