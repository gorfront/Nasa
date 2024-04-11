import { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./NewPlanet.scss";
import { useTranslation } from "react-i18next";

const NewPlanet = () => {
  const [planet, setPlanet] = useState("");
  const [galaxyName, setGalaxyName] = useState("");
  const [diameter, setDiameter] = useState("");
  const [distance, setDistance] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [planetValidation, setPlanetValidation] = useState("");
  const [galaxyNameValidation, setGalaxyNameValidation] = useState("");
  const [distanceValidation, setDistanceValidation] = useState("");
  const [nameValidation, setNameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const { t } = useTranslation();

  const GALAXY = [
    {
      id: "0",
      text: "Milki Way",
    },
    {
      id: "1",
      text: "Messier 83",
    },
    {
      id: "2",
      text: "Black Eye Galaxy",
    },
    {
      id: "3",
      text: "Pinwheel",
    },
    {
      id: "4",
      text: "Canis Major Dwarf",
    },
    {
      id: "5",
      text: "Somewere Else...",
    },
  ];

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (planet.trim().length === 0) {
      setPlanetValidation(`${t("main.submit.planetError1")}`);
    } else if (planet.length < 17 && planet.length > 0) {
      setPlanetValidation(`${t("main.submit.planetError2")}`);
    } else {
      setPlanetValidation("");
    }

    if (!galaxyName) {
      setGalaxyNameValidation(`${t("main.submit.galaxyNameError")}`);
    } else {
      setGalaxyNameValidation("");
    }

    if (!distance) {
      setDistanceValidation(`${t("main.submit.distanceError")}`);
    } else {
      setDistanceValidation("");
    }

    if (name.trim().length === 0) {
      setNameValidation(`${t("main.submit.nameError")}`);
    } else {
      setNameValidation("");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      setEmailValidation(`${t("main.submit.emailError")}`);
    } else {
      setEmailValidation("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newPlanet">
      <TextField
        label={`${t("main.submit.planet")}`}
        variant="outlined"
        value={planet}
        onChange={(e) => setPlanet(e.target.value)}
        fullWidth
      />
      {planetValidation && (
        <Typography variant="body1" component="p" color="error">
          {planetValidation}
        </Typography>
      )}
      <FormControl fullWidth>
        <InputLabel id="galaxy-name-label">
          {t("main.submit.galaxyName")}
        </InputLabel>
        <Select
          labelId="galaxy-name-label"
          value={galaxyName}
          onChange={(e) => setGalaxyName(e.target.value)}
          label={`${t("main.submit.galaxyName")}`}
        >
          {GALAXY.map((el) => (
            <MenuItem key={el.id} value={el.text}>
              {el.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {galaxyNameValidation && (
        <Typography variant="body1" component="p" color="error">
          {galaxyNameValidation}
        </Typography>
      )}
      <TextField
        label={`${t("main.submit.diameter")}`}
        type="number"
        variant="outlined"
        value={diameter}
        onChange={(e) => setDiameter(e.target.value)}
        fullWidth
      />
      <TextField
        label={`${t("main.submit.distance")}`}
        type="number"
        variant="outlined"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        fullWidth
      />
      {distanceValidation && (
        <Typography variant="body1" component="p" color="error">
          {distanceValidation}
        </Typography>
      )}
      <TextField
        label={`${t("main.submit.name")}`}
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      {nameValidation && (
        <Typography variant="body1" component="p" color="error">
          {nameValidation}
        </Typography>
      )}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      {emailValidation && (
        <Typography variant="body1" component="p" color="error">
          {emailValidation}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {t("main.submit.submit")}
      </Button>
    </form>
  );
};

export default NewPlanet;
