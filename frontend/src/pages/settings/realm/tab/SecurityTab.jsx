import {FaLock, FaShieldAlt} from "react-icons/fa";

const RealmSettingsSecurityTab = ({realmConfig, handleInputChange}) => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaLock className="mr-2"/>
                        SSL Requirements
                    </h3>
                    <div className="form-control">
                        <select
                            className="select select-bordered"
                            value={realmConfig.security.sslRequired}
                            onChange={(e) => handleInputChange('security', 'sslRequired', e.target.value)}
                        >
                            <option value="external">External requests only</option>
                            <option value="all">All requests</option>
                            <option value="none">None</option>
                        </select>
                        <div className="label-text-alt opacity-70 mt-2">
                            External: SSL required for external requests only
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaShieldAlt className="mr-2"/>
                        Brute Force Detection
                    </h3>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={realmConfig.security.bruteForceProtection}
                                    onChange={(e) => handleInputChange('security', 'bruteForceProtection', e.target.checked)}
                                />
                                <span className="label-text ml-3">Enable Brute Force Detection</span>
                            </label>
                        </div>

                        {realmConfig.security.bruteForceProtection && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Max Login Failures</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered"
                                        value={realmConfig.security.failureFactor}
                                        onChange={(e) => handleInputChange('security', 'failureFactor', parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Wait Increment (seconds)</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered"
                                        value={realmConfig.security.waitIncrementSeconds}
                                        onChange={(e) => handleInputChange('security', 'waitIncrementSeconds', parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Quick Login Wait (seconds)</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered"
                                        value={realmConfig.security.minimumQuickLoginWaitSeconds}
                                        onChange={(e) => handleInputChange('security', 'minimumQuickLoginWaitSeconds', parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Max Temporary Lockouts</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered"
                                        value={realmConfig.security.maxTemporaryLockouts}
                                        onChange={(e) => handleInputChange('security', 'maxTemporaryLockouts', parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RealmSettingsSecurityTab;