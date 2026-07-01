import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = () => {
    // Navigate straight to tabs on success
    router.replace('/(tabs)');
  };

  const handleRegisterRedirect = () => {
    router.navigate('/(auth)/register');
  };

  const handleForgotPasswordRedirect = () => {
    router.navigate('/(auth)/forgot-password');
  };

  const handleGuestRedirect = () => {
    router.replace('/(tabs)');
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
          <Text className="text-[#1B3B22] text-[32px] font-black tracking-tight">Login</Text>
        </View>

        {/* Inputs */}
        <View className="gap-4 mb-4">
          {/* Email Input */}
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

          {/* Password Input */}
          <View className="flex-row items-center bg-white h-[56px] rounded-full border border-[#E2E8F0] px-5 shadow-sm">
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" className="mr-3" />
            <TextInput
              className="flex-1 text-[#0F172A] text-sm ml-2 font-medium"
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#64748B" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity 
          className="self-center mb-6 py-1.5"
          onPress={handleForgotPasswordRedirect}
        >
          <Text className="text-[#64748B] text-sm font-semibold underline">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          className="bg-[#1B3B22] h-[52px] rounded-full justify-center items-center shadow-sm mb-6 active:opacity-90"
          onPress={handleLoginSubmit}
        >
          <Text className="text-white text-sm font-black">Login</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View className="flex-row items-center justify-center gap-3 mb-6">
          <View className="h-[1px] flex-1 bg-[#E2E8F0]" />
          <Text className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider">or</Text>
          <View className="h-[1px] flex-1 bg-[#E2E8F0]" />
        </View>

        {/* Social Buttons */}
        <View className="gap-3.5 mb-6">
          {/* Google */}
          <TouchableOpacity 
            className="flex-row items-center justify-center bg-[#1B3B22]/5 h-[52px] rounded-full border border-[#1B3B22]/15 active:opacity-80"
            onPress={handleLoginSubmit}
          >
            <Image 
              source={require('@/assets/images/google-icon.webp')} 
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
              className="mr-3"
            />
            <Text className="text-[#1B3B22] text-lg font-bold ml-2">Continue with Google</Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity 
            className="flex-row items-center justify-center bg-[#1B3B22]/5 h-[52px] rounded-full border border-[#1B3B22]/15 active:opacity-80"
            onPress={handleLoginSubmit}
          >
            <Ionicons name="logo-apple" size={18} color="#1B3B22" className="mr-3" />
            <Text className="text-[#1B3B22] text-lg font-bold ml-2">Continue with Apple</Text>
          </TouchableOpacity>

          {/* Guest */}
          <TouchableOpacity 
            className="flex-row items-center justify-center bg-[#1B3B22]/5 h-[52px] rounded-full border border-[#1B3B22]/15 active:opacity-80"
            onPress={handleGuestRedirect}
          >
            <Image 
              source={require('@/assets/images/guest-user-icon.png')} 
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
              className="mr-3"
            />
            <Text className="text-[#1B3B22] text-lg font-bold ml-2">Continue As Guest</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Signup Link */}
        <View className="flex-row justify-center items-center mt-8 mb-4 py-1">
          <Text className="text-[#64748B] text-sm font-semibold">Need an account? </Text>
          <TouchableOpacity onPress={handleRegisterRedirect} className="py-1">
            <Text className="text-[#1B3B22] text-sm font-black underline">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
