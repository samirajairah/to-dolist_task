import { Task } from "../Task";
import styles from "./tasks.module.css";

export function Tasks({ tasks, onDelete, onComplete, onEdit }) {
  return (
    <section className={styles.tasks}>
      <header className={styles.header}></header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  );
}
