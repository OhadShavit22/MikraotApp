export default class AmericanQuestionAnswer {
    answer: string;
    description: string;
    isCorrect: boolean

    constructor(answer: string, description: string, isCorrect: boolean) {
    this.answer = answer;
    this.description = description;
    this.isCorrect = isCorrect;
  }
}