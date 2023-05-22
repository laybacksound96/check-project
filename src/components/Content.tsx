import { ContentStyle } from "../Style/Dashboard";
import { IContent } from "../atoms";

interface Iprops {
  content: IContent;
}

const Content = ({ content }: Iprops) => {
  return content.frequency === 0 ? null : (
    <ContentStyle>
      {content.name} x {content.frequency}
    </ContentStyle>
  );
};

export default Content;
