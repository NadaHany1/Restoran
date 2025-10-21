// src/services/authService.ts
import  axios from 'axios';
import type { AxiosError } from 'axios';

export interface User {
  id: number;
  username: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const API_URL = process.env.NEXT_PUBLIC_BASE_URL; // Change this to your backend URL

/**
 * Registers a new user.
 * @param username - The user's chosen username
 * @param password - The user's chosen password
 */
export async function signup(username: string, password: string): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error?: string }>;
    throw new Error(err.response?.data?.error || 'Signup failed');
  }
}

/**
 * Logs in an existing user.
 * @param username - The user's username
 * @param password - The user's password
 */
export async function login(username: string, password: string): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error?: string }>;
    throw new Error(err.response?.data?.error || 'Login failed');
  }
}

/**
 * Saves auth data (token + user) to localStorage.
 */
export function saveAuth(auth: AuthResponse) {
  localStorage.setItem('token', auth.token);
  localStorage.setItem('user', JSON.stringify(auth.user));
}

/**
 * Gets the saved auth token.
 */
export function getToken(): string | null {
  return localStorage.getItem('token');
}

/**
 * Logs the user out (clears local storage).
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
