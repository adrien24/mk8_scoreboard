<template>
  <div class="mk8Classement">
    <div
      class="classement"
      v-for="(items, index) in classement"
      :key="items.classement"
    >
      <div class="placement">
        <p :id="'plc' + index">{{ index + 1 }}</p>
        <p>{{ items.Name }}</p>
      </div>
      <span v-if="param === 'Count_mk8'"
        >{{ items.Count_mk8 }} <span class="pts"> pts</span></span
      >
      <span v-else-if="param === 'Count_mk8_win'">
        {{ items.Count_mk8_win }}
        <span class="pts">/ {{ items.Count_mk8_courses }}</span>
      </span>
    </div>
    <div class="filter">
      <button id="wins" class="button-secondary" @click="toggleParam(true)">
        Win</button
      ><br />
      <button id="course" class="button" @click="toggleParam(false)">
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
      para: false,
    };
  },

  mounted() {
    this.getClassement(this.param);
  },

  methods: {
    toggleParam(param) {
      if (this.para !== param) {
        this.para = param;
        let win = document.getElementById("wins");
        let courses = document.getElementById("course");

        if (param === true) {
          win.classList.add("button");
          win.classList.remove("button-secondary");
          courses.classList.remove("button");
          courses.classList.add("button-secondary");

          this.param = "Count_mk8_win";
        } else if (param === false) {
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
  // border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  padding: 10 px;
  align-items: center;
  .pts {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
  }
  .placement {
    display: flex;
    align-items: center;
    
    p:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 5px;
      border: 1px solid #fff;
      background-color: transparent;
    }

    p:last-child{
      margin-left: 20px;
    }

    #plc0 {
      background-color: #4529ec;
      border: none;
    }
    #plc1 {
      background-color: #33239b!important;
      border: none;
    }
    #plc2 {
      background-color: #271e5e!important;
      border: none;
    }
  }
}
.filter {
  display: flex;
  gap: 5%;
  padding: 5%;
}
</style>