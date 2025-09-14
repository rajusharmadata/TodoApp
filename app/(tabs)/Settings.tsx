import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressState from '@/components/ProgressState';
import Prefrence from '@/components/Prefrence';
import DangerZon from '@/components/DangerZon';

const Settings = () => {

  const { colors } = useTheme()

  const settingsStyles = createSettingsStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.background} style={settingsStyles.container}>
      <SafeAreaView style={settingsStyles.safeArea}>
        {/* HEDER COMPONETNT  */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingsStyles.iconContainer}>
              <Ionicons name="settings" color="#fff" size={18} />
            </LinearGradient>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>
        {/* SCROLLE VIEW COMPONENTS  */}
        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator = {false}
        >
          <ProgressState />
          {/* Prefrence */}
          <Prefrence />

          {/* DANGERZONE COMPONENTS  */}
          <DangerZon/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
