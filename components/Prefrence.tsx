import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Prefrence = () => {
   const [isautSync, setIsautoSync] = useState(true);
  const [isnotification, setIsnotification] = useState(true);
  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const settingsStyles = createSettingsStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Prefrencess</Text>
      {/* THEMS CHANGER  */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
            <Ionicons name="moon" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={'#fff'}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      {/* NOTIFICATIONS   */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isnotification}
          onValueChange={() => {
            setIsnotification(!isnotification);
          }}
          thumbColor={'#fff'}
          trackColor={{ false: colors.border, true: colors.warning }}
        />
      </View>

      {/* isautSync   */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>AutSync</Text>
        </View>
        <Switch
          value={isautSync}
          onValueChange={() => {
            setIsautoSync(!isautSync);
          }}
          thumbColor={'#fff'}
          trackColor={{ false: colors.border, true: colors.success }}
        />
      </View>
    </LinearGradient>
  );
}

export default Prefrence
