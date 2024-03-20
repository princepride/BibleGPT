import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BiblePage from './BiblePage';
import GPTPage from './GPTPage';
import SettingsPage from './SettingsPage';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === t("BottomNavigator_Bible")) {
            return <MaterialCommunityIcons name={focused ? 'book' : 'book-outline'} size={size} color={color} />;
          } else if (route.name === t("BottomNavigator_GPT")) {
            return <Ionicons name={focused ? 'chatbox' : 'chatbox-outline'} size={size} color={color} />;
          } else if (route.name === t("BottomNavigator_Settings")) {
            return <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name={t("BottomNavigator_Bible")} component={BiblePage} />
      <Tab.Screen name="GPT" component={GPTPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
