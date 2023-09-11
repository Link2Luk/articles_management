<template>
  <div class="header">
    <el-switch class="modeSwitcher" v-model="isSunny" @change="toggleDark()" :active-action-icon="Sunny"
      :inactive-action-icon="Moon" />
    <template v-if="store.getToken">
      <el-popconfirm :icon="InfoFilled" title="Are you sure to logout?" confirm-button-text="OK"
        cancel-button-text="No, Thanks" @confirm="handleLogout" width="220">
        <template #reference>
          <el-button link type="primary">Logout</el-button>
        </template>
      </el-popconfirm>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { InfoFilled } from '@element-plus/icons-vue'
const isSunny = ref(true)
const isDark = useDark()
const toggleDark = useToggle(isDark)

import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const store = useUserStore()
const router = useRouter()
const handleLogout = () => {
  store.logout()
  ElMessage({ type: 'success', message: 'Lougout!' })
  router.go(0)
  router.push({ name: 'login' })
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row-reverse;
  margin: 8px;

  .el-button {
    margin: 0px 8px;
    text-decoration: underline;
  }
}
</style>