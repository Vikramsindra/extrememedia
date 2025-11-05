import { useEffect } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';

const FormStep5 = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // ✅ Auto-fill today's date on mount
  useEffect(() => {
    if (!formData.dispatchDate) {
      const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      setFormData((prev) => ({ ...prev, dispatchDate: today }));
    }
  }, [formData.dispatchDate, setFormData]);

  return (
    <>
      <Typography variant="h5" gutterBottom>Form 5</Typography>
      <Stack spacing={2}>
        <TextField
          label="Device Status"
          fullWidth
          variant="outlined"
          value={formData.deviceStatus || ''}
          onChange={handleChange('deviceStatus')}
        />
        <TextField
          label="Aging Status"
          fullWidth
          variant="outlined"
          value={formData.agingStatus || ''}
          onChange={handleChange('agingStatus')}
        />
        <TextField
          label="QC Remark"
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          value={formData.qcRemark || ''}
          onChange={handleChange('qcRemark')}
        />
        <TextField
          label="Note"
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          value={formData.note || ''}
          onChange={handleChange('note')}
        />
        <TextField
          label="Dispatch Date"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.dispatchDate || ''}
          onChange={handleChange('dispatchDate')}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onBack}>Back</Button>
          <Button variant="contained" color="primary" onClick={() => onNext(formData)}>
            Next
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default FormStep5;