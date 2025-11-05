import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/AssignmentTurnedIn';

const Assign = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/task/tasks', {
          method: 'GET',
          credentials: 'include', // ✅ sends session cookie
        });
        const data = await response.json();
        const withCompletionFlag = data.map((task) => ({
          ...task,
          completed: task.is_done === 1 || task.is_done === true,
        }));
        setTasks(withCompletionFlag);
      } catch (err) {
        console.error('❌ Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const markCompleted = (index) => {
    const updated = [...tasks];
    updated[index].completed = true;
    setTasks(updated);
    // ✅ Optionally: send PATCH to backend to update is_done
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Tasks Assigned To Me
      </Typography>

      {/* ✅ Overall Progress Bar */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" fontWeight="medium" gutterBottom>
          Overall Progress: {progressPercent}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#eee',
            '& .MuiLinearProgress-bar': {
              backgroundColor: progressPercent === 100 ? 'success.main' : 'primary.main',
            },
          }}
        />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : tasks.length === 0 ? (
        <Typography>No tasks assigned to you.</Typography>
      ) : (
        <Stack spacing={2}>
          {tasks.map((task, index) => (
            <Card key={task.id || index} variant="outlined" sx={{ backgroundColor: task.completed ? '#e0f7e9' : '#f9f9f9' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: task.completed ? 'success.main' : 'primary.main' }}>
                    <AssignmentIcon />
                  </Avatar>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {task.title}
                    </Typography>
                    <Typography variant="body2">👤 Assigned to: {task.assigned_to}</Typography>
                    <Typography variant="body2">📅 Due: {task.due_date}</Typography>
                    <Typography variant="body2">🧑‍💼 Assigned by: {task.assigned_by}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      📝 {task.description}
                    </Typography>
                    {task.completed && (
                      <Chip label="Completed" color="success" size="small" sx={{ mt: 2 }} />
                    )}
                  </Stack>
                  {!task.completed && (
                    <Button variant="outlined" color="success" onClick={() => markCompleted(index)}>
                      Mark Completed
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Assign;