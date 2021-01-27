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
export const toHumanReadableDate = (unix: number) => {
  const date = moment.unix(unix);
  return date.utc().fromNow();
};

/**
 * Orders stories by descending posted at times
 *
 * @param {Array<IStory>} stories
 * @returns
 */
export const orderByDesc = (stories: Array<IStory>) => {
  return stories.sort((s1: IStory, s2: IStory) => s2.time - s1.time);
};
