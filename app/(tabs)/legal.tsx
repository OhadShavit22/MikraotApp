  import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';


  import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Player from '@/models/player';
import { Rank } from '@/models/rank';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { useState } from 'react';





  export default function LegalPage() {

    const [playerDetails, setPlayerDetails] = useState<Player>({
      uid: '',
      displayName: 'אוהד שביט',
      rank: Rank.SAMAL,
      score: 32563
    })

    const [fontsLoaded, fontError] = useFonts({
    'GevertLevin-Regular': require('./../../assets/fonts/GevertLevin-Regular.ttf'),
  });

    return (
      <ThemedView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <ThemedText style={styles.header} type="title">Legal</ThemedText>
          <ThemedText style={styles.subtitle} type='subtitle'>בדרך לבה"ד עוברים את המבחן...</ThemedText>
          <ThemedText style={styles.subtitle} type='subtitle'>{playerDetails?.displayName} - {playerDetails?.rank} - {playerDetails?.score}</ThemedText>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
                      <Image style={styles.buttonImage} source={require('@/assets/images/PeopleIcon.png')}/>
            </TouchableOpacity>
                    <ThemedText style={styles.buttonLabel}>מי אנחנו</ThemedText>
          </View>
          <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
                      <Image style={styles.buttonImage} source={require('@/assets/images/UploadIcon.png')}/>
          </TouchableOpacity>
                    <ThemedText style={styles.buttonLabel}>העלאה!</ThemedText>
          </View>
          <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
                      <Image style={styles.buttonImage} source={require('@/assets/images/TestIcon.png')}/>
          </TouchableOpacity>
                    <ThemedText style={styles.buttonLabel}>מבחנים</ThemedText>

          </View>
          <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
                      <Image style={styles.buttonImage} source={require('@/assets/images/LearnIcon.png')}/>
          </TouchableOpacity>
                    <ThemedText style={styles.buttonLabel}>סיכומים</ThemedText>

          </View>
          <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
                      <Image style={styles.buttonImage} source={require('@/assets/images/RankIcon.png')}/>
          </TouchableOpacity>
                    <ThemedText style={styles.buttonLabel}>דרגות</ThemedText>

          </View>
        </View>
        <View style={styles.content}>
          <Image
            source={require('@/assets/images/LogoIcon.png')}
            style={styles.logo}
          />
          </View>
      </ThemedView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '95%',
      margin: 'auto'
    },
    header: {
      padding: 10,
      paddingTop: 50,
      color: '#006837',
      fontFamily: 'GevertLevin-Regular',
      fontSize: 60,
      fontWeight: 'bold',
      alignItems: 'center'
    },
    subtitle: {
      paddingBottom: 20,
      color: '#006837',
      fontFamily: 'GevertLevin-Regular',
      fontSize: 22,
      alignItems: 'center',
      fontWeight: 'light'
    },
    buttons: {
      paddingBottom: 20,
      color: '#006837',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: 'white',
      borderColor: '#006837',
      borderWidth: 2,
      width: 70,
      height: 70,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    largeButton: {
      backgroundColor: 'white',
      borderColor: '#006837',
      borderWidth: 2,
      width: 175,
      height: 60,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      alignItems: 'center', 
      width: 70,           
    },
    buttonText: {
      color: '#006837',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonImage: {
      width: 55,
      height: 55,
      resizeMode: 'contain', 
    },
    buttonLabel: { 
      color: '#006837',
      marginTop: 8,
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logo: {
      width: 400,
      height: 400,
      resizeMode: 'contain',
      marginBottom: 20,
    },
  });