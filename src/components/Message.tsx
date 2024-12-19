import {
  Snackbar,
  Alert, AlertTitle,
} from "@mui/material";

type Severity = 'error' | 'warning' | 'info' | 'success';

interface MessageProps {
  messageText: string;
  messageOpen: boolean;
  setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messageSeverity: Severity;
}

function Message({
  messageText,
  messageOpen,
  setMessageOpen,
  messageSeverity,
}: MessageProps) {

  return (
    <Snackbar
      message={messageText}
      open={messageOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={
        (messageSeverity !== "success")
          ? null
          : 6000
      }
      onClose={() => setMessageOpen(false)}
    >
      <Alert
        severity={messageSeverity}
        onClose={() => setMessageOpen(false)}
      >
        <AlertTitle>
          {messageSeverity.toUpperCase()}
        </AlertTitle>
        {messageText}
      </Alert>
    </Snackbar>
  );
}

export default Message;
