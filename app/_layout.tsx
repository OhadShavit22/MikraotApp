import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = 'light'; //useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'GevertLevin-Regular': require('../assets/fonts/GevertLevin-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="landing" />
            <Stack.Screen name="tests/test-settings" />
            <Stack.Screen name="tests/test" />
        </Stack>
        </ThemeProvider>
    </PaperProvider>
  );
}
