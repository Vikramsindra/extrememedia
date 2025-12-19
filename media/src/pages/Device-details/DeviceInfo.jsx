import { Card, CardContent, Typography, Divider, Grid } from "@mui/material";

function DeviceInfo({ form1, form2, form3, form5 }) {
  // 🔹 Section Wrapper
  const Section = ({ title, children }) => (
    <Card className="mb-5 shadow-sm">
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {children}
      </CardContent>
    </Card>
  );

  // 🔹 Label + Value Item (3 per row)
  const Item = ({ label, value }) => (
    <Grid item xs={12} md={4} sx={{ mb: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.7 }}>
        {value || "-"}
      </Typography>
    </Grid>
  );

  return (
    <div className="container my-5">
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Device Details
      </Typography>

      {/* Before Repair */}
      <Section title="Before Repair Details">
        <Grid container spacing={20}>
          <Item label="Device No" value={form1.deviceNo} />
          <Item label="Panel Side" value={form1.panelSide} />
          <Item label="Faulty Patch" value={form1.faultyPatch} />
        </Grid>
        <Grid container spacing={20}>
          <Item label="Faulty Location" value={form1.faultyLocation} />
          <Item label="Date" value={form1.Date} />
        </Grid>
      </Section>

      {/* Debugging */}
      <Section title="Debugging Details">
        <Grid container spacing={20}>
          <Item label="Barcode" value={form2.barcode} />
          <Item label="IC Status" value={form2.isStatus} />
          <Item label="No. of IC" value={form2.noOfDevice} />
          <Item label="Engineer Name" value={form2.enginerName} />
        </Grid>
        <Grid container spacing={20}>
          <Item label="No. of TP" value={form2.noOfTp} />
          <Item label="No. of LED" value={form2.noOfLed} />
          <Item label="Debug Engineer" value={form2.debugEnginer} />
        </Grid>
      </Section>

      {/* QC */}
      <Section title="QC Details">
        <Grid container spacing={10}>
          <Item label="IC QC" value={form3.icQc} />
          <Item label="QC Remark" value={form3.remark} />
          <Item label="Full Fitting" value={form3.fullfitting} />
          <Item label="Silicon Applying" value={form3.siliconApplying} />
        </Grid>
      </Section>

      {/* Final Status */}
      <Section title="Final Status">
        <Grid container spacing={10}>
          <Item label="Device Status" value={form5.deviceStatus} />
          <Item label="Aging Status" value={form5.agingStatus} />
          <Item label="QC Remark" value={form5.qcRemark} />
          <Item label="Note" value={form5.note} />
          <Item label="Dispatch Date" value={form5.dispatchDate} />
        </Grid>
      </Section>
    </div>
  );
}

export default DeviceInfo;
