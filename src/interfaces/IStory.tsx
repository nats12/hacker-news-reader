export interface IStory {
  by: string;
  descendants: number;
  id: number;
  kids: Array<number>;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  deleted?: boolean;
  dead?: boolean;
  length: number;
}
