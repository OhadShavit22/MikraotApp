import AmericanQuestion from "./american-question";

export default class TestStatus {
    questions: AmericanQuestion[];
    currentQuestionIndex: number;

    constructor(questions: AmericanQuestion[], currentQuestionIndex: number) {
        this.questions = questions;
        this.currentQuestionIndex = currentQuestionIndex;
    }

}