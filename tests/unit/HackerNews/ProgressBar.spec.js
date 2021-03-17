import { shallowMount } from '@vue/test-utils'
import ProgressBar from '@/components/HackerNews/ProgressBar.vue'

describe('ProgressBar.vue', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  it('组件初始化时，根元素是否有hidden class', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain('hidden');
  })
  it('组件初始化时，进度条宽度为0%', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.element.style.width).toBe('0%');
  })
  it('start方法调用后，移除根元素的hidden class', async () => { 
    const wrapper = shallowMount(ProgressBar); 
    expect(wrapper.classes()).toContain('hidden'); 

    wrapper.vm.start(); 
    await wrapper.vm.$nextTick(); 

    expect(wrapper.classes()).not.toContain('hidden'); 
  })
  it('finish方法调用后，进度条宽为100%', async () => { 
    const wrapper = shallowMount(ProgressBar); 

    wrapper.vm.start(); 
    wrapper.vm.finish(); 

    await wrapper.vm.$nextTick(); 

    expect(wrapper.element.style.width).toBe('100%');
  })
  it('finish() 执行后添加class hidden', async () => { 
    const wrapper = shallowMount(ProgressBar); 

    wrapper.vm.start(); 
    wrapper.vm.finish(); 

    await wrapper.vm.$nextTick(); 

    expect(wrapper.classes()).toContain('hidden');
  })
  it('start方法调用后，重置进度条为0%', async () => { 
    const wrapper = shallowMount(ProgressBar); 

    wrapper.vm.finish(); 
    wrapper.vm.start(); 
    
    await wrapper.vm.$nextTick(); 

    expect(wrapper.element.style.width).toBe('0%');
  })
  it('start方法测试，每间隔100ms进度条宽增加1%', async () => { 
    const wrapper = shallowMount(ProgressBar); 

    wrapper.vm.start(); 

    jest.runTimersToTime(100);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.style.width).toBe('1%');

    jest.runTimersToTime(900);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.style.width).toBe('10%');

    jest.runTimersToTime(4000);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.style.width).toBe('50%');
  })
  it('finish方法测试，清除定时器', () => { 
    jest.spyOn(window, 'clearInterval');
    setInterval.mockReturnValue(123);

    const wrapper = shallowMount(ProgressBar); 
    wrapper.vm.start(); 
    wrapper.vm.finish(); 

    expect(window.clearInterval).toHaveBeenCalledWith(123);
  })

})