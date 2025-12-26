import {FaDownload, FaHistory} from "react-icons/fa";

const RealmsSettingsEventsTab = ({realmConfig, handleNestedChange}) => {
    return (
        <div className="space-y-6">
            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaHistory className="mr-2"/>
                        Events Configuration
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={realmConfig.login.events.eventsEnabled}
                                        onChange={(e) => handleNestedChange('login', 'events', 'eventsEnabled', e.target.checked)}
                                    />
                                    <span className="label-text ml-3">Enable Events</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={realmConfig.login.events.adminEventsEnabled}
                                        onChange={(e) => handleNestedChange('login', 'events', 'adminEventsEnabled', e.target.checked)}
                                    />
                                    <span className="label-text ml-3">Enable Admin Events</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Events Expiration (seconds)</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                value={realmConfig.login.events.eventsExpiration}
                                onChange={(e) => handleNestedChange('login', 'events', 'eventsExpiration', parseInt(e.target.value))}
                            />
                            <div className="label-text-alt opacity-70">
                                Events older than this will be automatically deleted
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-200">
                <div className="card-body">
                    <h3 className="card-title">
                        <FaDownload className="mr-2"/>
                        Events Export
                    </h3>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Export Format</span>
                            </label>
                            <select className="select select-bordered">
                                <option>JSON</option>
                                <option>CSV</option>
                                <option>XML</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date From</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date To</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered"
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary">
                            <FaDownload className="mr-2"/>
                            Export Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RealmsSettingsEventsTab;