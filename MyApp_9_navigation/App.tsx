import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const Login = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title='Go to Home'
        onPress={() => props.navigation.navigate("Home")}
      />
    </View>
  );
};

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={    // to make style all 
            {
                headerStyle:{
                    backgroundColor:"blue",
                },
                headerTintColor:"orange",
                headerTitleStyle:{
                    fontSize:25,
                    fontFamily:"Roboto"
                }
            }
        }
      >
        <Stack.Screen 
        name="Login" component={Login}
        // options={   // to make style for one 
        //     {
        //         title:"User Login",
        //         headerStyle:{
        //             backgroundColor:"blue",
        //         },
        //         headerTintColor:"orange",
        //         headerTitleStyle:{
        //             fontSize:25,
        //             fontFamily:"Roboto"
        //         }
        //     }
        // }
         />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
