// Authentication Type Definitions

export interface User {
  id: string;
  email: string;
  displayName: string;
  interfaceLanguage: 'en' | 'ru';
  currentLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  totalXp: number;
  streakCount: number;
  subscriptionTier: 'free' | 'premium' | 'premium_plus';
  avatarUrl?: string;
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
  interfaceLanguage: 'en' | 'ru';
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
    refreshToken?: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}
