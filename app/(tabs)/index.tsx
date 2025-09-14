import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { clearAllTodos } from '@/convex/todos';
import useTheme, { ColorScheme } from '@/hooks/useTheme';
import {  useMutation, useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { Alert, DeviceEventEmitter, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient"
import Header from '@/components/Header';
import Todoinput from '@/components/Todoinput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';
import EmptState from '@/components/EmptState';
import { useState } from 'react';


export default function Index() {
  const [edittext, setEditText] = useState("")
  type Todo = Doc<"todos">
  const [editId, setEditId] = useState<Id<'todos'> | null>(null);


  const { toggleDarkMode, colors } = useTheme();
  const homeStyle = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  // take a toggle todo method for the udpate the todo

  const togglTodo = useMutation(api.todos.togglTodo);
  // delete the todo
  const deleteTodo = useMutation(api.todos.deleteTodo);
  // update the todo
  const updateTodo = useMutation(api.todos.updateTodo);


  //

  //   handleToogleTodos
  const handleToogleTodos = async (id: Id<"todos">) => {
      try {
        await togglTodo({ id });
      } catch (error) {
        console.log("Error, toggleing Todo", error);
        Alert.alert("Error","Failed to toggle ")
      }
  }

  // HandledeletTodo
 const handleDeleteTodo = (id: Id<'todos'>) => {
   try {
     Alert.alert('Delete Todo', 'Are you sure you want to delete this Todo?', [
       { text: 'Cancel', style: 'cancel' },
       {
         text: 'Delete',
         style: 'destructive',
         onPress: async () => {
           try {
             await deleteTodo({ id });
           } catch (err) {
             console.error('Error deleting todo:', err);
             Alert.alert('Error', 'Failed to delete todo.');
           }
         },
       },
     ]);
   } catch (error) {
     console.error('Unexpected error in delete handler:', error);
     Alert.alert('Error', 'Something went wrong.');
   }
 };
  // Handle Editing todo
  const handleEditTodo = (todo:Todo) => {
    setEditText(todo.text);
    setEditId(todo._id)
  }
// Handle EditTodo To save
  const handleEditTodoSave = async() => {
    if (editId) {
       try {
         await updateTodo({ id: editId, text: edittext });
         setEditText("")
         setEditId(null)
       } catch (error) {
         console.log("Error", "updating todo ", error);
         Alert.alert("Error", "Error Failed to update todo");
       }
    }
   };

  const handleEditTodoCancel = () => {
     setEditText('');
     setEditId(null);
  };

  const renderTodosItem = ({ item }: { item: Todo }) => {
  const isEditing = editId === item._id;

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
          {isEditing ? (
            <View style={homeStyle.todoTextContainer}>
              <TextInput
                style={homeStyle.editInput}
                value={edittext}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your Todo...."
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyle.editButton}>
                <TouchableOpacity onPress={handleEditTodoSave}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyle.editButton}>
                    <Ionicons name="checkmark" color="#fff" size={16}/>
                    <Text style={homeStyle.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditTodoCancel}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyle.editButton}>
                    <Ionicons name="close" color="#fff" size={16} />
                    <Text style={homeStyle.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
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
                <TouchableOpacity
                  onPress={() => {
                    handleEditTodo(item);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={colors.gradients.warning} style={homeStyle.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleDeleteTodo(item._id);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={colors.gradients.danger} style={homeStyle.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
        <Header />
        <Todoinput />
        {/* rander the Todos  */}
        <FlatList
          data={todos}
          renderItem={renderTodosItem}
          keyExtractor={item => item._id}
          style={homeStyle.todoList}
          contentContainerStyle={homeStyle.todoListContent}
          ListEmptyComponent={<EmptState />}
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>
    </LinearGradient>
  );



}
