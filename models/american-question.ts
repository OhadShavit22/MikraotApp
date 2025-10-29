import AmericanQuestionAnswer from "./american-question-answer";

export default class AmericanQuestion {
    question: string;
    answers: AmericanQuestionAnswer[];

    constructor(question: string, answers: AmericanQuestionAnswer[]) {
    this.question = question;
    this.answers = answers;
  }

} 