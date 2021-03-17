import { shallowMount } from '@vue/test-utils';
import ItemList from '@/components/HackerNews/ItemList.vue';
import Item from '@/components/HackerNews/Item.vue';

describe('HackerNews ItemList.vue', () => {
  it('测试渲染子组件的数量', () => {
    window.items = [{}, {}, {}];
    const wrapper = shallowMount(ItemList);
    const items = wrapper.findAllComponents(Item);
    expect(items).toHaveLength(window.items.length);
  });
  it('测试props', () => {
    window.items = [{}, {}, {}];
    const wrapper = shallowMount(ItemList);
    const items = wrapper.findAllComponents(Item);
    items.wrappers.forEach((it, i) => {
      expect(it.props().item).toBe(window.items[i]);
    });
  });
});