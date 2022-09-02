import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const AdminArticleItem: FC = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>
            {id ? 'Editing' : 'Create new'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="success" sx={{ mr: 1 }}>
              Save
            </Button>
            {id && (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Remove</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Company" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline maxRows={4} label="Eyeliner" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline maxRows={12} label="Text" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardActionArea>
              <CardMedia component="img" height="140" image="http://placeimg.com/640/480/any" alt="green iguana" />
              <CardContent>
                <input type="file" />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
