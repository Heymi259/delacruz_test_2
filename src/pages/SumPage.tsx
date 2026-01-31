import { useMemo, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function SumPage() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [countResult, setCountResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const result = useMemo(() => a + b, [a, b]);

  const handleCountByGenderUsingA = async () => {
    const n = Number(a);
    if (!n || n <= 0) {
      setCountResult("Introduce un numero  en A ");
      return;
    }

    setLoading(true);
    setCountResult("");
    try {
      
     
      
   

      setCountResult("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={900} gutterBottom>
        Estadistica (a + b)
      </Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <TextField label="A" type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
        <TextField label="B" type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
        <Button variant="contained" onClick={handleCountByGenderUsingA} disabled={loading}>
          {loading ? "Cargando..." : "Contar por genero "}
        </Button>
      </Box>

      <Typography sx={{ mb: 1 }}>{countResult}</Typography>

      <Typography sx={{ mt: 2 }}>Resultado: <strong>{result}</strong></Typography>
    </Paper>
  );
}