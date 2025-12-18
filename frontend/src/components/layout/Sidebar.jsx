import {NavLink} from 'react-router-dom';
import {
    FaUsers, FaKey, FaUserShield,
    FaCreditCard, FaBuilding, FaClipboardList, FaHome, FaTimes
} from 'react-icons/fa';

const menuItems = [
    {path: '/admin/dashboard', label: 'Dashboard', icon: <FaHome/>},
    {path: '/admin/realms', label: 'Realms', icon: <FaKey/>},
    {path: '/admin/users', label: 'Users', icon: <FaUsers/>},
    {path: '/admin/roles', label: 'Roles', icon: <FaUserShield/>},
    {path: '/admin/plans', label: 'Plans', icon: <FaCreditCard/>},
    {path: '/admin/companies', label: 'Companies', icon: <FaBuilding/>},
    {path: '/admin/logs', label: 'Logs', icon: <FaClipboardList/>},
];

const Sidebar = ({
                     onClose = () => {
                     }
                 }) => {
    return (
        <div className="w-64 bg-base-100 border-r border-base-300 flex flex-col min-h-screen">

            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary">SSO Admin</h1>
                <p className="text-sm opacity-70">Management Panel</p>
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
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({isActive}) =>
                                    isActive ? 'active bg-primary text-primary-content' : ''
                                }
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        </li>
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