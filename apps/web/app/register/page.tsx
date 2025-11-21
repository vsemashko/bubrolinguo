'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';
import { register } from '@/lib/auth';
import { RegisterRequest } from '@/types/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    displayName: '',
    interfaceLanguage: 'en',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof RegisterRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.displayName.length < 2) {
      setError('Display name must be at least 2 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(formData);

      if (result.success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(
          result.error?.message || 'Registration failed. Please try again.'
        );
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦫</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join Bubrolinguo
          </h1>
          <p className="text-gray-600">
            Start learning Polish from A1 to C1 level
          </p>
        </div>

        {/* Register Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Display Name Input */}
            <Input
              type="text"
              label="Display Name"
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              placeholder="John Doe"
              required
              helperText="This is how other users will see your name"
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />

            {/* Email Input */}
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              }
            />

            {/* Password Input */}
            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              helperText="Minimum 8 characters"
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />

            {/* Confirm Password Input */}
            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />

            {/* Interface Language Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Interface Language
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('interfaceLanguage', 'en')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interfaceLanguage === 'en'
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-gray-300 hover:border-brand-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">🇬🇧</div>
                  <div className="font-medium">English</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('interfaceLanguage', 'ru')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interfaceLanguage === 'ru'
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-gray-300 hover:border-brand-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">🇷🇺</div>
                  <div className="font-medium">Русский</div>
                </button>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="text-xs text-gray-600">
              By signing up, you agree to our{' '}
              <Link
                href="/terms"
                className="text-brand-primary hover:underline"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-brand-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-brand-primary hover:text-brand-primary/80"
              >
                Log in
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
