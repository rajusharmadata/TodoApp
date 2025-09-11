import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {LinearGradient} from "expo-linear-gradient"
import { Ionicons } from '@expo/vector-icons';
const Header = () => {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors);
  // precentagelogic
  // take the todos on the database
  const todos = useQuery(api.todos.getTodos);
  // if completedTodos hai to kitne completedTodos hai agar nhi hai to zero consider kar le
  const completedCount = todos ? (todos.filter((todos) => todos.isCompleted).length) : 0;
  // if todos is exits then find the length when todos is not exits then return the zero
  const totalCount = todos ? (todos.length) : 0;
  // finding the progress precentage
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount)*100 : (0);
  return (
    <View style={homeStyle.header}>
      <View style={homeStyle.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyle.iconContainer}>
          <Ionicons name="flash-outline" size={28} color="#ddd" />
        </LinearGradient>

        <View style={homeStyle.titleTextContainer}>
          <Text style={homeStyle.title}>Today&apos;s Tasks 👀</Text>
          <Text style={homeStyle.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>
    
        <View style={homeStyle.progressContainer}>
          <View style={homeStyle.progressBarContainer}>
            <View style={homeStyle.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[homeStyle.progressFill, { width: `${progressPercentage}%` }]}
              />
            </View>
            <Text style={homeStyle.progressText}>{Math.round(progressPercentage)}%</Text>
          </View>
        </View>

    </View>
  );
}

export default Header
