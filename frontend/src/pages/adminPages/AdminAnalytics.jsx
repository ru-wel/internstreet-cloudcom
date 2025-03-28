import React, { useEffect, useState } from 'react'
import { TEChart } from "tw-elements-react";
import AdminLogs from './AdminLogs';

function AdminAnalytics({ changeComponent }) {
    const [userCounts, setUserCount] = useState([]);
    const [applicationCounts, setAppliCount] = useState([]);
    const [logs, setLogs] = useState([]);
    const [counts, setCounts] = useState({
      applications: 0,
      jobs: 0,
      logs: 0,
      users: 0,
    });

  const [fetchLogs, setFetchLogs] = useState([]);
  const [osData, setOsData] = useState({ labels: [], data: [] });
  const [browserData, setBrowserData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchLogs = async () =>{
      try {
        const result = await fetch(import.meta.env.VITE_API_URL + `/logs`);
        if (!result.ok){
          throw new Error('Failed to fetch data'); 
        }
        const logs = await result.json();
        
        setFetchLogs(logs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    if (!fetchLogs || !Array.isArray(fetchLogs) || fetchLogs.length === 0) {
      return;
    }

    const loginLogs = fetchLogs.filter(log => log.action === "Has logged in");

    const osLoginCount = {};
    loginLogs.forEach(log => {
      if (!log.os_version) {
        osLoginCount["Unknown"] = (osLoginCount["Unknown"] || 0) + 1;
        return;
      }
      
      let osName = log.os_version.trim();
      osName = osName.replace(/\s+\d+(\.\d+)*(\.\d+)*(\s|$).*/, '');
      if (osName.includes('Android')) osName = 'Android';
      osLoginCount[osName] = (osLoginCount[osName] || 0) + 1;
    });

    const browserLoginCount = {};
    loginLogs.forEach(log => {
      if (!log.browser_type) {
        browserLoginCount["Unknown"] = (browserLoginCount["Unknown"] || 0) + 1;
        return;
      }
      
      let browserName = log.browser_type;
      
      browserName = browserName.replace(/\s+\d+(\.\d+)*(\.\d+)*(\s|$).*/, '');

      if (browserName.includes('Chrome')) browserName = 'Chrome';
      else if (browserName.includes('Firefox')) browserName = 'Firefox';
      else if (browserName.includes('Safari')) browserName = 'Safari';
      else if (browserName.includes('Edge')) browserName = 'Edge';
      else if (browserName.includes('Opera')) browserName = 'Opera';
      else if (browserName.includes('Internet Explorer') || browserName.includes('IE')) browserName = 'IE';
      
      browserLoginCount[browserName] = (browserLoginCount[browserName] || 0) + 1;
    });

    const sortedOsEntries = Object.entries(osLoginCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);

    const sortedBrowserEntries = Object.entries(browserLoginCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);

    setOsData({
      labels: sortedOsEntries.map(entry => entry[0]),
      data: sortedOsEntries.map(entry => entry[1]),
    });

    setBrowserData({
      labels: sortedBrowserEntries.map(entry => entry[0]),
      data: sortedBrowserEntries.map(entry => entry[1]),
    });
  }, [logs]);

  const generateColors = (count, opacity) => {
    const baseColors = [
      [63, 81, 181],
      [77, 182, 172],
      [66, 133, 244],
      [156, 39, 176],
      [233, 30, 99],
      [66, 73, 244],
      [255, 152, 0],
    ];
    
    return Array(count).fill().map((_, i) => {
      const colorIndex = i % baseColors.length;
      const [r, g, b] = baseColors[colorIndex];
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    });
  };

  useEffect(() => {
    const fetchAnalytics = async () =>{
      try {
        const result = await fetch(import.meta.env.VITE_API_URL + `/utils/analytics`);
        if (!result.ok){
          throw new Error('Failed to fetch data'); 
        }
        const fetchedAnalytics = await result.json();
        
        setLogs(fetchedAnalytics.slicedLogs);
        setUserCount(fetchedAnalytics.userCounts.date);
        setAppliCount(fetchedAnalytics.applicationCounts.date);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAnalytics();
  }, []);
  
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const result = await fetch(import.meta.env.VITE_API_URL + `/utils/count`);
        if (!result.ok) throw new Error('Failed to fetch data');
        const count = await result.json();
        setCounts(count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchCount();
  }, []);

  return (
    <div className='grid grid-cols-1'>
        <div className="mt-10 mb-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#1F3531] to-[#436761] text-white shadow-[#1F3531]/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd"/>
                </svg>
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Applications</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{counts.applications}</h4>
                </div>
            </div>

            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#1F3531] to-[#436761] text-white shadow-[#1F3531]/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd"/>
                    </svg>
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Users</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{counts.users}</h4>
                </div>
            </div>

            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#1F3531] to-[#436761] text-white shadow-[#1F3531]/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd"/>
                </svg>
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Jobs</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{counts.jobs}</h4>
                </div>
            </div>

            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-[#1F3531] to-[#436761] text-white shadow-[#1F3531]/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clipRule="evenodd"/>
                </svg>
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Logs</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{counts.logs}</h4>
                </div>
            </div>
        </div>

        <div className='mb-12 grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2"'>
            <div className='max-w-190 w-full rounded-xl bg-white text-gray-700 shadow-md p-5'>
                <TEChart
                type="line"
                data={{
                    labels: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                    datasets: [
                    {
                        label: "New Users",
                        data: Object.values(userCounts),
                        backgroundColor: "rgba(31, 53, 49, 0.27)",
                        borderColor: "#1F3531",
                        borderWidth: 1,
                        tension: 0.5,
                        pointRadius: 0,
                        fill: true,
                    },
                    ],
                }}
                />
            </div>
            <div className='max-w-190 w-full rounded-xl bg-white text-gray-700 shadow-md p-5'>
                <TEChart
                    type="bar"
                    data={{
                        labels: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
                        datasets: [
                        {
                            label: "New Applications",
                            data: Object.values(applicationCounts),
                            backgroundColor: "rgba(31, 53, 49, 0.27)",
                            borderColor: "#1F3531",
                            borderWidth: 1,
                        },
                        ],
                    }}
                />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* User Activity Panel */}
          <div className="bg-white shadow-lg rounded-2xl p-5 w-full h-full flex flex-col">
            <h2 className="text-lg font-semibold text-blue-gray-900">User Activity</h2>
            <div className="mt-3 space-y-4 flex-grow overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center space-x-3 p-2 border-b border-[#1F3531]/10">
                  <img src={`https://avatar.iran.liara.run/username?username=${log.name}`} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-gray-900">{log.email}</h3>
                    <p className="text-xs text-gray-600 mb-1">{log.action}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span>
                        <svg className="w-3 h-3 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/>
                        </svg>
                      </span>
                      {log.executed_at ? new Date(log.executed_at).toLocaleString() : "Loading..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-2 text-center border-t border-[#1F3531]/10">
              <a onClick={() => changeComponent("logs", <AdminLogs/>)} className="text-[#1F3531] text-sm font-medium hover:underline cursor-pointer">See More Activities</a>
            </div>
          </div>

          {/* Login OS Distribution */}
          <div className="bg-white shadow-lg rounded-2xl p-5 w-full">
            <h3 className="text-lg font-semibold mb-2">Login OS Distribution</h3>
            {osData.labels.length > 0 ? (
              <TEChart
                type="doughnut"
                data={{
                  labels: osData.labels,
                  datasets: [
                    {
                      label: "Login OS Distribution",
                      data: osData.data,
                      backgroundColor: generateColors(osData.labels.length, 0.5),
                      borderColor: generateColors(osData.labels.length, 1),
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      display: true,
                      labels: {
                        boxWidth: 10,
                        font: {
                          size: 10
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = Math.round((value / total) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  },
                }}
              />
            ) : (
              <p>No login OS data available</p>
            )}
          </div>
          
          {/* Login Browser Distribution */}
          <div className="bg-white shadow-lg rounded-2xl p-5 w-full">
            <h3 className="text-lg font-semibold mb-2">Login Browser Distribution</h3>
            {browserData.labels.length > 0 ? (
              <TEChart
                type="doughnut"
                data={{
                  labels: browserData.labels,
                  datasets: [
                    {
                      label: "Login Browser Distribution",
                      data: browserData.data,
                      backgroundColor: generateColors(browserData.labels.length, 0.5),
                      borderColor: generateColors(browserData.labels.length, 1),
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      display: true,
                      labels: {
                        boxWidth: 10,
                        font: {
                          size: 10
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = Math.round((value / total) * 100);
                          return `${label}: ${value} (${percentage}%)`;
                        }
                      }
                    }
                  },
                }}
              />
            ) : (
              <p>No login browser data available</p>
            )}
          </div>
        </div>
    </div>
  )
}
export default AdminAnalytics;