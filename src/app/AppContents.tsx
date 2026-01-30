import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "../Modules/Registration/Login";
import RegisterLayout from "./RegisterLayout";
import OtpVerifyPage from "../Modules/Registration/OtpVerify";
import BasicDetails from "../Modules/Registration/BasicDetails";
import MapLocation from "../Modules/Registration/MapLocation";
import StoreDetails from "../Modules/Registration/StoreDetails";
import Dashboard from "../Modules/Dashboard/Dashboard";

const AppContents = () => {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerifyPage />} />
        <Route path="/basic-details" element={<BasicDetails />}/>
        <Route path="/map-location" element={<MapLocation lat={0} lng={0} />} />
       
        <Route path="/store-details" element={<StoreDetails />} />
        
      </Route>

      <Route element={<AppLayout />}>
        {/* Other authenticated routes can go here */}
      <Route path="/dashboard" element={<Dashboard />}>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppContents;
