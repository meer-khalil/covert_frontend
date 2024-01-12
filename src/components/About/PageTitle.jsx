import React from 'react'

function PageTitle({ title, image, small }) {
  return (
    <>
      {
        small ? (
          <div className="flex items-center justify-center py-10" style={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover'
             }}>
            <h1 className="text-white text-3xl font-bold shadow-lg">{title}</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <h1 className="text-white text-3xl font-bold shadow-lg">{title}</h1>
          </div >
        )
      }
    </>
  )
}

export default PageTitle