//imports react hook for nav and necessary components
import { useState } from 'react';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  //temporary hardcoded profile data until we connect to backend
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    location: 'Greensboro, NC',
    bio: 'Live music lover exploring the local scene. Always on the lookout for new bands and unforgettable shows. From intimate jazz clubs to high-energy rock concerts, I\'m there for it all. Let\'s discover great music together!',
    profileImage: null
  });
//function to handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({...profileData, profileImage: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };
//function to handle profile image removal
  const handleRemoveImage = () => {
    setProfileData({...profileData, profileImage: null});
  };
//temporary hardcoded favorite bands until we connect to backend
  const [favoriteBands, setFavoriteBands] = useState([
    { id: 1, name: 'The Midnight Riders', genre: 'Rock', image: 'https://picsum.photos/seed/band1/200' },
    { id: 2, name: 'Electric Souls', genre: 'Electronic', image: 'https://picsum.photos/seed/band2/200' },
    { id: 3, name: 'Velvet Dreams', genre: 'Jazz', image: 'https://picsum.photos/seed/band3/200' },
    { id: 4, name: 'Cosmic Waves', genre: 'Indie', image: 'https://picsum.photos/seed/band4/200' },
  ]);
  const [newBand, setNewBand] = useState({ name: '', genre: '' });
//function to handle adding a new band to the favorite bands list
  const handleAddBand = () => {
    if (newBand.name && newBand.genre) {
      setFavoriteBands([...favoriteBands, { 
        id: Date.now(), 
        name: newBand.name, 
        genre: newBand.genre, 
        image: `https://picsum.photos/seed/${Date.now()}/200` 
      }]);
      setNewBand({ name: '', genre: '' });
    }
  };
//function to handle removing a band from the favorite bands list
  const handleRemoveBand = (id) => {
    setFavoriteBands(favoriteBands.filter(band => band.id !== id));
  };

  return (
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <CloudLayer />
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 to-black z-10" />
      
      <div className="relative z-20">
        <Navbar />
        
        <div className="px-6 pt-28 pb-12 max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-purple-400/40 bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-5xl font-bold">JD</span>
                  )}
                </div>
                {isEditing && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    <label className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-xs px-3 py-1 rounded-full cursor-pointer transition-all">
                      Upload
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {profileData.profileImage && (
                      <button 
                        onClick={handleRemoveImage}
                        className="bg-red-600/60 hover:bg-red-600 backdrop-blur-sm border border-red-400/40 text-white text-xs px-3 py-1 rounded-full transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="bg-white/10 border border-white/20 text-white font-bold text-3xl mb-2 px-3 py-1 rounded-lg w-full"
                  />
                ) : (
                  <h1 className="text-white font-bold text-3xl mb-2">{profileData.name}</h1>
                )}
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="bg-white/10 border border-white/20 text-white/70 text-sm mb-4 px-3 py-1 rounded-lg w-full"
                  />
                ) : (
                  <p className="text-white/70 text-sm mb-4">Music Enthusiast • {profileData.location}</p>
                )}
                {isEditing ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-2 rounded-full transition-all"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm tracking-widest uppercase px-6 py-2 rounded-full transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-2 rounded-full transition-all"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">Bio</h2>
            {isEditing ? (
              <textarea 
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                className="bg-white/10 border border-white/20 text-white/80 text-sm leading-relaxed px-3 py-2 rounded-lg w-full h-32 resize-none"
              />
            ) : (
              <p className="text-white/80 text-sm leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          {/* Favorite Bands */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">Favorite Bands</h2>
            
            {isEditing && (
              <div className="mb-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="Band Name"
                    value={newBand.name}
                    onChange={(e) => setNewBand({...newBand, name: e.target.value})}
                    className="flex-1 bg-white/10 border border-white/20 text-white text-sm px-3 py-2 rounded-lg placeholder-white/40"
                  />
                  <input 
                    type="text" 
                    placeholder="Genre"
                    value={newBand.genre}
                    onChange={(e) => setNewBand({...newBand, genre: e.target.value})}
                    className="w-32 bg-white/10 border border-white/20 text-white text-sm px-3 py-2 rounded-lg placeholder-white/40"
                  />
                </div>
                <button 
                  onClick={handleAddBand}
                  className="w-full bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-xs tracking-widest uppercase px-4 py-2 rounded-full transition-all"
                >
                  Add Band
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {favoriteBands.map(band => (
                <div key={band.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all relative">
                  {isEditing && (
                    <button 
                      onClick={() => handleRemoveBand(band.id)}
                      className="absolute -top-2 -right-2 bg-red-600/60 hover:bg-red-600 backdrop-blur-sm border border-red-400/40 text-white w-6 h-6 rounded-full transition-all flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400/40 flex-shrink-0">
                      <img src={band.image} alt={band.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm truncate">{band.name}</h3>
                      <p className="text-purple-400 text-xs uppercase tracking-wide">{band.genre}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}