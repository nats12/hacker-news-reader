import config from "../config";

/**
 * Fetches all new stories from the Hacker News Api
 *
 * @returns response
 */
export const fetchNewStories = async () => {
  const endpoint = `${config.endpoint}/newstories.${config.endpoint_suffix}`;

  const response = await fetch(endpoint);

  return response;
};

/**
 * Fetches a single item from the Hacker News Api using its id
 *
 * @param {number} itemId
 * @returns response
 */
export const fetchItem = async (itemId: number) => {
  const endpoint = `${config.endpoint}/item/${itemId}.${config.endpoint_suffix}`;

  const response = await fetch(endpoint);

  return response;
};
