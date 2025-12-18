import { useState, useEffect } from 'react';
import {
    FaUsers,
    FaKey,
    FaBuilding,
    FaChartLine,
    FaUserShield,
    FaExclamationTriangle,
    FaSignInAlt,
    FaCalendarAlt,
    FaDownload,
    FaFilter,
    FaSync
} from 'react-icons/fa';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const StatCard = ({ title, value, change, icon, color, loading = false }) => (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="card-body p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-70 mb-1">{title}</p>
                    {loading ? (
                        <div className="h-10 w-24 bg-base-300 animate-pulse rounded"></div>
                    ) : (
                        <p className="text-3xl font-bold">{value}</p>
                    )}
                    {change && (
                        <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                            {change} from last month
                        </p>
                    )}
                </div>
                <div className={`text-3xl text-${color} p-3 rounded-full bg-${color}/10`}>
                    {icon}
                </div>
            </div>
        </div>
    </div>
);

const loginTrendData = [
    { date: 'Jan 1', logins: 420, failures: 12 },
    { date: 'Jan 8', logins: 520, failures: 8 },
    { date: 'Jan 15', logins: 580, failures: 5 },
    { date: 'Jan 22', logins: 620, failures: 10 },
    { date: 'Jan 29', logins: 710, failures: 15 },
    { date: 'Feb 5', logins: 680, failures: 7 },
    { date: 'Feb 12', logins: 750, failures: 9 },
];

const realmUsageData = [
    { name: 'Default Realm', users: 1250, sessions: 342 },
    { name: 'Enterprise', users: 450, sessions: 89 },
    { name: 'Partner', users: 180, sessions: 42 },
    { name: 'Mobile', users: 850, sessions: 210 },
    { name: 'Testing', users: 25, sessions: 5 },
];

const authMethodsData = [
    { name: 'SAML 2.0', value: 65, color: '#3B82F6' },
    { name: 'OAuth 2.0', value: 20, color: '#8B5CF6' },
    { name: 'LDAP', value: 10, color: '#10B981' },
    { name: 'CAS', value: 5, color: '#F59E0B' },
];

const securityEventsData = [
    { name: 'Failed Logins', value: 145, color: '#EF4444' },
    { name: 'Password Reset', value: 89, color: '#F59E0B' },
    { name: 'MFA Attempts', value: 234, color: '#3B82F6' },
    { name: 'Suspicious IP', value: 12, color: '#8B5CF6' },
];

const activeSessionsData = [
    { hour: '00:00', sessions: 120 },
    { hour: '04:00', sessions: 85 },
    { hour: '08:00', sessions: 320 },
    { hour: '12:00', sessions: 580 },
    { hour: '16:00', sessions: 620 },
    { hour: '20:00', sessions: 450 },
];

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [timeRange, setTimeRange] = useState('7d');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setStats([
                { title: 'Total Users', value: '1,234', change: '+12.5%', icon: <FaUsers />, color: 'primary' },
                { title: 'Active Realms', value: '24', change: '+2', icon: <FaKey />, color: 'secondary' },
                { title: 'Companies', value: '48', change: '+5', icon: <FaBuilding />, color: 'accent' },
                { title: 'Monthly Logins', value: '12.5k', change: '+8.2%', icon: <FaChartLine />, color: 'info' },
                { title: 'Active Sessions', value: '342', change: '+15%', icon: <FaSignInAlt />, color: 'success' },
                { title: 'Security Events', value: '18', change: '-3', icon: <FaExclamationTriangle />, color: 'warning' },
            ]);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 800);
    };

    const handleExport = () => {
        alert('Exporting dashboard data...');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                    <p className="text-base-content/70">Welcome to SSO Admin Panel - Real-time monitoring and analytics</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} className="btn btn-ghost">
                            <FaFilter /> Time Range: {timeRange === '7d' ? '7 Days' : timeRange === '30d' ? '30 Days' : 'Today'}
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
                            <li><a onClick={() => setTimeRange('today')}>Today</a></li>
                            <li><a onClick={() => setTimeRange('7d')}>Last 7 Days</a></li>
                            <li><a onClick={() => setTimeRange('30d')}>Last 30 Days</a></li>
                        </ul>
                    </div>
                    <button className="btn btn-ghost" onClick={handleRefresh}>
                        <FaSync className={isLoading ? 'animate-spin' : ''} /> Refresh
                    </button>
                    <button className="btn btn-primary" onClick={handleExport}>
                        <FaDownload /> Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="card bg-base-100 shadow-lg">
                            <div className="card-body p-6">
                                <div className="h-4 w-24 bg-base-300 animate-pulse rounded mb-2"></div>
                                <div className="h-10 w-32 bg-base-300 animate-pulse rounded"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    stats?.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="card-title">Login Activity Trend</h2>
                            <div className="badge badge-primary">Last 30 days</div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={loginTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="date" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="logins"
                                        stackId="1"
                                        stroke="#3B82F6"
                                        fill="#3B82F6"
                                        fillOpacity={0.2}
                                        name="Successful Logins"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="failures"
                                        stackId="2"
                                        stroke="#EF4444"
                                        fill="#EF4444"
                                        fillOpacity={0.2}
                                        name="Failed Attempts"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="card-title">Realm Usage Distribution</h2>
                            <div className="badge badge-secondary">Active Users</div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={realmUsageData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="name" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="users"
                                        fill="#8B5CF6"
                                        radius={[4, 4, 0, 0]}
                                        name="Total Users"
                                    />
                                    <Bar
                                        dataKey="sessions"
                                        fill="#10B981"
                                        radius={[4, 4, 0, 0]}
                                        name="Active Sessions"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Authentication Methods</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={authMethodsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry) => `${entry.name}: ${entry.value}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {authMethodsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '0.5rem'
                                        }}
                                        formatter={(value) => [`${value}%`, 'Usage']}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Security Events Overview</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={securityEventsData}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                                    <XAxis type="number" stroke="#9CA3AF" />
                                    <YAxis type="category" dataKey="name" stroke="#9CA3AF" width={100} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        radius={[0, 4, 4, 0]}
                                        label={{ position: 'right' }}
                                    >
                                        {securityEventsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="card-title">Active Sessions (24h)</h2>
                            <div className="badge badge-success">Peak: 620</div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={activeSessionsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="hour" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sessions"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title mb-4">Recent Security Events</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>Time</th>
                                <th>Event Type</th>
                                <th>User</th>
                                <th>IP Address</th>
                                <th>Realm</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>10:30 AM</td>
                                <td><span className="badge badge-error">Failed Login</span></td>
                                <td>john.doe@company.com</td>
                                <td>192.168.1.100</td>
                                <td>Default Realm</td>
                                <td><span className="badge badge-warning">Investigation</span></td>
                            </tr>
                            <tr>
                                <td>09:15 AM</td>
                                <td><span className="badge badge-success">MFA Enabled</span></td>
                                <td>admin@system.com</td>
                                <td>10.0.0.50</td>
                                <td>Admin Realm</td>
                                <td><span className="badge badge-success">Completed</span></td>
                            </tr>
                            <tr>
                                <td>08:45 AM</td>
                                <td><span className="badge badge-info">New User</span></td>
                                <td>alice@partner.com</td>
                                <td>203.0.113.5</td>
                                <td>Partner Realm</td>
                                <td><span className="badge badge-success">Active</span></td>
                            </tr>
                            <tr>
                                <td>Yesterday</td>
                                <td><span className="badge badge-warning">Password Reset</span></td>
                                <td>bob@company.com</td>
                                <td>192.168.1.200</td>
                                <td>Default Realm</td>
                                <td><span className="badge badge-success">Completed</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-ghost btn-sm">View All Events</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-warning">
                            <FaExclamationTriangle className="mr-2" />
                            System Health
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span>API Response Time</span>
                                <span className="badge badge-success">124ms</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Database Connections</span>
                                <span className="badge badge-success">45/100</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Memory Usage</span>
                                <span className="badge badge-warning">78%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Uptime</span>
                                <span className="badge badge-success">99.95%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-info">
                            <FaCalendarAlt className="mr-2" />
                            Upcoming Maintenance
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span>Database Backup</span>
                                <span className="badge badge-info">Tonight 2:00 AM</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Security Patches</span>
                                <span className="badge badge-warning">Scheduled: Jan 25</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Certificate Renewal</span>
                                <span className="badge badge-error">Expires: Feb 15</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Monthly Report</span>
                                <span className="badge badge-success">Auto-generates: EOM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;