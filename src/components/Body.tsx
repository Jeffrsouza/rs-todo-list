import styles from './Body.module.css';
import clipboard from '../assets/clipboard.png';
import { useState } from 'react';
import { Task, ITask } from './Task';
import { PlusCircle } from 'phosphor-react';

export function Body() {

    const [description, setDescription] = useState<string>('');

    const [tasks, setTasks] = useState<ITask[]>([]);

    function handleDescription(event: React.ChangeEvent<HTMLInputElement>): void {
        const newDescription = event.target.value;
        setDescription(newDescription);
    }

    function handleCreate(): void {
        const nextId = tasks.length > 0 
            ? Math.max(...tasks.map(task => task.id)) + 1 
            : 1;

        const newTask: ITask = {
            id: nextId,
            content: description
        };

        setTasks(prevState => [...prevState, newTask]);
        setDescription('');
    }

    function handleCheckTask(changedTask: ITask, status: boolean): void {
        const filteredTasks = tasks.filter(task => task.id !== changedTask.id);

        const currentTasks = [...filteredTasks, { ...changedTask, status }];

        setTasks(currentTasks.sort((a, b) => a.id > b.id ? 1 : -1));
    }

    function handleDeleteTask(deletedTask: ITask): void {
        const filteredTasks = tasks.filter(task => task.id !== deletedTask.id);
        setTasks(filteredTasks);
    }

    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.search}>
                    <input placeholder='Adicionar uma nova tarefa' value={description} onChange={handleDescription} />
                    <button onClick={handleCreate}>
                        Criar
                        <PlusCircle size={16} />
                    </button>
                </div>

                <div className={styles.status}>
                    <span className={`${styles.text} ${styles.textBlue}`}>
                        Tarefas criadas
                        <span className={`${styles.text} ${styles.badger}`}>
                            {tasks.length}
                        </span>
                    </span>
                    <span className={`${styles.text} ${styles.textPurple}`}>
                        Concluídas
                        <span className={`${styles.text} ${styles.badger}`}>
                            {tasks.filter(task => task.status).length} de {tasks.length}
                        </span>
                    </span>
                </div>
                {tasks.length ?
                    <div className={styles.existsTasks}>
                        {tasks.map(task => <Task key={task.id}
                            task={task}
                            checkTask={handleCheckTask}
                            deleteTask={handleDeleteTask}
                        />)}
                    </div>
                    :
                    <div className={styles.emptyTasks}>
                        <img src={clipboard} />
                        <span className={styles.emptyText}>
                            <b>Você ainda não tem tarefas cadastradas</b>
                            <br />
                            Crie tarefas e organize seus itens a fazer
                        </span>
                    </div>
                }
            </div>
        </div>
    );
}