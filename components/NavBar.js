import React, { useEffect } from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { NavbarData } from '../utils/NavBarData';
import styles from '../styles/Home4.module.css';
import { useDispatch } from 'react-redux';
import { UPDATE_LOBBY } from '../reducers/lobbyReducer';
import { signOut, useSession } from 'next-auth/react';
import { UPDATE_USER } from '../reducers/userReducer';
import { useRouter } from 'next/router';

function NavBar() {
    const dispatch=useDispatch();
	const router= useRouter();

	const {data:session,status}=useSession();

	useEffect(()=>{
		if (status === "unauthenticated") {
			dispatch(UPDATE_USER(null));
			router.push('/login');
		  }
	},[status,session]);

	function handleLobby(value){
		dispatch(UPDATE_LOBBY(value));
	}

	const handleLogout = () => {
		signOut({callbackUrl:'/login'});
		dispatch({type:'SIGN_OUT'});
	};

	return (
		<div className={styles.whNavBar}>
			<div className={styles.whLogo}>
				
			</div>
				{NavbarData.map((item, index) => {
					if (index === 1 || index === 5) {
						return <hr key={index} className={styles.whDivider} />;
					} else
						return (
							<div
								key={index}
								className={styles.whMenuItem}
								onClick={()=>handleLobby(item.value)}
								>
								{item.icon}
								<span className={styles.whMenuItemSpan}>
									{item.title}
								</span>
							</div>
						);
				})}
				<div className={styles.whMenuItem}>
					<MdOutlineLogout size='40'  onClick={handleLogout} />
					<span className={styles.whMenuItemSpan} onClick={handleLogout}>Logout</span>
				</div>
		</div>
	);
}

export default NavBar;