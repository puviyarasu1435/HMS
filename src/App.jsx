import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./components/Auth/Auth";
import UserLogin from "./components/Auth/form/UserLogin";
import AdminLogin from "./components/Auth/form/AdminLogin";
import PatientForm from "./components/User/MonitorForm/MonitorForm";
import UserLayout from "./components/layout/UserLayout";
import UserView from "./components/User/UserView";
import AdminLayout from "./components/layout/AdminLayout";
import { store } from "./Redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AdminView from "./components/Admin/AdminView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route index element={<UserLogin />} />
              <Route path="/doctor" element={<AdminLogin />} />
            </Route>
            <Route path="/User" element={<UserLayout />}>
              <Route index element={<UserView />} />
            </Route>
            <Route path="/Admin" element={<AdminLayout />}>
              <Route index element={<AdminView />} />
            </Route>
          </Routes>
        </Provider>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
