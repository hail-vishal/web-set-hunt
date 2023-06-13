import React from 'react';

import { MdOutlineLeaderboard } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { RiTeamLine } from 'react-icons/ri';
import { FaFire } from 'react-icons/fa';

export const NavbarData = [
	{
		title: 'Dashboard',
		value: 0,
		icon: <FaFire size='40' />,
		cName: 'whMenuItem',
	},
	{},
	{
		title: 'Profile',
		value: 1,
		icon: <CgProfile size='40' />,
		cName: 'whMenuItem',
	},
	{
		title: 'Leaderboard',
		value: 2,
		icon: <MdOutlineLeaderboard size='40' />,
		cName: 'whMenuItem',
	},
	// {
	// 	title: 'Team',
	// 	value: 3,
	// 	icon: <RiTeamLine size='40' />,
	// 	cName: 'whMenuItem',
	// },
	{},
];