import { shallowMount } from '@vue/test-utils'
import Loading from '@/components/Loading.vue'

describe('Loading.vue', () => {

  let wrapper
  // 测试用例之前，重新挂载组件，避免测试用例互相影响
  beforeEach(() => {
    wrapper = shallowMount(Loading)
  })

  it('show func', async () => {
    expect(wrapper.vm.loadingText).toBe("")
    expect(wrapper.vm.showLoading).toBe(false)
    expect(wrapper.isVisible()).toBe(false)

    wrapper.vm.show();
    // 触发了dom更新，需要调用 $nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showLoading).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  it('hide func', async () => {
    wrapper.setData({
      showLoading: true
    })
    // 触发了dom更新，需要调用 $nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showLoading).toBe(true)
    expect(wrapper.isVisible()).toBe(true)

    wrapper.vm.hide()
    // 触发了dom更新，需要调用 $nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showLoading).toBe(false)
    expect(wrapper.isVisible()).toBe(false)
  })

})