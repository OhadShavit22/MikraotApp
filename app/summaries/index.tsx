import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getTopics, Topic } from './data';

export default function SummariesIndex() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopics().then((loadedTopics) => {
      setTopics(loadedTopics);
      setLoading(false);
    });
  }, []);

  const handleSafeBack = () => {
    if (router.canGoBack()) {
        router.back();
    } else {
        router.replace('/landing');
    }
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.light.text} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={handleSafeBack} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>→ חזור</ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.title}>פרקים</ThemedText>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/summaries/${item.id}`} asChild>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
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
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.light.text,
    fontFamily: 'GevertLevin-Regular',
    lineHeight: 30,
    paddingVertical: '20%'
    
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    textAlign: 'right',
  },
  backButton: { position: 'absolute', top: '6%', right: '5%', zIndex: 1, paddingTop: 10 },
  backButtonText: { fontSize: 18, color: Colors.light.text },
});