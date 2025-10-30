import OrderingQuestionStatement from "./ordering-question-statement";

export default class OrderingQuestion {
    question: string;
    correctOrder: OrderingQuestionStatement[];

    constructor(question: string, correctOrder: OrderingQuestionStatement[]) {
    this.question = question;
    this.correctOrder = correctOrder;
  }

} 