import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  listItemClasses,
  MenuItem,
} from "@mui/material";

function MessageComponent({data}) {
    const name = data.name;
    const message = data.message;
    const time = data.time;

    return (
        <Box sx={{
            bgcolor: 'grey.100',
            color: 'grey.800',
            border: '1px solid',
            borderColor: 'grey.300',
          }}>
            <Box sx={{ flexDirection: "row" }}>
                <Typography>
                    {name}
                </Typography>
                <Typography>
                    {time}
                </Typography>
            </Box>
            <Box>
                <Typography>
                    {message}
                </Typography>
            </Box>
        </Box>
    );
}

export default MessageComponent;