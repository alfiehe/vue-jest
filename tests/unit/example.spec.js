import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue 测试组件渲染输出', () => {
  it('test component exists', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.exists()).toBe(true);
  })
  it('test text', () => {
    const wrapper = shallowMount(HelloWorld)
    const msg = 'documentation';
    expect(wrapper.text()).toMatch(msg);
  })
  it('test html', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.html()).toContain('<h3>Installed CLI Plugins</h3>');
  })
  it('test attribute and class', () => {
    const wrapper = shallowMount(HelloWorld)
    // 查找第一个div
    const dom = wrapper.find('div');
    expect(dom.classes()).toContain('hello')
    expect(dom.attributes().id).toBeFalsy();
  })
  it('test props', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.props('msg')).toBe('new message');
  })
  it('test style', () => {
    const wrapper = shallowMount(HelloWorld)
    const style = wrapper.find('h1').element.style
    expect(style.color).toBe('green')
    expect(style.fontSize).toBe('20px')
  })
})
