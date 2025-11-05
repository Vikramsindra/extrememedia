import { TextField, Button, Stack } from '@mui/material';

const FormStep3 = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <>
      <h2>Form 3</h2>
      <Stack spacing={2}>
        <TextField
          label="IC QC"
          fullWidth
          variant="outlined"
          value={formData.icQc || ''}
          onChange={handleChange('icQc')}
        />
        <TextField
          label="IC QC Remark"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={formData.icQcRemark || ''}
          onChange={handleChange('icQcRemark')}
        />
        <TextField
          label="Fullfitting"
          fullWidth
          variant="outlined"
          value={formData.fullfitting || ''}
          onChange={handleChange('fullfitting')}
        />
        <TextField
          label="Silicon Applying"
          fullWidth
          variant="outlined"
          value={formData.siliconApplying || ''}
          onChange={handleChange('siliconApplying')}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onBack}>Back</Button>
          <Button variant="contained" onClick={onNext}>Next</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default FormStep3;