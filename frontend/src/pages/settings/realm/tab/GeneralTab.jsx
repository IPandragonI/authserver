const RealmSettingsGeneralTab = ({realmConfig, handleInputChange}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Realm Name *</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={realmConfig.general.realmName}
                        onChange={(e) => handleInputChange('general', 'realmName', e.target.value)}
                        disabled
                    />
                    <div className="label-text-alt opacity-70">
                        Cannot be changed after creation
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Display Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={realmConfig.general.displayName}
                        onChange={(e) => handleInputChange('general', 'displayName', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={realmConfig.general.enabled}
                            onChange={(e) => handleInputChange('general', 'enabled', e.target.checked)}
                        />
                        <span className="label-text ml-3">Realm Enabled</span>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={realmConfig.general.registrationAllowed}
                            onChange={(e) => handleInputChange('general', 'registrationAllowed', e.target.checked)}
                        />
                        <span className="label-text ml-3">User Registration</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={realmConfig.general.loginWithEmailAllowed}
                            onChange={(e) => handleInputChange('general', 'loginWithEmailAllowed', e.target.checked)}
                        />
                        <span className="label-text ml-3">Login with Email</span>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={realmConfig.general.editUsernameAllowed}
                            onChange={(e) => handleInputChange('general', 'editUsernameAllowed', e.target.checked)}
                        />
                        <span className="label-text ml-3">Edit Username</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={realmConfig.general.resetPasswordAllowed}
                            onChange={(e) => handleInputChange('general', 'resetPasswordAllowed', e.target.checked)}
                        />
                        <span className="label-text ml-3">Forgot Password</span>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={realmConfig.general.rememberMe}
                            onChange={(e) => handleInputChange('general', 'rememberMe', e.target.checked)}
                        />
                        <span className="label-text ml-3">Remember Me</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default RealmSettingsGeneralTab;