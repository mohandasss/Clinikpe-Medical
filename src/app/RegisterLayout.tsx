import { Outlet } from "react-router-dom";
import {BACKGROUND_COLOR} from "../Constants/colors.ts";
const RegisterLayout = () => {
  return (
    <div className="app-frame">
      {/* Main Content */}
      <main className="app-content bg-blue-50/50 px-2 py-3">
        <Outlet />
      </main>
    </div>
  );
};

export default RegisterLayout;