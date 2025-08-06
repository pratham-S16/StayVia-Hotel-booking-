import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { roomsDummyData } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListRoom = () => {

  const [rooms, setRooms]= useState([]);
  const {axios, getToken, user, currency} =useAppContext();

  //fetch rooms from backend
  const fetchRooms= async () =>{
    try {
      const {data} =await axios.get(`/api/room/owner`, {headers: {Authorization: `Bearer ${await getToken()}`}});
     if(data.success){
        setRooms(data.rooms);
      } else {
        setRooms([]);
        toast.error(data.message || "Failed to fetch rooms");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching rooms");
    }
  }

  //TOGGLE AVAILABILITY OF ROOM

  const toggleAvailability = async (roomId) => {
    const {data}= await axios.post('/api/room/toggle-availability', {roomId}, {headers: {Authorization: `Bearer ${await getToken()}`}} )
    if(data.success){
      toast.success(data.message || "Room availability toggled successfully");
      fetchRooms(); // Refresh the room list after toggling
    }else{
      toast.error(data.message || "Failed to toggle room availability");
    }
  }


  useEffect(()=>{
    if(user){
      fetchRooms();
    }
  },[user]);


  return (
    <div>
   <Title align='left' font='outfit' title='Room Listings' subtitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."/>
   <p className='text-gray-500 mt-8'>All Rooms</p>
     
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facilities
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium ">
                Price/Night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {rooms.map((item,index)=>(
              <tr key={index}>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.roomType}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                 {Array.isArray(item.amenities) ? item.amenities.join(", ") : "N/A"}

                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {currency} {item.pricePerNight}
                </td>
                <td className='py-3 px-4 text-sm text-center text-red-500 border-t border-gray-300'>
                  <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                      <input onChange={()=> toggleAvailability(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable}/>
                      <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                        <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                     
                  </label>
                </td>
                </tr>
            ))}
          </tbody>
         
        </table>
      </div>

    </div>
  )
}

export default ListRoom