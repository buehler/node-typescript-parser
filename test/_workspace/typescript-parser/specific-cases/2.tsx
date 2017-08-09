class EncounterPlanner extends React.Component<Props, State> {
    private static defaultState: State = {
        encounter: new Encounter(),
        unsavedEdits: false,
        manualCharacters: [],
        playerCharacters: [],
        monsters: [],
        showMonster: null,
        saveNewEncounter: false,
        openLoad: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = EncounterPlanner.defaultState;
    }

    public componentWillMount(): void {
        if (this.props.monsters === null) {
            this.props.loadMonsters!();
        }
        if (this.props.encounters === null) {
            this.props.loadEncounters!();
        }
    }

    public componentWillReceiveProps(next: Props): void {
        let monsters = this.state.monsters;
        if (next.selectedEncounter && this.state.encounter !== next.selectedEncounter && this.props.monsters) {
            monsters = next.selectedEncounter.monsters.map(m => ({ count: m.count, monster: this.props.monsters![m.id] }));
        }
        this.setState({
            encounter: next.selectedEncounter || new Encounter(),
            monsters,
        });
    }

    public render(): JSX.Element {
        const xp = this.state.monsters.reduce((sum, cur) => sum += cur.count * challengeRatingExperience[(cur.monster.challengeRating || 0)], 0);
        const adjusted = this.adjustedXp(xp);
        const thresholds = {
            easy: this.xpSumThreshold('easy'),
            medium: this.xpSumThreshold('medium'),
            hard: this.xpSumThreshold('hard'),
            deadly: this.xpSumThreshold('deadly'),
        };

        const encounterDifficulty = xp <= 0 ? '' : startCase(Object.keys(thresholds).reverse().find(k => thresholds[k] <= adjusted) || 'easy');

        return (
            <div>
                <Toolbar className="toolbar">
                    <ToolbarGroup firstChild={true}>
                        <RaisedButton label="Reset Encounter" onClick={() => this.setState(EncounterPlanner.defaultState)} primary={true} />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <RaisedButton
                            label="Save"
                            disabled={!this.state.unsavedEdits}
                            primary={true}
                            onClick={() => this.handleSaveEncounter()}
                        />
                        <RaisedButton label="Load" secondary={true} onClick={() => this.setState({ openLoad: true })} />
                    </ToolbarGroup>
                </Toolbar>
                <SaveModal
                    title="Save Encounter"
                    text="Please enter a name for the encounter."
                    onClose={result => result ? this.saveNewEncounter(result) : this.setState({ saveNewEncounter: false })}
                    open={this.state.saveNewEncounter}
                />
                <Row className="content-with-toolbar-top">
                    <Col xs={4}>
                        <div style={containerStyle}>
                            <div style={{ marginBottom: '8px' }}>
                                <Row>
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={6}>
                                                <h6>Difficulty</h6>
                                            </Col>
                                            <Col xs={6}>
                                                <h6><b>{encounterDifficulty}</b></h6>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <p>Players Thresholds</p>
                                                <Row>
                                                    <Col xs={6}><p style={{ margin: 0 }}>Easy</p></Col>
                                                    <Col xs={6}><p style={{ margin: 0 }}>{thresholds.easy}xp</p></Col>
                                                    <Col xs={6}><p style={{ margin: 0 }}>Medium</p></Col>
                                                    <Col xs={6}><p style={{ margin: 0 }}>{thresholds.medium}xp</p></Col>
                                                    <Col xs={6}><p style={{ margin: 0 }}>Hard</p></Col>
                                                    <Col xs={6}><p style={{ margin: 0 }}>{thresholds.hard}xp</p></Col>
                                                    <Col xs={6}><p style={{ margin: 0 }}>Deadly</p></Col>
                                                    <Col xs={6}><p style={{ margin: 0 }}>{thresholds.deadly}xp</p></Col>
                                                </Row>
                                            </Col>
                                            <Col xs={6}>
                                                <p>Monsters</p>
                                                <Row>
                                                    <Col xs={12}><p style={{ margin: 0 }}>Total EXP</p></Col>
                                                    <Col xs={12}><p style={{ margin: 0, textAlign: 'right' }}>{xp}xp</p></Col>
                                                    <Col xs={12}><p style={{ margin: 0 }}>Adjusted EXP</p></Col>
                                                    <Col xs={12}><p style={{ margin: 0, textAlign: 'right' }}>{adjusted}xp</p></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <Divider />
                            <Row>
                                <Col xs={12}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <h6>Characters</h6>
                                        <List>
                                            {sortBy(this.props.characters, c => c.name.toLowerCase()).map((char, key) => (
                                                <ListItem
                                                    key={key}
                                                    primaryText={`${char.name} (${char.level || 1})`}
                                                    leftCheckbox={
                                                        <Checkbox
                                                            checked={!!this.state.playerCharacters.find(c => c._id === char._id)}
                                                            onClick={() => {
                                                                const playerCharacters = cloneDeep(this.state.playerCharacters);
                                                                const found = playerCharacters.find(c => c._id === char._id);
                                                                if (found) {
                                                                    playerCharacters.splice(playerCharacters.indexOf(found), 1);
                                                                } else {
                                                                    playerCharacters.push(char);
                                                                }
                                                                this.setState({
                                                                    playerCharacters,
                                                                });
                                                            }}
                                                        />
                                                    }
                                                />
                                            ))}
                                        </List>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col xs={12}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <h6>Manual Characters</h6>
                                        {this.state.manualCharacters.map((char, key) => (
                                            <Row key={key}>
                                                <Col xs={4}>
                                                    <SelectField
                                                        fullWidth={true}
                                                        autoWidth={true}
                                                        floatingLabelText="Count"
                                                        value={char.count}
                                                        onChange={(event, index, value) => {
                                                            const manualCharacters = cloneDeep(this.state.manualCharacters);
                                                            manualCharacters[key].count = parseInt(value || '1', 10);
                                                            this.setState({
                                                                manualCharacters,
                                                            });
                                                        }}
                                                    >
                                                        {manualCharCount}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={4}>
                                                    <SelectField
                                                        fullWidth={true}
                                                        autoWidth={true}
                                                        floatingLabelText="Level"
                                                        value={char.level}
                                                        onChange={(event, index, value) => {
                                                            const manualCharacters = cloneDeep(this.state.manualCharacters);
                                                            manualCharacters[key].level = parseInt(value || '1', 10);
                                                            this.setState({
                                                                manualCharacters,
                                                                unsavedEdits: true,
                                                            });
                                                        }}
                                                    >
                                                        {manualCharLevel}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={4}>
                                                    <IconButton
                                                        style={{ marginTop: '24px' }}
                                                        onClick={() => {
                                                            const manualCharacters = cloneDeep(this.state.manualCharacters);
                                                            manualCharacters.splice(key, 1);
                                                            this.setState({
                                                                manualCharacters,
                                                                unsavedEdits: true,
                                                            });
                                                        }}
                                                    >
                                                        <ActionDelete />
                                                    </IconButton>
                                                </Col>
                                            </Row>
                                        ))}
                                        <Row>
                                            <Col xs={12}>
                                                <FlatButton
                                                    label="Add Level"
                                                    onClick={() => {
                                                        const manualCharacters = cloneDeep(this.state.manualCharacters);
                                                        manualCharacters.push({
                                                            level: 1,
                                                            count: 1,
                                                        });
                                                        this.setState({
                                                            manualCharacters,
                                                            unsavedEdits: true,
                                                        });
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col xs={12}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <h6>Monsters</h6>
                                        {this.state.monsters.map((monster, key) => (
                                            <Row key={key}>
                                                <Col xs={12}>
                                                    <p style={{ margin: '0', fontWeight: 'lighter', fontSize: '18px' }}>{monster.monster.name}</p>
                                                    <p style={{ margin: '0', fontWeight: 'lighter' }}>CR: {monster.monster.challengeRating || 0} XP: {challengeRatingExperience[monster.monster.challengeRating || 0]}</p>
                                                </Col>
                                                <Col xs={6}>
                                                    <TextField
                                                        fullWidth={true}
                                                        floatingLabelText="Count"
                                                        type="number"
                                                        min={1}
                                                        step={1}
                                                        value={monster.count}
                                                        onChange={(e, value) => {
                                                            const monsters = cloneDeep(this.state.monsters);
                                                            monsters[key].count = parseInt(value || '1', 10);
                                                            this.setState({
                                                                monsters,
                                                                unsavedEdits: true,
                                                            });
                                                        }}
                                                    />
                                                </Col>
                                                <Col xs={6}>
                                                    <div style={{ textAlign: 'right', marginTop: '28px' }}>
                                                        <IconButton
                                                            tooltip="Show Monster"
                                                            tooltipPosition="top-left"
                                                            onClick={() => this.setState({ showMonster: monster.monster })}
                                                        >
                                                            <ActionSearch />
                                                        </IconButton>
                                                        <IconButton
                                                            tooltip="Delete"
                                                            tooltipPosition="top-left"
                                                            onClick={() => {
                                                                const monsters = cloneDeep(this.state.monsters);
                                                                monsters.splice(key, 1);
                                                                this.setState({
                                                                    monsters,
                                                                    unsavedEdits: true,
                                                                });
                                                            }}
                                                        >
                                                            <ActionDelete />
                                                        </IconButton>
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div style={containerStyle}>
                            <MonstersOverview id="encounterPlanner" onMonsterSelected={monster => this.handleMonsterSelected(monster)} showAdd={false} encounterPlanner={true} />
                        </div>
                    </Col>
                </Row>
                <Drawer width={500} openSecondary={true} open={!!this.state.showMonster}>
                    <IconButton style={{ marginBottom: '8px' }} onClick={() => this.setState({ showMonster: null })}>
                        <NavigationClose />
                    </IconButton>
                    <MonsterCard monster={this.state.showMonster || new Monster()} />
                </Drawer>
                <Drawer
                    width={400}
                    docked={false}
                    openSecondary={true}
                    open={this.state.openLoad}
                    onRequestChange={openLoad => this.setState({ openLoad })}
                >
                    <IconButton style={{ marginBottom: '8px' }} onClick={() => this.setState({ openLoad: false })}>
                        <NavigationClose />
                    </IconButton>
                    <div>
                        <h5 style={{ marginLeft: '10px' }}>Encounters</h5>
                        <List>
                            {(this.props.encounters || []).filter(e => !e.archived).map((e, key) => (
                                <ListItem
                                    key={key}
                                    onClick={event => { this.props.loadEncounter!(e); this.setState({ openLoad: false }) }}
                                >
                                    {e.name}
                                    <IconButton
                                        onClick={event => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            this.props.encounterArchivedChanged!(e, !e.archived);
                                        }}>
                                        <ContentArchive />
                                    </IconButton>
                                    <IconButton
                                        onClick={event => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            this.props.deleteEncounter!(e);
                                        }}>
                                        <ActionDelete />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                        <h5 style={{ marginLeft: '10px' }}>Archived Encounters</h5>
                        <List>
                            {(this.props.encounters || []).filter(e => e.archived).map((e, key) => (
                                <ListItem
                                    key={key}
                                    onClick={event => { this.props.loadEncounter!(e); this.setState({ openLoad: false }) }}
                                >
                                    {e.name}
                                    <IconButton
                                        onClick={event => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            this.props.encounterArchivedChanged!(e, !e.archived);
                                        }}>
                                        <ContentUnarchive />
                                    </IconButton>
                                    <IconButton
                                        onClick={event => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            this.props.deleteEncounter!(e);
                                        }}>
                                        <ActionDelete />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }

    private xpSumThreshold(difficulty: 'easy' | 'medium' | 'hard' | 'deadly'): number {
        let xp = 0;

        for (const char of this.state.manualCharacters) {
            const amount = experienceThresholds[char.level][difficulty];
            xp += amount * char.count;
        }

        for (const char of this.state.playerCharacters) {
            xp += experienceThresholds[char.level || 1][difficulty];
        }

        return xp;
    }

    private adjustedXp(xp: number): number {
        const monsterCount = this.state.monsters.reduce((sum, cur) => sum += cur.count, 0);
        const playerCount = this.state.playerCharacters.length + this.state.manualCharacters.reduce((sum, cur) => sum += cur.count, 0);
        return multiplier(playerCount)(monsterCount) * xp;
    }

    private handleMonsterSelected(monster: Monster): void {
        if (this.state.monsters.find(m => m.monster._id === monster._id)) {
            return;
        }
        const monsters = cloneDeep(this.state.monsters);
        monsters.push({ monster, count: 1 });
        this.setState({
            monsters,
            unsavedEdits: true,
        });
    }

    private saveNewEncounter(name: string): void {
        const encounter = new Encounter();
        encounter.archived = false;
        encounter.name = name;
        encounter.campaignId = this.props.selectedCampaign!._id!;
        encounter.monsters = this.state.monsters.map(m => ({ id: m.monster._id!, count: m.count }));
        this.props.saveEncounter!(encounter);
        this.setState({
            saveNewEncounter: false,
            unsavedEdits: false,
        });
    }

    private handleSaveEncounter(): void {
        if (this.state.encounter._id) {
            this.state.encounter.monsters = this.state.monsters.map(m => ({ id: m.monster._id!, count: m.count }));
            this.props.saveEncounter!(this.state.encounter);
            this.setState({
                saveNewEncounter: false,
                unsavedEdits: false,
            });
        } else {
            this.setState({
                saveNewEncounter: true,
            });
        }
    }
}
