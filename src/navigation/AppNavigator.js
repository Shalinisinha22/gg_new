import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeaderTitle from '../components/CustomHeaderTitle';
import Theme from '../constants/Theme';
import SplashScreen from '../screens/splash/SplashScreen';
import Slide1 from '../screens/splash/Slide1';
import Slide2 from '../screens/splash/Slide2';
import Slide3 from '../screens/splash/Slide3';
// Auth Screens
import Login from '../screens/auth/Login';
import OTPVerification from '../screens/auth/OTPVerification';
import RoleSelection from '../screens/role/RoleSelection';

// Tab Navigators
import { AdminTabs, ParentTabs, StaffTabs, StudentTabs } from './BottomTabNavigator';

// Common Screens
import AdminSettings from '../screens/admin/Settings';
import Downloads from '../screens/common/Downloads';
import Notifications from '../screens/common/Notifications';
import SearchStudent from '../screens/common/SearchStudent';
import UploadTest from '../screens/common/UploadTest';
import LanguageSelection from '../screens/language/LanguageSelection';
import { createHeaderConfig } from './headerConfig';
const Stack = createNativeStackNavigator();
import theme from '../constants/Theme';

const AppNavigator = () => {
    const headerConfig = createHeaderConfig(theme);

  return (
   <Stack.Navigator
      initialRouteName="Slide1"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
     
      {/* <Stack.Screen name="Slide1" component={Slide1} options={{ headerShown: false }} /> */}
       <Stack.Screen name="Slide1" component={Slide1} options={{ headerShown: false }} />
      <Stack.Screen name="Slide2" component={Slide2} options={{ headerShown: false }} />
      <Stack.Screen name="Slide3" component={Slide3} options={{ headerShown: false }} />

      {/* Auth Screens - No headers */}
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} options={{ headerShown: false }} />
      <Stack.Screen name="RoleSelection" component={RoleSelection} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />

      {/* Role-based Dashboards - No headers (using tab navigation) */}
      <Stack.Screen name="StudentDashboard" component={StudentTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ParentDashboard" component={ParentTabs} options={{ headerShown: false }} />
      <Stack.Screen name="StaffDashboard" component={StaffTabs} options={{ headerShown: false }} />
      <Stack.Screen name="AdminDashboard" component={AdminTabs} options={{ headerShown: false }} />

      {/* Common Screens - With headers */}
      <Stack.Screen
        name="AdminSettings"
        component={AdminSettings}
        options={{ title: 'settings.title' }}
      />
      <Stack.Screen
        name="Downloads"
        component={Downloads}
        options={{ title: 'downloads.title' }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: 'notifications.title' }}
      />
      <Stack.Screen
        name="SearchStudent"
        component={SearchStudent}
        options={{ title: 'search.title' }}
      />
      <Stack.Screen
        name="UploadTest"
        component={UploadTest}
        options={{ title: 'upload.title' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;