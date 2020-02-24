/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'

const API_KEY = 'f185658707ae3b2d431801916e197bcd';
const TOKEN = '6b5f1e12474c76bc6b4171ed92f08c27ddc4facd1866015e9c688fc68d51ca40';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardsData: {
                noOfBoards: null,
                array: null,
                selectedBoardNo: null,
                selectedBoardId: null,
                selectedBoardName: null,
            },
            listData: {
                array: null
            },
            cardsData: {
                array: null
            },
            membersData: {
                array: null
            },
            cardsWithIds: null,
            count: null,
            taskCount: null
        };
    }
    // Done
    fetchBoards = () => {
        fetch(`https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`)
            .then(res => res.json())
            .then((boards) => {
                this.setState({
                    boardsData: {
                        ...this.state.boardsData,
                        array: boards,
                        selectedBoardId: boards[0].id,
                        selectedBoardName: boards[0].name
                    }
                })
                this.fetchListWithCardsAgainstBoardId(boards[0].id);
            })
            .catch(console.log)
    }

    fetchListWithCardsAgainstBoardId = (boardId) => {
        fetch(`https://api.trello.com/1/boards/${boardId}/lists?cards=open&card_fields=all&filter=open&fields=all&key=${API_KEY}&token=${TOKEN}`)
            .then(res => res.json())
            .then((lists) => {
                // console.log(lists)
                this.setState({
                    listData: {
                        ...this.state.listData,
                        array: lists,
                    }
                })
            })
            .catch(console.log)
            .finally(() => this.calculation())
    };

    // making counter info array
    calculation = async () => {
        const arr = [];
        await this.state.listData.array && this.state.listData.array.forEach(ele => {
            let obj = {}
            obj.cardId = ele.id;
            ele.cards.forEach(board => {
                obj.idBoard = board.idBoard;
                obj.idMembers = board.idMembers;
            })
            arr.push(obj);
        });
        this.setState({ cardsWithIds: arr })
        //here
        let count = [];
        await this.state.membersData.array && this.state.membersData.array.forEach(person => {
            arr.forEach(card => {
                card.idMembers ?.forEach(id => {
                    if (id === person.id) {
                        if (count.filter(ct => ct.id === id).length) {
                            count.map(ct => {
                                if (ct.id === id) {
                                    ct.count++;
                                }
                            })
                        } else {
                            count.push({ count: 1, id })
                        }
                    }

                })
                });
        })
        console.log('checkkkk', count)
        this.setState({ taskCount: count })
        // console.log('mmmmmmmm',this.state.membersData.array)

        // let obj={}
        // this.state.membersData.array?.forEach(member=>{
        //     count.forEach(item=>{
        //         if(item.id===member.id){
        //              obj = {
        //                 ...this.state.membersData,
        //                 noOfCardsAssigned:item.count
        //             }
        //         }
        //         console.log(obj)
        //     })
        // })
        // // this.setState({membersData : {...this.state.membersData,cardsCount}})
        // console.log('Coiunt',count)
    };

    getTasks = ({ id, fullName }) => {
        let task = this.state.taskCount.filter(el => {
            if (id === el.id) {
                return true;
            }
            return false
        })
        return task[0] ?.count || "0"
}

    fetchMembersOfBoard = (boardId) => {
        fetch(`https://api.trello.com/1/boards/${boardId}/members?key=${API_KEY}&token=${TOKEN}`)
            .then(res => res.json())
            .then((members) => {
                console.log('Memerbers ->', members)
                this.setState({
                    membersData: {
                        ...this.state.membersData,
                        array: members,
                    }
                })
            })
            .catch(console.log)
        // .finally(() => this.cardsAssignedToEachMember())
    }

    UpdateDashboardSection = (key, boardName, boardId) => {
        this.fetchMembersOfBoard(boardId);
        this.fetchListWithCardsAgainstBoardId(boardId);
        // this.cardsAssignedToEachMember();

        this.setState({
            boardsData: {
                ...this.state.boardsData,
                selectedBoardName: boardName,
                selectedBoardNo: key
            }
        })
    }

    componentDidMount() {
        this.fetchBoards();
    }
    render() {
        const { boardsData, listData, membersData, selectedBoardNo, count } = this.state;
        console.log(membersData)
        return (
            <div className="wrapper">
                <nav className="navbar navbar-expand-md navbar-default fixed-top">
                    <div className="navbar-header">
                        <div id="mobile-menu">
                            <div className="left-nav-toggle">
                                <a href="#">
                                    <i className="stroke-hamburgermenu"></i>
                                </a>
                            </div>
                        </div>
                        <a className="navbar-brand" href="index.html">
                            Crewlogix
                      <span>v.1.4</span>
                        </a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <div className="left-nav-toggle">
                            <a href="">
                                <i className="stroke-hamburgermenu"></i>
                            </a>
                        </div>
                        <form className="navbar-form mr-auto">
                            <input type="text" className="form-control" placeholder="Project Reporting Tool" />
                        </form>
                        <ul className="nav navbar-nav">

                            <li className="nav-item profil-link">
                                <a href="login.html">
                                    <span className="profile-address">luna@company.io</span>
                                    <img src="images/profile.jpg" className="rounded-circle" alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <aside className="navigation">
                    {/* <button onClick={this.calculation}>check</button> */}
                    <nav>
                        <ul className="nav luna-nav">
                            <li className="nav-category">
                                All Projects
                      </li>
                            {!!boardsData.array && boardsData.array.map((item, key) => {
                                return (
                                    <li className='in-active' data-toggle="collapse" key={key}>
                                        <a onClick={() => this.UpdateDashboardSection(key, item.name, item.id)}>{item.name}</a>
                                    </li>
                                )
                            })}

                            <li className="nav-info">
                                <i className="pe pe-7s-shield text-accent"></i>

                                <div className="m-t-xs">
                                    <span className="c-white">Trello Reporting Tool</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="view-header">
                                    <div className="header-icon">
                                        <i className="pe page-header-icon pe-7s-shield"></i>
                                    </div>
                                    <div className="header-title">
                                        <h3 className="m-b-xs">{boardsData.selectedBoardName}</h3>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <div className="row">
                            {!!listData.array && listData.array.map((item, key) => {
                                return (
                                    <div className="col-lg-2 col-xs-6" key={key}>
                                        <div className="panel panel-filled">
                                            <div className="panel-body">
                                                <h2 className="m-b-none">
                                                    {item.cards && item.cards.length} <span className="slight"></span>
                                                </h2>
                                                <div className="small">{item.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="panel panel-filled">
                                    <div className="panel-body">
                                        <table className="table table-responsive-sm">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>No of Tasks Assigned</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!!membersData.array && membersData.array.map((item, key) => {
                                                    return (
                                                        <tr>
                                                            <td>{item.fullName}</td>
                                                            <td>{this.getTasks(item)}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">

                                <div className="panel panel-b-accent">
                                    <div className="panel-body text-center p-m">
                                        <h2 className="font-light">
                                            Total 43 Cards
                                  </h2>

                                        <div className="sparkline7 m-t-xs"></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

            </div>
        )
    }
}