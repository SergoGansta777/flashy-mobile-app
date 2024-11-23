import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { SplashScreen, useRouter, useSegments } from "expo-router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

SplashScreen.preventAutoHideAsync();

type OAuthTokens = {
  access_token: string;
  refresh_token: string;
};

type SupabaseContextProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getGoogleOAuthUrl: (redirectTo?: string) => Promise<string | null>;
  setOAuthSession: (tokens: OAuthTokens) => Promise<void>;
};

type SupabaseProviderProps = {
  children: React.ReactNode;
};

export const SupabaseContext = createContext<SupabaseContextProps | undefined>(
  undefined,
);

export const useSupabase = (): SupabaseContextProps => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const segments = useSegments();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear local user and session states
    setUser(null);
    setSession(null);
  };

  const getGoogleOAuthUrl = async (
    redirectTo: string = "flashyapp://google-auth",
  ): Promise<string | null> => {
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          prompt: "select_account", // Ensures the account selection screen is always shown
        },
      },
    });

    if (result.error) throw result.error;
    return result.data.url;
  };

  const setOAuthSession = async (tokens: OAuthTokens) => {
    const { data, error } = await supabase.auth.setSession(tokens);
    if (error) throw error;

    setUser(data.user);
    setSession(data.session);
  };

  // Initialize session and user on mount
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setInitialized(true);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Redirect user based on authentication status
  useEffect(() => {
    if (!initialized) return;

    const isProtectedRoute = segments[0] === "(root)";
    if (session && !isProtectedRoute) {
      router.replace("/(root)/(tabs)/home");
    } else if (!session) {
      router.replace("/(auth)/welcome");
    }

    if (initialized) {
      SplashScreen.hideAsync().catch((err) =>
        console.error("Error hiding splash screen:", err),
      );
    }
  }, [initialized, session]);

  const value = useMemo(
    () => ({
      user,
      session,
      initialized,
      signUp,
      signInWithPassword,
      signOut,
      getGoogleOAuthUrl,
      setOAuthSession,
    }),
    [user, session, initialized],
  );

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};
