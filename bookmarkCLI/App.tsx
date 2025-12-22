import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "./src/components/SafeScreen";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { AuthProvider } from "./src/contexts/AuthContext";
import { BooksProvider } from "./src/contexts/BooksContext";

export default function App() {
  // return (
  //     <Provider store={store}>
  //       <SafeAreaProvider>
  //         <SafeScreen>
  //           <NavigationContainer>
  //           <RootNavigator />
  //           </NavigationContainer>
  //         </SafeScreen>
  //       </SafeAreaProvider>
  //     </Provider>
   
  // );
  return (
      <AuthProvider>
        <BooksProvider>
          <SafeAreaProvider>
          <SafeScreen>
            <NavigationContainer>
            <RootNavigator />
            </NavigationContainer>
          </SafeScreen>
        </SafeAreaProvider>

        </BooksProvider>
        
      </AuthProvider>
   
  );
}
