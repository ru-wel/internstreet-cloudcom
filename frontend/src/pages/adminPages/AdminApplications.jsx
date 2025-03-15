import React, { use, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
          const result = await fetch(`http://localhost:3000/apply-job/all`);
          const fetchedApplications = await result.json();
          setApplications(fetchedApplications);
        } catch (err) {
          console.error('Error fetching jobs:', err);
          setErrors(err.response?.data?.message || 'Failed to fetch jobs.');
        } finally {

        }
      };
      fetchApplications();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Admin - Applications | InternStreet</title>
      </Helmet>
      <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Resume</th>
            <th>Cover Letter</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.c_name}</td>
                <td>{app.c_position}</td>
                <td>{app.c_location}</td>
                <td>{app.resume}</td>
                <td>{app.cover_letter}</td>
                <td>{app.status}</td>
                <td>Edit | Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default AdminApplications