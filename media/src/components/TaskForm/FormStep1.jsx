import { useEffect } from 'react';
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const FormStep1 = ({ formData, setFormData, onNext }) => {
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setFormData((prev) => ({ ...prev, dateTime: now }));
  }, [setFormData]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = () => {
    console.log('FormStep1 data:', formData);
    if (onNext) onNext(formData);
  };

  return (
    <>
      <h2>Form 1</h2>
      <Stack spacing={2}>
        <TextField
          label="Device No."
          fullWidth
          variant="outlined"
          value={formData.deviceNo}
          onChange={handleChange('deviceNo')}
        />

        {/* ✅ New Select Field: Panel Side */}
        <FormControl fullWidth>
          <InputLabel>Panel Side</InputLabel>
          <Select
            value={formData.panelSide || ''}
            label="Panel Side"
            onChange={handleChange('panelSide')}
          >
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Faulty Patch"
          fullWidth
          variant="outlined"
          value={formData.faultyPatch}
          onChange={handleChange('faultyPatch')}
        />
        <TextField
          label="Faulty Location"
          fullWidth
          variant="outlined"
          value={formData.faultyLocation}
          onChange={handleChange('faultyLocation')}
        />
        <TextField
          label="Date and Time"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={formData.dateTime}
          onChange={handleChange('dateTime')}
        />
        <Button variant="contained" onClick={handleNext}>
         Add 
        </Button>
      </Stack>
    </>
  );
};

export default FormStep1;