import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProgressState = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  // get a todos
  const todos = useQuery(api.todos.getTodos);
  // all todos
  const allTodos = todos ? todos.length : 0;
  // completed Todo
  // if todos is not null then count the number of the completed todos when todo is not exits the return the  0
  const CompletedTodos = todos ? todos.filter(((todo) => todo.isCompleted)).length : 0;
  // active todo
  const Activetodo = allTodos - CompletedTodos;

  return (
    <LinearGradient colors={colors.gradients.background} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>

      {/* TOTOAL NUMBER OF THE TODOS  */}
      <View style={settingsStyles.statsContainer}>
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingsStyles.statIcon}>
              <Ionicons name="list" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{allTodos}</Text>
            <Text style={settingsStyles.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>

        {/* COMPLETED TODOS  */}

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={colors.gradients.success} style={settingsStyles.statIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{CompletedTodos}</Text>
            <Text style={settingsStyles.statLabel}>Completed Todos</Text>
          </View>
        </LinearGradient>

        {/* ACTIVE TODOS  */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={colors.gradients.warning} style={settingsStyles.statIcon}>
              <Ionicons name="time" size={20} color="#ffffffff" />
            </LinearGradient>
          </View>
          <View>
            <Text style={settingsStyles.statNumber}>{Activetodo}</Text>
            <Text style={settingsStyles.statLabel}>Active Todos</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
}

export default ProgressState
