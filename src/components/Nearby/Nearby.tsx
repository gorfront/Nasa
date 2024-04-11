import {
  Box,
  Button,
  FormControlLabel,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { nearbySelect } from "../../store/slices/nearby/nearbySlice";
import {
  AsteroidDetails,
  fetchNearby,
} from "../../store/slices/nearby/nearbyAPI";
import { useTranslation } from "react-i18next";

interface ITable {
  id: string;
  title: string;
}

const Nearby: React.FC<ITable> = () => {
  const [startValue, setStartValue] = useState<Dayjs | null>(dayjs());
  const [endValue, setEndValue] = useState<Dayjs | null>(dayjs());
  const [showTable, setShowTable] = useState(false);
  const [showCalendar1, setShowCalendar1] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const { t } = useTranslation();

  const TABLE_TITLE: ITable[] = [
    {
      id: "0",
      title: "Name",
    },
    {
      id: "1",
      title: "Distance (km)",
    },
    {
      id: "2",
      title: "Absolute Magnitude",
    },
    {
      id: "3",
      title: "Diameter(m)",
    },
    {
      id: "4",
      title: "Is Potentially Hazardous",
    },
  ];

  const dispatch = useAppDispatch();
  const nearbyDetiels = useAppSelector(nearbySelect);

  const startFullYear = startValue ? startValue.format("DD/MM/YYYY") : "";
  const endFullYear = endValue ? endValue.format("DD/MM/YYYY") : "";
  const dayDifference =
    endValue && startValue ? endValue.diff(startValue, "day") : 0;

  useEffect(() => {
    const startFormattedDate = startValue?.format("YYYY-MM-DD");
    const endFormattedDate = endValue?.format("YYYY-MM-DD");

    if (showTable && startFormattedDate && endFormattedDate) {
      dispatch(fetchNearby({ startFormattedDate, endFormattedDate }));
      console.log(startFormattedDate, endFormattedDate);
    }
  }, [showTable, startValue, endValue]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Typography variant="h5" component="h3" sx={{ fontWeight: 800 }}>
        {t("main.nearby.title")}
      </Typography>

      <Typography variant="body1" component="p" sx={{ fontWeight: 700 }}>
        {t("main.nearby.text")}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
        <Box>
          <FormControlLabel
            control={
              <Input
                value={startFullYear}
                onFocus={() => setShowCalendar1(true)}
              />
            }
            label={`${t("main.nearby.start")} `}
            labelPlacement="start"
          />
          {showCalendar1 && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                <DemoItem label="Controlled calendar">
                  <DateCalendar
                    value={startValue}
                    onChange={(newValue) => {
                      setStartValue(newValue);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          )}
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Input
                value={endFullYear}
                onFocus={() => setShowCalendar2(true)}
              />
            }
            label={`${t("main.nearby.end")} `}
            labelPlacement="start"
          />
          {showCalendar2 && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                <DemoItem label="Controlled calendar">
                  <DateCalendar
                    value={endValue}
                    onChange={(newValue) => {
                      setEndValue(newValue);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          )}
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            setShowTable(true);
            setShowCalendar1(false);
            setShowCalendar2(false);
          }}
        >
          {t("main.search")}
        </Button>
      </Box>

      {showTable ? (
        dayDifference < 8 ? (
          <TableContainer component={Paper}>
            <Table
              aria-label="simple table"
              sx={{ width: "80%", margin: "auto", mb: 5 }}
            >
              <TableHead sx={{ "td, th": { border: 1 } }}>
                <TableRow>
                  {TABLE_TITLE.map((el) => (
                    <TableCell
                      key={el.id}
                      sx={{ fontWeight: 700 }}
                      align="center"
                    >
                      {t(`main.nearby.${el.title}`)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {nearbyDetiels.map((details: AsteroidDetails) => (
                  <TableRow key={details.id} sx={{ "td, th": { border: 1 } }}>
                    <TableCell align="center">{details.name}</TableCell>
                    <TableCell align="center">
                      {details.miss_distance_kilometers}
                    </TableCell>
                    <TableCell align="center">
                      {details.absolute_magnitude_h}
                    </TableCell>
                    <TableCell align="center">
                      {details.estimated_diameter_max_km}
                    </TableCell>
                    <TableCell align="center">
                      {details.is_potentially_hazardous_asteroid === "Yes"
                        ? t("main.nearby.Yes")
                        : t("main.nearby.No")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" component="p" color="red" sx={{ pb: 10 }}>
            {t("main.nearby.error")}
          </Typography>
        )
      ) : (
        ""
      )}
    </Box>
  );
};

export default Nearby;
