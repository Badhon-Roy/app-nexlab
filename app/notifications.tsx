import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'class' | 'mentor' | 'achievement' | 'system';
  isUnread: boolean;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Upcoming Class Reminder',
    description: 'Your "Algebra Basics: Chapter 4" is starting in 15 minutes. Get ready to join!',
    time: '15m ago',
    type: 'class',
    isUnread: true,
  },
  {
    id: '2',
    title: 'Assignment Reviewed',
    description: 'Mentor John Doe completed reviews on your Physics assignment. Click to view feedback.',
    time: '2h ago',
    type: 'mentor',
    isUnread: true,
  },
  {
    id: '3',
    title: 'New Achievement Badge!',
    description: 'Congratulations! You completed the Chapter 6: Parts of Speech quiz with a perfect score.',
    time: 'Yesterday',
    type: 'achievement',
    isUnread: false,
  },
  {
    id: '4',
    title: 'Weekly Progress Report',
    description: 'Great job! You studied for 5 hours and finished 2 chapters this week. Keep it up!',
    time: '2 days ago',
    type: 'system',
    isUnread: false,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Animation values map for each item card
  const itemAnimations = useRef<Record<string, Animated.Value>>({}).current;
  const emptyOpacity = useRef(new Animated.Value(0)).current;

  // Initialize Animated.Value for each notification item
  notifications.forEach((item) => {
    if (!itemAnimations[item.id]) {
      itemAnimations[item.id] = new Animated.Value(0);
    }
  });

  // Fade in empty state smoothly when notifications list is cleared
  useEffect(() => {
    if (notifications.length === 0) {
      Animated.timing(emptyOpacity, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [notifications, emptyOpacity]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isUnread: false })));
  };

  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUnread: false } : item))
    );
  };

  const handleClearAll = () => {
    if (notifications.length === 0) return;

    // Create staggered slide out timings from left to right (translateX: 0 -> 500)
    const animSequences = notifications.map((item) => {
      return Animated.timing(itemAnimations[item.id], {
        toValue: 1, // animate to slid-out state
        duration: 380,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      });
    });

    Animated.stagger(90, animSequences).start(() => {
      // Clear state and render empty state once animations complete
      setNotifications([]);
    });
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'class':
        return (
          <View className="w-10 h-10 rounded-full bg-[#E2F5EA] items-center justify-center">
            <Ionicons name="calendar" size={18} color="#10B981" />
          </View>
        );
      case 'mentor':
        return (
          <View className="w-10 h-10 rounded-full bg-[#FEF3C7] items-center justify-center">
            <Ionicons name="chatbubble-ellipses" size={18} color="#F59E0B" />
          </View>
        );
      case 'achievement':
        return (
          <View className="w-10 h-10 rounded-full bg-[#EEF2FF] items-center justify-center">
            <Ionicons name="trophy" size={18} color="#6366F1" />
          </View>
        );
      case 'system':
        return (
          <View className="w-10 h-10 rounded-full bg-[#FDF2F8] items-center justify-center">
            <MaterialCommunityIcons name="trending-up" size={20} color="#EC4899" />
          </View>
        );
    }
  };

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-6 pt-3 pb-4 flex-row items-center justify-between border-b border-slate-100 bg-white">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity 
            className="p-2 bg-[#EFF4F0] rounded-full active:opacity-70"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#1B3B22" />
          </TouchableOpacity>
          <View>
            <Text className="text-[#1B3B22] text-xl font-black">Notifications</Text>
            {unreadCount > 0 && (
              <Text className="text-[#64748B] text-xs font-semibold">
                You have {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
              </Text>
            )}
          </View>
        </View>

        {notifications.length > 0 && (
          <TouchableOpacity 
            onPress={handleMarkAllRead} 
            className="py-1.5 px-3 bg-[#EFF4F0] rounded-full active:opacity-75"
          >
            <Text className="text-[#1B3B22] text-xs font-black">Mark read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Scroll View container */}
      {notifications.length > 0 ? (
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((item) => {
            // Animate card slide out from left to right
            const translateX = itemAnimations[item.id].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            });
            const opacity = itemAnimations[item.id].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            });
            const scale = itemAnimations[item.id].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.92],
            });

            return (
              <Animated.View
                key={item.id}
                style={{
                  transform: [{ translateX }, { scale }],
                  opacity,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleNotificationPress(item.id)}
                  className={`flex-row items-start px-6 py-4 border-b border-slate-100 ${
                    item.isUnread ? 'bg-[#EFF4F0]/30' : 'bg-white'
                  }`}
                >
                  {/* Unread Indicator Dot */}
                  <View className="w-2.5 h-2.5 rounded-full items-center justify-center mr-3 mt-3.5">
                    {item.isUnread && <View className="w-2 h-2 rounded-full bg-[#10B981]" />}
                  </View>

                  {/* Notification Icon */}
                  <View className="mr-4 mt-1">
                    {getIcon(item.type)}
                  </View>

                  {/* Text Area */}
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start gap-1">
                      <Text className="text-[#1B3B22] font-black text-sm flex-1 leading-snug">
                        {item.title}
                      </Text>
                      <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">
                        {item.time}
                      </Text>
                    </View>
                    <Text className="text-[#64748B] text-xs font-semibold mt-1 leading-relaxed">
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}

          {/* Clear All Option */}
          <TouchableOpacity 
            onPress={handleClearAll}
            className="self-center mt-8 py-2 px-6 border border-slate-200 rounded-full active:opacity-70 bg-white shadow-sm"
          >
            <Text className="text-[#64748B] text-xs font-bold">Clear All Notifications</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        /* Empty State (smoothly animated) */
        <Animated.View style={{ opacity: emptyOpacity, flex: 1 }} className="flex-1 w-full items-center justify-center px-8 pb-24">
          <Image
            source={require('../assets/images/empty_notifications.png')}
            style={{ width: 180, height: 180, marginBottom: 8, alignSelf: 'center' }}
            resizeMode="contain"
          />
          <Text className="text-[#1B3B22] text-lg font-black text-center">All Caught Up!</Text>
          <Text className="text-[#64748B] text-sm text-center leading-[22px] font-medium mt-2 px-6">
            {"You don't have any notifications right now. Check back later for updates!"}
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
