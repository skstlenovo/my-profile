import { GitHubCalendar } from 'react-github-calendar';

const GITHUB_USERNAME = "skstlenovo"; 

export default function Git() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold text-[#1cd8d2] mb-6 text-center">
        GitHub Commit History
      </h2>
      
      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl transition-shadow duration-300 hover:shadow-[#1cd8d2]/30">
        <GitHubCalendar 
          username={GITHUB_USERNAME} 
          blockSize={12} 
          fontSize={16}
          colorScheme="dark"
        />
      </div>
      <p className="text-xs text-gray-500 mt-6 text-center">
        Real-time data from GitHub APIs. Last updated: {new Date().toLocaleString("en-GB")}.
      </p>
    </div>
  );
}
