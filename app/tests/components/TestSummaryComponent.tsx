import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AmericanQuestion from "@/models/american-question";
import AmericanQuestionAnswer from "@/models/american-question-answer";
import OrderingQuestion from "@/models/ordering-question";
import OrderingQuestionAnswer from "@/models/ordering-question-answer";
import { StatusBar } from "expo-status-bar";
import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../styles/testStyles";

const TestSummaryComponent = ({ userAnswers, questions, onGoToLanding, isAnswerCorrect }: { userAnswers: (AmericanQuestionAnswer | OrderingQuestionAnswer | null)[], questions: (AmericanQuestion | OrderingQuestion)[], onGoToLanding: () => void, isAnswerCorrect: (answer: AmericanQuestionAnswer | OrderingQuestionAnswer | null) => boolean }) => {
    const [showAnswers, setShowAnswers] = React.useState(false);
    const correctAnswersCount = userAnswers.filter(answer => isAnswerCorrect(answer)).length;
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
                                <ThemedText style={styles.questionText}>{`${index + 1}. ${question.question}`}</ThemedText>
                                {question instanceof AmericanQuestion && question.answers.map(answer => {
                                    const userAnswer = userAnswers[index] as AmericanQuestionAnswer;
                                    const isSelected = userAnswer.answer === answer.answer;
                                    const style = answer.isCorrect ? styles.correctAnswer : (isSelected ? styles.incorrectAnswer : styles.answerButton);
                                    return (
                                        <View key={answer.answer} style={[styles.answerButton, style, styles.summaryAnswer]}>
                                            <ThemedText style={styles.answerText}>{answer.answer}</ThemedText>
                                            <ThemedText style={styles.detailText}>{answer.description}</ThemedText>
                                        </View>
                                    );
                                })}
                                {question instanceof OrderingQuestion && (
                                    <View>
                                        <ThemedText style={styles.detailText}>התשובה שלך:</ThemedText>
                                        {(userAnswers[index] as OrderingQuestionAnswer)?.order?.map((statement, statementIndex) => (
                                            <View key={statementIndex} style={[styles.answerButton, styles.summaryAnswer, statement.correctIndex === statementIndex ? styles.correctAnswer : styles.incorrectAnswer]}>
                                                <ThemedText style={styles.answerText}>{`${statementIndex + 1}. ${statement.statement}`}</ThemedText>
                                            </View>
                                        ))}
                                        <ThemedText style={styles.detailText}>התשובה הנכונה:</ThemedText>
                                        {[...question.statements].sort((a, b) => a.correctIndex - b.correctIndex).map((statement, statementIndex) => (
                                            <View key={statementIndex} style={[styles.answerButton, styles.summaryAnswer, styles.correctAnswer]}>
                                                <ThemedText style={styles.answerText}>{`${statementIndex + 1}. ${statement.statement}`}</ThemedText>
                                                 <ThemedText style={styles.detailText}>{statement.description}</ThemedText>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.nextButtonContainer}>
                    <Button style={styles.nextButton} onPress={onGoToLanding}>
                        <ThemedText style={styles.nextButtonText}>חזרה</ThemedText>
                    </Button>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

export default TestSummaryComponent;