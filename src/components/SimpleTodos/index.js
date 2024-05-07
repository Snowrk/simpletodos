import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

// Write your code here

class SimpleTodos extends Component {
  state = {savedList: initialTodosList, inp: ''}

  delFun = unid => {
    this.setState(prevState => {
      const newList = prevState.savedList.filter(item => !(item.id === unid))
      return {savedList: newList}
    })
  }

  addFun = obj => {
    const {title, quantity} = obj
    for (let i = 0; i < quantity; i += 1) {
      this.setState(prevState => {
        const tempObj = {id: v4(), title}
        return {savedList: [tempObj, ...prevState.savedList]}
      })
    }
  }

  saveFun = obj => {
    const {title, id} = obj
    this.setState(prev => {
      const tempArr = [...prev.savedList]
      const idx = tempArr.findIndex(item => item.id === id)
      tempArr[idx].title = title
      return {savedList: tempArr}
    })
  }

  addNew = event => {
    event.preventDefault()
    const {inp} = this.state
    if (inp.includes(' ')) {
      const idx = inp.lastIndexOf(' ')
      console.log(idx)
      const num = parseInt(inp.slice(idx + 1))
      console.log(num)
      if (!Number.isNaN(num)) {
        console.log('in if', Number.isNaN(num))
        const obj = {title: inp.slice(0, idx), quantity: num}
        this.addFun(obj)
      } else {
        console.log('in else')
        const obj = {title: inp, quantity: 1}
        this.addFun(obj)
      }
    } else {
      const obj = {title: inp, quantity: 1}
      this.addFun(obj)
    }
  }

  changeInp = event => {
    this.setState({inp: event.target.value})
  }

  render() {
    const {savedList, inp} = this.state
    return (
      <div className="bg">
        <div className="bg-1">
          <h1>Simple Todos</h1>
          <form className="addTodo" onSubmit={this.addNew}>
            <input
              placeholder="add new Todo"
              type="text"
              value={inp}
              onChange={this.changeInp}
            />
            <button type="submit">Add</button>
          </form>
          <ul className="container">
            {savedList.map(item => (
              <TodoItem
                key={item.id}
                title={item.title}
                delFun={this.delFun}
                saveFun={this.saveFun}
                unid={item.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
