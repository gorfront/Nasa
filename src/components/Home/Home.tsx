import { useTranslation } from "react-i18next";
import "./Home.scss";

const Home: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="home">
      <h1 className="home--title">{t("main.title")}</h1>
    </div>
  );
};

export default Home;
