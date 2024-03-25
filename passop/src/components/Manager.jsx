import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

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

  const savePassword = () => {
    toast.success('Password Added', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log(...passwordArray, form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            Add password
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
                          <span>{item.password}</span>
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
