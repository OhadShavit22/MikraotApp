import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AmericanQuestion from "@/models/american-question";
import AmericanQuestionAnswer from "@/models/american-question-answer";
import TestSettings from "@/models/test-settings";
import { useTestSettingsStore } from "@/store/test-settings-store";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

const { width } = Dimensions.get('window');

const getTestQuestions = (testSettings: TestSettings) => {
    // make backend request
    return [
        new AmericanQuestion(
            "מהי בירת ישראל?",
            [
                new AmericanQuestionAnswer("תל אביב", "תל אביב היא מרכז כלכלי ותרבותי חשוב, אך אינה הבירה.", false),
                new AmericanQuestionAnswer("ירושלים", "ירושלים היא בירת ישראל והעיר הגדולה ביותר.", true),
                new AmericanQuestionAnswer("חיפה", "חיפה היא עיר נמל מרכזית בצפון הארץ.", false),
                new AmericanQuestionAnswer("באר שבע", "באר שבע היא העיר הגדולה בנגב.", false)
            ]
        ),
        new AmericanQuestion(
            "באיזו שנה הוכרזה מדינת ישראל?",
            [
                new AmericanQuestionAnswer("1947", "בשנה זו התקבלה תוכנית החלוקה באו\"ם.", false), // Note: This " is correctly escaped for the string literal
                new AmericanQuestionAnswer("1956", "בשנה זו היה מבצע קדש.", false),
                new AmericanQuestionAnswer("1948", "מדינת ישראל הוכרזה בה' באייר תש\"ח, 14 במאי 1948.", true), // Note: This " is correctly escaped for the string literal
                new AmericanQuestionAnswer("1967", "בשנה זו פרצה מלחמת ששת הימים.", false)
            ]
        ),
        new AmericanQuestion(
            "מהו המקום הנמוך ביותר בעולם?",
            [
                new AmericanQuestionAnswer("ים המלח", "ים המלח הוא המקום הנמוך ביותר ביבשה.", true),
                new AmericanQuestionAnswer("הכנרת", "הכנרת היא אגם המים המתוקים הנמוך ביותר בעולם, אך ים המלח נמוך יותר.", false),
                new AmericanQuestionAnswer("מאריאנה טרנץ'", "זהו המקום העמוק ביותר באוקיינוס, לא הנמוך ביותר ביבשה.", false),
                new AmericanQuestionAnswer("עמק המוות", "עמק המוות הוא מקום נמוך מאוד, אך לא כמו ים המלח.", false)
            ]
        ),
    ]
}

export default function TestPage() {
    const testSettings = useTestSettingsStore((state) => state.testSettings);
    const [questions, setQuestions] = React.useState<AmericanQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState<(AmericanQuestionAnswer | null)[]>([]);
    const [isAnswered, setIsAnswered] = React.useState(false);
    const [isTestFinished, setIsTestFinished] = React.useState(false);
    const [showAnswers, setShowAnswers] = React.useState(false);

    React.useEffect(() => {
        const testQuestions = getTestQuestions(testSettings);
        setQuestions(testQuestions);
        setUserAnswers(new Array(testQuestions.length).fill(null));
    }, [testSettings]);

    const handleSafeBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/landing');
        }
    };

    const handleGoToLanding = () => {
        router.replace('/landing');
    };

    const handleAnswerPress = (answer: AmericanQuestionAnswer) => {
        if (isAnswered) return;
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
        if (testSettings.displayAnswer === "AFTER_EACH") {
            setIsAnswered(true);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswered(false);
        } else {
            setIsTestFinished(true);
        }
    };

    const getAnswerStyle = (answer: AmericanQuestionAnswer) => {
        const selectedAnswer = userAnswers[currentQuestionIndex];
        if (!isAnswered) {
            return answer.answer === selectedAnswer?.answer ? styles.selectedAnswer : styles.answerButton;
        }
        if (answer.isCorrect) {
            return styles.correctAnswer;
        }
        if (answer.answer === selectedAnswer?.answer) {
            return styles.incorrectAnswer;
        }
        return styles.answerButton;
    };

    if (questions.length === 0) {
        return <ThemedView style={styles.container}><ThemedText>טוען שאלות...</ThemedText></ThemedView>;
    }

    if (isTestFinished) {
        const correctAnswersCount = userAnswers.filter(answer => answer?.isCorrect).length;
        const totalQuestions = questions.length;
        const percentage = Math.round((correctAnswersCount / totalQuestions) * 100);

        return (
            <ThemedView style={styles.container}>
                <StatusBar style="dark" />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.summaryHeader}>
                        <ThemedText style={styles.summaryTitle}>תוצאות המבחן</ThemedText>
                        <ThemedText style={styles.scoreText}>
                            {`הצלחת ב-${correctAnswersCount} מתוך ${totalQuestions} שאלות`}
                        </ThemedText>
                        <ThemedText style={styles.percentageText}>{`ציון: ${percentage}`}</ThemedText>
                    </View>

                    <TouchableOpacity onPress={() => setShowAnswers(!showAnswers)} style={styles.toggleAnswersButton}>
                        <ThemedText style={styles.toggleAnswersButtonText}>
                            {showAnswers ? 'הסתר תשובות' : 'הצג תשובות מפורטות'}
                        </ThemedText>
                    </TouchableOpacity>

                    {showAnswers && (
                        <View>
                            {questions.map((question, index) => (
                                <View key={index} style={styles.summaryQuestionContainer}>
                                    <ThemedText style={styles.questionText}>{ `${index + 1}. ${question.question}`}</ThemedText>
                                    {question.answers.map(answer => {
                                        const isSelected = userAnswers[index]?.answer === answer.answer;
                                        const style = answer.isCorrect ? styles.correctAnswer : (isSelected ? styles.incorrectAnswer : styles.answerButton);
                                        return (
                                            <View key={answer.answer} style={[styles.answerButton, style, styles.summaryAnswer]}>
                                                <ThemedText style={styles.answerText}>{answer.answer}</ThemedText>
                                                <ThemedText style={styles.detailText}>{answer.description}</ThemedText>
                                            </View>
                                        );
                                    })}
                                </View>
                            ))}
                        </View>
                    )}
                    
                    <View style={styles.nextButtonContainer}>
                        <Button style={styles.nextButton} onPress={handleGoToLanding}>
                            <ThemedText style={styles.nextButtonText}>חזרה</ThemedText>
                        </Button>
                    </View>
                </ScrollView>
            </ThemedView>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const showAnswerDetails = isAnswered && testSettings.displayAnswer === "AFTER_EACH";
    const selectedAnswer = userAnswers[currentQuestionIndex];

    return (
        <ThemedView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={handleSafeBack} style={styles.backButton}>
                    <ThemedText style={styles.backButtonText}>→ חזור</ThemedText>
                </TouchableOpacity>
                <View style={styles.header}>
                    <ThemedText style={styles.questionCounter}>{`שאלה ${currentQuestionIndex + 1}/${questions.length}`}</ThemedText>
                    <ThemedText style={styles.questionText}>{currentQuestion.question}</ThemedText>
                </View>

                <View style={styles.answersContainer}>
                    {currentQuestion.answers.map((answer) => (
                        <TouchableOpacity
                            key={answer.answer}
                            style={[styles.answerButton, getAnswerStyle(answer)]}
                            onPress={() => handleAnswerPress(answer)}
                            disabled={isAnswered}
                        >
                            <ThemedText style={styles.answerText}>{answer.answer}</ThemedText>
                            {showAnswerDetails && (
                                <ThemedText style={styles.detailText}>
                                    {answer.description}
                                </ThemedText>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {(isAnswered || testSettings.displayAnswer !== "AFTER_EACH") && selectedAnswer && (
                    <View style={styles.nextButtonContainer}>
                        <Button style={styles.nextButton} onPress={handleNextQuestion}>
                            <ThemedText style={styles.nextButtonText}>
                                {currentQuestionIndex === questions.length - 1 ? 'סיים מבחן' : 'לשאלה הבאה'}
                            </ThemedText>
                        </Button>
                    </View>
                )}
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    scrollContainer: { flexGrow: 1, padding: width * 0.05, justifyContent: 'flex-start' },
    backButton: { position: 'absolute', top: '6%', right: '5%', zIndex: 1, paddingTop: 10 },
    backButtonText: { fontSize: 18, color: '#006837' },
    header: { alignItems: 'center', marginVertical: '10%', paddingTop: '10%' },
    questionCounter: { fontSize: 20, color: 'gray', marginBottom: 10 },
    questionText: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333', lineHeight: 32 },
    answersContainer: { marginVertical: 20 },
    answerButton: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    selectedAnswer: { borderColor: '#006837', borderWidth: 2 },
    correctAnswer: { backgroundColor: '#d4edda', borderColor: '#c3e6cb' },
    incorrectAnswer: { backgroundColor: '#f8d7da', borderColor: '#f5c6cb' },
    answerText: { fontSize: 18, color: '#333', fontWeight: 'bold', textAlign: 'center' },
    detailText: { fontSize: 12, color: '#555', marginTop: 8, textAlign: 'center', writingDirection: 'rtl' },
    nextButtonContainer: { alignItems: 'center', marginTop: 'auto', paddingTop: 20 },
    nextButton: { backgroundColor: '#006837', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, width: '70%' },
    nextButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    summaryHeader: { alignItems: 'center', marginVertical: '10%', paddingTop: '10%' },
    summaryTitle: { fontSize: 32, fontWeight: 'bold', color: '#333', lineHeight: 35 },
    scoreText: { fontSize: 22, color: 'gray', marginVertical: 10, lineHeight: 22 },
    percentageText: { fontSize: 26, fontWeight: 'bold', color: '#006837', lineHeight: 28 },
    summaryQuestionContainer: { marginVertical: 20 },
    summaryAnswer: { padding: 15, marginVertical: 5 },
    toggleAnswersButton: {
        marginVertical: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#e7e7e7',
        alignItems: 'center',
    },
    toggleAnswersButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    }
});
