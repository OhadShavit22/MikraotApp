import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import TestSettings from "@/models/test-settings";
import { useTestSettingsStore } from "@/store/test-settings-store";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useState } from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from 'react-native-paper';
import Toast, { ErrorToast } from 'react-native-toast-message';
const { width } = Dimensions.get('window');

const QUESTION_NUMBER_OPTIONS = [
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "ALL", label: "עד שנגמרות השאלות!" },
];

const DISPLAY_ANSWER_OPTIONS = [
    { value: "AFTER_EACH", label: "אחרי כל שאלה" },
    { value: "AT_THE_END", label: "רק בסוף המבחן!" },
];

const TOPIC_OPTIONS = [
    { value: "ID", label: "ישראל: תעודת זהות" },
    { value: "PSIFAS", label: "הפסיפס הישראלי" },
    { value: "TOLDOT", label: "תולדות עם ישראל" },
    { value: "HOLOCAST", label: "בימי השואה" },
    { value: "INDEPENDENCE", label: "בדרך לעצמאות" },
    { value: "STORY", label: "סיפורה של מדינה" },
    { value: "SECURITY", label: "ביטחון ישראל" },
    { value: "INVESTIGATION", label: "תחקיר" },
    { value: "AID", label: "עזרה ראשונה" },
    { value: "TOPOGRAPHY", label: "טופוגרפיה" },
    { value: "RADIO", label: "קשר" },
    { value: "WEAPONS", label: "נשק" },
];

const allTopicValues = TOPIC_OPTIONS.map(t => t.value);

export default function TestSettingsPage() {

    const [fontsLoaded, fontError] = useFonts({
        'GevertLevin-Regular': require('./../../assets/fonts/GevertLevin-Regular.ttf'),
    });

    const [questionNumberValue, setQuestionNumberValue] = useState("25");
    const [questionTopicsValue, setQuestionTopicsValue] = useState<string[]>([]);
    const [displayAnswerValue, setDisplayAnswerValue] = useState("AFTER_EACH");

    const setTestSettings = useTestSettingsStore((state) => state.setTestSettings)

    const handleQuestionTopicToggleSwitch = (toggleTopic: string) => {
        if (questionTopicsValue.includes(toggleTopic)) {
            setQuestionTopicsValue(questionTopicsValue.filter(v => v !== toggleTopic));
        } else {
            setQuestionTopicsValue([...questionTopicsValue, toggleTopic]);
        }
    };

    const handleSelectAllTopics = () => {
        if (questionTopicsValue.length === allTopicValues.length) {
            setQuestionTopicsValue([]);
        } else {
            setQuestionTopicsValue(allTopicValues);
        }
    }

    const areAllTopicsSelected = questionTopicsValue.length === allTopicValues.length;

    const handleSubmitPress = () => {
        if (questionTopicsValue.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'לא בחרת נושאים!',
                position: "bottom",
                });
        } else {
            setTestSettings(new TestSettings(questionNumberValue, questionTopicsValue, displayAnswerValue));
            router.push('/tests/test');
        }
    }

    const handleSafeBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/landing');
        }
    };

    return (
        <ThemedView style={styles.container} lightColor='#f5f5f5'>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={handleSafeBack} style={styles.backButton}>
                    <ThemedText style={styles.backButtonText}>→ חזור</ThemedText>
                </TouchableOpacity>
                <View style={styles.header}>
                </View>
                <View style={styles.sectionContainer}>
                    <ThemedText style={styles.subtitle} type='subtitle'>כמה שאלות?</ThemedText>
                    <View style={styles.optionsContainer}>
                        {QUESTION_NUMBER_OPTIONS.map(option => (
                            <TouchableOpacity
                                key={option.value}
                                style={[styles.optionButton, questionNumberValue === option.value && styles.selectedOption]}
                                onPress={() => setQuestionNumberValue(option.value)}>
                                <ThemedText style={[styles.optionText, questionNumberValue === option.value && styles.selectedOptionText]}>{option.label}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={styles.topicsHeader}>
                        <ThemedText style={styles.subtitle} type='subtitle'>באיזה נושאים?</ThemedText>
                        <TouchableOpacity
                            onPress={handleSelectAllTopics}
                            style={[styles.selectAllButton, areAllTopicsSelected && styles.selectedOption]}
                        >
                            <ThemedText style={[styles.optionText, areAllTopicsSelected && styles.selectedOptionText]}>כל הנושאים</ThemedText>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topicsContainer}>
                        {TOPIC_OPTIONS.map((topic) => (
                            <TouchableOpacity
                                key={topic.value}
                                style={[styles.topicButton, questionTopicsValue.includes(topic.value) && styles.selectedOption]}
                                onPress={() => handleQuestionTopicToggleSwitch(topic.value)}
                            >
                                <ThemedText style={[styles.optionText, questionTopicsValue.includes(topic.value) && styles.selectedOptionText]}>{topic.label}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.sectionContainer}>
                    <ThemedText style={styles.subtitle} type='subtitle'>מתי להראות את התשובה הנכונה?</ThemedText>
                    <View style={styles.optionsContainer}>
                        {DISPLAY_ANSWER_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.optionButton,
                                    { flex: 1 },
                                    displayAnswerValue === option.value && styles.selectedOption
                                ]}
                                onPress={() => setDisplayAnswerValue(option.value)}
                            >
                                <ThemedText style={[styles.optionText, displayAnswerValue === option.value && styles.selectedOptionText]}>{option.label}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.submitButtonContainer}>
                    <Button style={styles.submitButton} onPress={handleSubmitPress}>
                        <ThemedText style={styles.submitButtonText}>אפשר להתחיל!</ThemedText>
                    </Button>
                </View>
            </ScrollView>
            <Toast config={{
                    error: (props) => (
                            <ErrorToast
                                    {...props}
                                    style={styles.toast}
                                    text1Style={styles.toastText}
                            />
                        )
                    }}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { flexGrow: 1, padding: width * 0.05, justifyContent: 'flex-start' },
    backButton: { position: 'absolute', top: '6%', right: '5%', zIndex: 1, paddingTop: 10 },
    backButtonText: { fontSize: 18, color: Colors.light.text },
    header: { alignItems: 'center', marginVertical: '7%', paddingTop: '10%' },
    title: {
      color: Colors.light.text,
      fontFamily: 'GevertLevin-Regular',
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: 50,
      padding: '3%'
    },
    sectionContainer: {
        marginBottom: 20,
    },
    subtitle: {
        color: Colors.light.text,
        fontFamily: 'GevertLevin-Regular',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right',
        lineHeight: 25,
        padding: '2%',
        marginBottom: '2%'
    },
    optionsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 8,
    },
    optionButton: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.light.text,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        color: Colors.light.text,
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    selectedOption: {
        backgroundColor: Colors.light.text,
        borderColor: Colors.light.text,
    },
    selectedOptionText: { color: 'white' },
    topicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 8,
    },
    topicsHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 12,
        gap: 16,
    },
    topicButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.light.text,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        flexBasis: '40%', // Allows for 2 columns with gap
    },
    selectAllButton: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.light.text,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    submitButtonContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 20,
    },
    submitButton: {
        width: '70%',
        backgroundColor: Colors.light.text,
        borderRadius: 25,
        paddingVertical: 6,
    },
    submitButtonText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        direction: 'rtl',
        writingDirection: 'rtl'
    },
    toast: {
        width: '90%',
        height: 80,
        direction: 'rtl',
    },
    toastText: {
        fontSize: 18,
        direction: 'rtl',
        writingDirection: 'rtl',
    }
})
