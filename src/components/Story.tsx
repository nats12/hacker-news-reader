import React, { ReactElement } from "react";
import styled from "styled-components";
import { colours } from "../theme/colours";
import { devices } from "../theme/devices";
import { IStory } from "../interfaces/IStory";
import * as DatesHelper from "../helpers/dates";

const StoryRow = styled.div`
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  margin: 15px;
  padding: 15px;

  h2 {
    font-size: 1.2em;
  }

  a {
    text-decoration: none;
    color: ${colours.dark_grey};
    font-weight: lighter;

    &:hover {
      text-decoration: underline;
    }
    &:visited,
    &:active {
      text-decoration: none;
    }
  }

  small {
    color: ${colours.dark_grey};
  }

  @media ${devices.laptopL} {
    margin: 40px 200px;
  }
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * Story
 *
 * Displaying an individual story within a styled component
 *
 * @param {{ story: IStory }} { story }
 * @returns {ReactElement} StoryRow
 */
const Story: React.ElementType = ({
  story,
}: {
  story: IStory;
}): ReactElement => {
  return (
    <StoryRow>
      <StoryContainer>
        <a href={story.url} target="_blank" rel="noreferrer">
          <h2>{story.title}</h2>
        </a>
        <small>
          by {story.by}, {DatesHelper.toHumanReadableDate(story.time)}
        </small>
      </StoryContainer>
    </StoryRow>
  );
};

export default Story;
