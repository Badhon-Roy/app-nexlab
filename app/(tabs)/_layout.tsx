import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  // Dynamic heights based on safe area bottom insets (soft keys vs gestures)
  const safeBottom = insets.bottom > 0 ? insets.bottom : 16;
  const tabHeight = 60 + safeBottom;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#64748B',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarStyle: {
          backgroundColor: '#090D16',
          borderTopWidth: 0,
          height: tabHeight,
          paddingBottom: safeBottom,
          paddingTop: 10,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              {focused && (
                <View style={{ width: 28, height: 3, backgroundColor: '#3B82F6', borderRadius: 2, position: 'absolute', top: -10 }} />
              )}
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              {focused && (
                <View style={{ width: 28, height: 3, backgroundColor: '#3B82F6', borderRadius: 2, position: 'absolute', top: -10 }} />
              )}
              <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="my-learning"
        options={{
          title: 'My Learning',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              {focused && (
                <View style={{ width: 28, height: 3, backgroundColor: '#3B82F6', borderRadius: 2, position: 'absolute', top: -10 }} />
              )}
              <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              {focused && (
                <View style={{ width: 28, height: 3, backgroundColor: '#3B82F6', borderRadius: 2, position: 'absolute', top: -10 }} />
              )}
              <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
