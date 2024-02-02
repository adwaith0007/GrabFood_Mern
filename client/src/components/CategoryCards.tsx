import React from 'react'

import foodC1 from '../assets/foodC1.png'

type CategoryCardProps = {
  
  imageUrl: string;
  name: string;
  
  handler: () => void;
};



const CategoryCards = ({
 
  name,
  imageUrl,
  handler,
}: CategoryCardProps) => {

    

  return (
    <div className='flex flex-col  items-center gap-3' >
        
        <div className='w-[200px] h-[192px]  rounded-[100%] overflow-hidden shadow-md' >
            <img className='object-cover cursor-pointer ' src={imageUrl} alt='' ></img>
        </div>

        <h3 className='font-bold' >{name}</h3>
    </div>
  )
}

export default CategoryCards