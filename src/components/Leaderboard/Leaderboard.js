import React from 'react'

var LEADERS = [
    {firstName: 'Alice', lastName: 'Geary', score: '96'},
    {firstName: 'John', lastName: 'Junge', score: '96'},
    {firstName: 'Rob', lastName: 'Vera', score: '88'}
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
        this.onClickNew = this.onClickNew.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    onClickNew(e) {
        e.preventDefault();
        this.props.addLeader(this.state);
    }

    render() {
        return (
            <form className="NewLeader" >
                <label>First Name: 
                    <input
                        name="firstName"
                        type="text" 
                        size="16"
                        onChange={this.handleInputChange}/>
                </label>
                <label>Last Name:
                    <input
                        name="lastName"
                        type="text"
                        size="16"
                        onChange={this.handleInputChange} />
                </label>
                <label>Score:
                    <input  
                        name="score"
                        type="number"
                        min="0"
                        max="100"
                        size="4" 
                        onChange={this.handleInputChange}/>
                </label>
                <input type="submit" value="Add New Leader" onClick={this.onClickNew} />
            </form>
        )
    }
}

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.deleteLeader = this.deleteLeader.bind(this);
        this.addLeader = this.addLeader.bind(this);
        this.state = {
            leaders: LEADERS
        };
    }

    deleteLeader(index) {
        LEADERS.splice(index, 1);
        this.setState({leaders: LEADERS})
    }

    addLeader(newLeader) {
        LEADERS.push(newLeader);
        this.setState({leaders: LEADERS})
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