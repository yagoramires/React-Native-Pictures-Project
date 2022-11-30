import { StyleSheet } from 'react-native';

// React Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import de páginas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import NewPost from './screens/NewPost';
import Posts from './screens/Posts';
import Post from './screens/Post';

// Método para criar o stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Login'
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Register'
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='New'
          component={NewPost}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Posts'
          component={Posts}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Post'
          component={Post}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
