import { Loading } from "@/components/loading";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack as ExpoStack } from "expo-router";
import { SafeAreaView } from "react-native";
import colors from "tailwindcss/colors";

function Stack() {
  return (
    <ExpoStack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.slate[900],
        },
      }}
    />
  );
}

export default function Layout() {
  const [isFontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      {isFontLoaded ? <Stack /> : <Loading />}
    </SafeAreaView>
  );
}
