let gameStatus = true;
let newRange = false;
let step = 1;
let i = 1
let options = {
	range: 55,
	unitList: [
		{id: "d2p", name: "1 BotA", distance: 100, speed: 10},
		{id: "OIc", name: "2 BotB", distance: 50, speed: 20},
		{id: "Hu7", name: "3 BotC", distance: 30, speed: 20},
		{id: "Hu73", name: "4 BotD", distance: 200, speed: 45},
		{id: "Hu74", name: "5 BotE", distance: 160, speed: 25},
		{id: "Hu74", name: "6 BotE", distance: 120, speed: 35},
	]
}
let info = []
let units = [];


const setDefaultStats = (data) => {
	gameStatus = true;
	i = 1;
	step = 1
	options = data;
	units = options.unitList;
	
}

export const startCall = (data, clear = true) => {
	if(data){
		if(clear) info = [];
		setDefaultStats(data)
		tour()
		return info
	}
}

const tour = () => {
	if (gameStatus) {
		if (units.length > 0) {
			movedEnemy()
			fireTower();
		}
		checkGameStatus()
	}
}


const fireTower = () => {
	const filteredList = units.sort(function (a, b) {
		
		if (a.distance / a.speed < b.distance / b.speed) {
			return -1;
		}
		if (a.distance / a.speed > b.distance / b.speed) {
			return 1;
		}
		return a.distance - b.distance
	});
	
	if (filteredList.length > 0) {
		const el = filteredList[0];
		
		if (el.distance < options.range) {
			filteredList.splice(0, 1);
			info.push(`Step ${step}: Kill ${el.name} at ${el.distance}m`)
		}
		
		units = filteredList;
	}
}
const movedEnemy = () => {
	
	units = [...units].map(el => {
		if (el.distance - el.speed <= 0) {
			gameStatus = false;
			info.push(`Step ${step}: ${el.name} kill tower`)
		}
		return {
			...el,
			distance: el.distance - el.speed
		}
	})
}

const checkGameStatus = () => {
	if (units.length === 0) gameStatus = false
	if (gameStatus === false) {
		if (units.length > 0) {
			info.push('loose, calculate new range')
			tryToWin();
		} else {
			info.push('win')
			if (newRange) info.push(`you can win with range: ${options.range}`)
		}
	} else {
		step++
		
		tour()
	}
}

const tryToWin = () => {
	if (i > 200) {
		console.log(`can't win this enemy`)
	} else {
		i++;
		newRange = true
		options.range++;
		units = options.unitList;
		step = 1;
		gameStatus = true;
		startCall(options, false);
	}
	
}
