import { useState, useEffect } from 'react';
import {
    FaBell,
    FaEnvelope,
    FaMobileAlt,
    FaDesktop,
    FaSlack,
    FaDiscord,
    FaTeamspeak,
    FaCalendarAlt,
    FaClock,
    FaFilter,
    FaPause,
    FaPlay,
    FaTrash,
    FaSave,
    FaPlus,
    FaEdit,
    FaTimes,
    FaCheckCircle,
    FaExclamationTriangle,
    FaCog,
    FaHistory,
    FaChartLine,
    FaUserShield,
    FaKey,
    FaUsers,
    FaBuilding,
    FaServer,
    FaDatabase,
    FaShieldAlt,
    FaGlobe,
    FaBellSlash
} from 'react-icons/fa';

const ProfileNotifications = () => {
    const [notifications, setNotifications] = useState({
        email: {
            enabled: true,
            categories: {
                security: {
                    name: 'Security Alerts',
                    description: 'Critical security alerts and warnings',
                    enabled: true,
                    priority: 'high',
                    subcategories: {
                        failedLogins: true,
                        suspiciousActivity: true,
                        passwordChanges: true,
                        newDeviceLogins: true,
                        adminActions: true
                    }
                },
                system: {
                    name: 'System Updates',
                    description: 'System updates and maintenance notifications',
                    enabled: true,
                    priority: 'medium',
                    subcategories: {
                        maintenance: true,
                        updates: true,
                        backups: true,
                        performance: true
                    }
                },
                user: {
                    name: 'User Activity',
                    description: 'User-related activities and changes',
                    enabled: true,
                    priority: 'low',
                    subcategories: {
                        newUsers: true,
                        roleChanges: true,
                        profileUpdates: false,
                        deactivations: true
                    }
                },
                reports: {
                    name: 'Reports & Analytics',
                    description: 'Weekly reports and analytics summaries',
                    enabled: false,
                    priority: 'low',
                    subcategories: {
                        weeklyReports: false,
                        monthlyAnalytics: false,
                        usageStatistics: false
                    }
                }
            }
        },

        push: {
            enabled: true,
            categories: {
                immediate: {
                    name: 'Immediate Alerts',
                    description: 'Real-time critical notifications',
                    enabled: true,
                    priority: 'high',
                    sound: true,
                    vibration: true
                },
                daily: {
                    name: 'Daily Summary',
                    description: 'Daily activity summaries',
                    enabled: false,
                    priority: 'low',
                    sound: false,
                    vibration: false
                }
            }
        },

        integrations: {
            slack: {
                enabled: true,
                webhook: 'https://hooks.slack.com/services/...',
                channel: '#security-alerts',
                categories: ['security', 'system']
            },
            discord: {
                enabled: false,
                webhook: '',
                channel: '',
                categories: []
            },
            teams: {
                enabled: false,
                webhook: '',
                channel: '',
                categories: []
            }
        },

        settings: {
            quietHours: {
                enabled: true,
                start: '22:00',
                end: '08:00',
                days: ['sat', 'sun']
            },
            digest: {
                enabled: true,
                frequency: 'daily', // 'daily', 'weekly', 'monthly'
                time: '09:00',
                day: 'monday' // for weekly
            },
            snooze: {
                enabled: false,
                duration: 60, // minutes
                until: null
            }
        }
    });

    const [notificationHistory, setNotificationHistory] = useState([
        {
            id: 1,
            type: 'security',
            title: 'Failed Login Attempt',
            message: 'Multiple failed login attempts detected from IP 185.220.101.4',
            channel: 'email',
            timestamp: '2024-01-15T14:30:00',
            read: false,
            priority: 'high'
        },
        {
            id: 2,
            type: 'system',
            title: 'System Update Completed',
            message: 'Security patches have been successfully applied',
            channel: 'push',
            timestamp: '2024-01-15T10:15:00',
            read: true,
            priority: 'medium'
        },
        {
            id: 3,
            type: 'user',
            title: 'New User Registered',
            message: 'John Doe has been added to the system',
            channel: 'email',
            timestamp: '2024-01-14T16:45:00',
            read: true,
            priority: 'low'
        },
        {
            id: 4,
            type: 'security',
            title: 'Password Changed',
            message: 'Your account password has been updated',
            channel: 'push',
            timestamp: '2024-01-14T09:30:00',
            read: true,
            priority: 'high'
        },
        {
            id: 5,
            type: 'system',
            title: 'Scheduled Maintenance',
            message: 'System maintenance scheduled for January 20, 2:00 AM',
            channel: 'email',
            timestamp: '2024-01-13T14:00:00',
            read: true,
            priority: 'medium'
        },
        {
            id: 6,
            type: 'reports',
            title: 'Weekly Security Report',
            message: 'Weekly security report is available for download',
            channel: 'email',
            timestamp: '2024-01-13T09:00:00',
            read: false,
            priority: 'low'
        },
        {
            id: 7,
            type: 'security',
            title: 'New Device Login',
            message: 'Login detected from Firefox on macOS',
            channel: 'push',
            timestamp: '2024-01-12T18:20:00',
            read: true,
            priority: 'high'
        }
    ]);

    const [filters, setFilters] = useState({
        type: 'all',
        channel: 'all',
        readStatus: 'all',
        timeRange: '7d'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempSettings, setTempSettings] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);

    const [stats, setStats] = useState({
        total: 0,
        unread: 0,
        today: 0,
        highPriority: 0
    });

    useEffect(() => {
        const total = notificationHistory.length;
        const unread = notificationHistory.filter(n => !n.read).length;
        const today = notificationHistory.filter(n => {
            const date = new Date(n.timestamp);
            const today = new Date();
            return date.toDateString() === today.toDateString();
        }).length;
        const highPriority = notificationHistory.filter(n => n.priority === 'high').length;

        setStats({ total, unread, today, highPriority });
    }, [notificationHistory]);

    const toggleCategory = (channel, categoryId) => {
        setNotifications(prev => ({
            ...prev,
            [channel]: {
                ...prev[channel],
                categories: {
                    ...prev[channel].categories,
                    [categoryId]: {
                        ...prev[channel].categories[categoryId],
                        enabled: !prev[channel].categories[categoryId].enabled
                    }
                }
            }
        }));
    };

    const toggleSubcategory = (channel, categoryId, subcategoryId) => {
        setNotifications(prev => ({
            ...prev,
            [channel]: {
                ...prev[channel],
                categories: {
                    ...prev[channel].categories,
                    [categoryId]: {
                        ...prev[channel].categories[categoryId],
                        subcategories: {
                            ...prev[channel].categories[categoryId].subcategories,
                            [subcategoryId]: !prev[channel].categories[categoryId].subcategories[subcategoryId]
                        }
                    }
                }
            }
        }));
    };

    const toggleIntegration = (integrationId) => {
        setNotifications(prev => ({
            ...prev,
            integrations: {
                ...prev.integrations,
                [integrationId]: {
                    ...prev.integrations[integrationId],
                    enabled: !prev.integrations[integrationId].enabled
                }
            }
        }));
    };

    const markAsRead = (id) => {
        setNotificationHistory(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotificationHistory(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const deleteNotification = (id) => {
        setNotificationHistory(prev => prev.filter(notification => notification.id !== id));
    };

    const clearAll = () => {
        if (window.confirm('Are you sure you want to clear all notifications?')) {
            setNotificationHistory([]);
        }
    };

    const filteredNotifications = notificationHistory.filter(notification => {
        if (filters.type !== 'all' && notification.type !== filters.type) return false;
        if (filters.channel !== 'all' && notification.channel !== filters.channel) return false;
        if (filters.readStatus !== 'all') {
            if (filters.readStatus === 'read' && !notification.read) return false;
            if (filters.readStatus === 'unread' && notification.read) return false;
        }

        const notificationDate = new Date(notification.timestamp);
        const now = new Date();
        const diffDays = Math.floor((now - notificationDate) / (1000 * 60 * 60 * 24));

        if (filters.timeRange === 'today' && diffDays > 0) return false;
        if (filters.timeRange === '7d' && diffDays > 7) return false;
        if (filters.timeRange === '30d' && diffDays > 30) return false;

        return true;
    });

    const startEditing = () => {
        setTempSettings(JSON.parse(JSON.stringify(notifications)));
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setTempSettings(null);
    };

    const saveSettings = () => {
        setSaveStatus('saving');

        setTimeout(() => {
            setNotifications(tempSettings);
            setIsEditing(false);
            setTempSettings(null);
            setSaveStatus('success');

            setTimeout(() => setSaveStatus(null), 3000);
        }, 1000);
    };

    const updateSetting = (path, value) => {
        const [category, subcategory, ...rest] = path.split('.');

        setTempSettings(prev => {
            const newSettings = JSON.parse(JSON.stringify(prev));

            if (rest.length > 0) {
                let current = newSettings;
                const fullPath = path.split('.');
                for (let i = 0; i < fullPath.length - 1; i++) {
                    current = current[fullPath[i]];
                }
                current[fullPath[fullPath.length - 1]] = value;
            } else if (subcategory) {
                newSettings[category][subcategory] = value;
            } else {
                newSettings[category] = value;
            }

            return newSettings;
        });
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'security': return <FaShieldAlt className="text-error" />;
            case 'system': return <FaServer className="text-info" />;
            case 'user': return <FaUsers className="text-success" />;
            case 'reports': return <FaChartLine className="text-warning" />;
            default: return <FaBell className="text-base-content/70" />;
        }
    };

    const getChannelIcon = (channel) => {
        switch(channel) {
            case 'email': return <FaEnvelope className="text-primary" />;
            case 'push': return <FaBell className="text-secondary" />;
            default: return <FaBell />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaBell className="text-primary" />
                        Notification Settings
                    </h1>
                    <p className="text-base-content/70">
                        Configure how and when you receive notifications
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {saveStatus === 'saving' && (
                        <div className="badge badge-info gap-1">
                            <span className="loading loading-spinner loading-xs"></span>
                            Saving...
                        </div>
                    )}
                    {saveStatus === 'success' && (
                        <div className="badge badge-success gap-1">
                            <FaCheckCircle /> Saved
                        </div>
                    )}

                    {isEditing ? (
                        <>
                            <button
                                className="btn btn-ghost"
                                onClick={cancelEditing}
                            >
                                <FaTimes /> Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={saveSettings}
                                disabled={saveStatus === 'saving'}
                            >
                                {saveStatus === 'saving' ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave /> Save Changes
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={startEditing}
                        >
                            <FaEdit /> Edit Settings
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Notifications</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <div className="p-2 rounded-full bg-primary/20 text-primary">
                                <FaBell />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span className="text-error">{stats.unread} unread</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Today</p>
                                <p className="text-2xl font-bold">{stats.today}</p>
                            </div>
                            <div className="p-2 rounded-full bg-info/20 text-info">
                                <FaCalendarAlt />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>New notifications today</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">High Priority</p>
                                <p className="text-2xl font-bold">{stats.highPriority}</p>
                            </div>
                            <div className="p-2 rounded-full bg-error/20 text-error">
                                <FaExclamationTriangle />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Require immediate attention</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Email Notifications</p>
                                <p className="text-xl font-bold">
                                    {notifications.email.enabled ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                            <div className="p-2 rounded-full bg-success/20 text-success">
                                <FaEnvelope />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>{notifications.email.enabled ? 'Active' : 'Inactive'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title mb-6">Notification Channels</h2>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <FaEnvelope className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Email Notifications</h3>
                                        <p className="text-sm opacity-70">Receive notifications via email</p>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer gap-4">
                                        <span className="label-text font-medium">
                                          {notifications.email.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-primary"
                                            checked={isEditing ? tempSettings?.email.enabled : notifications.email.enabled}
                                            onChange={(e) => {
                                                if (isEditing) {
                                                    updateSetting('email.enabled', e.target.checked);
                                                } else {
                                                    setNotifications(prev => ({
                                                        ...prev,
                                                        email: { ...prev.email, enabled: e.target.checked }
                                                    }));
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>

                            {notifications.email.enabled && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(notifications.email.categories).map(([id, category]) => (
                                        <div key={id} className="card bg-base-200">
                                            <div className="card-body p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-primary"
                                                            checked={isEditing ? tempSettings?.email.categories[id].enabled : category.enabled}
                                                            onChange={(e) => {
                                                                if (isEditing) {
                                                                    updateSetting(`email.categories.${id}.enabled`, e.target.checked);
                                                                } else {
                                                                    toggleCategory('email', id);
                                                                }
                                                            }}
                                                        />
                                                        <div>
                                                            <div className="font-bold">{category.name}</div>
                                                            <div className="text-xs opacity-70">{category.description}</div>
                                                        </div>
                                                    </div>
                                                    <span className={`badge ${
                                                        category.priority === 'high' ? 'badge-error' :
                                                            category.priority === 'medium' ? 'badge-warning' : 'badge-info'
                                                    }`}>
                            {category.priority}
                          </span>
                                                </div>

                                                {category.enabled && category.subcategories && (
                                                    <div className="space-y-2 mt-3">
                                                        {Object.entries(category.subcategories).map(([subId, subEnabled]) => (
                                                            <div key={subId} className="form-control">
                                                                <label className="label cursor-pointer justify-start gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="checkbox checkbox-xs"
                                                                        checked={isEditing ? tempSettings?.email.categories[id].subcategories[subId] : subEnabled}
                                                                        onChange={(e) => {
                                                                            if (isEditing) {
                                                                                updateSetting(`email.categories.${id}.subcategories.${subId}`, e.target.checked);
                                                                            } else {
                                                                                toggleSubcategory('email', id, subId);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span className="label-text capitalize text-sm">
                                    {subId.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                  </span>
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-secondary/10">
                                        <FaBell className="text-secondary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Push Notifications</h3>
                                        <p className="text-sm opacity-70">In-app and browser notifications</p>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer gap-4">
                                        <span className="label-text font-medium">
                                          {notifications.push.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-primary"
                                            checked={isEditing ? tempSettings?.push.enabled : notifications.push.enabled}
                                            onChange={(e) => {
                                                if (isEditing) {
                                                    updateSetting('push.enabled', e.target.checked);
                                                } else {
                                                    setNotifications(prev => ({
                                                        ...prev,
                                                        push: { ...prev.push, enabled: e.target.checked }
                                                    }));
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>

                            {notifications.push.enabled && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(notifications.push.categories).map(([id, category]) => (
                                        <div key={id} className="card bg-base-200">
                                            <div className="card-body p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-primary"
                                                            checked={isEditing ? tempSettings?.push.categories[id].enabled : category.enabled}
                                                            onChange={(e) => {
                                                                if (isEditing) {
                                                                    updateSetting(`push.categories.${id}.enabled`, e.target.checked);
                                                                } else {
                                                                    toggleCategory('push', id);
                                                                }
                                                            }}
                                                        />
                                                        <div>
                                                            <div className="font-bold">{category.name}</div>
                                                            <div className="text-xs opacity-70">{category.description}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {category.enabled && (
                                                    <div className="space-y-3 mt-3">
                                                        <div className="form-control">
                                                            <label className="label cursor-pointer justify-start gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    className="toggle toggle-sm toggle-primary"
                                                                    checked={isEditing ? tempSettings?.push.categories[id].sound : category.sound}
                                                                    onChange={(e) => {
                                                                        if (isEditing) {
                                                                            updateSetting(`push.categories.${id}.sound`, e.target.checked);
                                                                        } else {
                                                                            setNotifications(prev => ({
                                                                                ...prev,
                                                                                push: {
                                                                                    ...prev.push,
                                                                                    categories: {
                                                                                        ...prev.push.categories,
                                                                                        [id]: {
                                                                                            ...prev.push.categories[id],
                                                                                            sound: e.target.checked
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }));
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="label-text text-sm">Play sound</span>
                                                            </label>
                                                        </div>

                                                        <div className="form-control">
                                                            <label className="label cursor-pointer justify-start gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    className="toggle toggle-sm toggle-primary"
                                                                    checked={isEditing ? tempSettings?.push.categories[id].vibration : category.vibration}
                                                                    onChange={(e) => {
                                                                        if (isEditing) {
                                                                            updateSetting(`push.categories.${id}.vibration`, e.target.checked);
                                                                        } else {
                                                                            setNotifications(prev => ({
                                                                                ...prev,
                                                                                push: {
                                                                                    ...prev.push,
                                                                                    categories: {
                                                                                        ...prev.push.categories,
                                                                                        [id]: {
                                                                                            ...prev.push.categories[id],
                                                                                            vibration: e.target.checked
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }));
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="label-text text-sm">Vibration</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Third-Party Integrations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'slack', name: 'Slack', icon: <FaSlack className="text-purple-600" />, color: 'bg-purple-100' },
                                    { id: 'discord', name: 'Discord', icon: <FaDiscord className="text-indigo-600" />, color: 'bg-indigo-100' },
                                    { id: 'teams', name: 'Microsoft Teams', icon: <FaTeamspeak className="text-blue-600" />, color: 'bg-blue-100' }
                                ].map(integration => (
                                    <div key={integration.id} className="card bg-base-200">
                                        <div className="card-body p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${integration.color}`}>
                                                        <div className="text-xl">{integration.icon}</div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{integration.name}</div>
                                                        <div className="text-xs opacity-70">
                                                            {notifications.integrations[integration.id].enabled ? 'Connected' : 'Not connected'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="toggle toggle-primary toggle-sm"
                                                            checked={isEditing ? tempSettings?.integrations[integration.id].enabled : notifications.integrations[integration.id].enabled}
                                                            onChange={(e) => {
                                                                if (isEditing) {
                                                                    updateSetting(`integrations.${integration.id}.enabled`, e.target.checked);
                                                                } else {
                                                                    toggleIntegration(integration.id);
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            {notifications.integrations[integration.id].enabled && (
                                                <div className="space-y-2">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">Webhook URL</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input input-bordered input-sm"
                                                            placeholder="https://hooks.slack.com/services/..."
                                                            value={isEditing ? tempSettings?.integrations[integration.id].webhook : notifications.integrations[integration.id].webhook}
                                                            onChange={(e) => {
                                                                if (isEditing) {
                                                                    updateSetting(`integrations.${integration.id}.webhook`, e.target.value);
                                                                } else {
                                                                    setNotifications(prev => ({
                                                                        ...prev,
                                                                        integrations: {
                                                                            ...prev.integrations,
                                                                            [integration.id]: {
                                                                                ...prev.integrations[integration.id],
                                                                                webhook: e.target.value
                                                                            }
                                                                        }
                                                                    }));
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-xs">Channel</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="input input-bordered input-sm"
                                                            placeholder="#security-alerts"
                                                            value={isEditing ? tempSettings?.integrations[integration.id].channel : notifications.integrations[integration.id].channel}
                                                            onChange={(e) => {
                                                                if (isEditing) {
                                                                    updateSetting(`integrations.${integration.id}.channel`, e.target.value);
                                                                } else {
                                                                    setNotifications(prev => ({
                                                                        ...prev,
                                                                        integrations: {
                                                                            ...prev.integrations,
                                                                            [integration.id]: {
                                                                                ...prev.integrations[integration.id],
                                                                                channel: e.target.value
                                                                            }
                                                                        }
                                                                    }));
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-lg">Advanced Settings</h3>

                            <div className="card bg-base-200">
                                <div className="card-body p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-warning/10">
                                                <FaBellSlash className="text-warning" />
                                            </div>
                                            <div>
                                                <div className="font-bold">Quiet Hours</div>
                                                <div className="text-sm opacity-70">Mute non-critical notifications during specified hours</div>
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary toggle-sm"
                                                    checked={isEditing ? tempSettings?.settings.quietHours.enabled : notifications.settings.quietHours.enabled}
                                                    onChange={(e) => {
                                                        if (isEditing) {
                                                            updateSetting('settings.quietHours.enabled', e.target.checked);
                                                        } else {
                                                            setNotifications(prev => ({
                                                                ...prev,
                                                                settings: {
                                                                    ...prev.settings,
                                                                    quietHours: {
                                                                        ...prev.settings.quietHours,
                                                                        enabled: e.target.checked
                                                                    }
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {notifications.settings.quietHours.enabled && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Start Time</span>
                                                </label>
                                                <input
                                                    type="time"
                                                    className="input input-bordered"
                                                    value={isEditing ? tempSettings?.settings.quietHours.start : notifications.settings.quietHours.start}
                                                    onChange={(e) => {
                                                        if (isEditing) {
                                                            updateSetting('settings.quietHours.start', e.target.value);
                                                        } else {
                                                            setNotifications(prev => ({
                                                                ...prev,
                                                                settings: {
                                                                    ...prev.settings,
                                                                    quietHours: {
                                                                        ...prev.settings.quietHours,
                                                                        start: e.target.value
                                                                    }
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">End Time</span>
                                                </label>
                                                <input
                                                    type="time"
                                                    className="input input-bordered"
                                                    value={isEditing ? tempSettings?.settings.quietHours.end : notifications.settings.quietHours.end}
                                                    onChange={(e) => {
                                                        if (isEditing) {
                                                            updateSetting('settings.quietHours.end', e.target.value);
                                                        } else {
                                                            setNotifications(prev => ({
                                                                ...prev,
                                                                settings: {
                                                                    ...prev.settings,
                                                                    quietHours: {
                                                                        ...prev.settings.quietHours,
                                                                        end: e.target.value
                                                                    }
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Days</span>
                                                </label>
                                                <select
                                                    className="select select-bordered"
                                                    value={isEditing ? tempSettings?.settings.quietHours.days[0] : notifications.settings.quietHours.days[0]}
                                                    onChange={(e) => {
                                                        if (isEditing) {
                                                            updateSetting('settings.quietHours.days', [e.target.value]);
                                                        } else {
                                                            setNotifications(prev => ({
                                                                ...prev,
                                                                settings: {
                                                                    ...prev.settings,
                                                                    quietHours: {
                                                                        ...prev.settings.quietHours,
                                                                        days: [e.target.value]
                                                                    }
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                >
                                                    <option value="weekdays">Weekdays</option>
                                                    <option value="weekend">Weekend</option>
                                                    <option value="everyday">Every Day</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-info/10">
                                                <FaEnvelope className="text-info" />
                                            </div>
                                            <div>
                                                <div className="font-bold">Email Digest</div>
                                                <div className="text-sm opacity-70">Receive grouped notifications in a single email</div>
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary toggle-sm"
                                                    checked={isEditing ? tempSettings?.settings.digest.enabled : notifications.settings.digest.enabled}
                                                    onChange={(e) => {
                                                        if (isEditing) {
                                                            updateSetting('settings.digest.enabled', e.target.checked);
                                                        } else {
                                                            setNotifications(prev => ({
                                                                ...prev,
                                                                settings: {
                                                                    ...prev.settings,
                                                                    digest: {
                                                                        ...prev.settings.digest,
                                                                        enabled: e.target.checked
                                                                    }
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {notifications.settings.digest.enabled && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Frequency</span>
                                                </label>
                                                <select
                                                    className="select select-bordered"
                                                    value={isEditing ? tempSettings?.settings.digest.frequency : notifications.settings.digest.frequency}
                                                    onChange={(e) => {
                                                        if (isEditing) {
                                                            updateSetting('settings.digest.frequency', e.target.value);
                                                        } else {
                                                            setNotifications(prev => ({
                                                                ...prev,
                                                                settings: {
                                                                    ...prev.settings,
                                                                    digest: {
                                                                        ...prev.settings.digest,
                                                                        frequency: e.target.value
                                                                    }
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                >
                                                    <option value="daily">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                </select>
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Time</span>
                                                </label>
                                                <input
                                                    type="time"
                                                    className="input input-bordered"
                                                    value={isEditing ? tempSettings?.settings.digest.time : notifications.settings.digest.time}
                                                    onChange={(e) => {
                                                        if (isEditing) {
                                                            updateSetting('settings.digest.time', e.target.value);
                                                        } else {
                                                            setNotifications(prev => ({
                                                                ...prev,
                                                                settings: {
                                                                    ...prev.settings,
                                                                    digest: {
                                                                        ...prev.settings.digest,
                                                                        time: e.target.value
                                                                    }
                                                                }
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="card-title">Notification History</h2>
                            <p className="text-base-content/70">View and manage your notification history</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={markAllAsRead}
                                disabled={filteredNotifications.every(n => n.read)}
                            >
                                <FaCheckCircle /> Mark All as Read
                            </button>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={clearAll}
                                disabled={filteredNotifications.length === 0}
                            >
                                <FaTrash /> Clear All
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <select
                            className="select select-bordered select-sm"
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                        >
                            <option value="all">All Types</option>
                            <option value="security">Security</option>
                            <option value="system">System</option>
                            <option value="user">User</option>
                            <option value="reports">Reports</option>
                        </select>

                        <select
                            className="select select-bordered select-sm"
                            value={filters.channel}
                            onChange={(e) => setFilters(prev => ({ ...prev, channel: e.target.value }))}
                        >
                            <option value="all">All Channels</option>
                            <option value="email">Email</option>
                            <option value="push">Push</option>
                        </select>

                        <select
                            className="select select-bordered select-sm"
                            value={filters.readStatus}
                            onChange={(e) => setFilters(prev => ({ ...prev, readStatus: e.target.value }))}
                        >
                            <option value="all">All Status</option>
                            <option value="read">Read Only</option>
                            <option value="unread">Unread Only</option>
                        </select>

                        <select
                            className="select select-bordered select-sm"
                            value={filters.timeRange}
                            onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
                        >
                            <option value="today">Today</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`p-4 rounded-lg border ${
                                        !notification.read ? 'bg-primary/5 border-primary/20' : 'bg-base-200 border-base-300'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1">
                                            {getTypeIcon(notification.type)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold">{notification.title}</h4>
                                                    <p className="text-sm opacity-80">{notification.message}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                          <span className="text-xs opacity-70">
                            {formatDate(notification.timestamp)}
                          </span>
                                                    <div className="flex gap-1">
                                                        {getChannelIcon(notification.channel)}
                                                        {notification.priority === 'high' && (
                                                            <FaExclamationTriangle className="text-error text-xs" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-3">
                                                {!notification.read && (
                                                    <button
                                                        className="btn btn-xs btn-primary"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        Mark as Read
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => deleteNotification(notification.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <FaBell className="text-3xl opacity-30 mx-auto mb-3" />
                                <p className="opacity-70">No notifications found</p>
                                <p className="text-xs opacity-50 mt-1">Try changing your filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title mb-4">Test Notifications</h2>
                    <p className="text-sm opacity-70 mb-4">
                        Send test notifications to verify your settings are working correctly
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { type: 'security', label: 'Test Security Alert', icon: <FaShieldAlt /> },
                            { type: 'system', label: 'Test System Update', icon: <FaServer /> },
                            { type: 'user', label: 'Test User Activity', icon: <FaUsers /> }
                        ].map(test => (
                            <button
                                key={test.type}
                                className="btn btn-outline flex flex-col gap-2 h-auto py-4"
                                onClick={() => {
                                    const newNotification = {
                                        id: notificationHistory.length + 1,
                                        type: test.type,
                                        title: `Test ${test.label}`,
                                        message: 'This is a test notification to verify your settings',
                                        channel: 'push',
                                        timestamp: new Date().toISOString(),
                                        read: false,
                                        priority: 'medium'
                                    };
                                    setNotificationHistory(prev => [newNotification, ...prev]);
                                }}
                            >
                                <div className="text-2xl">{test.icon}</div>
                                <div>{test.label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileNotifications;