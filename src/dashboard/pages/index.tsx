import { Stack, Typography } from "@mui/material";
import { useTranslate } from "@refinedev/core";

const DashboardPage = () => {
  const t = useTranslate();

  return <Stack spacing={2}>
    <Typography variant="h4" component="h1">
      {t("dashboard.welcome")}
    </Typography>
    <Typography variant="body1">
      {t("dashboard.description")}
    </Typography>
  </Stack>;
};

export { DashboardPage };
