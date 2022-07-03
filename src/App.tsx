import React from "react";
import Art from "./components/Art/Art";
import GradientBar from "./components/GradientBar/GradientBar";
import styles from "./App.module.css";
import Contacts from "./components/Contacts/Contacts";

function App() {
  return (
    <div className={styles.app}>
      <header>
        <h1>Cellular Automata</h1>
      </header>

      <main>
        <section className={styles.gradient}>
          <div className={styles.colorChange}>
            <p>
              Изменить цвет можно нажав:{" "}
              <span className={styles.exampleColor}></span>
            </p>
          </div>

          <GradientBar />

          <div className={styles.positionChange}>
            <p>
              Для перемещения цвета:{" "}
              <span className={styles.examplePosition}></span>
            </p>
          </div>
        </section>

        <section className={styles.animation}>
          <Art />
        </section>
      </main>

      <footer>
        <Contacts />
        <span className={styles.source}>
          source by <br />
          <a href="https://github.com/knyazev13ivan/cellular-automata-rule30">
            Github
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
