import { ContentStyle } from "../Style/Dashboard";
import { IContent } from "../page/Dashboard";

interface Iprops {
  content: IContent;
}

const Content = ({ content }: Iprops) => {
  console.log(content);
  return (
    <ContentStyle>
      {content.name} x{content.quantity}
    </ContentStyle>
  );
};

export default Content;
