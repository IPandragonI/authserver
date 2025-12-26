import {FaEdit, FaPlus, FaTrash} from "react-icons/fa";
import {useState} from "react";

const RealmSettingsClientTab = ({realmConfig, setRealmConfig}) => {
    const [newClient, setNewClient] = useState({
        clientId: '',
        name: '',
        protocol: 'openid-connect',
        enabled: true,
        publicClient: false,
        bearerOnly: false,
        consentRequired: false,
        redirectUris: [''],
        webOrigins: ['+']
});

    const handleAddClient = () => {
        if (!newClient.clientId || !newClient.name) {
            alert('Client ID and Name are required');
            return;
        }

        const client = {
            ...newClient,
            id: `client-${Date.now()}`,
            redirectUris: newClient.redirectUris.filter(uri => uri.trim() !== '')
        };

        setRealmConfig(prev => ({
            ...prev,
            clients: [...prev.clients, client]
        }));

        setNewClient({
            clientId: '',
            name: '',
            protocol: 'openid-connect',
            enabled: true,
            publicClient: false,
            bearerOnly: false,
            consentRequired: false,
            redirectUris: [''],
            webOrigins: ['+']
        });
    };

    const handleRemoveClient = (clientId) => {
        if (window.confirm('Are you sure you want to remove this client?')) {
            setRealmConfig(prev => ({
                ...prev,
                clients: prev.clients.filter(client => client.id !== clientId)
            }));
        }
    };

    return (
        <div className="space-y-6">
            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaPlus className="mr-2"/>
                        Add New Client
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Client ID *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={newClient.clientId}
                                    onChange={(e) => setNewClient({...newClient, clientId: e.target.value})}
                                    placeholder="my-client"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={newClient.name}
                                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                                    placeholder="My Application"
                                />
                            </div>
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={newClient.enabled}
                                        onChange={(e) => setNewClient({...newClient, enabled: e.target.checked})}
                                    />
                                    <span className="label-text ml-3">Enabled</span>
                                </label>
                            </div>

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
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={newClient.consentRequired}
                                        onChange={(e) => setNewClient({
                                            ...newClient,
                                            consentRequired: e.target.checked
                                        })}
                                    />
                                    <span className="label-text ml-3">Consent Required</span>
                                </label>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary w-full"
                            onClick={handleAddClient}
                        >
                            <FaPlus className="mr-2"/>
                            Add Client
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold">Configured Clients</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                        <tr>
                            <th>Client ID</th>
                            <th>Name</th>
                            <th>Protocol</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th className="text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {realmConfig.clients.map(client => (
                            <tr key={client.id}>
                                <td>
                                    <div className="font-mono">{client.clientId}</div>
                                </td>
                                <td>{client.name}</td>
                                <td>
                                    <span className="badge badge-outline">{client.protocol}</span>
                                </td>
                                <td>
                                        <span className={`badge ${client.enabled ? 'badge-success' : 'badge-error'}`}>
                                            {client.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                </td>
                                <td>
                                    {client.publicClient ? (
                                        <span className="badge badge-info">Public</span>
                                    ) : client.bearerOnly ? (
                                        <span className="badge badge-warning">Bearer Only</span>
                                    ) : (
                                        <span className="badge badge-secondary">Confidential</span>
                                    )}
                                </td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <button className="btn btn-xs btn-info">
                                            <FaEdit/>
                                        </button>
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleRemoveClient(client.id)}
                                        >
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RealmSettingsClientTab;