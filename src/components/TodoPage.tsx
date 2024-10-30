import './TodoPage.css'
import { useState } from 'react'

interface Task {
    id: number;
    task: string;
    completed: boolean;
    deleted: boolean;
}

export function TodoPage() {
    const [storageState, updateState] = useState<string | null>(localStorage.getItem('ToDo_tasks'));
    const [currentFilter, setFilter] = useState<string>('');

    const addNewTask = () => {
        const tasks: Task = JSON.parse(localStorage.getItem('ToDo_tasks')) || [];

        const taskInput = document.getElementById('task') as HTMLInputElement;
        const newTask: Task = {
            id: Date.now(),
            task: taskInput.value,
            completed: false,
            deleted: false
        };

        tasks.push(newTask)
        localStorage.setItem('ToDo_tasks', JSON.stringify(tasks));
        taskInput.value = '';
        setFilter('Все дела');
        updateState(localStorage.getItem('ToDo_tasks'));
    }

    const clearTasks = () => {
        localStorage.removeItem('ToDo_tasks');
        setFilter('');
        updateState(localStorage.getItem('ToDo_tasks'));
    }

    const setCompleted = (e) => {
        const tasks = JSON.parse(localStorage.getItem('ToDo_tasks')) || [];

        const updatedTasks = tasks.map(elem => {
            if (+elem.id === +e.target.id) {
                return {
                    ...elem,
                    completed: true
                };
            }
            return elem;
        })
        localStorage.setItem('ToDo_tasks', JSON.stringify(updatedTasks));
        updateState(localStorage.getItem('ToDo_tasks'));
    }

    const setDeleted = (e) => {
        const tasks = JSON.parse(localStorage.getItem('ToDo_tasks')) || [];

        const updatedTasks = tasks.map(elem => {
            if (+elem.id === +e.target.id) {
                return {
                    ...elem,
                    deleted: true
                };
            }
            return elem;
        })
        localStorage.setItem('ToDo_tasks', JSON.stringify(updatedTasks));
        updateState(localStorage.getItem('ToDo_tasks'));
    }

    return (
        <div className="todo_mgmt_wrapper">
            <div className="todo_controls">
                <button className="add_task_btn" id='add_new_task' onClick={addNewTask}>Добавить</button>
                <div className="task_input_frame">
                    <input type="text" className="add_task_input" placeholder='Пополните список ...' id='task'/>
                </div>
                <button className="clear_tasks_btn" onClick={clearTasks}>Очистить</button>
            </div>
            <div className="current_tasks">
                <ul className='tasks_filters_list'>
                    <li className={currentFilter === 'Текущие дела' ? 'tasks_filter active' : 'tasks_filter'}>
                        <a onClick={() => setFilter('Текущие дела')}>Текущие дела</a>
                    </li>
                    <li className={currentFilter === 'Все дела' ? 'tasks_filter active' : 'tasks_filter'}>
                        <a onClick={() => setFilter('Все дела')}>Все дела</a>
                    </li>
                    <li className={currentFilter === 'Выполненные дела' ? 'tasks_filter active' : 'tasks_filter'}>
                        <a onClick={() => setFilter('Выполненные дела')}>Выполненные дела</a>
                    </li>
                    <li className={currentFilter === 'Корзина' ? 'tasks_filter active' : 'tasks_filter'}>
                        <a onClick={() => setFilter('Корзина')}>Корзина</a>
                    </li>
                </ul>
                <div className="all_tasks_block">
                    {localStorage.getItem('ToDo_tasks') && JSON.parse(localStorage.getItem('ToDo_tasks')).map((elem, index) => {
                        if (currentFilter === 'Текущие дела' && elem.completed === false && elem.deleted === false) {
                            return (
                                <div key={index} className='task_block'>
                                    <div>{elem.task}</div>
                                    <div className="current_task_controls">
                                        <button className="complete_btn" id={elem.id} onClick={setCompleted}></button>
                                        <button className="remove_btn" id={elem.id} onClick={setDeleted}></button>
                                    </div>
                                </div>
                            )
                        }
                        else if (currentFilter === 'Все дела' && elem.deleted === false) {
                            return (
                                <div key={index} className='task_block'>
                                    <div>{elem.task}</div>
                                    <div className="current_task_controls">
                                        {elem.completed === false && <button className="complete_btn" id={elem.id} onClick={setCompleted}></button>}
                                        <button className="remove_btn" id={elem.id} onClick={setDeleted}></button>
                                    </div>
                                </div>
                            )
                        }
                        else if (currentFilter === 'Выполненные дела' && elem.completed === true) {
                            return (
                                <div key={index} className='task_block completed_task'>
                                    <div>{elem.task}</div>
                                    <svg width="25px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                        <g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#17580f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
                                    </svg>
                                </div>
                            )
                        }
                        else if (currentFilter === 'Корзина' && elem.deleted === true) {
                            return (
                                <div key={index} className='task_block deleted'>
                                    <div className='deleted_task'>{elem.task}</div>
                                </div>
                            )
                        }
                    }
                    )}
                </div>
            </div>
        </div>
    )
}