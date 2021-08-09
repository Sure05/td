import React from 'react';
import {Button, Label, Segment, Table} from "semantic-ui-react";

function EnemyList({enemy = [], removeElementById}) {
	return (
		<Segment>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Distance</Table.HeaderCell>
						<Table.HeaderCell>Speed</Table.HeaderCell>
						<Table.HeaderCell width={2}/>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{enemy.length > 0 ?
					enemy.map(el => <Table.Row key={el.id}>
						<Table.Cell>{el.name}</Table.Cell>
						<Table.Cell>{el.distance}</Table.Cell>
						<Table.Cell>{el.speed}</Table.Cell>
						<Table.Cell><Button onClick={() => removeElementById(el.id)}>Remove</Button></Table.Cell>
					</Table.Row>) : ''
					}
				</Table.Body>
			</Table>
		</Segment>
	);
}

export default EnemyList;
