import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const ONBOARDING_STEPS = [
  {
    id: '1',
    title: 'Private Coaching',
    description: 'Add one-on-one, confidential sessions for only $35 per session',
    image: require('@/assets/images/onboarding_illustration.png'),
  },
  {
    id: '2',
    title: 'Interactive Classes',
    description: 'Join real-time interactive lectures and discussions with peers and expert instructors',
    image: require('@/assets/images/onboarding_illustration-two.png'),
  },
  {
    id: '3',
    title: 'Expert Mentorship',
    description: 'Get direct guidance and project reviews from seasoned industry veterans and educators',
    image: require('@/assets/images/onboarding_illustration-three.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-slide carousel effect (slides every 3.5s and resets timer on manual swipe)
  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (activeSlide + 1) % ONBOARDING_STEPS.length;
      scrollViewRef.current?.scrollTo({
        x: nextSlide * screenWidth,
        animated: true,
      });
      setActiveSlide(nextSlide);
    }, 3500);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const active = Math.round(offset / slideSize);
    setActiveSlide(active);
  };

  const handleLoginRedirect = () => {
    router.navigate('/(auth)/login');
  };

  const handleGuestRedirect = () => {
    // Navigate straight to home tab dashboard
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-transparent" edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      
      {/* Modern Gradient Background starting from bottom-left to top-right */}
      <LinearGradient
        colors={['#D1FAE5', '#E9F1F7', '#FFFFFF']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      {/* Upper Content - Carousel */}
      <View className="flex-[5] justify-center">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="w-full"
        >
          {ONBOARDING_STEPS.map((step, index) => (
            <View 
              key={step.id} 
              style={{ width: screenWidth }} 
              className="items-center justify-center px-8"
            >
              {/* Transparent line-art illustration */}
              <View className="w-full h-[250px] items-center justify-center mb-6">
                <Image
                  source={step.image}
                  style={{ width: '90%', height: '90%' }}
                  contentFit="contain"
                />
              </View>

              {/* Title & Subtext */}
              <Text className="text-[#1B3B22] text-[28px] font-black text-center tracking-tight mb-3">
                {step.title}
              </Text>
              <Text className="text-[#64748B] text-sm text-center leading-[22px] px-4">
                {step.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Middle Content - Progress Indicators */}
      <View className="flex-row justify-center gap-1.5 mb-8">
        {ONBOARDING_STEPS.map((_, index) => {
          // Mockup shows active indicator fill logic where previous steps are also active (green)
          const isActive = index <= activeSlide;
          return (
            <View
              key={index}
              style={{ width: 80, height: 4 }}
              className={`rounded-full ${isActive ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'}`}
            />
          );
        })}
      </View>

      {/* Bottom Content - Action Buttons */}
      <View className="px-6 mb-4">
        {/* Continue with Google */}
        <TouchableOpacity 
          className="mb-3.5 active:opacity-90 shadow-sm"
          style={{ overflow: 'hidden', borderRadius: 26 }}
          onPress={handleGuestRedirect} // Simulated auth action
        >
          <BlurView 
            intensity={60} 
            tint="light" 
            className="flex-row items-center justify-center h-[52px] border border-white/60"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
          >
            <Image 
              source={require('@/assets/images/google-icon.webp')} 
              style={{ width: 20, height: 20 }}
              contentFit="contain"
              className="mr-3"
            />
            <Text className="text-[#1B3B22] text-lg font-bold ml-2">Continue with Google</Text>
          </BlurView>
        </TouchableOpacity>

        {/* Continue with Apple */}
        <TouchableOpacity 
          className="mb-3.5 active:opacity-90 shadow-sm"
          style={{ overflow: 'hidden', borderRadius: 26 }}
          onPress={handleGuestRedirect} // Simulated auth action
        >
          <BlurView 
            intensity={60} 
            tint="light" 
            className="flex-row items-center justify-center h-[52px] border border-white/60"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
          >
            <Ionicons name="logo-apple" size={18} color="#1B3B22" className="mr-3" />
            <Text className="text-[#1B3B22] text-lg font-bold ml-2">Continue with Apple</Text>
          </BlurView>
        </TouchableOpacity>

        {/* Continue As Guest */}
        <TouchableOpacity 
          className="mb-8 active:opacity-90 shadow-sm"
          style={{ overflow: 'hidden', borderRadius: 26 }}
          onPress={handleGuestRedirect}
        >
          <BlurView 
            intensity={60} 
            tint="light" 
            className="flex-row items-center justify-center h-[52px] border border-white/60"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
          >
            <Image 
              source={require('@/assets/images/guest-user-icon.png')} 
              style={{ width: 18, height: 18 }}
              contentFit="contain"
              className="mr-3"
            />
            <Text className="text-[#1B3B22] text-lg font-bold ml-2">Continue As Guest</Text>
          </BlurView>
        </TouchableOpacity>

        {/* Already have an account? Log in */}
        <View className="flex-row justify-center items-center py-1">
          <Text className="text-[#64748B] text-sm font-semibold">Already have an account? </Text>
          <TouchableOpacity onPress={handleLoginRedirect} className="py-1">
            <Text className="text-[#1B3B22] text-sm font-black underline">Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
