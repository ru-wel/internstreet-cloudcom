import React, { useEffect, useState } from 'react';

function AdminLogs() {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const result = await fetch(`http://localhost:3000/logs`);
                const fetchedLogs = await result.json();
                setLogs(fetchedLogs);
              } catch (err) {
                console.error('Error fetching logs:', err);
                setErrors(err.response?.data?.message || 'Failed to fetch logs.');
              } finally {
              }
            };
            fetchLogs();
    }, []);
  return (
    <div>
        <div>
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
                </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.executed_at}</td>
                            <td>{log.email}</td>
                            <td>{log.action}</td>
                            <td>{log.ip_address}</td>
                            <td>{log.os_version}</td>
                            <td>{log.browser_type}</td>
                            <td>{log.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminLogs