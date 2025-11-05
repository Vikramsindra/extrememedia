import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Technician');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSeverity, setPopupSeverity] = useState('info');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.user); // ✅ sets user in App.jsx
        setPopupMessage(`✅ Welcome ${data.user.username}`);
        setPopupSeverity('success');
        setShowPopup(true);
        setTimeout(() => navigate('/dashboard'), 1000); // ✅ redirect after popup
      } else {
        setPopupMessage(data.message || 'Login failed');
        setPopupSeverity('error');
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMessage('Network error');
      setPopupSeverity('error');
      setShowPopup(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6,border:'2ps solid black',borderRadius:'20px' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Role"
          select
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="Technician">Technician</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      {/* ✅ Login popup */}
      <Snackbar
        open={showPopup}
        autoHideDuration={4000}
        onClose={() => setShowPopup(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={popupSeverity}
          onClose={() => setShowPopup(false)}
          sx={{ width: '100%' }}
        >
          {popupMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;