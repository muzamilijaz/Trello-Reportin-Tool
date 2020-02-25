import React, { Component } from 'react'
import { API_KEY, TOKEN } from './Dashboard';
import queryString from 'query-string';

export default class Reporting extends Component {
  constructor(props) {
    const { location: { search } } = props;
    const parsed = queryString.parse(search);
    super(props);
    this.state = {
      allActions: null,
      boardId: parsed.boardId,
      memberId: parsed.memberId,
      filteredActions:null

    }
  }

  fetchActionsAgainstMemberId = (memberId, boardId) => {
    console.log(memberId)
    fetch(`https://api.trello.com/1/members/${memberId}/actions?key=${API_KEY}&token=${TOKEN}&fields=all`)
      .then(res => res.json())
      .then((data) => {
        let arr = []
        console.log(data)
        data.forEach(el => {
          if (el.data.board.id === boardId) {
            arr.push(el)
          }
        })
        this.setState({ allActions: arr }, () => {
          this.filterTheActions();
        })
      })
      .catch(console.log)
    // .finally(() => this.calculation())
  };
  componentWillUnmount() {
    this.setState({ allActions: [] })
  }

   msToTime=(duration)=> {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor((duration / (1000 * 60 * 60* 24)) % 30);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    days = (seconds < 10) ? "0" + days : days;
  
    return days + ':'+ hours + ":" + minutes + ":" + seconds;
  }

  filterTheActions = () => {
    console.log('checkkk', this.state.allActions)
    let actions = [...this.state.allActions];
    let filteredActions = []
    actions.forEach(ele => {
      let obj = {}
      let memberName=ele.memberCreator.username;
      if (ele.type === 'updateCard') {
        // card is renamed
        if (ele.data.old.name) {
          obj.type = 'cardRenamed';
          obj.oldCardName = ele.data.old.name;
          obj.cardName = ele.data.card.name;
          obj.listId = ele.data.list.id;
          obj.listName = ele.data.list.name;
          obj.updatedTime = ele.date;
          filteredActions.push(obj)
        }
        // if card is moved  // done
        else if (ele.data.listBefore) {
          obj.type = 'cardMoved';
          obj.before =  ele.data.listBefore.name;
          obj.after =  ele.data.listAfter.name;
          obj.cardName = ele.data.card.name;
          obj.cardId = ele.data.card.id;
          obj.updatedTime = ele.date;

          filteredActions.forEach(element => {
            // let object={};
            var assignedTime='';
            var finishTime='';
            if(element.cardId === ele.data.card.id)
            {

               if(element.type==='cardCreated'){
                    assignedTime= ele.updatedTime;
               }
               else if(element.type==='cardMoved'){
                finishTime=ele.updatedTime;
               }
               console.log('9999999999999999',assignedTime,finishTime)
            }
          });

          filteredActions.push(obj)
        }
      }
      // done
      else if (ele.type ==='createCard'){
        obj.type = 'cardCreated';
        obj.cardName = ele.data.card.name;
        obj.cardId = ele.data.card.id;
        obj.listId = ele.data.list.id;
        obj.listName = ele.data.list.name;
        obj.updatedTime = ele.date;
        console.log(`memberName has created card ${obj.cardName} in list -> ${obj.listName} at ${obj.updatedTime}`)
        filteredActions.push(obj)
      }
      else if (ele.type ==='updateList'){
        if(ele.data.list.closed){
          obj.type = 'listClosed';
          obj.listName = ele.data.list.name;
          obj.updatedTime = ele.date;
          filteredActions.push(obj)
        }
        if(ele.data.old.name && !ele.data.list.closed){
          obj.type = 'listRenamed';
          obj.listName = ele.data.list.name;
          obj.oldListName = ele.data.old.name;
          obj.listId = ele.data.list.id;
          obj.updatedTime = ele.date;
          filteredActions.push(obj)
        }
      }
      else if (ele.type ==='createList'){
        obj.type = 'listCreated';
        // obj.cardName = ele.data.card.name;
        obj.listId = ele.data.list.id;
        obj.listName = ele.data.list.name;
        obj.updatedTime = ele.date;
        filteredActions.push(obj)
      }
    })

    this.setState({filteredActions:filteredActions})
    console.log('filteredActions', filteredActions)
  }
  componentDidMount() {
    this.fetchActionsAgainstMemberId(this.state.memberId, this.state.boardId)
  }
  render() {
    const { allActions,filteredActions } = this.state
    return (
      <div>
        <ul className="nav luna-nav">
          {!!allActions && allActions.map((item, key) => {
            return (
              <li>{item.type}</li>
            )
          })}
        </ul>

      </div>
    )
  }
}
