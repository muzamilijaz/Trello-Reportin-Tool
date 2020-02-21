/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

const API_KEY='f185658707ae3b2d431801916e197bcd';
const TOKEN='6b5f1e12474c76bc6b4171ed92f08c27ddc4facd1866015e9c688fc68d51ca40';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boardsData:{
          noOfBoards: null,
          array:null,
          selectedBoardNo:null,
          selectedBoardName:null,
        },
        listData :{
            array:null
        },
        cardsData :{
          array:null
      }
    };
}
// Done
fetchBoards=()=>{
  fetch(`https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`)
  .then(res => res.json())
  .then((boards) => {
    this.setState({boardsData: {...this.state.boardsData,array:boards,selectedBoardName:boards[0].name}})
  })
  .catch(console.log)
}

// Done
fetchListsAgainstBoardId = (boardId) => {
  fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`)
  .then(res => res.json())
  .then((lists) => {
    console.log(lists)
    this.setState({listData:{...this.state.listData,array:lists}});
    lists.forEach(element => {
      fetch(`https://api.trello.com/1/lists/${element.id}/cards?key=${API_KEY}&token=${TOKEN}`)
    .then(res => res.json())
    .then((cards) => {
      console.log(cards)
      this.setState({cardsData:{...this.state.cardsData,array:cards}})
    })
    .catch(console.log)
    });
  })
  .catch(console.log)
}

fetchCardsAgainstListId = (listId) => {
  fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`)
  .then(res => res.json())
  .then((lists) => {
    console.log(lists)
    this.setState({listData:{...this.state.listData,array:lists}})
  })
  .catch('aaa',console.log)
}

UpdateDashboardSection=async (key,boardName,boardId)=>{
  const listId= await this.fetchListsAgainstBoardId(boardId) 

  this.setState({boardsData: {...this.state.boardsData,selectedBoardName:boardName,selectedBoardNo:key }})
}
  componentDidMount(){
  this.fetchBoards()
  }
  render() {
    const { boardsData,listData } = this.state;
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
                      <input type="text" className="form-control" placeholder="Search data for analysis"/>
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
              <nav>
                  <ul className="nav luna-nav">
                      <li className="nav-category">
                          All Projects
                      </li>
                      {!!boardsData.array && boardsData.array.map((item,key)=>{
                        return (
                          <li className="active" data-toggle="collapse" key={key}> 
                          <a onClick={()=>this.UpdateDashboardSection(key,item.name,item.id)}>{item.name}</a>
                      </li>
                        )})}
                     
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
                    {!!listData.array && listData.array.map((item,key)=>{
                      return( 
                      <div className="col-lg-2 col-xs-6" key={key}>
                      <div className="panel panel-filled">
                          <div className="panel-body">
                              <h2 className="m-b-none">
                                  5 <span className="slight"></span>
                              </h2>
                              <div className="small">{item.name}</div>
                          </div>
                      </div>
                      </div>
                      )})}
      
                  </div>
                  <div className="row">
                      <div className="col-md-8">
                          <div className="panel panel-filled">
                              <div className="panel-body">
                                  <table className="table table-responsive-sm">
                                      <thead>
                                      <tr>
                                          <th>Name</th>
                                          <th>Role</th>
                                          <th>No of Tasks Assigned</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                          <td>Haris</td>
                                          <td>React Native</td>
                                          <td>20</td>
                                      </tr>
                                      <tr>
                                          <td>Haris</td>
                                          <td>React Native</td>
                                          <td>20</td>
                                      </tr>
                                      <tr>
                                          <td>Haris</td>
                                          <td>React Native</td>
                                          <td>20</td>
                                      </tr>
                                      <tr>
                                          <td>Haris</td>
                                          <td>React Native</td>
                                          <td>20</td>
                                      </tr>
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
