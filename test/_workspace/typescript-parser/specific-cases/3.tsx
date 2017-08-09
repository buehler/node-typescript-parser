class CharacterOverview extends React.Component<Props, State>{
    public render(): JSX.Element {
        const chars = sortBy(this.props.characters ? Object.keys(this.props.characters).map(key => this.props.characters![key]) : [], c => (c.name || '').toLowerCase());
        const alive = chars.filter(c => c.isAlive);
        const dead = chars.filter(c => !c.isAlive);

        return (
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={12}>
                            <h4>Alive Characters</h4>
                            <Table onRowSelection={([idx]) => this.handleRowClick(alive, idx as number)}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>
                                            Name
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Player
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Level
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Experience
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} showRowHover={true}>
                                    {alive && alive.length ?
                                        alive.map((char, idx) => (
                                            <TableRow key={idx} style={{ cursor: 'pointer' }}>
                                                <TableRowColumn><span title={char.name}>{char.name}</span></TableRowColumn>
                                                <TableRowColumn>{char.playerName}</TableRowColumn>
                                                <TableRowColumn>{char.level || 1}</TableRowColumn>
                                                <TableRowColumn>{char.experience || 0}</TableRowColumn>
                                            </TableRow>
                                        ))
                                        :
                                        <TableRow>
                                            <TableRowColumn colSpan={5}>No alive characters found.</TableRowColumn>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <h4>Dead Characters</h4>
                            <Table onRowSelection={([idx]) => this.handleRowClick(dead, idx as number)}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>
                                            Name
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Player
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Level
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Experience
                                        </TableHeaderColumn>
                                        <TableHeaderColumn />
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} showRowHover={true}>
                                    {dead && dead.length ?
                                        dead.map((char, idx) => (
                                            <TableRow key={idx} style={{ cursor: 'pointer' }}>
                                                <TableRowColumn><span title={char.name}>{char.name}</span></TableRowColumn>
                                                <TableRowColumn>{char.playerName}</TableRowColumn>
                                                <TableRowColumn>{char.level}</TableRowColumn>
                                                <TableRowColumn>{char.experience}</TableRowColumn>
                                                <TableRowColumn style={{ textAlign: 'right' }}>
                                                    <IconButton onClick={() => this.props.navigate!(`/characters/${char._id}`)}>
                                                        <ImageEdit />
                                                    </IconButton>
                                                </TableRowColumn>
                                            </TableRow>
                                        ))
                                        :
                                        <TableRow>
                                            <TableRowColumn colSpan={5}>No dead characters found.</TableRowColumn>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Col>
                    </Row>
                    <FloatingActionButton style={{ position: 'fixed', bottom: '16px', right: '16px' }} mini={true} onClick={() => this.props.navigate!('/characters/new')}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Col>
            </Row>
        )
    }

    private handleRowClick(chars: PlayerCharacter[], idx: number): void {
        const char = chars[idx];
        if (char) {
            this.props.navigate!(`/characters/${char._id}`)
        }
    }
}
