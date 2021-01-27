import React from "react";
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
 * Story component - displaying a single story
 * @param story The individual story to be rendered
 */
const Story = ({ story }: { story: IStory }) => {
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
