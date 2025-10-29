import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = 'light'; //useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="landing" />
        <Stack.Screen name="tests/test-settings" />
        <Stack.Screen name="tests/test" />
      </Stack>
    </ThemeProvider>
  );
}
