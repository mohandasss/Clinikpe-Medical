import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "../Modules/Registration/Login";
import RegisterLayout from "./RegisterLayout";
import OtpVerifyPage from "../Modules/Registration/OtpVerify";
import BasicDetails from "../Modules/Registration/BasicDetails";

const AppContents = () => {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerifyPage />} />
        <Route path="/basic-details" element={<BasicDetails />}/>
      </Route>

      {/* <Route element={<AppLayout />}>
        
      </Route> */}
    </Routes>
  );
};

export default AppContents;
