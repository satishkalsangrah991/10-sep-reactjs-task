import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const DefaultLayout = ({children}) => {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  return (
  <>
  <div className='bg-gray800 bg-blue-50'>
<div className='flex h-screen overflow-hidden'>
<Sidebar isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
  {/* hedear and content */}
<div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
  {/* header */}
  <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>

  {/* main content */}
  <main>
  <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
 {children}
</div>
  </main>
</div>
</div>
 </div>

  </>
  )
}

export default DefaultLayout