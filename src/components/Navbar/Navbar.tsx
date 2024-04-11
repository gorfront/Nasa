import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navbar = [
    {
      id: "0",
      title: "Astronomy Photo Of The Day",
      active: false,
    },
    {
      id: "1",
      title: "Nearby Asteroids",
      active: false,
    },
    {
      id: "2",
      title: "Submit New Planet",
      active: false,
    },
  ];
  const navigate = useNavigate();

  const handlerClick = (id: string) => {
    switch (id) {
      case "0":
        navigate("/photo_of_day");
        break;
      case "1":
        navigate("/nearby_asteroids");
        break;
      case "2":
        navigate("/new_planet");
        break;
      default:
        break;
    }
  };
  return (
    <ul className="navbar">
      {navbar.map((el) => (
        <li
          key={el.id}
          className="navbar--item"
          onClick={() => handlerClick(el.id)}
        >
          {/* {el.title} */}
          {t(`main.navbar.${el.title}`)}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
