import { View, Text } from 'react-native'
import React from 'react'

import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const EmptState = () => {
  const {colors} = useTheme()
  const homeStyles = createHomeStyles(colors);
  return (
    <View style={homeStyles.emptyContainer}>
      <LinearGradient colors={colors.gradients.empty} style={homeStyles.emptyIconContainer}>
        <Ionicons name="clipboard-outline" size={60} color={colors.textMuted} />
      </LinearGradient>
      <Text style={homeStyles.emptyText}>No todos yet!</Text>
      <Text style={homeStyles.emptySubtext}>Add your first todo above to get started</Text>
    </View>
  );
}

export default EmptState
