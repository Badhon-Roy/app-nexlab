import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function PersonalInfoScreen() {
  const router = useRouter();

  // Inputs state
  const [fullName, setFullName] = useState('Sarah Johnson');
  const [email, setEmail] = useState('sarah.johnson@gmail.com');
  const [location, setLocation] = useState('New York, USA');

  const handleSaveChanges = () => {
    // Show success and go back
    router.back();
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
          <Text className="text-[#1B3B22] text-xl font-bold">Personal Info</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            Update your profile metadata & email
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Editor Center Area */}
        <View className="items-center mb-8">
          <View className="relative w-24 h-24">
            <View className="w-full h-full rounded-full overflow-hidden border-2 border-[#10B981]/20 shadow-sm">
              <Image 
                source={require('@/assets/images/female_tutor.png')} 
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            </View>
            {/* Camera Overlay Icon */}
            <TouchableOpacity 
              activeOpacity={0.85}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#10B981] border-2 border-white items-center justify-center shadow-md shadow-emerald-500/20 active:opacity-90"
            >
              <Ionicons name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-[#1E293B] text-base font-bold mt-3">Sarah Johnson</Text>
          <Text className="text-[#94A3B8] text-[11px] font-semibold mt-0.5">Joined May 2024</Text>
        </View>

        {/* Input Fields */}
        <View className="px-6 gap-y-5">
          {/* Full Name */}
          <View>
            <Text className="text-[#475569] text-xs font-bold mb-2 ml-1">Full Name</Text>
            <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
              <Ionicons name="person-outline" size={18} color="#64748B" />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor="#94A3B8"
                className="flex-1 text-[#1E293B] text-sm p-0 px-3 font-semibold"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>
          </View>

          {/* Email Address */}
          <View>
            <Text className="text-[#475569] text-xs font-bold mb-2 ml-1">Email Address</Text>
            <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
              <Ionicons name="mail-outline" size={18} color="#64748B" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-[#1E293B] text-sm p-0 px-3 font-semibold"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>
          </View>

          {/* Location */}
          <View>
            <Text className="text-[#475569] text-xs font-bold mb-2 ml-1">Location</Text>
            <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
              <Ionicons name="location-outline" size={18} color="#64748B" />
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                placeholderTextColor="#94A3B8"
                className="flex-1 text-[#1E293B] text-sm p-0 px-3 font-semibold"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>
          </View>
        </View>

        {/* Save CTA Button */}
        <View className="px-6 mt-10">
          <TouchableOpacity 
            onPress={handleSaveChanges}
            activeOpacity={0.8}
            className="rounded-2xl shadow-md shadow-[#10B981]/25 overflow-hidden"
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-3.5 items-center justify-center"
            >
              <Text className="text-white text-sm font-black">Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
