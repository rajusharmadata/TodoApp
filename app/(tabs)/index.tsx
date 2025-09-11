import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { clearAllTodos } from '@/convex/todos';
import useTheme, { ColorScheme } from '@/hooks/useTheme';
import {  useMutation, useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { Alert, DeviceEventEmitter, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient"
import Header from '@/components/Header';
import Todoinput from '@/components/Todoinput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';
import EmptState from '@/components/EmptState';

export default function Index() {

  type Todo = Doc<"todos">

  const { toggleDarkMode, colors } = useTheme();
  const homeStyle = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const togglTodo =  useMutation(api.todos.togglTodo);


  //   handleToogleTodos
  const handleToogleTodos = async (id: Id<"todos">) => {
      try {
        await togglTodo({ id });
      } catch (error) {
        console.log("Error, toggleing Todo", error);
        Alert.alert("Error","Failed to toggle ")
      }
    }
  const renderTodosItem = ({item}:{item:Todo}) => {
    return (
      <View style={homeStyle.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyle.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyle.checkbox}
            activeOpacity={0.7}
            onPress={() => {
              handleToogleTodos(item._id);
            }}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                homeStyle.checkboxInner,
                {
                  borderColor: item.isCompleted ? 'transparent' : colors.border,
                },
              ]}
            >
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyle.todoTextContainer}>
            <Text
              style={[
                homeStyle.todoText,
                item.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
            <View style={homeStyle.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning} style={homeStyle.actionButton}>
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.danger} style={homeStyle.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
    }


  // check the Loading condition
  const Loading = todos === undefined;
  if (Loading) return <LoadingSpinner />


  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyle.container}>
       {/* statusBarStyle for the top statusBarStyle */}
      <StatusBar barStyle={colors.statusBarStyle} />
      {/* safeArea for the all screenOptions in better arrangement  */}
      <SafeAreaView style={homeStyle.safeArea}>
        <Header/>
        <Todoinput />
        {/* rander the Todos  */}
        <FlatList
          data={todos}
          renderItem={renderTodosItem}
          keyExtractor={(item) =>
            item._id
          }
          style={homeStyle.todoList}
          contentContainerStyle={homeStyle.todoListContent}
          ListEmptyComponent={<EmptState />}
          showsVerticalScrollIndicator = {false}
        />
      </SafeAreaView>
    </LinearGradient>
  );



}
