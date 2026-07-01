import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function PasswordSecurityScreen() {
  const router = useRouter();

  // Inputs state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [secureCurrent, setSecureCurrent] = useState(true);
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;
    
    // Redirect to the success screen with purpose=password
    router.push({
      pathname: '/success',
      params: { purpose: 'password' }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-6 pt-3 pb-4 flex-row items-center gap-3 border-b border-slate-100 bg-white">
        <TouchableOpacity 
          className="p-2 bg-[#EFF4F0] rounded-full active:opacity-70"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="#1B3B22" />
        </TouchableOpacity>
        <View>
          <Text className="text-[#1B3B22] text-xl font-bold">Password & Security</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            Manage your credentials and login safety
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Security Banner Illustration */}
        <View className="items-center justify-center py-6 mb-6">
          <View className="w-16 h-16 rounded-3xl bg-[#FEF3C7] items-center justify-center shadow-sm">
            <Ionicons name="key" size={28} color="#F59E0B" />
          </View>
          <Text className="text-[#1E293B] text-base font-bold mt-4">Change Password</Text>
          <Text className="text-[#94A3B8] text-xs text-center mt-1 px-12 leading-relaxed font-semibold">
            Choose a strong password with at least 8 characters, including numbers and symbols.
          </Text>
        </View>

        {/* Input Fields */}
        <View className="px-6 gap-y-5">
          {/* Current Password */}
          <View>
            <Text className="text-[#475569] text-xs font-bold mb-2 ml-1">Current Password</Text>
            <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
              <Ionicons name="lock-closed-outline" size={18} color="#64748B" />
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={secureCurrent}
                autoCapitalize="none"
                className="flex-1 text-[#1E293B] text-sm p-0 px-3 font-semibold"
                style={{ outlineStyle: 'none' } as any}
              />
              <TouchableOpacity onPress={() => setSecureCurrent(!secureCurrent)} className="p-1">
                <Ionicons name={secureCurrent ? "eye-off-outline" : "eye-outline"} size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View>
            <Text className="text-[#475569] text-xs font-bold mb-2 ml-1">New Password</Text>
            <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
              <Ionicons name="lock-closed-outline" size={18} color="#64748B" />
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={secureNew}
                autoCapitalize="none"
                className="flex-1 text-[#1E293B] text-sm p-0 px-3 font-semibold"
                style={{ outlineStyle: 'none' } as any}
              />
              <TouchableOpacity onPress={() => setSecureNew(!secureNew)} className="p-1">
                <Ionicons name={secureNew ? "eye-off-outline" : "eye-outline"} size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm New Password */}
          <View>
            <Text className="text-[#475569] text-xs font-bold mb-2 ml-1">Confirm New Password</Text>
            <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
              <Ionicons name="lock-closed-outline" size={18} color="#64748B" />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={secureConfirm}
                autoCapitalize="none"
                className="flex-1 text-[#1E293B] text-sm p-0 px-3 font-semibold"
                style={{ outlineStyle: 'none' } as any}
              />
              <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)} className="p-1">
                <Ionicons name={secureConfirm ? "eye-off-outline" : "eye-outline"} size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Update Password CTA Button */}
        <View className="px-6 mt-10">
          <TouchableOpacity 
            onPress={handleUpdatePassword}
            activeOpacity={0.8}
            className="rounded-2xl shadow-md shadow-[#10B981]/25 overflow-hidden"
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3.5 items-center justify-center"
            >
              <Text className="text-white text-sm font-black">Update Password</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
