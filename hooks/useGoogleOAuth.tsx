import { useSupabase } from "@/context/supabase-provider";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

type OAuthTokens = {
  access_token: string;
  refresh_token: string;
};

const useGoogleOAuth = (redirectTo: string = "flashyapp://google-auth") => {
  const { getGoogleOAuthUrl, setOAuthSession } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);

  const extractParamsFromUrl = (url: string): OAuthTokens => {
    const params = new URLSearchParams(url.split("#")[1]);
    return {
      access_token: params.get("access_token") || "",
      refresh_token: params.get("refresh_token") || "",
    };
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const url = await getGoogleOAuthUrl(redirectTo);
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(url, redirectTo, {
        showInRecents: true,
      });

      if (result.type === "success") {
        const data = extractParamsFromUrl(result.url);
        if (data.access_token && data.refresh_token) {
          await setOAuthSession(data);
        }
      }
    } catch (error) {
      console.error("Google OAuth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync().catch((err) =>
        console.error("Failed to cool down WebBrowser:", err),
      );
    };
  }, []);

  return {
    handleGoogleSignIn,
    isLoading,
  };
};

export default useGoogleOAuth;
