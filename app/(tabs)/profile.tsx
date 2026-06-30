import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const ACHIEVEMENTS = [
  { id: '1', title: 'Quick Learner', detail: 'Complete 10 lessons', icon: 'ribbon', color: '#3B82F6', bg: '#EFF6FF', check: true },
  { id: '2', title: 'Consistency', detail: '7 days streak', icon: 'trophy', color: '#F59E0B', bg: '#FEF3C7', check: true },
  { id: '3', title: 'Top Performer', detail: 'Top 10% learners', icon: 'flame', color: '#8B5CF6', bg: '#F5F3FF', check: false },
  { id: '4', title: 'Goal Setter', detail: 'Set 3 goals', icon: 'shield-checkmark', color: '#10B981', bg: '#EAF8F0', check: false },
  { id: '5', title: 'Knowledge Master', detail: 'Complete 20 courses', icon: 'lock-closed', color: '#64748B', bg: '#F1F5F9', check: false },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      {/* Header Bar */}
      <View className="px-6 flex-row justify-between items-center mb-5 pt-3">
        <View>
          <Text className="text-[#0F172A] text-[28px] font-extrabold tracking-tight">My Profile</Text>
          <Text className="text-[#64748B] text-xs font-semibold mt-0.5">Manage your account and learning journey</Text>
        </View>

        {/* Bell and Settings Icons */}
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="relative p-2 bg-white rounded-full border border-slate-100 shadow-sm active:opacity-70">
            <Ionicons name="notifications-outline" size={22} color="#1E293B" />
            <View className="absolute top-1 right-1 bg-[#EF4444] w-[18px] h-[18px] rounded-full items-center justify-center border-2 border-white">
              <Text className="text-white text-[9px] font-extrabold">3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-white rounded-full border border-slate-100 shadow-sm active:opacity-70">
            <Ionicons name="settings-outline" size={22} color="#1E293B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Layout Scroll View */}
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Info Box */}
        <View className="mb-6 px-6 mt-2">
          <View className="rounded-[16px] flex-row relative h-[180px] w-full shadow-sm shadow-blue-50/50 overflow-hidden">
            {/* Background Image Layer */}
            <Image
              source={require('@/assets/images/profile-banner-background.png')}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
              contentFit="cover"
            />

            {/* Avatar inside background circle (Left side) */}
            <View className="w-[130px] pl-5 justify-center items-center z-10">
              <View className="relative w-[96px] h-[96px]">
                <View className="w-full h-full rounded-full overflow-hidden border border-white">
                  <Image source={require('@/assets/images/female_tutor.png')} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                </View>
                <View className="absolute bottom-2 right-2 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white" />
              </View>
            </View>

            {/* Right Column (Text and Level info) */}
            <View className="flex-1 ml-2 py-5 pr-5 justify-between z-10">
              {/* Top Row: Name and Title */}
              <View>
                <View className="flex-row items-center gap-1">
                  <Text className="text-[#0F172A] font-black text-base" numberOfLines={1}>Sarah Johnson</Text>
                  <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
                </View>
                <View className="flex-row items-center gap-1 mt-0.5">
                  <Text className="text-[#64748B] text-[10px] font-bold">Math Learner</Text>
                  <Ionicons name="pencil" size={10} color="#94A3B8" />
                </View>
              </View>

              {/* Middle Row: Contact Info */}
              <View className="gap-1 my-1">
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="mail-outline" size={11} color="#64748B" />
                  <Text className="text-[#64748B] text-[10px] font-bold" numberOfLines={1}>sarah.johnson@gmail.com</Text>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="location-outline" size={11} color="#64748B" />
                  <Text className="text-[#64748B] text-[10px] font-bold" numberOfLines={1}>New York, USA</Text>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="calendar-outline" size={11} color="#64748B" />
                  <Text className="text-[#64748B] text-[10px] font-bold" numberOfLines={1}>Joined May 2024</Text>
                </View>
              </View>

              {/* Bottom Row: XP Progress Bar & Level */}
              <View className="bg-white/80 border border-slate-100/50 rounded-2xl p-2 shadow-sm shadow-slate-100/30">
                <View className="flex-row justify-between items-center mb-1">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="shield" size={11} color="#3B82F6" />
                    <Text className="text-[#0F172A] text-[9.5px] font-black">Level 8</Text>
                  </View>
                  <Text className="text-[#94A3B8] text-[8px] font-bold">820 / 1200 XP</Text>
                </View>
                <View className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <View className="h-full bg-[#3B82F6] rounded-full" style={{ width: '68%' }} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Summary Rows */}
        <View className="bg-white border border-slate-100 rounded-[28px] p-4 flex-row justify-between mb-8 mx-6 shadow-sm shadow-slate-100/50">
          {/* Card 1 */}
          <View className="items-center flex-1 border-r border-slate-100">
            <View className="w-9 h-9 rounded-full bg-[#EFF6FF] items-center justify-center mb-2">
              <Ionicons name="book" size={16} color="#3B82F6" />
            </View>
            <Text className="text-[#0F172A] text-sm font-black">12</Text>
            <Text className="text-[#94A3B8] text-[9px] font-bold text-center mt-0.5">Courses{"\n"}Enrolled</Text>
          </View>

          {/* Card 2 */}
          <View className="items-center flex-1 border-r border-slate-100">
            <View className="w-9 h-9 rounded-full bg-[#EAF8F0] items-center justify-center mb-2">
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            </View>
            <Text className="text-[#0F172A] text-sm font-black">68</Text>
            <Text className="text-[#94A3B8] text-[9px] font-bold text-center mt-0.5">Lessons{"\n"}Completed</Text>
          </View>

          {/* Card 3 */}
          <View className="items-center flex-1 border-r border-slate-100">
            <View className="w-9 h-9 rounded-full bg-[#FFF7ED] items-center justify-center mb-2">
              <Ionicons name="time" size={16} color="#F97316" />
            </View>
            <Text className="text-[#0F172A] text-sm font-black">24h 30m</Text>
            <Text className="text-[#94A3B8] text-[9px] font-bold text-center mt-0.5">Total Study{"\n"}Time</Text>
          </View>

          {/* Card 4 */}
          <View className="items-center flex-1">
            <View className="w-9 h-9 rounded-full bg-[#F5F3FF] items-center justify-center mb-2">
              <Ionicons name="trending-up" size={16} color="#8B5CF6" />
            </View>
            <Text className="text-[#0F172A] text-sm font-black">85%</Text>
            <Text className="text-[#94A3B8] text-[9px] font-bold text-center mt-0.5">Average{"\n"}Progress</Text>
          </View>
        </View>

        {/* My Activity Section */}
        <View className="mb-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-lg font-bold">My Activity</Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#2563EB] text-xs font-bold">View all</Text>
              <Ionicons name="chevron-forward" size={12} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <View className="bg-white border border-slate-100 rounded-[28px] p-4 mx-6 shadow-sm shadow-slate-100/50">
            {/* Learning Progress */}
            <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-slate-50 active:opacity-75">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-2xl bg-[#EFF6FF] items-center justify-center">
                  <Ionicons name="stats-chart" size={18} color="#3B82F6" />
                </View>
                <View>
                  <Text className="text-[#475569] text-sm font-bold">Learning Progress</Text>
                  <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">Track your overall performance</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-8 h-8 rounded-full border border-[#3B82F6] items-center justify-center">
                  <Text className="text-[#3B82F6] text-[9px] font-black">85%</Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            {/* Saved Topics */}
            <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-slate-50 active:opacity-75">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-2xl bg-[#EAF8F0] items-center justify-center">
                  <Ionicons name="bookmark" size={18} color="#10B981" />
                </View>
                <View>
                  <Text className="text-[#475569] text-sm font-bold">Saved Topics</Text>
                  <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">12 topics saved</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
            </TouchableOpacity>

            {/* Downloads */}
            <TouchableOpacity className="flex-row justify-between items-center py-3 active:opacity-75">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-2xl bg-[#FFF7ED] items-center justify-center">
                  <Ionicons name="download" size={18} color="#F97316" />
                </View>
                <View>
                  <Text className="text-[#475569] text-sm font-bold">Downloads</Text>
                  <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">8 resources downloaded</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements Section */}
        <View className="mb-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-lg font-bold">Achievements</Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#2563EB] text-xs font-bold">View all</Text>
              <Ionicons name="chevron-forward" size={12} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            {ACHIEVEMENTS.map((ach) => (
              <View 
                key={ach.id}
                className="bg-white border border-slate-100 p-3 rounded-[24px] items-center mr-3 shadow-sm shadow-slate-100/50 w-[100px] h-[125px] justify-between relative active:opacity-95"
              >
                {/* Badge Icon graphic */}
                <View style={{ backgroundColor: ach.bg }} className="w-12 h-12 rounded-full items-center justify-center relative">
                  <Ionicons name={ach.icon as any} size={20} color={ach.color} />
                  
                  {/* Checked indicator badge */}
                  {ach.check && (
                    <View className="absolute bottom-0 right-0 w-4 h-4 bg-[#10B981] rounded-full border border-white items-center justify-center">
                      <Ionicons name="checkmark" size={10} color="white" />
                    </View>
                  )}
                </View>

                {/* Details labels */}
                <View className="items-center">
                  <Text className="text-[#0F172A] font-black text-[9.5px] text-center" numberOfLines={1}>{ach.title}</Text>
                  <Text className="text-[#94A3B8] text-[8px] font-bold text-center mt-0.5" numberOfLines={1}>{ach.detail}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Account & Settings Menu list */}
        <View className="mb-4">
          <Text className="text-[#0F172A] text-lg font-bold px-6 mb-4">Account & Settings</Text>

          <View className="bg-white border border-slate-100 rounded-[28px] p-4 mx-6 shadow-sm shadow-slate-100/50 relative overflow-hidden">
            {/* Background graphics overlay (Bottom Right) */}
            <View className="absolute -right-10 -bottom-5 w-[365px] h-[305px] justify-end items-end z-0">
              {/* Glowing circular backdrop halo behind the desk lamp */}
              <View className="absolute right-16 bottom-0 w-32 h-32 rounded-full bg-[#E0F2FE]/50" />
              
              {/* Organic floaty elements matching mockup backdrop details */}
              <View className="absolute right-[160px] bottom-[65px] opacity-15 rotate-[15deg]">
                <Ionicons name="leaf" size={26} color="#3B82F6" />
              </View>
              <View className="absolute right-32 bottom-[50px] opacity-15 rotate-[30deg]">
                <Ionicons name="leaf" size={18} color="#3B82F6" />
              </View>
              <View className="absolute right-36 bottom-[104px] opacity-20">
                <Ionicons name="sparkles" size={14} color="#3B82F6" />
              </View>

              <Image
                source={require('@/assets/images/settings_illustration.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </View>

            {/* Menu List Container */}
            <View className="z-10 gap-0.5">
              {/* Personal Info */}
              <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-slate-50 z-10 active:opacity-75">
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-[#EFF6FF] items-center justify-center">
                    <Ionicons name="person" size={16} color="#3B82F6" />
                  </View>
                  <View>
                    <Text className="text-[#475569] text-sm font-bold">Personal Information</Text>
                    <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">Update your profile details</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </TouchableOpacity>

              {/* Privacy */}
              <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-slate-50 z-10 active:opacity-75">
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-[#F5F3FF] items-center justify-center">
                    <Ionicons name="shield-checkmark" size={16} color="#8B5CF6" />
                  </View>
                  <View>
                    <Text className="text-[#475569] text-sm font-bold">Privacy & Security</Text>
                    <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">Manage your account security</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-slate-50 z-10 active:opacity-75">
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-[#FEF3C7] items-center justify-center">
                    <Ionicons name="notifications" size={16} color="#F59E0B" />
                  </View>
                  <View>
                    <Text className="text-[#475569] text-sm font-bold">Notifications</Text>
                    <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">Manage notification preferences</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </TouchableOpacity>

              {/* Help & Support */}
              <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-slate-50 z-10 active:opacity-75">
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-[#EAF8F0] items-center justify-center">
                    <Ionicons name="help-circle" size={16} color="#10B981" />
                  </View>
                  <View>
                    <Text className="text-[#475569] text-sm font-bold">Help & Support</Text>
                    <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">Get help and contact support</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </TouchableOpacity>

              {/* Log Out */}
              <TouchableOpacity className="flex-row items-center justify-between py-3 z-10 active:opacity-75">
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-xl bg-[#FDF2F8] items-center justify-center">
                    <Ionicons name="log-out" size={16} color="#EC4899" />
                  </View>
                  <View>
                    <Text className="text-[#475569] text-sm font-bold">Log Out</Text>
                    <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">Sign out from your account</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
