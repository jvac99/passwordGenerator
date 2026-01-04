import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/home";
import Passwords from "./pages/passwords";

const Tab = createBottomTabNavigator()

const Routes = () => {

    const isFocus = (name, focused) => {
        return focused ? name : `${name}-outline`
    }

    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={Home} options={{
                headerShown: false,
                headerShowLabel: false,
                tabBarIcon: ({ focused, size, color }) => <Ionicons size={size} color={color} name={isFocus('home', focused)} />
            }} />
            <Tab.Screen name="passwords" component={Passwords}
                options={{
                    headerShown: false,
                    headerShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => <Ionicons size={size} color={color} name={isFocus('lock-closed', focused)} />
                }}
            />
        </Tab.Navigator>
    )
}


export default Routes