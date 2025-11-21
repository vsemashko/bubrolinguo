'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, Input, Avatar, Badge } from '@/components/ui';
import { isAuthenticated, logout } from '@/lib/auth';

export default function ProfilePage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    displayName: 'Anna Kowalska',
    email: 'anna@example.com',
    interfaceLanguage: 'en' as 'en' | 'ru',
    dailyGoal: 50,
    emailNotifications: true,
    pushNotifications: true,
  });

  const [stats, setStats] = useState({
    totalXp: 1250,
    currentLevel: 'A2',
    streakCount: 7,
    longestStreak: 14,
    lessonsCompleted: 15,
    wordsLearned: 342,
    memberSince: '2024-01-15',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // TODO: Load user data from API
    setLanguage(formData.interfaceLanguage);
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    setLanguage(formData.interfaceLanguage);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      language === 'en' ? 'en-US' : 'ru-RU',
      { month: 'long', year: 'numeric' }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🦫</span>
              <span className="text-xl font-bold text-brand-primary">
                Bubrolinguo
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                {language === 'en' ? 'Dashboard' : 'Панель'}
              </Link>
              <Link
                href="/lessons"
                className="text-gray-600 hover:text-gray-900"
              >
                {language === 'en' ? 'Lessons' : 'Уроки'}
              </Link>
              <Link
                href="/profile"
                className="text-brand-primary font-semibold"
              >
                {language === 'en' ? 'Profile' : 'Профиль'}
              </Link>
            </nav>

            <Avatar fallback={formData.displayName} size="md" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Profile Settings' : 'Настройки профиля'}
          </h1>
          <p className="text-gray-600">
            {language === 'en'
              ? 'Manage your account settings and preferences'
              : 'Управляйте настройками вашей учетной записи'}
          </p>
        </div>

        {/* Profile Overview */}
        <Card className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar
                fallback={formData.displayName}
                size="xl"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {formData.displayName}
                </h2>
                <p className="text-gray-600">{formData.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="primary">
                    {stats.currentLevel}
                  </Badge>
                  <Badge variant="warning">
                    {stats.totalXp} XP
                  </Badge>
                  <Badge variant="success">
                    🔥 {stats.streakCount}
                  </Badge>
                </div>
              </div>
            </div>

            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                {language === 'en' ? 'Edit Profile' : 'Редактировать'}
              </Button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.lessonsCompleted}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Lessons' : 'Уроков'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.wordsLearned}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Words' : 'Слов'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.longestStreak}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Best Streak' : 'Лучшая серия'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">
                {formatDate(stats.memberSince)}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Member Since' : 'Участник с'}
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Account Settings' : 'Настройки аккаунта'}
          </h3>

          <div className="space-y-6">
            {/* Display Name */}
            <Input
              label={language === 'en' ? 'Display Name' : 'Отображаемое имя'}
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              disabled={!isEditing}
            />

            {/* Email */}
            <Input
              label={language === 'en' ? 'Email Address' : 'Email адрес'}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!isEditing}
              helperText={
                language === 'en'
                  ? 'Used for login and notifications'
                  : 'Используется для входа и уведомлений'
              }
            />

            {/* Interface Language */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Interface Language' : 'Язык интерфейса'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => isEditing && handleChange('interfaceLanguage', 'en')}
                  disabled={!isEditing}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interfaceLanguage === 'en'
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-gray-300 hover:border-brand-primary/50'
                  } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-2xl mb-1">🇬🇧</div>
                  <div className="font-medium">English</div>
                </button>
                <button
                  type="button"
                  onClick={() => isEditing && handleChange('interfaceLanguage', 'ru')}
                  disabled={!isEditing}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interfaceLanguage === 'ru'
                      ? 'border-brand-primary bg-brand-primary/5'
                      : 'border-gray-300 hover:border-brand-primary/50'
                  } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-2xl mb-1">🇷🇺</div>
                  <div className="font-medium">Русский</div>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave} isLoading={isSaving} disabled={isSaving}>
                {language === 'en' ? 'Save Changes' : 'Сохранить изменения'}
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                disabled={isSaving}
              >
                {language === 'en' ? 'Cancel' : 'Отмена'}
              </Button>
            </div>
          )}
        </Card>

        {/* Learning Preferences */}
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Learning Preferences' : 'Настройки обучения'}
          </h3>

          <div className="space-y-6">
            {/* Daily Goal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Daily XP Goal' : 'Ежедневная цель XP'}
              </label>
              <select
                value={formData.dailyGoal}
                onChange={(e) => handleChange('dailyGoal', parseInt(e.target.value))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value={10}>10 XP - {language === 'en' ? 'Casual' : 'Легко'}</option>
                <option value={25}>25 XP - {language === 'en' ? 'Regular' : 'Обычно'}</option>
                <option value={50}>50 XP - {language === 'en' ? 'Serious' : 'Серьезно'}</option>
                <option value={100}>100 XP - {language === 'en' ? 'Intense' : 'Интенсивно'}</option>
              </select>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">
                  {language === 'en' ? 'Email Notifications' : 'Email уведомления'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Receive progress updates and reminders'
                    : 'Получать обновления прогресса и напоминания'}
                </div>
              </div>
              <button
                onClick={() =>
                  isEditing && handleChange('emailNotifications', !formData.emailNotifications)
                }
                disabled={!isEditing}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.emailNotifications ? 'bg-brand-primary' : 'bg-gray-300'
                } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">
                  {language === 'en' ? 'Push Notifications' : 'Push уведомления'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Get reminded to practice daily'
                    : 'Получать напоминания о ежедневной практике'}
                </div>
              </div>
              <button
                onClick={() =>
                  isEditing && handleChange('pushNotifications', !formData.pushNotifications)
                }
                disabled={!isEditing}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.pushNotifications ? 'bg-brand-primary' : 'bg-gray-300'
                } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave} isLoading={isSaving} disabled={isSaving}>
                {language === 'en' ? 'Save Changes' : 'Сохранить изменения'}
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                disabled={isSaving}
              >
                {language === 'en' ? 'Cancel' : 'Отмена'}
              </Button>
            </div>
          )}
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <h3 className="text-xl font-bold text-red-900 mb-6">
            {language === 'en' ? 'Danger Zone' : 'Опасная зона'}
          </h3>

          <div className="space-y-4">
            {/* Logout */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <div className="font-semibold text-gray-900">
                  {language === 'en' ? 'Logout' : 'Выйти'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Sign out of your account'
                    : 'Выйти из вашей учетной записи'}
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline">
                {language === 'en' ? 'Logout' : 'Выйти'}
              </Button>
            </div>

            {/* Delete Account */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-red-900">
                  {language === 'en' ? 'Delete Account' : 'Удалить аккаунт'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Permanently delete your account and all data'
                    : 'Навсегда удалить вашу учетную запись и все данные'}
                </div>
              </div>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                {language === 'en' ? 'Delete' : 'Удалить'}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
