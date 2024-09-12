const Task = ({task,handleComplete,handleEdit,handleDelete}) =>{
    return (
        <div 
            className='task'
            style={{ backgroundColor: task.completed ? 'green' : 'white' }}
        >
            <h2>{task.name}</h2>
            <button onClick={()=>handleComplete(task.id)}>Complete</button>
            <button onClick={()=>handleEdit(task.id)}>Edit</button>
            <button onClick={()=> handleDelete(task.id)}>X</button>
        </div>
    )
}
export default Task;