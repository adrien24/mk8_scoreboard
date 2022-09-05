import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/Game.vue";
import mk8 from "../views/mk8.vue";
import GraphiqueView from "../views/GraphiqueView.vue"


Vue.use(VueRouter)

const routes = [

  {
    path: "/",
    name: "game",
    component: Game,
  },
  {
    path: "/mk8",
    name: "mk8",
    component: mk8,
  },
  {
    path: "/Graphique",
    name: "Graphique",
    component: GraphiqueView,
  },


 
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router