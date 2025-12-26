import {useEffect, useState} from 'react';
import {
    FaBars,
    FaBell,
    FaCalendarAlt,
    FaChartLine,
    FaCheckCircle,
    FaCog,
    FaDatabase,
    FaExclamationTriangle,
    FaGlobe,
    FaMoon,
    FaPlug,
    FaQuestionCircle,
    FaSearch,
    FaServer,
    FaSignOutAlt,
    FaSun,
    FaTimes,
    FaUser,
    FaUserFriends
} from 'react-icons/fa';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from "../../AuthProvider.jsx";


const Header = ({toggleSidebar, isSidebarOpen, currentPage = 'Dashboard', pageStats = {}}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const navigate = useNavigate();
    const {logout} = useAuth();
    const {realm} = useParams();
    const realmUsed = realm || 'master';

    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'user',
            message: 'New user registration from TechCorp',
            time: '5 min ago',
            read: false,
            priority: 'info'
        },
        {
            id: 2,
            type: 'system',
            message: 'System update completed successfully',
            time: '1 hour ago',
            read: true,
            priority: 'success'
        },
        {
            id: 3,
            type: 'warning',
            message: 'API rate limit warning (90% threshold)',
            time: '2 hours ago',
            read: false,
            priority: 'warning'
        },
        {
            id: 4,
            type: 'security',
            message: 'Multiple failed login attempts detected',
            time: '3 hours ago',
            read: false,
            priority: 'error'
        },
        {id: 5, type: 'system', message: 'Database backup completed', time: 'Yesterday', read: true, priority: 'info'},
    ]);

    const [systemStatus, setSystemStatus] = useState({
        api: {status: 'healthy', responseTime: 124},
        database: {status: 'healthy', connections: '45/100'},
        memory: {status: 'warning', usage: '78%'},
        uptime: {status: 'healthy', value: '99.95%'}
    });

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const unreadNotifications = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({...n, read: true})));
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'user':
                return <FaUser className="text-info"/>;
            case 'system':
                return <FaServer className="text-success"/>;
            case 'security':
                return <FaExclamationTriangle className="text-error"/>;
            case 'warning':
                return <FaExclamationTriangle className="text-warning"/>;
            default:
                return <FaBell className="text-base-content/70"/>;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'healthy':
                return 'text-success';
            case 'warning':
                return 'text-warning';
            case 'error':
                return 'text-error';
            default:
                return 'text-base-content/70';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'healthy':
                return <FaCheckCircle className="text-success"/>;
            case 'warning':
                return <FaExclamationTriangle className="text-warning"/>;
            default:
                return <FaExclamationTriangle className="text-error"/>;
        }
    };

    const quickActions = [
        {label: 'Add User', icon: <FaUser/>, path: '/realm/{realm}/users?create=true'},
        {label: 'Create Realm', icon: <FaGlobe/>, path: '/realm/{realm}/realms?create=true'},
    ];

    return (
        <header className="sticky top-0 z-40 bg-base-100/95 backdrop-blur-sm border-b border-base-300 shadow-sm">
            <div className="navbar px-4 lg:px-6">
                <div className="flex-none lg:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="btn btn-ghost btn-square hover:bg-base-300"
                        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                    >
                        {isSidebarOpen ? <FaTimes size={20}/> : <FaBars size={20}/>}
                    </button>
                </div>

                <div className="flex-1 px-2 lg:px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <div>
                            <h2 className="text-xl font-bold text-base-content">
                                {currentPage}
                                {pageStats.total && (
                                    <span className="ml-2 badge badge-sm badge-outline">
                                        {pageStats.total} total
                                    </span>
                                )}
                            </h2>
                        </div>

                        <div className="breadcrumbs text-sm hidden md:block">
                            <ul>
                                <li>
                                    <a href="/" className="flex items-center gap-1 hover:text-primary">
                                        <FaChartLine className="text-xs"/>
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <span className="text-base-content/70">{currentPage}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {pageStats.items && (
                        <div className="flex gap-3 mt-2">
                            {Object.entries(pageStats.items).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-1">
                                    <span className="text-xs opacity-70 capitalize">{key}:</span>
                                    <span className="text-sm font-semibold">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex-none hidden lg:block mr-4">
                    <div className="form-control">
                        <div className="relative">
                            <div className="input input-sm input-bordered flex items-center gap-2 w-72">
                                <FaSearch className="opacity-50"/>
                                <input
                                    type="text"
                                    placeholder="Search users, realms, logs..."
                                    className="w-full bg-transparent placeholder:opacity-70"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="btn btn-xs btn-ghost btn-circle"
                                        aria-label="Clear search"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                            {searchQuery && (
                                <div
                                    className="absolute top-full mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg z-50">
                                    <div className="p-2">
                                        <div className="text-xs font-semibold opacity-70 mb-2">Quick Actions</div>
                                        <ul className="menu menu-compact">
                                            <li>
                                                <a href={`/realm/${realmUsed}/users?search=${searchQuery}`}>
                                                    <FaUser/> Search users for "{searchQuery}"
                                                </a>
                                            </li>
                                            <li>
                                                <a href={`/realm/${realmUsed}/logs?search=${searchQuery}`}>
                                                    <FaDatabase/> Search logs for "{searchQuery}"
                                                </a>
                                            </li>
                                            <li>
                                                <a href={`/realm/${realmUsed}/companies?search=${searchQuery}`}>
                                                    <FaUserFriends/> Search companies for "{searchQuery}"
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-none">
                    <div className="flex items-center gap-1 lg:gap-2">

                        <div className="lg:hidden dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-ghost btn-square">
                                <FaSearch size={18}/>
                            </div>
                            <div className="dropdown-content z-50 mt-3 p-2 shadow-lg bg-base-100 rounded-box w-80">
                                <div className="form-control">
                                    <input
                                        type="text"
                                        placeholder="Search users, realms, logs..."
                                        className="input input-bordered"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end hidden sm:block">
                            <div tabIndex={0} className="btn btn-sm btn-outline">
                                Quick Actions
                            </div>
                            <div className="dropdown-content z-50 mt-3 p-2 shadow-lg bg-base-100 rounded-box w-56">
                                <div className="p-2">
                                    <h3 className="font-bold mb-2">Quick Actions</h3>
                                    <ul className="menu menu-compact">
                                        {quickActions.map(action => (
                                            <li key={action.label}>
                                                <a
                                                    href={action.path.replace('{realm}', realmUsed)}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(action.path);
                                                    }}
                                                    className="py-2"
                                                >
                                                    {action.icon}
                                                    {action.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-ghost btn-square hover:bg-base-300">
                                <FaQuestionCircle size={18}/>
                            </div>
                            <div className="dropdown-content z-50 mt-3 p-2 shadow-lg bg-base-100 rounded-box w-64">
                                <div className="p-3">
                                    <h3 className="font-bold mb-3">Help & Support</h3>
                                    <div className="space-y-2">
                                        <a href="/docs"
                                           className="flex items-center gap-2 p-2 hover:bg-base-200 rounded">
                                            <div className="bg-primary/10 p-2 rounded">
                                                <FaQuestionCircle className="text-primary"/>
                                            </div>
                                            <div>
                                                <div className="font-medium">Documentation</div>
                                                <div className="text-xs opacity-70">User guides and API docs</div>
                                            </div>
                                        </a>
                                        <a href="/support"
                                           className="flex items-center gap-2 p-2 hover:bg-base-200 rounded">
                                            <div className="bg-info/10 p-2 rounded">
                                                <FaCog className="text-info"/>
                                            </div>
                                            <div>
                                                <div className="font-medium">Contact Support</div>
                                                <div className="text-xs opacity-70">24/7 technical support</div>
                                            </div>
                                        </a>
                                        <a href="/tutorials"
                                           className="flex items-center gap-2 p-2 hover:bg-base-200 rounded">
                                            <div className="bg-success/10 p-2 rounded">
                                                <FaChartLine className="text-success"/>
                                            </div>
                                            <div>
                                                <div className="font-medium">Video Tutorials</div>
                                                <div className="text-xs opacity-70">Step-by-step guides</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-ghost btn-square hover:bg-base-300">
                                <FaCog size={18}/>
                            </div>
                            <div className="dropdown-content z-50 mt-3 p-2 shadow-lg bg-base-100 rounded-box w-48">
                                <div className="p-3">
                                    <h3 className="font-bold mb-3">Settings</h3>
                                    <ul className="menu menu-compact">
                                        <li><a href={`/realm/${realmUsed}/profile/settings`} className="py-2">Profile
                                            Settings</a></li>
                                        <li><a href={`/realm/${realmUsed}/profile/settings/security`}
                                               className="py-2">Security</a></li>
                                        <li><a href={`/realm/${realmUsed}/profile/settings/notifications`}
                                               className="py-2">Notifications</a></li>
                                        <li><a href={`/realm/${realmUsed}/profile/settings/preferences`}
                                               className="py-2">Preferences</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={toggleDarkMode}
                            className="btn btn-ghost btn-square hover:bg-base-300"
                            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                            data-tip={isDarkMode ? "Light Mode" : "Dark Mode"}
                        >
                            {isDarkMode ? <FaSun size={18}/> : <FaMoon size={18}/>}
                        </button>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-ghost btn-square hover:bg-base-300 relative">
                                <FaBell size={18}/>
                                {unreadNotifications > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 badge badge-error badge-xs min-h-4 min-w-4 animate-pulse">
                                        {unreadNotifications}
                                    </span>
                                )}
                            </div>
                            <div
                                className="dropdown-content z-50 mt-3 shadow-xl bg-base-100 rounded-box w-96 max-h-[80vh] overflow-hidden">
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-lg">Notifications</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={markAllAsRead}
                                                className="btn btn-xs btn-ghost"
                                            >
                                                Mark all read
                                            </button>
                                        </div>
                                    </div>

                                    <div className="max-h-96 overflow-y-auto pr-2">
                                        {notifications.length > 0 ? (
                                            <div className="space-y-3">
                                                {notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-3 rounded-lg transition-colors ${!notification.read
                                                            ? 'bg-primary/5 border-l-4 border-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                        }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-1">
                                                                {getNotificationIcon(notification.type)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start">
                                                                    <p className="font-medium text-sm line-clamp-2">{notification.message}</p>
                                                                    <span
                                                                        className="text-xs opacity-70 whitespace-nowrap ml-2">
                                                                        {notification.time}
                                                                    </span>
                                                                </div>
                                                                {!notification.read && (
                                                                    <div className="flex justify-end mt-2">
                                                                        <button className="btn btn-xs btn-primary">
                                                                            View Details
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <FaBell className="text-3xl opacity-30 mx-auto mb-3"/>
                                                <p className="opacity-70">No notifications</p>
                                                <p className="text-xs opacity-50 mt-1">You're all caught up!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-ghost flex items-center gap-3 px-3 hover:bg-base-300">
                                <div className="avatar online">
                                    <div className="w-9 rounded-full bg-gradient-to-br from-primary to-secondary">
                                        <span className="text-lg font-bold text-white">A</span>
                                    </div>
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="font-semibold leading-none">Admin User</p>
                                    <p className="text-xs opacity-70">Super Admin</p>
                                </div>
                            </div>

                            <div className="dropdown-content z-50 mt-3 p-2 shadow-xl bg-base-100 rounded-box w-64">
                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="avatar">
                                            <div
                                                className="w-12 rounded-full bg-linear-to-br from-primary to-secondary">
                                                <span className="text-xl font-bold text-white">A</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold truncate">Admin User</p>
                                            <p className="text-sm opacity-70 truncate">admin@example.com</p>
                                            <div className="badge badge-sm badge-primary mt-1">Super Admin</div>
                                        </div>
                                    </div>

                                    <ul className="menu menu-compact">
                                        <li>
                                            <a href={`/realm/${realmUsed}/profile/settings`} className="py-3">
                                                <FaCog className="opacity-70"/>
                                                Account Settings
                                            </a>
                                        </li>
                                        <li className="divider my-2"></li>
                                        <li>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    logout();
                                                    navigate('/auth/login');
                                                }}
                                                className="w-full text-left text-error"
                                            >
                                                <FaSignOutAlt className="opacity-70"/>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-6 py-2 bg-base-200/50 border-t border-base-300 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 ${getStatusColor(systemStatus.api.status)}`}>
                                {getStatusIcon(systemStatus.api.status)}
                                <span>API: <span
                                    className="font-semibold">{systemStatus.api.responseTime}ms</span></span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 ${getStatusColor(systemStatus.database.status)}`}>
                                <FaDatabase className="text-sm"/>
                                <span>DB: <span
                                    className="font-semibold">{systemStatus.database.connections}</span></span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 ${getStatusColor(systemStatus.memory.status)}`}>
                                <FaServer className="text-sm"/>
                                <span>Memory: <span className="font-semibold">{systemStatus.memory.usage}</span></span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 ${getStatusColor(systemStatus.uptime.status)}`}>
                                <FaPlug className="text-sm"/>
                                <span>Uptime: <span className="font-semibold">{systemStatus.uptime.value}</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 opacity-70">
                            <FaCalendarAlt className="text-xs"/>
                            <span>Today: {new Date().toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="opacity-70">
                            Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;