import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Theme from "../constants/Theme";
import { useLanguage } from '../hooks/useLanguage';

// Student Screens
import StudentAttendance from '../screens/student/Attendance';
import StudentDashboard from '../screens/student/Dashboard';
import StudentHostelFee from '../screens/student/HostelFee';
import StudentProfile from '../screens/student/Profile';
import StudentReports from '../screens/student/Reports';

// Parent Screens
import ParentChildInfo from '../screens/parent/ChildInfo';
import ParentDashboard from '../screens/parent/Dashboard';
import ParentFee from '../screens/parent/Fee';
import ParentProfile from '../screens/parent/Profile';
import ParentReports from '../screens/parent/Reports';

// Admin Screens
import AdminAnnouncements from '../screens/admin/Announcements';
import AdminAttendance from '../screens/admin/Attendance';
import AdminDashboard from '../screens/admin/Dashboard';
import AdminFees from '../screens/admin/Fees';
import AdminProfile from '../screens/admin/Profile';

// Staff Screens
import StaffAttendance from '../screens/staff/Attendance';
import StaffDashboard from '../screens/staff/Dashboard';
import StaffMessages from '../screens/staff/Messages';
import StaffProfile from '../screens/staff/Profile';
import StaffReports from '../screens/staff/Reports';

const Tab = createBottomTabNavigator();
const { Colors } = Theme;

export const StudentTabs = () => {

  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: { 
          height: 60,
          backgroundColor: Colors.background,
        },
        tabBarLabelStyle: { 
          paddingBottom: 8,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StudentDashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.home'),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={StudentAttendance}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-check" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.attendance'),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={StudentReports}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.reports'),
        }}
      />
      <Tab.Screen
        name="Fees"
        component={StudentHostelFee}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.fees'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={StudentProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.profile'),
        }}
      />
    </Tab.Navigator>
  );
};

export const ParentTabs = () => {

  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: { 
          height: 60,
          backgroundColor: Colors.background,
        },
        tabBarLabelStyle: { 
          paddingBottom: 8,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ParentDashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.home'),
        }}
      />
      <Tab.Screen
        name="ChildInfo"
        component={ParentChildInfo}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-child" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.childInfo'),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ParentReports}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.reports'),
        }}
      />
      <Tab.Screen
        name="Fees"
        component={ParentFee}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.fees'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ParentProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.profile'),
        }}
      />
    </Tab.Navigator>
  );
};

export const AdminTabs = () => {

  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: { 
          height: 60,
          backgroundColor: Colors.background,
        },
        tabBarLabelStyle: { 
          paddingBottom: 8,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.dashboard'),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AdminAttendance}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-check" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.attendance'),
        }}
      />
      <Tab.Screen
        name="Fees"
        component={AdminFees}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cash" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.fees'),
        }}
      />
      <Tab.Screen
        name="Announcements"
        component={AdminAnnouncements}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bullhorn" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.announcements'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.profile'),
        }}
      />
    </Tab.Navigator>
  );
};

export const StaffTabs = () => {

  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: { 
          height: 60,
          backgroundColor: Colors.background,
        },
        tabBarLabelStyle: { 
          paddingBottom: 8,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={StaffDashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.dashboard'),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={StaffAttendance}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-check" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.attendance'),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={StaffReports}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="file-document" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.reports'),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={StaffMessages}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.messages'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={StaffProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          tabBarLabel: t('navigation.profile'),
        }}
      />
    </Tab.Navigator>
  );
};