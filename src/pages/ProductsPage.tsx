import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function ProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        // Sin paginación en UI: pedimos un page_size grande y mostramos lo que venga
        const url =
          "https://thesimpsonsapi.com/api/characters?page=1";
        const res = await fetch(url);
        const data = await res.json();

        // La API suele devolver { count, next, previous, results: [] }
        const list = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setItems(list);
      } catch (e: any) {
        console.error(e);
        setError("No se pudo cargar productos (revisa consola / red).");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={900} gutterBottom>
        Listado de Personajes
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        URL de la API utilizada:
      </Typography>
      
      <Box sx={{ 
        mb: 2, 
        p: 1.5, 
        bgcolor: "#f5f5f5", 
        border: "1px solid #ddd", 
        borderRadius: 1,
        fontFamily: "monospace",
        fontSize: "0.875rem",
        wordBreak: "break-all"
      }}>
        https://thesimpsonsapi.com/api/characters?page=1
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Alert severity="info">No hay personajes para mostrar.</Alert>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell align="right">Edad</TableCell>
              <TableCell>Ocupacion</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Foto</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((p, idx) => (
              <TableRow key={p?.id ?? idx} hover>
                <TableCell>{p?.id ?? "-"}</TableCell>
                <TableCell>{p?.name ?? "-"}</TableCell>
                <TableCell>{p?.gender ?? "-"}</TableCell>
                <TableCell align="right">{p?.age ?? "-"}</TableCell>
                <TableCell>{p?.occupation ?? "-"}</TableCell>
                <TableCell>{p?.status ?? "-"}</TableCell>
                <TableCell>
                  {p?.portrait_path ? (
                    <img
                      src={`https://cdn.thesimpsonsapi.com/500/character/${p?.id}.webp`}
                      alt={p?.name ?? "personaje"}
                      style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(0,0,0,.15)" }}
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.src.includes("/500/")) {
                          img.src = `https://cdn.thesimpsonsapi.com/200/character/${p?.id}.webp`;
                        } else {
                          img.src = "https://via.placeholder.com/80?text=No+Img";
                        }
                      }}
                    />
                  ) : (
                    <span style={{ color: "#667085" }}>—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}