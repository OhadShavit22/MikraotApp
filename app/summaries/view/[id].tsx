import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { TOPICS } from '../data';

export default function ChapterPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [topicId, chapterId] = id ? id.split('-') : [null, null];
  
  const topic = TOPICS.find((t) => t.id === topicId);
  const chapter = topic?.chapters.find((c) => c.id === chapterId);

  const handleSafeBack = () => {
    if (router.canGoBack()) {
        router.back();
    } else {
        router.replace('/landing');
    }
  };

  if (!chapter) {
    return (
      <ThemedView style={styles.container}>
        <Text>Chapter not found.</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={handleSafeBack} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>→ חזור</ThemedText>
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.title}>{chapter.name}</Text>
        <Markdown style={markdownStyles}>{chapter.content}</Markdown>
      </ScrollView>
    </ThemedView>
  );
}

const markdownStyles = StyleSheet.create({
    heading1: {
        fontFamily: 'GevertLevin-Regular',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'right',
        direction: 'rtl',
        width: '100%',
        paddingHorizontal: 5,
        lineHeight: 30,
    },
    heading2: {
        fontFamily: 'GevertLevin-Regular',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
        marginTop: 10,
        direction: 'rtl',
        width: '100%',
        paddingHorizontal: 5,
    },
    heading3: {
        fontFamily: 'GevertLevin-Regular',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
        marginTop: 10,
        direction: 'rtl',
        width: '100%',
        paddingHorizontal: 5,
    },
    body: {
        fontSize: 18,
        textAlign: 'right',
        lineHeight: 30,
    },
    list_item: {
        fontSize: 18,
        lineHeight: 30,
        marginBottom: 5,
        flexDirection: 'row-reverse',
        width: '100%',
    },
    bullet_list_icon: {
        marginLeft: 10,
    },
    ordered_list_icon: {
        marginLeft: 10,
    },
    strong: {
        fontWeight: 'bold',
    }
});

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
    paddingTop: '25%',
    paddingBottom: '5%'
  },
  backButton: { position: 'absolute', top: '6%', right: '5%', zIndex: 1, paddingTop: 10 },
  backButtonText: { fontSize: 18, color: Colors.light.text },
});
