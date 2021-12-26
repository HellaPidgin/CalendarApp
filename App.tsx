import { StyleSheet, Text, View } from 'react-native';
import { AppProvider } from './app/provider';
import Calendar from './app/views/Calendar';
import Day from './app/views/Day';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Day" component={Day} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
