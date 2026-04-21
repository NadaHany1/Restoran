"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import { User, signUpData } from "@/types/Types";
import { useCartStore } from "./cartContextZustand";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: signUpData) => Promise<{ success: boolean; errors?: Record<string,string[]> }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  // Load session on client
  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          firstName: "",
          lastName: "",
          email: data.session.user.email || "",
        });
      }
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          firstName: "",
          lastName: "",
          email: session.user.email || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, message: error.message };

    if (data.user) {
      setUser({
        id: data.user.id,
        firstName: "",
        lastName: "",
        email: data.user.email || "",
      });
    }

    return { success: true };
  };

  const signup = async (userData: signUpData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password || "",
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
      },
    });

    if (data.user) {
      await supabase.from("users").insert([{ 
        id: data.user.id,
        email: data.user.email,
        first_name: userData.firstName,
        last_name: userData.lastName
      }]);
    }

    if (error) {
      const errors: Record<string, string[]> = {};
      errors.root = [error.message];
      return { success: false, errors };
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: data.user.email || "",
      });
    }

    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    clearCart();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);