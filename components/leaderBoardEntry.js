import React from "react";
import { CgProfile } from "react-icons/cg";

function LeaderBoardEntry({ entry, position }) {
  // console.log(entry);
  return (
    entry ?
    <div className="flex flex-col w-72 mt-3 mr-8 rounded-md relative bg-[#D5FC34] bg-opacity-70 items-center justify-center">
      <div className="">
        <a>
          <img
            src="/31.png"
            className="h-16 w-16 absolute -mt-4 top-0 right-1"
            alt=""
          />
        </a>
      </div>
      <div className="pb-4">
        {" "}
        <CgProfile size="40" color="white" />
      </div>
      <div className="text-white font-bold">{entry.teamName}</div>
    </div>
    :<></>
  );
}

export default LeaderBoardEntry;
