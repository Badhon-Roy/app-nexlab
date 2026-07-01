import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const purpose = params.purpose || 'register';

  const handleHomeRedirect = () => {
    // Navigate straight to tabs dashboard and reset stack history
    router.replace('/(tabs)');
  };

  const isRegister = purpose === 'register';

  return (
    <SafeAreaView className="flex-1 bg-white justify-between px-6 py-6" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      
      {/* Top Spacer */}
      <View className="h-6" />

      {/* Main Success Card Center Area */}
      <View className="items-center justify-center flex-1 px-4">
        {/* Animated Checkmark Circle */}
        <View className="w-[120px] h-[120px] bg-[#EBFDF5] border-4 border-[#10B981] rounded-full items-center justify-center mb-8 shadow-sm shadow-[#10B981]/20">
          <Ionicons name="checkmark" size={64} color="#1B3B22" />
        </View>

        {/* Success Title */}
        <Text className="text-[#1B3B22] text-[28px] font-black text-center tracking-tight mb-4">
          {isRegister ? 'Success!' : 'Password Reset'}
        </Text>

        {/* Success Message */}
        <Text className="text-[#64748B] text-sm text-center leading-[22px] px-2 font-medium">
          {isRegister
            ? 'Your account has been successfully verified. Welcome to Nexlab! Get ready to explore courses, workshops, and private coaching.'
            : 'Your password has been successfully reset. You can now log back into your profile securely.'}
        </Text>
      </View>

      {/* Action Button at bottom */}
      <View className="w-full">
        <TouchableOpacity 
          className="bg-[#1B3B22] h-[52px] rounded-full justify-center items-center shadow-sm mb-4 active:opacity-90"
          onPress={handleHomeRedirect}
        >
          <Text className="text-white text-sm font-black">
            {isRegister ? 'Get Started' : 'Go to Home'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
