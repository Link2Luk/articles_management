import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from '@/views/articles/FormPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { setActivePinia, createPinia } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

describe('Article Form', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('display the right buttons for creating', async () => {
    const wrapper = mount(Form, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).contains('New Article')
    expect(wrapper.text()).contains('Create')
  })
  it('display the right buttons for editing', async () => {
    const wrapper = mount(Form, {
      global: {
        plugins: [router]
      },
      propsData: {
        id: '42'
      }
    })
    expect(wrapper.text()).contains('Edit Article')
    expect(wrapper.text()).contains('Update')
  })
})
