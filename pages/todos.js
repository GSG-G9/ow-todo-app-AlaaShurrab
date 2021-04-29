import { useState, useEffect } from "react";
import TodoTable from "../components/TodoTable";

import styles from "../styles/Todos.module.css";

const todos = () => {
  const [toDos, setToDos] = useState([
    { key: 1, completed: true, content: "hihio " },
  ]);
  const [counter, setCount] = useState();
  const [darkMood, setDarkMood] = useState(false);
  const [display, setDisplay] = useState(toDos);
  const [newTodo, setNewTodo] = useState([]);
  // const [todos, setTodos] = useState([]);
  const [active, setActive] = useState({
    all: true,
    active: false,
    completed: false,
  });

  useEffect(() => {
    //   setTodos(window.localStorage.setItem("names", JSON.stringify(names)));
    setToDos(
      JSON.parse(window.localStorage.getItem("toDos")) || [
        { key: 1, completed: true, content: "hihio " },
      ]
    );
    setDarkMood(window.localStorage.getItem("darkMood") || false);
    setDisplay(window.localStorage.getItem("idCounter") || 0);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  useEffect(() => {
    window.localStorage.setItem("darkMood", JSON.stringify(darkMood));
  }, [darkMood]);
  useEffect(() => {
    window.localStorage.setItem("idCounter", JSON.stringify(counter));
  }, [counter]);

  const clearCompleted = () => {
    setToDos(toDos.filter((item) => !item.completed));
  };

  const reset = () => {
    setToDos([]);
  };

  const displayAll = () => {
    setDisplay(toDos);
  };

  const displayActive = () => {
    setDisplay(toDos.filter((item) => !item.completed));
  };

  const displayCompleted = () => {
    setDisplay(toDos.filter((item) => item.completed));
  };
  //   const displayAll = () => {
  //     setDisplay(todos);
  //   };
  const removeToDo = (e) => {
    const id = e.target.parentNode.id;
    setToDos(toDos.filter(({ key }) => key !== id));
  };

  const addToDo = (e) => {
    if (e.key === "Enter") {
      if (!newTodo) {
        return;
      }
      setToDos([
        { key: counter, completed: false, content: newTodo },
        ...toDos,
      ]);
      console.log({ toDos });
      setNewTodo("");
      setCount(parseInt(counter, 10) + 1);
    }
  };
  // {key ,completed , content}
  const checkToDo = (e) => {
    const id = e.target.parentNode.id;
    setTodos(
      toDos.map((todo) =>
        todo.key === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  return (
    <div className={styles.App}>
      <div
        className={`${styles["page-display"]} ${styles["back-img"]} ${styles["back-img-dark"]}`}
      >
        <div className={styles.container}>
          <div className={styles.title}>
            <h1 className={styles.title}>T O D O</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
              <path
                fill="#FFF"
                fill-rule="evenodd"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
              ></path>
            </svg>
          </div>
          <div className={styles["input-container"]}>
            <input
              type="text"
              placeholder="write what todo"
              autocomplete="off"
              className={`${styles["text-field"]} ${styles["text-field"]}`}
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={addToDo}
            />
          </div>
          <div
            class={`${styles["table-container"]} ${styles["table-container-dark"]}`}
          >
            {toDos.length !== 0 && (
              <TodoTable
                todos={toDos}
                setTodos={setToDos}
                checkTodo={checkToDo}
              />
            )}
          </div>
          <div className={styles["btn-group"]}>
            <div className={styles["display-btn-group"]}>
              <a className={styles.active}>All</a>
              <a>Active</a>
              <a>Completed</a>
            </div>
            <div className={styles.filters}>
              <a>Clear Completed</a>
              <a>Reset</a>
            </div>
          </div>
        </div>
        <p className={styles.footer}>Drag and Drop to reorder List</p>
      </div>
    </div>
  );
};

export default todos;
