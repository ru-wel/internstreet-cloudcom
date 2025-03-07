import React from 'react'

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
    <div>Users</div>
  )
}

export default AdminUsers