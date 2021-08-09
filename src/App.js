import React, {useState} from 'react';
import {Container, Grid} from "semantic-ui-react";
import Options from "./app/settings/options";
import Game from "./app/components/Game";

function App() {
	const [gameData, setGameData] = useState({
		towerRange: null,
		enemyList: []
	})
	const start = (data) => {
		setGameData(data)
	}
	return (
		<Container>
			<Grid>
				<Grid.Row columns={2}>
					<Grid.Column width={5}>
						<Game options={gameData} />
					</Grid.Column>
					<Grid.Column width={11}>
						<Options start={start}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
}

export default App;
