import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";
import HierarchyTable from "./components/Tablecontainer";
import type { RowData } from "./data/initialData";
import { tableData } from "./data/initialData";

const theme = createTheme({
  palette: { mode: "dark", background: { default: "#121212" } },
});

export default function App() {
  const [data, setData] = useState<RowData[]>(tableData);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <HierarchyTable data={data} setData={setData} />
      </Container>
    </ThemeProvider>
  );
}
