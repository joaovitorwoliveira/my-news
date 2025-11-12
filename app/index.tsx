import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { isLoggedIn, isLoading, checkAuthStatus } = useAuth();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const performInitialCheck = async () => {
      if (!initialCheckDone) {
        await checkAuthStatus();
        setInitialCheckDone(true);
      }
    };

    performInitialCheck();
  }, [initialCheckDone]);

  console.log(
    "Index: isLoading:",
    isLoading,
    "isLoggedIn:",
    isLoggedIn,
    "initialCheckDone:",
    initialCheckDone
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
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
