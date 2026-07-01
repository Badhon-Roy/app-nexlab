import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleForgotPasswordSubmit = () => {
    // Proceed to OTP verification with purpose 'forgot'
    router.navigate({
      pathname: '/(auth)/verify-otp',
      params: { purpose: 'forgot', email: email }
    });
  };

  const handleLoginRedirect = () => {
    router.navigate('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      
      {/* Back Button */}
      <View className="px-6 pt-6 flex-row items-center justify-between">
        <TouchableOpacity 
          className="p-2 bg-[#EFF4F0] rounded-full active:opacity-70"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="#1B3B22" />
        </TouchableOpacity>
        <View className="items-center gap-1.5 mt-2">
          <Image 
            source={require('@/assets/images/icon.png')} 
            style={{ width: 46, height: 46, borderRadius: 10 }} 
          />
          <Text className="text-[#1B3B22] font-black text-sm tracking-widest uppercase">Nexlab</Text>
        </View>
        <View className="w-9" /> {/* Spacer */}
      </View>

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        {/* Title */}
        <View className="items-center mt-6 mb-8">
          <Text className="text-[#1B3B22] text-[32px] font-black tracking-tight text-center">Forgot Password</Text>
          <Text className="text-[#64748B] text-sm text-center font-medium mt-3 px-2 leading-[22px]">
            {"Enter your email address and we'll send you an OTP code to reset your password."}
          </Text>
        </View>

        {/* Inputs */}
        <View className="gap-4 mb-8">
          {/* Email */}
          <View className="flex-row items-center bg-white h-[56px] rounded-full border border-[#E2E8F0] px-5 shadow-sm">
            <Ionicons name="mail-outline" size={20} color="#64748B" className="mr-3" />
            <TextInput
              className="flex-1 text-[#0F172A] text-sm ml-2 font-medium"
              placeholder="Email"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          className="bg-[#1B3B22] h-[52px] rounded-full justify-center items-center shadow-sm mb-6 active:opacity-90"
          onPress={handleForgotPasswordSubmit}
        >
          <Text className="text-white text-sm font-black">Send OTP</Text>
        </TouchableOpacity>

        {/* Bottom Redirect */}
        <View className="flex-row justify-center items-center mt-8 mb-4">
          <Text className="text-[#64748B] text-xs font-semibold">Back to </Text>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text className="text-[#1B3B22] text-xs font-black underline">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
