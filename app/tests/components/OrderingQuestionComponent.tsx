import { ThemedText } from "@/components/themed-text";
import OrderingQuestion from "@/models/ordering-question";
import OrderingQuestionAnswer from "@/models/ordering-question-answer";
import OrderingQuestionStatement from "@/models/ordering-question-statement";
import * as React from 'react';
import { TouchableOpacity, View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { styles } from "../styles/testStyles";

const OrderingQuestionComponent = ({ question, onAnswer, isAnswered, hasBeenAnswered, userAnswer }: { question: OrderingQuestion, onAnswer: (answer: OrderingQuestionAnswer) => void, isAnswered: boolean, hasBeenAnswered: boolean, userAnswer: OrderingQuestionAnswer | null }) => {
    const [statements, setStatements] = React.useState<OrderingQuestionStatement[]>(
        userAnswer ? userAnswer.order : [...question.statements]
    );

    const handleLockAnswer = () => {
        onAnswer(new OrderingQuestionAnswer(statements));
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemedText style={styles.questionDescription}>כדי להזיז את המשפטים, לחצו לחיצה ארוכה</ThemedText>
            <DraggableFlatList
                data={statements}
                onDragEnd={({ data }) => setStatements(data)}
                keyExtractor={(item) => item.statement}
                renderItem={({ item, drag, isActive, getIndex }) => (
                    <ScaleDecorator>
                        <TouchableOpacity
                            onLongPress={drag}
                            disabled={isActive || isAnswered || hasBeenAnswered}
                            style={[
                                styles.answerButton,
                                isActive && styles.selectedAnswer,
                                isAnswered && (item.correctIndex === getIndex() ? styles.correctAnswer : styles.incorrectAnswer),
                                hasBeenAnswered && styles.disabledAnswer
                            ]}>
                            <ThemedText style={styles.answerText}>{item.statement}</ThemedText>
                        </TouchableOpacity>
                    </ScaleDecorator>
                )}
            />
            {!isAnswered && !hasBeenAnswered && (
                <View style={styles.nextButtonContainer}>
                    <Button style={styles.nextButton} onPress={handleLockAnswer}>
                        <ThemedText style={styles.nextButtonText}>נעל תשובה</ThemedText>
                    </Button>
                </View>
            )}
        </GestureHandlerRootView>
    );
};

export default OrderingQuestionComponent;