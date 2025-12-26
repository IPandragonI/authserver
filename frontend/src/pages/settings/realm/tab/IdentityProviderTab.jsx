import {FaCheckCircle, FaDatabase, FaEdit, FaPlus, FaTrash} from "react-icons/fa";
import {useState} from "react";

const RealmSettingsIdentityProviderTab = ({realmConfig, setRealmConfig, showSecret}) => {
    const [newIdentityProvider, setNewIdentityProvider] = useState({
        alias: '',
        providerId: 'google',
        enabled: true,
        trustEmail: false,
        storeToken: false
});

    const handleAddIdentityProvider = () => {
        if (!newIdentityProvider.alias) {
            alert('Alias is required');
            return;
        }

        const provider = {
            ...newIdentityProvider,
            id: `idp-${Date.now()}`,
            config: {}
        };

        setRealmConfig(prev => ({
            ...prev,
            identityProviders: [...prev.identityProviders, provider]
        }));

        setNewIdentityProvider({
            alias: '',
            providerId: 'google',
            enabled: true,
            trustEmail: false,
            storeToken: false
        });
    };

    return (
        <div className="space-y-6">
            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaPlus className="mr-2"/>
                        Add Identity Provider
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Alias *</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={newIdentityProvider.alias}
                                onChange={(e) => setNewIdentityProvider({
                                    ...newIdentityProvider,
                                    alias: e.target.value
                                })}
                                placeholder="google"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Provider</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={newIdentityProvider.providerId}
                                onChange={(e) => setNewIdentityProvider({
                                    ...newIdentityProvider,
                                    providerId: e.target.value
                                })}
                            >
                                <option value="google">Google</option>
                                <option value="github">GitHub</option>
                                <option value="facebook">Facebook</option>
                                <option value="twitter">Twitter</option>
                                <option value="microsoft">Microsoft</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="instagram">Instagram</option>
                                <option value="oidc">OpenID Connect</option>
                                <option value="saml">SAML 2.0</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={newIdentityProvider.enabled}
                                    onChange={(e) => setNewIdentityProvider({
                                        ...newIdentityProvider,
                                        enabled: e.target.checked
                                    })}
                                />
                                <span className="label-text ml-3">Enabled</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={newIdentityProvider.trustEmail}
                                    onChange={(e) => setNewIdentityProvider({
                                        ...newIdentityProvider,
                                        trustEmail: e.target.checked
                                    })}
                                />
                                <span className="label-text ml-3">Trust Email</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={newIdentityProvider.storeToken}
                                    onChange={(e) => setNewIdentityProvider({
                                        ...newIdentityProvider,
                                        storeToken: e.target.checked
                                    })}
                                />
                                <span className="label-text ml-3">Store Token</span>
                            </label>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary w-full mt-4"
                        onClick={handleAddIdentityProvider}
                    >
                        <FaPlus className="mr-2"/>
                        Add Provider
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold">Identity Providers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {realmConfig.identityProviders.map(provider => (
                        <div key={provider.id} className="card bg-base-100 border border-base-300">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="card-title">{provider.alias}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="badge badge-outline">{provider.providerId}</span>
                                            <span
                                                className={`badge ${provider.enabled ? 'badge-success' : 'badge-error'}`}>
                                                {provider.enabled ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="btn btn-xs btn-info">
                                            <FaEdit/>
                                        </button>
                                        <button className="btn btn-xs btn-error">
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-2">
                                        <FaCheckCircle className={provider.trustEmail ? 'text-success' : 'opacity-30'}/>
                                        <span
                                            className="text-sm">Trust Email: {provider.trustEmail ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaDatabase className={provider.storeToken ? 'text-info' : 'opacity-30'}/>
                                        <span
                                            className="text-sm">Store Token: {provider.storeToken ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>

                                {provider.config && Object.keys(provider.config).length > 0 && (
                                    <div className="mt-4">
                                        <div className="text-sm font-semibold mb-2">Configuration:</div>
                                        <div className="space-y-1 text-xs">
                                            {Object.entries(provider.config).map(([key, value]) => (
                                                <div key={key} className="flex justify-between">
                                                    <span className="opacity-70">{key}:</span>
                                                    <span className="font-mono">
                                                        {key.includes('Secret') || key.includes('Password') ?
                                                            showSecret[key] ? value : '••••••••' :
                                                            value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RealmSettingsIdentityProviderTab;