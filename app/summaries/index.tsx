
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const summaries = [
  {
    id: 'israel',
    title: 'ישראל: תעודת זהות',
  },
];

export default function SummariesPage() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={summaries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/summaries/${item.id}`} asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonLabel}>{item.title}</ThemedText>
            </TouchableOpacity>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
    textAlign: 'right',
  },
});
