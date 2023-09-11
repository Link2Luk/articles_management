<template>
  <div class="wrapper">
    <h1 class="title">Login</h1>
    <el-form ref="formRef" :model="form" :rules="rules" status-icon label-suffix=":" label-width="110">
      <el-form-item label="Email Address" prop="email">
        <el-input v-model="form.email" placeholder="Please input" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" show-password v-model="form.password" placeholder="Please input" />
      </el-form-item>
      <el-button class="button" plain :loading="btnLoading" @click="handleLogin">Sign In</el-button>
    </el-form>
    <div class="link">Don't have an account?<el-link type="primary"
        @click="router.push({ name: 'register' })">&nbsp;Register&nbsp;</el-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/login'
// import { encrypt } from '@/utils/encryption'
const store = useUserStore()

const router = useRouter()

const formRef = ref<FormInstance>()
const form = ref({ email: '', password: '' })

const rules = reactive<FormRules<typeof form>>({
  email: [{ type: 'email', required: true, message: "Please input a valid email address.", trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
})

const btnLoading = ref(false)
const handleLogin = () => {
  formRef.value!.validate(valid => {
    if (valid) {
      btnLoading.value = true
      // TODO: password encrytion
      // const data = { email: form.value.email, password: encrypt(form.value.password) }
      const data = form.value
      login(data).then(({ data }) => {
        const { code } = data
        if (code === 0) {
          const { user} = data
          ElMessage({ type: "success", message: `Hello, ${user.name}` })
          sessionStorage.setItem('token', user.token)
          store.login(user)
          router.push({ name: 'articlesIndex' })
        } else {
          const { message } = data
          throw new Error(message)
        }
      }).catch(({ message = 'Fail to login!' }) => {
        ElMessage({ type: "error", message })
      }).finally(() => {
        btnLoading.value = false
      })
    } else {
      ElMessage({ type: "error", message: 'Please input valid information!' })
    }
  })
}

</script>
<style scoped src="./loginCss.scss"></style>