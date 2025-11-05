import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const FormStep2 = ({ formData, onNext, onBack }) => (
  <>
    <h2>Form 2</h2>
    <Stack spacing={2}>
      <TextField label="Barcode" fullWidth variant="outlined" />

      {/* ✅ Disabled Panel Side from Form 1 */}
      <FormControl fullWidth disabled>
        <InputLabel>Panel Side</InputLabel>
        <Select
          value={formData.panelSide || ''}
          label="Panel Side"
        >
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </Select>
      </FormControl>

      <TextField label="IC Status" fullWidth variant="outlined" />
      <TextField label="No. of IC" type="number" fullWidth variant="outlined" />
      <TextField label="Engineer Name" fullWidth variant="outlined" />
      <TextField label="No. of TP" type="number" fullWidth variant="outlined" />
      <TextField label="No. of LED" type="number" fullWidth variant="outlined" />
      <TextField label="Engineer Name 2" fullWidth variant="outlined" />

      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={onBack}>Back</Button>
        <Button variant="contained" onClick={onNext}>Next</Button>
      </Stack>
    </Stack>
  </>
);

export default FormStep2;