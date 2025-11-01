
import { Stack } from 'expo-router';

export default function summariesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'סיכומים', headerShown: false }} />
      <Stack.Screen name="view/[id]" options={{ title: 'סיכום', headerShown: false}} />
      <Stack.Screen name="[topic]" options={{ title: 'נושא', headerShown: false}} />
    </Stack>
  );
}
