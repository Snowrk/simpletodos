// Write your code here
import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {isEditing: false, inp: '', checked: false}

  componentDidMount() {
    const {title} = this.props
    this.setState({inp: title})
  }

  edit = () => {
    this.setState({isEditing: true})
  }

  save = () => {
    const {unid, saveFun} = this.props
    const {inp} = this.state
    const obj = {title: inp, id: unid}
    saveFun(obj)
    this.setState({isEditing: false})
  }

  changeInp = event => this.setState({inp: event.target.value})

  changeCheck = () => this.setState(prev => ({checked: !prev.checked}))

  render() {
    const {delFun, unid, title} = this.props
    const {isEditing, inp, checked} = this.state
    const fun = () => delFun(unid)
    return (
      <li className="todo">
        <div className="flex">
          <input
            className="check"
            type="checkbox"
            checked={checked}
            onChange={this.changeCheck}
          />
          {isEditing ? (
            <input
              className="edit-input"
              type="text"
              value={inp}
              onChange={this.changeInp}
              placeholder="edit Todo"
            />
          ) : (
            <p data-check={checked}>{title}</p>
          )}
        </div>
        <div className="flex">
          {isEditing ? (
            <button type="button" className="btn blue" onClick={this.save}>
              Save
            </button>
          ) : (
            <button type="button" className="btn" onClick={this.edit}>
              Edit
            </button>
          )}
          <button type="button" className="btn" onClick={fun}>
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
