

// const [categoryName]

type CategoryCardProps = {
  
  imageUrl: string;
  name: string;
  handler: (name: string) => void;
  
  
};



const CategoryCards = ({
 
  name,
  imageUrl,
  handler,
}: CategoryCardProps) => {

  const handleClick = () => {
    handler(name); // Pass the name to the handler function
  };

    

  return (
    <div className='flex flex-col  items-center gap-3' >
        <button onClick={handleClick} >

        <div className='w-[200px] h-[192px]  rounded-[100%] flex justify-center overflow-hidden shadow-md' >
            <img className='object-cover cursor-pointer ' src={imageUrl} alt='' ></img>
        </div>
        <h3 className='font-bold' >{name}</h3>

        </button>
    </div>
  )
}

export default CategoryCards