import Divider from 'material-ui/Divider';
import { sortBy, cloneDeep, startCase } from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentArchive from 'material-ui/svg-icons/content/archive';
import ContentUnarchive from 'material-ui/svg-icons/content/unarchive';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import * as React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    changeEncounterArchived,
    deleteEncounter,
    loadEncounter,
    loadEncounters,
    saveEncounter,
} from '../../actions/encounters';
import { loadMonsters } from '../../actions/monsters';
import { Campaign } from '../../models/Campaign';
import { Encounter } from '../../models/Encounter';
import { Monster } from '../../models/Monster';
import { PlayerCharacter } from '../../models/PlayerCharacter';
import { AppState } from '../../state/app.state';
import { challengeRatingExperience, experienceThresholds } from '../../utils/Variables';
import MonsterCard from '../monsters/MonsterCard';
import MonstersOverview from '../monsters/MonstersOverview';
import SaveModal from '../utilities/SaveModal';

const containerStyle = {
    overflowX: 'scroll',
    overflowY: 'visible',
    width: '100%',
    height: 'calc(100vh - 156px)',
    padding: '0 4px',
} as any;

interface Props {
    monsters: { [id: string]: Monster } | null;
    encounters: Encounter[] | null;
    characters: PlayerCharacter[];
    alignments: string[] | null;
    sources: string[] | null;
    selectedCampaign?: Campaign;
    selectedEncounter?: Encounter;
    loadMonsters?(): void;
    loadEncounters?(): void;
    saveEncounter?(encounter: Encounter): void;
    loadEncounter?(encounter: Encounter): void;
    deleteEncounter?(encounter: Encounter): void;
    encounterArchivedChanged?(encounter: Encounter, archived: boolean): void;
}

interface State {
    encounter: Encounter;
    unsavedEdits: boolean;
    manualCharacters: { level: number, count: number }[];
    playerCharacters: PlayerCharacter[];
    monsters: { monster: Monster, count: number }[];
    showMonster: Monster | null;
    saveNewEncounter: boolean;
    openLoad: boolean;
}

function mapStateToProps(state: AppState, ownProps: Props): Partial<Props> {
    return {
        characters: state.playerCharacters.characters ? Object.keys(state.playerCharacters.characters).map(c => state.playerCharacters.characters![c]) : [],
        encounters: state.encounters.encounters ? Object.keys(state.encounters.encounters).map(c => state.encounters.encounters![c]) : null,
        monsters: state.monsters.monsters,
        alignments: state.monsters.alignments,
        sources: state.monsters.sources,
        selectedCampaign: state.campaigns.selectedCampaign || undefined,
        selectedEncounter: state.encounters.selectedEncounter || undefined,
        ...ownProps,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: Props): Partial<Props> {
    return {
        loadMonsters: () => dispatch(loadMonsters()),
        loadEncounters: () => dispatch(loadEncounters()),
        saveEncounter: e => dispatch(saveEncounter(e)),
        loadEncounter: e => dispatch(loadEncounter(e)),
        deleteEncounter: e => dispatch(deleteEncounter(e)),
        encounterArchivedChanged: (e, a) => dispatch(changeEncounterArchived(e, a)),
        ...ownProps,
    };
}

const manualCharCount = [
    <MenuItem value={1} key={1} primaryText={1} />,
    <MenuItem value={2} key={2} primaryText={2} />,
    <MenuItem value={3} key={3} primaryText={3} />,
    <MenuItem value={4} key={4} primaryText={4} />,
    <MenuItem value={5} key={5} primaryText={5} />,
    <MenuItem value={6} key={6} primaryText={6} />,
    <MenuItem value={7} key={7} primaryText={7} />,
    <MenuItem value={8} key={8} primaryText={8} />,
    <MenuItem value={9} key={9} primaryText={9} />,
    <MenuItem value={10} key={10} primaryText={10} />,
    <MenuItem value={11} key={11} primaryText={11} />,
    <MenuItem value={12} key={12} primaryText={12} />,
];

const manualCharLevel = [
    ...manualCharCount,
    <MenuItem value={13} key={13} primaryText={13} />,
    <MenuItem value={14} key={14} primaryText={14} />,
    <MenuItem value={15} key={15} primaryText={15} />,
    <MenuItem value={16} key={16} primaryText={16} />,
    <MenuItem value={17} key={17} primaryText={17} />,
    <MenuItem value={18} key={18} primaryText={18} />,
    <MenuItem value={19} key={19} primaryText={19} />,
    <MenuItem value={20} key={20} primaryText={20} />,
];

function multiplier(playerCount: number): (monsterCount: number) => number {
    if (playerCount < 3) {
        return (monsterCount: number) => {
            if (monsterCount <= 1) {
                return 1.5;
            } else if (monsterCount === 2) {
                return 2;
            } else if (monsterCount >= 3 && monsterCount <= 6) {
                return 2.5;
            } else if (monsterCount >= 7 && monsterCount <= 10) {
                return 3;
            } else if (monsterCount >= 11 && monsterCount <= 14) {
                return 4;
            } else {
                return 5;
            }
        }
    } else if (playerCount > 5) {
        return (monsterCount: number) => {
            if (monsterCount <= 1) {
                return 0.5;
            } else if (monsterCount === 2) {
                return 1;
            } else if (monsterCount >= 3 && monsterCount <= 6) {
                return 1.5;
            } else if (monsterCount >= 7 && monsterCount <= 10) {
                return 2;
            } else if (monsterCount >= 11 && monsterCount <= 14) {
                return 2.5;
            } else {
                return 3;
            }
        }
    } else {
        return (monsterCount: number) => {
            if (monsterCount <= 1) {
                return 1;
            } else if (monsterCount === 2) {
                return 1.5;
            } else if (monsterCount >= 3 && monsterCount <= 6) {
                return 2;
            } else if (monsterCount >= 7 && monsterCount <= 10) {
                return 2.5;
            } else if (monsterCount >= 11 && monsterCount <= 14) {
                return 3;
            } else {
                return 4;
            }
        }
    }
}

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

export default (connect(mapStateToProps, mapDispatchToProps)(EncounterPlanner) as any as React.StatelessComponent<Props>);
