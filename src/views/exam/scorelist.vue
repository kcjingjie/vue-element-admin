<template>
  <div class="app-container">
    <el-checkbox-group v-model="classnamelist" @change="handleClassChange">
        <el-checkbox v-for="c in $store.getters.classes" :key="c.name" :label="c.name" checked />
    </el-checkbox-group>

    <el-button :loading="downloadLoading" type="primary" icon="document" @click="handleDownload" > 导出Excel </el-button>

    <el-table v-loading.body="listLoading" :data="list" border stripe fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="班级" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.class.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.studentid }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.studentname }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="成绩">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="班级名次">
        <template slot-scope="scope">
          <span>{{ scope.row.classranking }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="年纪名次">
        <template slot-scope="scope">
          <span>{{ scope.row.graderanking }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="动作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/exam/studentscore/'">
            <el-button type="primary" size="small" icon="el-icon-edit">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchScoreList } from '@/api/score'
import { parseTime } from '@/utils'

export default {
  name: 'ExamList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      classnamelist: [],
      list: null,
      total: 0,
      downloadLoading: false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        classes: '',
        examid: 0
      }
    }
  },
  created() {
    this.listQuery.examid = this.$route.params && this.$route.params.examid
    this.listQuery.classes = ''
    for (var i = 0; i < this.$store.getters.classes.length; i++) {
      this.listQuery.classes = this.$store.getters.classes[i].id + '#' + this.listQuery.classes
    }
    this.getScoreList()
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['学号', '姓名', '成绩', '班级名次' , '年级名次']
        const filterVal = ['studentid', 'studentname', 'score', 'classranking', 'graderanking']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth
        })
        this.downloadLoading = false
      })
    },
    handleClassChange() {
      this.listQuery.classes = ''
      for (var i = 0; i < this.$store.getters.classes.length; i++) {
        var checked = false
        for (var j = 0; j < this.classnamelist.length; j++) {
          if (this.$store.getters.classes[i].name == this.classnamelist[j]) {
            checked = true
          }
        }
        if (checked) {
          this.listQuery.classes = this.$store.getters.classes[i].id + '#' + this.listQuery.classes
        }
      }
      this.getScoreList()
    },
    getScoreList() {
      this.listLoading = true
      fetchScoreList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getScoreList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getScoreList()
    },
    parseTime
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
