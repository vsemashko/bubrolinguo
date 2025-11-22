'use client';

import React, { useState } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { useToast } from '@/components/ui/ToastContainer';

export default function SettingsPage() {
  const { showToast } = useToast();

  // Account Settings
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Learning Preferences
  const [dailyGoal, setDailyGoal] = useState('10');
  const [reminderTime, setReminderTime] = useState('19:00');
  const [targetLevel, setTargetLevel] = useState('B1');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);
  const [weeklyProgress, setWeeklyProgress] = useState(true);

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState('friends');
  const [showInLeaderboard, setShowInLeaderboard] = useState(true);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    showToast('Account settings saved successfully!', 'success');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    // TODO: Implement API call
    showToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    showToast('Learning preferences saved!', 'success');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    showToast('Notification settings saved!', 'success');
  };

  const handleSavePrivacy = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    showToast('Privacy settings saved!', 'success');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement API call
      showToast('Account deletion initiated. You will receive a confirmation email.', 'info');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
          <form onSubmit={handleSaveAccount} className="space-y-4">
            <Input
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
            />
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <div className="pt-4">
              <Button type="submit">Save Account Settings</Button>
            </div>
          </form>
        </Card>

        {/* Password Change */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
          <form onSubmit={handleSavePassword} className="space-y-4">
            <Input
              type="password"
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <Input
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <Input
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <div className="pt-4">
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </Card>

        {/* Learning Preferences */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Preferences</h2>
          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily XP Goal
              </label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              >
                <option value="5">Casual (5 XP/day)</option>
                <option value="10">Regular (10 XP/day)</option>
                <option value="20">Serious (20 XP/day)</option>
                <option value="50">Intense (50 XP/day)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Reminder Time
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Level
              </label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              >
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Intermediate</option>
                <option value="C1">C1 - Advanced</option>
              </select>
            </div>

            <div className="pt-4">
              <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </Card>

        {/* Notification Settings */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
          <form onSubmit={handleSaveNotifications} className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive updates via email</div>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-600">Get notified on your device</div>
              </div>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Streak Reminders</div>
                <div className="text-sm text-gray-600">Daily reminders to keep your streak</div>
              </div>
              <input
                type="checkbox"
                checked={streakReminders}
                onChange={(e) => setStreakReminders(e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Achievement Alerts</div>
                <div className="text-sm text-gray-600">Get notified when you earn achievements</div>
              </div>
              <input
                type="checkbox"
                checked={achievementAlerts}
                onChange={(e) => setAchievementAlerts(e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Weekly Progress Report</div>
                <div className="text-sm text-gray-600">Summary of your learning progress</div>
              </div>
              <input
                type="checkbox"
                checked={weeklyProgress}
                onChange={(e) => setWeeklyProgress(e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
            </label>

            <div className="pt-4">
              <Button type="submit">Save Notification Settings</Button>
            </div>
          </form>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy</h2>
          <form onSubmit={handleSavePrivacy} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Visibility
              </label>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              >
                <option value="public">Public - Everyone can see your profile</option>
                <option value="friends">Friends - Only friends can see your profile</option>
                <option value="private">Private - Profile is hidden</option>
              </select>
            </div>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <div className="font-medium text-gray-900">Show in Leaderboard</div>
                <div className="text-sm text-gray-600">Appear in global and friend leaderboards</div>
              </div>
              <input
                type="checkbox"
                checked={showInLeaderboard}
                onChange={(e) => setShowInLeaderboard(e.target.checked)}
                className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
              />
            </label>

            <div className="pt-4">
              <Button type="submit">Save Privacy Settings</Button>
            </div>
          </form>
        </Card>

        {/* Danger Zone */}
        <Card>
          <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-900 mb-2">Delete Account</h3>
              <p className="text-sm text-red-800 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
              >
                Delete My Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
