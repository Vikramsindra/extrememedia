import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import TaskForm from './components/TaskForm/TaskForm';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { Container } from '@mui/material';
import AssignTask from './pages/Assign';
import GiveTask from './pages/GiveTask';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user={user}
      />
      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* ✅ Public routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* ✅ Protected routes */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/assign" element={<AssignTask />} />
              <Route path="/task" element={<TaskForm />} />
              {
                user?.role === "manager" || user?.role === "admin"?
                <Route path='/give-task' element={<GiveTask user={user}/>} />:
                null
              }
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<p>Please login to view dashboard.</p>} />
              <Route path="/assign" element={<p>Please login to view assigned tasks.</p>} />
              <Route path="/task" element={<p>Please login to add tasks.</p>} />
            </>
          )}

          {/* ✅ Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;