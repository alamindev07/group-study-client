
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | GroupStudyHub</title>
    </Helmet>
  );
};

export default PageTitle;
