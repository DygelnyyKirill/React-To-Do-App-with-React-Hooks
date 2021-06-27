const AddTasks = () => {
    return (
        <form className='add-form'>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Tasks' />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time' />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Remider</label>
                <input type='checkbox' />
            </div>

            <input type='submit' value='Save Tasks' className='btn btn-block' />
        </form>
    )
}

export default AddTasks