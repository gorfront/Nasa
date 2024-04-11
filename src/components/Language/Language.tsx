import "./Language.scss";
import i18n from "../../18n";

const Language: React.FC = () => {
  const lang = [
    {
      id: "0",
      title: "en",
      active: true,
    },
    {
      id: "1",
      title: "ru",
      active: false,
    },
    {
      id: "2",
      title: "hy",
      active: false,
    },
  ];

  return (
    <ul className="lang">
      {lang.map((el) => (
        <li
          key={el.id}
          className="lang--item"
          onClick={() => {
            i18n.changeLanguage(el.title);
          }}
        >
          {el.title}
        </li>
      ))}
    </ul>
  );
};

export default Language;
