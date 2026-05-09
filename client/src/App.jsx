import { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [tone, setTone] = useState("Professional");
  const [hooks, setHooks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-zinc-900 text-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-5xl font-bold mb-6 text-center">
          AI Hook Generator
        </h1>
        <p className="text-center text-zinc-400 mb-6">
          Generate engaging AI-powered social media hooks instantly.
        </p>

        <input
          type="text"
          maxLength={100}
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border border-zinc-700 bg-zinc-800 p-3 rounded-lg mb-4 text-white"
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option>TikTok</option>
          <option>YouTube</option>
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>YouTube Shorts</option>
          <option>Email Marketing</option>
          <option>Twitter/X</option>
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option>Professional</option>
          <option>Funny</option>
          <option>Motivational</option>
          <option>Storytelling</option>
          <option>Emotional</option>
          <option>Controversial</option>
          <option>Educational</option>
        </select>

        <button
          disabled={!topic || loading}
          onClick={async () => {
            try {
              setLoading(true);

              const response = await axios.post(
                "http://localhost:5000/generate",
                {
                  topic,
                  platform,
                  tone,
                }
              );

              setHooks(response.data.result);

            } catch (error) {
              console.log(error);
              setError("Failed to generate hooks.");
            }

            setLoading(false);
          }}
          className="w-full bg-black text-white p-3 rounded-lg disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-pulse">Generating...</span>
          ) : (
            "Generate Hooks"
          )}
        </button>

        <button
          onClick={() => setHooks("")}
          className="w-full mt-3 border border-zinc-700 p-3 rounded-lg"
        >
          Clear Results
        </button>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mt-4">
            {error}
          </div>
       )}

       {hooks && (
         <div className="mt-6 space-y-3">
           {hooks
             .split("\n")
             .filter((hook) => hook.trim() !== "")
             .map((hook, index) => (
               <div
                 key={index}
                 className="bg-gray-100 text-black p-4 rounded-lg flex justify-between items-start gap-3"
               >
                 <p>{hook}</p>

                 <button
                   onClick={() => navigator.clipboard.writeText(hook)}
                   className="bg-black text-white px-3 py-1 rounded-lg text-sm"
                 >
                   Copy
                 </button>
               </div>
             ))}

           <p className="text-center text-zinc-500 mt-6 text-sm">
             Built with React, Node.js, Express, and OpenAI API
           </p>
         </div>
      )}

             </div>
           </div>
        );
      }

export default App;