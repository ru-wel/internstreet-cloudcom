import React, { useEffect, useState } from 'react'
import { FaUpload } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Application = () => {
    const navigate = useNavigate();
    const compData = useLocation();
    const company = compData.state;
    const [error, setError] = useState('');

    const [resume, setResume] = useState(null);
    const [cover, setCover] = useState(null);

    const [user, setUser] = useState([]);
    const [UID, setUID] = useState(null);

    const [editDetails, setEdit] = useState({ location: '', number: ''});

    const handleResume = (e) => {
        setResume(e.target.files[0]);
    }
    const handleCover = (e) => {
        setCover(e.target.files[0]);
    }

    const applyNow = async () => {

        if(!resume || !cover){
            alert('Please upload both requirements!');
            return;
        }

        const applyData = new FormData();
        applyData.append('email', user.email);
        applyData.append('c_name', company.name);
        applyData.append('c_position', company.title);
        applyData.append('resume', resume);
        applyData.append('cover', cover);
        applyData.append('c_location', company.location);
        applyData.append('c_logo', company.logo);
        applyData.append('job_id', company.id);
        applyData.append('name', user.name);
        
        try{
            const result = await axios.post(import.meta.env.VITE_API_URL + "/apply-job", applyData,
            {
                headers: {"Content-Type": "multipart/form-data" },
            });
            alert('Successfully applied');
            navigate(`/job/${company.id}`);
        }catch(error){
            console.log(error);
            alert('Application failed');
        }
    }
    // SUBMIT EDIT
    const handleEdit = async (e) => {
        e.preventDefault();
    
        if (Object.keys(error).length === 0){
          try {
            const response = await axios.put(import.meta.env.VITE_API_URL + `/users/profile/${UID}`, editDetails);
            alert('Successfully updated user details');
          } catch (error) {
            console.error('Error updating user:', error);
            alert(error.response.data.message || 'Failed to update user details.');
          }
        }
    }

    // USER DETAILS

    // FETCH TOKEN + DECODE
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        const decoded = jwtDecode(token);
        setUID(decoded.id);
        }
    }, []);

    // EDIT USER
    useEffect(() => {

        const fetchUser = async () => {
        try {
            if (!UID) return;
            const response = await fetch(import.meta.env.VITE_API_URL + `/users/${UID}`);
            const result = await response.json();
            setUser(result);
        } catch (err) {
            console.error('Error fetching user:', err);
            setError(err.message || 'Failed to fetch user.');
        } finally { 

            
        }
        }
        fetchUser();
    }, [UID]);

    return (
        <div className='bg-gradient-to-r from-[#b4d5ce] to-[#c6f5ed] to-90%'>
            <Helmet>
              <title>{company.title} for {company.name} | InternStreet</title>
            </Helmet>
            <Nav></Nav>
            <div className="items-start px-10 py-7 rounded-t-3xl">
                <div className="flex flex-col lg:flex-row lg:ml-30 ml-0 mt-10 overflow-hidden max-w-2xl md:max-w-4xl w-full items-center justify-center">
                    <div className="bg-[#d1eae6] p-2 rounded-3xl border-1 max-w-xs sm:max-w-md">
                        <img src={company.logo} alt="Job Image" className="w-24 p-4 h-auto object-cover rounded-2xl" />
                    </div>

                    <div className="w-full lg:w-2/3 lg:ml-12 flex flex-col items-center lg:items-start justify-center mt-4 lg:mt-0">
                        <h3 className="text-gray-500 text-lg mb-2 font-semibold uppercase">Applying for</h3>
                        <h2 className="text-3xl lg:text-4xl font-bold text-black mt-2">{company.title}</h2>
                        <p className="text-black mt-1 text-lg">{company.name}</p>
                    </div>
                </div>


                <hr className="my-8 border-t-2 border-gray-400 w-full max-w-7xl mx-auto" />

                <div className="bg-gradient-to-r from-[#94c6bc] to-[#c6eee8] to-90% p-8 mt-9 max-w-7xl mx-auto rounded-3xl my-20 border">
                    <div className='max-w-5xl mx-auto'>
                        <h2 className="text-4xl font-bold text-center lg:text-left my-8">Personal Details</h2>
                        <form onSubmit={handleEdit} className="space-y-4 max-w-4xl mx-auto mt-8">
                            <div className="flex flex-col sm:flex-row sm:space-x-20">
                                <div className="w-full lg:w-1/2 mb-4 md:mb-0">
                                  <p className="text-black font-semibold text-md">Full Name</p>
                                  <p className="px-0 lg:px-10 py-2 text-lg">{user.name}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-black font-semibold text-md mb-2">Location</label>
                                <input type="text" className="p-3 border border-gray-400 w-full rounded-3xl text-center bg-white placeholder-gray-500 text-black focus:outline-none" placeholder={user.location} onChange={(e) => setEdit({ ...editDetails, location: e.target.value })}/>
                            </div>

                            <div>
                                <label className="block text-black font-semibold text-md mb-2">Phone Number</label>
                                <input type="text" className="p-3 border border-gray-400 w-full rounded-3xl text-center bg-white placeholder-gray-500 text-black focus:outline-none" placeholder={user.number} onChange={(e) => setEdit({ ...editDetails, number: e.target.value })} />
                            </div>

                            <div>
                                <p className="text-black font-semibold text-md">Email Address</p>
                                <p className="px-0 lg:px-10 py-2 text-lg">{user.email}</p>
                            </div>

                            <button type="submit" className="bg-[#497D74] text-white px-8 py-2 text-lg rounded-3xl cursor-pointer" >Save</button>
                            <p>*this only updates your personal info above</p>

                            <div className="flex space-x-4">
                                <div className="w-1/2 flex flex-col items-center">
                                    <p className="font-semibold text-lg">Resume</p>
                                    <label htmlFor="resume" className="bg-[#497D74] text-white font-bold px-4 py-2 rounded-3xl mt-2 flex items-center gap-2 cursor-pointer">
                                    <FaUpload /> {resume ? `${resume.name}` : "Choose File"}
                                    <input onChange={handleResume} type="file" name="resume" id="resume" className="hidden" />
                                    </label>
                                </div>
                                <div className="w-1/2 flex flex-col items-center">
                                    <p className="font-semibold text-lg">Cover Letter</p>
                                    <label htmlFor="cover" className="bg-[#497D74] text-white font-bold px-4 py-2 rounded-3xl mt-2 flex items-center gap-2 cursor-pointer">
                                    <FaUpload /> {cover ? `${cover.name}` : "Choose File"}
                                    <input onChange={handleCover} type="file" name="cover" id="cover" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-center mt-8">
                                <button className="bg-[#27445d] border-2 border-[#1d3346] border-b-6 border-r-6 text-white py-2 px-6 rounded-3xl transition transform hover:scale-105 mb-4 sm:mb-0 cursor-pointer text-xl" onClick={applyNow}>
                                    Submit
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Application