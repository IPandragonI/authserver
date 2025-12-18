import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Realms from './pages/realms/Realms';
import Roles from './pages/roles/Roles';
import Plans from './pages/plans/Plans';
import Companies from './pages/companies/Companies';
import Logs from './pages/logs/Logs';
import ProfileSettings from './pages/settings/profile/ProfileSettings.jsx';
import SettingsLayout from './pages/settings/SettingsLayout';
import ProfileNotifications from './pages/settings/notifications/ProfileNotifications.jsx';
import ProfileSecurity from './pages/settings/security/ProfileSecurity.jsx';
import ProfilePreferences from './pages/settings/preferences/ProfilePreferences.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import NotFound from './pages/NotFound.jsx';
import Home from "./pages/home/Home.jsx";
import Contact from "./pages/contact/Contact.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/admin" element={<Layout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="realms" element={<Realms/>}/>
                    <Route path="users" element={<Users/>}/>
                    <Route path="roles" element={<Roles/>}/>
                    <Route path="plans" element={<Plans/>}/>
                    <Route path="companies" element={<Companies/>}/>
                    <Route path="logs" element={<Logs/>}/>

                    <Route path="settings" element={<SettingsLayout/>}>
                        <Route index element={<ProfileSettings/>}/>
                        <Route path="profile" element={<ProfileSettings/>}/>
                        <Route path="preferences" element={<ProfilePreferences/>}/>
                        <Route path="notifications" element={<ProfileNotifications/>}/>
                        <Route path="security" element={<ProfileSecurity/>}/>
                    </Route>
                </Route>

                <Route path="/contact" element={<Contact/>}/>
                <Route path="/auth" element={<Login/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/register" element={<Register/>}/>
                <Route path="/auth/forgot-password" element={<ForgotPassword/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;