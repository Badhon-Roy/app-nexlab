import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegisterSubmit = () => {
    // Proceed to OTP verification screen
    router.navigate({
      pathname: '/(auth)/verify-otp',
      params: { purpose: 'register', email: email }
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
          <Text className="text-[#1B3B22] text-[32px] font-black tracking-tight">Sign Up</Text>
          <Text className="text-[#64748B] text-xs font-semibold mt-1">Start your learning journey today</Text>
        </View>

        {/* Inputs */}
        <View className="gap-4 mb-8">
          {/* Full Name */}
          <View className="flex-row items-center bg-white h-[56px] rounded-full border border-[#E2E8F0] px-5 shadow-sm">
            <Ionicons name="person-outline" size={20} color="#64748B" className="mr-3" />
            <TextInput
              className="flex-1 text-[#0F172A] text-sm ml-2 font-medium"
              placeholder="Full Name"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />
          </View>

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

          {/* Password */}
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

          {/* Confirm Password */}
          <View className="flex-row items-center bg-white h-[56px] rounded-full border border-[#E2E8F0] px-5 shadow-sm">
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" className="mr-3" />
            <TextInput
              className="flex-1 text-[#0F172A] text-sm ml-2 font-medium"
              placeholder="Confirm Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons 
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#64748B" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          className="bg-[#1B3B22] h-[52px] rounded-full justify-center items-center shadow-sm mb-6 active:opacity-90"
          onPress={handleRegisterSubmit}
        >
          <Text className="text-white text-sm font-black">Sign Up</Text>
        </TouchableOpacity>

        {/* Bottom Redirect */}
        <View className="flex-row justify-center items-center mt-8 mb-4 py-1">
          <Text className="text-[#64748B] text-sm font-semibold">Already have an account? </Text>
          <TouchableOpacity onPress={handleLoginRedirect} className="py-1">
            <Text className="text-[#1B3B22] text-sm font-black underline">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
