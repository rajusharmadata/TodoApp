import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { EvilIcons, Ionicons } from '@expo/vector-icons';


const DangerZon = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const handleResetApp = async () => {
    Alert.alert(
      "Reset App",
      "This will be deleted all todos permanently . this action can not be undone ",
      // HERE Two Button for the cancel and reset
      [
        { text: "cancel", style: "cancel" },
        {
          text: "Delete All", style: "destructive",
          // HERE IS THE ON PRESS LOGIN
          onPress: async () => {
             try {
                 const result = await clearAllTodos();
                 Alert.alert(
                   'App reset',
                   `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? '' : 's'} Your app Has been Reset`
                 );
             } catch (error) {
               console.log("Error deleteing All todos ", error);
               Alert.alert( "Error","Failed To Reset App ")
             }
          }
        }
      ]
    )
  }
  return (
    <LinearGradient colors={colors.gradients.surface} style = {settingsStyles.section}>
      <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>


      <TouchableOpacity
        style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
        onPress={handleResetApp}
        activeOpacity={0.7}
      >
        <View style={settingsStyles.actionLeft}>
          <LinearGradient colors={colors.gradients.danger} style = {settingsStyles.actionIcon}>
            <EvilIcons name = "trash" color="#fff" size={18}/>
          </LinearGradient>
          <Text style = {settingsStyles.actionTextDanger}>Rest App</Text>
        </View>
        <Ionicons name='chevron-forward' size={18} color={colors.textMuted}/>
      </TouchableOpacity>
   </LinearGradient>
  )
}

export default DangerZon
