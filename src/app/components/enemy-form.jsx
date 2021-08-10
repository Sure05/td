import React, {useState} from 'react';
import {Button, Form, Input} from "semantic-ui-react";

const makeId = length => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
			charactersLength));
	}
	return result;
}

function EnemyForm({addElement}) {
	const [name, setName] = useState('');
	const [distance, setDistance] = useState(0);
	const [speed, setSpeed] = useState(0);
	
	const addEnemy = () => {
		const data = {
			id: makeId(3),
			name,
			distance,
			speed
		};
		addElement(data)
	}
	
	return (
		<Form.Group widths='equal'>
			<Form.Field>
				<label>Name</label>
				<Input value={name} onChange={(event, {value}) => setName(value)} fluid placeholder='Name'/>
			</Form.Field>
			<Form.Field>
				<label>Distance</label>
				<Input value={distance} onChange={(event, {value}) => setDistance(parseInt(value))} type="number" fluid
				       placeholder='Example: 100'/>
			</Form.Field>
			<Form.Field>
				<label>Speed</label>
				<Input value={speed} onChange={(event, {value}) => setSpeed(parseInt(value))} fluid placeholder='Example: 25'/>
			</Form.Field>
			<div>
				<Button onClick={() => addEnemy()}>Add bot</Button>
			</div>
		</Form.Group>
	);
}

export default EnemyForm;
