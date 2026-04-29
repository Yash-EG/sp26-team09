import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround';
import CloudLayer from '../components/CloudLayer';

export default function ShowDetails() {
  // Get the show ID from the URL parameters
  const { id } = useParams();

  // State to hold the show details and whether it's saved by the user
  const [show, setShow] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch show details from the backend when the component mounts or when the ID changes
  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`http://localhost:8080/shows/${id}`);
        if (!response.ok) throw new Error('Failed to fetch show');

        // Parse the show data from the response and set it in state
        const data = await response.json();
        //set data returned from backend to show state variable
        setShow(data);

        const customerId = localStorage.getItem('customerId');
        if (customerId) {
          const followRes = await fetch(`http://localhost:8080/api/customers/${customerId}/following`);
          if (followRes.ok) {
            const followed = await followRes.json();
            setIsFollowing(followed.some(b => b.userId === data.band?.userId));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchShow();
  }, [id]);

  // Fetch whether the show is saved by the user when the component mounts or when the ID changes
  if (!show) return <div className="text-white p-8">Loading...</div>;

  const handleFollowBand = async () => {
    const customerId = localStorage.getItem('customerId');
    if (!customerId || !show.band) return;
    const bandId = show.band.userId;
    const method = isFollowing ? 'DELETE' : 'POST';
    try {
      const response = await fetch(`http://localhost:8080/api/customers/${customerId}/follow/${bandId}`, { method });
      if (response.ok) setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle saving or unsaving the show, sends POST or DELETE request to backend accordingly
  const handleSaveShow = () => {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) return;
    if (isSaved) {
      fetch(`http://localhost:8080/api/customers/${customerId}/interested/${id}`, { method: 'DELETE' });
      setIsSaved(false);
    } else {
      fetch(`http://localhost:8080/api/customers/${customerId}/interested/${id}`, { method: 'POST' });
      setIsSaved(true);
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
          {/* Hero Image */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] mb-6">
            <div className="w-full h-96 bg-gradient-to-br from-purple-900/40 to-blue-900/40 relative overflow-hidden">
              <img src={show.image} alt={show.band?.name} className="w-full h-full object-cover opacity-80" />
              <div className="absolute top-6 right-6">
                <span className="bg-purple-600/60 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full">
                  {show.genre}
                </span>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-white font-bold text-4xl mb-2">{show.band?.name}</h1>
                <p className="text-white/70 text-lg">{show.location}</p>
                <p className="text-purple-400 text-lg mt-1">{show.date}</p>
              </div>
              <span className="text-purple-400 font-bold text-3xl">${show.ticketPrice}</span>
            </div>

            <p className="text-white/80 text-base leading-relaxed mb-6">{show.description}</p>

            <div className="flex gap-4">
              {show.ticketUrl ? (
                <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all">
                  Buy Tickets
                </a>
              ) : (
                <button className="flex-1 bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all">
                  Buy Tickets
                </button>
              )}
              <button
                onClick={handleFollowBand}
                className={`backdrop-blur-sm border text-white px-6 py-3 rounded-full transition-all ${
                  isFollowing ? 'bg-purple-600/60 hover:bg-purple-600 border-purple-400/40' : 'bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow Band'}
              </button>
              <button
                onClick={handleSaveShow}
                className={`backdrop-blur-sm border text-white px-6 py-3 rounded-full transition-all ${isSaved ? 'bg-red-600/60 hover:bg-red-600 border-red-400/40' : 'bg-white/10 hover:bg-white/20 border-white/20'}`}
              >
                ♥ {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* Show Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">Event Info</h2>
              <div className="space-y-3 text-white/80">
                <p><span className="text-purple-400 font-bold">Doors:</span> {show.doorsTime}</p>
                <p><span className="text-purple-400 font-bold">Show Time:</span> {show.showTime}</p>
                <p><span className="text-purple-400 font-bold">Age:</span> {show.ageRestriction}</p>
                <p><span className="text-purple-400 font-bold">Location:</span> {show.venueAddress}</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">Lineup</h2>
              <ul className="space-y-2 text-white/80">
                {show.lineup ? show.lineup.split(',').map((member, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    {member.trim()}
                  </li>
                )) : <li className="text-white/50">No lineup info available.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
