import React, {useEffect, useState} from 'react';
import {Button, List} from "semantic-ui-react";

const stepsLimit = 6;
let gameStatus = true;
let newRange = false;
let step = 1;
const options = {
	range: 55,
	unitList: [
		{id: "d2p", name: "1 BotA", distance: 100, speed: 10},
		{id: "OIc", name: "2 BotB", distance: 50, speed: 20},
		{id: "Hu7", name: "3 BotC", distance: 30, speed: 20},
		{id: "Hu73", name: "4 BotD", distance: 200, speed: 45},
		{id: "Hu74", name: "5 BotE", distance: 160, speed: 30},
		{id: "Hu74", name: "6 BotE", distance: 120, speed: 35},
	]
}
let units = [];

const startCall = () => {
	console.log('start')
	units = options.unitList;
	tour()
}

const tour = () => {
	if (gameStatus) {
		console.log(`-----------------------Tour: ${step}---------------------------`)
		if (units.length > 0) {
			movedEnemy()
			fireTower();
		}
		checkGameStatus()
	}
	
}
const fireTower = () => {
	console.log('fireTower')
	const filteredList = units.sort(function (a, b) {
		if (a.distance / a.speed < b.distance / b.speed) {
			return -1;
		}
		if (a.distance / a.speed > b.distance / b.speed) {
			return 1;
		}
		
		return a.distance - b.distance
		
		// console.log(a.name, (a.speed / a.distance) * 100)
		// console.log(a.name, a.speed * (a.distance / 100), b.name, (b.speed * (b.distance / 100)))
		// console.log(a.name, Math.round(a.distance / a.speed), b.name, Math.round(b.distance / b.speed))
		// return a.distance / a.speed - b.distance / b.speed;
		// return ((a.speed * a.distance) / 100) - ((b.speed * b.distance) / 100);
	});
	
	if (filteredList.length > 0) {
		const el = filteredList[0];
		console.log(`range: ${options.range}`)
		if (el.distance <= options.range) {
			filteredList.splice(0, 1);
			console.log(`Step ${step}: Kill ${el.name} at ${el.distance}m`)
		}
		console.log([...filteredList])
		
		units = filteredList;
	}
}
const movedEnemy = () => {
	console.log('movedEnemy')
	units = [...units].map(el => {
		if (el.distance - el.speed <= 0) {
			gameStatus = false;
			console.log(`Step ${step}: ${el.name} kill tower`)
		}
		
		
		return {
			...el,
			distance: el.distance - el.speed
		}
	})
}

const checkGameStatus = () => {
	console.log(`status data: units: ${units.length}, step: ${step}, range: ${options.range}, status: ${gameStatus}`)
	if (units.length === 0) gameStatus = false
	if (gameStatus === false) {
		if (units.length > 0) {
			console.log('loose')
			tryToWin();
		} else {
			console.log('win')
			if(newRange) console.log(`win with range: ${options.range}`)
		}
	} else {
		step++
		tour()
	}
}
let i = 1
const tryToWin = () => {
	console.log(`tryToWin: ${i}`)
	if(i > 200) {
		console.log(`can't win`)
	} else  {
		i++;
		newRange = true
		options.range++;
		units = options.unitList;
		step = 1;
		gameStatus = true;
		startCall();
	}
	
}


function Game({options}) {
	const stepLimit = 6;
	const [step, setStep] = useState(1)
	const [gameStatus, setGameStatus] = useState(true)
	const [info, setInfo] = useState([])
	const [enemy, setEnemy] = useState([])
	const {enemyList, towerRange} = options;
	
	useEffect(() => {
		// nextStep()
	}, [step])
	
	useEffect(() => {
		setEnemy(enemyList)
		// start();
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
		const filteredList = [...enemy].sort(function (a, b) {
			return a.distance - b.distance;
		});
		if (filteredList.length > 0) {
			const el = filteredList[0];
			console.log(el.distance <= towerRange, el.distance, towerRange)
			if (el.distance <= towerRange) {
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
		if (step > stepLimit || !gameStatus) {
			const logs = [...info];
			logs.push(`Tower Loose`);
			setInfo(logs);
		}
		if (enemy.length === 0) {
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
		if (step <= stepLimit || gameStatus) {
			const enemyList = movedEnemy();
			checkEnemy(enemyList);
			checkGame();
			if (enemyList.length > 0) {
				setStep(() => step + 1);
			}
		}
	}
	
	return (
		<div>
			<Button onClick={startCall}>NextStep</Button>
			<List>
				{info.length > 0 ? info.map((el, index) => <List.Item key={index}>{el}</List.Item>) : ''}
			</List>
		</div>
	);
}

export default Game;
