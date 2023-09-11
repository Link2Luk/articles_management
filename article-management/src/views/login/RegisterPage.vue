<template>
  <div class="wrapper">
    <h1 class="title">Register</h1>
    <el-form ref="formRef" :model="form" :rules="rules" status-icon label-suffix=":" label-width="110">
      <el-form-item label="Email Address" prop="email">
        <el-input v-model="form.email" placeholder="Please input" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" show-password v-model="form.password" placeholder="Please input" />
      </el-form-item>
      <el-form-item label="Confirm" prop="confirm">
        <el-input type="password" show-password v-model="form.confirm" placeholder="Please input" />
      </el-form-item>
      <el-button class="button" plain :loading="btnLoading" @click="handleSignUp">Sign Up</el-button>
    </el-form>
    <div class="link">Already have an account?<el-link type="primary" @click="handleLogin">&nbsp;Login&nbsp;</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getPasswordRegExp } from '@/utils/rules'
import { register } from '@/api/login'
import { useRouter } from 'vue-router'
const router = useRouter()
const formRef = ref<FormInstance>()
const form = ref({ email: '', password: '', confirm: '' })

const passwordRules = getPasswordRegExp().map(({ pattern, message }) => (
  { pattern, message, trigger: 'blur' }
))
const passwordValidator = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password.'))
  } else {
    if (form.value.confirm !== '') formRef.value?.validateField('confirm')
    callback()
  }
}
const confirmValidator = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again.'))
  } else if (value !== form.value.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof form>>({
  email: [{ type: 'email', required: true, message: "Please input a valid email address.", trigger: 'blur' }],
  password: [{ validator: passwordValidator, trigger: 'blur' }, ...passwordRules],
  confirm: [{ validator: confirmValidator, trigger: 'blur' }],
})

const btnLoading = ref(false)
const handleSignUp = () => {
  formRef.value!.validate(valid => {
    if (valid) {
      btnLoading.value = true
      const data = form.value
      register(data).then(({ data }) => {
        const { code } = data
        if (code === 0) {
          ElMessage({ type: "success", message: "Account created!" })
          router.push({ name: 'login' })
        } else {
          const { message } = data
          throw new Error(message)
        }
      }).catch(({ message = 'Fail to create the account' }) => {
        ElMessage({ type: "error", message })
      }).finally(() => {
        btnLoading.value = false
      })
    } else {
      ElMessage({ type: "error", message: 'Please input valid information!' })
    }
  })
}

const handleLogin = () => router.push({ name: 'login' })


</script>
<style scoped src="./loginCss.scss"></style>