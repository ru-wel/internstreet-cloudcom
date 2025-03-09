import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cloudstaff from '/images/cloudstaff.png'

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


        <div className="bg-[#497D74] rounded-3xl px-6 py-3 text-3xl font-bold text-center mb-10">
          <h1>{job.title}</h1>
        </div>

        <div className="lg:grid lg:grid-cols-2 mx-10">
          <div className="flex items-center lg:mx-10">
            <img src = {cloudstaff} className="w-40 h-40 bg-[#EFE9D5] border rounded-4xl p-2"/>
            <div className="">
              <h3 className=" lg:ml-10 ml-5 lg:text-3xl text-xl font-bold text-gray-800 ">{job.company}</h3>
              <p className=" lg:ml-10 ml-5 lg:text-lg text-md text-gray-800 ">{job.location}</p>

              <div className="mt-4">
                <button className=" lg:ml-10 ml-5 text-white lg:text-lg text-md rounded-3xl px-5 py-2 bg-[#497D74]">Apply Now</button>
              </div> 
            </div>
          </div>
          
          <div className="lg:flex lg:justify-end lg:mt-24 lg:mr-20 justify-center mt-3">
            <div className="flex md:justify-center">
                  <button className=" ml-10 mt-2 text-black rounded-xl px-5 py-2 bg-[#EFE9D5] border flex items-center">Save  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill ml-2" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                  </svg>
                  </button>
                  <button className=" ml-10 mt-2 text-black rounded-xl px-5 py-2 bg-[#EFE9D5] border flex items-center">Share
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill ml-2" viewBox="0 0 16 16">
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                  </svg>
                  </button>
            </div>   
          </div>
        </div>
        
        <div className="rounded-3xl bg-[#ADC4C0] lg:mt-10 lg:mx-20 lg:px-15 lg:py-10 md:mt-10 md:mx-20 md:px-15 md:py-10 mx-5 mt-10 px-8 py-10">
          <h2 className="text-xl font-bold">Job Description:</h2>
          <div className="text-lg lg:px-40 md:px-5  px-6 mt-5">
            <p>
              {job.description}
            </p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-4 lg:mx-20 md:mx-20 mx-5 lg:mt-5 md:mt-2">

          <div className="rounded-3xl bg-[#ADC4C0] lg:px-15 lg:py-10 md:px-10 md:py-10 mt-5 px-8 py-10 lg:mt-0 md:mt-0">
            <h2 className="text-xl font-bold">Job Qualification:</h2>
            <div className="text-lg lg:px-5 md:px-5 mt-5 px-6">
              <p>
                {job.description}
              </p>
            </div>
          </div>
          
          <div className="rounded-3xl bg-[#ADC4C0] lg:px-15 lg:py-10 md:px-10 md:py-10 mt-5 lg:mt-0 md:mt-0 px-8 py-10">
            <h2 className="text-xl font-bold">Job Summary:</h2>
            <div className="text-lg lg:px-5 md:px-5 mt-5 px-6">
              <p>
                {job.description}
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Job;
