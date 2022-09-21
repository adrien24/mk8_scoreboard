import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/Game.vue";
import mk8 from "../views/mk8.vue";
import GraphiqueView from "../views/GraphiqueView.vue"
import profil from "../views/profil.vue"
import baby from "../views/baby.vue"
import versus from "../views/versus.vue"


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
  {
    path: "/profil/:id",
    name: "profil",
    component: profil,
  },
  {
    path: "/baby/:key",
    name: "baby",
    component: baby,
  },
  {
    path: "/versus",
    name: "versus",
    component: versus,
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
