import {useState} from 'react';
import {
    FaKey,
    FaShieldAlt,
    FaLock,
    FaHistory,
    FaCheckCircle,
    FaExclamationTriangle,
    FaTimesCircle,
    FaMobileAlt,
    FaDesktop,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaTrash,
    FaEye,
    FaEyeSlash,
    FaPlus,
    FaQrcode,
    FaDownload,
    FaClock,
    FaBan,
    FaUserShield,
    FaBell,
    FaDatabase
} from 'react-icons/fa';
import {format} from 'date-fns';

const ProfileSecurity = () => {
    const [twoFactorAuth, setTwoFactorAuth] = useState({
        enabled: true,
        method: 'app', // 'app', 'sms', 'email', 'backup'
        backupCodes: ['A1B2C3', 'D4E5F6', 'G7H8I9', 'J0K1L2', 'M3N4O5'],
        lastUsed: '2024-01-15T10:30:00',
        devices: [
            {id: 1, name: 'Google Authenticator', type: 'app', lastUsed: '2024-01-15T10:30:00', trusted: true},
            {id: 2, name: 'Authy', type: 'app', lastUsed: '2024-01-14T15:20:00', trusted: true}
        ]
    });

    const [sessions, setSessions] = useState([
        {
            id: 'session_001',
            device: 'Chrome on Windows',
            os: 'Windows 11',
            browser: 'Chrome 120.0.0.0',
            ip: '192.168.1.100',
            location: 'San Francisco, US',
            loginTime: '2024-01-15T14:30:00',
            lastActive: '2024-01-15T15:45:00',
            current: true,
            trusted: true
        },
        {
            id: 'session_002',
            device: 'Safari on iPhone',
            os: 'iOS 17.2',
            browser: 'Safari',
            ip: '192.168.1.200',
            location: 'San Francisco, US',
            loginTime: '2024-01-15T09:15:00',
            lastActive: '2024-01-15T12:30:00',
            current: false,
            trusted: true
        },
        {
            id: 'session_003',
            device: 'Firefox on Mac',
            os: 'macOS 14.2',
            browser: 'Firefox 121.0',
            ip: '203.0.113.25',
            location: 'New York, US',
            loginTime: '2024-01-14T11:45:00',
            lastActive: '2024-01-14T16:20:00',
            current: false,
            trusted: false
        }
    ]);

    const [passwordChange, setPasswordChange] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrent: false,
        showNew: false,
        showConfirm: false,
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });

    const [securityHistory, setSecurityHistory] = useState([
        {
            id: 1,
            action: 'password_changed',
            description: 'Password successfully changed',
            ip: '192.168.1.100',
            device: 'Chrome on Windows',
            timestamp: '2024-01-15T10:30:00',
            status: 'success'
        },
        {
            id: 2,
            action: '2fa_enabled',
            description: 'Two-factor authentication enabled via Google Authenticator',
            ip: '192.168.1.100',
            device: 'Chrome on Windows',
            timestamp: '2024-01-14T15:20:00',
            status: 'success'
        },
        {
            id: 3,
            action: 'new_device_login',
            description: 'Login from new device - Firefox on Mac',
            ip: '203.0.113.25',
            device: 'Firefox on Mac',
            timestamp: '2024-01-14T11:45:00',
            status: 'warning'
        },
        {
            id: 4,
            action: 'failed_login',
            description: 'Failed login attempt from suspicious IP',
            ip: '185.220.101.4',
            device: 'Unknown',
            timestamp: '2024-01-13T22:15:00',
            status: 'error'
        },
        {
            id: 5,
            action: 'backup_codes_generated',
            description: 'New backup codes generated',
            ip: '192.168.1.100',
            device: 'Chrome on Windows',
            timestamp: '2024-01-12T09:30:00',
            status: 'info'
        }
    ]);

    const [securityKeys, setSecurityKeys] = useState([
        {
            id: 1,
            name: 'YubiKey 5C NFC',
            type: 'hardware',
            lastUsed: '2024-01-15T10:30:00',
            registered: '2023-11-20',
            status: 'active'
        },
        {
            id: 2,
            name: 'Windows Hello',
            type: 'biometric',
            lastUsed: '2024-01-14T15:20:00',
            registered: '2023-10-15',
            status: 'active'
        }
    ]);

    const [securityAlerts, setSecurityAlerts] = useState({
        loginNotifications: true,
        newDeviceAlerts: true,
        suspiciousActivity: true,
        passwordChangeAlerts: true,
        weeklyReport: false
    });

    const toggleTwoFactorAuth = () => {
        setTwoFactorAuth(prev => ({...prev, enabled: !prev.enabled}));
    };

    const generateBackupCodes = () => {
        const newCodes = Array.from({length: 5}, () =>
            Math.random().toString(36).substr(2, 6).toUpperCase()
        );
        setTwoFactorAuth(prev => ({
            ...prev,
            backupCodes: newCodes,
            lastUsed: new Date().toISOString()
        }));
    };

    const revokeSession = (sessionId) => {
        setSessions(prev => prev.filter(session => session.id !== sessionId));
    };

    const revokeAllSessions = () => {
        setSessions(prev => prev.filter(session => session.current));
    };

    const trustDevice = (sessionId) => {
        setSessions(prev => prev.map(session =>
            session.id === sessionId ? {...session, trusted: true} : session
        ));
    };

    const checkPasswordRequirements = (password) => {
        return {
            length: password.length >= 12,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };
    };

    const handlePasswordChange = (field, value) => {
        const updated = {...passwordChange, [field]: value};

        if (field === 'newPassword') {
            updated.requirements = checkPasswordRequirements(value);
        }

        setPasswordChange(updated);
    };

    const handleChangePassword = () => {
        if (passwordChange.newPassword !== passwordChange.confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        alert('Password changed successfully');
        setPasswordChange({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            showCurrent: false,
            showNew: false,
            showConfirm: false,
            requirements: checkPasswordRequirements('')
        });

        const newEntry = {
            id: securityHistory.length + 1,
            action: 'password_changed',
            description: 'Password successfully changed',
            ip: '192.168.1.100',
            device: 'Chrome on Windows',
            timestamp: new Date().toISOString(),
            status: 'success'
        };
        setSecurityHistory(prev => [newEntry, ...prev]);
    };

    const addSecurityKey = () => {
        const newKey = {
            id: securityKeys.length + 1,
            name: 'New Security Key',
            type: 'hardware',
            lastUsed: null,
            registered: new Date().toISOString(),
            status: 'pending'
        };
        setSecurityKeys(prev => [...prev, newKey]);
    };

    const removeSecurityKey = (id) => {
        setSecurityKeys(prev => prev.filter(key => key.id !== id));
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'PPpp');
    };

    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        return `${diffDays} days ago`;
    };

    const securityStats = {
        failedLogins: securityHistory.filter(h => h.status === 'error').length,
        devices: sessions.length,
        trustedDevices: sessions.filter(s => s.trusted).length,
        lastPasswordChange: securityHistory.find(h => h.action === 'password_changed')?.timestamp
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaShieldAlt className="text-primary"/>
                        Security Settings
                    </h1>
                    <p className="text-base-content/70">
                        Manage your account security and authentication settings
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Security Score</div>
                            <div className="stat-value text-2xl">92/100</div>
                            <div className="stat-desc">Excellent</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">2FA Status</p>
                                <p className={`text-xl font-bold ${twoFactorAuth.enabled ? 'text-success' : 'text-error'}`}>
                                    {twoFactorAuth.enabled ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                            <div
                                className={`p-2 rounded-full ${twoFactorAuth.enabled ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                                {twoFactorAuth.enabled ? <FaCheckCircle/> : <FaTimesCircle/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Active Sessions</p>
                                <p className="text-xl font-bold">{sessions.length}</p>
                            </div>
                            <div className="p-2 rounded-full bg-info/20 text-info">
                                <FaDesktop/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Failed Logins</p>
                                <p className="text-xl font-bold">{securityStats.failedLogins}</p>
                            </div>
                            <div className="p-2 rounded-full bg-warning/20 text-warning">
                                <FaExclamationTriangle/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Last Password Change</p>
                                <p className="text-lg font-bold">
                                    {securityStats.lastPasswordChange ? formatRelativeTime(securityStats.lastPasswordChange) : 'Never'}
                                </p>
                            </div>
                            <div className="p-2 rounded-full bg-primary/20 text-primary">
                                <FaKey/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="card-title flex items-center gap-2">
                                <FaShieldAlt/>
                                Two-Factor Authentication
                            </h2>
                            <p className="text-base-content/70">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer gap-4">
                                <span className="label-text font-medium">
                                  {twoFactorAuth.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={twoFactorAuth.enabled}
                                    onChange={toggleTwoFactorAuth}
                                />
                            </label>
                        </div>
                    </div>

                    {twoFactorAuth.enabled && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold mb-4">Authentication Methods</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            id: 'app',
                                            label: 'Authenticator App',
                                            icon: <FaMobileAlt/>,
                                            description: 'Use apps like Google Authenticator or Authy'
                                        },
                                        {
                                            id: 'sms',
                                            label: 'SMS Verification',
                                            icon: <FaMobileAlt/>,
                                            description: 'Receive codes via text message'
                                        },
                                        {
                                            id: 'email',
                                            label: 'Email Verification',
                                            icon: <FaDesktop/>,
                                            description: 'Receive codes via email'
                                        }
                                    ].map(method => (
                                        <div
                                            key={method.id}
                                            className={`card cursor-pointer ${twoFactorAuth.method === method.id ? 'ring-2 ring-primary' : 'bg-base-200'}`}
                                            onClick={() => setTwoFactorAuth(prev => ({...prev, method: method.id}))}
                                        >
                                            <div className="card-body p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="text-2xl text-primary">{method.icon}</div>
                                                    <div className="font-bold">{method.label}</div>
                                                </div>
                                                <p className="text-sm opacity-70">{method.description}</p>
                                                {twoFactorAuth.method === method.id && (
                                                    <div className="badge badge-success badge-sm mt-2">Active</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold">Backup Codes</h3>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={generateBackupCodes}
                                    >
                                        <FaPlus/> Generate New Codes
                                    </button>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                        {twoFactorAuth.backupCodes.map((code, index) => (
                                            <div
                                                key={index}
                                                className="bg-base-100 p-3 rounded text-center font-mono font-bold"
                                            >
                                                {code}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="opacity-70">
                                            <FaExclamationTriangle className="inline mr-1"/>
                                            Save these codes in a secure place
                                        </div>
                                        <button className="btn btn-xs btn-ghost">
                                            <FaDownload/> Download Codes
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-4">Trusted Devices</h3>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Device</th>
                                            <th>Type</th>
                                            <th>Last Used</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {twoFactorAuth.devices.map(device => (
                                            <tr key={device.id}>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <FaMobileAlt/>
                                                        <span>{device.name}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-sm">{device.type}</span>
                                                </td>
                                                <td>{formatRelativeTime(device.lastUsed)}</td>
                                                <td>
                            <span className="badge badge-sm badge-success">
                              {device.trusted ? 'Trusted' : 'Pending'}
                            </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2 mb-6">
                        <FaLock/>
                        Change Password
                    </h2>

                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Current Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordChange.showCurrent ? "text" : "password"}
                                    className="input input-bordered w-full pr-10"
                                    value={passwordChange.currentPassword}
                                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                />
                                <button
                                    className="absolute right-3 top-3"
                                    onClick={() => handlePasswordChange('showCurrent', !passwordChange.showCurrent)}
                                >
                                    {passwordChange.showCurrent ? <FaEyeSlash/> : <FaEye/>}
                                </button>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordChange.showNew ? "text" : "password"}
                                    className="input input-bordered w-full pr-10"
                                    value={passwordChange.newPassword}
                                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                />
                                <button
                                    className="absolute right-3 top-3"
                                    onClick={() => handlePasswordChange('showNew', !passwordChange.showNew)}
                                >
                                    {passwordChange.showNew ? <FaEyeSlash/> : <FaEye/>}
                                </button>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm New Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordChange.showConfirm ? "text" : "password"}
                                    className="input input-bordered w-full pr-10"
                                    value={passwordChange.confirmPassword}
                                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                />
                                <button
                                    className="absolute right-3 top-3"
                                    onClick={() => handlePasswordChange('showConfirm', !passwordChange.showConfirm)}
                                >
                                    {passwordChange.showConfirm ? <FaEyeSlash/> : <FaEye/>}
                                </button>
                            </div>
                        </div>

                        <div className="bg-base-200 rounded-lg p-4">
                            <h4 className="font-bold mb-2">Password Requirements</h4>
                            <div className="space-y-1">
                                {[
                                    {key: 'length', label: 'At least 12 characters'},
                                    {key: 'uppercase', label: 'At least one uppercase letter'},
                                    {key: 'lowercase', label: 'At least one lowercase letter'},
                                    {key: 'number', label: 'At least one number'},
                                    {key: 'special', label: 'At least one special character'}
                                ].map(req => (
                                    <div key={req.key} className="flex items-center gap-2">
                                        {passwordChange.requirements[req.key] ? (
                                            <FaCheckCircle className="text-success"/>
                                        ) : (
                                            <FaTimesCircle className="text-error opacity-30"/>
                                        )}
                                        <span className={passwordChange.requirements[req.key] ? '' : 'opacity-50'}>
                                          {req.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={handleChangePassword}
                                disabled={
                                    !passwordChange.currentPassword ||
                                    !passwordChange.newPassword ||
                                    !passwordChange.confirmPassword ||
                                    passwordChange.newPassword !== passwordChange.confirmPassword ||
                                    Object.values(passwordChange.requirements).some(req => !req)
                                }
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="card-title flex items-center gap-2">
                                <FaDesktop/>
                                Active Sessions
                            </h2>
                            <p className="text-base-content/70">
                                Manage your currently logged-in devices
                            </p>
                        </div>
                        <button
                            className="btn btn-error btn-sm"
                            onClick={revokeAllSessions}
                            disabled={sessions.length <= 1}
                        >
                            <FaBan/> Revoke All Other Sessions
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Device</th>
                                <th>Location</th>
                                <th>Last Active</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sessions.map(session => (
                                <tr key={session.id} className={session.current ? 'bg-primary/5' : ''}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`p-2 rounded ${session.current ? 'bg-primary/20 text-primary' : 'bg-base-200'}`}>
                                                {session.os.includes('iOS') || session.os.includes('Android') ?
                                                    <FaMobileAlt/> : <FaDesktop/>}
                                            </div>
                                            <div>
                                                <div className="font-medium">{session.device}</div>
                                                <div className="text-xs opacity-70">
                                                    {session.browser} • {session.os}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="opacity-50"/>
                                            <div>
                                                <div>{session.location}</div>
                                                <div className="text-xs opacity-70 font-mono">{session.ip}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span>{formatRelativeTime(session.lastActive)}</span>
                                            <span className="text-xs opacity-70">
                          {format(new Date(session.loginTime), 'MMM dd, HH:mm')}
                        </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            {session.current && (
                                                <span className="badge badge-primary badge-sm">Current Session</span>
                                            )}
                                            {session.trusted ? (
                                                <span className="badge badge-success badge-sm">Trusted</span>
                                            ) : (
                                                <span className="badge badge-warning badge-sm">Untrusted</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            {!session.trusted && !session.current && (
                                                <button
                                                    className="btn btn-xs btn-success"
                                                    onClick={() => trustDevice(session.id)}
                                                >
                                                    Trust
                                                </button>
                                            )}
                                            {!session.current && (
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => revokeSession(session.id)}
                                                >
                                                    <FaTimesCircle/> Revoke
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="card-title flex items-center gap-2">
                                <FaKey/>
                                Security Keys & Biometrics
                            </h2>
                            <p className="text-base-content/70">
                                Hardware keys and biometric authentication methods
                            </p>
                        </div>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={addSecurityKey}
                        >
                            <FaPlus/> Add Security Key
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {securityKeys.map(key => (
                            <div key={key.id} className="card bg-base-200">
                                <div className="card-body p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded ${
                                                key.type === 'hardware' ? 'bg-primary/20 text-primary' : 'bg-success/20 text-success'
                                            }`}>
                                                <FaKey/>
                                            </div>
                                            <div>
                                                <div className="font-bold">{key.name}</div>
                                                <div className="text-sm opacity-70 capitalize">{key.type} key</div>
                                            </div>
                                        </div>
                                        <span className={`badge ${
                                            key.status === 'active' ? 'badge-success' :
                                                key.status === 'pending' ? 'badge-warning' : 'badge-error'
                                        }`}>
                      {key.status}
                    </span>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Registered:</span>
                                            <span>{formatDate(key.registered)}</span>
                                        </div>
                                        {key.lastUsed && (
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Last Used:</span>
                                                <span>{formatRelativeTime(key.lastUsed)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="card-actions justify-end mt-4">
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => removeSecurityKey(key.id)}
                                        >
                                            <FaTrash/> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2 mb-6">
                        <FaBell/>
                        Security Alerts
                    </h2>

                    <div className="space-y-4">
                        {Object.entries(securityAlerts).map(([key, value]) => (
                            <div key={key} className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={value}
                                        onChange={() => setSecurityAlerts(prev => ({
                                            ...prev,
                                            [key]: !prev[key]
                                        }))}
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </div>
                                        <div className="text-sm opacity-70">
                                            {key === 'loginNotifications' && 'Notify me when someone logs into my account'}
                                            {key === 'newDeviceAlerts' && 'Alert me when a new device signs in'}
                                            {key === 'suspiciousActivity' && 'Notify me of suspicious activity'}
                                            {key === 'passwordChangeAlerts' && 'Alert me when my password is changed'}
                                            {key === 'weeklyReport' && 'Send weekly security report'}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2 mb-6">
                        <FaHistory/>
                        Security History
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Action</th>
                                <th>Description</th>
                                <th>Device & Location</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {securityHistory.map(entry => (
                                <tr key={entry.id}>
                                    <td>
                                        <div className="font-medium capitalize">
                                            {entry.action.replace('_', ' ')}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="max-w-xs">{entry.description}</div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-medium">{entry.device}</div>
                                            <div className="text-xs opacity-70 font-mono">{entry.ip}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span>{formatRelativeTime(entry.timestamp)}</span>
                                            <span className="text-xs opacity-70">
                                              {format(new Date(entry.timestamp), 'MMM dd, HH:mm')}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                      <span className={`badge ${
                                          entry.status === 'success' ? 'badge-success' :
                                              entry.status === 'warning' ? 'badge-warning' :
                                                  entry.status === 'error' ? 'badge-error' : 'badge-info'
                                      }`}>
                                        {entry.status}
                                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg border-error/20">
                <div className="card-body">
                    <h3 className="text-xl font-bold text-error flex items-center gap-2">
                        <FaExclamationTriangle/>
                        Danger Zone
                    </h3>
                    <p className="text-sm opacity-70 mb-6">
                        These actions are irreversible and will significantly affect your account security
                    </p>

                    <div className="space-y-4">
                        <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-error/5 rounded-lg">
                            <div>
                                <h4 className="font-bold">Disable Two-Factor Authentication</h4>
                                <p className="text-sm opacity-70">
                                    Remove the extra layer of security from your account
                                </p>
                            </div>
                            <button
                                className="btn btn-outline btn-error"
                                onClick={() => setTwoFactorAuth(prev => ({...prev, enabled: false}))}
                                disabled={!twoFactorAuth.enabled}
                            >
                                Disable 2FA
                            </button>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-error/5 rounded-lg">
                            <div>
                                <h4 className="font-bold">Sign Out of All Devices</h4>
                                <p className="text-sm opacity-70">
                                    Immediately sign out of all devices except this one
                                </p>
                            </div>
                            <button
                                className="btn btn-error"
                                onClick={revokeAllSessions}
                            >
                                <FaBan/> Sign Out Everywhere
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSecurity;