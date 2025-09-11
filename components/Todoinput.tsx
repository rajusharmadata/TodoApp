import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { mutation } from '@/convex/_generated/server';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Todoinput = () => {
  const { colors } = useTheme();
  const homeStyle = createHomeStyles(colors)
  // net todos
  const [newTodo, setNewTodo] = useState("");
  const addTodos = useMutation(api.todos.addTodo)

  // Handel addTodos
  const handleAddTodos = async () => {
    if (newTodo.trim()) {
        try {
          await addTodos({ text: newTodo.trim() });
          setNewTodo("")
        } catch (error) {
          console.log("Error adding todos",error);
          Alert.alert('Error ',"Failed to add Todo");
        }
    }
   }

  return (
    <View style={homeStyle.inputSection}>
      <View style={homeStyle.inputWrapper}>
        <TextInput
          style={homeStyle.input}
          placeholder='what need to be done'
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodos}

          placeholderTextColor={colors.textMuted}
        />
       {/* handle add todos button  */}
        <TouchableOpacity  style = {homeStyle.addButton} onPress={handleAddTodos} activeOpacity={0.8} disabled = {!newTodo.trim()}>

          <LinearGradient style = {[homeStyle.addButton, !newTodo.trim() && homeStyle.addButtonDisabled]} colors={newTodo.trim() ? (colors.gradients.primary) :(colors.gradients.muted)}>
            <Ionicons name='add' size={24} color="#fff"/>
          </LinearGradient>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default Todoinput
