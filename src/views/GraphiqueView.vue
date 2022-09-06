<template>
    <div class="GrapiqueView">
        <h1>Classement</h1>
        <div class="toggleview">
            <span id="span_tab" class="active" @click="toggledisplay(false)">Tableau</span>
            <span id="span_graph" @click="toggledisplay(true)">Graphique</span>
        </div>
        <graphiqueVue id="view_graph"  class="display_none"/>
        <classmentVue id="view_tab" />
        
    </div>
</template>

<script>
/* eslint-disable */
import graphiqueVue from "@/components/graphique.vue";
import classmentVue from '@/components/classement.vue'


export default {

    components:{
        graphiqueVue,
        classmentVue,
      
    },

    data() {
        return {
          parFilter: false,
        };
      },

    methods:{
        toggledisplay(para){
            if(this.parFilter !== para){
                this.parFilter = para
                const span_graph = document.getElementById("span_graph");
                const span_tab = document.getElementById("span_tab");
                const view_graph = document.getElementById("view_graph");
                const view_tab = document.getElementById("view_tab");

                if(para === true){
                    span_graph.classList.add("active");
                    span_tab.classList.remove("active");
                    view_graph.classList.remove("display_none");
                    view_tab.classList.add("display_none");
                }
                else if(para === false){
                    span_tab.classList.add("active");
                    span_graph.classList.remove("active");
                    view_graph.classList.add("display_none");
                    view_tab.classList.remove("display_none");
                }
            }
        },
    }

}

  
</script>

<style scoped lang="scss">

.GrapiqueView{
    text-align:center;
    .display_none{
        display:none
    }

    .toggleview{
        font-size:12px;
        display:flex;
        width: fit-content;
        gap:20px;
        margin: 30px auto 30px auto;
        color:rgba(255,255,255,0.5);
        .active{
            color: #4529EC;
        }
    }
}
</style>

