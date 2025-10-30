export default class OrderingQuestionStatement {
    statement: string;
    description: string;
    correctIndex: number;

    constructor(statement: string, description: string, correctIndex: number) {
    this.statement = statement;
    this.description = description;
    this.correctIndex = correctIndex;
  }
}