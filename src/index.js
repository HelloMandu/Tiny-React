// @jsx createElement
import { render, createElement, Component } from './react.js'

class ClassComponent extends Component {
  render() {
    return (
      <div>Class Component</div>
    )
  }
}

const Title = () => {
  return (
    <div>
      <h1>My React App</h1>
      <p>My first React app</p>
      <ClassComponent/>
      <Temp/>
    </div>
  )
}

const Temp = () => {
  return <div>temp</div>
}

render(<Title/>,document.getElementById('root'));
