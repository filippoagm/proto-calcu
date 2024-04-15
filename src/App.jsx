import './App.css';
import { useState } from 'react';
import Datos from './component/Datos.js';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState('');
  
  const btnNumbers = Datos.values.map(value => {
    return <Boton
      key={value.toString()}
      handleClick={() => setInput(input + value)}
      value={value.toString()} />
  });

  const btnOperators = Datos.operators.map(value => {
    return <Boton
      key={value}
      handleClick={() => setInput(input + value)}
      value={value}
    />
  })

  const btnSigns = Datos.signs.map(value => {
    if (value === '=') {
      return <Boton
        key={value}

        handleClick={() => {
          if (input === '') {
            alert('Ingresa un valor');
            return;
          }
          setInput(evaluate(input).toString())
        }
        }
        value={value} />
    }
    return <Boton key={value} handleClick={() => setInput(input + value)} value={value} />
  })
  const [OtherValue] = Datos.other;

  return (
    <div className='container'>
      <Pantalla input={input} />

      <div className='btnContainer'>
        <div className='fila'>
          {btnNumbers[1]}
          {btnNumbers[2]}
          {btnNumbers[3]}
          {btnOperators[0]}
        </div>

        <div className='fila'>
          {btnNumbers[4]}
          {btnNumbers[5]}
          {btnNumbers[6]}
          {btnOperators[1]}
        </div>

        <div className='fila'>
          {btnNumbers[7]}
          {btnNumbers[8]}
          {btnNumbers[9]}
          {btnOperators[2]}
        </div>

        <div className='fila'>
          {btnSigns[0]}
          {btnSigns[1]}
          {btnNumbers[0]}
          {btnOperators[3]}
        </div>

        <div className='fila'>
          <Boton key={OtherValue} handleClick={() => setInput('')} value={OtherValue} />
        </div>

      </div>
    </div>
  )
}

function Boton({ handleClick, value }) {
  const isOperator = (value) => isNaN(value) && value !== '.' && value !== '=';
  return (
    <button key={value} className={`btn ${isOperator(value) ? 'operator' : ''}`.trimEnd()} onClick={handleClick}>
      {value}
    </button>
  )
}

function Pantalla({ input }) {
  return (
    <div className='input'>
      {input}
    </div>
  )
}

export default App