<template>
  <div class="app-container">
    <el-table v-loading.body="listLoading" :data="list" stripe border fit highlight-current-row style="width: 100%">
      <el-table-column width="100px" label="学科">
        <template slot-scope="scope" >
          <span>{{ scope.row.subject }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="试卷名称">
        <template slot-scope="scope">

          <router-link :to="'/exam/scorelist/'+scope.row.id" class="link-type">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="出卷人">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="出卷时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTimeStamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="动作" min-width="100px">
        <template slot-scope="scope">
          <router-link v-if="scope.row.status == '已校对' " :to="'/exam/scorelist/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-view"> 查分 </el-button>
          </router-link>
          <router-link v-if="scope.row.status == '待扫描' " :to="'/exam/scorelist/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit"> 编辑 </el-button>
          </router-link>
          <router-link v-if="scope.row.status == '待扫描' || scope.row.status == '扫描中' " :to="'/exam/scorelist/'+scope.row.id">
            <el-button type="success" size="small" icon="el-icon-printer"> 扫描 </el-button>
          </router-link>
          <router-link v-if="scope.row.status == '已扫描' || scope.row.status == '校对中' " :to="'/exam/verify/'+scope.row.id">
            <el-button type="success" size="small" icon="el-icon-search"> 校对 </el-button>
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
import { fetchExamList } from '@/api/exam'
import { parseTime } from '@/utils'
import { getToken } from '@/utils/auth' // getToken from cookie

export default {
  name: 'ExamList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已校对': 'success',
        '待扫描': 'info',
        '校对中': 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      classes: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        token: getToken(),
        classes: this.classes,
        status: this.$route.meta.status
      }
    }
  },
  mounted() {
    this.classes = this.$store.getters.classes
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchExamList(this.listQuery).then(response => {
        // this.list = []
        // this.total = 0
        // for (var item in response.data.items) {
        //   console.log(response.data.items[item].status, this.$route.meta.status)
        //   if (response.data.items[item].status in this.$route.meta.status) {
        //     this.list.push(response.data.items[item])
        //     this.total++
        //   }
        // }
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    parseTime,
    getToken
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
