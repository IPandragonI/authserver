import {FaClock, FaInfoCircle} from "react-icons/fa";

const RealmSettingsTokenTab = ({handleInputChange, realmConfig}) => {
    const tokenSettings = [
        {key: 'ssoSessionIdleTimeout', label: 'SSO Session Idle', unit: 'seconds', defaultValue: 1800},
        {key: 'ssoSessionMaxLifespan', label: 'SSO Session Max', unit: 'seconds', defaultValue: 36000},
        {key: 'accessTokenLifespan', label: 'Access Token Lifespan', unit: 'seconds', defaultValue: 300},
        {
            key: 'accessTokenLifespanForImplicitFlow',
            label: 'Access Token Lifespan (Implicit)',
            unit: 'seconds',
            defaultValue: 900
        },
        {key: 'accessCodeLifespan', label: 'Authorization Code Lifespan', unit: 'seconds', defaultValue: 60},
        {key: 'accessCodeLifespanUserAction', label: 'User Action Lifespan', unit: 'seconds', defaultValue: 300},
        {key: 'actionTokenGeneratedByUserLifespan', label: 'Action Token (User)', unit: 'seconds', defaultValue: 300},
        {
            key: 'actionTokenGeneratedByAdminLifespan',
            label: 'Action Token (Admin)',
            unit: 'seconds',
            defaultValue: 43200
        }
    ];

    return (
        <div className="space-y-6">
            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaClock className="mr-2"/>
                        Token Lifespans (seconds)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tokenSettings.map(setting => (
                            <div key={setting.key} className="form-control">
                                <label className="label">
                                    <span className="label-text">{setting.label}</span>
                                    <button
                                        className="label-text-alt link link-primary"
                                        onClick={() => handleInputChange('tokens', setting.key, setting.defaultValue)}
                                    >
                                        Reset
                                    </button>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered"
                                    value={realmConfig.tokens[setting.key]}
                                    onChange={(e) => handleInputChange('tokens', setting.key, parseInt(e.target.value))}
                                />
                                <div className="label-text-alt opacity-70">
                                    {setting.unit}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="alert alert-info">
                <FaInfoCircle/>
                <div>
                    <h4 className="font-bold">Token Lifespan Recommendations</h4>
                    <p className="text-sm">
                        • Access tokens: 5-15 minutes for security<br/>
                        • SSO session: 30 minutes idle, 10 hours max<br/>
                        • Refresh tokens: 30 days for better UX<br/>
                        • Action tokens: 5 minutes for user actions
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RealmSettingsTokenTab;