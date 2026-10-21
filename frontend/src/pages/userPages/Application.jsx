import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import { Link, Navigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { AuthContext } from '../../auth/authentication';

// Both files go up in one request, and Vercel rejects request bodies over 4.5 MB
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_FILE = /\.(pdf|docx?)$/i;

const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(1);

const inputClass = "w-full p-3 border border-[#497D74] rounded-xl bg-white text-[#1F3531] placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3531] aria-[invalid=true]:border-red-700";
const fileButtonClass = "bg-[#497D74] border-[#2b4843] border-b-4 border-r-4 text-white font-bold px-4 py-2 rounded-3xl mt-2 inline-flex items-center gap-2 cursor-pointer max-w-full focus-within:ring-2 focus-within:ring-[#1F3531] focus-within:ring-offset-2";

const Application = () => {
    const company = useLocation().state;
    // The shared demo account can apply but not change its profile
    const isDemo = useContext(AuthContext).user?.demo;

    const [user, setUser] = useState(null);
    const [UID, setUID] = useState(null);
    const [userError, setUserError] = useState('');
    const [details, setDetails] = useState({ location: '', number: '' });

    const [resume, setResume] = useState(null);
    const [cover, setCover] = useState(null);

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [applied, setApplied] = useState(false);
    const successHeading = useRef(null);

    // FETCH USER FROM TOKEN
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { id } = jwtDecode(localStorage.getItem('token'));
                setUID(id);
                const response = await axios.get(import.meta.env.VITE_API_URL + `/users/${id}`);
                setUser(response.data);
                setDetails({ location: response.data.location ?? '', number: response.data.number ?? '' });
            } catch (err) {
                console.error('Error fetching user:', err);
                setUserError("We couldn't load your details. Refresh the page to try again.");
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (applied) successHeading.current?.focus();
    }, [applied]);

    const pickFile = (field, setFile) => (e) => {
        const file = e.target.files[0] ?? null;
        if (file && !ALLOWED_FILE.test(file.name)) {
            setFile(null);
            e.target.value = '';
            setErrors({ ...errors, [field]: `"${file.name}" isn't a PDF, DOC or DOCX file.` });
            return;
        }
        setFile(file);
        setErrors({ ...errors, [field]: '', files: '' });
    }

    const validate = () => {
        const found = {};
        if (details.number && !/^09\d{9}$/.test(details.number)) {
            found.number = 'Enter an 11-digit number starting with 09, like 09171234567.';
        }
        if (!resume) found.resume = 'Attach your resume.';
        if (!cover) found.cover = 'Attach your cover letter.';
        if (resume && cover && resume.size + cover.size > MAX_TOTAL_BYTES) {
            found.files = `Your files add up to ${toMB(resume.size + cover.size)} MB. Keep both under 4 MB combined.`;
        }
        return found;
    }

    const applyNow = async (e) => {
        e.preventDefault();
        const found = validate();
        setErrors(found);
        if (Object.values(found).some(Boolean)) return;

        setSubmitting(true);
        try {
            // Location and phone changed here also update the profile
            if (!isDemo && (details.location !== (user.location ?? '') || details.number !== (user.number ?? ''))) {
                await axios.put(import.meta.env.VITE_API_URL + `/users/profile/${UID}`, details);
            }

            const applyData = new FormData();
            // The server copies the job's details from its own record
            applyData.append('job_id', company.id);
            applyData.append('resume', resume);
            applyData.append('cover', cover);

            await axios.post(import.meta.env.VITE_API_URL + "/apply-job", applyData);
            setApplied(true);
        } catch (err) {
            console.error('Error applying:', err);
            let message = err.response?.data?.message || "Your application didn't go through. Check your connection and try again; your files are still attached.";
            if (err.response?.status === 413) message = 'Your files are too large to upload. Keep both under 4 MB combined.';
            setErrors({ form: message });
        } finally {
            setSubmitting(false);
        }
    }

    // Opened directly (no job picked), so there's nothing to apply to
    if (!company) return <Navigate to="/" replace />;

    const fieldError = (field) => errors[field] && (
        <p id={`${field}-error`} className="text-red-800 text-sm font-semibold mt-1">{errors[field]}</p>
    );

    return (
    <div className='bg-gradient-to-r from-[#b4d5ce] to-[#c6f5ed] to-90% min-h-screen flex flex-col'>
      <Helmet>
        <title>{`Apply: ${company.title} at ${company.name} | InternStreet`}</title>
      </Helmet>
      <Nav />

      <main className="flex-grow px-4 sm:px-6 md:px-10 py-10">
        <div className="max-w-3xl mx-auto flex items-center gap-5">
          <div className="bg-white p-2 rounded-2xl border border-[#497D74] shrink-0">
            <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3531] break-words">{company.title}</h1>
            <p className="text-[#1F3531] mt-1 text-base sm:text-lg">{company.name}{company.location && ` · ${company.location}`}</p>
          </div>
        </div>

        <div className="bg-[#f5f0e1] p-6 sm:p-10 mt-8 mb-16 max-w-3xl mx-auto rounded-3xl border border-[#497D74] shadow-md text-[#1F3531]">
          {applied ? (
            <div className="text-center py-6">
              <FaCheckCircle className="mx-auto text-[#497D74] text-5xl" aria-hidden="true" />
              <h2 ref={successHeading} tabIndex={-1} className="text-2xl sm:text-3xl font-bold mt-4 focus:outline-none">Application sent</h2>
              <p className="mt-3 text-lg max-w-xl mx-auto">
                {company.name} now has your resume and cover letter for {company.title}. It shows as <span className="font-semibold">Pending</span> until they review it, and you can follow it from your profile.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link to="/profile" className="bg-[#27445d] border-[#1d3346] border-b-4 border-r-4 text-white py-2 px-6 rounded-3xl transition motion-safe:hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3531] focus-visible:ring-offset-2">
                  Track my applications
                </Link>
                <Link to="/" className="py-2 px-6 rounded-3xl border-2 border-[#497D74] text-[#1F3531] font-semibold hover:bg-[#e6efe9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3531] focus-visible:ring-offset-2">
                  Browse more jobs
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={applyNow} noValidate className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold">Your details</h2>
                {userError && <p role="alert" className="text-red-800 font-semibold mt-2">{userError}</p>}

                <dl className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <dt className="font-semibold">Full name</dt>
                    <dd className="py-1 break-words">{user?.name ?? '…'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Email</dt>
                    <dd className="py-1 break-words">{user?.email ?? '…'}</dd>
                  </div>
                </dl>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="location" className="block font-semibold mb-1">Location</label>
                    <input id="location" type="text" className={inputClass} placeholder="e.g. Quezon City"
                      readOnly={isDemo}
                      value={details.location}
                      onChange={(e) => setDetails({ ...details, location: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="number" className="block font-semibold mb-1">Phone number</label>
                    <input id="number" type="tel" inputMode="numeric" maxLength="11" className={inputClass} placeholder="09XXXXXXXXX"
                      readOnly={isDemo}
                      value={details.number}
                      aria-invalid={Boolean(errors.number)}
                      aria-describedby={errors.number ? 'number-error' : undefined}
                      onChange={(e) => setDetails({ ...details, number: e.target.value.replace(/\D/g, '') })} />
                    {fieldError('number')}
                  </div>
                </div>
                <p className="text-sm mt-2">
                  {isDemo
                    ? "This is the demo account, so these details can't be changed."
                    : 'Changes to your location or phone number also update your profile.'}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Documents</h2>
                <p id="file-hint" className="mt-1">PDF, DOC or DOCX. Up to 4 MB for both files combined.</p>
                {isDemo && (
                  <p className="mt-2 text-sm font-semibold bg-[#e6f4f1] rounded-lg p-3">
                    All visitors share the demo account and can see its applications. Use sample files, not your real resume or cover letter.
                  </p>
                )}

                <div className="grid sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="font-semibold">Resume</p>
                    <label className={fileButtonClass}>
                      <FaUpload aria-hidden="true" className="shrink-0" />
                      <span className="truncate">{resume ? resume.name : "Choose file"}</span>
                      <input onChange={pickFile('resume', setResume)} type="file" name="resume" accept=".pdf,.doc,.docx" className="sr-only"
                        aria-label="Resume"
                        aria-invalid={Boolean(errors.resume)}
                        aria-describedby={errors.resume ? 'resume-error file-hint' : 'file-hint'} />
                    </label>
                    {resume && <p className="text-sm mt-1">{toMB(resume.size)} MB</p>}
                    {fieldError('resume')}
                  </div>
                  <div>
                    <p className="font-semibold">Cover letter</p>
                    <label className={fileButtonClass}>
                      <FaUpload aria-hidden="true" className="shrink-0" />
                      <span className="truncate">{cover ? cover.name : "Choose file"}</span>
                      <input onChange={pickFile('cover', setCover)} type="file" name="cover" accept=".pdf,.doc,.docx" className="sr-only"
                        aria-label="Cover letter"
                        aria-invalid={Boolean(errors.cover)}
                        aria-describedby={errors.cover ? 'cover-error file-hint' : 'file-hint'} />
                    </label>
                    {cover && <p className="text-sm mt-1">{toMB(cover.size)} MB</p>}
                    {fieldError('cover')}
                  </div>
                </div>
                {fieldError('files')}
              </section>

              {errors.form && <p role="alert" className="text-red-800 font-semibold">{errors.form}</p>}

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-4">
                <Link to={`/job/${company.id}`} className="text-center py-2 px-6 rounded-3xl text-[#1F3531] font-semibold underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3531]">
                  Cancel
                </Link>
                <button type="submit" disabled={submitting || !user}
                  className="bg-[#27445d] border-[#1d3346] border-b-4 border-r-4 text-white py-2 px-8 rounded-3xl transition enabled:motion-safe:hover:scale-105 cursor-pointer text-lg disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3531] focus-visible:ring-offset-2">
                  {submitting ? 'Submitting…' : 'Submit application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
    )
}

export default Application
