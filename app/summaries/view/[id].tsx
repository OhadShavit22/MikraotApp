import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Chapter, getTopics } from '../data';

export default function ChapterPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [topicId, chapterId] = id ? id.split('-') : [null, null];
  
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topicId && chapterId) {
      getTopics().then((topics) => {
        const topic = topics.find((t) => t.id === topicId);
        const foundChapter = topic?.chapters.find((c) => c.id === chapterId);
        setChapter(foundChapter || null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

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
        lineHeight: 30,
        direction: 'rtl',
        width: '100%',
        paddingHorizontal: 5,
    },
    heading3: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
        marginTop: 10,
        direction: 'rtl',
        width: '100%',
        paddingHorizontal: 5,
        lineHeight: 30,
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
