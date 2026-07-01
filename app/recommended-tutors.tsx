import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

interface TutorItem {
  id: string;
  name: string;
  subject: string;
  rating: string;
  reviews: number;
  price: number;
  description: string;
  image: any;
  isFavorite?: boolean;
}

const ALL_TUTORS: TutorItem[] = [
  {
    id: '1',
    name: 'Esther Okafor',
    subject: 'Mathematics Tutor',
    rating: '4.9',
    reviews: 120,
    price: 20,
    description: 'Specializing in Algebra, Calculus, and exam preparations with 5+ years of experience.',
    image: require('@/assets/images/female_tutor.png'),
    isFavorite: true,
  },
  {
    id: '2',
    name: 'John Doe',
    subject: 'English Tutor',
    rating: '4.8',
    reviews: 85,
    price: 18,
    description: 'Focusing on English Grammar, writing skills, literature, and SAT prep coaching.',
    image: require('@/assets/images/male_tutor.png'),
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    subject: 'Coding Tutor',
    rating: '5.0',
    reviews: 95,
    price: 25,
    description: 'Interactive coding classes in Python, HTML/CSS, JavaScript, and algorithms.',
    image: require('@/assets/images/female_tutor.png'),
    isFavorite: true,
  },
  {
    id: '4',
    name: 'David Smith',
    subject: 'Physics Tutor',
    rating: '4.7',
    reviews: 60,
    price: 22,
    description: 'Expert mechanics and electromagnetism coaching. Simplifying complex equations.',
    image: require('@/assets/images/male_tutor.png'),
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Maria Garcia',
    subject: 'Spanish Tutor',
    rating: '4.9',
    reviews: 110,
    price: 19,
    description: 'Native Spanish speaker helping students master conversation, grammar, and vocabulary.',
    image: require('@/assets/images/female_tutor.png'),
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Ahmed Khan',
    subject: 'Chemistry Tutor',
    rating: '4.8',
    reviews: 40,
    price: 21,
    description: 'Organic chemistry, biochemistry, and general science tutor for GCSE/SAT students.',
    image: require('@/assets/images/male_tutor.png'),
    isFavorite: false,
  },
];

export default function RecommendedTutorsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    '1': true,
    '3': true,
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTutors = ALL_TUTORS.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          <Text className="text-[#1B3B22] text-xl font-black">Recommended Tutors</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            Learn from verified high-rated education specialists
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 shadow-sm shadow-slate-100/30">
        <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search tutors by name or subject..."
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

      {/* Tutors List container */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredTutors.length > 0 ? (
          <View className="gap-y-4">
            {filteredTutors.map((item) => (
              <View
                key={item.id}
                className="bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm shadow-slate-100/50"
              >
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity 
                    onPress={() => router.push({ pathname: '/tutor-details', params: { id: item.id } })}
                    className="flex-row items-center flex-1 mr-2"
                    activeOpacity={0.7}
                  >
                    {/* Tutor Avatar */}
                    <View className="w-16 h-16 rounded-[20px] overflow-hidden mr-4">
                      <Image
                        source={item.image}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                      />
                    </View>

                    {/* Tutor Header Info */}
                    <View className="flex-1">
                      <View className="flex-row items-center gap-1.5">
                        <Text className="text-[#0F172A] font-black text-[15px] leading-tight">
                          {item.name}
                        </Text>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      </View>
                      <Text className="text-[#64748B] text-xs font-semibold mt-1">
                        {item.subject}
                      </Text>
                      
                      <View className="flex-row items-center gap-3 mt-2.5">
                        <View className="flex-row items-center gap-0.5">
                          <Ionicons name="star" size={13} color="#F59E0B" />
                          <Text className="text-[#1E293B] text-[11px] font-extrabold">{item.rating}</Text>
                          <Text className="text-[#64748B] text-[10px] font-semibold">({item.reviews})</Text>
                        </View>
                        <View className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <Text className="text-[#10B981] text-[13px] font-black">${item.price}<Text className="text-[#64748B] text-[10px] font-semibold">/hr</Text></Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Favorite Toggle Button */}
                  <TouchableOpacity 
                    onPress={() => toggleFavorite(item.id)}
                    className="p-2.5 bg-slate-50 rounded-full active:opacity-75"
                  >
                    <Ionicons 
                      name={favorites[item.id] ? "heart" : "heart-outline"} 
                      size={18} 
                      color={favorites[item.id] ? "#F43F5E" : "#64748B"} 
                    />
                  </TouchableOpacity>
                </View>

                {/* Description */}
                <Text className="text-[#64748B] text-xs leading-[18px] font-medium mt-3.5 pt-3.5 border-t border-slate-50">
                  {item.description}
                </Text>

                {/* Action button with gradient */}
                <TouchableOpacity 
                  onPress={() => router.push({ pathname: '/tutor-details', params: { id: item.id } })}
                  activeOpacity={0.8}
                  className="mt-4 rounded-2xl shadow-sm shadow-[#10B981]/25 overflow-hidden"
                >
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-3.5 items-center justify-center"
                  >
                    <Text className="text-white text-xs font-black">View Tutor Profile</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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

            <Text className="text-[#1B3B22] text-lg font-black text-center">No Tutors Found</Text>
            <Text className="text-[#64748B] text-sm text-center leading-[22px] font-medium mt-2 px-8">
              {"Try searching for something else, like \"Esther\" or \"Coding\""}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
