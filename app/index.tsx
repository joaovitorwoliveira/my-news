import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { isLoggedIn, isLoading, checkAuthStatus } = useAuth();
  const [forceReload, setForceReload] = useState(0);

  useEffect(() => {
    checkAuthStatus();

    const interval = setInterval(() => {
      checkAuthStatus();
      setForceReload((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log(
    "Index: isLoading:",
    isLoading,
    "isLoggedIn:",
    isLoggedIn,
    "forceReload:",
    forceReload
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (isLoggedIn) {
    console.log("Index: Redirecionando para tabs");
    return <Redirect href="/(tabs)" />;
  }

  console.log("Index: Redirecionando para login");
  return <Redirect href="/(auth)/login" />;
}
