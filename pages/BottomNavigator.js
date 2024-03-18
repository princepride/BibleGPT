import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BiblePage from './BiblePage';
import GPTPage from './GPTPage';
import SettingsPage from './SettingsPage';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Bible') {
          return <MaterialCommunityIcons name={focused ? 'book' : 'book-outline'} size={size} color={color} />;
        } else if (route.name === 'GPT') {
          return <Ionicons name={focused ? 'chatbox' : 'chatbox-outline'} size={size} color={color} />;
        } else if (route.name === 'Settings') {
          return <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />;
        }
      },
    })}>
      <Tab.Screen name="Bible" component={BiblePage} />
      <Tab.Screen name="GPT" component={GPTPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;