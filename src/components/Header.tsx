import styles from './Header.module.css';
import rocket from '../assets/rocket.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <img src={rocket} />
                <span className={styles.textBlue}>to</span>
                <span className={styles.textPurple}>do</span>
            </div>
        </header>
    )
}