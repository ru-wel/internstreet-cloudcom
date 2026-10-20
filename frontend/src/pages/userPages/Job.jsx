import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from 'react-helmet';
import Nav from '../components/Nav'
import Footer from '../components/Footer';

function Job() {
  const navigate = useNavigate();
  const { jId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isApplied, setApplied] = useState(false);

  const fetchApplication = async (jobId) =>{
    const application = await axios.get(import.meta.env.VITE_API_URL + `/apply-job/job/${jobId}`);
    application.data ? (setApplied(true)) : (setApplied(false));
  }
  useEffect(() => {

    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + `/jobs/${jId}`);
        setJob(response.data);
        // Only logged-in students have applications to check
        if (localStorage.getItem('token')) fetchApplication(response.data.id);

      } catch (err) {
        console.error("Error fetching job details:", err);
        setError(err.response?.data?.message || "Failed to fetch job details.");
      }
    };
    fetchJobDetails();
  }, [jId]);

  const handleApply = () =>{
    navigate('/apply', { state: { title: job.title, desc: job.description, name: job.company, location: job.location, logo: job.logo, id: job.id }})
  }
  if (error || !job) return (
    <div className="bg-gradient-to-r from-[#cdf1e9] to-[#b7e2db] to-90% min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="flex-grow flex flex-col justify-center items-center px-5 py-20 text-center text-[#1F3531]">
        {error ? (
          <>
            <h1 className="text-2xl font-bold">We couldn't load this job</h1>
            <p className="mt-2 text-lg">{error}</p>
            <Link to="/" className="mt-6 underline underline-offset-4 font-semibold">Back to all jobs</Link>
          </>
        ) : (
          <div role="status" className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1F3531] border-solid"></div>
            <p className="mt-4">Loading job…</p>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-[#cdf1e9] to-[#b7e2db] to-90% ">
      <Helmet>
        <title>{job.title} for {job.company} | InternStreet</title>
      </Helmet>
      <Nav></Nav>

      <div className="lg:grid lg:grid-cols-2 mx-10 mt-5">
        <div className="flex items-center lg:mx-10">
          <div className="h-40 w-40 flex-shrink-0 bg-[#add1ca] border rounded-4xl p-2 flex items-center justify-center overflow-hidden">
            <img src={job.logo} alt={`${job.company} logo`} className="h-full w-full object-contain"/>
          </div>
          <div className="">
            <h1 className="lg:ml-10 ml-5 lg:text-4xl text-2xl font-bold text-gray-800">{job.title}</h1>
            <h3 className=" lg:ml-10 ml-5 lg:text-2xl text-xl font-semibold text-gray-800 ">{job.company}</h3>
            <p className=" lg:ml-10 ml-5 lg:text-lg text-md text-gray-800 ">{job.location}</p>

            <div className="mt-4">
              <button onClick={handleApply} className="lg:ml-10 ml-5 text-white lg:text-lg text-md rounded-3xl px-5 py-2 bg-[#497D74] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3531] focus-visible:ring-offset-2" disabled={isApplied}>{isApplied ? "Applied" : "Apply Now"}</button>
            </div> 
          </div>
        </div>
      </div>
      
      
      <div className="rounded-3xl  bg-[#cdf1e9] backdrop-blur-lg  border lg:mt-10 lg:mx-20 lg:px-15 lg:py-10 md:mt-10 md:mx-20 md:px-15 md:py-10 mx-5 mt-10 px-8 py-10">
        <h2 className="text-xl font-bold text-">Job Description:</h2>
        <div className="text-lg lg:px-40 md:px-5  px-6 mt-5">
          <p style={{ whiteSpace: 'pre-line' }}> {/* converts \n to actual line breaks */ }
            {job.details.job_description}
          </p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-4 lg:mx-20 md:mx-20 mx-5 lg:mt-5 md:mt-2 mb-4">

        <div className="rounded-3xl bg-[#cdf1e9] backdrop-blur-lg border lg:px-15 lg:py-10 md:px-10 md:py-10 mt-5 px-8 py-10 lg:mt-0 md:mt-0 mb-5">
          <h2 className="text-xl font-bold">Job Qualification:</h2>
          <div className="text-lg lg:px-5 md:px-5 mt-5 px-6 ">
            <p style={{ whiteSpace: 'pre-line' }}> {/* converts \n to actual line breaks */ }
              {job.details.job_qualifications}
            </p>
          </div>
        </div>
        
        <div className="rounded-3xl bg-[#cdf1e9] backdrop-blur-lg border-1 lg:px-15 lg:py-10 md:px-10 md:py-10 mt-5 lg:mt-0 md:mt-0 px-8 py-10 mb-5">
          <h2 className="text-xl font-bold">Employer Questions:</h2>
          <div className="text-lg lg:px-5 md:px-5 mt-5 px-6">
            <p style={{ whiteSpace: 'pre-line' }}> {/* converts \n to actual line breaks */ }
              {job.details.employer_questions}
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Job;
