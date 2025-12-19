import { useState } from "react";
import Search from "./Search";
import DeviceInfo from "./DeviceInfo";
import { devices } from "./SampleData";
import { Typography } from "@mui/material";

function DevicePage() {
  const [deviceNo, setDeviceNo] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const foundDevice = devices.find(
      (device) => device.form1.deviceNo === deviceNo
    );

    if (foundDevice) {
      setSelectedDevice(foundDevice);
      setNotFound(false);
    } else {
      setSelectedDevice(null);
      setNotFound(true);
    }
  };

  return (
    <>
      <Search value={deviceNo} onChange={setDeviceNo} onSearch={handleSearch} />

      {/* device available
      1001 → Ready for Dispatch
      1024 → Under Repair
      1107 → Rework Required
      1189 → Dispatched
      1250 → QC Hold
      */}

      {/* Device Found */}
      {selectedDevice && (
        <DeviceInfo
          form1={selectedDevice.form1}
          form2={selectedDevice.form2}
          form3={selectedDevice.form3}
          form5={selectedDevice.form5}
        />
      )}

      {/* Device Not Found */}
      {notFound && (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 5 }}>
          Data not available for this device number
        </Typography>
      )}
    </>
  );
}

export default DevicePage;
