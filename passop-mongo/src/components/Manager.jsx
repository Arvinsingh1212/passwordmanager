import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
    
  }
  

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const copyText = (text) => {
    toast("🦄 copied to clipboard "+text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
    });
    navigator.clipboard.writeText(text)
  };

  const showPassword = () => {
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      ref.current.src = "eyecrossed.svg";
    } else {
      passwordInput.type = "password";
      ref.current.src = "eye.svg";
    }
  };

  const savePassword = async () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
      
      //if any such id exists in the db,delete it
      await fetch("http://localhost:3000/",{method: "DELETE",headers: {"Content-Type": "application/json"},body: JSON.stringify({id: form.id })})


      setPasswordArray([...passwordArray,{...form,id: uuidv4()}]);
      await fetch("http://localhost:3000/",{method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({ ...form,id: uuidv4() })})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form,id:uuidv4()}]));
      // console.log(...passwordArray, form);
      setform({ site: "", username: "", password: "" })
      
    }
  };

  const deletePassword = async (id) => {
   console.log("deleteing password with id",id)
    let c = confirm("do you really want to delete this password?")
    if(c){
      setPasswordArray(passwordArray.filter(item => item.id!==id))
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      let res = await fetch("http://localhost:3000/",{method: "DELETE",headers: {"Content-Type": "application/json"},body: JSON.stringify({id })})

    }
  };

  const editPassword = (id) => {
    console.log("editing password with id",id)
     setform({...passwordArray.filter(i=>i.id===id)[0],id: id})
     setPasswordArray(passwordArray.filter(item=>item.id!==id))
   };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center">your own password manager</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website url"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="passwordInput"
              />

              <span
                className="absolute right-[6px] top-[6px] cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} src="eye.svg" alt="eye" width="18" height="18" />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 w-fit gap-2 border border-green-900"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">your passwords</h2>

          {passwordArray.length === 0 && <div>No Password To Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" flex item-center justify-center py-2  text-center border border-white">
                        <a href={item.site} target="_blank"></a>
                        {item.site}
                        <div
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <img
                            className=" h-5 cursor-pointer ml-5 mt-1"
                            src="copy.svg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 w-40 text-center border border-white">
                        <div className="flex item-center justify-between mr-1">
                          <span>{item.username}</span>
                          <div
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img
                              className=" h-5 cursor-pointer ml-5 mt-1"
                              src="copy.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" px-2 py-2 w-40  text-center border border-white">
                        <div className="flex item-center justify-between mr-2 ">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img
                              className=" h-5 cursor-pointer ml-5 mt-1"
                              src="copy.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" px-2 py-2 w-40  text-center border border-white">
                        <div className="flex item-center justify-center gap-4  mr-4 ">
                          <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}><img src="delete.svg" alt="" /></span>
                          <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}><img src="edit.svg" alt="" /></span> 
                            
                        </div>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
