<template>
  <div class="app-container">
    <div class="block">
      <el-tree
        :data="data4"
        :props="defaultProps"
        @node-click="handleNodeClick"
        >
      </el-tree>
    </div>
    
 <!-- <el-tree :data="data4" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  --> 
   </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '第一题',
        children: [{
          id: 4,
          label: '1.1',
          children: [{
            id: 9,
            label: '1.2.1'
          }, {
            id: 10,
            label: '1.2.2'
          }]
        }]
      }, {
        id: 2,
        label: '第二题',
        children: [{
          id: 5,
          label: '2.1'
        }, {
          id: 6,
          label: '2.2'
        }]
      }, {
        id: 3,
        label: '第三题',
        children: [{
          id: 7,
          label: '3.1'
        }, {
          id: 8,
          label: '3.2'
        }]
      }];
      return {
        data4: JSON.parse(JSON.stringify(data)),
      }
    },

    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              78分 
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>查看详细</el-button>
              // <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>