import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Wrapper from "./wrapper/Wrapper";
import DayPhoto from "./components/DayPhoto/DayPhoto";
import Nearby from "./components/Nearby/Nearby";
import NewPlanet from "./components/NewPlanet/NewPlanet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route
            path="photo_of_day"
            element={
              <DayPhoto title={""} url={""} hdurl={""} explanation={""} />
            }
          />
          <Route
            path="nearby_asteroids"
            element={<Nearby id={""} title={""} />}
          />
          <Route path="new_planet" element={<NewPlanet />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
