import React from 'react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

function AdminJobs() {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const result = await fetch(`http://localhost:3000/jobs`);
                const fetchedJobs = await result.json();
                setJobs(fetchedJobs);
              } catch (err) {
                console.error('Error fetching jobs:', err);
                setErrors(err.response?.data?.message || 'Failed to fetch jobs.');
              } finally {
              }
            };
            fetchJobs();
    }, []);
  return (
    <div>
      <Helmet>
        <title>Admin - Jobs | InternStreet</title>
      </Helmet>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Company</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index}>
                            <td>{job.title}</td>
                            <td>{job.description}</td>
                            <td>{job.company}</td>
                            <td>{job.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminJobs