import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'All Subjects', icon: 'grid', color: '#2563EB', bg: '#EFF6FF' },
  { id: '2', name: 'Mathematics', icon: 'calculator', color: '#10B981', bg: '#EAF8F0' },
  { id: '3', name: 'Science', icon: 'flask', color: '#F97316', bg: '#FFF7ED' },
  { id: '4', name: 'Languages', icon: 'book', color: '#8B5CF6', bg: '#F5F3FF' },
  { id: '5', name: 'Programming', icon: 'code-slash', color: '#3B82F6', bg: '#EFF6FF' },
  { id: '6', name: 'More', icon: 'ellipsis-horizontal', color: '#64748B', bg: '#F8FAFC' },
];

const POPULAR_SUBJECTS = [
  { id: '1', name: 'Mathematics', count: '120+ Tutors', rating: '4.8', reviews: '2.4K', icon: 'calculator', color: '#10B981', bg: '#EAF8F0' },
  { id: '2', name: 'Physics', count: '85+ Tutors', rating: '4.7', reviews: '1.8K', icon: 'flask-outline', color: '#F97316', bg: '#FFF7ED' },
  { id: '3', name: 'English', count: '95+ Tutors', rating: '4.8', reviews: '2.1K', icon: 'book-outline', color: '#8B5CF6', bg: '#F5F3FF' },
  { id: '4', name: 'Programming', count: '150+ Tutors', rating: '4.9', reviews: '3.2K', icon: 'code-slash', color: '#3B82F6', bg: '#EFF6FF' },
  { id: '5', name: 'Spanish', count: '60+ Tutors', rating: '4.6', reviews: '1.2K', icon: 'chatbubble-outline', color: '#EC4899', bg: '#FDF2F8' },
];

const RECOMMENDED_TUTORS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    subject: 'Math Tutor',
    rating: '4.9',
    reviews: '1.2K',
    experience: '5+ Years Exp',
    tag: 'Top Rated',
    tagColor: '#10B981',
    tagBg: '#EAF8F0',
    image: require('@/assets/images/female_tutor.png'),
  },
  {
    id: '2',
    name: 'David Lee',
    subject: 'Physics Tutor',
    rating: '4.8',
    reviews: '956',
    experience: '4+ Years Exp',
    tag: 'Popular',
    tagColor: '#F59E0B',
    tagBg: '#FEF3C7',
    image: require('@/assets/images/male_tutor.png'),
  },
  {
    id: '3',
    name: 'Emma Wilson',
    subject: 'English Tutor',
    rating: '4.9',
    reviews: '1.5K',
    experience: '6+ Years Exp',
    tag: 'Top Rated',
    tagColor: '#10B981',
    tagBg: '#EAF8F0',
    image: require('@/assets/images/female_tutor.png'),
  },
];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = React.useState('All Subjects');

  const recommendedTutorsFlatListRef = React.useRef<FlatList>(null);
  const [currentRecommendedTutorIndex, setCurrentRecommendedTutorIndex] = React.useState(0);

  // Auto slide recommended tutors every 4 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRecommendedTutorIndex((prevIndex) => {
        const nextIndex = prevIndex === RECOMMENDED_TUTORS.length - 1 ? 0 : prevIndex + 1;
        recommendedTutorsFlatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const onRecommendedTutorsMomentumScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (230 + 12));
    setCurrentRecommendedTutorIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
      {/* Header Bar */}
      <View className="px-6 flex-row justify-between items-center mb-5 pt-3">
        <View>
          <Text className="text-[#0F172A] text-[28px] font-extrabold tracking-tight">Explore</Text>
          <Text className="text-[#64748B] text-xs font-semibold mt-0.5">Discover subjects and find the perfect tutor</Text>
        </View>

        {/* Notification Bell Badge */}
        <TouchableOpacity className="relative p-2 bg-white rounded-full border border-slate-100 shadow-sm active:opacity-70">
          <Ionicons name="notifications-outline" size={22} color="#1E293B" />
          <View className="absolute top-1 right-1 bg-[#EF4444] w-[18px] h-[18px] rounded-full items-center justify-center border-2 border-white">
            <Text className="text-white text-[9px] font-extrabold">3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Layout Scrollable Container */}
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search & Filter Controls */}
        <View className="px-6 flex-row items-center gap-3 mb-6">
          <View className="flex-1 flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3.5 shadow-sm shadow-slate-100">
            <Ionicons name="search-outline" size={20} color="#94A3B8" />
            <TextInput
              placeholder="Search for subjects, topics or tutors..."
              placeholderTextColor="#94A3B8"
              className="flex-1 text-[#1E293B] text-[15px] p-0 px-3 font-semibold"
            />
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white border border-slate-100 rounded-2xl items-center justify-center shadow-sm shadow-slate-100 active:opacity-75">
            <Ionicons name="options-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Categories Horizontal Slider */}
        <View className="mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  onPress={() => setActiveCategory(cat.name)}
                  className="items-center mr-5 active:opacity-85"
                >
                  <View 
                    style={{ backgroundColor: isActive ? '#3B82F6' : cat.bg }} 
                    className="w-14 h-14 rounded-2xl items-center justify-center shadow-sm shadow-slate-100"
                  >
                    <Ionicons 
                      name={cat.icon as any} 
                      size={22} 
                      color={isActive ? 'white' : cat.color} 
                    />
                  </View>
                  <Text 
                    className={`text-[11px] mt-2 font-bold ${isActive ? 'text-[#3B82F6]' : 'text-[#64748B]'}`}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Banner Section Card (Direct Image) */}
        <View className="mb-8 px-6">
          <View className="bg-slate-50 rounded-[12px] overflow-hidden h-[160px] shadow-sm shadow-slate-100/50">
            <Image
              source={require('@/assets/images/explore-banner-1.png')}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Popular Subjects */}
        <View className="mb-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-lg font-bold">Popular Subjects</Text>
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
            {POPULAR_SUBJECTS.map((subj) => (
              <TouchableOpacity 
                key={subj.id}
                className="bg-white border border-slate-100 p-3.5 rounded-[20px] items-center mr-3 shadow-sm shadow-slate-100/50 w-[110px] active:opacity-90"
              >
                <View style={{ backgroundColor: subj.bg }} className="w-12 h-12 rounded-full items-center justify-center">
                  <Ionicons name={subj.icon as any} size={18} color={subj.color} />
                </View>
                <Text className="text-[#0F172A] font-bold text-[11px] mt-2.5 text-center" numberOfLines={1}>{subj.name}</Text>
                <Text className="text-[#94A3B8] text-[9px] font-bold mt-0.5">{subj.count}</Text>
                
                {/* Rating row */}
                <View className="flex-row items-center mt-1.5 gap-0.5">
                  <Ionicons name="star" size={9} color="#F59E0B" />
                  <Text className="text-[#64748B] text-[9px] font-black">{subj.rating}</Text>
                  <Text className="text-[#94A3B8] text-[8px] font-semibold">({subj.reviews})</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended For You */}
        <View className="mb-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-lg font-bold">Recommended For You</Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#2563EB] text-xs font-bold">View all</Text>
              <Ionicons name="chevron-forward" size={12} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={recommendedTutorsFlatListRef}
            data={RECOMMENDED_TUTORS}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={230 + 12} // card width = 230, right margin = 12 (mr-3)
            decelerationRate="fast"
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
            keyExtractor={(item) => item.id}
            onMomentumScrollEnd={onRecommendedTutorsMomentumScrollEnd}
            renderItem={({ item: tutor }) => (
              <View 
                className="bg-white border border-slate-100 p-4 rounded-[24px] mr-3 shadow-sm shadow-slate-100/50 w-[230px] active:opacity-95"
              >
                {/* Tag Badge */}
                <View 
                  style={{ backgroundColor: tutor.tagBg }} 
                  className="px-2.5 py-0.5 rounded-full mb-2.5 self-start"
                >
                  <Text style={{ color: tutor.tagColor }} className="text-[8px] font-extrabold">{tutor.tag}</Text>
                </View>

                {/* Avatar and Details Row */}
                <View className="flex-row items-center">
                  {/* Left: Avatar Portrait */}
                  <View className="relative">
                    <View className="w-[72px] h-[78px] rounded overflow-hidden border border-slate-100">
                      <Image source={tutor.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                    </View>
                    {/* Active dot */}
                    <View className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white" />
                  </View>

                  {/* Right: Info details */}
                  <View className="flex-1 ml-3.5 justify-center">
                    <Text className="text-[#0F172A] font-bold text-[14px]" numberOfLines={1}>{tutor.name}</Text>
                    <Text className="text-[#64748B] text-[12px] mt-0.5 font-semibold" numberOfLines={1}>{tutor.subject}</Text>

                    {/* Rating row */}
                    <View className="flex-row items-center mt-1 gap-0.5">
                      <Ionicons name="star" size={9} color="#F59E0B" />
                      <Text className="text-[#64748B] text-[10.5px] font-black">{tutor.rating}</Text>
                      <Text className="text-[#94A3B8] text-[10px] font-semibold">({tutor.reviews})</Text>
                    </View>

                    {/* Experience tag (Moved to content column) */}
                    <View className="bg-[#EFF6FF] px-2 py-0.5 rounded-md self-start mt-1.5">
                      <Text className="text-[#3B82F6] text-[10px] font-bold">{tutor.experience}</Text>
                    </View>
                  </View>
                </View>

                {/* CTA Button */}
                <TouchableOpacity className="border border-[#3B82F6] rounded-xl py-2 mt-4 active:opacity-85">
                  <Text className="text-[#3B82F6] text-[9.5px] font-black text-center">View Profile</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Explore by Level */}
        <View className="mb-8">
          <Text className="text-[#0F172A] text-lg font-bold px-6 mb-4">Explore by Level</Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            {/* Beginner */}
            <TouchableOpacity className="bg-white border border-slate-100 p-4 rounded-[24px] items-center justify-center w-[120px] h-[135px] mr-3 shadow-sm shadow-slate-100/50 relative overflow-hidden active:opacity-90">
              <View className="z-10 items-center justify-center">
                <Ionicons name="leaf" size={24} color="#10B981" />
                <Text className="text-[#0F172A] font-black text-[13px] mt-2 text-center">Beginner</Text>
                <Text className="text-[#64748B] text-[9.5px] font-bold mt-1 text-center">120+ Subjects</Text>
              </View>
              {/* Bottom organic wave overlay */}
              <View className="absolute bottom-0 left-0 right-0 h-10 bg-[#E2F5EA]/30 z-0">
                <View className="absolute -top-7 -left-5 w-16 h-16 rounded-full bg-[#E2F5EA]/45" />
                <View className="absolute -top-5 -right-7 w-16 h-16 rounded-full bg-[#E2F5EA]/30" />
              </View>
            </TouchableOpacity>

            {/* Intermediate */}
            <TouchableOpacity className="bg-white border border-slate-100 p-4 rounded-[24px] items-center justify-center w-[120px] h-[135px] mr-3 shadow-sm shadow-slate-100/50 relative overflow-hidden active:opacity-90">
              <View className="z-10 items-center justify-center">
                <Ionicons name="stats-chart" size={24} color="#F59E0B" />
                <Text className="text-[#0F172A] font-black text-[13px] mt-2 text-center">Intermediate</Text>
                <Text className="text-[#64748B] text-[9.5px] font-bold mt-1 text-center">150+ Subjects</Text>
              </View>
              {/* Bottom organic wave overlay */}
              <View className="absolute bottom-0 left-0 right-0 h-10 bg-[#FEF3C7]/30 z-0">
                <View className="absolute -top-7 -left-5 w-16 h-16 rounded-full bg-[#FEF3C7]/45" />
                <View className="absolute -top-5 -right-7 w-16 h-16 rounded-full bg-[#FEF3C7]/30" />
              </View>
            </TouchableOpacity>

            {/* Advanced */}
            <TouchableOpacity className="bg-white border border-slate-100 p-4 rounded-[24px] items-center justify-center w-[120px] h-[135px] mr-3 shadow-sm shadow-slate-100/50 relative overflow-hidden active:opacity-90">
              <View className="z-10 items-center justify-center">
                <Ionicons name="rocket" size={24} color="#8B5CF6" />
                <Text className="text-[#0F172A] font-black text-[13px] mt-2 text-center">Advanced</Text>
                <Text className="text-[#64748B] text-[9.5px] font-bold mt-1 text-center">100+ Subjects</Text>
              </View>
              {/* Bottom organic wave overlay */}
              <View className="absolute bottom-0 left-0 right-0 h-10 bg-[#EDE9FE]/30 z-0">
                <View className="absolute -top-7 -left-5 w-16 h-16 rounded-full bg-[#EDE9FE]/45" />
                <View className="absolute -top-5 -right-7 w-16 h-16 rounded-full bg-[#EDE9FE]/30" />
              </View>
            </TouchableOpacity>

            {/* Expert */}
            <TouchableOpacity className="bg-white border border-slate-100 p-4 rounded-[24px] items-center justify-center w-[120px] h-[135px] shadow-sm shadow-slate-100/50 relative overflow-hidden active:opacity-90">
              <View className="z-10 items-center justify-center">
                <Ionicons name="ribbon" size={24} color="#3B82F6" />
                <Text className="text-[#0F172A] font-black text-[13px] mt-2 text-center">Expert</Text>
                <Text className="text-[#64748B] text-[9.5px] font-bold mt-1 text-center">80+ Subjects</Text>
              </View>
              {/* Bottom organic wave overlay */}
              <View className="absolute bottom-0 left-0 right-0 h-10 bg-[#EFF6FF]/35 z-0">
                <View className="absolute -top-7 -left-5 w-16 h-16 rounded-full bg-[#DBEAFE]/50" />
                <View className="absolute -top-5 -right-7 w-16 h-16 rounded-full bg-[#DBEAFE]/35" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* What do you want to learn? */}
        <View className="mb-4">
          <Text className="text-[#0F172A] text-lg font-bold px-6 mb-4">What do you want to learn?</Text>

          {/* Links list */}
          <View className="gap-3">
            {/* Link 1 */}
            <TouchableOpacity className="bg-white border border-slate-100 flex-row justify-between items-center px-4 py-3.5 mx-6 rounded-2xl shadow-sm shadow-slate-100/50 active:opacity-90">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-[#EAF8F0] items-center justify-center">
                  <Ionicons name="trending-up" size={16} color="#10B981" />
                </View>
                <Text className="text-[#475569] text-xs font-bold">Improve my skills</Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
            </TouchableOpacity>

            {/* Link 2 */}
            <TouchableOpacity className="bg-white border border-slate-100 flex-row justify-between items-center px-4 py-3.5 mx-6 rounded-2xl shadow-sm shadow-slate-100/50 active:opacity-90">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-[#EFF6FF] items-center justify-center">
                  <Ionicons name="document-text" size={16} color="#3B82F6" />
                </View>
                <Text className="text-[#475569] text-xs font-bold">Prepare for exams</Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
            </TouchableOpacity>

            {/* Link 3 */}
            <TouchableOpacity className="bg-white border border-slate-100 flex-row justify-between items-center px-4 py-3.5 mx-6 rounded-2xl shadow-sm shadow-slate-100/50 active:opacity-90">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-[#F5F3FF] items-center justify-center">
                  <Ionicons name="book" size={16} color="#8B5CF6" />
                </View>
                <Text className="text-[#475569] text-xs font-bold">Learn a new topic</Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
            </TouchableOpacity>

            {/* Link 4 */}
            <TouchableOpacity className="bg-white border border-slate-100 flex-row justify-between items-center px-4 py-3.5 mx-6 rounded-2xl shadow-sm shadow-slate-100/50 active:opacity-90">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-[#FFF7ED] items-center justify-center">
                  <Ionicons name="pencil" size={16} color="#F97316" />
                </View>
                <Text className="text-[#475569] text-xs font-bold">Get homework help</Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
