<template>
    <div class="navbar">
        <nav>
            <ul>
                <li><button @click="goBack"><SystemUiconsWrapBack class="menu_button"/></button></li>
                <li><router-link to="/"><SystemUiconsHome class="menu_button"/></router-link></li>
                <li><router-link to="/Graphique"><IconParkOutlineRanking class="menu_button"/></router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import SystemUiconsHome from "@/assets/img/SystemUiconsHome.vue"
import IconParkOutlineRanking from "@/assets/img/IconParkOutlineRanking.vue"
import SystemUiconsWrapBack from "@/assets/img/SystemUiconsWrapBack.vue"


export default{
  components:{
    SystemUiconsHome,
    IconParkOutlineRanking,
    SystemUiconsWrapBack
},

methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
}
</script>

<style scoped lang="scss">

    .navbar{
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        background-color: #111111;
        border-top: 1px solid #fff;
        
        // box-shadow: 0px 10px 30px rgba(69, 41, 236, 0.52);
       
        nav{
          
            ul{
                display: flex;
                padding: 0;
                width: 100%;
                gap: 15%;
                justify-content: center;
                list-style-type: none;
                
                li{

                    button{
                        background: none;
                        outline: none;
                        border: none;
                        padding: 0;
                    }
                    .menu_button{
                        font-size: 2rem;
                        color: #fff;
                    }
                }
            }
        }
    }

</style>
