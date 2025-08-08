import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import CreateGroup from './screens/CreateGroup'; 
import JoinGroup from './screens/JoinGroup';
import GroupChatScreen from './screens/GroupChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} /> 
        <Stack.Screen name="JoinGroup" component={JoinGroup} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
