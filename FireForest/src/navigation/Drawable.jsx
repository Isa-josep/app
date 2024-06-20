import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import Home from '../screens/Home/Home';
import Courses from '../screens/Home/Courses';
import Rewards from '../screens/Home/Rewards';
import Settings from '../screens/Home/Settings';

function Drawable() {
  return (
    <Drawer.Navigator
      initialRouteName="Reportar Incendio"
      screenOptions={{
        headerStyle: { backgroundColor: '#D32F2F' },
        headerTintColor: 'white',
        drawerStyle: {
          backgroundColor: '#D32F2F',
          width: 240,
        },
        drawerActiveTintColor: 'gray',
        drawerInactiveTintColor: 'white',
      }}
    >
      <Drawer.Screen 
        name="Reportar Incendio" 
        component={Home} 
        options={{ title: 'Reportar Incendio' }} 
      />
      <Drawer.Screen 
        name="Cursos" 
        component={Courses} 
        options={{ title: 'Cursos' }}
      />
      <Drawer.Screen 
        name="Recompensas" 
        component={Rewards} 
        options={{ title: 'Recompensas' }} 
      />
      <Drawer.Screen 
        name="Ajustes" 
        component={Settings} 
        options={{ title: 'Ajustes' }}
      />
    </Drawer.Navigator>
  );
}

export default Drawable;