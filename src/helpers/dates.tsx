import moment from "moment";
import { IStory } from "../interfaces/IStory";

/**
 * Converts unix timestamp into a human readable format
 * Returns the difference between the time now and the human readable date
 *
 * @param {number} unix
 * @returns difference in number of days/hours/minutes/seconds from the time now
 * and the time that the story was posted
 */
export const toHumanReadableDate: Function = (unix: number): string => {
  const date = moment.unix(unix);
  return date.utc().fromNow();
};

/**
 * orderByDesc
 *
 * Orders stories in descending order by the time they were posted.
 *
 * @param {Array<IStory>} stories
 * @returns {Array<IStory>} An array of sorted stories.
 */
export const orderByDesc: Function = (
  stories: Array<IStory>
): Array<IStory> => {
  return stories.sort((s1: IStory, s2: IStory) => s2.time - s1.time);
};
