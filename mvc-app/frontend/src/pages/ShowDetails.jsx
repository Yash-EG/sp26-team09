import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import CloudLayer from '../components/CloudLayer';
import { getFollowedBands, followBand, unfollowBand, getInterestedShows, addInterestedShow, removeInterestedShow } from '../api';

export default function ShowDetails() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`/api/shows/${id}`);
        if (!response.ok) throw new Error('Failed to fetch show');
        const data = await response.json();
        setShow(data);

        const customerId = localStorage.getItem('customerId');
        if (customerId) {
          const followed = await getFollowedBands(customerId);
          setIsFollowing(followed.some((b) => b.userId === data.band?.userId));

          const interested = await getInterestedShows(customerId);
          setIsSaved(interested.some((s) => s.showId === data.showId));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchShow();
  }, [id]);

  if (!show) return <div className="text-white p-8">Loading...</div>;

  const customerId = localStorage.getItem('customerId');

  const handleFollowBand = async () => {
    if (!customerId || !show.band) return;
    const bandId = show.band.userId;
    try {
      if (isFollowing) {
        await unfollowBand(customerId, bandId);
      } else {
        await followBand(customerId, bandId);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveShow = async () => {
    if (!customerId) return;
    try {
      if (isSaved) {
        await removeInterestedShow(customerId, show.showId);
      } else {
        await addInterestedShow(customerId, show.showId);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <CloudLayer />

      <div className="relative z-20">
        <Navbar />

        <div className="px-6 pt-28 pb-12 max-w-5xl mx-auto">
          {/* Hero Image */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.12)] mb-6">
            <div className="w-full h-96 bg-gradient-to-br from-purple-100 dark:from-purple-900/40 to-blue-100 dark:to-blue-900/40 relative overflow-hidden">
              <img src={show.image} alt={show.band?.name} className="w-full h-full object-cover opacity-80" />
              <div className="absolute top-6 right-6">
                <span className="bg-purple-600/60 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full">
                  {show.genre}
                </span>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.12)]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-gray-900 dark:text-white font-bold text-4xl mb-2">{show.band?.name}</h1>
                <p className="text-gray-600 dark:text-white/70 text-lg">{show.location}</p>
                <p className="text-purple-500 dark:text-purple-400 text-lg mt-1">{show.date}</p>
              </div>
              <span className="text-purple-500 dark:text-purple-400 font-bold text-3xl">${show.ticketPrice}</span>
            </div>

            <p className="text-gray-700 dark:text-white/80 text-base leading-relaxed mb-6">{show.description}</p>

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
              {customerId && (
                <>
                  <button
                    onClick={handleFollowBand}
                    className={`backdrop-blur-sm border text-white text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all ${
                      isFollowing ? 'bg-purple-600/60 hover:bg-purple-600 border-purple-400/40' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border-black/[0.08] dark:border-white/20 text-gray-900 dark:text-white'
                    }`}
                  >
                    {isFollowing ? '✓ Following' : '+ Follow Band'}
                  </button>
                  <button
                    onClick={handleSaveShow}
                    className={`backdrop-blur-sm border text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-all ${
                      isSaved ? 'bg-red-600/60 hover:bg-red-600 border-red-400/40 text-white' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border-black/[0.08] dark:border-white/20 text-gray-900 dark:text-white'
                    }`}
                  >
                    ♥ {isSaved ? 'Saved' : 'Save'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Show Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h2 className="text-gray-900 dark:text-white font-bold text-xl tracking-widest uppercase mb-4">Event Info</h2>
              <div className="space-y-3 text-gray-700 dark:text-white/80">
                <p><span className="text-purple-500 dark:text-purple-400 font-bold">Doors:</span> {show.doorsTime}</p>
                <p><span className="text-purple-500 dark:text-purple-400 font-bold">Show Time:</span> {show.showTime}</p>
                <p><span className="text-purple-500 dark:text-purple-400 font-bold">Age:</span> {show.ageRestriction}</p>
                <p><span className="text-purple-500 dark:text-purple-400 font-bold">Location:</span> {show.venueAddress}</p>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-black/[0.08] dark:border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
              <h2 className="text-gray-900 dark:text-white font-bold text-xl tracking-widest uppercase mb-4">Lineup</h2>
              <ul className="space-y-2 text-gray-700 dark:text-white/80">
                {show.lineup ? show.lineup.split(',').map((member, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    {member.trim()}
                  </li>
                )) : <li className="text-gray-400 dark:text-white/50">No lineup info available.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
