import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const purpose = params.purpose || 'register';

  const handleHomeRedirect = () => {
    if (purpose === 'booking') {
      router.replace('/(tabs)/my-learning');
    } else {
      // Navigate straight to tabs dashboard and reset stack history
      router.replace('/(tabs)');
    }
  };

  const getTitle = () => {
    if (purpose === 'booking') return 'Booking Confirmed!';
    if (purpose === 'register') return 'Success!';
    return 'Password Reset';
  };

  const getMessage = () => {
    if (purpose === 'booking') {
      return 'Your private coaching session has been successfully booked. You can view all schedule details in your My Learning tab.';
    }
    if (purpose === 'register') {
      return 'Your account has been successfully verified. Welcome to Nexlab! Get ready to explore courses, workshops, and private coaching.';
    }
    return 'Your password has been successfully reset. You can now log back into your profile securely.';
  };

  const getButtonText = () => {
    if (purpose === 'booking') return 'Go to My Learning';
    if (purpose === 'register') return 'Get Started';
    return 'Go to Home';
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-between px-6 py-6" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      
      {/* Top Spacer */}
      <View className="h-6" />

      {/* Main Success Card Center Area */}
      <View className="items-center justify-center flex-1 px-4">
        {/* Modern Success Illustration */}
        <Image 
          source={require('@/assets/images/success_illustration.png')} 
          style={{ width: 240, height: 240 }}
          resizeMode="contain"
          className="mb-8"
        />

        {/* Success Title */}
        <Text className="text-[#1B3B22] text-[28px] font-black text-center tracking-tight mb-4">
          {getTitle()}
        </Text>

        {/* Success Message */}
        <Text className="text-[#64748B] text-sm text-center leading-[22px] px-2 font-medium">
          {getMessage()}
        </Text>
      </View>

      {/* Action Button at bottom */}
      <View className="w-full pb-8">
        <TouchableOpacity 
          className="bg-[#1B3B22] h-[52px] rounded-full justify-center items-center shadow-sm active:opacity-90"
          onPress={handleHomeRedirect}
        >
          <Text className="text-white text-sm font-black">
            {getButtonText()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
