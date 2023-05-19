import { useRecoilValue } from "recoil";
import { ContentStyle } from "../Style/Dashboard";
import { ContentsState, IContent } from "../atoms";
import { useEffect } from "react";

interface Iprops {
  content: IContent;
}

const Content = ({ content }: Iprops) => {
  return (
    <ContentStyle>
      {content.name} x {content.frequency}
    </ContentStyle>
  );
};

export default Content;
