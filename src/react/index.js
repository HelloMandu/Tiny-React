// @jsx createElement
import { render, createElement } from './react.js'

const Title = () => {
  return (
    <div>
      <h1>My React App</h1>
      <p>My first React app</p>
      <Temp/>
    </div>
  )
}

const Temp = () => {
  return <div>temp</div>
}

render(<Title/>,document.getElementById('root'));
