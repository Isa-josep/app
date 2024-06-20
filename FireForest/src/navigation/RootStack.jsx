import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CredentialsContext } from "../Components/CredentialsContext";

const Stack = createNativeStackNavigator();

import Login from "../screens/Auth/Login";
import Register from '../screens/Auth/Register';

import Drawable from './Drawable';
import Profile from '../screens/Settings/Profile';
import Report from '../screens/Report/Report';

export default function RootStack() {

    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer independent={true}>
                    <Stack.Navigator initialRouteName="Login" screenOptions={{
                        headerShown: false
                    }}>
                        {storedCredentials ? (
                            <>
                                <Stack.Screen name='Home' component={Drawable} />
                                <Stack.Screen name='Profile' options={{ presentation: 'modal' }} component={Profile} />
                                <Stack.Screen name='Report' options={{ headerShown: true, headerTitle: '' }} component={Report} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="Login"  component={Login} />
                                <Stack.Screen name="Register" component={Register} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}