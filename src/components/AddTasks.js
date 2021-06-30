import { useState } from 'react'

const AddTasks = ({ onAdd }) => {
    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title) {
            alert('Please add a task')
            return
        }

        onAdd({ title, day, isCompleted })

        setTitle('')
        setDay('')
        setIsCompleted(false)
    }
    
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input 
                    type='text' 
                    placeholder='Add Tasks'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input 
                    type='text' 
                    placeholder='Add Day'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Remider</label>
                <input 
                    type='checkbox' 
                    checked={isCompleted}
                    value={isCompleted}
                    onChange={(e) => setIsCompleted(e.currentTarget.checked)}
                />
            </div>

            <input type='submit' value='Save Tasks' className='btn btn-block' />

        </form>
    )
}

export default AddTasks