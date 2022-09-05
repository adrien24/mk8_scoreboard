<template>
    <div class="grapique">
        <div class="graph" id="myChart_parent">
            <canvas id="myChart"></canvas>
        </div>
        <div class="filter">
            <button id="win" class="button-secondary" @click="toggleParam(true)">
                Win
            </button><br>
            <button id="courses" class="button" @click="toggleParam(false)">
                Courses
            </button>
        </div>
        
       <!-- {{ dayjs.utc(classement[0].date_updated).format('YYYY-MM-DDTHH:mm:ssZ[Z]')}}  -->
    </div>
</template>

<script>
    /* eslint-disable */
    import axios from "axios";
    import Chart from 'chart.js/auto';
    import * as dayjs from 'dayjs'
    var utc = require('dayjs/plugin/utc')
    dayjs.extend(utc)
    
    
    export default {
    
      data() {
        return {
          classement: "",
          param: "Count_mk8",
          par: false,
          parFilter: true,
          labels:[],
          data_labels:[],
          dayjs
        };
      },
    
      mounted() {
        this.getClassement();
        
      },
    
      methods: {
        toggleParam(para){
            if(this.par !== para){
                this.par = para
                let win = document.getElementById("win");
                let courses = document.getElementById("courses");
                
                if(para === true){
                    win.classList.add("button");
                    win.classList.remove("button-secondary");
                    courses.classList.remove("button");
                    courses.classList.add("button-secondary");
                    this.param = "Count_mk8_win";
                }
                else if(para === false){
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
          axios.get("https://6ooontrv.directus.app/items/scoreboard?sort=-" + this.param)
            .then((res) => {
                this.classement = res.data.data;
                this.data_labels = []
                this.labels = []
                this.classement.forEach(item =>{
                    if(this.param === "Count_mk8"){this.data_labels.push(item.Count_mk8)}
                    else if(this.param === "Count_mk8_win"){this.data_labels.push(item.Count_mk8_win)}
                    this.labels.push(item.Name)
                })
                
                this.startGraph()
            });
        },
    
        startGraph(){
            const ctx_parent = document.getElementById('myChart_parent');
            ctx_parent.innerHTML = "";
            ctx_parent.innerHTML = "<canvas id='myChart'></canvas>";
    
            const ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.labels,
                    datasets: [{
                        label: 'Score',
                        data: this.data_labels,
                        backgroundColor: [
                            'rgba(69, 41, 236,0.15)',
                        ],
                        borderColor: [
                            'rgba(69, 41, 236,1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
      },
    };
    </script>
    
    <style scoped lang="scss">
    
    .grapique{
        text-align:center;
        display: flex;
        flex-direction: column;
        align-items: center;
        height:100vh;

        h1{
            margin-bottom: 30px
        }
        .graph{
            width:100%;
            max-width:600px
        }
        .filter{
            width:100%;
            #win{
                margin: 25px 0;
            }
        }
    }
    </style>
