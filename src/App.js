import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTasks from './components/AddTasks'
import ButtonServer from './components/ButtonServer'
import Button from './components/Button'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        // {
        //     id: 1,
        //     title: 'Doctors Appointment',
        //     day: 'Feb 5th at 2:30pm',
        //     isCompleted: true,
        // },
        // {
        //     id: 2,
        //     title: 'Meeting at School',
        //     day: 'Feb 6th at 1:30pm',
        //     isCompleted: true,
        // },
        // {
        //     id: 3,
        //     title: 'Food Shoping',
        //     day: 'Feb 5th at 2:30pm',
        //     isCompleted: false,
        // },
    ])
    console.log('task', tasks)

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:3000/to-dos')
        const data = await res.json()
        const resData = data.todos[0].listItems

        return resData
    }

    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([ ...tasks, newTask ])
    }

    //Delete task
    const deleteTask = (id) => {
          
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => 
            task.id === id ? { ...task, isCompleted: 
            !task.isCompleted } : task
            )
        )
    }

    return (
        <div className='container'>
            <Header 
                onAdd={() => setShowAddTask(!showAddTask)} 
                showAdd={showAddTask}
            />
            {showAddTask &&  <AddTasks onAdd={addTask} />}
            {tasks.length > 0 ? (
                <Tasks 
                    tasks={tasks} 
                    onDelete={deleteTask} 
                    onToggle={toggleReminder} />
            ) : (
                'No Tasks To Show'
            )}
            <ButtonServer />
        </div>
    )
}

export default App