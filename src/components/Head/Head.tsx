import { useNavigate } from "react-router-dom";
import "./Head.scss";

const Head: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="head" onClick={() => navigate("/")}>
      <img src="logo.png" alt="logo" className="head--img" />
      <h1 className="head--title">NASA Browser</h1>
    </div>
  );
};

export default Head;
