<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">{{ id ? 'Edit Article' : 'New Article' }}</div>
      <el-link type="primary" @click="router.push({ name: 'articlesIndex' })">&nbsp;Back to Index&nbsp;</el-link>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules" status-icon label-width="100" label-suffix=":">
      <el-form-item label="Title" prop="title">
        <SkeletonWrapper :loading="loading" animated>
          <el-input v-model="form.title" placeholder="Please input" />
        </SkeletonWrapper>
      </el-form-item>
      <el-form-item label="Content" prop="content">
        <SkeletonWrapper :loading="loading" :count="4" animated>
          <el-input type="textarea" v-model="form.content" placeholder="Please input" :rows="6" />
        </SkeletonWrapper>
      </el-form-item>
      <el-form-item label="Tags" prop="tags">
        <SkeletonWrapper :loading="loading" animated>
          <el-select v-model="form.tags" multiple placeholder="Select">
            <el-option v-for="item in tags"  :label="item.value" :value="item.key" :key="item.key"/>
          </el-select>
        </SkeletonWrapper>
      </el-form-item>
      <el-form-item label="">
        <el-button plain :loading="btnLoading" @click="handleSubmit">{{ id ? 'Update' : 'Create' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import SkeletonWrapper from '@/components/SkeletonWrapper.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { type Article } from '@/types/articles'
import { getArticle, createArticle, updateArticle } from '@/api/articles'
import { useArticlesStore } from '@/stores/articles'
import { useUserStore } from '@/stores/user'

import { useRouter } from 'vue-router'
const router = useRouter()

const articleStore = useArticlesStore()
const tags = articleStore.getTags

const props = defineProps({ id: String })

const formRef = ref<FormInstance>()
const form: Ref<Article> = ref({ title: '', content: '', tags: [] })
const rules = reactive<FormRules<typeof form>>({
  title: [{ required: true, message: "Please input the title.", trigger: 'blur' }],
  content: [{ required: true, message: "Please input the content.", trigger: 'blur' }],
  tags: [{ type: "array", required: true, message: "Please select the tags.", trigger: 'blur' }],
})
const loading = ref(false)
const loadArticle = (id: string) => {
  loading.value = true
  getArticle(id).then(({ data }) => {
    const { code, item } = data
    if (code === 0) { Object.assign(form.value, item) }
    else { throw new Error(data.message) }
  }).catch(({ message = 'Fail to load the article.' }) => {
    ElMessage({ type: 'error', message })
  }).finally(() => {
    loading.value = false
  })
}
onMounted(() => { props.id && loadArticle(props.id) })


const userStore = useUserStore()
const user = userStore.getUser.name
console.log('author', user)
const btnLoading = ref(false)
const handleSubmit = () => {
  formRef.value!.validate(valid => {
    if (valid) {
      loading.value = true
      btnLoading.value = true
      const data = { author: user, ...form.value }
      const api = props.id ? updateArticle : createArticle
      api(data).then(({ data }) => {
        const { code } = data
        if (code === 0) {
          ElMessage({ type: "success", message: "Success!" })
          router.push({ name: 'articlesIndex' })
        } else {
          throw new Error(data.message)
        }
      }).catch(({ message = props.id ? 'Fail to create the article' : 'Fail to update the article' }) => {
        ElMessage({ type: 'error', message })
      }).finally(() => {
        loading.value = false
        btnLoading.value = false
      })
    } else {
      ElMessage({ type: "error", message: 'Please input valid information!' })
    }
  })
}



</script>
<style scoped lang="scss">
.wrapper {
  margin: 32px auto;
  width: 60%;
  max-width: 600px;
  min-width: 300px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 16px auto;

    .title {
      color: var(--el-text-color-regular);
      font-size: 24px;
      font-weight: bold;
    }
  }

  .el-button {
    width: 150px;
  }
}

:deep(.el-form-item__label:before) {
  display: none;
}

.el-select {
  width: 100%;
}</style>