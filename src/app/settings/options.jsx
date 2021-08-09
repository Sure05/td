import React, {useState} from 'react';
import {Button, Form, Input, Segment} from "semantic-ui-react";
import EnemyForm from "../components/enemy-form";
import EnemyList from "../components/enemy-list";



function Options({start}) {
	const [towerRange, setTowerRange] = useState(25);
	const [enemy, setEnemy] = useState([
		{id: "d2p", name: "BotA", distance: 100, speed: 10},
		{id: "OIc", name: "BotB", distance: 50, speed: 10},
		{id: "Hu7", name: "BotC", distance: 70, speed: 10},
	]);
	
	const removeElementById = id => {
		const list = [...enemy];
		setEnemy(list.filter(el => el.id !== id))
	}
	
	const addElement = (data) => {
		const list = [...enemy];
		list.push(data);
		setEnemy(list)
	}
	
	const startGame = () => {
		start({
			towerRange,
			enemyList: enemy
		})
	}
	
	return (
		<Segment inverted>
			<Form inverted>
				<Form.Field>
					<label>Tower firing range</label>
					<Input value={towerRange} onChange={(event, {value}) => setTowerRange(parseInt(value))} type="number" placeholder='Example: 50'/>
				</Form.Field>
				<EnemyForm addElement={(data) => addElement(data)}/>
				<EnemyList enemy={enemy} removeElementById={removeElementById}/>
				<Button onClick={() => startGame()} disabled={enemy.length === 0 && parseInt(towerRange) > 0} type='submit'>Start</Button>
			</Form>
		</Segment>
	);
}

export default Options;
