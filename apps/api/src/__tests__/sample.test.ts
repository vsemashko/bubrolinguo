// Sample test to validate Jest configuration

describe('Jest Configuration', () => {
  test('should run basic assertions', () => {
    expect(true).toBe(true);
    expect(1 + 1).toBe(2);
    expect('hello').toMatch(/hello/);
  });

  test('should handle async operations', async () => {
    const asyncFunction = async () => {
      return Promise.resolve('success');
    };

    const result = await asyncFunction();
    expect(result).toBe('success');
  });

  test('should handle arrays and objects', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);

    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name');
    expect(obj.value).toBe(42);
  });
});

describe('TypeScript Support', () => {
  test('should work with TypeScript types', () => {
    interface User {
      id: number;
      name: string;
    }

    const user: User = {
      id: 1,
      name: 'Test User',
    };

    expect(user.id).toBe(1);
    expect(user.name).toBe('Test User');
  });
});
