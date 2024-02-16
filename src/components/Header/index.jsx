import styles from "./header.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { IoAdd } from "react-icons/io5";

export function Header({
  handleAddTask,
  handleClearAll,
  handleDoneAll,
  handleSelectAll,
}) {
  const [title, setTitle] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // Check if title is empty before adding task
    if (title.trim() === "") {
      // Show warning using SweetAlert
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter a task before adding!",
      });
      return; // Exit function if title is empty
    }
    handleAddTask(title);
    setTitle("");
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function confirmClearAll() {
    Swal.fire({
      title: "Are you sure?",
      text: "Once cleared, you will not be able to recover the tasks!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all tasks!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClearAll();
        Swal.fire("Cleared!", "All tasks have been cleared.", "success");
      }
    });
  }

  function toggleSelectAll() {
    setSelectAll(!selectAll);
    handleSelectAll(!selectAll);
  }

  return (
    <header className={styles.header}>
      <h1>To-Do List</h1>

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder="Add a new task"
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
        <button className={styles.addButton}>
          Add
          <IoAdd size={20} />
        </button>
      </form>

      <div className={styles.buttonContainer}>
        <button className={styles.clearButton} onClick={confirmClearAll}>
          Clear All
        </button>
        <button className={styles.doneButton} onClick={handleDoneAll}>
          Done All
        </button>
        <button className={styles.selectAllButton} onClick={toggleSelectAll}>
          {selectAll ? "Deselect All" : "Select All"}
        </button>
      </div>
    </header>
  );
}
