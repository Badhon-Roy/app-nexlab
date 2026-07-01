import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Dimensions, Modal } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.8;

const TUTORS_DATA = [
  {
    id: '1',
    name: 'Esther Okafor',
    subject: 'Mathematics Tutor',
    rating: '4.9',
    reviews: 120,
    price: 20,
    image: require('@/assets/images/female_tutor.png'),
  },
  {
    id: '2',
    name: 'John Doe',
    subject: 'English Tutor',
    rating: '4.8',
    reviews: 85,
    price: 18,
    image: require('@/assets/images/male_tutor.png'),
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    subject: 'Coding Tutor',
    rating: '5.0',
    reviews: 95,
    price: 25,
    image: require('@/assets/images/female_tutor.png'),
  },
  {
    id: '4',
    name: 'Michael Smith',
    subject: 'Science Tutor',
    rating: '4.7',
    reviews: 110,
    price: 22,
    image: require('@/assets/images/male_tutor.png'),
  },
];

const SUBJECTS_DATA = [
  {
    id: '1',
    title: 'Mathematics',
    tutors: '120+ Tutors',
    icon: 'calculator',
    iconType: 'ionicons',
    bgColor: '#EAF8F0',
    borderColor: '#A7F3D0',
    iconColor: '#10B981',
  },
  {
    id: '2',
    title: 'Physics',
    tutors: '85+ Tutors',
    icon: 'atom',
    iconType: 'material',
    bgColor: '#FEF3C7',
    borderColor: '#FDE68A',
    iconColor: '#F59E0B',
  },
  {
    id: '3',
    title: 'English',
    tutors: '110+ Tutors',
    icon: 'book',
    iconType: 'ionicons',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    iconColor: '#6366F1',
  },
  {
    id: '4',
    title: 'African Languages',
    tutors: '70+ Tutors',
    icon: 'chatbubble-ellipses-outline',
    iconType: 'ionicons',
    bgColor: '#FFF1F2',
    borderColor: '#FECDD3',
    iconColor: '#F43F5E',
  },
];

const FEATURED_TUTORS_DATA = [
  {
    id: '1',
    name: 'Dr. Amara Okonkwo',
    title: 'STEM Expert',
    location: 'Lagos, NG',
    rating: '4.9',
    reviews: 70,
    price: 45,
    description: 'Specializing in undergraduate physics and mechanical engineering principles with 8+ years...',
    image: require('@/assets/images/female_tutor.png'),
  },
  {
    id: '2',
    name: 'Prof. Kwame Asante',
    title: 'STEM Expert',
    location: 'Lagos, NG',
    rating: '4.9',
    reviews: 70,
    price: 45,
    description: 'Specializing in undergraduate physics and mechanical engineering principles with 8+ years...',
    image: require('@/assets/images/male_tutor.png'),
  },
];

const HERO_BANNERS = [
  require('@/assets/images/banner-1.png'),
  require('@/assets/images/banner-2.png'),
  require('@/assets/images/banner-3.png'),
];

export default function HomeScreen() {
  const flatListRef = React.useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const featuredTutorsFlatListRef = React.useRef<FlatList>(null);
  const [currentFeaturedTutorIndex, setCurrentFeaturedTutorIndex] = React.useState(0);

  const heroBannersFlatListRef = React.useRef<FlatList>(null);
  const [currentHeroBannerIndex, setCurrentHeroBannerIndex] = React.useState(0);

  // Filter Bottom Sheet State
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedPrice, setSelectedPrice] = React.useState('Any');
  const [selectedRating, setSelectedRating] = React.useState('Any');
  const [selectedAvailability, setSelectedAvailability] = React.useState('Any');

  // Auto slide tutors every 3.5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === TUTORS_DATA.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // Auto slide featured tutors every 4 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeaturedTutorIndex((prevIndex) => {
        const nextIndex = prevIndex === FEATURED_TUTORS_DATA.length - 1 ? 0 : prevIndex + 1;
        featuredTutorsFlatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Auto slide hero banners every 4.5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBannerIndex((prevIndex) => {
        const nextIndex = prevIndex === HERO_BANNERS.length - 1 ? 0 : prevIndex + 1;
        heroBannersFlatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const onMomentumScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (cardWidth + 12));
    setCurrentIndex(index);
  };

  const onFeaturedTutorsMomentumScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (cardWidth + 12));
    setCurrentFeaturedTutorIndex(index);
  };

  const onHeroBannersMomentumScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (screenWidth - 48));
    setCurrentHeroBannerIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView 
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header & Search Section (With Padding) */}
        <View className="px-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity className="flex-row items-center gap-1.5 active:opacity-70">
              <Ionicons name="location-sharp" size={20} color="#10B981" />
              <Text className="text-[#1E293B] font-semibold text-[15px]">Lagos, Nigeria</Text>
              <Ionicons name="chevron-down" size={14} color="#64748B" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => router.push('/notifications')}
              className="relative p-2 bg-white rounded-full border border-slate-100 shadow-sm active:opacity-70"
            >
              <Ionicons name="notifications-outline" size={22} color="#1E293B" />
              <View className="absolute top-1 right-1 bg-[#10B981] w-[18px] h-[18px] rounded-full items-center justify-center border-2 border-white">
                <Text className="text-white text-[9px] font-bold">2</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3.5 mb-6 shadow-sm shadow-slate-100">
            <Ionicons name="search-outline" size={20} color="#94A3B8" />
            <TextInput
              placeholder="Search tutors, subjects or skills"
              placeholderTextColor="#94A3B8"
              className="flex-1 text-[#1E293B] text-[15px] p-0 px-3"
            />
            <TouchableOpacity 
              onPress={() => setIsFilterVisible(true)}
              className="pl-3 border-l border-slate-100 active:opacity-70"
            >
              <Ionicons name="options-outline" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sliding Hero Banners Section (With Padding) */}
        <View className="mb-8 px-6">
          <FlatList
            ref={heroBannersFlatListRef}
            data={HERO_BANNERS}
            horizontal
            pagingEnabled
            snapToInterval={screenWidth - 48}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onHeroBannersMomentumScrollEnd}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={(_, index) => ({
              length: screenWidth - 48,
              offset: (screenWidth - 48) * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={{ width: screenWidth - 48 }} className="pr-3">
                <View className="bg-slate-50 rounded-[12px] overflow-hidden h-[160px] shadow-sm shadow-slate-100/50">
                  <Image
                    source={item}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                </View>
              </View>
            )}
          />

          {/* Dot Indicators */}
          <View className="flex-row justify-center items-center gap-1.5 mt-3">
            {HERO_BANNERS.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentHeroBannerIndex === index ? 'w-4 bg-[#10B981]' : 'w-1.5 bg-slate-200'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Explore Section (With Padding) */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-[#0F172A] text-[18px] font-bold">Explore</Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#64748B] text-[13px] font-semibold">View all</Text>
              <Ionicons name="chevron-forward" size={14} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <TouchableOpacity className="w-[66px] h-[66px] bg-[#EAF8F0] border border-[#A7F3D0]/60 rounded-[22px] items-center justify-center shadow-sm shadow-slate-100 active:opacity-80">
                <Ionicons name="shield-checkmark" size={26} color="#10B981" />
              </TouchableOpacity>
              <Text className="text-[#475569] text-xs font-semibold mt-3 text-center">All Tutors</Text>
            </View>

            <View className="items-center flex-1">
              <TouchableOpacity className="w-[66px] h-[66px] bg-[#FEF3C7]/80 border border-[#FDE68A]/60 rounded-[22px] items-center justify-center shadow-sm shadow-slate-100 active:opacity-80">
                <Ionicons name="book" size={24} color="#F59E0B" />
              </TouchableOpacity>
              <Text className="text-[#475569] text-xs font-semibold mt-3 text-center">Subjects</Text>
            </View>

            <View className="items-center flex-1">
              <TouchableOpacity className="w-[66px] h-[66px] bg-[#EEF2FF] border border-[#C7D2FE]/60 rounded-[22px] items-center justify-center shadow-sm shadow-slate-100 active:opacity-80">
                <Ionicons name="school" size={26} color="#6366F1" />
              </TouchableOpacity>
              <Text className="text-[#475569] text-xs font-semibold mt-3 text-center">Skills</Text>
            </View>

            <View className="items-center flex-1">
              <TouchableOpacity className="w-[66px] h-[66px] bg-[#FFF1F2] border border-[#FECDD3]/60 rounded-[22px] items-center justify-center shadow-sm shadow-slate-100 active:opacity-80">
                <Ionicons name="people" size={26} color="#F43F5E" />
              </TouchableOpacity>
              <Text className="text-[#475569] text-xs font-semibold mt-3 text-center">Group Tutoring</Text>
            </View>
          </View>
        </View>

        {/* Free Taster Lesson Card (With Padding) */}
        <View className="px-6 mb-8">
          <View className="bg-[#EBFDF5] border border-[#D1FAE5] rounded-[28px] p-4 flex-row items-center">
            <View className="w-[100px] h-[100px] overflow-hidden mr-4">
              <Image
                source={require('@/assets/images/free-taster-leasson.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </View>

            <View className="flex-1">
              <Text className="text-[#0F172A] text-[16px] font-bold">Free Taster Lesson</Text>
              <Text className="text-[#475569] text-xs mt-1 leading-snug">
                Find the perfect tutor for your child with a free trial lesson.
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1 mt-3 active:opacity-70">
                <Text className="text-[#10B981] text-xs font-bold">Book Now</Text>
                <Ionicons name="chevron-forward" size={12} color="#10B981" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Popular Subjects (Header padding, full width scroll) */}
        <View className="mb-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-[18px] font-bold">Popular Subjects</Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#64748B] text-[13px] font-semibold">View all</Text>
              <Ionicons name="chevron-forward" size={14} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            <TouchableOpacity className="flex-row items-center bg-white border border-slate-100 px-4 py-2.5 rounded-full mr-3 shadow-sm shadow-slate-100/50 active:opacity-85">
              <View className="w-6 h-6 rounded-full bg-[#EEF2FF] items-center justify-center mr-2">
                <Ionicons name="calculator" size={14} color="#6366F1" />
              </View>
              <Text className="text-[#1E293B] text-sm font-semibold">Mathematics</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-white border border-slate-100 px-4 py-2.5 rounded-full mr-3 shadow-sm shadow-slate-100/50 active:opacity-85">
              <View className="w-6 h-6 rounded-full bg-[#EBF5FF] items-center justify-center mr-2">
                <Ionicons name="book" size={14} color="#3B82F6" />
              </View>
              <Text className="text-[#1E293B] text-sm font-semibold">English</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-white border border-slate-100 px-4 py-2.5 rounded-full mr-3 shadow-sm shadow-slate-100/50 active:opacity-85">
              <View className="w-6 h-6 rounded-full bg-[#F5F3FF] items-center justify-center mr-2">
                <Ionicons name="code-slash" size={14} color="#8B5CF6" />
              </View>
              <Text className="text-[#1E293B] text-sm font-semibold">Coding</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-white border border-slate-100 px-4 py-2.5 rounded-full mr-3 shadow-sm shadow-slate-100/50 active:opacity-85">
              <View className="w-6 h-6 rounded-full bg-[#EAF8F0] items-center justify-center mr-2">
                <Ionicons name="flask" size={14} color="#10B981" />
              </View>
              <Text className="text-[#1E293B] text-sm font-semibold">Science</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recommended Tutors (Header padding, full width scroll with peaking cards) */}
        <View className="mb-6">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-[18px] font-bold">Recommended Tutors</Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#64748B] text-[13px] font-semibold">View all</Text>
              <Ionicons name="chevron-forward" size={14} color="#64748B" />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={TUTORS_DATA}
            horizontal
            pagingEnabled
            snapToInterval={cardWidth + 12}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
            contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 12 }}
            keyExtractor={(item) => item.id}
            getItemLayout={(_, index) => ({
              length: cardWidth + 12,
              offset: (cardWidth + 12) * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={{ width: cardWidth }} className="pr-3">
                <TouchableOpacity className="bg-white border border-slate-100 p-2 rounded-[24px] flex-row items-center shadow-sm shadow-slate-100/50 active:opacity-95 relative mx-0.5">
                  <View className="w-[80px] h-[80px] rounded-2xl overflow-hidden mr-4">
                    <Image
                      source={item.image}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center gap-1">
                      <Text className="text-[#0F172A] font-bold text-base">{item.name}</Text>
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    </View>
                    <Text className="text-[#64748B] text-xs mt-0.5">{item.subject}</Text>
                    
                    <View className="flex-row items-center justify-between mt-3">
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text className="text-[#64748B] text-xs ml-1 font-semibold">{item.rating}</Text>
                        <Text className="text-[#94A3B8] text-xs ml-1">({item.reviews})</Text>
                      </View>

                      <View className="flex-row items-baseline">
                        <Text className="text-[#10B981] text-lg font-bold">${item.price}</Text>
                        <Text className="text-[#64748B] text-xs ml-0.5">/hr</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity className="absolute top-4 right-4 p-1 active:scale-95 z-20">
                    <Ionicons name="heart-outline" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Dot Indicators */}
          <View className="px-6 flex-row justify-center items-center gap-1.5 mt-3">
            {TUTORS_DATA.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-4 bg-[#10B981]' : 'w-1.5 bg-slate-200'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Featured Subjects (Reverted to Static Vertical List - Pixel Perfect Mockup Design) */}
        <View className="px-6 mb-6 mt-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-[18px] font-bold">Featured Subjects</Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#64748B] text-[13px] font-semibold">View all</Text>
              <Ionicons name="chevron-forward" size={14} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Maths tutors Card */}
          <TouchableOpacity className="bg-white border border-[#E2F5EA] p-5 rounded-2xl flex-row items-center justify-between mb-4 shadow-sm shadow-slate-100/50 active:opacity-95 overflow-hidden relative">
            <View className="absolute -top-12 -right-8 w-28 h-28 rounded-full bg-[#10B981]/5 z-0" />
            <View className="flex-row items-center flex-1 z-10">
              <View style={{ transform: [{ rotate: '-4deg' }] }} className="w-14 h-14 bg-[#E2F5EA] rounded-[2px] items-center justify-center mr-5">
                <View className="w-8 h-8 rounded-full bg-[#10B981] items-center justify-center">
                  <Ionicons name="calculator" size={16} color="white" />
                </View>
              </View>
              <Text className="text-[#0F172A] font-bold text-[16px]">Maths tutors</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" className="z-10" />
          </TouchableOpacity>

          {/* Physics tutors Card */}
          <TouchableOpacity className="bg-white border border-[#FEF3C7] p-5 rounded-2xl flex-row items-center justify-between mb-4 shadow-sm shadow-slate-100/50 active:opacity-95 overflow-hidden relative">
            <View className="absolute -top-12 -right-8 w-28 h-28 rounded-full bg-[#F59E0B]/5 z-0" />
            <View className="flex-row items-center flex-1 z-10">
              <View style={{ transform: [{ rotate: '-4deg' }] }} className="w-14 h-14 bg-[#FEF3C7] items-center justify-center mr-5">
                <View className="w-8 h-8 rounded-full bg-[#F59E0B] items-center justify-center">
                  <MaterialCommunityIcons name="atom" size={18} color="white" />
                </View>
              </View>
              <Text className="text-[#0F172A] font-bold text-[16px]">Physics tutors</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" className="z-10" />
          </TouchableOpacity>

          {/* English/African Languages Card */}
          <TouchableOpacity className="bg-white border border-[#EEF2FF] p-5 rounded-2xl flex-row items-center justify-between mb-4 shadow-sm shadow-slate-100/50 active:opacity-95 overflow-hidden relative">
            <View className="absolute -top-12 -right-8 w-28 h-28 rounded-full bg-[#6366F1]/5 z-0" />
            <View className="flex-row items-center flex-1 z-10">
              <View style={{ transform: [{ rotate: '-4deg' }] }} className="w-14 h-14 bg-[#EEF2FF] items-center justify-center mr-5">
                <View className="w-8 h-8 rounded-full bg-[#6366F1] items-center justify-center">
                  <Ionicons name="book" size={16} color="white" />
                </View>
              </View>
              <Text className="text-[#0F172A] font-bold text-[16px]">African Languages</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" className="z-10" />
          </TouchableOpacity>

          {/* African Languages Card */}
          <TouchableOpacity className="bg-white border border-[#FFF1F2] p-5 rounded-2xl flex-row items-center justify-between mb-6 shadow-sm shadow-slate-100/50 active:opacity-95 overflow-hidden relative">
            <View className="absolute -top-12 -right-8 w-28 h-28 rounded-full bg-[#F43F5E]/5 z-0" />
            <View className="flex-row items-center flex-1 z-10">
              <View style={{ transform: [{ rotate: '-4deg' }] }} className="w-14 h-14 bg-[#FFF1F2] items-center justify-center mr-5">
                <View className="w-8 h-8 rounded-full bg-[#F43F5E] items-center justify-center">
                  <Ionicons name="chatbubble-ellipses-outline" size={16} color="white" />
                </View>
              </View>
              <Text className="text-[#0F172A] font-bold text-[16px]">African Languages</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" className="z-10" />
          </TouchableOpacity>
        </View>

        {/* Featured Tutors (Auto-sliding Carousel translated from Web mockup) */}
        <View className="mb-6">
          {/* Header */}
          <View className="px-6 flex-row justify-between items-end mb-4">
            <View className="flex-1 pr-2">
              <Text className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">You Can Learn Anything, Explore</Text>
              <Text className="text-[#10B981] text-2xl font-extrabold mt-1">Featured Tutors</Text>
            </View>
            <TouchableOpacity className="active:opacity-70 mb-1">
              <Text className="text-[#64748B] text-sm font-semibold">See all</Text>
            </TouchableOpacity>
          </View>

          {/* Subtitle */}
          <Text className="px-6 text-[#64748B] text-sm leading-relaxed mb-6">
            Hand-picked for excellence. Connect with top-tier, verified global educators.
          </Text>

          {/* Horizontal Auto-sliding Featured Tutors */}
          <FlatList
            ref={featuredTutorsFlatListRef}
            data={FEATURED_TUTORS_DATA}
            horizontal
            pagingEnabled
            snapToInterval={cardWidth + 12}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onFeaturedTutorsMomentumScrollEnd}
            contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 12 }}
            keyExtractor={(item) => item.id}
            getItemLayout={(_, index) => ({
              length: cardWidth + 12,
              offset: (cardWidth + 12) * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={{ width: cardWidth }} className="pr-3">
                <TouchableOpacity className="bg-white border border-slate-100 p-3.5 rounded-[24px] flex-row shadow-sm shadow-slate-100/50 active:opacity-95 mx-0.5 relative">
                  {/* Left: Tutor Photo */}
                  <View className="w-[90px] h-[115px] rounded-2xl overflow-hidden mr-4 bg-slate-50">
                    <Image
                      source={item.image}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  </View>

                  {/* Right: Details */}
                  <View className="flex-1 justify-between">
                    <View>
                      {/* Name & Badge */}
                      <View className="flex-row items-center gap-1">
                        <Text className="text-[#0F172A] font-bold text-[15px]" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Ionicons name="checkmark-circle" size={15} color="#10B981" />
                      </View>
                      
                      {/* Specialty */}
                      <Text className="text-[#64748B] text-[11px] font-semibold mt-0.5" numberOfLines={1}>
                        {item.title} • Physics & Mech
                      </Text>

                      {/* Rating & Reviews */}
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={12} color="#F59E0B" />
                        <Text className="text-[#64748B] text-[11px] ml-1 font-semibold">{item.rating}</Text>
                        <Text className="text-[#94A3B8] text-[11px] ml-0.5">({item.reviews} Review)</Text>
                      </View>

                      {/* Starting At Price */}
                      <View className="flex-row items-baseline mt-1.5">
                        <Text className="text-[#94A3B8] text-[10px] font-semibold uppercase mr-1">Starts at</Text>
                        <Text className="text-[#10B981] text-base font-bold">${item.price}</Text>
                        <Text className="text-[#64748B] text-[10px] ml-0.5">/hr</Text>
                      </View>
                    </View>

                    {/* Bottom Meta Row (Exp & Button) */}
                    <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-slate-50">
                      <View className="flex-row items-center gap-0.5 bg-slate-50 px-2 py-0.5 rounded-md">
                        <Ionicons name="shield-checkmark" size={10} color="#64748B" />
                        <Text className="text-[#64748B] text-[9px] font-bold">5+ Yrs</Text>
                      </View>

                      <TouchableOpacity className="bg-[#10B981] px-3.5 py-1.5 rounded-xl active:opacity-90">
                        <Text className="text-white text-[10px] font-bold">View Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Dot Indicators */}
          <View className="px-6 flex-row justify-center items-center gap-1.5 mt-3 mb-6">
            {FEATURED_TUTORS_DATA.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentFeaturedTutorIndex === index ? 'w-4 bg-[#10B981]' : 'w-1.5 bg-slate-200'
                }`}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet Modal */}
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          {/* Backdrop Touch area to dismiss */}
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => setIsFilterVisible(false)} 
            className="absolute inset-0"
          />

          {/* Modal Card container */}
          <View className="bg-white rounded-t-[32px] px-6 pt-5 pb-8 shadow-2xl">
            {/* Notch Drag Bar */}
            <View className="w-12 h-1.5 bg-slate-200 rounded-full self-center mb-6" />

            {/* Header Title */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-[#1B3B22] text-xl font-black">Filter Tutors</Text>
              <TouchableOpacity 
                onPress={() => setIsFilterVisible(false)}
                activeOpacity={0.8}
                className="rounded-full shadow-md shadow-[#10B981]/40"
              >
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-2 rounded-full"
                >
                  <Ionicons name="close" size={16} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Scrollable filters inside */}
            <ScrollView showsVerticalScrollIndicator={false} className="max-h-[380px] mb-4">
              
              {/* Category Filter */}
              <View className="mb-5">
                <Text className="text-[#1E293B] text-[14px] font-extrabold mb-3">Category</Text>
                <View className="flex-row flex-wrap gap-2.5">
                  {['All', 'Mathematics', 'Science', 'Languages', 'Programming'].map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedCategory === cat
                          ? 'bg-[#E2F5EA] border-[#10B981]'
                          : 'bg-white border-slate-100'
                      }`}
                    >
                      <Text className={`text-xs font-black ${
                        selectedCategory === cat ? 'text-[#10B981]' : 'text-[#64748B]'
                      }`}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Filter */}
              <View className="mb-5">
                <Text className="text-[#1E293B] text-[14px] font-extrabold mb-3">Hourly Rate</Text>
                <View className="flex-row flex-wrap gap-2.5">
                  {['Any', '$10 - $20', '$20 - $35', '$35 - $50', '$50+'].map((price) => (
                    <TouchableOpacity
                      key={price}
                      onPress={() => setSelectedPrice(price)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedPrice === price
                          ? 'bg-[#E2F5EA] border-[#10B981]'
                          : 'bg-white border-slate-100'
                      }`}
                    >
                      <Text className={`text-xs font-black ${
                        selectedPrice === price ? 'text-[#10B981]' : 'text-[#64748B]'
                      }`}>
                        {price}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Rating Filter */}
              <View className="mb-5">
                <Text className="text-[#1E293B] text-[14px] font-extrabold mb-3">Rating</Text>
                <View className="flex-row flex-wrap gap-2.5">
                  {['Any', '4.5 ★ & above', '4.0 ★ & above', '3.5 ★ & above'].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      onPress={() => setSelectedRating(rating)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedRating === rating
                          ? 'bg-[#E2F5EA] border-[#10B981]'
                          : 'bg-white border-slate-100'
                      }`}
                    >
                      <Text className={`text-xs font-black ${
                        selectedRating === rating ? 'text-[#10B981]' : 'text-[#64748B]'
                      }`}>
                        {rating}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Availability Filter */}
              <View className="mb-6">
                <Text className="text-[#1E293B] text-[14px] font-extrabold mb-3">Availability</Text>
                <View className="flex-row flex-wrap gap-2.5">
                  {['Any', 'Morning', 'Afternoon', 'Evening', 'Weekends'].map((time) => (
                    <TouchableOpacity
                      key={time}
                      onPress={() => setSelectedAvailability(time)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedAvailability === time
                          ? 'bg-[#E2F5EA] border-[#10B981]'
                          : 'bg-white border-slate-100'
                      }`}
                    >
                      <Text className={`text-xs font-black ${
                        selectedAvailability === time ? 'text-[#10B981]' : 'text-[#64748B]'
                      }`}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

            </ScrollView>

            {/* Bottom Reset & Apply buttons */}
            <View className="flex-row gap-4 mt-2">
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('All');
                  setSelectedPrice('Any');
                  setSelectedRating('Any');
                  setSelectedAvailability('Any');
                }}
                className="flex-1 py-3.5 border border-slate-200 rounded-2xl active:opacity-75 items-center justify-center bg-white"
              >
                <Text className="text-[#64748B] text-sm font-black">Reset All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsFilterVisible(false)}
                className="flex-1 py-3.5 bg-[#1B3B22] rounded-2xl active:opacity-85 items-center justify-center"
              >
                <Text className="text-white text-sm font-black">Apply Filters</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
