export default class TestSettings {
    questionsCount: string;
    questionTopics: string[];
    displayAnswer: string;

    constructor(questionsCount: string, questionTopics: string[], displayAnswer: string) {
    this.questionsCount = questionsCount;
    this.questionTopics = questionTopics;
    this.displayAnswer = displayAnswer;
  }
}