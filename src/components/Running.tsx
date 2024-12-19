import {
  Backdrop, CircularProgress
} from "@mui/material";

interface RunningProps {
  isRunning: boolean;
}

function Running({
  isRunning
}: RunningProps) {

  return (
    <Backdrop
      open={isRunning}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Running;
