import { ThemedText } from "@/components/themed-text";
import AmericanQuestion from "@/models/american-question";
import AmericanQuestionAnswer from "@/models/american-question-answer";
import * as React from 'react';
import { TouchableOpacity } from "react-native";
import { styles } from "../styles/testStyles";

const AmericanQuestionComponent = ({ question, onAnswer, isAnswered, getAnswerStyle, showAnswerDetails }: { question: AmericanQuestion, onAnswer: (answer: AmericanQuestionAnswer) => void, isAnswered: boolean, getAnswerStyle: (answer: AmericanQuestionAnswer) => any, showAnswerDetails: boolean }) => {
    return (
        <>
            {question.answers.map((answer) => (
                <TouchableOpacity
                    key={answer.answer}
                    style={[styles.answerButton, getAnswerStyle(answer)]}
                    onPress={() => onAnswer(answer)}
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
        </>
    );
};

export default AmericanQuestionComponent;