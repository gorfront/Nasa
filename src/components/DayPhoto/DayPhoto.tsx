import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { daySelect } from "../../store/slices/day/daySlice";
import { fetchDay } from "../../store/slices/day/dayAPI";
import Link from "@mui/material/Link";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ApodData {
  title: string;
  url: string;
  hdurl: string;
  explanation: string;
}

const DayPhoto: React.FC<ApodData> = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [show, setShow] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useAppDispatch();
  const dayAbout = useAppSelector<ApodData>(daySelect);
  const { t } = useTranslation();

  useEffect(() => {
    const formattedDate = value?.format("YYYY-MM-DD");
    if (showCalendar === false && formattedDate) {
      dispatch(fetchDay(formattedDate));
    }
  }, [value, showCalendar]);

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gap={2}
    >
      <Input
        value={value?.format("DD/MM/YYYY")}
        onChange={() => {}}
        onFocus={() => setShowCalendar(true)}
      />
      <Button
        variant="contained"
        onClick={() => {
          setShowCalendar(false);
          setShow(true);
        }}
      >
        {t("main.search")}
      </Button>
      {showCalendar && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar", "DateCalendar"]}>
            <DemoItem label="Controlled calendar">
              <DateCalendar
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      )}

      {show && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          gap={4}
          pl={10}
          pr={10}
        >
          <Typography variant="h2" component="h1">
            {dayAbout.title}
          </Typography>
          <img src={dayAbout.url} alt={dayAbout.title} />
          <Link href={dayAbout.hdurl}>HD link of picture</Link>
          <Typography variant="body1" component="p">
            {dayAbout.explanation}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DayPhoto;
