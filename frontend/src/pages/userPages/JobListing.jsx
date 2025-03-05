import React, { useEffect, useState } from 'react';

function JobListing() {
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
            {jobs.map((job, index) => (
                <div key={index} className='p-20'>
                    <h2 className='font-bold'>Job Title: {job.title}</h2>
                    <p>Job Description: {job.description}</p>
                    <p>Company: {job.company}</p>
                    <p>Location: {job.location}</p>
                </div>
            ))}
            
            <h2></h2>
        </div>
    );
}

export default JobListing