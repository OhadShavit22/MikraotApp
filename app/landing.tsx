  import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';


  import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import Player from '@/models/player';
import { Rank } from '@/models/rank';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import { useState } from 'react';

  const { width } = Dimensions.get('window');
  
  const menuButtons = [
    {
      label: 'מבחנים',
      icon: require('@/assets/images/TestIcon.png'),
      href: '/tests/test-settings',
    },
    {
      label: 'סיכומים',
      icon: require('@/assets/images/LearnIcon.png'),
      href: 'landing', // Placeholder
    },
    {
      label: 'דרגות',
      icon: require('@/assets/images/RankIcon.png'),
      href: 'landing', // Placeholder
    },
    {
      label: 'מי אנחנו?',
      icon: require('@/assets/images/PeopleIcon.png'),
      href: 'landing', // Placeholder
    },
    {
      label: 'העלאת שאלות!',
      icon: require('@/assets/images/UploadIcon.png'),
      href: 'landing', // Placeholder
    },
  ];
  export default function LandingPage() {

    const [playerDetails, setPlayerDetails] = useState<Player>({
      uid: '',
      displayName: 'אוהד שביט',
      rank: Rank.SAMAL,
      score: 32563
    })

    const [fontsLoaded, fontError] = useFonts({
    'GevertLevin-Regular': require('./../assets/fonts/GevertLevin-Regular.ttf'),
  });

    return (
      <ThemedView style={styles.container} lightColor='#f5f5f5'>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <ThemedText style={styles.title} type="title">מקרעות!</ThemedText>
            <ThemedText style={styles.subtitle} type='subtitle'>בדרך לבה"ד עוברים את המבחן...</ThemedText>
            <ThemedText style={styles.playerDetails} type='subtitle'>{playerDetails?.displayName} - {playerDetails?.rank} - {playerDetails?.score}</ThemedText>
          </View>

          <View style={styles.buttonsContainer}>
            {menuButtons.map((buttonInfo) => (
              <Link key={buttonInfo.label} href={buttonInfo.href as any} asChild>
                <TouchableOpacity style={styles.button}>
                  <Image style={styles.buttonImage} source={buttonInfo.icon} />
                  <ThemedText style={styles.buttonLabel}>{buttonInfo.label}</ThemedText>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </ThemedView> 
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
     },
    scrollContainer: {
      flexGrow: 1,
      padding: width * 0.05,
      justifyContent: 'flex-start',
    },
    header: {
      alignItems: 'center',
      marginVertical: '5%',
      paddingTop: '10%',
    },
    title: {
      color: Colors.light.text,
      fontFamily: 'GevertLevin-Regular',
      fontSize: 70,
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 80,
      paddingHorizontal: '10%',
      paddingVertical: '3%',
    },
    subtitle: {
      color: Colors.light.text,
      fontFamily: 'GevertLevin-Regular',
      fontSize: 23,
      textAlign: 'center',
      marginTop: 8,
    },
    playerDetails: {
      color: Colors.light.text,
      fontFamily: 'GevertLevin-Regular',
      fontSize: 22,
      textAlign: 'center',
      marginTop: 16,
    },
    buttonsContainer: {
      marginVertical: 0,
    },
    button: {
      backgroundColor: 'white',
      borderColor: Colors.light.text,
      borderWidth: 2,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginVertical: 8,
      flexDirection: 'row-reverse',
    },
    buttonImage: {
      width: 35,
      height: 35,
      resizeMode: 'contain', 
      marginLeft: 15,
    },
    buttonLabel: { 
      color: Colors.light.text,
      fontSize: 22,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'right',
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginTop: 'auto',
    },
    logo: {
      width: width * 0.5,
      height: width * 0.5,
      resizeMode: 'contain',
    },
  });