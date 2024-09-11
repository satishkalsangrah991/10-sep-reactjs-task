import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";



import ToolkitPagination from "./components/paginationwithtoolkit/ToolkitPagination";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';

function App() {
const [count ,setCount] =useState(0)
const [toggle ,setToggle] = useState(false)

const increment =()=>{
  // console.log("count")
  setCount((pre)=>pre+1)
}
const data = (val)=>{
  console.log("val")
  return val
}
const data1 = useCallback(()=>{

  return data(count)
},[count])

const ChildCom =memo(({setToggle,toggle})=>{
console.log("re rendard")
  return(
    <>
<div className="flex justify-center items-center cursor-pointer my-6" onClick={()=>setToggle(!toggle)}><button>Click {toggle?"true":"false"}</button></div>
    </>
  )
})

  return (
  
    <>

 
  {/* <Card/> */}
  {/* <MainFile/> */}
{/* <Pagination/> */}

{/* <h1 className="text-xl py-12 text-center text-red-500">Hello Satish</h1>

<h1 className="text-xl py-4 text-center text-red-500">{data1}</h1>
<div className="flex justify-center items-center cursor-pointer" onClick={increment}><button>Click Count</button></div>

<div className="flex justify-center items-center cursor-pointer" onClick={()=>setToggle(!toggle)}><button>Click {toggle?"true":"false"}</button></div> */}


{/* useCallback */}
<h1 className="text-xl py-12 text-center text-red-500">Hello Satish Patidar</h1>

<h1 className="text-xl py-4 text-center text-red-500">{data1()}</h1>
<div className="flex justify-center items-center cursor-pointer" onClick={increment}><button>Click Count</button></div>

<ChildCom toggle={toggle} setToggle={setToggle}/>

{/* <BrowserRouter>
  <Routes>
    <Route path="/" element={<ToolkitPagination/>}/>



  </Routes>
  <Toaster />
</BrowserRouter> */}



    </>
  );
}

export default App;
