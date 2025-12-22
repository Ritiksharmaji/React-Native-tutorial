import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "./src/components/SafeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
         <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
