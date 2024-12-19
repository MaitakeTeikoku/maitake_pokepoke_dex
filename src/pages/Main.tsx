import { useState, useEffect } from 'react';
import {
  Container, Grid2 as Grid,
  Tooltip,
  Paper, CardActionArea, CardMedia
} from "@mui/material";

// id, name, pack, url
type Data = [string, string, string, string][];

function Main() {
  const gasUrl = "https://script.google.com/macros/s/AKfycbxT5iaocweZFKTm7O-qdFhmdk24SRzgm0kR7RQpl7mARzlXYxUX9jK4Md8uFRQ0tNNtAQ/exec";

  const [data, setData] = useState<Data>([]);

  useEffect(() => {
    const fetchGAS = async () => {
      const response = await fetch(gasUrl);
      const data = await response.json();
      //console.log(data);
      setData(data);
    }

    fetchGAS();
  }, []);

  return (
    <Container maxWidth="xl"
      sx={{ my: 2 }}
    >
      <Grid container
        spacing={2}
        sx={{ mt: 1 }}
      >
        {data.map((item, i) => (
          <Grid key={i} size={{ xs: 4, sm: 3, md: 2 }}>
            <Paper elevation={8}>
              <Tooltip arrow
                title={item[0]}
              >
                <CardActionArea onClick={() => { }}>
                  <CardMedia
                    component="img"
                    image={`https://lh3.google.com/u/0/d/${item[3]}=w300`}
                    alt={item[1]}
                    onContextMenu={(event: React.MouseEvent) => { event.preventDefault() }}
                    draggable={false}
                    sx={{ backgroundColor: 'transparent' }}
                  />
                </CardActionArea>
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Main
