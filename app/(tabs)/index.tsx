import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { clearAllTodos } from '@/convex/todos';
import useTheme, { ColorScheme } from '@/hooks/useTheme';
import {  useMutation, useQuery } from 'convex/react';
import { Link } from 'expo-router';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient"
import Header from '@/components/Header';
export default function Index() {

  const { toggleDarkMode, colors } = useTheme();
  const homeStyle = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyle.container}>
       {/* statusBarStyle for the top statusBarStyle */}
      <StatusBar barStyle={colors.statusBarStyle} />
      {/* safeArea for the all screenOptions in better arrangement  */}
      <SafeAreaView style={homeStyle.safeArea}>
        <Header/>
        <TouchableOpacity onPress={toggleDarkMode}>

        </TouchableOpacity>
      </SafeAreaView> 
    </LinearGradient>
  );



}
