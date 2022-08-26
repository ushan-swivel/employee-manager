import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";

const CustomTheme = createTheme({
  palette: {
    primary: { main: "#6200EA" },
    success: { main: "#00E676" },
    error: { main: "#FF1744" },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: "#E8EAF6",
          padding: "8px",
        },
      },
    },
  },
});

export { CustomTheme };
