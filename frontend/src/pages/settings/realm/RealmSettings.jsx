import {useState} from 'react';
import {
    FaCog,
    FaDatabase,
    FaDesktop,
    FaHistory,
    FaKey,
    FaNetworkWired,
    FaQuestionCircle,
    FaSave,
    FaShieldAlt,
    FaSignInAlt,
    FaUndo,
    FaUsers
} from 'react-icons/fa';
import RealmSettingsGeneralTab from "./tab/GeneralTab.jsx";
import RealmSettingsLoginTab from "./tab/LoginTab.jsx";
import RealmSettingsSecurityTab from "./tab/SecurityTab.jsx";
import RealmSettingsTokenTab from "./tab/TokenTab.jsx";
import RealmSettingsClientTab from "./tab/ClientTab.jsx";
import RealmSettingsIdentityProviderTab from "./tab/IdentityProviderTab.jsx";
import RealmsSettingsUsersFederationTab from "./tab/UsersFederationTab.jsx";
import RealmsSettingsEventsTab from "./tab/EventsTab.jsx";

const RealmSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);
    const [showSecret, setShowSecret] = useState({});

    const [realmConfig, setRealmConfig] = useState({
        general: {
            realmName: 'master',
            displayName: 'Master Realm',
            enabled: true,
            registrationAllowed: true,
            registrationEmailAsUsername: false,
            editUsernameAllowed: true,
            resetPasswordAllowed: true,
            rememberMe: true,
            verifyEmail: false,
            loginWithEmailAllowed: true,
            duplicateEmailsAllowed: false,
        },

        login: {
            defaultLocale: 'en',
            internationalizationEnabled: true,
            supportedLocales: ['en', 'fr', 'es'],
            smtpServer: {
                host: 'smtp.gmail.com',
                port: 587,
                ssl: false,
                tls: true,
                from: 'noreply@yourdomain.com',
                auth: true,
                user: '',
                password: ''
            },
            themes: {
                loginTheme: 'keycloak',
                accountTheme: 'keycloak',
                adminTheme: 'keycloak',
                emailTheme: 'keycloak'
            },
            events: {
                eventsEnabled: true,
                eventsExpiration: 2592000,
                adminEventsEnabled: true,
                adminEventsDetailsEnabled: true
            }
        },

        security: {
            sslRequired: 'external',
            bruteForceProtection: true,
            maxFailureWaitSeconds: 900,
            minimumQuickLoginWaitSeconds: 60,
            waitIncrementSeconds: 60,
            quickLoginCheckMilliSeconds: 1000,
            maxDeltaTimeSeconds: 43200,
            failureFactor: 30,
            permanentLockout: false,
            maxTemporaryLockouts: 3
        },

        tokens: {
            ssoSessionIdleTimeout: 1800,
            ssoSessionMaxLifespan: 36000,
            ssoSessionIdleTimeoutRememberMe: 604800,
            ssoSessionMaxLifespanRememberMe: 2592000,
            offlineSessionIdleTimeout: 2592000,
            offlineSessionMaxLifespan: 5184000,
            accessTokenLifespan: 300,
            accessTokenLifespanForImplicitFlow: 900,
            accessCodeLifespan: 60,
            accessCodeLifespanUserAction: 300,
            accessCodeLifespanLogin: 1800,
            actionTokenGeneratedByUserLifespan: 300,
            actionTokenGeneratedByAdminLifespan: 43200
        },

        clients: [
            {
                id: 'account-console',
                clientId: 'account-console',
                name: 'Account Console',
                enabled: true,
                consentRequired: false,
                protocol: 'openid-connect',
                publicClient: true,
                redirectUris: ['http://localhost:8080/*'],
                webOrigins: ['+'],
                adminUrl: 'http://localhost:8080'
            },
            {
                id: 'security-admin-console',
                clientId: 'security-admin-console',
                name: 'Security Admin Console',
                enabled: true,
                consentRequired: false,
                protocol: 'openid-connect',
                publicClient: true,
                redirectUris: ['http://localhost:8081/*'],
                webOrigins: ['+'],
                adminUrl: 'http://localhost:8081'
            },
            {
                id: 'realm-management',
                clientId: 'realm-management',
                name: 'Realm Management',
                enabled: true,
                consentRequired: false,
                protocol: 'openid-connect',
                bearerOnly: true
            }
        ],

        identityProviders: [
            {
                id: 'google',
                alias: 'google',
                providerId: 'google',
                enabled: true,
                trustEmail: true,
                storeToken: false,
                firstBrokerLoginFlowAlias: 'first broker login',
                config: {
                    clientId: '',
                    clientSecret: '',
                    hostedDomain: 'yourdomain.com'
                }
            },
            {
                id: 'github',
                alias: 'github',
                providerId: 'github',
                enabled: false,
                trustEmail: false,
                storeToken: false,
                firstBrokerLoginFlowAlias: 'first broker login',
                config: {
                    clientId: '',
                    clientSecret: ''
                }
            }
        ],

        userFederation: [
            {
                id: 'ldap-1',
                name: 'Corporate LDAP',
                providerId: 'ldap',
                enabled: true,
                priority: 0,
                config: {
                    connectionUrl: 'ldap://ldap.corporate.com:389',
                    usersDn: 'ou=users,dc=corporate,dc=com',
                    bindDn: 'cn=admin,dc=corporate,dc=com',
                    bindCredential: '********',
                    editMode: 'WRITABLE'
                }
            }
        ]
    });

    const tabs = [
        {id: 'general', label: 'General', icon: <FaCog/>},
        {id: 'login', label: 'Login', icon: <FaSignInAlt/>},
        {id: 'security', label: 'Security', icon: <FaShieldAlt/>},
        {id: 'tokens', label: 'Tokens', icon: <FaKey/>},
        {id: 'clients', label: 'Clients', icon: <FaDesktop/>},
        {id: 'identity-providers', label: 'Identity Providers', icon: <FaUsers/>},
        {id: 'user-federation', label: 'User Federation', icon: <FaDatabase/>},
        {id: 'events', label: 'Events', icon: <FaHistory/>}
    ];

    const handleInputChange = (section, field, value) => {
        setRealmConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleNestedChange = (section, field, subField, value) => {
        setRealmConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: {
                    ...prev[section][field],
                    [subField]: value
                }
            }
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Realm settings saved successfully!');
        }, 1500);
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all changes?')) {
            setRealmConfig(prev => ({...prev}));
        }
    };

    const toggleSecret = (field) => {
        setShowSecret(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <RealmSettingsGeneralTab realmConfig={realmConfig} handleInputChange={handleInputChange}/>;
            case 'login':
                return <RealmSettingsLoginTab realmConfig={realmConfig} handleInputChange={handleNestedChange}
                                              handleNestedChange={handleNestedChange}/>;
            case 'security':
                return <RealmSettingsSecurityTab realmConfig={realmConfig} handleInputChange={handleInputChange}/>;
            case 'tokens':
                return <RealmSettingsTokenTab realmConfig={realmConfig} handleInputChange={handleNestedChange}/>
            case 'clients':
                return <RealmSettingsClientTab realmConfig={realmConfig} setRealmConfig={setRealmConfig}/>
            case 'identity-providers':
                return <RealmSettingsIdentityProviderTab realmConfig={realmConfig} setRealmConfig={setRealmConfig}
                                                         showSecret={showSecret}/>
            case 'user-federation':
                return <RealmsSettingsUsersFederationTab showSecret={showSecret} toggleSecret={toggleSecret}/>;
            case 'events':
                return <RealmsSettingsEventsTab realmConfig={realmConfig} handleNestedChange={handleNestedChange}/>;
            default:
                return <RealmSettingsGeneralTab realmConfig={realmConfig} handleInputChange={handleInputChange}/>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaCog className="text-primary"/>
                        Realm Settings
                    </h1>
                    <p className="text-base-content/70">
                        Configure authentication and authorization settings for
                        the {realmConfig.general.realmName} realm
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        className="btn btn-ghost"
                        onClick={handleReset}
                        disabled={isSaving}
                    >
                        <FaUndo/>
                        Reset
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FaSave/>
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="tabs tabs-boxed">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="card bg-base-100 border border-base-300">
                <div className="card-body">
                    {renderTabContent()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-200">
                    <div className="card-body">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-info/10">
                                <FaUsers className="text-info"/>
                            </div>
                            <div>
                                <div className="font-bold">Users</div>
                                <div className="text-2xl">1,542</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200">
                    <div className="card-body">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-success/10">
                                <FaDesktop className="text-success"/>
                            </div>
                            <div>
                                <div className="font-bold">Active Clients</div>
                                <div className="text-2xl">{realmConfig.clients.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200">
                    <div className="card-body">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-warning/10">
                                <FaNetworkWired className="text-warning"/>
                            </div>
                            <div>
                                <div className="font-bold">Identity Providers</div>
                                <div className="text-2xl">{realmConfig.identityProviders.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="alert alert-info">
                <FaQuestionCircle/>
                <div>
                    <h3 className="font-bold">Need Help?</h3>
                    <div className="text-sm">
                        • Check the <a href="#" className="link link-primary">documentation</a> for detailed
                        explanations<br/>
                        • Use test mode before applying changes to production<br/>
                        • Backup your configuration regularly
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealmSettings;