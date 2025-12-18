import {FaEdit, FaTrash} from "react-icons/fa";

const DataTable = ({ data, columns }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} className="font-semibold">{col.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col) => (
                            <td key={col.key}>
                                {col.key === 'actions' ? (
                                    <div className="flex gap-2">
                                        <button className="btn btn-xs btn-info">
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="btn btn-xs btn-error">
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                ) : (
                                    row[col.key]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;