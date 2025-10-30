import OrderingQuestionStatement from "./ordering-question-statement";

export default class OrderingQuestion {
    question: string;
    statements: OrderingQuestionStatement[];

    constructor(question: string, statements: OrderingQuestionStatement[]) {
    this.question = question;
    this.statements = statements;
  }

} 