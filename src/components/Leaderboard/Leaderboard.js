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
                    <LeaderItem leader={leader} key={index} index={index} deleteLeader={this.props.deleteLeader} />
                )
            }
        );

        return (
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Score</td>
                        <td></td>
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
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    onClickDelete () {
        this.props.deleteLeader(this.props.index);
    }

    render() {
        const leader = this.props.leader;

        return (
            <tr> 
                <td>{leader.lastName}, {leader.firstName}</td>
                <td>{leader.score}</td>
                <td>
                    <input type="button" value="Delete" onClick={this.onClickDelete} />
                </td>
            </tr>
        )
    }
}

class NewLeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {}
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
        this.props.addLeader(this.state);
        console.log('submitted')
    }

    render() {
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
                        onChange={this.handleInputChange}/>
                </label>
                <input type="submit" value="Add New Leader" />
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
                <LeaderTable leaders={LEADERS} deleteLeader={this.deleteLeader}/>
                <NewLeader addLeader={this.addLeader} />
            </div>
        )
    }
}


export default Leaderboard