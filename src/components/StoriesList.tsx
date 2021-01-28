import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Story from "./Story";
import * as APIHelper from "../helpers/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { IStory } from "../interfaces/IStory";
import InfoHeading from "./headings/InfoHeading";
import { colours } from "../theme/colours";
import * as DatesHelper from "../helpers/dates";

/**
 * StoriesList
 *
 * Displays a list of stories as fetched from the Hacker News API.
 * Makes use of an infite scroller to display the stories, which are checked
 * against certain conditions to ensure their validity.
 *
 * @returns {ReactElement} div
 */
const StoriesList: React.ElementType = (): ReactElement => {
  const INCREMENT_INDEX_BY = 20;
  const MAX_FETCHED_INDEX_NUMBER = 480;

  const [stories, setStories] = useState<[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const storyIds = useRef<Array<number> | []>([]);
  const fetchedIndex = useRef<number>(0);
  const isFetchingItems = useRef<boolean>(false);

  const sortedByDesc: Array<IStory> = DatesHelper.orderByDesc(stories);

  const allStories: Array<ReactElement> =
    sortedByDesc &&
    sortedByDesc.map((story: IStory) => <Story key={story.id} story={story} />);

  /**
   * isAValidStory
   *
   * Checks a story against certain conditions to ensure it's valid.
   * Conditions: the type is 'story', it has a url, it isn't dead or deleted.
   *
   * @param {IStory} story
   * @returns {boolean} true or false depending on whether it is valid or not
   */
  const isAValidStory = (story: IStory): boolean => {
    return (
      story.type === "story" &&
      !story.deleted &&
      !story.dead &&
      story.url !== ""
    );
  };

  /**
   * getMoreStories
   *
   * Slices the amount of story ids previously fetched to fetch individual stories 20 at a time.
   * Checks for the validity of a story.
   * Adds story to state & updates the last fetched story (by index).
   */
  const getMoreStories = useCallback(async () => {
    if (
      isFetchingItems.current === false &&
      fetchedIndex.current <= MAX_FETCHED_INDEX_NUMBER
    ) {
      isFetchingItems.current = true;

      const sliced = storyIds.current.slice(
        fetchedIndex.current,
        fetchedIndex.current + INCREMENT_INDEX_BY
      );

      sliced.forEach(async (id: number) => {
        await APIHelper.fetchItem(id)
          .then((response: any) => {
            if (!response) {
              throw Error("API Error"); // catching any incorrect/broken API urls
            }
            return response.json();
          })
          .then((story: any) => {
            if (isAValidStory(story)) {
              setStories((str: any) => str.concat(story));
            }
          })
          .catch((err: any) => {
            console.warn("Error retrieving items from API.");
          });
      });
    }

    fetchedIndex.current = fetchedIndex.current + INCREMENT_INDEX_BY;
    isFetchingItems.current = false;
  }, [fetchedIndex, isFetchingItems]);

  useEffect(() => {
    /**
     * fetchNewStories
     *
     * Fetches up to 500 of the latest story ids.
     * Begins the process of getting individual stories for each of those ids.
     *
     */
    const fetchNewStories = async () => {
      isFetchingItems.current = true;
      await APIHelper.fetchNewStories()
        .then((response: any) => {
          if (!response) {
            throw new Error("API Error"); // catching any incorrect/broken API urls
          }
          return response.json();
        })
        .then((newStoriesIds: any) => {
          storyIds.current = newStoriesIds;
          isFetchingItems.current = false;
          getMoreStories();
        })
        .catch((err) => {
          console.warn("Error retrieving items from API.");
        });
    };

    if (!isFetchingItems.current) {
      fetchNewStories();
    }
  }, []);

  if (error) {
    return (
      <InfoHeading data-test="component-error" colour={colours.orange}>
        API Error
      </InfoHeading>
    );
  }

  if (!allStories.length) {
    return (
      <InfoHeading colour={"black"} data-test="component-stories-list">
        LOADING...
      </InfoHeading>
    );
  }

  return (
    <div data-test="component-stories-list">
      <InfiniteScroll
        dataLength={stories.length}
        next={getMoreStories}
        hasMore={stories[stories.length - 1] !== 1}
        loader={<InfoHeading>Loading...</InfoHeading>}
        endMessage={<p>No more stories, you have seen it all.</p>}
      >
        {allStories}
      </InfiniteScroll>
    </div>
  );
};

export default StoriesList;
