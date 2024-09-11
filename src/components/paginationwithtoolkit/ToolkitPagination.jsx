import React, { useCallback, useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, filterDataByQuery, setCurrentPage, setItemPerpage, setLoadingCard, setNextFirstData, setSearchQuery, setToggleButton } from '../slice/paginationSlice'
import { FaChevronLeft, FaChevronRight, FaGripHorizontal, FaList, FaSpinner } from 'react-icons/fa'
import { CgLayoutGrid } from 'react-icons/cg'
import { RxCross2 } from 'react-icons/rx'

import ChngeDesignToggle from './ChngeDesignToggle'

const ToolkitPagination = () => {
    const {paginationData,filteredData,totalPage, currentPage, itemsPerPage, status,toggle,searchQuery,error, loadingCard } = useSelector(state => state.pagination)
const dispatch = useDispatch()
   
    useEffect(()=>{
   dispatch(fetchPosts({ page: currentPage, limit: itemsPerPage }))
    },[dispatch,currentPage,itemsPerPage])


    const visiblePageButtonCount = 3;
    const totalPageCount = Math.ceil(totalPage);

    const maxVisiblePage = Math.min(
      currentPage + Math.floor(visiblePageButtonCount / 2),
      totalPageCount
    );

    // console.log("maxxvis",Math.floor(visiblePageButtonCount / 2),maxVisiblePage)

    const minVisiblePage = Math.max(maxVisiblePage - visiblePageButtonCount + 1, 1);
    // console.log("minvisible",minVisiblePage)
    const visiblePageNumbers = [];

    for (let i = minVisiblePage; i <= maxVisiblePage; i++) {
      visiblePageNumbers.push(i);
    }

    const handlePrevClick =()=>{
   dispatch(setCurrentPage(Math.max(currentPage-1,1)))
    }

       const handleNextClick =()=>{
        dispatch(setCurrentPage(Math.min(currentPage+1 ,totalPageCount)))
    }

    const handleClick =(event,number)=>{
        event.preventDefault();
        // console.log(number)
        dispatch(setCurrentPage(number))
        // dispatch(fetchPosts({ page: number, limit: itemsPerPage })) 
    }

    const handleRemoveCard =async(index)=>{
        dispatch(setLoadingCard(index));
        const updatedData = [...paginationData];
        updatedData.splice(index, 1);
        if (updatedData.length >= itemsPerPage) {
            dispatch(setNextFirstData(updatedData));
            // setLoadingCard(null);
            dispatch(setLoadingCard(null));
            return;
          }
        
          const nextPage = currentPage + 1;
          if (nextPage <= totalPageCount) {
            try {
              const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${nextPage}&_limit=1`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        
              const nextItem = await response.json();
              if (nextItem.length > 0) {
                updatedData.push(nextItem[0]);
              }
            } catch (error) {
              console.error('Error fetching next card:', error);
            }
          }
        
          dispatch(setNextFirstData(updatedData))
          dispatch(setLoadingCard(null));

    }

    // handle serchquery and debaouncing also

    useEffect(() => {
        // console.log("outset",searchQuery)
        let time =null
      time=setTimeout(()=>{
        // console.log("indesideset",searchQuery)
        dispatch(filterDataByQuery()); // Filter data based on search query
      },1000)
      return ()=>clearInterval(time)

    }, [searchQuery,dispatch,paginationData]);

   
  return (
   <>
    <DefaultLayout>
      
        <div>
       {
        status === 'loading' ? <div className='text-xl text-center my-10'>Loading...</div>:

            <>
            {/* switch button */}
         
            <div className="max-wlg mxauto bgwhite my4 shadow-g flex justifycenter items-center py4 mb-4 gap-4">
            <h1 className='text-2xl text-blue-600 font-semibold'>Click Change design</h1>
        <div className="inline-flex shadow-sm rounded-md mb5 border-2" role="group">
          <button type="button" onClick={()=>dispatch(setToggleButton(false))} 
          // className={`rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 {${!toggle ? "focus:z-10 focusring-2 focusring-blue-700 focus:text-white focus:bg-blue-700":""}`}
          className={`${!toggle ? "bg-blue-700 text-white rounded-l-lg text-sm font-medium px-4 py-2":"rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700"}`}
          >
            <FaGripHorizontal size={25}/>
          </button>
         
          <button onClick={()=>dispatch(setToggleButton(true))} type="button" 
          // className={`rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 {${toggle ? "bg-blue-700 focus:z-10 focusring-2 focusring-blue-700 focus:text-white focus:bg-blue-700 ":""}`}
          className={`${toggle ? "bg-blue-700 text-white rounded-r-lg text-sm font-medium px-4 py-2":"rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700"}`}
          >
            <FaList size={25}/>
          </button>
          </div>

          <div>
            <input className='outline-none py-2 px-3 border-2  rounded-lg focus:outline-blue-500 focus:border-none' type='text' placeholder='Serch Card...' value={searchQuery} onChange={(e)=>dispatch(setSearchQuery(e.target.value))}></input>
          </div>

          <div>
            <select className='outline-none py-2 px-3 border-2  rounded-lg focus:outline-blue-500 focus:border-none' type='select' placeholder='Serch Card...' value={itemsPerPage} onChange={(e)=>dispatch(setItemPerpage(e.target.value))}>
            <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={18}>18</option>
            </select>
          </div>
      </div>
{toggle ?(<ChngeDesignToggle paginationData={filteredData} loadingCard={loadingCard} handleRemoveCard={handleRemoveCard}/>):
(
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xlgrid-cols-4 gap-4 xl:gap-8'>
                              {filteredData && filteredData?.map((val, index) => {
                                  return (
                                      <div key={index} className=" relative overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 w-[350px]">
                                          {/*  <!-- Image --> */}
                                          {loadingCard === index ? (
                  <div className="flex items-center justify-center h-56">
                    <FaSpinner className="animate-spin text-gray-500" size={30} />
                  </div>
                ) : (
                  <>
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
                                              {val.title}
                                                  {/* Experience the simple pleasures of a world with no cars, and only */}
                                                  
                                              </p>
                                          </div>
                                          <figure>
                                              <img
                                                  src="https://picsum.photos/id/101/800/600"
                                                  alt="card image"
                                                  className="aspect-video w-full h-[150px]" />
                                          </figure>
                                          </>
                )
                                          }

                                      </div>
                                  )
                              })}

             </div>
)
}

               <div className='fle my-12'>
                                  <ul className='flex justify-center gap-4'>
                                      <li>
                                          <button
                                              className={`${currentPage === 1 ? "hidden" : "block"}`}
                                              onClick={handlePrevClick}
                                              disabled={currentPage === 1}>
                                              <div className="flex ml-1 mt-[-3px] bg-gray-200 px-1.5 py-2.5 rounded-full">
                                                  <FaChevronLeft size="0.6rem" />
                                                  <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
                                              </div>
                                          </button>
                                      </li>
                                      {visiblePageNumbers.map((number,i) => (
                                        
                                          <li key={number}>
                                              <span className={`${currentPage === number ? "bg-green-600 cursor-pointer text-white px-2 py-1 rounded-full" : "cursor-pointer border px-2 py-1 rounded-full bg-gray-200 text-black"}`}
                                                  onClick={(e) => handleClick(e, number)}
                                                >
                                                  {number}
                                              </span>
                                          </li>
                                      ))}

                                      <li>
                                          <button
                                              onClick={handleNextClick}
                                              disabled={currentPage === totalPageCount}
                                              className={`${currentPage === totalPageCount ? "hidden" : "block"}`}
                                          >
                                              <div className="flex items-center justify-center ml-1 pr-1 mt-[-3px] bg-gray-200 px-1.5 py-2.5 rounded-full">
                                                  <FaChevronRight size="0.6rem" />
                                                  <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
                                              </div>
                                          </button>
                                      </li>

                                  </ul>

                </div>

                </>
}

        </div>

    </DefaultLayout>
   </>
  )
}

export default ToolkitPagination