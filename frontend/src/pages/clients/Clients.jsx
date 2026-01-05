import { useState } from 'react';
import {
    FaPlus,
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaCopy,
    FaEye,
    FaEyeSlash,
    FaKey,
    FaShieldAlt,
    FaGlobe,
    FaDesktop,
    FaMobileAlt,
    FaServer,
    FaDatabase,
    FaDownload,
    FaUpload,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaHistory,
    FaCogs,
    FaQrcode,
    FaUserShield,
    FaIdCard,
    FaCertificate,
    FaLock,
    FaLink,
    FaExternalLinkAlt,
    FaRegCopy,
    FaSave,
    FaUndo,
    FaClock,
    FaUsers, FaQuestionCircle
} from 'react-icons/fa';

const Clients = () => {
    const [clients, setClients] = useState(
        [
        {
            id: 'account-console',
            clientId: 'account-console',
            name: 'Account Console',
            description: 'User account management interface',
            enabled: true,
            consentRequired: false,
            protocol: 'openid-connect',
            clientAuthenticatorType: 'client-secret',
            publicClient: true,
            bearerOnly: false,
            standardFlowEnabled: true,
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: false,
            serviceAccountsEnabled: false,
            authorizationServicesEnabled: false,
            secret: '********',
            redirectUris: ['http://localhost:8080/*', 'https://account.yourdomain.com/*'],
            webOrigins: ['+'],
            adminUrl: 'http://localhost:8080',
            baseUrl: 'http://localhost:8080',
            rootUrl: 'http://localhost:8080',
            attributes: {
                'oauth2.device.authorization.grant.enabled': 'false',
                'backchannel.logout.session.required': 'true',
                'use.refresh.tokens': 'true'
            },
            created: '2024-01-15',
            lastUpdated: '2024-01-20'
        },
        {
            id: 'admin-cli',
            clientId: 'admin-cli',
            name: 'Admin CLI',
            description: 'Command line administration interface',
            enabled: true,
            consentRequired: false,
            protocol: 'openid-connect',
            clientAuthenticatorType: 'client-secret',
            publicClient: false,
            bearerOnly: false,
            standardFlowEnabled: false,
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: true,
            serviceAccountsEnabled: true,
            authorizationServicesEnabled: false,
            secret: '********',
            redirectUris: [],
            webOrigins: [],
            adminUrl: '',
            baseUrl: '',
            rootUrl: '',
            attributes: {
                'use.refresh.tokens': 'true'
            },
            created: '2024-01-10',
            lastUpdated: '2024-01-10'
        },
        {
            id: 'security-admin-console',
            clientId: 'security-admin-console',
            name: 'Security Admin Console',
            description: 'Administration interface for security settings',
            enabled: true,
            consentRequired: false,
            protocol: 'openid-connect',
            clientAuthenticatorType: 'client-secret',
            publicClient: true,
            bearerOnly: false,
            standardFlowEnabled: true,
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: false,
            serviceAccountsEnabled: false,
            authorizationServicesEnabled: false,
            secret: '********',
            redirectUris: ['http://localhost:8081/*'],
            webOrigins: ['+'],
            adminUrl: 'http://localhost:8081',
            baseUrl: 'http://localhost:8081',
            rootUrl: 'http://localhost:8081',
            created: '2024-01-12',
            lastUpdated: '2024-01-18'
        },
        {
            id: 'mobile-app',
            clientId: 'mobile-app',
            name: 'Mobile Application',
            description: 'iOS and Android mobile application',
            enabled: true,
            consentRequired: true,
            protocol: 'openid-connect',
            clientAuthenticatorType: 'client-secret',
            publicClient: true,
            bearerOnly: false,
            standardFlowEnabled: true,
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: false,
            serviceAccountsEnabled: false,
            authorizationServicesEnabled: false,
            secret: '********',
            redirectUris: [
                'com.mobileapp://callback',
                'com.mobileapp.auth://callback'
            ],
            webOrigins: ['+'],
            adminUrl: '',
            baseUrl: 'https://mobile.yourdomain.com',
            rootUrl: 'https://mobile.yourdomain.com',
            created: '2024-01-25',
            lastUpdated: '2024-01-25'
        },
        {
            id: 'api-gateway',
            clientId: 'api-gateway',
            name: 'API Gateway',
            description: 'Microservices API gateway',
            enabled: true,
            consentRequired: false,
            protocol: 'openid-connect',
            clientAuthenticatorType: 'client-secret',
            publicClient: false,
            bearerOnly: true,
            standardFlowEnabled: false,
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: false,
            serviceAccountsEnabled: true,
            authorizationServicesEnabled: false,
            secret: '********',
            redirectUris: [],
            webOrigins: [],
            adminUrl: '',
            baseUrl: 'https://api.yourdomain.com',
            rootUrl: 'https://api.yourdomain.com',
            created: '2024-01-05',
            lastUpdated: '2024-01-15'
        },
        {
            id: 'single-page-app',
            clientId: 'single-page-app',
            name: 'Single Page Application',
            description: 'React/Vue/Angular web application',
            enabled: true,
            consentRequired: true,
            protocol: 'openid-connect',
            clientAuthenticatorType: 'public',
            publicClient: true,
            bearerOnly: false,
            standardFlowEnabled: true,
            implicitFlowEnabled: true,
            directAccessGrantsEnabled: false,
            serviceAccountsEnabled: false,
            authorizationServicesEnabled: false,
            secret: '',
            redirectUris: ['https://app.yourdomain.com/*'],
            webOrigins: ['https://app.yourdomain.com'],
            adminUrl: '',
            baseUrl: 'https://app.yourdomain.com',
            rootUrl: 'https://app.yourdomain.com',
            created: '2024-01-08',
            lastUpdated: '2024-01-22'
        },
        {
            id: 'legacy-app',
            clientId: 'legacy-app',
            name: 'Legacy Application',
            description: 'Traditional web application (SAML)',
            enabled: false,
            consentRequired: false,
            protocol: 'saml',
            clientAuthenticatorType: 'client-secret',
            publicClient: false,
            bearerOnly: false,
            standardFlowEnabled: false,
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: false,
            serviceAccountsEnabled: false,
            authorizationServicesEnabled: false,
            secret: '********',
            redirectUris: ['https://legacy.yourdomain.com/saml/acs'],
            webOrigins: [],
            adminUrl: '',
            baseUrl: 'https://legacy.yourdomain.com',
            rootUrl: 'https://legacy.yourdomain.com',
            created: '2023-12-15',
            lastUpdated: '2024-01-10'
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProtocol, setSelectedProtocol] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSecretModal, setShowSecretModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [activeTab, setActiveTab] = useState('clients');
    const [showSecret, setShowSecret] = useState(false);
    const [newClient, setNewClient] = useState({
        clientId: '',
        name: '',
        description: '',
        protocol: 'openid-connect',
        enabled: true,
        consentRequired: false,
        publicClient: false,
        bearerOnly: false,
        standardFlowEnabled: true,
        implicitFlowEnabled: false,
        directAccessGrantsEnabled: false,
        serviceAccountsEnabled: false,
        redirectUris: [''],
        webOrigins: ['+'],
        baseUrl: '',
        rootUrl: '',
        adminUrl: ''
    });

    const protocols = [...new Set(clients.map(client => client.protocol))];
    const clientTypes = ['public', 'confidential', 'bearer-only'];

    const filteredClients = clients.filter(client => {
        const matchesSearch =
            client.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesProtocol = selectedProtocol === 'all' || client.protocol === selectedProtocol;
        const matchesStatus = selectedStatus === 'all' ||
            (selectedStatus === 'enabled' && client.enabled) ||
            (selectedStatus === 'disabled' && !client.enabled);

        const matchesType = selectedType === 'all' ||
            (selectedType === 'public' && client.publicClient) ||
            (selectedType === 'confidential' && !client.publicClient && !client.bearerOnly) ||
            (selectedType === 'bearer-only' && client.bearerOnly);

        return matchesSearch && matchesProtocol && matchesStatus && matchesType;
    });

    const getClientType = (client) => {
        if (client.bearerOnly) return { label: 'Bearer Only', color: 'badge-warning' };
        if (client.publicClient) return { label: 'Public', color: 'badge-info' };
        return { label: 'Confidential', color: 'badge-secondary' };
    };

    const getProtocolBadge = (protocol) => {
        const config = {
            'openid-connect': { color: 'badge-primary', label: 'OIDC' },
            'saml': { color: 'badge-accent', label: 'SAML' }
        };
        return config[protocol] || { color: 'badge-neutral', label: protocol };
    };

    const handleCreateClient = () => {
        if (!newClient.clientId.trim()) {
            alert('Client ID is required');
            return;
        }

        const client = {
            ...newClient,
            id: `client-${Date.now()}`,
            clientAuthenticatorType: newClient.publicClient ? 'public' : 'client-secret',
            secret: newClient.publicClient ? '' : '********',
            authorizationServicesEnabled: false,
            redirectUris: newClient.redirectUris.filter(uri => uri.trim() !== ''),
            webOrigins: newClient.webOrigins.filter(origin => origin.trim() !== ''),
            attributes: {},
            created: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0]
        };

        setClients([...clients, client]);
        setShowCreateModal(false);
        setNewClient({
            clientId: '',
            name: '',
            description: '',
            protocol: 'openid-connect',
            enabled: true,
            consentRequired: false,
            publicClient: false,
            bearerOnly: false,
            standardFlowEnabled: true,
            implicitFlowEnabled: false,
            directAccessGrantsEnabled: false,
            serviceAccountsEnabled: false,
            redirectUris: [''],
            webOrigins: ['+'],
            baseUrl: '',
            rootUrl: '',
            adminUrl: ''
        });
    };

    const handleDeleteClient = (id) => {
        if (window.confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
            setClients(clients.filter(client => client.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setClients(clients.map(client =>
            client.id === id ? { ...client, enabled: !client.enabled } : client
        ));
    };

    const handleCopySecret = (secret) => {
        navigator.clipboard.writeText(secret);
        alert('Client secret copied to clipboard!');
    };

    const handleGenerateSecret = (id) => {
        const newSecret = btoa(Math.random().toString()).substring(0, 32);
        setClients(clients.map(client =>
            client.id === id ? { ...client, secret: newSecret } : client
        ));
        alert('New client secret generated!');
    };

    const handleExportClient = (client) => {
        const config = {
            clientId: client.clientId,
            name: client.name,
            protocol: client.protocol,
            enabled: client.enabled,
            publicClient: client.publicClient,
            bearerOnly: client.bearerOnly,
            redirectUris: client.redirectUris,
            webOrigins: client.webOrigins,
            baseUrl: client.baseUrl,
            attributes: client.attributes
        };

        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${client.clientId}-config.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderClientCard = (client) => {
        const clientType = getClientType(client);
        const protocolBadge = getProtocolBadge(client.protocol);

        return (
            <div key={client.id} className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow">
                <div className="card-body">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="card-title text-lg">{client.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <code className="text-sm opacity-70 bg-base-200 px-2 py-1 rounded">
                                    {client.clientId}
                                </code>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className={`badge ${client.enabled ? 'badge-success' : 'badge-error'}`}>
                                {client.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                            <span className={`badge ${protocolBadge.color}`}>
                                {protocolBadge.label}
                            </span>
                            <span className={`badge ${clientType.color}`}>
                                {clientType.label}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm opacity-80 mb-4">{client.description}</p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                            <FaGlobe className="opacity-50" />
                            <span className="text-sm truncate">{client.baseUrl || 'No base URL'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaLink className="opacity-50" />
                            <span className="text-sm">
                                {client.redirectUris.length} redirect URI{client.redirectUris.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock className="opacity-50" />
                            <span className="text-sm">Updated: {client.lastUpdated}</span>
                        </div>
                    </div>

                    <div className="flex justify-between mb-4">
                        <div className="text-center">
                            <div className={`badge ${client.standardFlowEnabled ? 'badge-success' : 'badge-neutral'}`}>
                                Standard
                            </div>
                            <p className="text-xs mt-1">Authorization Code</p>
                        </div>
                        <div className="text-center">
                            <div className={`badge ${client.directAccessGrantsEnabled ? 'badge-success' : 'badge-neutral'}`}>
                                Direct
                            </div>
                            <p className="text-xs mt-1">Resource Owner</p>
                        </div>
                        <div className="text-center">
                            <div className={`badge ${client.serviceAccountsEnabled ? 'badge-success' : 'badge-neutral'}`}>
                                Service
                            </div>
                            <p className="text-xs mt-1">Service Account</p>
                        </div>
                    </div>

                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => {
                                setSelectedClient(client);
                                setShowSecretModal(true);
                            }}
                        >
                            <FaKey />
                            Secret
                        </button>
                        <button
                            className="btn btn-sm btn-info"
                            onClick={() => {
                                setSelectedClient(client);
                                setShowEditModal(true);
                            }}
                        >
                            <FaEdit />
                            Edit
                        </button>
                        <button
                            className={`btn btn-sm ${client.enabled ? 'btn-warning' : 'btn-success'}`}
                            onClick={() => handleToggleStatus(client.id)}
                        >
                            {client.enabled ? 'Disable' : 'Enable'}
                        </button>
                        <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleDeleteClient(client.id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderCreateModal = () => (
        <div className="modal modal-open">
            <div className="modal-box max-w-4xl">
                <h3 className="font-bold text-lg mb-4">Create New Client</h3>

                <div className="tabs mb-4">
                    <button className={`tab tab-lifted ${activeTab === 'clients' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('clients')}>
                        Client Settings
                    </button>
                    <button className={`tab tab-lifted ${activeTab === 'capabilities' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('capabilities')}>
                        Capabilities
                    </button>
                    <button className={`tab tab-lifted ${activeTab === 'access' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('access')}>
                        Access Settings
                    </button>
                </div>

                {activeTab === 'clients' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Client ID *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="my-client"
                                    value={newClient.clientId}
                                    onChange={(e) => setNewClient({...newClient, clientId: e.target.value})}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="My Application"
                                    value={newClient.name}
                                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered"
                                placeholder="Describe what this client does..."
                                value={newClient.description}
                                onChange={(e) => setNewClient({...newClient, description: e.target.value})}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Protocol</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={newClient.protocol}
                                onChange={(e) => setNewClient({...newClient, protocol: e.target.value})}
                            >
                                <option value="openid-connect">OpenID Connect</option>
                                <option value="saml">SAML 2.0</option>
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'capabilities' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={newClient.publicClient}
                                        onChange={(e) => setNewClient({...newClient, publicClient: e.target.checked})}
                                    />
                                    <span className="label-text ml-3">Public Client</span>
                                </label>
                                <div className="label-text-alt opacity-70">
                                    No client secret required (e.g., mobile apps, SPAs)
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={newClient.bearerOnly}
                                        onChange={(e) => setNewClient({...newClient, bearerOnly: e.target.checked})}
                                    />
                                    <span className="label-text ml-3">Bearer Only</span>
                                </label>
                                <div className="label-text-alt opacity-70">
                                    No user login, only service-to-service
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={newClient.standardFlowEnabled}
                                        onChange={(e) => setNewClient({...newClient, standardFlowEnabled: e.target.checked})}
                                    />
                                    <span className="label-text ml-3">Standard Flow</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={newClient.directAccessGrantsEnabled}
                                        onChange={(e) => setNewClient({...newClient, directAccessGrantsEnabled: e.target.checked})}
                                    />
                                    <span className="label-text ml-3">Direct Access</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={newClient.serviceAccountsEnabled}
                                        onChange={(e) => setNewClient({...newClient, serviceAccountsEnabled: e.target.checked})}
                                    />
                                    <span className="label-text ml-3">Service Accounts</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'access' && (
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Root URL</span>
                            </label>
                            <input
                                type="url"
                                className="input input-bordered"
                                placeholder="https://app.yourdomain.com"
                                value={newClient.rootUrl}
                                onChange={(e) => setNewClient({...newClient, rootUrl: e.target.value})}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Valid Redirect URIs</span>
                            </label>
                            <div className="space-y-2">
                                {newClient.redirectUris.map((uri, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input input-bordered flex-1"
                                            placeholder="https://app.yourdomain.com/*"
                                            value={uri}
                                            onChange={(e) => {
                                                const newUris = [...newClient.redirectUris];
                                                newUris[index] = e.target.value;
                                                setNewClient({...newClient, redirectUris: newUris});
                                            }}
                                        />
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => {
                                                const newUris = newClient.redirectUris.filter((_, i) => i !== index);
                                                setNewClient({...newClient, redirectUris: newUris});
                                            }}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => setNewClient({
                                        ...newClient,
                                        redirectUris: [...newClient.redirectUris, '']
                                    })}
                                >
                                    <FaPlus /> Add Redirect URI
                                </button>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Web Origins</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                placeholder="+ or https://app.yourdomain.com"
                                value={newClient.webOrigins[0]}
                                onChange={(e) => setNewClient({
                                    ...newClient,
                                    webOrigins: [e.target.value]
                                })}
                            />
                            <div className="label-text-alt opacity-70">
                                Use "+" to allow all origins, or specify specific origins
                            </div>
                        </div>
                    </div>
                )}

                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleCreateClient}>
                        Create Client
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}></div>
        </div>
    );

    const renderSecretModal = () => (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Client Credentials</h3>

                <div className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Client ID</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <code className="bg-base-200 px-3 py-2 rounded flex-1">
                                {selectedClient?.clientId}
                            </code>
                            <button
                                className="btn btn-sm"
                                onClick={() => handleCopySecret(selectedClient?.clientId || '')}
                            >
                                <FaRegCopy />
                            </button>
                        </div>
                    </div>

                    {!selectedClient?.publicClient && (
                        <div>
                            <label className="label">
                                <span className="label-text">Client Secret</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type={showSecret ? "text" : "password"}
                                        className="input input-bordered w-full pr-10"
                                        value={selectedClient?.secret || ''}
                                        readOnly
                                    />
                                    <button
                                        className="absolute right-3 top-3"
                                        onClick={() => setShowSecret(!showSecret)}
                                    >
                                        {showSecret ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <button
                                    className="btn btn-sm"
                                    onClick={() => handleCopySecret(selectedClient?.secret || '')}
                                >
                                    <FaRegCopy />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="alert alert-warning">
                        <FaExclamationTriangle />
                        <div className="text-sm">
                            <strong>Keep these credentials secure!</strong>
                            <br />
                            The client secret should never be shared or exposed in client-side code.
                        </div>
                    </div>

                    {!selectedClient?.publicClient && (
                        <button
                            className="btn btn-warning w-full"
                            onClick={() => selectedClient && handleGenerateSecret(selectedClient.id)}
                        >
                            <FaKey />
                            Generate New Secret
                        </button>
                    )}
                </div>

                <div className="modal-action">
                    <button className="btn" onClick={() => setShowSecretModal(false)}>
                        Close
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={() => setShowSecretModal(false)}></div>
        </div>
    );

    const renderClientStats = () => {
        const stats = {
            total: clients.length,
            enabled: clients.filter(c => c.enabled).length,
            oidc: clients.filter(c => c.protocol === 'openid-connect').length,
            saml: clients.filter(c => c.protocol === 'saml').length,
            public: clients.filter(c => c.publicClient).length,
            confidential: clients.filter(c => !c.publicClient && !c.bearerOnly).length,
            bearerOnly: clients.filter(c => c.bearerOnly).length
        };

        return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Clients</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <FaDesktop className="text-primary" />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Active</p>
                                <p className="text-2xl font-bold text-success">{stats.enabled}</p>
                            </div>
                            <FaCheckCircle className="text-success" />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">OIDC</p>
                                <p className="text-2xl font-bold text-primary">{stats.oidc}</p>
                            </div>
                            <FaKey className="text-primary" />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">SAML</p>
                                <p className="text-2xl font-bold text-accent">{stats.saml}</p>
                            </div>
                            <FaCertificate className="text-accent" />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Public</p>
                                <p className="text-2xl font-bold text-info">{stats.public}</p>
                            </div>
                            <FaGlobe className="text-info" />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Confidential</p>
                                <p className="text-2xl font-bold text-secondary">{stats.confidential}</p>
                            </div>
                            <FaLock className="text-secondary" />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Bearer Only</p>
                                <p className="text-2xl font-bold text-warning">{stats.bearerOnly}</p>
                            </div>
                            <FaServer className="text-warning" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaDesktop className="text-primary" />
                        Client Management
                    </h1>
                    <p className="text-base-content/70">
                        Manage OAuth 2.0 and OpenID Connect clients for the realm
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="btn btn-ghost">
                        <FaDownload /> Export
                    </button>
                    <button className="btn btn-secondary">
                        <FaUpload /> Import
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <FaPlus /> Create Client
                    </button>
                </div>
            </div>

            {renderClientStats()}

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="form-control flex-1">
                            <div className="input input-bordered flex items-center gap-2">
                                <FaSearch className="opacity-50" />
                                <input
                                    type="text"
                                    placeholder="Search clients by ID, name, or description..."
                                    className="w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="btn btn-xs btn-ghost"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <select
                                className="select select-bordered select-sm"
                                value={selectedProtocol}
                                onChange={(e) => setSelectedProtocol(e.target.value)}
                            >
                                <option value="all">All Protocols</option>
                                {protocols.map(protocol => (
                                    <option key={protocol} value={protocol}>
                                        {protocol === 'openid-connect' ? 'OpenID Connect' : 'SAML'}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="enabled">Enabled</option>
                                <option value="disabled">Disabled</option>
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                {clientTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>

                            <button className="btn btn-ghost btn-sm">
                                <FaFilter /> More Filters
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClients.map(client => renderClientCard(client))}
                    </div>

                    {filteredClients.length === 0 && (
                        <div className="text-center py-12">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full bg-base-200">
                                    <FaDesktop className="text-4xl opacity-30" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">No clients found</h3>
                            <p className="opacity-70 mb-6">
                                {searchQuery || selectedProtocol !== 'all' || selectedStatus !== 'all' || selectedType !== 'all'
                                    ? 'Try changing your filters or search query'
                                    : 'Get started by creating your first client'}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowCreateModal(true)}
                            >
                                <FaPlus /> Create First Client
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <div className="text-sm opacity-70">
                            Showing {filteredClients.length} of {clients.length} clients
                        </div>
                        <div className="join">
                            <button className="join-item btn btn-sm">«</button>
                            <button className="join-item btn btn-sm btn-active">1</button>
                            <button className="join-item btn btn-sm">2</button>
                            <button className="join-item btn btn-sm">3</button>
                            <button className="join-item btn btn-sm">»</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <h3 className="card-title text-lg">
                            <FaCogs className="text-info" />
                            Quick Configuration
                        </h3>
                        <div className="space-y-2">
                            <button className="btn btn-outline w-full justify-start">
                                <FaMobileAlt /> Mobile App Template
                            </button>
                            <button className="btn btn-outline w-full justify-start">
                                <FaDesktop /> SPA Template
                            </button>
                            <button className="btn btn-outline w-full justify-start">
                                <FaServer /> Service Account Template
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <h3 className="card-title text-lg">
                            <FaShieldAlt className="text-warning" />
                            Security
                        </h3>
                        <div className="space-y-2">
                            <button className="btn btn-outline w-full justify-start">
                                <FaKey /> Rotate All Secrets
                            </button>
                            <button className="btn btn-outline w-full justify-start">
                                <FaHistory /> Audit Logs
                            </button>
                            <button className="btn btn-outline w-full justify-start">
                                <FaUserShield /> Permissions
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <h3 className="card-title text-lg">
                            <FaUsers className="text-success" />
                            Resources
                        </h3>
                        <div className="space-y-2">
                            <button className="btn btn-outline w-full justify-start">
                                <FaExternalLinkAlt /> API Documentation
                            </button>
                            <button className="btn btn-outline w-full justify-start">
                                <FaQrcode /> OAuth 2.0 Guide
                            </button>
                            <button className="btn btn-outline w-full justify-start">
                                <FaCertificate /> SAML Guide
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showCreateModal && renderCreateModal()}
            {showSecretModal && renderSecretModal()}

            <div className="alert alert-info">
                <FaQuestionCircle />
                <div>
                    <h3 className="font-bold">Client Management Guide</h3>
                    <div className="text-sm">
                        • <strong>Public Clients</strong>: For SPAs and mobile apps where secret cannot be secured<br/>
                        • <strong>Confidential Clients</strong>: For server-side applications with secure secret storage<br/>
                        • <strong>Bearer Only Clients</strong>: For service-to-service communication without user context<br/>
                        • Always validate redirect URIs and use HTTPS in production
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;