// Sample test to validate Jest configuration for Next.js app
import '@testing-library/jest-dom';

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

  test('should have jest-dom matchers available', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello World';
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');
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
