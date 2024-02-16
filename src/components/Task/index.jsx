import { useState } from "react";
import styles from "./task.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import Swal from "sweetalert2";

export function Task({ task, onDelete, onComplete, onEdit }) {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSaveEdit() {
    onEdit(task.id, editedTitle);
    setIsEditing(false);
  }

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString("en-US");
    const time = dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <button
          className={styles.checkContainer}
          onClick={() => onComplete(task.id)}
        >
          {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
        </button>

        {isEditing && (
          <div
            className={styles.editOverlay}
            onClick={() => setIsEditing(false)}
          >
            <div
              className={styles.editModal}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className={styles.editInput}
              />
              <div className={styles.editButtons}>
                <button className={styles.saveButton} onClick={handleSaveEdit}>
                  Save
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.taskContent}>
          <div>
            <p className={task.isCompleted ? styles.textCompleted : ""}>
              {task.title}
            </p>
            <p className={styles.creationDate}>
              Created at: {formatDateTime(task.createdAt)}
            </p>
          </div>

          <div className={styles.buttonsContainer}>
            <button className={styles.editButton} onClick={handleEdit}>
              <FaRegEdit size={23} />
            </button>

            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(task.id)}
            >
              <TbTrash size={23} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
