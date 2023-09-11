<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">Index</div>
      <el-button plain :icon="Plus" @click="router.push({ name: 'articlesAdd' })">Add</el-button>
    </div>
    <el-table class="table" ref="tableRef" :data="tableData" v-loading="tableLoading" border stripe fit :height="tableHeight"
      style="width: 100%" :header-cell-style="{ backgroundColor: 'var(--el-fill-color-dark)' }"
      :default-sort="{ prop: 'createdTime', order: 'descending' }" @sort-change="handleSortChange">
      <el-table-column type="index" width="50" align="center"/>
      <el-table-column prop="title" sortable="custom" label="Title" min-width="200" show-overflow-tooltip align="center"/>
      <el-table-column prop="content" label="Content" min-width="300" show-overflow-tooltip/>
      <el-table-column prop="author" sortable="custom" label="Author" width="200" align="center"/>
      <el-table-column prop="createdTime" sortable="custom" label="Created At" width="200" align="center"/>
      <el-table-column label="Actions" width="150" align="center">
        <template #default="scope">
          <el-button link type="primary"
            @click="router.push({ name: 'articlesEdit', params: { id: scope.row.id } })">Edit</el-button>
          <el-divider direction="vertical" />
          <el-popconfirm :icon="InfoFilled" title="Are you sure to delete this article?" confirm-button-text="OK"
            cancel-button-text="No, Thanks" @confirm="handleDelete(scope.$index, scope.row.id)" width="200">
            <template #reference>
              <el-button link type="primary" :loading="btnLoadings[scope.$index]">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination background layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30, 40]"
        v-model:current-page="pagination.page" v-model:page-size="pagination.size" :total="pagination.total"
        @size-change="val => loadArticles(pagination.page, val)"
        @current-change="val => loadArticles(val, pagination.size)" />
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, InfoFilled } from '@element-plus/icons-vue'
import { type Article, type SortProp, type SortOrder } from '@/types/articles'
import { getArticles, deleteArticle } from '@/api/articles'

import { useRouter } from 'vue-router'
const router = useRouter()

const tableData: Ref<Article[]> = ref([])
const pagination = ref({ page: 1, size: 20, total: 0 })
const sort: Ref<{ prop: SortProp, order: SortOrder }> = ref({ prop: 'createdTime', order: 'descending' })

const tableLoading = ref(false)
const loadArticles = (page = pagination.value.page, size = pagination.value.size, prop = sort.value.prop, order = sort.value.order) => {
  tableLoading.value = true
  getArticles(page, size, prop, order).then(({ data }) => {
    const { code, list, total } = data
    if (code === 0) {
      tableData.value = list
      pagination.value.total = total
    }
  }).catch(({ message = 'Fail to load the articles' }) => {
    ElMessage({ type: 'error', message })
  }).finally(() => {
    tableLoading.value = false
  })
}
onMounted(loadArticles)

const tableRef = ref()
const tableHeight = ref()
onMounted(() => {
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  }
})

const handleSortChange = ({ prop, order }: { prop: SortProp, order: SortOrder }) => {
  Object.assign(sort.value, { prop, order })
  loadArticles(pagination.value.page, pagination.value.size, prop, order)
}

const btnLoadings: Ref<boolean[]> = ref([])
const handleDelete = (idx: number, id: string) => {
  btnLoadings.value[idx] = true
  deleteArticle(id).then(({ data }) => {
    const { code } = data
    if (code === 0) loadArticles(pagination.value.page, pagination.value.size)
  }).catch(({ message = 'Fail to delete the articles' }) => {
    ElMessage({ type: 'error', message })
  }).finally(() => {
    btnLoadings.value[idx] = false
  })
}

</script>
<style scoped lang="scss">
.wrapper {
  margin: 8px;
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 8px 0px;

    .title {
      color: var(--el-text-color-regular);
      font-size: 24px;
      font-weight: bold;
    }

    .el-button {
      width: 120px;
      font-weight: bold;
    }
  }

  .table {
    .el-button {
      text-decoration: underline;
    }
  }

  .footer {
    margin: 8px 0px;
    display: flex;
    justify-content: center;
  }
}</style>