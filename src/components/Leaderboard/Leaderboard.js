import React from 'react'
import orderBy from 'lodash/orderBy'

var LEADERS = [
    {firstName: 'Alice', lastName: 'Geary', score: '96'},
    {firstName: 'Rob', lastName: 'Vera', score: '88'},
    {firstName: 'John', lastName: 'Junge', score: '96'}
]

class LeaderTable extends React.Component {
    render() {
        const rows = [];

        this.props.leaders.forEach((leader, index) => {
                rows.push(
                    <LeaderItem leader={leader} key={index} index={index} {...this.props} />
                )
            }
        );

        return (
            <table>
                <thead>
                    <tr>
                        <td className="name">Name</td>
                        <td className="score">Score</td>
                        <td className="buttons"></td> 
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class LeaderItem extends React.Component {
    constructor(props) {
        super(props);
        this.deleteLeader = this.deleteLeader.bind(this);
        this.editLeader = this.editLeader.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.state = { editing: false };
    }

    deleteLeader(index) {
        this.props.deleteLeader(index || this.props.index);
    }

    editLeader() {
        this.setState({ editing: true })
    }

    stopEditing() {
        this.setState({ editing: false })
    }

    render() {
        const leader = this.props.leader;
        const editing = this.state.editing;
        const score = leader.score;
        const lastName = leader.lastName;
        const firstName = leader.firstName;

        const fixedRow = (
            <tr> 
                <td>
                    {lastName}, {firstName}
                </td>
                <td>
                    {score}
                </td>
                <td>
                    <input type="button" value="Edit" onClick={this.editLeader} />
                    <input type="button" value="Delete" onClick={this.deleteLeader} />
                </td>
            </tr>
        )

        const editingRow = (
            <tr className="editingRow"> 
                <td colSpan="3">
                    <NewLeader editing stopEditing={this.stopEditing} deleteLeader={this.deleteLeader} {...this.props} />
                </td>
            </tr>
        )

        return (
            editing? editingRow : fixedRow
        )
    }
}

class NewLeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteLeader = this.deleteLeader.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        const thisLeader = LEADERS[this.props.index]
        this.state = { ...thisLeader }
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        {this.props.editing && this.deleteLeader()}
        {this.props.editing && this.stopEditing()}
        this.props.addLeader(this.state);

        var inputs = e.target.getElementsByTagName('input');
        for (var i=0; i<inputs.length; i++) {
            var att = inputs[i].getAttribute('type');
            if (att == 'text' || 'number') {
                inputs[i].value = '';
            }
        }
    }

    deleteLeader() {
        this.props.deleteLeader(this.props.index);
    }

    stopEditing() {
        this.props.stopEditing();
    }

    render() {
        const buttonText = this.props.editing ? "Update" : "Add New Leader"

        return (
            <form className="NewLeader" onSubmit={this.handleSubmit}>
                <label>First Name: 
                    <input
                        name="firstName"
                        type="text" 
                        size="16"
                        pattern="[A-Za-z]+"
                        required
                        title="Please enter a first name"
                        defaultValue={this.state.firstName}
                        onChange={this.handleInputChange}/>
                </label>
                <label>Last Name:
                    <input
                        name="lastName"
                        type="text"
                        size="16"
                        pattern="[A-Za-z]+"
                        required
                        title="Please enter a last name"
                        defaultValue={this.state.lastName}
                        onChange={this.handleInputChange} />
                </label>
                <label>Score:
                    <input  
                        name="score"
                        type="number"
                        min="0"
                        max="100"
                        size="4" 
                        pattern="[0-9]{1,3}"
                        required
                        defaultValue={this.state.score}
                        onChange={this.handleInputChange}/>
                </label>
                <input type="submit" value={buttonText} />
                {this.props.editing && <input type="button" value="Cancel" onClick={this.stopEditing}></input>}
            </form>
        )
    }
}

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.deleteLeader = this.deleteLeader.bind(this);
        this.addLeader = this.addLeader.bind(this);
        this.sortLeaders();
        this.state = {
            leaders: LEADERS
        };
    }

    sortLeaders() {
        LEADERS = orderBy(LEADERS, ['score', 'lastName', 'firstName'], ['desc', 'asc', 'asc']);
    }

    deleteLeader(index) {
        LEADERS.splice(index, 1);
        this.setState({leaders: LEADERS})
    }

    addLeader(newLeader) {
        LEADERS.push(newLeader);
        this.sortLeaders();
        this.setState({leaders: LEADERS});
    }

    render() {
        return (
            <div className="Leaderboard">
                <div className="Leaderboard-header">Leaderboard</div>
                <LeaderTable leaders={LEADERS} addLeader={this.addLeader} deleteLeader={this.deleteLeader}/>
                <NewLeader addLeader={this.addLeader} deleteLeader={this.deleteLeader}/>
            </div>
        )
    }
}

export default Leaderboard