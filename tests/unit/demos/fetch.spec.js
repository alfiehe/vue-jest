import fetch from '@/demos/fetch.js';
import events from '@/demos/events.js';

// jest.mock('@/demos/fetch.js');

// test('测试 fetchPostList 中的回调函数被调用', async () => {
//   expect.assertions(1);
//   const mockFn = jest.fn();
//   await fetch.fetchPostList(mockFn);

//   // 断言 mockFn 被调用
//   expect(mockFn).toBeCalled();
// });

// test('mock 整个 fetch.js 模块', async () => {
//   expect.assertions(2);
//   await events.getPostList();

//   expect(fetch.fetchPostList).toBeCalled();
//   expect(fetch.fetchPostList).toHaveBeenCalledTimes(1);
// });

test('使用jest.spyOn()监控fetch.fetchPostsList被正常调用', async () => {
  expect.assertions(2);
  const spyFn = jest.spyOn(fetch, 'fetchPostList');

  await events.getPostList();
  expect(spyFn).toBeCalled();
  expect(spyFn).toHaveBeenCalledTimes(1);
});

