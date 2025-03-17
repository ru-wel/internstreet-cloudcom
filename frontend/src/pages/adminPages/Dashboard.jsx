import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AdminAnalytics from './AdminAnalytics';
import AdminApplications from './AdminApplications';
import AdminJobs from './AdminJobs';
import AdminLogs from './AdminLogs';
import AdminUsers from './AdminUsers';

function Dashboard() {
  const [changedDiv, setDiv] = useState([<AdminAnalytics/>]);
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard | InternStreet</title>
      </Helmet>
      <div className="flex max-h-full min-h-screen">
        <aside className="w-64 bg-gray-900 text-white">
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">Intern Street | Admin</span>
                </div>
            </div>

            <nav className="mt-5 px-2">
                <div className="space-y-4">
                    <a onClick={() => setDiv(<AdminAnalytics/>)} className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700">
                        <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </a>

                    <a onClick={() => setDiv(<AdminUsers/>)} className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                    <svg className="h-5 w-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>

                        Users
                    </a>

                    <a onClick={() => setDiv(<AdminJobs/>)} className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                    <svg className="h-5 w-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"/>
                    </svg>
                        Jobs
                    </a>

                    <a onClick={() => setDiv(<AdminLogs/>)} className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
                        <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Logs
                    </a>
                </div>
            </nav>

            <div className="mt-auto p-4 border-t border-gray-800">
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Tom Cook</p>
                    </div>
                </div>
            </div>
        </aside>

        <main className="flex-1 p-6 bg-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            {Array.isArray(changedDiv) ? changedDiv.map((component, index) => <div className='mt-4 p-6 bg-white rounded-lg shadow-md' key={index}>{component}</div>) : <div className='mt-4 p-6 bg-white rounded-lg shadow-md'>{changedDiv}</div>}
        </main>
    </div>

    </div>
  )
}

export default Dashboard