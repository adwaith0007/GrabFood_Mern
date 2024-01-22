import React from 'react'

import foodC1 from '../assets/foodC1.png'

const CategoryCards = () => {

    

  return (
    <div className='flex flex-col items-center gap-3' >
        
        <div className='w-[200px] h-[192px] rounded-[100%] overflow-hidden shadow-md' >
            <img className='object-cover' src={foodC1} alt='' ></img>
        </div>

        <h3 className='font-bold' >Burger</h3>
    </div>
  )
}

export default CategoryCards