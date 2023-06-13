import React, { useEffect } from "react";
import styles from '../styles/Home4.module.css';
import SocialMediaFooter from '../components/SocialMediaFooter';
import NavBar from "../components/NavBar";
import Questions from "../components/questions";
import Profile from "../components/profile";
import { useDispatch, useSelector } from "react-redux";
import Leader from "../components/leader";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { UPDATE_USER } from "../reducers/userReducer";
import Layout from "../components/layout";
import networkRequest from "../utils/request";
import Team from "../components/team";

const Lobby = () => {
  const lobbyValue = useSelector((state) => {
    return state.lobby;
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    // console.log(session);
    async function getUser() {
      const url = process.env.NEXTAUTH_URL + '/api/user';
      const data = {
      }
      const response = await networkRequest('GET', url, data);
      // console.log(response);
      if(response.status ===200){
         dispatch(UPDATE_USER(response.data.user));
      }
      else{
         signOut({callbackUrl:'/login'});
      }
    }

    if (status === "unauthenticated") {
      dispatch(UPDATE_USER(null));
      router.push('/login');
    }
    else if (status === 'authenticated') {
      getUser(session.user.email);
    }
  }, [session, status]);

  return (
    <>
      <Layout >

        <NavBar />
        <div className={styles.gamingArena}>
          {/* <div className={styles.gamingArenaMicrobusLogo}>

          </div> */}
          {lobbyValue === 0 ? <Questions /> :
            lobbyValue === 1 ? <Profile /> :
              lobbyValue === 2 ? <Leader /> : 
              <></>}

        </div>
        <SocialMediaFooter />
      </Layout>
    </>
  );
};

export default Lobby;
