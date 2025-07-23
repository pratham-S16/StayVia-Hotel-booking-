import React from 'react'

const Title = ({title,subtitle,font,align}) => {
  return (
    <div className={`flex flex-col items-center ${align === "left" && "md:items-start md:text-left"} justify-center text-center mt-5`} >
        <p className={`text-4xl md:text-[40px] ${font || "font-playfair"} `}>
            {title}
        </p>
        <p className='text-sm md:text-base mt-2 max-w-174 text-gray-500'> 
            {subtitle}
        </p>

    </div>
  )
}

export default Title