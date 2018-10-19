<template>
  <div class="app-container">

    <el-checkbox-group v-model="classnamelist" @change="handleClassChange">
      <el-checkbox v-for="c in $store.getters.classes" :key="c.name" :label="c.name" checked/>
    </el-checkbox-group>

<!--
    <div id="myChart" :style="{width: '300px' ,height: '300px'}"></div>
-->
    <div :style="{width:'100%',height:'500px'}" >
      <div id="pie" :style="{width: '500px',height: '378px',float: 'left'}"></div>
      <div id="line" :style="{width: '500px',height:'378px',float: 'right'}"></div>
    </div>
  </div>
</template>
<script>
  import {fetchScoreList} from '@/api/score'
  export default{
    data () {
      return {
        classnamelist: [],
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          classes: '',
          examid: 0
        },
        excellent : 0,
        pass : 0,
        failure : 0,
        scoreList :[],
        nameList:[]
      }
    },
    created() {
      this.listQuery.examid = this.$route.params && this.$route.params.examid;
      this.listQuery.classes = ''
      for (var i = 0; i < this.$store.getters.classes.length; i++) {
        this.listQuery.classes = this.$store.getters.classes[i].id + '#' + this.listQuery.classes
      }
      this.getScoreList()

    },
    mounted(){
      //this.drawLine();
    },
    methods: {
      getScoreList() {
        this.listLoading = true
        fetchScoreList(this.listQuery).then(response => {
          this.list = response.data.items
          this.analysisScore();
          console.log(this.list)
          this.total = response.data.total
          this.listLoading = false
        })
      },
      /*根据成绩计算成绩分布图*/
      analysisScore(){
          for (let i=0;i<this.list.length;i++){
              if (this.list[i].score<60){
                  this.failure=this.failure+1;
              }else if (this.list[i].score>60){
                  this.pass=this.pass+1;
                  if (this.list[i].score>90){
                      this.excellent=this.excellent+1;
                  }
              }
              this.nameList.push(this.list[i].studentname)
              this.scoreList.push(this.list[i].score)
          }
        this.drawPie();
        this.drawLine();
      },
      drawLine1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: '在Vue中使用echarts'},
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
      drawPie(){
        /*基于准备好的dom,初始化饼图*/
        let pie = this.$echarts.init(document.getElementById('pie'))
        //绘制表格
        pie.setOption({
          title: {
            text: '成绩分布图',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['优秀', '及格', '不及格']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [
            {
              name: '成绩来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.excellent, name: '优秀'},
                {value: this.pass, name: '及格'},
                {value: this.failure, name: '不及格'},

              ]
            }
          ]
        })
      },
      drawLine(){
        /*基于准备好的dom,初始化饼图*/
        let line = this.$echarts.init(document.getElementById('line'));
        line.setOption({
          title : {
            text: '成绩分布表',
            subtext: 'score'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['成绩']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : this.nameList,
              axisLabel:{
                interval: 0
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'成绩',
              type:'line',
              data:this.scoreList,
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
          ]
        });
      }
    }
  }
</script>
