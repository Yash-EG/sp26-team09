import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'

export default function Bookings() {
  //useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  //get customerId from browser localStorage to use in API calls
  const customerId = localStorage.getItem("customerId");

  //state variable to hold saved shows data retrieved from backend
  const [savedShows, setSavedShows] = useState([]);

  //fetch saved shows from backend when component mounts or customerId changes
  useEffect(() => {
    const fetchSavedShows = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/customers/${customerId}/interested`
        );
        if (!response.ok) throw new Error("Failed to fetch saved shows");
        const data = await response.json();
        setSavedShows(data);
      } catch (error) {
        console.error(error);
      }
    };

    //only fetch saved shows if we have a valid customerId
    if (customerId) fetchSavedShows();
    //go back to login page if not logged in (no customerId in localStorage)
  }, [customerId]);

//function to handle removing a show from saved shows list, sends DELETE request 
  const handleRemoveShow = async (showId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/customers/${customerId}/interested/${showId}`,
      {
        method: "DELETE",
      }
    );

    // Check if response is ok, if not throw error
    if (!response.ok) {
      throw new Error("Failed to remove show");
    }

    setSavedShows((prevShows) =>
      prevShows.filter((show) => show.showId !== showId)
    );
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <CloudLayer />
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-black z-10" />

      <div className="relative z-20">
        <Navbar />

        <div className="px-6 pt-28 pb-12 max-w-5xl mx-auto">
          <h1 className="text-white font-bold text-4xl tracking-widest uppercase mb-8">My Shows</h1>

          <div className="space-y-6">
            {savedShows.length === 0 ? (
              <p className="text-white/60 text-sm">No saved shows yet.</p>
            ) : (
              savedShows.map(show => (
                <article key={show.showId} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:bg-white/15 transition-all">
                  <div className="w-full h-64 bg-gradient-to-br from-purple-900/40 to-blue-900/40 relative overflow-hidden">
                    <img src={show.image} alt={show.band?.name} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-purple-600/60 backdrop-blur-sm border border-purple-400/40 text-white text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                        {show.genre}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg font-bold">{show.band?.name?.[0]}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-xl">{show.band?.name}</h3>
                        <p className="text-white/70 text-sm">{show.location} • {show.date}</p>
                      </div>
                      <span className="text-purple-400 font-bold text-lg">${show.ticketPrice}</span>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed mb-4">{show.description}</p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/show/${show.showId}`)}
                        className="flex-1 bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full transition-all"
                      >
                        View Details
                      </button>
                      <button
                          onClick={() => handleRemoveShow(show.showId)}
                          className="bg-red-600/60 hover:bg-red-600 backdrop-blur-sm border border-red-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full transition-all"
                        >
                          Remove
                        </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
