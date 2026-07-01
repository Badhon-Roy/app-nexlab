import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

export default function MyLearningScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={["top"]}>
      {/* Header (Top padding, notification bell, badged indicator) */}
      <View className="px-6 flex-row justify-between items-center mb-6 pt-3">
        <View>
          <Text className="text-[#0F172A] text-[28px] font-extrabold tracking-tight">
            My Learning
          </Text>
          <Text className="text-[#64748B] text-xs font-semibold mt-0.5">
            Track your progress and continue learning
          </Text>
        </View>

        {/* Notification Bell */}
        <TouchableOpacity className="relative p-2 bg-white rounded-full border border-slate-100 shadow-sm active:opacity-70">
          <Ionicons name="notifications-outline" size={22} color="#1E293B" />
          <View className="absolute top-1 right-1 bg-[#EF4444] w-[18px] h-[18px] rounded-full items-center justify-center border-2 border-white">
            <Text className="text-white text-[9px] font-extrabold">3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Section Card (Direct Image) */}
        <View className="mb-8 px-5">
          <View className="bg-slate-50 rounded-[12px] overflow-hidden h-[160px] shadow-sm shadow-slate-100/50">
            <Image
              source={require("@/assets/images/my-learning-banner.png")}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Continue Learning Section */}
        <View className="mb-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-lg font-bold">
              Continue Learning
            </Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#2563EB] text-xs font-bold">View all</Text>
              <Ionicons name="chevron-forward" size={12} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Cards List container */}
          <View className="px-6">
            {/* Card 1: Math */}
            <View className="bg-white border border-slate-100 p-4 rounded-[24px] mb-4 shadow-sm shadow-slate-100/50">
              {/* Top Row */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 pr-2">
                  {/* Left Indicator Rotated Square */}
                  <View
                    style={{ transform: [{ rotate: "-4deg" }] }}
                    className="w-14 h-14 bg-[#E2F5EA] rounded-[16px] items-center justify-center mr-4"
                  >
                    <View className="w-8 h-8 rounded-full bg-[#10B981] items-center justify-center">
                      <Ionicons name="calculator" size={16} color="white" />
                    </View>
                  </View>

                  {/* Details Column */}
                  <View className="flex-1 pr-1">
                    <View className="bg-[#E2F5EA] px-2.5 py-0.5 rounded-full mb-1 self-start">
                      <Text className="text-[#10B981] text-[9px] font-extrabold">
                        Math
                      </Text>
                    </View>
                    <Text
                      className="text-[#0F172A] font-bold text-[15px]"
                      numberOfLines={1}
                    >
                      Algebra Basics
                    </Text>
                    <Text
                      className="text-[#64748B] text-[11px] mt-0.5 font-semibold"
                      numberOfLines={1}
                    >
                      Chapter 4: Linear Equations
                    </Text>
                  </View>
                </View>

                {/* Right Circle Gauge */}
                <View className="w-[42px] h-[42px] rounded-full border-[3px] border-slate-100 border-t-[#10B981] border-r-[#10B981] border-l-[#10B981] items-center justify-center">
                  <Text className="text-[#0F172A] text-[10px] font-black">
                    75%
                  </Text>
                </View>
              </View>

              {/* Bottom Row */}
              <View className="flex-row items-center justify-between mt-4">
                {/* Progress Bar & Text */}
                <View className="flex-row items-center gap-2.5 flex-1 pr-4">
                  <View className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-[#10B981] rounded-full"
                      style={{ width: "75%" }}
                    />
                  </View>
                  <Text className="text-[#64748B] text-[10px] font-extrabold">
                    75% complete
                  </Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity className="bg-[#EFF6FF] px-4 py-2 rounded-xl active:opacity-80">
                  <Text className="text-[#2563EB] text-[10px] font-black">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 2: Physics */}
            <View className="bg-white border border-slate-100 p-4 rounded-[24px] mb-4 shadow-sm shadow-slate-100/50">
              {/* Top Row */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 pr-2">
                  {/* Left Indicator Rotated Square */}
                  <View
                    style={{ transform: [{ rotate: "-4deg" }] }}
                    className="w-14 h-14 bg-[#FEF3C7] rounded-[16px] items-center justify-center mr-4"
                  >
                    <View className="w-8 h-8 rounded-full bg-[#F59E0B] items-center justify-center">
                      <MaterialCommunityIcons
                        name="atom"
                        size={18}
                        color="white"
                      />
                    </View>
                  </View>

                  {/* Details Column */}
                  <View className="flex-1 pr-1">
                    <View className="bg-[#FEF3C7] px-2.5 py-0.5 rounded-full mb-1 self-start">
                      <Text className="text-[#F59E0B] text-[9px] font-extrabold">
                        Physics
                      </Text>
                    </View>
                    <Text
                      className="text-[#0F172A] font-bold text-[15px]"
                      numberOfLines={1}
                    >
                      {"Newton's Laws of Motion"}
                    </Text>
                    <Text
                      className="text-[#64748B] text-[11px] mt-0.5 font-semibold"
                      numberOfLines={1}
                    >
                      Chapter 2: Force and Motion
                    </Text>
                  </View>
                </View>

                {/* Right Circle Gauge */}
                <View className="w-[42px] h-[42px] rounded-full border-[3px] border-slate-100 border-t-[#F59E0B] border-r-[#F59E0B] items-center justify-center">
                  <Text className="text-[#0F172A] text-[10px] font-black">
                    45%
                  </Text>
                </View>
              </View>

              {/* Bottom Row */}
              <View className="flex-row items-center justify-between mt-4">
                {/* Progress Bar & Text */}
                <View className="flex-row items-center gap-2.5 flex-1 pr-4">
                  <View className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-[#F59E0B] rounded-full"
                      style={{ width: "45%" }}
                    />
                  </View>
                  <Text className="text-[#64748B] text-[10px] font-extrabold">
                    45% complete
                  </Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity className="bg-[#EFF6FF] px-4 py-2 rounded-xl active:opacity-80">
                  <Text className="text-[#2563EB] text-[10px] font-black">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 3: English */}
            <View className="bg-white border border-slate-100 p-4 rounded-[24px] mb-4 shadow-sm shadow-slate-100/50">
              {/* Top Row */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1 pr-2">
                  {/* Left Indicator Rotated Square */}
                  <View
                    style={{ transform: [{ rotate: "-4deg" }] }}
                    className="w-14 h-14 bg-[#EEF2FF] rounded-[16px] items-center justify-center mr-4"
                  >
                    <View className="w-8 h-8 rounded-full bg-[#6366F1] items-center justify-center">
                      <Ionicons name="book" size={16} color="white" />
                    </View>
                  </View>

                  {/* Details Column */}
                  <View className="flex-1 pr-1">
                    <View className="bg-[#EEF2FF] px-2.5 py-0.5 rounded-full mb-1 self-start">
                      <Text className="text-[#6366F1] text-[9px] font-extrabold">
                        English
                      </Text>
                    </View>
                    <Text
                      className="text-[#0F172A] font-bold text-[15px]"
                      numberOfLines={1}
                    >
                      English Grammar
                    </Text>
                    <Text
                      className="text-[#64748B] text-[11px] mt-0.5 font-semibold"
                      numberOfLines={1}
                    >
                      Chapter 6: Parts of Speech
                    </Text>
                  </View>
                </View>

                {/* Right Circle Gauge */}
                <View className="w-[42px] h-[42px] rounded-full border-[3px] border-slate-100 border-t-[#6366F1] border-r-[#6366F1] border-l-[#6366F1] items-center justify-center">
                  <Text className="text-[#0F172A] text-[10px] font-black">
                    60%
                  </Text>
                </View>
              </View>

              {/* Bottom Row */}
              <View className="flex-row items-center justify-between mt-4">
                {/* Progress Bar & Text */}
                <View className="flex-row items-center gap-2.5 flex-1 pr-4">
                  <View className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-[#6366F1] rounded-full"
                      style={{ width: "60%" }}
                    />
                  </View>
                  <Text className="text-[#64748B] text-[10px] font-extrabold">
                    60% complete
                  </Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity className="bg-[#EFF6FF] px-4 py-2 rounded-xl active:opacity-80">
                  <Text className="text-[#2563EB] text-[10px] font-black">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Lessons Section */}
        <View className="mb-8">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-[#0F172A] text-lg font-bold">
              Upcoming Lessons
            </Text>
            <TouchableOpacity className="flex-row items-center gap-0.5 active:opacity-70">
              <Text className="text-[#2563EB] text-xs font-bold">View all</Text>
              <Ionicons name="chevron-forward" size={12} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Lesson Card */}
          <View className="bg-white border border-slate-100 p-4 rounded-[24px] flex-row items-center justify-between mb-4 shadow-sm shadow-slate-100/50 mx-6">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-2xl bg-[#EFF6FF] items-center justify-center mr-4">
                <Ionicons name="calendar" size={24} color="#3B82F6" />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-[#3B82F6] text-xs font-bold">
                  Tomorrow, 10:00 AM
                </Text>
                <Text
                  className="text-[#0F172A] font-bold text-sm mt-0.5"
                  numberOfLines={1}
                >
                  Trigonometry Basics
                </Text>
                <Text
                  className="text-[#64748B] text-[11px] mt-0.5 font-semibold"
                  numberOfLines={1}
                >
                  Lesson 5: Trigonometric Ratios
                </Text>
              </View>
            </View>

            <TouchableOpacity className="border border-[#3B82F6] px-3.5 py-2 rounded-xl flex-row items-center gap-1 bg-white active:opacity-80 ml-2">
              <Ionicons
                name="notifications-outline"
                size={13}
                color="#3B82F6"
              />
              <Text className="text-[#3B82F6] text-[10px] font-extrabold">
                Remind Me
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Stats Section */}
        <View className="mb-8">
          <Text className="text-[#0F172A] text-lg font-bold px-6 mb-4">
            Your Stats
          </Text>

          <View className="px-6 flex-row justify-between">
            {/* Card 1 */}
            <View className="bg-white border border-slate-100 rounded-2xl p-3 items-center justify-center shadow-sm shadow-slate-100/50 flex-1 mr-2">
              <View className="w-8 h-8 rounded-full bg-[#EFF6FF] items-center justify-center mb-2">
                <Ionicons name="book" size={16} color="#3B82F6" />
              </View>
              <Text className="text-[#0F172A] font-extrabold text-base">
                12
              </Text>
              <Text className="text-[#64748B] text-[9px] font-bold mt-0.5">
                Courses
              </Text>
            </View>

            {/* Card 2 */}
            <View className="bg-white border border-slate-100 rounded-2xl p-3 items-center justify-center shadow-sm shadow-slate-100/50 flex-1 mr-2">
              <View className="w-8 h-8 rounded-full bg-[#EAF8F0] items-center justify-center mb-2">
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              </View>
              <Text className="text-[#0F172A] font-extrabold text-base">
                68
              </Text>
              <Text
                className="text-[#64748B] text-[9px] font-bold mt-0.5 text-center"
                numberOfLines={1}
              >
                Completed
              </Text>
            </View>

            {/* Card 3 */}
            <View className="bg-white border border-slate-100 rounded-2xl p-3 items-center justify-center shadow-sm shadow-slate-100/50 flex-1 mr-2">
              <View className="w-8 h-8 rounded-full bg-[#FEF3C7] items-center justify-center mb-2">
                <Ionicons name="time" size={16} color="#F59E0B" />
              </View>
              <Text
                className="text-[#0F172A] font-extrabold text-sm mt-0.5"
                numberOfLines={1}
              >
                24h 30m
              </Text>
              <Text
                className="text-[#64748B] text-[9px] font-bold mt-0.5 text-center"
                numberOfLines={1}
              >
                Study Time
              </Text>
            </View>

            {/* Card 4 */}
            <View className="bg-white border border-slate-100 rounded-2xl p-3 items-center justify-center shadow-sm shadow-slate-100/50 flex-1">
              <View className="w-8 h-8 rounded-full bg-[#FDF2F8] items-center justify-center mb-2">
                <Ionicons name="trending-up" size={16} color="#EC4899" />
              </View>
              <Text className="text-[#0F172A] font-extrabold text-base">
                85%
              </Text>
              <Text
                className="text-[#64748B] text-[9px] font-bold mt-0.5 text-center"
                numberOfLines={1}
              >
                Avg. Progress
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
