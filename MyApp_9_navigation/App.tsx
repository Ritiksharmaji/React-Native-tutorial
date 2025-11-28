import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import {Home} from './src/Component/Home';
import {Login} from './src/Component/Login'
const Stack = createNativeStackNavigator();
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
        {/* <Stack.Screen 
        name="Login" component={Login}
        options={   // to make style for one 
            {
                headerLeft:()=><Button title='Left'/>,
                headerRight:()=><Button title='Right'/>,
                title:"User Login",
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
         /> */}
         <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "User Login",
            headerLeft: () => <></>,
            headerRight: () => <></>,
          }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
