import { ThemedText } from "@/components/themed-text";
import OrderingQuestion from "@/models/ordering-question";
import OrderingQuestionAnswer from "@/models/ordering-question-answer";
import * as React from 'react';
import { View } from "react-native";
import { styles } from "../styles/testStyles";

const OrderingQuestionResultComponent = ({ userAnswer, question }: { userAnswer: OrderingQuestionAnswer, question: OrderingQuestion }) => {
    return (
        <View>
            {userAnswer.order.map((statement, index) => (
                <View
                    key={statement.statement}
                    style={[
                        styles.answerButton,
                        statement.correctIndex === index ? styles.correctAnswer : styles.incorrectAnswer
                    ]}>
                    <ThemedText style={styles.answerText}>{statement.statement}</ThemedText>
                </View>
            ))}
        </View>
    );
};

export default OrderingQuestionResultComponent;