import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar className="navbar-container" position="static">
      <Toolbar className="toolbar-container">
        <Typography
          component={Link}
          to="/"
          variant="h3"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Ticketing App
        </Typography>
        <Box>
          <Button component={Link} to="/admin" color="inherit">
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
