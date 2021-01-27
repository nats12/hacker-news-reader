import React, { useCallback, useEffect, useRef } from "react";
import Story from "./Story";
import * as APIHelper from "../helpers/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { IStory } from "../interfaces/IStory";
import InfoHeading from "./headings/InfoHeading";
import { colours } from "../theme/colours";

/**
 *
 *
 * @returns
 */
const StoriesList = () => {
  const [stories, setStories] = React.useState<any>([]);
  const [fetchedIndex, setFetchedIndex] = React.useState<number>(0);
  const [isFetchingItems, setIsFetchingItems] = React.useState<boolean>(false);
  const storyIds = useRef([]);

  const allStories =
    stories &&
    stories.map((story: IStory) => <Story key={story.id} story={story} />);

  /**
   * Checks a story to see if its valid.
   * Conditions: the type is 'story', it has a url, it isn't dead or deleted.
   *
   * @param {IStory} story
   * @returns {boolean} true or false depending on whether it is valid or not
   */
  const storyIsValid = (story: IStory) => {
    return story.type === "story" && !story.deleted && !story.dead && story.url;
  };

  /**
   * GetMoreStories
   * Fetches 20 stories at a time from the last story it fetched
   * Checks that it is a valid story (not dead, deleted, has a url and is of type story)
   * Updates local state with valid
   */
  const getMoreStories = useCallback(() => {
    if (!isFetchingItems && fetchedIndex <= 480) {
      setIsFetchingItems(true);

      storyIds.current
        .slice(fetchedIndex, fetchedIndex + 20)
        .forEach((id: number) => {
          try {
            APIHelper.fetchItem(id)
              .then((response: any) => {
                return response.json();
              })
              .then((story: any) => {
                if (storyIsValid(story)) {
                  setStories((str: any) => str.concat(story));
                }
              })
              .catch((err: any) => {
                throw err;
              });
          } catch (err) {
            return <InfoHeading colour={colours.orange}>API Error</InfoHeading>;
          }
        });
    }

    setFetchedIndex((index) => index + 20);
    setIsFetchingItems(false);
  }, [fetchedIndex, isFetchingItems]);

  useEffect(() => {
    const fetchNewStories = async () => {
      try {
        APIHelper.fetchNewStories()
          .then((response: any) => {
            return response.json();
          })
          .then((newStoriesIds: any) => {
            storyIds.current = newStoriesIds;
            getMoreStories();
          })
          .catch((err: any) => {
            throw err;
          });
      } catch (err) {
        return <InfoHeading colour={colours.orange}>API Error</InfoHeading>;
      }
    };

    fetchNewStories();
    setFetchedIndex(0);
  }, []);

  if (!storyIds) {
    return <InfoHeading colour={colours.orange}>API Error</InfoHeading>;
  }

  if (stories.length === 0) {
    return (
      <InfoHeading colour={"black"} data-test="component-loading">
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
        loader={
          <h4 style={{ backgroundColor: "red" }}>Loading more stories...</h4>
        }
        endMessage={<p>No more stories, you have seen it all.</p>}
      >
        {allStories}
      </InfiniteScroll>
    </div>
  );
};

export default StoriesList;
