import React from "react";
import {useRef} from "react";

const Manager = () => {
    const ref=useRef()
    const showpassword = () =>
    {
        if(ref.current.src.includes("eyecrossed.svg")){
            ref.current.src = "eye.svg"
        }
        else{
            ref.current.src = "eyecrossed.svg"
        }
    }
  return (
    <>
      <div className=' mycontainer'>
        <h1 className='text-4xl text font-bold text-center'>
          <span className="text-green-500">&lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center"> your own password manager</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            placeholder="Enter website url"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name=""
            id=""
          />
          <div className="flex w-full justify-between gap-8">
            <input
                placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
            />
            <div className="relative">
            <input
              placeholder="Enter password"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              />
              <span className="absolute right-[6px] top-[6px] cursor-pointer " onClick={showpassword}><img ref={ref} src="eye.svg" alt="eye" width="18" height="18" /></span>
            </div>
          </div>
          <button className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 w-fit gap-2 border border-green-900">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
