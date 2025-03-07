import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Job() {
  const { jId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/jobs/${jId}`);
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError(err.response?.data?.message || "Failed to fetch job details.");
      }
    };

    fetchJobDetails();
  }, [jId]);

  if (error) return <p>Error: {error}</p>;
  if (!job) return <p>Loading job details...</p>;

  return (
    <div>
      <h1>JOB DETAILS</h1>
      <div>
        <h1>Role: {job.title}</h1>
        <p>Description: {job.description}</p>
        <p>Company: {job.company}</p>
        <p>Location: {job.location}</p>
        <p>Posted At: {job.created_at}</p>
      </div>
    </div>
  );
}

export default Job;
