import '../shared/globals.css'
import styles from '../home/home.module.css'

export default function Home() {
  return (
    <main className={styles.main_home}>
      <section className={styles.welcome_msg}>
        <h1>Welcome to <span className="gradient-font">Brickboard</span></h1>
      </section>
    </main>
  )
}
