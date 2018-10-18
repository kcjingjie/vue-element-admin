<template>
  <div class="app-container">
    <el-row>
      <el-col v-for="(item, item_index) in id_list" :span="col_span" :key="item.uid">
        <el-card :body-style="{ padding: '0px' }">
          <el-row>
            <el-col v-for="(img, img_index) in item.imgs" :span="12" :key="img_index">
              <img v-bind:src="img" class="image" @click="id_more_info=true,modifying_item=item_index">
            </el-col>
          </el-row>
          <el-select v-model="item.values[0]" :placeholder="item.values[0]" filterable>
            <el-option
              v-for="name in item.options"
              :key="name"
              :label="name"
              :value="name" />
          </el-select>
          <el-button type="warning" class="button" @click="id_more_info=true,modifying_item=item_index">看不清</el-button>
        </el-card>
        <el-dialog :visible.sync="id_more_info" :width="dialog_width">
          <el-row v-for="(img, img_index) in item.imgs" :key="img_index">
            <img v-bind:src="img">
          </el-row>
          <el-select v-model="item.values[0]" :placeholder="item.values[0]" filterable>
            <el-option
              v-for="name in item.options"
              :key="name"
              :label="name"
              :value="name" />
          </el-select>
          <el-row>
            <el-button type="primary" @click="id_more_info=false"> 确认 </el-button>
            <el-button type="warning" @click="id_more_info=false,item.status[0]=-1"> 看不清 </el-button>
          </el-row>
        </el-dialog>
      </el-col>
      <el-col v-for="(item, item_index) in option_list" :span="col_span" :key="item.uid">
        <el-card :body-style="{ padding: '0px' }">
          <el-row>
            <el-col v-for="(img, img_index) in item.imgs" :span="12" :key="img_index">
              <img v-bind:src="img" class="image" @click="option_more_info=true,modifying_item=item_index">
            </el-col>
          </el-row>
          <el-col :span="18">
            <el-checkbox-group v-model="item.values">
              <el-checkbox
                v-for="name in item.options"
                :key="name"
                :label="name" />
            </el-checkbox-group>
          </el-col>
          <el-col :span="6">
            <el-button type="warning" class="button" @click="option_more_info=true,modifying_item=item_index">看不清</el-button>
          </el-col>
        </el-card>
        <el-dialog :visible.sync="option_more_info" :width="dialog_width">
          <el-row v-for="(img, img_index) in item.imgs" :key="img_index">
            <img v-bind:src="img">
          </el-row>
          <el-checkbox-group v-model="item.values">
            <el-checkbox
              v-for="name in item.options"
              :key="name"
              :label="name" />
          </el-checkbox-group>
          <el-row style="margin: 10px">
            <el-button type="primary" @click="option_more_info=false"> 确认 </el-button>
            <el-button type="warning" @click="option_more_info=false,item.status[0]=-1"> 看不清 </el-button>
          </el-row>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row v-for="(item, item_index) in score_list" :key="item_index">
      <el-card>
        {{ item.value }}
        <img v-for="(img, img_index) in item.imgs" v-bind:src="img" :key="img_index" class="image" style="margin: 4px" @click="modifying_item=item_index, score_more_info=true, modifying_img=img_index">
        <el-dialog :visible.sync="score_more_info" :width="dialog_width">
          <el-row>
            <img v-bind:src="score_list[modifying_item].imgs[modifying_img]">
          </el-row>
          <el-row>
            <el-input v-model="veri_list[score_list[modifying_item].veri_list_indexes[modifying_img]].values[0]" style="width: 100px" />
          </el-row>
          <el-row style="margin: 10px">
            <el-button type="primary" @click="setScore()"> 确认 </el-button>
            <el-button type="warning" @click="cancelScore()"> 看不清 </el-button>
          </el-row>
        </el-dialog>
      </el-card>
    </el-row>
    <el-button type="success" @click="updateUnit()">
      校对完成
    </el-button>
  </div>
</template>

<script>
import { getVeriUnits } from '@/api/unitveri'
import { updateVeriUnits } from '@/api/unitveri'
import { getToken } from '@/utils/auth' // getToken from cookie

export default {
  name: 'App',
  data() {
    return {
      unitQuery: {
        examid: 0,
        token: getToken()
      },
      veri_list: [],
      id_list: [],
      option_list: [],
      score_list: [],
      score_more_info: false,
      id_more_info: false,
      option_more_info: false,
      modifying_item: 0,
      modifying_img: 0
    }
  },
  computed: {
    col_span: {
      get: function() {
        return Math.floor(24 / Math.floor(document.documentElement.clientWidth / 300))
      }
    },
    dialog_width: {
      get: function() {
        if (document.documentElement.clientWidth > 1000) {
          return '50%'
        } else {
          return '100%'
        }
      }
    }
  },
  mounted: function() {
    this.unitQuery.examid = this.$route.params && this.$route.params.examid
    this.loadData()
  },
  methods: {
    loadData() {
      getVeriUnits(this.unitQuery).then(response => {
        this.veri_list = response.data.items
        this.regroupData()
      })
    },
    regroupData() {
      this.id_list = []
      this.score_list = []
      this.option_list = []
      for (var i = 0; i <= this.veri_list.length - 1; i++) {
        switch (this.veri_list[i].type) {
          case 0:
            this.id_list.push(this.veri_list[i])
            break
          case 1:
            this.option_list.push(this.veri_list[i])
            break
          case 2:
            var found = false
            for (var j = 0; j < this.score_list.length; j++) {
              if (this.veri_list[i].values[0] === this.score_list[j].value) {
                found = true
                this.score_list[j].imgs.push(this.veri_list[i].imgs[0])
                this.score_list[j].uids.push(this.veri_list[i].uid)
                this.score_list[j].veri_list_indexes.push(i)
              }
            }
            if (!found) {
              var item = {
                value: this.veri_list[i].values[0],
                uids: [],
                imgs: [],
                more_info: false,
                veri_list_indexes: []
              }
              item.imgs.push(this.veri_list[i].imgs[0])
              item.uids.push(this.veri_list[i].uid)
              item.veri_list_indexes.push(i)
              this.score_list.push(item)
            }
            break
        }
      }
    },
    setScore() {
      this.score_more_info = false
      this.modifying_item = 0
      this.modifying_img = 0
      this.regroupData()
    },
    cancelScore() {
      this.score_more_info = false
      this.veri_list[this.score_list[this.modifying_item].veri_list_indexes[this.modifying_img]].status[0] = -1
      this.veri_list[this.score_list[this.modifying_item].veri_list_indexes[this.modifying_img]].values[0] = -1
      this.modifying_item = 0
      this.modifying_img = 0
      this.regroupData()
    },
    updateUnit() {
      updateVeriUnits(this.veri_list).then(() => {
        this.loadData()
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.image {
  height: 50px;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-card {
  border-style: solid;
  border-color: #409EFF;
  margin: 1px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-row {
  margin-bottom: 0px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 1px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  border: 1px solid black;
}

.el-checkbox{
  border: 0px;
}
.el-button {
  border: 0px;
  margin: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.withborder{
  border: 4px solid red
}
</style>

