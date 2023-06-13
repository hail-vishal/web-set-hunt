import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_LEADER } from "../reducers/leaderReducer";
import networkRequest from "../utils/request";
import second from '../public/31.png';
import first from '../public/32.png';
import third from '../public/33.png';
import firstPrize from '../public/winner.png';
import secondPrize from '../public/silver-medal.png';
import thirdPrize from '../public/broze-medal.png';
import { REMOVE_LOADER, SHOW_LOADER } from "../reducers/loaderReducer";

const Leader = () => {
  const leaderBoard = useSelector((state) => state.leader);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const loader = useSelector((state)=>state.loader);
  const [loading,setLoading]= useState(false);

  useEffect(() => {
    async function fetchLeaderBoard() {
      const url = process.env.NEXTAUTH_URL + "/api/leaderBoard";
      const response = await networkRequest("GET", url, {});
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data.leaderboard);
        setLoading(false);
        dispatch(UPDATE_LEADER(response.data.leaderboard));
      }
    }
    const startTime = new Date(process.env.START_TIME);
    const endTime = new Date(process.env.END_TIME);
    const current = new Date();
    if(Date.parse(current)<Date.parse(endTime)&&Date.parse(current)>Date.parse(startTime)){
      setLoading(true);
      fetchLeaderBoard();
      if(loader){
        dispatch(REMOVE_LOADER());
      }
    }
    else if(Date.parse(current)<Date.parse(startTime)){
      dispatch(SHOW_LOADER());
    }
  }, []);

  if(loading){
    return <p style={{color:'#9537FF',fontSize:'2rem',fontWeight:'800'}}>Loading...</p>
  }

  return leaderBoard && leaderBoard.length > 0 && user ? (
    <>
      <div className="flex flex-col mx-12">
        <div className="text-[#D5FC34] text-3xl font-semibold my-2">
          Leaderboard
        </div>

        <div className="flex flex-row justify-between my-2 mb-12">
          <div className="flex flex-col w-72 mt-3 mr-8 rounded-md relative bg-[#D5FC34] bg-opacity-70 items-center justify-center" style={{height:'150px'}}>
            <div className="">
              <a>
                <img
                  src={second.src}
                  className="h-16 w-16 absolute -mt-4 top-0 right-1"
                  alt=""
                />
              </a>
            </div>
            <div className="pb-4">
              <img style={{width:'64px',height:'64px'}}  src={secondPrize.src}/>
            </div>
            <div className="text-white font-bold text-transform: capitalize text-xl" style={{textOverflow: 'ellipsis',
  maxWidth: '200px',overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'}}>
              {leaderBoard[1].teamName}
              
            </div>
          </div>
          <div className="flex flex-col w-72 mr-8 rounded-md relative bg-[#D5FC34] bg-opacity-70 items-center justify-center"  style={{height:'150px'}}>
            <div className="flex justify-center pr-16">
              <a>
                <img
                  src={first.src}
                  className=" top-0 h-16 absolute w-16 -mt-11"
                  alt=""
                />
              </a>
            </div>
            <div className="my-2 pt-3">
              {" "}
              <img style={{width:'64px',height:'64px'}}  src={firstPrize.src}/>
            </div>
            <div className="text-white font-bold text-transform: capitalize text-xl" style={{textOverflow: 'ellipsis',
  maxWidth: '200px',overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'}}>
              {leaderBoard[0].teamName}
              
            </div>
          </div>
          <div className="flex flex-col w-72 mt-3  rounded-md bg-[#D5FC34] relative bg-opacity-70 items-center justify-center"  style={{height:'150px'}}>
            <div className="">
              <a>
                <img
                  src={third.src}
                  className="h-16 w-16 -mt-4 absolute top-0 left-1"
                  alt=""
                />
              </a>
            </div>
            <div className="pb-4">
              {" "}
              <img style={{width:'64px',height:'64px'}}  src={thirdPrize.src}/>
            </div>
            <div className="text-white font-bold text-transform: capitalize text-xl" style={{textOverflow: 'ellipsis',
  maxWidth: '200px',overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'}}>
              {leaderBoard[2].teamName}
              
            </div>
          </div>
        </div>

        {leaderBoard && leaderBoard[3] ? (
          <div
          className="flex flex-row justify-between items-center bg-[#9537FF] opacity-85 rounded-md h-4/12 mt-1.5"
        >
          <div className="flex flex-row my-2 justify-center">
            <div className="ml-3">
              <CgProfile size="40" color="white" />
            </div>
            <div className="text-white pl-5 mt-1 text-bold flex flex-col justify-center">
              <div className='text-transform: capitalize font-semibold text-xl'>{leaderBoard[3].teamName}</div>
            </div>
          </div>
          <div className="mr-4 font-semi text-black text-2xl bg-[#D5FC34] rounded-full h-8 w-8 flex justify-center items-center">
            {4}
          </div>
        </div>
        ) : (
          <></>
        )}
        {leaderBoard && leaderBoard[4] ? (
          <div
          className="flex flex-row justify-between items-center bg-[#9537FF] opacity-85 rounded-md h-4/12 mt-1.5"
        >
          <div className="flex flex-row my-2 justify-center">
            <div className="ml-3">
              <CgProfile size="40" color="white" />
            </div>
            <div className="text-white pl-5 mt-1 text-bold flex flex-col justify-center">
              <div className="text-transform: capitalize font-bold text-xl">{leaderBoard[4].teamName}</div>
            </div>
          </div>
          <div className="mr-4 font-semi text-black text-2xl bg-[#D5FC34] rounded-full h-8 w-8 flex justify-center items-center">
            {5}
          </div>
        </div>
        ) : (
          <></>
        )}

        <div className="text-lg text-[#D5FC34] font-sans mt-4">
          Your Position
        </div>
        {
          user.teamId ?
          leaderBoard.map((entry, index) => {
            if (entry.teamId === user.teamId) {
              return (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center bg-[#9537FF] opacity-85 rounded-md h-4/12 mt-1.5"
                >
                  <div className="flex flex-row my-2 justify-center">
                    <div className="ml-3" >
                      <CgProfile size="40" color="white" style={{display:'flex',height:'100%',}} />
                    </div>
                    <div className="text-white pl-5 mt-1 text-bold flex flex-col justify-center">
                      <div className="text-transform: capitalize font-semibold text-xl">{entry.teamName}</div>
                      <div>
                        {entry && entry.members ? (
                          entry.members.map((member, index) => {
                              if(entry.members.length===2&&index===0)
                            return <span className="text-transform: capitalize font-medium" key={index}>{member.name}, </span>;
                            return <span className="text-transform: capitalize font-medium " key={index}>{member.name} </span>;
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mr-4 font-semi text-black text-2xl bg-[#D5FC34] rounded-full h-8 w-8 flex justify-center items-center">
                    {index + 1}
                  </div>
                </div>
              );
            }
          }):
          <div style={{ minWidth: 'fit-content', height: 'fit-content', fontSize: '22px', fontWeight: '650', color: 'white', overflow: 'hidden', maxWidth: '40vw', textTransform: 'capitalize',color:'red',marginTop:'10px' }}>
          Please update your team details
        </div>
        }
        
      </div>
    </>
  ) : (
    <><p style={{color:'#9537FF',fontSize:'2rem',fontWeight:'800'}}>Will be available soon...</p></>
  );
};

export default Leader;
