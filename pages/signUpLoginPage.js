import Link from "next/link";
import React from "react";
import bg_signlog from "../public/bg_signlog.gif";
import Layout from "../components/layout";

const Signlog = () => {
  const img = "/background.svg";
  const img1 = "/1.svg";
  return (
    <Layout>
      {/* <div className="part1 h-screen bg-black relative overflow-hidden">
        <div className="flex items-center justify-center pt-6">
          <picture>
            <img className="w-16 h-16" src="/microbus.jpeg" alt="" />
          </picture>
        </div>
        <div className="flex flex-row justify-center">
          <div className=" ">
            <Image className="" src={myGif} alt="my gif" />
            <div className="text-white mt-0 font-semibold text-lg -lg:mt-1 text-center">
              Signup
            </div>
          </div>
          <div>
            <div className="">
              <Image src={myGif1} alt="my gif" />
              <div className="text-white mt-0 font-semibold text-lg -lg:mt-1 text-center">
                Login
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 text-lg font-semibold ml-4 text-white absolute w-full bottom-10  lg:bottom-16 ">
          <button className="px-6 py-1 rounded-full bg-purpleP hover:bg-purpleS transition-all duration-100">
            Return
          </button>
          <button className="px-6 py-1 rounded-full bg-purpleP hover:bg-purpleS transition-all duration-100">
            SOS
          </button>
        </div>

        <div className="w-64 absolute left-5 lg:left-12">
          <Image className="object-contain" src={title} alt="title" />
        </div>

        <div className="">hola</div>
        <div></div>
      </div> */}


      <div className="">
        <div
          className="h-screen"
          style={{
            width: "100%",
            background: `url(${bg_signlog.src})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center items-center gap-4 text-lg font-semibold m-auto text-white absolute w-full bottom-10  lg:bottom-16 ">
            {/* <Link href="/signUp/">
              <button className="px-6 py-1 rounded-full bg-purpleP hover:bg-purpleS transition-all duration-100">
                SignUp
              </button>
            </Link> */}
            <Link href="/login/">
              <button className="px-6 py-1 rounded-full bg-purpleP hover:bg-purpleS transition-all duration-100">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signlog;
