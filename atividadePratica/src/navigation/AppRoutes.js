import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Login"
            >

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Tasks"
                    component={TasksScreen}
                    options={{
                        title: 'TaskSync'
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}