import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AmericanQuestion from "@/models/american-question";
import AmericanQuestionAnswer from "@/models/american-question-answer";
import OrderingQuestion from "@/models/ordering-question";
import OrderingQuestionAnswer from "@/models/ordering-question-answer";
import { useTestSettingsStore } from "@/store/test-settings-store";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import AmericanQuestionComponent from "./components/AmericanQuestionComponent";
import OrderingQuestionComponent from "./components/OrderingQuestionComponent";
import OrderingQuestionResultComponent from "./components/OrderingQuestionResultComponent";
import TestSummaryComponent from "./components/TestSummaryComponent";
import { getTestQuestions } from "./services/testService";
import { styles } from "./styles/testStyles";

export default function TestPage() {
    const testSettings = useTestSettingsStore((state) => state.testSettings);
    const [questions, setQuestions] = React.useState<(AmericanQuestion | OrderingQuestion)[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState<(AmericanQuestionAnswer | OrderingQuestionAnswer | null)[]>([]);
    const [isAnswered, setIsAnswered] = React.useState(false);
    const [isTestFinished, setIsTestFinished] = React.useState(false);

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

    const handleAnswerPress = (answer: AmericanQuestionAnswer | OrderingQuestionAnswer) => {
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

    const isAnswerCorrect = (answer: AmericanQuestionAnswer | OrderingQuestionAnswer | null) => {
        if (answer instanceof AmericanQuestionAnswer) {
            return answer.isCorrect;
        }
        if (answer instanceof OrderingQuestionAnswer) {
            for (let index = 0; index < answer.order.length; index++) {
                if (answer.order[index].correctIndex !== index)
                    return false;
            }
            return true;
        }
        return false;
    }

    const getAnswerStyle = (answer: AmericanQuestionAnswer) => {
        const selectedAnswer = userAnswers[currentQuestionIndex];
        if (selectedAnswer instanceof AmericanQuestionAnswer) {
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
        }
    };

    if (questions.length === 0) {
        return <ThemedView style={styles.container}><ThemedText>טוען שאלות...</ThemedText></ThemedView>;
    }

    if (isTestFinished) {
        return <TestSummaryComponent userAnswers={userAnswers} questions={questions} onGoToLanding={handleGoToLanding} isAnswerCorrect={isAnswerCorrect} />;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const showAnswerDetails = isAnswered && testSettings.displayAnswer === "AFTER_EACH";
    const selectedAnswer = userAnswers[currentQuestionIndex];

    const TestContent = () => (
        <>
            <TouchableOpacity onPress={handleSafeBack} style={styles.backButton}>
                <ThemedText style={styles.backButtonText}>→ חזור</ThemedText>
            </TouchableOpacity>
            <View style={styles.header}>
                <ThemedText style={styles.questionCounter}>{`שאלה ${currentQuestionIndex + 1}/${questions.length}`}</ThemedText>
                <ThemedText style={styles.questionText}>{currentQuestion.question}</ThemedText>
            </View>

            <View style={styles.answersContainer}>
                {currentQuestion instanceof AmericanQuestion && (
                    <AmericanQuestionComponent
                        question={currentQuestion}
                        onAnswer={handleAnswerPress}
                        isAnswered={isAnswered}
                        getAnswerStyle={getAnswerStyle}
                        showAnswerDetails={showAnswerDetails}
                    />
                )}
                {currentQuestion instanceof OrderingQuestion && !isAnswered && (
                    <OrderingQuestionComponent
                        question={currentQuestion}
                        key={currentQuestion.question}
                        onAnswer={handleAnswerPress}
                        isAnswered={false}
                        hasBeenAnswered={!!selectedAnswer}
                        userAnswer={selectedAnswer as OrderingQuestionAnswer | null}
                    />
                )}
                {currentQuestion instanceof OrderingQuestion && isAnswered && selectedAnswer instanceof OrderingQuestionAnswer && (
                    <OrderingQuestionResultComponent
                        userAnswer={selectedAnswer}
                        question={currentQuestion}
                    />
                )}
            </View>

            <View style={styles.nextButtonContainer}>
                {(isAnswered || (testSettings.displayAnswer !== "AFTER_EACH" && selectedAnswer)) && (
                    <Button style={styles.nextButton} onPress={handleNextQuestion}>
                        <ThemedText style={styles.nextButtonText}>
                            {currentQuestionIndex === questions.length - 1 ? 'סיים מבחן' : 'לשאלה הבאה'}
                        </ThemedText>
                    </Button>
                )}
            </View>
        </>
    )

    return (
        <ThemedView style={styles.container}>
            <StatusBar style="dark" />
            {currentQuestion instanceof OrderingQuestion ?
                <View style={styles.scrollContainer}>
                    <TestContent />
                </View>
                :
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TestContent />
                </ScrollView>}
        </ThemedView>
    )
}