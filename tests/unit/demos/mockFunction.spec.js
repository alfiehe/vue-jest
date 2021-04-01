test('测试 jest.fn() 调用', () => {
  const mockFn = jest.fn();
  const result = mockFn(123);

  expect(result).toBeUndefined();
  expect(mockFn).toBeCalled();
  expect(mockFn).toBeCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith(123);
});

test('测试 jest.fn() 返回值', () => {
  const mockFn = jest.fn().mockReturnValue('123456');
  expect(mockFn()).toBe('123456');
});

test('测试 jest.fn() 定义内部实现', () => {
  const mockFn = jest.fn((a, b) => {
    return a * b;
  });
  expect(mockFn(10, 10)).toBe(100);
});

test('测试 jest.fn() 返回 Promise', async () => {
  const mockFn = jest.fn().mockResolvedValue('123456');
  const result = await mockFn();
  expect(result).toBe('123456');
  // 断言mockFn调用后返回的是Promise对象
  expect(Object.prototype.toString.call(mockFn())).toBe('[object Promise]')
});

