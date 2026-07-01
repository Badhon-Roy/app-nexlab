import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface SubjectItem {
  id: string;
  title: string;
  tutorsCount: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const POPULAR_SUBJECTS: SubjectItem[] = [
  {
    id: '1',
    title: 'Mathematics',
    tutorsCount: '120+ Tutors',
    icon: 'calculator',
    color: '#10B981',
    bgColor: '#EAF8F0',
    borderColor: '#A7F3D0',
    description: 'Algebra, Calculus, Geometry, Statistics, and Trigonometry.',
  },
  {
    id: '2',
    title: 'Physics',
    tutorsCount: '85+ Tutors',
    icon: 'analytics',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    borderColor: '#FDE68A',
    description: 'Mechanics, Quantum Physics, Electromagnetism, and Thermodynamics.',
  },
  {
    id: '3',
    title: 'Chemistry',
    tutorsCount: '70+ Tutors',
    icon: 'flask',
    color: '#EF4444',
    bgColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    description: 'Organic Chemistry, Biochemistry, Inorganic Chemistry, and bonding.',
  },
  {
    id: '4',
    title: 'Biology',
    tutorsCount: '90+ Tutors',
    icon: 'leaf',
    color: '#22C55E',
    bgColor: '#DCFCE7',
    borderColor: '#86EFAC',
    description: 'Genetics, Human Anatomy, Cell Biology, and Ecology.',
  },
  {
    id: '5',
    title: 'English',
    tutorsCount: '110+ Tutors',
    icon: 'book',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    description: 'Grammar, English Literature, Creative Writing, and Comprehension.',
  },
  {
    id: '6',
    title: 'Computer Science',
    tutorsCount: '130+ Tutors',
    icon: 'code-slash',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    description: 'Python, JavaScript, Web Development, Databases, and Algorithms.',
  },
  {
    id: '7',
    title: 'History & Socials',
    tutorsCount: '50+ Tutors',
    icon: 'earth',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    borderColor: '#A5F3FC',
    description: 'World History, Geography, Civics, and Social Studies.',
  },
  {
    id: '8',
    title: 'Economics',
    tutorsCount: '45+ Tutors',
    icon: 'stats-chart',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    borderColor: '#FBCFE8',
    description: 'Microeconomics, Macroeconomics, Finance, and Accounting.',
  },
  {
    id: '9',
    title: 'Art & Design',
    tutorsCount: '40+ Tutors',
    icon: 'color-palette',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#EDE9FE',
    description: 'Fine Arts, Digital Design, UI/UX, Art History, and Sketching.',
  },
  {
    id: '10',
    title: 'Music Theory',
    tutorsCount: '35+ Tutors',
    icon: 'musical-notes',
    color: '#A78BFA',
    bgColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    description: 'Piano, Guitar, Violin, Vocal training, and Solfege.',
  },
];

export default function PopularSubjectsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = POPULAR_SUBJECTS.filter((sub) =>
    sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Text className="text-[#1B3B22] text-xl font-black">Popular Subjects</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            Choose a subject to explore top recommended tutors
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 shadow-sm shadow-slate-100/30">
        <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search subjects..."
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

      {/* Subjects Horizontal List Rows */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredSubjects.length > 0 ? (
          <View className="gap-y-3.5">
            {filteredSubjects.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => router.navigate('/(tabs)/explore')}
                className="bg-white border border-slate-100 rounded-[24px] p-4 flex-row items-center shadow-sm shadow-slate-100/50 active:opacity-90"
              >
                {/* Left Colored Icon Box */}
                <View 
                  style={{ backgroundColor: item.bgColor, borderColor: item.borderColor }}
                  className="w-14 h-14 rounded-[20px] border items-center justify-center mr-4"
                >
                  <Ionicons name={item.icon as any} size={26} color={item.color} />
                </View>

                {/* Center Content */}
                <View className="flex-1 pr-2">
                  <Text className="text-[#1E293B] font-black text-base leading-tight">
                    {item.title}
                  </Text>
                  <Text className="text-[#64748B] text-xs font-semibold leading-snug mt-1.5" numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>

                {/* Right Badge & Arrow */}
                <View className="items-end gap-2 pl-1">
                  <View className="bg-[#E2F5EA] px-2.5 py-1 rounded-full">
                    <Text className="text-[#10B981] text-[10px] font-black">
                      {item.tutorsCount.split(' ')[0]}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                </View>
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
              <View className="absolute top-4 -left-3 w-2.5 h-2.5 bg-[#F43F5E] rounded-full opacity-40" />
            </View>

            <Text className="text-[#1B3B22] text-lg font-black text-center">No Subjects Found</Text>
            <Text className="text-[#64748B] text-sm text-center leading-[22px] font-medium mt-2 px-8">
              {"Try searching for something else, like \"Math\" or \"Physics\""}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
