import { shallowMount } from '@vue/test-utils';
import Item from '@/components/HackerNews/Item.vue';

describe('HackerNews Item.vue', () => {
  it('renders item.score', () => {
    const item = {
      score: 99
    };
    const wrapper = shallowMount(Item, {
      propsData: { item }
    });
    expect(wrapper.text()).toContain(item.score);
  });
  it('renders item.author', () => {
    const item = {
      author: 'daiboy'
    };
    const wrapper = shallowMount(Item, {
      propsData: { item }
    });
    expect(wrapper.text()).toContain(item.author);
  });
  it('renders a link to the time.url with item.title as text', () => {
    const item = {
      title: 'some title',
      url: 'https://www.qq.com/'
    };
    const wrapper = shallowMount(Item, {
      propsData: { item }
    });
    const a = wrapper.find('a');
    expect(a.text()).toBe(item.title);
    expect(a.attributes().href).toBe(item.url);
  });
});