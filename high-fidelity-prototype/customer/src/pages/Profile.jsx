//imports react hook for nav and necessary components
import { useState,useEffect } from 'react';
import Navbar from "../components/Navbar";
import MapBackground from '../components/MapBackround'
import CloudLayer from '../components/CloudLayer'

export default function Profile() {

  
  const customerId = localStorage.getItem("customerId");
  //state variable, remembers if editing , sets boolean value if changes
  const [isEditing, setIsEditing] = useState(false);

  //state variable, remembers prev profile data and sets new data
  const [profileData, setProfileData] = useState({
    name: '',
    location: '',
    bio: '',
    profileImage: null
  });

  const [message, setMessage] = useState("");

  //state variable, remembers full customer object from backend, sets customer based on state
  const [customer, setCustomer] = useState(null);

  //remembers all genres on backend, 
  const [allGenres, setAllGenres] = useState([]);
  
  //remembers selected genres, sets new selected genres
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    //if no customer is logged in, return message
    if (!customerId) {
      return <div className="text-white p-8">Customer is not logged in.</div>;
    }

//fetches customer profile data and genres from backend on component mount, sets state variables accordingly
useEffect(() => {
  const fetchData = async () => {
    try {
      // fetch customer profile
      const customerResponse = await fetch(`http://localhost:8080/api/customers/${customerId}`);
      if (!customerResponse.ok) {
        throw new Error("Failed to fetch customer");
      }
      //receive response in json format
      const customerData = await customerResponse.json();

      //setcustomers data with fetched data
      setCustomer(customerData);
      //if no data set blank values, if data exists set profile data with fetched data
      setProfileData({
        name: customerData.name || '',
        location: customerData.location || '',
        bio: customerData.bio || '',
        profileImage: customerData.profilePictureUrl || null
      });

      //set selected genres with fetched data, if no genres set empty array
      setSelectedGenreIds(
      (customerData.preferredGenres || []).map((genre) => genre.genreId)
      );

      // fetch all genres for buttons
      const genresResponse = await fetch(`http://localhost:8080/api/genres`);
      if (!genresResponse.ok) {
        throw new Error("Failed to fetch genres");
      }
      //receive response in json format
      const genresData = await genresResponse.json();
      setAllGenres(genresData);

      // fetch followed bands
      const bandsResponse = await fetch(`http://localhost:8080/api/customers/${customerId}/following`);
      if (!bandsResponse.ok) {
        throw new Error("Failed to fetch followed bands");
      }
      //receive response in json format
      const bandsData = await bandsResponse.json();
      setFollowedBands(bandsData);

    } catch (error) {
      console.error(error);
      setMessage("Failed to load profile data.");
    }
  };

  fetchData();
}, []);

//function to handle toggling genre selection, adds or removes genre id from selected genres array
      const handleGenreToggle = (genreId) => {
        setSelectedGenreIds((prev) =>
          prev.includes(genreId)
            ? prev.filter((id) => id !== genreId)
            : [...prev, genreId]
        );
      };

      //state variable, remembers followed bands, sets new followed bands
    const [followedBands, setFollowedBands] = useState([]);


//function to handle removing a band from the followed bands list
 const handleRemoveBand = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/customers/${customerId}/follow/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to unfollow band");
    }

    //remove band from followed bands state
    setFollowedBands(followedBands.filter(band => band.id !== id));
  } catch (error) {
    console.error(error);
    setMessage("Failed to unfollow band.");
  }
};

//function to handle saving profile data to backend
const handleSaveProfile = async () => {
  try {
    //PUT request to update profile
    const profileResponse = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...customer,
        name: profileData.name,
        location: profileData.location,
        bio: profileData.bio,
        profilePictureUrl: profileData.profileImage
      })
    });

    //error handling for profile update
    if (!profileResponse.ok) {
      throw new Error("Failed to update profile");
    }

    //receive response in json format
    const updatedProfileCustomer = await profileResponse.json();

    // PUT request to update preferred genres
    const genresResponse = await fetch(`http://localhost:8080/api/customers/${customerId}/genres`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedGenreIds)
    });

    if (!genresResponse.ok) {
      throw new Error("Failed to update preferred genres");
    }

    // Update the customer state with the complete response including preferred genres
    const fullyUpdatedCustomer = await genresResponse.json();

    // Update state with fully updated customer data
    setCustomer(fullyUpdatedCustomer);
    setProfileData({
      name: fullyUpdatedCustomer.name || '',
      location: fullyUpdatedCustomer.location || '',
      bio: fullyUpdatedCustomer.bio || '',
      profileImage: fullyUpdatedCustomer.profilePictureUrl || null
    });
    setSelectedGenreIds(
      (fullyUpdatedCustomer.preferredGenres || []).map((genre) => genre.genreId)
    );

    setIsEditing(false);
    setMessage("Profile updated successfully.");
  } catch (error) {
    console.error(error);
    setMessage("Failed to update profile.");
  }
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
                        <img
                          src={profileData.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />                  ) : (
                    <span className="text-white text-5xl font-bold">JD</span>
                  )}
                </div>
                
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
                    <>
                      <input 
                        type="text" 
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="bg-white/10 border border-white/20 text-white/70 text-sm mb-2 px-3 py-1 rounded-lg w-full"
                        placeholder="Location"
                      />
                      <input
                        type="text"
                        value={profileData.profileImage || ''}
                        onChange={(e) => setProfileData({...profileData, profileImage: e.target.value})}
                        className="bg-white/10 border border-white/20 text-white/70 text-sm mb-4 px-3 py-1 rounded-lg w-full"
                        placeholder="Profile Image URL"
                      />
                    </>
                  ) : (
                    <p className="text-white/70 text-sm mb-4">Music Enthusiast • {profileData.location}</p>
                  )}
                {isEditing ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveProfile}
                      className="bg-purple-600/60 hover:bg-purple-600 backdrop-blur-sm border border-purple-400/40 text-white text-sm tracking-widest uppercase px-6 py-2 rounded-full transition-all"
                    >
                      Save
                    </button>
                    <button 
                        onClick={() => {
                          setProfileData({
                            name: customer.name || '',
                            location: customer.location || '',
                            bio: customer.bio || '',
                            profileImage: customer.profilePictureUrl || null
                          });
                          setSelectedGenreIds(
                            (customer?.preferredGenres || []).map((genre) => genre.genreId)
                          );
                          setIsEditing(false);
                        }}
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

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 mb-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
  <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">
    Preferred Genres
  </h2>

              {isEditing ? (
                <div className="flex flex-wrap gap-3">
                  {allGenres.map((genre) => {
                    const genreId = genre.genreId; // change if your JSON uses id
                    const isSelected = selectedGenreIds.includes(genreId);

                    return (
                      <label
                        key={genreId}
                        className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${
                          isSelected
                            ? "bg-purple-600/60 border-purple-400/40 text-white"
                            : "bg-white/10 border-white/20 text-white/80"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleGenreToggle(genreId)}
                          className="hidden"
                        />
                        {genre.name}
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {(customer?.preferredGenres || []).length > 0 ? (
                    customer.preferredGenres.map((genre) => (
                      <span
                        key={genre.genreId}
                        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm"
                      >
                        {genre.name}
                      </span>
                    ))
                  ) : (
                    <p className="text-white/70 text-sm">No preferred genres selected.</p>
                  )}
                </div>
              )}
            </div>

          {/* Favorite Bands */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <h2 className="text-white font-bold text-xl tracking-widest uppercase mb-4">Followed Bands</h2>
            
            
            <div className="grid grid-cols-2 gap-4">
              {followedBands.map(band => (
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