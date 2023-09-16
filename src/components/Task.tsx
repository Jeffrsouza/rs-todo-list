import styles from './Task.module.css';
import { Circle, CheckCircle, Trash } from 'phosphor-react';

export interface ITask {
    id: number;
    content: string;
    status?: boolean;
}

interface ITaskProps {
    task: ITask,
    checkTask: (task: ITask, status: boolean) => void,
    deleteTask: (task: ITask) => void
}

export function Task({ task, checkTask,deleteTask}: ITaskProps) {
    return (
        <div className={styles.content}>
            <div className={styles.check}>
                {
                    task.status
                        ? <CheckCircle className={styles.checked} weight="fill" onClick={() => checkTask(task, false)} />
                        : <Circle className={styles.unchecked} onClick={() => checkTask(task, true)} />
                }
            </div>
            <div className={task.status ?  styles.displayChecked : styles.display}>
                <span>{task.content}</span>
            </div>
            <div>
                <Trash className={styles.remove} onClick={() => deleteTask(task)} />
            </div>
        </div>
    )
}