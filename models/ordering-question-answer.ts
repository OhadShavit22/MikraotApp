import OrderingQuestionStatement from "./ordering-question-statement";

export default class OrderingQuestionAnswer {
    order: OrderingQuestionStatement[];

    constructor(order: OrderingQuestionStatement[]) {
    this.order = order;
  }

} 