import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface ExploreCategory {
  id: string;
  title: string;
  description: string;
  tutorsCount: string;
  icon: string;
  iconType: 'ionicons' | 'material';
  color: string;
  bgColor: string;
  borderColor: string;
}

const EXPLORE_CATEGORIES: ExploreCategory[] = [
  {
    id: '1',
    title: 'All Tutors',
    description: 'Browse all verified professional tutors matching your learning requirements.',
    tutorsCount: '350+ Active Tutors',
    icon: 'shield-checkmark',
    iconType: 'ionicons',
    color: '#10B981',
    bgColor: '#EAF8F0',
    borderColor: '#A7F3D0',
  },
  {
    id: '2',
    title: 'School Subjects',
    description: 'Mathematics, Physics, Chemistry, English Grammar, History, and Biology.',
    tutorsCount: '150+ Tutors',
    icon: 'book',
    iconType: 'ionicons',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  {
    id: '3',
    title: 'Creative Skills',
    description: 'Coding, Music Theory, Fine Art, Public Speaking, Photography, and Writing.',
    tutorsCount: '95+ Tutors',
    icon: 'school',
    iconType: 'ionicons',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  {
    id: '4',
    title: 'Group Tutoring',
    description: 'Interactive study cohorts and collaborative group classes with peers.',
    tutorsCount: '45+ Groups',
    icon: 'people',
    iconType: 'ionicons',
    color: '#F43F5E',
    bgColor: '#FFF1F2',
    borderColor: '#FECDD3',
  },
  {
    id: '5',
    title: 'Test Preparation',
    description: 'Specialized intensive coaching for SAT, IELTS, TOEFL, and board exams.',
    tutorsCount: '60+ Experts',
    icon: 'document-text',
    iconType: 'ionicons',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#DDD6FE',
  },
  {
    id: '6',
    title: 'Language Learning',
    description: 'Learn Spanish, French, German, Mandarin, Arabic, and native languages.',
    tutorsCount: '80+ Speakers',
    icon: 'language',
    iconType: 'ionicons',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    borderColor: '#FBCFE8',
  },
  {
    id: '7',
    title: 'Computer Science',
    description: 'Learn Python, JavaScript, HTML/CSS, Web Development, and Algorithms.',
    tutorsCount: '110+ Tutors',
    icon: 'code-slash',
    iconType: 'ionicons',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  {
    id: '8',
    title: 'Music & Instruments',
    description: 'Professional training in Piano, Guitar, Violin, Drums, and Vocal coaching.',
    tutorsCount: '55+ Mentors',
    icon: 'musical-notes',
    iconType: 'ionicons',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#EDE9FE',
  },
  {
    id: '9',
    title: 'Special Education',
    description: 'ADHD, Autism support, Dyslexia tutoring, and custom slow-paced learning.',
    tutorsCount: '30+ Specialists',
    icon: 'heart',
    iconType: 'ionicons',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  {
    id: '10',
    title: 'Career Coaching',
    description: 'Mock interviews, resume writing, public speaking, and leadership preparation.',
    tutorsCount: '50+ Coaches',
    icon: 'briefcase',
    iconType: 'ionicons',
    color: '#0EA5E9',
    bgColor: '#F0F9FF',
    borderColor: '#E0F2FE',
  },
];

export default function ExploreAllScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = EXPLORE_CATEGORIES.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (item: ExploreCategory) => {
    if (item.iconType === 'ionicons') {
      return <Ionicons name={item.icon as any} size={24} color={item.color} />;
    } else {
      return <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />;
    }
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
          <Text className="text-[#1B3B22] text-xl font-black">Explore Categories</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            Choose a pathway to discover expert tutors
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 shadow-sm shadow-slate-100/30">
        <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-[#1E293B] text-[15px] p-0 px-3"
            style={{ outlineStyle: 'none' } as any}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} className="p-0.5 bg-slate-200 rounded-full">
              <Ionicons name="close" size={14} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories Grid List */}
      <ScrollView 
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredCategories.length > 0 ? (
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {filteredCategories.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => router.navigate('/(tabs)/explore')}
                style={{ width: '48%' }}
                className="bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm shadow-slate-100/50"
              >
                {/* Top Icon Block */}
                <View 
                  style={{ backgroundColor: item.bgColor, borderColor: item.borderColor }}
                  className="w-12 h-12 rounded-[18px] border items-center justify-center mb-4"
                >
                  {getIcon(item)}
                </View>

                {/* Info Text */}
                <Text className="text-[#1E293B] font-black text-sm leading-tight" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-[#10B981] text-[10px] font-black mt-1">
                  {item.tutorsCount}
                </Text>
                <Text className="text-[#64748B] text-[10px] font-medium leading-[14px] mt-2" numberOfLines={3}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Empty Search State */
          <View className="items-center justify-center py-16">
            {/* Custom Premium Vector Search Illustration */}
            <View className="relative w-32 h-32 items-center justify-center mb-6">
              {/* Outer pulsing ring */}
              <View className="absolute inset-0 bg-[#E2F5EA] rounded-full opacity-60 scale-110" />
              <View className="absolute inset-2 bg-white rounded-full shadow-sm" />
              
              {/* Main Icon Box */}
              <View className="w-16 h-16 rounded-[22px] bg-[#10B981] items-center justify-center shadow-md shadow-[#10B981]/30">
                <Ionicons name="search" size={28} color="white" />
              </View>

              {/* Floating Sparkles & Dots */}
              <View className="absolute -top-1 -right-1">
                <Ionicons name="sparkles" size={16} color="#F59E0B" />
              </View>
              <View className="absolute bottom-2 -left-1">
                <Ionicons name="sparkles" size={12} color="#10B981" />
              </View>
              <View className="absolute -bottom-1 right-4 w-2.5 h-2.5 bg-[#6366F1] rounded-full opacity-40" />
              <View className="absolute top-4 -left-3 w-2 h-2 bg-[#F43F5E] rounded-full opacity-40" />
            </View>

            <Text className="text-[#1B3B22] text-lg font-black text-center">No Categories Found</Text>
            <Text className="text-[#64748B] text-sm text-center leading-[22px] font-medium mt-2 px-8">
              {"Try searching for something else, like \"Math\" or \"Skills\""}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
