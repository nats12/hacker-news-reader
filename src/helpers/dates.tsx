import moment from "moment";

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
