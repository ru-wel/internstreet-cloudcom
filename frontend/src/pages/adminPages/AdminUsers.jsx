import React, { useEffect, useState } from 'react';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await fetch(`http://localhost:3000/users`);
                const fetchedUsers = await result.json();
                setUsers(fetchedUsers);
              } catch (err) {
                console.error('Error fetching users:', err);
                setErrors(err.response?.data?.message || 'Failed to fetch users.');
              } finally {
              }
            };
            fetchUsers();
    }, []);
  return (
    <div>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Date/Time</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.created_at}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.user_role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminUsers