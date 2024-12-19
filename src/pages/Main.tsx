import { useState, useEffect, useMemo } from 'react';
import {
  Container, Tooltip,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Grid2 as Grid,
  Paper, CardActionArea, CardMedia,
  Dialog, DialogTitle, DialogContent, DialogActions, Stack, Typography, IconButton
} from "@mui/material";
import {
  Close as CloseIcon
} from "@mui/icons-material";
import Running from '../components/Running';
import Message from '../components/Message';

type Severity = 'error' | 'warning' | 'info' | 'success';
// id, name, pack, url
type Data = [string, string, string, string];

function Main() {
  const gasUrl = "https://script.google.com/macros/s/AKfycbxT5iaocweZFKTm7O-qdFhmdk24SRzgm0kR7RQpl7mARzlXYxUX9jK4Md8uFRQ0tNNtAQ/exec";

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>('');
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const [messageSeverity, setMessageSeverity] = useState<Severity>('info');
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [data, setData] = useState<Data[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);

  useEffect(() => {
    const fetchGAS = async () => {
      try {
        setIsRunning(true);
        createMessage("読み込み中...", "info");
        const response = await fetch(gasUrl);
        const data = await response.json();
        //console.log(data);
        setData(data);
        createMessage("読み込み完了！", 'success');
      } catch (e) {
        const message = e instanceof Error ? e.message : 'An error occurred';
        createMessage(message, 'error');
      } finally {
        setIsRunning(false);
      }
    }

    fetchGAS();
  }, []);

  const categoriesList = useMemo(() => {
    return Array.from(new Set(data.map(item => item[2]).filter(category => category !== "")));
  }, [data]);

  const createMessage = (text: string, severity: Severity): void => {
    setMessageText(text);
    setMessageSeverity(severity);
    setMessageOpen(true);
  };

  const normalizeText = (text: string): string => {
    return text
      .normalize("NFKC") // 全角と半角を統一
      .replace(/[\u3099\u309A]/g, '') // 濁点・半濁点を除去
      .replace(/[ぁ-ん]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60)) // 平仮名をカタカナに変換
      .toLowerCase(); // 小文字化
  }

  // フィルタリング処理
  const filteredData = data.filter(item => {
    const matchesName = normalizeText(item[1]).includes(normalizeText(query));
    const matchesCategory = category ? item[2].includes(category) : true;
    return matchesName && matchesCategory;
  });

  const handleCardClick = (item: [string, string, string, string]) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <Container maxWidth="xl"
      sx={{ my: 2 }}
    >
      <Grid container
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-select-label">拡張パック</InputLabel>
            <Select
              labelId="category-select-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">すべて</MenuItem>
              {categoriesList.map((category, i) => (
                <MenuItem key={i} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container
        spacing={2}
        sx={{ mt: 2 }}
      >
        {filteredData.map((item, i) => (
          <Grid key={i} size={{ xs: 4, sm: 3, md: 2 }}>
            <Paper elevation={8}>
              <Tooltip arrow
                title={item[0]}
              >
                <CardActionArea onClick={() => handleCardClick(item)}>
                  <CardMedia
                    component="img"
                    image={`https://lh3.googleusercontent.com/d/${item[3]}=w300`}
                    alt={item[1]}
                    onContextMenu={(event: React.MouseEvent) => { event.preventDefault() }}
                    draggable={false}
                  />
                </CardActionArea>
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedItem && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{selectedItem[1]}</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <CardMedia
                component="img"
                image={`https://lh3.googleusercontent.com/d/${selectedItem[3]}=w300`}
                alt={selectedItem[1]}
                onContextMenu={(event: React.MouseEvent) => { event.preventDefault() }}
                draggable={false}
              />

              <Typography>
                {selectedItem[2]}
              </Typography>

              <Typography>
                {selectedItem[0].replace(/_/g, '/')}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Tooltip arrow
              title="閉じる"
            >
              <IconButton
                onClick={handleCloseDialog}
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </DialogActions>
        </Dialog>
      )}

      <Running
        isRunning={isRunning}
      />

      <Message
        messageText={messageText}
        messageOpen={messageOpen}
        setMessageOpen={setMessageOpen}
        messageSeverity={messageSeverity}
      />
    </Container>
  )
}

export default Main
