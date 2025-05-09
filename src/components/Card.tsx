import "./Card.css";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

type CardProps = {
  task: string;
  done: boolean;
  onDelete: () => void;
  onEdit: (newTask: string) => void;
  onToggleDone: () => void;
};

function Card({ task, done, onDelete, onEdit, onToggleDone }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task);

  const handleSaveEdit = () => {
    onEdit(taskName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  return (
    <div className="card">
      <div className="card_content">
        <Checkbox
          checked={done}
          onChange={onToggleDone}
          sx={{
            color: "#888",
            "&.Mui-checked": {
              color: "#7a5de5",
            },
          }}
        />

        {isEditing ? (
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyPress}
            autoFocus
            className="card_input"
          />
        ) : (
          <p className={`card_title ${done ? "done" : ""}`}>{task}</p>
        )}
      </div>

      <div className="card_buttons">
        <button className="edit_btn" onClick={() => setIsEditing(true)}>
          <EditIcon style={{ color: "white", fontSize: "20px" }} />
        </button>
        <button className="delete_btn" onClick={onDelete}>
          <DeleteIcon style={{ color: "white", fontSize: "20px" }} />
        </button>
      </div>
    </div>
  );
}
export default Card;
