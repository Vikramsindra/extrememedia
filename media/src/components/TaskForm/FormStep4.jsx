import { useEffect } from 'react';
import { TextField, Button, Stack, Typography, Divider } from '@mui/material';

const FormStep4 = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // ✅ Auto-fill current date/time on mount
  useEffect(() => {
    if (!formData.fullDateTime) {
      const now = new Date().toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
      setFormData((prev) => ({ ...prev, fullDateTime: now }));
    }
  }, [formData.fullDateTime, setFormData]);

  return (
    <>
      <Typography variant="h5" gutterBottom style={{ fontWeight: 900 }}>
        Form 4
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold">
        Half Fitting Aging
      </Typography>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Faulty Patch 2"
          fullWidth
          variant="outlined"
          value={formData.halfFaultyPatch || ''}
          onChange={handleChange('halfFaultyPatch')}
        />
        <TextField
          label="Pixel Faulty 3"
          fullWidth
          variant="outlined"
          value={formData.halfPixelFaulty || ''}
          onChange={handleChange('halfPixelFaulty')}
        />
        <TextField
          label="Fault Location 4"
          fullWidth
          variant="outlined"
          value={formData.halfFaultLocation || ''}
          onChange={handleChange('halfFaultLocation')}
        />
      </Stack>

      <Divider />

      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3 }}>
        Full Fitting Aging
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Faulty Patch 2.2"
          fullWidth
          variant="outlined"
          value={formData.fullFaultyPatch || ''}
          onChange={handleChange('fullFaultyPatch')}
        />
        <TextField
          label="Pixel Faulty 3.3"
          fullWidth
          variant="outlined"
          value={formData.fullPixelFaulty || ''}
          onChange={handleChange('fullPixelFaulty')}
        />
        <TextField
          label="Fault Location 4.4"
          fullWidth
          variant="outlined"
          value={formData.fullFaultLocation || ''}
          onChange={handleChange('fullFaultLocation')}
        />
        <TextField
          label="Date/Time 3.2"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={formData.fullDateTime || ''}
          onChange={handleChange('fullDateTime')}
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Stack>
    </>
  );
};

export default FormStep4;