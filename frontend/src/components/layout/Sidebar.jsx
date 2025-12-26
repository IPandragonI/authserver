import {NavLink, useLocation, useNavigate, useParams} from 'react-router-dom';
import {FaBuilding, FaClipboardList, FaCreditCard, FaHome, FaKey, FaTimes, FaUsers, FaUserShield} from 'react-icons/fa';
import {useEffect, useState} from "react";
import Urls from "../../api/Urls.js";
import api from "../../api/index.js";
import {useAuth} from "../../AuthProvider.jsx";

const menuItems = [
    {path: '/realm/{realm}/dashboard', label: 'Dashboard', icon: <FaHome/>, roles: [ 'SUPER_ADMIN', 'ADMIN', 'REALM_ADMIN']},
    {path: '/realm/{realm}/realms', label: 'Realms', icon: <FaKey/>, roles: [ 'SUPER_ADMIN', 'ADMIN']},
    {path: '/realm/{realm}/users', label: 'Users', icon: <FaUsers/>, roles: [ 'SUPER_ADMIN', 'ADMIN', 'REALM_ADMIN']},
    {path: '/realm/{realm}/roles', label: 'Roles', icon: <FaUserShield/>, roles: [ 'SUPER_ADMIN', 'ADMIN']},
    {path: '/realm/{realm}/plans', label: 'Plans', icon: <FaCreditCard/>, roles: [ 'SUPER_ADMIN', 'ADMIN']},
    {path: '/realm/{realm}/companies', label: 'Companies', icon: <FaBuilding/>, roles: [ 'SUPER_ADMIN', 'ADMIN']},
    {path: '/realm/{realm}/logs', label: 'Logs', icon: <FaClipboardList/>, roles: [ 'SUPER_ADMIN', 'ADMIN', 'REALM_ADMIN']},
    {path: '/realm/{realm}/settings', label: 'Settings', icon: <FaUserShield/>, roles: [ 'SUPER_ADMIN', 'ADMIN', 'REALM_ADMIN']},
];

const Sidebar = ({
                     onClose = () => {
                     }
                 }) => {
    const {realm} = useParams();
    const realmUsed = realm || 'master';
    const [realms, setRealms] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const {roles} = useAuth();

    const fetchRealms = async () => {
        if (!roles.includes('SUPER_ADMIN') && !roles.includes('ADMIN')) {
            setRealms([]);
            return;
        }
        try {
            const response = await api.get(Urls.realm.list);

            if (response.status >= 200 && response.status < 300) {
                setRealms(response.data);
            } else {
                setRealms([]);
            }
        } catch (err) {
            console.error(err);
            setRealms([]);
        }
    };

    useEffect(() => {
        fetchRealms();
    }, []);

    const handleRealmChange = (e) => {
        const newRealm = e.target.value;
        if (location.pathname.includes('/realm/')) {
            const newPath = location.pathname.replace(/\/realm\/[^/]+/, `/realm/${newRealm}`);
            navigate(newPath);
        } else {
            navigate(`/realm/${newRealm}/dashboard`);
        }
    };

    return (
        <div className="w-64 bg-base-100 border-r border-base-300 flex flex-col min-h-screen">

            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary">SSO Admin</h1>
                <p className="text-sm opacity-70">Management Panel</p>

                {realms.length > 0 && (
                    <select
                        className="select select-bordered w-full mt-4"
                        value={realmUsed}
                        onChange={handleRealmChange}
                    >
                        {realms.map((r) => (
                            <option
                                key={r.id}
                                value={r.name}
                            >
                                {r.displayName || r.name}
                            </option>
                        ))}
                    </select>
                )}
                <button
                    className="btn btn-ghost btn-sm absolute top-4 right-4 md:hidden"
                    onClick={onClose}
                >
                    <FaTimes/>
                </button>
            </div>

            <nav className="flex-1 px-4">
                <ul className="menu rounded-box">
                    {menuItems.map((item) => (
                        (item.roles.some(role => roles.includes(role))) && (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path.replace('{realm}', realmUsed)}
                                    className={({isActive}) =>
                                        isActive ? 'active bg-primary text-primary-content' : ''
                                    }
                                >
                                    {item.icon}
                                    {item.label}
                                </NavLink>
                            </li>
                        )
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-base-300">
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} className="btn btn-ghost flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full bg-primary">
                                <span className="text-xl">A</span>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">Admin</p>
                            <p className="text-xs opacity-70">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;