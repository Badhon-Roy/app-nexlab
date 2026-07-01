import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const TUTOR_DETAILS_DATA: Record<string, any> = {
  '1': {
    name: 'Esther Okafor',
    subject: 'Mathematics Tutor',
    rating: '4.9',
    reviews: 120,
    price: 20,
    experience: '5+ Years',
    education: 'B.Sc. in Mathematics, University of Lagos',
    bio: 'Passionate and detail-oriented educator specializing in Algebra, Calculus, and exam preparation. I believe in making math fun and intuitive by breaking down complex concepts into simple real-world scenarios.',
    image: require('@/assets/images/female_tutor.png'),
    reviewsList: [
      { id: '1', reviewer: 'Amara K.', rating: 5, comment: 'Excellent tutor! My child\'s grades improved from C to A in just 2 months.', time: '2 days ago' },
      { id: '2', reviewer: 'Chinedu O.', rating: 4.8, comment: 'Very patient and punctual. Highly recommend for algebraic foundation prep.', time: '1 week ago' }
    ]
  },
  '2': {
    name: 'John Doe',
    subject: 'English Tutor',
    rating: '4.8',
    reviews: 85,
    price: 18,
    experience: '6+ Years',
    education: 'M.A. in English Literature, Oxford University',
    bio: 'Experienced literary scholar and writing coach. Helping students improve their reading comprehension, essay writing, vocabulary, and SAT test prep scores with personalized feedback.',
    image: require('@/assets/images/male_tutor.png'),
    reviewsList: [
      { id: '1', reviewer: 'Sarah M.', rating: 5, comment: 'John is amazing! His essay structures are clear and easy to follow.', time: '3 days ago' },
      { id: '2', reviewer: 'David L.', rating: 4.5, comment: 'Very professional. My reading comprehension has improved significantly.', time: '2 weeks ago' }
    ]
  },
  '3': {
    name: 'Sarah Jenkins',
    subject: 'Coding Tutor',
    rating: '5.0',
    reviews: 95,
    price: 25,
    experience: '4+ Years',
    education: 'B.Tech in Computer Science, MIT',
    bio: 'Software engineer turned educator. Offering hands-on classes in Python, Web Development, and algorithm design. I focus on logical thinking and build real projects in classes.',
    image: require('@/assets/images/female_tutor.png'),
    reviewsList: [
      { id: '1', reviewer: 'Kevin P.', rating: 5, comment: 'Hands down the best coding tutor. Built a full game in just a few lessons!', time: '1 day ago' },
      { id: '2', reviewer: 'Emily T.', rating: 5, comment: 'Patient, highly knowledgeable, and explains complex syntax with ease.', time: '5 days ago' }
    ]
  },
  'featured_1': {
    name: 'Dr. Amara Okonkwo',
    subject: 'STEM Expert',
    rating: '4.9',
    reviews: 70,
    price: 45,
    experience: '8+ Years',
    education: 'Ph.D. in Mechanical Engineering, MIT',
    bio: 'Specializing in undergraduate physics, structural mechanics, and mechanical engineering principles. Over 8 years of research and teaching experience helping students master advanced engineering concepts.',
    image: require('@/assets/images/female_tutor.png'),
    reviewsList: [
      { id: '1', reviewer: 'Tunde A.', rating: 5, comment: 'Phenomenal teaching style. Her structural analysis explanations are gold.', time: '3 days ago' },
      { id: '2', reviewer: 'Oluwaseun F.', rating: 4.8, comment: 'Highly expert level guidance. Helped me ace my thermodynamics exam.', time: '1 week ago' }
    ]
  },
  'featured_2': {
    name: 'Prof. Kwame Asante',
    subject: 'STEM Expert',
    rating: '4.9',
    reviews: 70,
    price: 45,
    experience: '8+ Years',
    education: 'Ph.D. in Physics, Stanford University',
    bio: 'Specializing in undergraduate physics, thermodynamics, and fluid mechanics. Connect with me for interactive explanations, research assistance, and engineering coursework guidance.',
    image: require('@/assets/images/male_tutor.png'),
    reviewsList: [
      { id: '1', reviewer: 'Yaw B.', rating: 5, comment: 'Kwame makes complex physics seem incredibly easy. Great mentor.', time: '2 days ago' },
      { id: '2', reviewer: 'Kofi A.', rating: 4.9, comment: 'Exceptional math and physics foundations teacher. Punctual and patient.', time: '5 days ago' }
    ]
  },
};

// Fallback tutor in case of missing or dynamic ID
const DEFAULT_TUTOR = {
  name: 'David Smith',
  subject: 'Physics Tutor',
  rating: '4.7',
  reviews: 60,
  price: 22,
  experience: '5+ Years',
  education: 'B.Sc. in Physics, Imperial College London',
  bio: 'Specializing in mechanics, electromagnetism, and thermodynamic equations. Providing slow-paced guidance tailored to build physics foundations for high school students.',
  image: require('@/assets/images/male_tutor.png'),
  reviewsList: [
    { id: '1', reviewer: 'Liam J.', rating: 4.8, comment: 'David simplifies mechanics questions very well. Patient and smart.', time: '4 days ago' },
    { id: '2', reviewer: 'Sophia R.', rating: 4.6, comment: 'Helped my son pass his A-Level physics test. Great explanations.', time: '2 weeks ago' }
  ]
};

export default function TutorDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const tutorId = (params.id as string) || '1';

  // Get tutor info or load fallback
  const tutor = TUTOR_DETAILS_DATA[tutorId] || DEFAULT_TUTOR;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* Custom Navigation Header */}
      <View className="px-6 pt-3 pb-4 flex-row items-center justify-between border-b border-slate-100 bg-white">
        <TouchableOpacity 
          className="p-2 bg-[#EFF4F0] rounded-full active:opacity-70"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="#1B3B22" />
        </TouchableOpacity>
        <Text className="text-[#1B3B22] text-lg font-black">Tutor Profile</Text>
        <TouchableOpacity 
          onPress={() => setIsFavorite(!isFavorite)}
          className="p-2 bg-slate-50 rounded-full active:opacity-75"
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={isFavorite ? "#F43F5E" : "#64748B"} 
          />
        </TouchableOpacity>
      </View>

      {/* Main Details Area */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card Block */}
        <View className="bg-white px-6 py-6 border-b border-slate-100 shadow-sm shadow-slate-100/50">
          <View className="flex-row items-center">
            {/* Profile Avatar */}
            <View className="w-[90px] h-[90px] rounded-3xl overflow-hidden mr-5 border-2 border-[#10B981]/20 shadow-sm">
              <Image
                source={tutor.image}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            </View>

            {/* Specialty & Name */}
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-[#0F172A] font-black text-xl leading-tight">
                  {tutor.name}
                </Text>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              </View>
              <Text className="text-[#64748B] text-sm font-semibold mt-1">
                {tutor.subject}
              </Text>

              {/* Tag Stats Grid */}
              <View className="flex-row items-center gap-3 mt-3 flex-wrap">
                <View className="flex-row items-center bg-[#E2F5EA] px-2.5 py-1 rounded-full">
                  <Ionicons name="star" size={12} color="#10B981" />
                  <Text className="text-[#10B981] text-[10px] font-black ml-1">
                    {tutor.rating} ({tutor.reviews})
                  </Text>
                </View>

                <View className="flex-row items-center bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                  <Ionicons name="briefcase" size={11} color="#F59E0B" />
                  <Text className="text-[#F59E0B] text-[10px] font-black ml-1">
                    {tutor.experience}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View className="bg-white px-6 py-6 mt-3 border-b border-slate-100 shadow-sm shadow-slate-100/50">
          <Text className="text-[#0F172A] text-[15px] font-black mb-3">About Me</Text>
          <Text className="text-[#475569] text-[13px] leading-6 font-medium">
            {tutor.bio}
          </Text>
        </View>

        {/* Credentials / Education */}
        <View className="bg-white px-6 py-6 mt-3 border-b border-slate-100 shadow-sm shadow-slate-100/50">
          <Text className="text-[#0F172A] text-[15px] font-black mb-4">Education & Background</Text>
          <View className="flex-row items-start">
            <View className="w-9 h-9 rounded-xl bg-[#EEF2FF] items-center justify-center mr-3.5 mt-0.5">
              <MaterialCommunityIcons name="school" size={20} color="#6366F1" />
            </View>
            <View className="flex-1">
              <Text className="text-[#1E293B] text-sm font-black">Degrees & Certificates</Text>
              <Text className="text-[#64748B] text-xs font-semibold mt-1 leading-5">
                {tutor.education}
              </Text>
            </View>
          </View>
        </View>

        {/* Testimonials & Reviews */}
        <View className="bg-white px-6 py-6 mt-3 border-b border-slate-100 shadow-sm shadow-slate-100/50">
          <Text className="text-[#0F172A] text-[15px] font-black mb-4">Student Reviews</Text>
          <View className="gap-y-4">
            {tutor.reviewsList.map((review: any) => (
              <View key={review.id} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-[#1E293B] font-black text-sm">{review.reviewer}</Text>
                  <Text className="text-[#94A3B8] text-[10px] font-semibold">{review.time}</Text>
                </View>
                
                {/* Review Stars */}
                <View className="flex-row gap-0.5 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Ionicons 
                      key={i} 
                      name={i < Math.floor(review.rating) ? "star" : "star-outline"} 
                      size={12} 
                      color="#F59E0B" 
                    />
                  ))}
                </View>

                <Text className="text-[#475569] text-xs leading-5 font-semibold">
                  {`"${review.comment}"`}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Booking Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex-row items-center justify-between shadow-2xl">
        <View>
          <Text className="text-[#64748B] text-[11px] font-bold">Hourly Rate</Text>
          <Text className="text-[#10B981] text-2xl font-black mt-0.5">${tutor.price}<Text className="text-[#64748B] text-xs font-semibold"> / hour</Text></Text>
        </View>

        {/* Book Now Button with Gradient */}
        <TouchableOpacity 
          onPress={() => router.push({ pathname: '/booking', params: { id: tutorId } })}
          activeOpacity={0.8}
          className="flex-1 ml-6 rounded-2xl shadow-md shadow-[#10B981]/25 overflow-hidden"
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-4 items-center justify-center"
          >
            <Text className="text-white text-sm font-black">Book a Lesson</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
