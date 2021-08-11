import React, {useEffect, useState} from 'react';
import {List} from "semantic-ui-react";

import {startCall} from '../calculateBattle'

function Game({options}) {
	// const [step, setStep] = useState(1)
	// const [gameStatus, setGameStatus] = useState(true)
	const [info, setInfo] = useState([])
	// const [enemy, setEnemy] = useState([])
	const {enemyList, towerRange} = options;
	
	useEffect(() => {
		setInfo([])
		async function calculateGame() {
			return startCall({
				range: towerRange,
				unitList: enemyList
			});
		}
		if(enemyList.length > 0)
			calculateGame().then(res => {
				setInfo(res)
			})
	}, [options])
	
	return (
		<div>
			<List>
				{info.length > 0 ? info.map((el, index) => <List.Item key={index}>{el}</List.Item>) : ''}
			</List>
		</div>
	);
}

export default Game;
