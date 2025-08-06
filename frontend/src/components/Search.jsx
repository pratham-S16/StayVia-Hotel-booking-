import { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Search = () => {

    const {navigate, getToken, axios, setSearchedCities} =useAppContext();
    const [destination, setDestination] = useState('');


    const onSearch =async (e)=>{
        e.preventDefault();
        navigate(`/rooms?destination=${destination}`);
        //call api to save recent searched city
        await axios.post('/api/user/store-recent-search',{recentSearchedCity: destination},{headers: {Authorization: `Bearer ${ await getToken()}`}});

        //add destination to searched cities
        setSearchedCities((prev)=>{
            const updatedSearchedCities= [...prev,destination];
            if(updatedSearchedCities.length > 3){
                updatedSearchedCities.shift(); // remove the oldest city if more than 3
            }
            return updatedSearchedCities;
        })
    }

    return (
        <form onSubmit={onSearch} className=' text-black mt-4 bg-white px-4 font-bold rounded-lg  py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} className="h-4"/>
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input onChange={(e)=>setDestination(e.target.value) } value={destination} list='destinations' id="destinationInput"   type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />

                <datalist id="destinations">
                   {cities.map((city,index)=> {
                        return <option key={index} value={city}>{city}</option>
                   })}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} className="h-4"/>
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className="text-gray-500 rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} className="h-4"/>
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border text-gray-500 border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center  gap-1 rounded-md bg-[#053005] py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
               <img src={assets.searchIcon} className="h-5"/>
                <span>Search</span>
            </button>
        </form>
    );
}
export default Search;