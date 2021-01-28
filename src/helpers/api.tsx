import config from "../config";

/**
 * fetchNewStories
 *
 * Fetches the story ids of the latest 500 stories from the Hacker News API.
 *
 * @returns {object} response
 */
export const fetchNewStories = async () => {
  const endpoint = `${config.endpoint}/newstories.${config.endpoint_suffix}`;

  const response = await fetch(endpoint);

  return response;
};

/**
 * fetchItem
 *
 * Fetches an individual item from the Hacker News API.
 * An item could be of type: story, job, comment, poll or pollopt.
 *
 * @param {number} itemId The item's id.
 * @returns {object} response
 */
export const fetchItem = async (itemId: number) => {
  const endpoint = `${config.endpoint}/item/${itemId}.${config.endpoint_suffix}`;

  const response = await fetch(endpoint);

  return response;
};
