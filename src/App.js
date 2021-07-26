import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTasks from './components/AddTasks'


function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }


    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([ ...tasks, newTask ])
        console.log('newTags', newTask)

       
        fetch(`http://localhost:3000/to-dos`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    //Delete task
    const deleteTask = (id) => { setTasks(tasks.filter((task) => task.id !== id)) }

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
            <Footer />
        </div>
    )
}

export default App