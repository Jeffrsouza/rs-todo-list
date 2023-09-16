import styles from './App.module.css'
import { Header } from './components/Header'
import { Body } from './components/Body'

export function App() {

  return (
    <div className={styles.app}>
      <Header />
      <Body />
    </div>
  )
}
