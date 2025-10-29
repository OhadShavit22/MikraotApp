import { Rank } from "./rank";

export default class Player {
    uid: string;
    displayName: string;
    score: number;
    rank: Rank

    constructor(uid: string, displayName: string, score: number, rank: Rank) {
    this.uid = uid;
    this.displayName = displayName;
    this.score = score;
    this.rank = rank;
  }
}