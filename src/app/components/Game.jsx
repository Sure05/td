import React, {useEffect, useState} from 'react';
import {Button, List} from "semantic-ui-react";

function Game({options}) {
	const stepLimit = 6;
	const [step, setStep] = useState(1)
	const [gameStatus, setGameStatus] = useState(true)
	const [info, setInfo] = useState([])
	const [enemy, setEnemy] = useState([])
	const {enemyList, towerRange} = options;
	
	useEffect(() => {
		nextStep()
	}, [step])
	
	useEffect(() => {
		setEnemy(enemyList)
		start();
	}, [options])
	

	
	const movedEnemy = () => {
		return [...enemy].map(el => {
			if ((el.distance - el.speed) <= 0) {
				setGameStatus(false)
			}
			return {
				...el,
				distance: el.distance - el.speed
			}
		})
	}
	
	const checkEnemy = (enemy) => {
		const filteredList = [...enemy].sort(function(a, b) {
			return a.distance - b.distance;
		});
		if(filteredList.length > 0){
			const el = filteredList[0];
			console.log(el.distance <= towerRange, el.distance, towerRange)
			if(el.distance <= towerRange){
				filteredList.splice(0, 1);
				const logs = [...info];
				logs.push(`Step ${step}: Kill ${el.name} at ${el.distance}m`);
				setInfo(logs);
			}
			setEnemy(filteredList)
		}
	}
	
	const checkGame = () => {
		console.log(`Step: ${step}`)
		console.log(`gameStatus: ${gameStatus}`)
		enemy.map(el => {
			console.log(`Name: ${el.name}, distance: ${el.distance}, speed: ${el.speed}`)
		})
		if(step > stepLimit || !gameStatus ){
			const logs = [...info];
			logs.push(`Tower Loose`);
			setInfo(logs);
		}
		if(enemy.length === 0) {
			const logs = [...info];
			logs.push(`Tower WIN in ${step} turn(s)`);
			setInfo(logs);
		}
	}
	
	const start = () => {
		setInfo([]);
		setStep(0)
		setGameStatus(true)
		nextStep()
	}
	
	const nextStep = () => {
		if(step <= stepLimit || gameStatus) {
			const enemyList = movedEnemy();
			checkEnemy(enemyList);
			checkGame();
			if(enemyList.length > 0) {
				setStep(() => step + 1);
			}
		}
	}
	
	return (
		<div>
			{/*<Button onClick={start}>NextStep</Button>*/}
			<List>
				{info.length > 0 ? info.map((el, index) => <List.Item key={index}>{el}</List.Item>) : ''}
			</List>
		</div>
	);
}

export default Game;
