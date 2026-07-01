import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const TUTOR_DETAILS_DATA: Record<string, any> = {
  '1': {
    name: 'Esther Okafor',
    subject: 'Mathematics Tutor',
    price: 20,
    image: require('@/assets/images/female_tutor.png'),
  },
  '2': {
    name: 'John Doe',
    subject: 'English Tutor',
    price: 18,
    image: require('@/assets/images/male_tutor.png'),
  },
  '3': {
    name: 'Sarah Jenkins',
    subject: 'Coding Tutor',
    price: 25,
    image: require('@/assets/images/female_tutor.png'),
  },
  'featured_1': {
    name: 'Dr. Amara Okonkwo',
    subject: 'STEM Expert',
    price: 45,
    image: require('@/assets/images/female_tutor.png'),
  },
  'featured_2': {
    name: 'Prof. Kwame Asante',
    subject: 'STEM Expert',
    price: 45,
    image: require('@/assets/images/male_tutor.png'),
  },
};

const DEFAULT_TUTOR = {
  name: 'David Smith',
  subject: 'Physics Tutor',
  price: 22,
  image: require('@/assets/images/male_tutor.png'),
};

const TIME_SLOTS = [
  '09:00 AM',
  '11:30 AM',
  '02:00 PM',
  '04:30 PM',
  '06:00 PM',
];

const DURATIONS = [
  { label: '1 Hour', value: 1 },
  { label: '1.5 Hours', value: 1.5 },
  { label: '2 Hours', value: 2 },
];

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const tutorId = (params.id as string) || '1';
  const tutor = TUTOR_DETAILS_DATA[tutorId] || DEFAULT_TUTOR;

  // Selected states
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[0]);

  // Generate next 7 days list dynamically
  const getDates = () => {
    const dates = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 7; i++) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + i);
      dates.push({
        dayName: daysOfWeek[targetDate.getDay()],
        dayNum: targetDate.getDate(),
        month: months[targetDate.getMonth()],
      });
    }
    return dates;
  };

  const datesList = getDates();
  const totalPrice = tutor.price * selectedDuration.value;

  const handleBookingConfirm = () => {
    // Redirect to the success screen with purpose=booking
    router.push({
      pathname: '/success',
      params: { purpose: 'booking' }
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
          <Text className="text-[#1B3B22] text-xl font-black">Book a Lesson</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            Choose schedule to confirm your private class
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tutor row display */}
        <View className="bg-white border-b border-slate-100 p-6 flex-row items-center">
          <View className="w-14 h-14 rounded-2xl overflow-hidden mr-4">
            <Image
              source={tutor.image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>
          <View className="flex-1">
            <Text className="text-[#0F172A] font-black text-[15px]">{tutor.name}</Text>
            <Text className="text-[#64748B] text-xs font-semibold mt-1">{tutor.subject}</Text>
          </View>
          <View>
            <Text className="text-[#10B981] font-black text-lg">${tutor.price}/hr</Text>
          </View>
        </View>

        {/* 1. Date Selection Section */}
        <View className="px-6 mt-6">
          <Text className="text-[#0F172A] text-sm font-black mb-3.5">Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {datesList.map((date, index) => {
              const isSelected = selectedDateIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDateIndex(index)}
                  className={`items-center justify-center w-[64px] h-[80px] rounded-2xl border mr-3.5 shadow-sm shadow-slate-100 ${
                    isSelected 
                      ? 'bg-[#1B3B22] border-[#1B3B22]' 
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <Text className={`text-[10px] font-bold ${isSelected ? 'text-emerald-400' : 'text-[#64748B]'}`}>
                    {date.dayName}
                  </Text>
                  <Text className={`text-xl font-black mt-1 ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>
                    {date.dayNum}
                  </Text>
                  <Text className={`text-[9px] font-bold mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#94A3B8]'}`}>
                    {date.month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 2. Time Selection Section */}
        <View className="px-6 mt-6">
          <Text className="text-[#0F172A] text-sm font-black mb-3.5">Available Time Slots</Text>
          <View className="flex-row flex-wrap gap-3">
            {TIME_SLOTS.map((time, index) => {
              const isSelected = selectedTimeSlot === time;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSelectedTimeSlot(time)}
                  className={`px-4 py-3 rounded-2xl border text-center ${
                    isSelected 
                      ? 'bg-[#E2F5EA] border-[#10B981] shadow-sm shadow-[#10B981]/10' 
                      : 'bg-white border-slate-100 shadow-sm shadow-slate-100/50'
                  }`}
                >
                  <Text className={`text-xs font-black ${isSelected ? 'text-[#10B981]' : 'text-[#475569]'}`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 3. Duration Selection Section */}
        <View className="px-6 mt-6">
          <Text className="text-[#0F172A] text-sm font-black mb-3.5">Lesson Duration</Text>
          <View className="flex-row gap-3.5">
            {DURATIONS.map((dur, index) => {
              const isSelected = selectedDuration.value === dur.value;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDuration(dur)}
                  className={`flex-1 py-3.5 rounded-2xl border items-center justify-center shadow-sm ${
                    isSelected 
                      ? 'bg-[#E2F5EA] border-[#10B981]' 
                      : 'bg-white border-slate-100 shadow-slate-100/50'
                  }`}
                >
                  <Text className={`text-xs font-black ${isSelected ? 'text-[#10B981]' : 'text-[#475569]'}`}>
                    {dur.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Payment & Summary */}
        <View className="mx-6 mt-8 bg-white border border-slate-100 rounded-[28px] p-5 shadow-sm shadow-slate-100/50">
          <Text className="text-[#0F172A] text-sm font-black mb-4">Payment Summary</Text>
          
          <View className="flex-row justify-between mb-3">
            <Text className="text-[#64748B] text-xs font-bold">Class Rate ({selectedDuration.label})</Text>
            <Text className="text-[#1E293B] text-xs font-black">${tutor.price} x {selectedDuration.value}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-[#64748B] text-xs font-bold">Booking Fee</Text>
            <Text className="text-[#10B981] text-xs font-black">FREE</Text>
          </View>

          <View className="border-t border-slate-50 pt-4 mt-1 flex-row justify-between items-center">
            <Text className="text-[#0F172A] text-sm font-black">Total Price</Text>
            <Text className="text-[#10B981] text-xl font-black">${totalPrice}</Text>
          </View>
        </View>

        {/* Confirm Proceed Button */}
        <View className="px-6 mt-8">
          <TouchableOpacity 
            onPress={handleBookingConfirm}
            activeOpacity={0.8}
            className="rounded-2xl shadow-md shadow-[#10B981]/25 overflow-hidden"
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-4 items-center justify-center"
            >
              <Text className="text-white text-sm font-black">Confirm & Pay</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
