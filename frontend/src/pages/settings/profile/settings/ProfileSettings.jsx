import {useState} from 'react';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGlobe,
    FaBuilding,
    FaCalendarAlt,
    FaLock,
    FaKey,
    FaBell,
    FaSave,
    FaUpload,
    FaTimes,
    FaCheckCircle,
    FaExclamationTriangle,
    FaEdit,
    FaCamera,
    FaTrash,
    FaShieldAlt,
    FaUserShield,
    FaLanguage,
    FaPalette,
    FaDesktop
} from 'react-icons/fa';
import {format} from 'date-fns';

const ProfileSettings = () => {
    const [profile, setProfile] = useState({
        id: 'admin_001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@example.com',
        phone: '+1 (555) 123-4567',
        title: 'Super Administrator',
        department: 'IT Security',
        company: 'SSO Solutions Inc.',
        location: {
            city: 'San Francisco',
            country: 'United States',
            timezone: 'America/Los_Angeles'
        },
        bio: 'System administrator with 8+ years experience in identity and access management. Specialized in SSO implementations and security protocols.',
        avatar: null,
        joinedDate: '2020-03-15',
        lastActive: '2024-01-15T14:30:00',
        verified: true
    });

    const [preferences, setPreferences] = useState({
        notifications: {
            email: {
                securityAlerts: true,
                systemUpdates: true,
                weeklyReports: false,
                newsletter: false
            },
            push: {
                failedLogins: true,
                newUsers: true,
                systemHealth: false
            }
        },
        privacy: {
            showOnlineStatus: true,
            allowTagging: true,
            profileVisibility: 'team',
            searchIndexing: false
        },
        display: {
            theme: 'system', // light, dark, system
            language: 'en',
            density: 'comfortable', // compact, comfortable, spacious
            fontSize: 'medium'
        },
        security: {
            twoFactorEnabled: true,
            sessionTimeout: 30,
            requireReauth: true,
            loginNotifications: true
        }
    });

    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({...profile});
    const [previewImage, setPreviewImage] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'success', 'error'
    const [validationErrors, setValidationErrors] = useState({});

    const handleSaveProfile = () => {
        setSaveStatus('saving');

        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.includes('@')) errors.email = 'Valid email is required';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setSaveStatus('error');
            return;
        }

        setTimeout(() => {
            setProfile(formData);
            setIsEditing(false);
            setSaveStatus('success');
            setValidationErrors({});

            setTimeout(() => setSaveStatus(null), 3000);
        }, 1000);
    };

    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData(prev => ({...prev, avatar: reader.result}));
            };
            reader.readAsDataURL(file);
        }
    };

    const updatePreference = (category, key, subKey, value) => {
        setPreferences(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: subKey
                    ? {...prev[category][key], [subKey]: value}
                    : value
            }
        }));
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM dd, yyyy');
    };

    const tabs = [
        {id: 'personal', label: 'Personal Info', icon: <FaUser/>},
        {id: 'preferences', label: 'Preferences', icon: <FaPalette/>},
        {id: 'security', label: 'Security', icon: <FaLock/>},
        {id: 'notifications', label: 'Notifications', icon: <FaBell/>}
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaUser className="text-primary"/>
                        Profile Settings
                    </h1>
                    <p className="text-base-content/70">
                        Manage your account information and preferences
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
                            <FaCheckCircle/> Saved successfully
                        </div>
                    )}
                    {saveStatus === 'error' && (
                        <div className="badge badge-error gap-1">
                            <FaExclamationTriangle/> Error saving
                        </div>
                    )}

                    {isEditing ? (
                        <>
                            <button
                                className="btn btn-ghost"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData(profile);
                                    setPreviewImage(null);
                                    setValidationErrors({});
                                }}
                            >
                                <FaTimes/> Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSaveProfile}
                                disabled={saveStatus === 'saving'}
                            >
                                {saveStatus === 'saving' ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave/> Save Changes
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            <FaEdit/> Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                        <div className="relative">
                            <div className="avatar">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                    {previewImage || profile.avatar ? (
                                        <img
                                            src={previewImage || profile.avatar}
                                            alt="Profile"
                                        />
                                    ) : (
                                        <div
                                            className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center h-full text-white text-4xl font-bold">
                                            {profile.firstName[0]}{profile.lastName[0]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="absolute bottom-0 right-0">
                                    <label className="btn btn-circle btn-primary btn-sm cursor-pointer">
                                        <FaCamera/>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleAvatarUpload}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        {profile.firstName} {profile.lastName}
                                        {profile.verified && (
                                            <span className="ml-2 badge badge-success badge-sm">
                                                <FaCheckCircle className="mr-1"/>
                                                Verified
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-lg opacity-80">{profile.title}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <FaBuilding className="opacity-50"/>
                                        <span>{profile.department} • {profile.company}</span>
                                    </div>
                                </div>

                                <div className="stats shadow">
                                    <div className="stat">
                                        <div className="stat-title">Account ID</div>
                                        <div className="stat-value text-lg font-mono">{profile.id}</div>
                                        <div className="stat-desc">Super Admin</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                                    <div>
                                        <div className="text-sm opacity-70">Status</div>
                                        <div className="font-medium">Online (Active now)</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="opacity-50"/>
                                    <div>
                                        <div className="text-sm opacity-70">Joined</div>
                                        <div className="font-medium">{formatDate(profile.joinedDate)}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="opacity-50"/>
                                    <div>
                                        <div className="text-sm opacity-70">Last Active</div>
                                        <div
                                            className="font-medium">{format(new Date(profile.lastActive), 'PPpp')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabs tabs-boxed bg-base-200 p-1">
                {tabs.map(tab => (
                    <a
                        key={tab.id}
                        className={`tab flex items-center gap-2 ${activeTab === tab.id ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        {tab.label}
                    </a>
                ))}
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">

                    {activeTab === 'personal' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Personal Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">First Name</span>
                                        {validationErrors.firstName && (
                                            <span
                                                className="label-text-alt text-error">{validationErrors.firstName}</span>
                                        )}
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className={`input input-bordered ${validationErrors.firstName ? 'input-error' : ''}`}
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                        />
                                    ) : (
                                        <div className="input input-bordered bg-base-200">{profile.firstName}</div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Last Name</span>
                                        {validationErrors.lastName && (
                                            <span
                                                className="label-text-alt text-error">{validationErrors.lastName}</span>
                                        )}
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className={`input input-bordered ${validationErrors.lastName ? 'input-error' : ''}`}
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                        />
                                    ) : (
                                        <div className="input input-bordered bg-base-200">{profile.lastName}</div>
                                    )}
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Email Address</span>
                                        {validationErrors.email && (
                                            <span className="label-text-alt text-error">{validationErrors.email}</span>
                                        )}
                                    </label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input
                                                type="email"
                                                className={`input input-bordered w-full ${validationErrors.email ? 'input-error' : ''}`}
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                            {profile.verified && (
                                                <div className="absolute right-3 top-3 badge badge-success badge-sm">
                                                    Verified
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div
                                            className="input input-bordered bg-base-200 flex items-center justify-between">
                                            <span>{profile.email}</span>
                                            {profile.verified && (
                                                <span className="badge badge-success">Verified</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    {isEditing ? (
                                        <div className="flex items-center gap-2">
                                            <FaPhone className="opacity-50"/>
                                            <input
                                                type="tel"
                                                className="input input-bordered flex-1"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            />
                                        </div>
                                    ) : (
                                        <div className="input input-bordered bg-base-200 flex items-center gap-2">
                                            <FaPhone className="opacity-50"/>
                                            <span>{profile.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Job Title</span>
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            className="input input-bordered"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        />
                                    ) : (
                                        <div className="input input-bordered bg-base-200">{profile.title}</div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">City</span>
                                    </label>
                                    {isEditing ? (
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="opacity-50"/>
                                            <input
                                                type="text"
                                                className="input input-bordered flex-1"
                                                value={formData.location.city}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    location: {...formData.location, city: e.target.value}
                                                })}
                                            />
                                        </div>
                                    ) : (
                                        <div className="input input-bordered bg-base-200 flex items-center gap-2">
                                            <FaMapMarkerAlt className="opacity-50"/>
                                            <span>{profile.location.city}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Country</span>
                                    </label>
                                    {isEditing ? (
                                        <div className="flex items-center gap-2">
                                            <FaGlobe className="opacity-50"/>
                                            <input
                                                type="text"
                                                className="input input-bordered flex-1"
                                                value={formData.location.country}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    location: {...formData.location, country: e.target.value}
                                                })}
                                            />
                                        </div>
                                    ) : (
                                        <div className="input input-bordered bg-base-200 flex items-center gap-2">
                                            <FaGlobe className="opacity-50"/>
                                            <span>{profile.location.country}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Timezone</span>
                                    </label>
                                    {isEditing ? (
                                        <select
                                            className="select select-bordered"
                                            value={formData.location.timezone}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                location: {...formData.location, timezone: e.target.value}
                                            })}
                                        >
                                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                            <option value="America/New_York">Eastern Time (ET)</option>
                                            <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                                            <option value="Europe/Paris">Central European Time (CET)</option>
                                            <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                                        </select>
                                    ) : (
                                        <div className="input input-bordered bg-base-200">
                                            {profile.location.timezone.replace('_', ' ')}
                                        </div>
                                    )}
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Bio</span>
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            className="textarea textarea-bordered h-32"
                                            value={formData.bio}
                                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                        />
                                    ) : (
                                        <div className="textarea textarea-bordered bg-base-200 h-32">{profile.bio}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Display & Interface</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Theme</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {['light', 'dark', 'system'].map(theme => (
                                            <div
                                                key={theme}
                                                className={`card cursor-pointer ${preferences.display.theme === theme ? 'ring-2 ring-primary' : ''}`}
                                                onClick={() => updatePreference('display', 'theme', null, theme)}
                                            >
                                                <div className="card-body p-4 flex items-center gap-3">
                                                    <div className={`text-xl ${
                                                        theme === 'light' ? 'text-warning' :
                                                            theme === 'dark' ? 'text-base-content' : 'text-info'
                                                    }`}>
                                                        {theme === 'light' ? <FaSun/> :
                                                            theme === 'dark' ? <FaMoon/> : <FaDesktop/>}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium capitalize">{theme}</div>
                                                        <div className="text-xs opacity-70">
                                                            {theme === 'system' ? 'Follow system settings' : `${theme} mode`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Language</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={preferences.display.language}
                                        onChange={(e) => updatePreference('display', 'language', null, e.target.value)}
                                    >
                                        <option value="en">English</option>
                                        <option value="fr">French</option>
                                        <option value="es">Spanish</option>
                                        <option value="de">German</option>
                                        <option value="ja">Japanese</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Interface Density</span>
                                    </label>
                                    <div className="flex gap-2">
                                        {['compact', 'comfortable', 'spacious'].map(density => (
                                            <button
                                                key={density}
                                                className={`btn btn-sm capitalize ${preferences.display.density === density ? 'btn-primary' : 'btn-ghost'}`}
                                                onClick={() => updatePreference('display', 'density', null, density)}
                                            >
                                                {density}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Font Size</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        {['small', 'medium', 'large'].map(size => (
                                            <div
                                                key={size}
                                                className={`cursor-pointer ${preferences.display.fontSize === size ? 'text-primary' : 'opacity-50'}`}
                                                onClick={() => updatePreference('display', 'fontSize', null, size)}
                                            >
                                                <div className={`font-bold ${
                                                    size === 'small' ? 'text-sm' :
                                                        size === 'medium' ? 'text-base' : 'text-lg'
                                                }`}>
                                                    Aa
                                                </div>
                                                <div className="text-xs capitalize">{size}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <h3 className="text-xl font-bold">Privacy Settings</h3>

                            <div className="space-y-4">
                                {Object.entries(preferences.privacy).map(([key, value]) => (
                                    <div key={key} className="form-control">
                                        <label className="label cursor-pointer justify-start gap-3">
                                            <input
                                                type={key === 'profileVisibility' ? 'radio' : 'checkbox'}
                                                className={key === 'profileVisibility' ? 'radio radio-primary' : 'toggle toggle-primary'}
                                                checked={key === 'profileVisibility' ? value === preferences.privacy.profileVisibility : value}
                                                onChange={(e) => {
                                                    if (key === 'profileVisibility') {
                                                        updatePreference('privacy', 'profileVisibility', null, e.target.value);
                                                    } else {
                                                        updatePreference('privacy', key, null, !value);
                                                    }
                                                }}
                                                value={key === 'profileVisibility' ? 'team' : undefined}
                                            />
                                            <div className="flex-1">
                                                <div
                                                    className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                                <div className="text-sm opacity-70">
                                                    {key === 'showOnlineStatus' && 'Allow others to see when you are online'}
                                                    {key === 'allowTagging' && 'Allow others to mention you in comments'}
                                                    {key === 'profileVisibility' && 'Control who can view your profile'}
                                                    {key === 'searchIndexing' && 'Allow your profile to appear in search results'}
                                                </div>
                                            </div>
                                        </label>

                                        {key === 'profileVisibility' && (
                                            <div className="ml-9 mt-2 flex gap-3">
                                                {['public', 'team', 'private'].map(visibility => (
                                                    <label key={visibility}
                                                           className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="profileVisibility"
                                                            className="radio radio-primary radio-sm"
                                                            value={visibility}
                                                            checked={preferences.privacy.profileVisibility === visibility}
                                                            onChange={(e) => updatePreference('privacy', 'profileVisibility', null, e.target.value)}
                                                        />
                                                        <span className="capitalize">{visibility}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <FaShieldAlt className="text-primary"/>
                                Security Settings
                            </h3>

                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold">Two-Factor Authentication</h4>
                                            <p className="text-sm opacity-70">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`badge ${preferences.security.twoFactorEnabled ? 'badge-success' : 'badge-error'}`}>
                                                {preferences.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                            <button className="btn btn-sm btn-primary">
                                                {preferences.security.twoFactorEnabled ? 'Manage' : 'Enable'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Session Timeout</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="5"
                                            max="120"
                                            value={preferences.security.sessionTimeout}
                                            onChange={(e) => updatePreference('security', 'sessionTimeout', null, parseInt(e.target.value))}
                                            className="range range-primary flex-1"
                                        />
                                        <span className="badge badge-primary">
                                          {preferences.security.sessionTimeout} minutes
                                        </span>
                                    </div>
                                    <div className="text-xs opacity-70 mt-2">
                                        Automatically log out after period of inactivity
                                    </div>
                                </div>

                                {[
                                    {
                                        key: 'requireReauth',
                                        label: 'Require Re-authentication',
                                        desc: 'Require password for sensitive actions'
                                    },
                                    {
                                        key: 'loginNotifications',
                                        label: 'Login Notifications',
                                        desc: 'Get notified of new sign-ins'
                                    }
                                ].map(setting => (
                                    <div key={setting.key} className="form-control">
                                        <label className="label cursor-pointer justify-start gap-3">
                                            <input
                                                type="checkbox"
                                                className="toggle toggle-primary"
                                                checked={preferences.security[setting.key]}
                                                onChange={() => updatePreference('security', setting.key, null, !preferences.security[setting.key])}
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{setting.label}</div>
                                                <div className="text-sm opacity-70">{setting.desc}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="divider"></div>

                            <h4 className="font-bold">Active Sessions</h4>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Device</th>
                                        <th>Location</th>
                                        <th>Last Active</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaDesktop/>
                                                <div>
                                                    <div className="font-medium">Chrome on Windows</div>
                                                    <div className="text-xs opacity-70">192.168.1.100</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>San Francisco, US</td>
                                        <td>2 minutes ago</td>
                                        <td>
                                            <button className="btn btn-xs btn-error">
                                                <FaTimes/> Revoke
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaDesktop/>
                                                <div>
                                                    <div className="font-medium">Safari on iPhone</div>
                                                    <div className="text-xs opacity-70">192.168.1.200</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>San Francisco, US</td>
                                        <td>1 hour ago</td>
                                        <td>
                                            <button className="btn btn-xs btn-error">
                                                <FaTimes/> Revoke
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-error">
                                    <FaTrash/> Revoke All Sessions
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Notification Preferences</h3>

                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <FaEnvelope/>
                                        Email Notifications
                                    </h4>
                                    <div className="space-y-3 mt-3">
                                        {Object.entries(preferences.notifications.email).map(([key, value]) => (
                                            <div key={key} className="form-control">
                                                <label className="label cursor-pointer justify-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        className="toggle toggle-primary"
                                                        checked={value}
                                                        onChange={() => updatePreference('notifications', 'email', key, !value)}
                                                    />
                                                    <div className="flex-1">
                                                        <div
                                                            className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                                        <div className="text-sm opacity-70">
                                                            {key === 'securityAlerts' && 'Critical security alerts and warnings'}
                                                            {key === 'systemUpdates' && 'System updates and maintenance notifications'}
                                                            {key === 'weeklyReports' && 'Weekly summary and activity reports'}
                                                            {key === 'newsletter' && 'Product updates and newsletter'}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <FaBell/>
                                        Push Notifications
                                    </h4>
                                    <div className="space-y-3 mt-3">
                                        {Object.entries(preferences.notifications.push).map(([key, value]) => (
                                            <div key={key} className="form-control">
                                                <label className="label cursor-pointer justify-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        className="toggle toggle-primary"
                                                        checked={value}
                                                        onChange={() => updatePreference('notifications', 'push', key, !value)}
                                                    />
                                                    <div className="flex-1">
                                                        <div
                                                            className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                                        <div className="text-sm opacity-70">
                                                            {key === 'failedLogins' && 'Failed login attempts on your account'}
                                                            {key === 'newUsers' && 'New user registrations in your realms'}
                                                            {key === 'systemHealth' && 'System health and performance alerts'}
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold">Advanced Settings</h4>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Notification Schedule</span>
                                    </label>
                                    <select className="select select-bordered">
                                        <option>Immediate delivery</option>
                                        <option>Hourly digest</option>
                                        <option>Daily digest (9:00 AM)</option>
                                        <option>Weekly digest (Monday 9:00 AM)</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Quiet Hours</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <input
                                            type="time"
                                            className="input input-bordered"
                                            defaultValue="22:00"
                                        />
                                        <span>to</span>
                                        <input
                                            type="time"
                                            className="input input-bordered"
                                            defaultValue="08:00"
                                        />
                                    </div>
                                    <div className="text-xs opacity-70 mt-2">
                                        Mute non-critical notifications during these hours
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg border-error/20">
                <div className="card-body">
                    <h3 className="text-xl font-bold text-error">Danger Zone</h3>
                    <p className="text-sm opacity-70">These actions are irreversible. Please proceed with caution.</p>

                    <div className="space-y-4 mt-4">
                        <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-error/5 rounded-lg">
                            <div>
                                <h4 className="font-bold">Deactivate Account</h4>
                                <p className="text-sm opacity-70">Temporarily deactivate your account</p>
                            </div>
                            <button className="btn btn-outline btn-error">
                                Deactivate Account
                            </button>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-error/5 rounded-lg">
                            <div>
                                <h4 className="font-bold">Delete Account</h4>
                                <p className="text-sm opacity-70">Permanently delete your account and all data</p>
                            </div>
                            <button className="btn btn-error">
                                <FaTrash/> Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;