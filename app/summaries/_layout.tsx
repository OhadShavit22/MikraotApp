
import { Stack } from 'expo-router';

export default function TestsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'סיכומים' }} />
      <Stack.Screen name="[id]" options={{ title: 'סיכום' }} />
    </Stack>
  );
}
