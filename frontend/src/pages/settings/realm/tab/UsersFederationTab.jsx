import {FaDatabase, FaEye, FaEyeSlash, FaPlus, FaServer} from "react-icons/fa";

const RealmsSettingsUsersFederationTab = ({showSecret, toggleSecret}) => {
    return (
        <div className="space-y-6">
            <div className="alert alert-info">
                <FaDatabase/>
                <div>
                    <h4 className="font-bold">User Federation</h4>
                    <p className="text-sm">
                        Connect external user databases like LDAP, Active Directory, or custom user stores.
                        Users will be imported and synchronized automatically.
                    </p>
                </div>
            </div>

            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaServer className="mr-2"/>
                        LDAP Configuration
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Connection URL</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="ldap://ldap.example.com:389"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Users DN</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="ou=users,dc=example,dc=com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bind DN</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="cn=admin,dc=example,dc=com"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Bind Credential</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showSecret.ldapPassword ? 'text' : 'password'}
                                        className="input input-bordered w-full pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={() => toggleSecret('ldapPassword')}
                                    >
                                        {showSecret.ldapPassword ? <FaEyeSlash/> : <FaEye/>}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Edit Mode</span>
                            </label>
                            <select className="select select-bordered">
                                <option value="READ_ONLY">Read Only</option>
                                <option value="WRITABLE">Writable</option>
                                <option value="UNSYNCED">Unsynced</option>
                            </select>
                        </div>

                        <button className="btn btn-primary">
                            <FaPlus className="mr-2"/>
                            Add LDAP Provider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RealmsSettingsUsersFederationTab;