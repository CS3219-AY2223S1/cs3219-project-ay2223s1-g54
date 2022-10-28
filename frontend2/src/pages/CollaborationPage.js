import { ReactSplitViews } from "react-split-views";
import CodeEditor from "../components/CodeEditor";
import QuestionPane from "../components/QuestionPane";
import BaseLayout from "../components/layouts/BaseLayout";

const CollaborationPage = () => {
  return (
    <BaseLayout>
      <ReactSplitViews direction="horizontal" sizes={[50, 50]}>
        <QuestionPane />
        <CodeEditor />
      </ReactSplitViews>
    </BaseLayout>
  );
};

export default CollaborationPage;
