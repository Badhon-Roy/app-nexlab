import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const purpose = params.purpose || 'register';
  const emailAddress = params.email || 'your email';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timer, setTimer] = useState(59);
  
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // Countdown timer for Resend code
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    const cleanText = text.replace(/[^0-9]/g, '');
    if (!cleanText) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Handle single digit entry
    const newOtp = [...otp];
    newOtp[index] = cleanText.substring(cleanText.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (index < 3) {
      inputRefs[index + 1].current?.focus();
    } else {
      // Blur on last input or auto-submit
      inputRefs[index].current?.blur();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] !== '') {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(59);
    // Simulate sending new code logic here
  };

  const handleOtpSubmit = () => {
    // Navigate straight to Success Screen
    router.navigate({
      pathname: '/(auth)/success',
      params: { purpose: purpose }
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
          <Text className="text-[#1B3B22] text-[32px] font-black tracking-tight text-center">Verify Email</Text>
          <Text className="text-[#64748B] text-sm text-center font-medium mt-3 px-2 leading-[22px]">
            {"We've sent a 4-digit verification code to"}{"\n"}
            <Text className="text-[#1B3B22] font-bold">{emailAddress}</Text>
          </Text>
        </View>

        {/* 4 Digit OTP Inputs */}
        <View className="flex-row justify-center gap-4 mb-8">
          {otp.map((digit, index) => {
            const isFocused = focusedIndex === index;
            return (
              <View 
                key={index}
                className={`w-[64px] h-[64px] rounded-2xl border-2 justify-center items-center bg-[#F8FAFC] shadow-sm ${
                  isFocused ? 'border-[#10B981] bg-white' : 'border-[#E2E8F0]'
                }`}
              >
                <TextInput
                  ref={inputRefs[index]}
                  className="w-full h-full text-center text-[#1B3B22] text-[24px] font-black"
                  keyboardType="number-pad"
                  maxLength={2} // Allow pasting
                  value={digit}
                  onFocus={() => setFocusedIndex(index)}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectTextOnFocus
                />
              </View>
            );
          })}
        </View>

        {/* Timer / Resend Code */}
        <View className="items-center mb-8">
          {timer > 0 ? (
            <Text className="text-[#64748B] text-sm font-semibold">
              Resend code in <Text className="text-[#1B3B22] font-bold">00:{timer < 10 ? `0${timer}` : timer}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text className="text-[#1B3B22] text-sm font-extrabold underline">Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <TouchableOpacity 
          className="bg-[#1B3B22] h-[52px] rounded-full justify-center items-center shadow-sm mb-6 active:opacity-90"
          onPress={handleOtpSubmit}
        >
          <Text className="text-white text-sm font-black">Verify & Proceed</Text>
        </TouchableOpacity>

        {/* Bottom Redirect */}
        <View className="flex-row justify-center items-center mt-8 mb-4 py-1">
          <Text className="text-[#64748B] text-sm font-semibold">Back to </Text>
          <TouchableOpacity onPress={handleLoginRedirect} className="py-1">
            <Text className="text-[#1B3B22] text-sm font-black underline">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
