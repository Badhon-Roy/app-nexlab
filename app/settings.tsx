import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen() {
  const router = useRouter();

  // Settings State variables
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [offlineDownload, setOfflineDownload] = useState(true);
  const [studyReminder, setStudyReminder] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState('45 Mins / Day');
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleGoalChange = () => {
    const goals = ['15 Mins / Day', '30 Mins / Day', '45 Mins / Day', '1 Hour / Day', '2 Hours / Day'];
    const currentIndex = goals.indexOf(selectedGoal);
    const nextIndex = (currentIndex + 1) % goals.length;
    setSelectedGoal(goals[nextIndex]);
  };

  const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: () => void }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onValueChange}
      className={`w-12 h-6.5 rounded-full p-0.5 justify-center ${value ? 'bg-[#10B981]' : 'bg-slate-200'}`}
    >
      <View 
        style={{ 
          transform: [{ translateX: value ? 22 : 0 }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 1.5,
          elevation: 2
        }}
        className="w-5.5 h-5.5 rounded-full bg-white"
      />
    </TouchableOpacity>
  );

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
          <Text className="text-[#1B3B22] text-xl font-bold">Settings</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            Customize your learning portal & notifications
          </Text>
        </View>
      </View>

      {/* Settings Options Scroll */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Account Settings */}
        <View className="px-6 mb-6">
          <Text className="text-[#64748B] text-sm font-bold uppercase tracking-wider mb-3 ml-2">Account Settings</Text>
          
          <View className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm shadow-slate-100/50">
            {/* Profile Info Row */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-50 active:opacity-75">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-[#EAF8F0] items-center justify-center">
                  <Ionicons name="person" size={18} color="#10B981" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Personal Info</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Edit avatar, email & username</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>

            {/* Change Password */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-50 active:opacity-75">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-[#FEF3C7] items-center justify-center">
                  <Ionicons name="lock-closed" size={18} color="#F59E0B" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Password & Security</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Update password and authentication</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>

            {/* Premium Status */}
            <View className="flex-row items-center justify-between p-4 bg-white">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-[#EEF2FF] items-center justify-center">
                  <Ionicons name="shield-checkmark" size={18} color="#6366F1" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Verification Badge</Text>
                  <Text className="text-[#10B981] text-[10px] font-bold mt-0.5">Verified Nexlab Learner</Text>
                </View>
              </View>
              <View className="bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                <Text className="text-[#10B981] text-[10px] font-bold">Active</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section 2: Notifications Preference */}
        <View className="px-6 mb-6">
          <Text className="text-[#64748B] text-sm font-bold uppercase tracking-wider mb-3 ml-2">Notifications</Text>
          
          <View className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm shadow-slate-100/50">
            {/* Push Notifications */}
            <View className="flex-row items-center justify-between p-4 border-b border-slate-50">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-[#FFF1F2] items-center justify-center">
                  <Ionicons name="notifications" size={18} color="#F43F5E" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Push Notifications</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Lesson reminders & system alerts</Text>
                </View>
              </View>
              <ToggleSwitch value={pushEnabled} onValueChange={() => setPushEnabled(!pushEnabled)} />
            </View>

            {/* Email Reports */}
            <View className="flex-row items-center justify-between p-4 border-b border-slate-50">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-sky-50 items-center justify-center">
                  <Ionicons name="mail" size={18} color="#0EA5E9" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Weekly Email Reports</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Progress summaries sent to inbox</Text>
                </View>
              </View>
              <ToggleSwitch value={emailEnabled} onValueChange={() => setEmailEnabled(!emailEnabled)} />
            </View>

            {/* Class study reminders */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-[#EAF8F0] items-center justify-center">
                  <Ionicons name="time" size={18} color="#10B981" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Daily Study Reminder</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Get reminded at your study time</Text>
                </View>
              </View>
              <ToggleSwitch value={studyReminder} onValueChange={() => setStudyReminder(!studyReminder)} />
            </View>
          </View>
        </View>

        {/* Section 3: Study Preferences */}
        <View className="px-6 mb-6">
          <Text className="text-[#64748B] text-sm font-bold uppercase tracking-wider mb-3 ml-2">Study Preferences</Text>
          
          <View className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm shadow-slate-100/50">
            {/* Daily Goal */}
            <TouchableOpacity 
              onPress={handleGoalChange}
              className="flex-row items-center justify-between p-4 border-b border-slate-50 active:opacity-75"
            >
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-violet-50 items-center justify-center">
                  <Ionicons name="trending-up" size={18} color="#8B5CF6" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Daily Goal</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Set daily learning time targets</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Text className="text-[#64748B] text-xs font-bold">{selectedGoal}</Text>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            {/* Offline Mode */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-teal-50 items-center justify-center">
                  <Ionicons name="download" size={18} color="#0D9488" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Download via Wi-Fi only</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Save mobile data on course media</Text>
                </View>
              </View>
              <ToggleSwitch value={offlineDownload} onValueChange={() => setOfflineDownload(!offlineDownload)} />
            </View>
          </View>
        </View>

        {/* Section 4: General Info */}
        <View className="px-6 mb-8">
          <Text className="text-[#64748B] text-sm font-bold uppercase tracking-wider mb-3 ml-2">General & Support</Text>
          
          <View className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm shadow-slate-100/50">
            {/* Help Center */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-50 active:opacity-75">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-[#EAF8F0] items-center justify-center">
                  <Ionicons name="help-circle" size={18} color="#10B981" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">Help Center</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">FAQs, chats & support guides</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </TouchableOpacity>

            {/* About App */}
            <View className="flex-row items-center justify-between p-4 bg-white">
              <View className="flex-row items-center gap-3.5">
                <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center">
                  <Ionicons name="information-circle" size={18} color="#64748B" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-sm font-bold">About Nexlab</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">Version 1.0.0 (Build 12)</Text>
                </View>
              </View>
              <Text className="text-[#94A3B8] text-[10.5px] font-bold">Up to date</Text>
            </View>
          </View>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity 
          onPress={() => setIsLogoutModalVisible(true)}
          className="mx-6 border border-rose-200 bg-rose-50/50 py-3.5 rounded-[20px] active:opacity-75 items-center justify-center shadow-sm shadow-rose-100/30"
        >
          <Text className="text-[#F43F5E] text-sm font-bold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white w-full rounded-[28px] p-6 shadow-2xl items-center">
            {/* Warning Icon Box */}
            <View className="w-14 h-14 bg-rose-50 rounded-2xl items-center justify-center mb-4">
              <Ionicons name="log-out" size={26} color="#F43F5E" />
            </View>

            {/* Warning Message */}
            <Text className="text-[#1E293B] text-lg font-bold text-center mb-2">Log Out</Text>
            <Text className="text-[#64748B] text-xs font-semibold text-center leading-5 mb-6 px-4">
              Are you sure you want to log out of your Nexlab account? You will need to sign in again to access your lessons.
            </Text>

            {/* Button Actions */}
            <View className="flex-row gap-3 w-full">
              {/* Cancel Button */}
              <TouchableOpacity
                onPress={() => setIsLogoutModalVisible(false)}
                className="flex-1 border border-slate-100 py-3.5 rounded-2xl bg-white active:opacity-75 items-center justify-center"
              >
                <Text className="text-[#64748B] text-xs font-bold">Cancel</Text>
              </TouchableOpacity>

              {/* Log Out Confirm Button */}
              <TouchableOpacity
                onPress={() => {
                  setIsLogoutModalVisible(false);
                  router.replace('/login');
                }}
                className="flex-1 bg-[#F43F5E] py-3.5 rounded-2xl active:opacity-90 items-center justify-center shadow-md shadow-rose-500/20"
              >
                <Text className="text-white text-xs font-bold">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
