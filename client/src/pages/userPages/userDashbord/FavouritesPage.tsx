import React from 'react'
import UserSidebar from '../../../components/user/UserSidebar'

const FavouritesPage = () => {
  return (
    <div className="admin-container">
      <UserSidebar />
      <div className="px-4 pt-5">
        
          <div className="flex items-center gap-3">
            <p className="text-xl font-medium">Favourites</p>
          </div>
          
        
        <p className="text-gray-400">Your current wallet balance:</p>
        <div className="mt-8 space-y-3 h-60 rounded-lg border bg-white px-2 py-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[#093bc9] font-semibold">
              {/* Balance: {balance ? `₹${balance}` : 'Loading...'} */}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavouritesPage