import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import SumPage from "./pages/SumPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

const linkBtnSx = {
  color: "white",
  textTransform: "none",
  borderRadius: 2,
  px: 2,
  "&.active": { bgcolor: "rgba(255,255,255,.12)" },
};

export default function App() {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#343a40" }}>
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mr: 2 }}>
            Simpsons Personajes
          </Typography>

          <Button component={NavLink} to="/" end sx={linkBtnSx}>
            Home
          </Button>
          <Button component={NavLink} to="/productos" sx={linkBtnSx}>
            Productos
          </Button>
          <Button component={NavLink} to="/suma" sx={linkBtnSx}>
            Suma
          </Button>
          <Button component={NavLink} to="/acerca" sx={linkBtnSx}>
            Informacion
          </Button>

          <Box sx={{ flex: 1 }} />
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/suma" element={<SumPage />} />
          <Route path="/acerca" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>

      <Box sx={{ bgcolor: "#007bff", py: 2, mt: 4, textAlign: "center" }}>
        <Typography sx={{ color: "white", fontWeight: 500 }}>
          © 2025 - Taller Académico
        </Typography>
      </Box>
    </>
  );
}