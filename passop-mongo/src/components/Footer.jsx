import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full ">
      <div className="bg-slate-800 text-white justify-center items-center">
        <div className="flex justify-center item-center logo font-bold text-white text -2xl my-5">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <div className="flex justify-center item-center">
          created with
          <img className=" h-6 w-auto ml-2 mr-2" src="heart.svg" alt="" /> by
          Arvin singh
        </div>
      </div>
    </div>
  );
};

export default Footer;
