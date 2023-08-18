import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-field'>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            placeholder="What's happening?"
            onChange={(e) => setText(e.target.value)}
          />
          <button className='field-btn' type='submit'>
            Tweet
          </button>
    
        </div>
        {/* <div className='form-group'>
          
        </div> */}
      </form>
    </section>
  )
}

export default GoalForm
