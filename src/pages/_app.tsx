import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import {
  AppBar,
  Box,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { CustomTheme } from "src/theme/CustomTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ThemeProvider theme={CustomTheme}>
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { sm: "block" } }}
            >
              Employee Manager
            </Typography>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
export default wrapper.withRedux(MyApp);
