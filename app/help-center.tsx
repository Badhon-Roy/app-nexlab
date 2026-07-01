import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

interface FaqItem {
  id: string;
  category: 'lessons' | 'tutors' | 'payments';
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    category: 'lessons',
    question: 'How do I reschedule a booked lesson?',
    answer: 'Go to the "My Learning" tab, tap on the upcoming lesson card, and select "Reschedule". You can choose any other available time slot of your tutor at least 12 hours before the session starts.'
  },
  {
    id: '2',
    category: 'lessons',
    question: 'What is the lesson cancellation policy?',
    answer: 'Lessons cancelled more than 24 hours in advance will receive a full 100% refund. Cancellations made within 24 hours of the start time may incur a 50% late-cancellation fee.'
  },
  {
    id: '3',
    category: 'tutors',
    question: 'How are Nexlab tutors verified?',
    answer: 'Every tutor on Nexlab passes a comprehensive vetting process, including academic transcript verification, background checks, and a live mock teaching interview before they are verified.'
  },
  {
    id: '4',
    category: 'tutors',
    question: 'Can I request a free trial/taster lesson?',
    answer: 'Yes! Many tutors offer a 15-minute free taster session. Look for the "Free Taster Lesson" banner on eligible tutor detail pages to book your trial session.'
  },
  {
    id: '5',
    category: 'payments',
    question: 'What payment methods are supported?',
    answer: 'We support all major international credit/debit cards (Visa, Mastercard, American Express) as well as secure local mobile bank payments like bKash, Rocket, and Nagad.'
  },
  {
    id: '6',
    category: 'payments',
    question: 'How do refunds work if a tutor misses a class?',
    answer: 'If a tutor fails to attend a session, your payment is 100% protected. Simply report the class status from "My Learning" within 24 hours, and the credits will be refunded to your account immediately.'
  }
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'lessons' | 'tutors' | 'payments'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Support Modals state
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  // Email form state
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Chat message state
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'agent'; text: string }[]>([
    { sender: 'agent', text: 'Hi Sarah! Welcome to Nexlab Support. How can I help you today?' }
  ]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [userMessageText, setUserMessageText] = useState('');

  const handleQuickReply = (userText: string, replyText: string) => {
    // Prevent double clicking same quick reply rapidly
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    
    setIsAgentTyping(true);
    setTimeout(() => {
      setIsAgentTyping(false);
      setChatMessages((prev) => [...prev, { sender: 'agent', text: replyText }]);
    }, 850);
  };

  const handleSendMessage = () => {
    if (!userMessageText.trim()) return;
    const text = userMessageText.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text }]);
    setUserMessageText('');

    setIsAgentTyping(true);
    setTimeout(() => {
      setIsAgentTyping(false);
      setChatMessages((prev) => [
        ...prev,
        { 
          sender: 'agent', 
          text: 'Thank you for your message! A support specialist has been notified and will respond here within 2 minutes.' 
        }
      ]);
    }, 1000);
  };

  // Filter FAQs based on search and active tab category
  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeTab === 'all' || faq.category === activeTab;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
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
          <Text className="text-[#1B3B22] text-xl font-bold">Help Center</Text>
          <Text className="text-[#64748B] text-xs font-semibold">
            FAQs, live chat, and support tickets
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Support Options Header Card */}
        <View className="px-6 mb-6">
          <Text className="text-[#64748B] text-sm font-bold uppercase tracking-wider mb-3 ml-2">Contact Support</Text>
          
          <View className="flex-row gap-3">
            {/* Live Chat Card */}
            <TouchableOpacity 
              onPress={() => setIsChatVisible(true)}
              activeOpacity={0.9}
              className="flex-1 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm shadow-slate-100/50 items-center text-center active:opacity-80"
            >
              <View className="w-10 h-10 rounded-xl bg-[#EAF8F0] items-center justify-center mb-2.5">
                <Ionicons name="chatbubbles" size={20} color="#10B981" />
              </View>
              <Text className="text-[#1E293B] text-xs font-black">Live Chat</Text>
              <Text className="text-[#94A3B8] text-[9px] font-semibold mt-1">Average response: 2m</Text>
            </TouchableOpacity>

            {/* Email Card */}
            <TouchableOpacity 
              onPress={() => setIsEmailVisible(true)}
              activeOpacity={0.9}
              className="flex-1 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm shadow-slate-100/50 items-center text-center active:opacity-80"
            >
              <View className="w-10 h-10 rounded-xl bg-[#EFF6FF] items-center justify-center mb-2.5">
                <Ionicons name="mail" size={20} color="#3B82F6" />
              </View>
              <Text className="text-[#1E293B] text-xs font-black">Email Help</Text>
              <Text className="text-[#94A3B8] text-[9px] font-semibold mt-1">Response in under 2h</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar section */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
            <Ionicons name="search-outline" size={20} color="#64748B" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search help topics or keywords..."
              placeholderTextColor="#94A3B8"
              className="flex-1 text-[#1E293B] text-sm p-0 px-3 font-semibold"
              style={{ outlineStyle: 'none' } as any}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1">
                <Ionicons name="close-circle" size={16} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* FAQ Tabs Selector */}
        <View className="mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          >
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'lessons', label: 'Lessons' },
              { id: 'tutors', label: 'Tutors' },
              { id: 'payments', label: 'Payments' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => {
                    setActiveTab(tab.id as any);
                    setExpandedFaqId(null);
                  }}
                  className={`px-4 py-2 mr-2.5 rounded-full border transition-all ${
                    isActive 
                      ? 'bg-[#10B981] border-[#10B981]' 
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <Text className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#64748B]'}`}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* FAQs List Section */}
        <View className="px-6">
          <Text className="text-[#64748B] text-xs font-bold uppercase tracking-wider mb-4 ml-2">Frequently Asked Questions</Text>

          {filteredFaqs.length > 0 ? (
            <View className="gap-y-3">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <View 
                    key={faq.id}
                    className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-sm shadow-slate-100/30"
                  >
                    {/* Question Row Header */}
                    <TouchableOpacity
                      onPress={() => toggleFaq(faq.id)}
                      activeOpacity={0.85}
                      className="flex-row items-center justify-between p-4"
                    >
                      <Text className="text-[#1E293B] text-sm font-bold flex-1 pr-4 leading-snug">
                        {faq.question}
                      </Text>
                      <Ionicons 
                        name={isExpanded ? "chevron-up" : "chevron-down"} 
                        size={16} 
                        color="#64748B" 
                      />
                    </TouchableOpacity>

                    {/* Answer Area (Expandable) */}
                    {isExpanded && (
                      <View className="px-4 pb-4 pt-1 border-t border-slate-50/50">
                        <Text className="text-[#64748B] text-xs leading-relaxed font-semibold">
                          {faq.answer}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ) : (
            /* Empty State search results */
            <View className="items-center py-10 px-8 bg-white border border-slate-100 rounded-[24px] shadow-sm">
              <Ionicons name="search" size={32} color="#94A3B8" className="mb-2" />
              <Text className="text-[#1E293B] text-sm font-bold text-center">No FAQ Topics Found</Text>
              <Text className="text-[#64748B] text-[11px] font-semibold text-center mt-1">
                {`We couldn't find any FAQs matching "${searchQuery}". Please try other terms or contact live support.`}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Live Chat Modal */}
      <Modal
        visible={isChatVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsChatVisible(false)}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setIsChatVisible(false)}
          className="flex-1 bg-black/40 justify-end"
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}} className="w-full">
            <View className="bg-white h-[600px] rounded-t-[32px] p-6 pb-8 shadow-2xl flex-col">
              {/* Grabber Handle */}
              <View className="w-12 h-1 bg-slate-200 rounded-full self-center mb-4" />

              {/* Header info */}
              <View className="flex-row justify-between items-center mb-5 pb-3 border-b border-slate-50">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#EAF8F0] items-center justify-center relative">
                    <Ionicons name="chatbubbles" size={20} color="#10B981" />
                    <View className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
                  </View>
                  <View>
                    <Text className="text-[#1E293B] text-sm font-bold">Nexlab AI Assistant</Text>
                    <Text className="text-[#10B981] text-[9.5px] font-bold">Online • Fast responses</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  onPress={() => setIsChatVisible(false)}
                  activeOpacity={0.8}
                  className="rounded-full overflow-hidden shadow-sm shadow-slate-100"
                >
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 18 }}
                    className="p-1.5 items-center justify-center rounded-full"
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Messages Scroll area */}
              <ScrollView 
                className="flex-1 mb-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10, gap: 12 }}
              >
                {chatMessages.map((msg, index) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <View 
                      key={index}
                      className={`flex-row ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <View className={`max-w-[80%] rounded-[20px] px-4 py-2.5 ${
                        isUser 
                          ? 'bg-[#10B981] rounded-tr-none' 
                          : 'bg-slate-50 rounded-tl-none border border-slate-100'
                      }`}>
                        <Text className={`text-xs leading-relaxed ${isUser ? 'text-white font-medium' : 'text-[#334155] font-semibold'}`}>
                          {msg.text}
                        </Text>
                      </View>
                    </View>
                  );
                })}

                {isAgentTyping && (
                  <View className="flex-row justify-start">
                    <View className="bg-slate-50 rounded-[20px] rounded-tl-none px-4 py-2.5 border border-slate-100">
                      <Text className="text-[#94A3B8] text-xs font-semibold">typing...</Text>
                    </View>
                  </View>
                )}
              </ScrollView>

              {/* Quick replies list */}
              <Text className="text-[#94A3B8] text-[9.5px] font-bold uppercase tracking-wider mb-2">Tap a question to ask:</Text>
              <View className="flex-row gap-2 flex-wrap mb-2">
                {[
                  { 
                    q: 'How to get a refund?', 
                    a: 'Refunds are automatically processed for any lesson cancelled at least 24 hours prior to starting. The funds will reflect in your account within 2-3 business days.' 
                  },
                  { 
                    q: 'Reschedule class', 
                    a: 'Tap on your upcoming lesson in "My Learning" -> "Reschedule". You can move it to any other slot at least 12 hours beforehand.' 
                  },
                  { 
                    q: 'Become a tutor', 
                    a: 'Awesome! We are always looking for stellar educators. Apply online at nexlab.edu/tutors. We review applications every Tuesday.' 
                  }
                ].map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleQuickReply(item.q, item.a)}
                    className="bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-full items-center justify-center active:opacity-75"
                  >
                    <Text className="text-[#10B981] text-[11px] font-bold">{item.q}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Message Input Box */}
              <View className="flex-row items-center gap-2 border-t border-slate-100 pt-4 mt-2">
                <View className="flex-1 flex-row items-center bg-slate-50 border border-slate-100 rounded-full px-4 py-2">
                  <TextInput
                    value={userMessageText}
                    onChangeText={setUserMessageText}
                    onSubmitEditing={handleSendMessage}
                    placeholder="Type your message here..."
                    placeholderTextColor="#94A3B8"
                    className="flex-1 text-[#1E293B] text-xs p-0 font-semibold h-8"
                    style={{ outlineStyle: 'none' } as any}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSendMessage}
                  disabled={!userMessageText.trim()}
                  className={`w-9 h-9 rounded-full items-center justify-center ${
                    userMessageText.trim() ? 'bg-[#10B981] active:opacity-90' : 'bg-slate-100'
                  }`}
                >
                  <Ionicons name="send" size={14} color={userMessageText.trim() ? 'white' : '#94A3B8'} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Email Help Ticket Modal */}
      <Modal
        visible={isEmailVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsEmailVisible(false);
          setTicketSuccess(false);
        }}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => {
            setIsEmailVisible(false);
            setTicketSuccess(false);
          }}
          className="flex-1 bg-black/40 justify-end"
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}} className="w-full">
            <View className="bg-white rounded-t-[32px] p-6 pb-8 shadow-2xl">
              {/* Grabber Handle */}
              <View className="w-12 h-1 bg-slate-200 rounded-full self-center mb-4" />

              {/* Header info */}
              <View className="flex-row justify-between items-center mb-5 pb-3 border-b border-slate-50">
                <View className="flex-row items-center gap-3.5">
                  <View className="w-10 h-10 rounded-full bg-[#EFF6FF] items-center justify-center">
                    <Ionicons name="mail" size={20} color="#3B82F6" />
                  </View>
                  <View>
                    <Text className="text-[#1E293B] text-sm font-bold">Submit Support Ticket</Text>
                    <Text className="text-[#64748B] text-[9.5px] font-semibold">Response guaranteed in 2 hours</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  onPress={() => {
                    setIsEmailVisible(false);
                    setTicketSuccess(false);
                  }}
                  activeOpacity={0.8}
                  className="rounded-full overflow-hidden shadow-sm shadow-slate-100"
                >
                  <LinearGradient
                    colors={['#3B82F6', '#1D4ED8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 18 }}
                    className="p-1.5 items-center justify-center rounded-full"
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {ticketSuccess ? (
                /* Success Submission Card */
                <View className="items-center py-8">
                  <View className="w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center mb-4 border border-emerald-100">
                    <Ionicons name="checkmark-circle" size={28} color="#10B981" />
                  </View>
                  <Text className="text-[#1E293B] text-base font-bold">Ticket Submitted!</Text>
                  <Text className="text-[#64748B] text-xs text-center mt-2 px-6 leading-relaxed font-semibold">
                    We have received your ticket. A confirmation and response will be sent to sarah.johnson@gmail.com shortly.
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setIsEmailVisible(false);
                      setTicketSuccess(false);
                    }}
                    className="bg-[#10B981] w-full py-3.5 rounded-2xl mt-8 active:opacity-90 items-center justify-center"
                  >
                    <Text className="text-white text-xs font-bold">Back to Help Center</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* Ticket Form */
                <View className="gap-y-4">
                  {/* Sender Email (static info) */}
                  <View>
                    <Text className="text-[#475569] text-xs font-bold mb-1.5 ml-1">From</Text>
                    <View className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
                      <Text className="text-[#64748B] text-xs font-bold">sarah.johnson@gmail.com</Text>
                    </View>
                  </View>

                  {/* Subject */}
                  <View>
                    <Text className="text-[#475569] text-xs font-bold mb-1.5 ml-1">Subject</Text>
                    <View className="flex-row items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30">
                      <TextInput
                        value={subject}
                        onChangeText={setSubject}
                        placeholder="e.g. Reschedule assistance, refund delay"
                        placeholderTextColor="#94A3B8"
                        className="flex-1 text-[#1E293B] text-xs p-0 font-semibold"
                        style={{ outlineStyle: 'none' } as any}
                      />
                    </View>
                  </View>

                  {/* Message Body */}
                  <View>
                    <Text className="text-[#475569] text-xs font-bold mb-1.5 ml-1">Message Description</Text>
                    <View className="flex-row items-start bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm shadow-slate-100/30 h-28">
                      <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Describe your issue or query in detail so our team can investigate..."
                        placeholderTextColor="#94A3B8"
                        multiline={true}
                        textAlignVertical="top"
                        className="flex-1 text-[#1E293B] text-xs p-0 font-semibold h-full"
                        style={{ outlineStyle: 'none' } as any}
                      />
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View className="flex-row gap-3 mt-4">
                    {/* Cancel */}
                    <TouchableOpacity
                      onPress={() => setIsEmailVisible(false)}
                      className="flex-1 border border-slate-100 py-3.5 rounded-2xl bg-white active:opacity-75 items-center justify-center"
                    >
                      <Text className="text-[#64748B] text-xs font-bold">Cancel</Text>
                    </TouchableOpacity>

                    {/* Submit */}
                    <TouchableOpacity
                      onPress={() => {
                        if (!subject || !message) return;
                        setTicketSuccess(true);
                        setSubject('');
                        setMessage('');
                      }}
                      disabled={!subject || !message}
                      className={`flex-1 py-3.5 rounded-2xl items-center justify-center ${
                        subject && message ? 'bg-[#3B82F6] active:opacity-90' : 'bg-slate-100'
                      }`}
                    >
                      <Text className={`text-xs font-bold ${subject && message ? 'text-white' : 'text-[#94A3B8]'}`}>
                        Submit Ticket
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
