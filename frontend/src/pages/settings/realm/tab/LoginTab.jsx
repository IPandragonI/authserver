import {FaDesktop, FaEnvelope, FaGlobe} from "react-icons/fa";

const RealmSettingsLoginTab = ({realmConfig, handleNestedChange, handleInputChange}) => {

    return (
        <div className="space-y-8">
            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaDesktop className="mr-2" />
                        Themes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(realmConfig.login.themes).map(([key, value]) => (
                            <div key={key} className="form-control">
                                <label className="label">
                                    <span className="label-text capitalize">
                                        {key.replace('Theme', ' Theme')}
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    value={value}
                                    onChange={(e) => handleNestedChange('login', 'themes', key, e.target.value)}
                                >
                                    <option value="keycloak">Keycloak</option>
                                    <option value="base">Base</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaGlobe className="mr-2" />
                        Internationalization
                    </h3>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={realmConfig.login.internationalizationEnabled}
                                    onChange={(e) => handleInputChange('login', 'internationalizationEnabled', e.target.checked)}
                                />
                                <span className="label-text ml-3">Enable Internationalization</span>
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Default Locale</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={realmConfig.login.defaultLocale}
                                onChange={(e) => handleInputChange('login', 'defaultLocale', e.target.value)}
                            >
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="es">Spanish</option>
                                <option value="de">German</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaEnvelope className="mr-2" />
                        Email Settings
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">SMTP Host</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={realmConfig.login.smtpServer.host}
                                    onChange={(e) => handleNestedChange('login', 'smtpServer', 'host', e.target.value)}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Port</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered"
                                    value={realmConfig.login.smtpServer.port}
                                    onChange={(e) => handleNestedChange('login', 'smtpServer', 'port', parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">From Address</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered"
                                value={realmConfig.login.smtpServer.from}
                                onChange={(e) => handleNestedChange('login', 'smtpServer', 'from', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={realmConfig.login.smtpServer.ssl}
                                        onChange={(e) => handleNestedChange('login', 'smtpServer', 'ssl', e.target.checked)}
                                    />
                                    <span className="label-text ml-3">Use SSL</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={realmConfig.login.smtpServer.tls}
                                        onChange={(e) => handleNestedChange('login', 'smtpServer', 'tls', e.target.checked)}
                                    />
                                    <span className="label-text ml-3">Use TLS</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RealmSettingsLoginTab;