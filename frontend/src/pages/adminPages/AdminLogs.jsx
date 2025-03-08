import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminLogs() {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const result = await fetch(`http://localhost:3000/logs`);
                const fetchedLogs = await result.json();
                setLogs(fetchedLogs);
            } catch (err) {
                console.error("Error fetching logs:", err);
                setError(err.response?.data?.message || "Failed to fetch logs.");
            }
        };

        fetchLogs();
    }, []);

    const deleteLog = async (log) => {
        if (!log.id) {
            console.error("Log ID is missing:", log);
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:3000/logs/${log.id}`);

            if (response.status === 200 || response.status === 204) {
                setLogs((prevLogs) => prevLogs.filter((l) => l.id !== log.id));
            } else {
                console.error("Failed to delete log. Response:", response);
            }
        } catch (error) {
            console.error("Error deleting log:", error);
        }
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Email</th>
                        <th>Action</th>
                        <th>IP Address</th>
                        <th>OS Version</th>
                        <th>Processor</th>
                        <th>Browser Type</th>
                        <th>Location</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.executed_at}</td>
                            <td>{log.email}</td>
                            <td>{log.action}</td>
                            <td>{log.ip_address}</td>
                            <td>{log.os_version}</td>
                            <td>{log.processor}</td>
                            <td>{log.browser_type}</td>
                            <td>{log.location}</td>
                            <td>
                                <button onClick={() => deleteLog(log)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminLogs;
