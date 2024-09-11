import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'

const ChngeDesignToggle = ({paginationData,loadingCard,handleRemoveCard = ()=>{} })=>{
    return(
        <>
    <div className='grid  sm:grid-cols2 lg:grid-cols3 xlgrid-cols-4 gap-4 xl:gap-8'>
                              {paginationData && paginationData?.map((val, index) => {
                                  return (
                                      <div key={index} className="flex relative overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-">
                                          {/*  <!-- Image --> */}
                                          {loadingCard === index ? (
                  <div className="flex items-center justify-center h-56">
                    <FaSpinner className="animate-spin text-gray-500" size={30} />
                  </div>
                ) : (
                  <>
                  <figure>
                                              <img
                                                  src="https://picsum.photos/id/101/800/600"
                                                  alt="card image"
                                                  className="aspect-video w-full h-[100px] flex justify-center items-center" />
                                          </figure>
                                          <span 
                                          onClick={() => handleRemoveCard(index)}
                                          >
                      <RxCross2 size={30} className='text-red-500 font-bold absolute right-4 top-2 bg-white shadow-lg cursor-pointer' />
                                          </span>
                                          {/*  <!-- Body--> */}
                                          <div className="p-6">
                                              <header className="mb-4">
                                                  <h3 className="text-xl font-medium text-slate-700">
                                                      The easy way to go  <span className='text-red-600 font-bold'> Id:{val.id}</span> 
                                                  </h3>
                                                  <p className="text-sm text-slate-400"> By George, jun 3 2023</p>
                                              </header>
                                              <p>
                                                  Experience the simple pleasures of a world with no cars, and only
                                                  
                                              </p>
                                          </div>
                                        
                                          </>
                )
                                          }

                                      </div>
                                  )
                              })}

             </div>
        </>
    )
}

export default ChngeDesignToggle