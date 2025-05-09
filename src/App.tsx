import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import AddIcon from "@mui/icons-material/Add";

type TodoType = {
  task: string;
  done: boolean;
};

function App() {
  const [inputValue, setInputValue] = useState<TodoType>({
    task: "",
    done: false,
  });
  // useState cria um estado reativo chamado inputValue, que começa com { task: "" } (uma string vazia).

  const [taskList, setTaskList] = useState<TodoType[]>([]);

  useEffect(() => {
    const savedTask = localStorage.getItem("taskList");
    if (savedTask) {
      setTaskList(JSON.parse(savedTask));
    }
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue({ task: value, done: false });
    // Sempre que setInputValue({ task: value }) é chamado, o estado é atualizado, e isso faz o React re-renderizar o componente App.
    // No próximo render, o <input> pega o novo valor de inputValue.task e o mostra na tela.
  };

  const handleDeleteTask = (indexToRemove: number) => {
    setTaskList((prevTaskList) => {
      const updatedTasks = prevTaskList.filter(
        (_, index) => index !== indexToRemove
      );
      saveData(updatedTasks);
      return updatedTasks;
    });
  };
  const handleOnEditTask = (index: number, newTask: string) => {
    setTaskList((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[index].task = newTask;
      saveData(updatedTasks);
      return updatedTasks;
    });
  };

  const saveData = (tasks: TodoType[]) => {
    const serializedTaskList = JSON.stringify(tasks);
    localStorage.setItem("taskList", serializedTaskList);
  };

  const handleClearTask = () => {
    const cleared: TodoType[] = [];
    setTaskList(cleared);
    saveData(cleared);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (inputValue.task.trim() == "") {
      alert("Digite uma tarefa para adicioná-la!");
      return;
      // O método .trim() remove espaços extras no começo e no final da string. Isso evita que o usuário insira apenas espaços e consiga adicionar uma "tarefa vazia"
    }

    const newTask: TodoType = {
      task: inputValue.task,
      done: false,
    };

    setTaskList((prev) => {
      const updatedTasks = [...prev, newTask];
      saveData(updatedTasks);
      return updatedTasks;
    });
    setInputValue({ task: "", done: false });
  };

  const handleToggleDone = (indexToToggle: number) => {
    setTaskList((prev) => {
      const updatedTasks = prev.map((task, index) =>
        index === indexToToggle ? { ...task, done: !task.done } : task
      );
      saveData(updatedTasks);
      return updatedTasks;
    });
  };

  return (
    <div className="main_component">
      <h2 className="main_title">Todo App</h2>
      <div className="input_container">
        <input
          type="text"
          value={inputValue.task}
          placeholder="Adicionar tarefa..."
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          // O evento e (abreviação de "event") contém informações sobre o que foi digitado.
          // e.target.value representa o texto que está sendo digitado no campo de entrada.
          // handleInputChange(e.target.value) chama a função e passa esse valor como argumento.
        />
        <button className="add_btn" onClick={addTask}>
          <AddIcon style={{ color: "#white", fontSize: "20px" }} />
        </button>
      </div>
      {taskList.map((task, index) => (
        <Card
          key={index}
          task={task.task}
          done={task.done}
          onToggleDone={() => handleToggleDone(index)}
          onDelete={() => handleDeleteTask(index)}
          onEdit={(newTask) => handleOnEditTask(index, newTask)}
        />
      ))}
      {taskList.length > 0 && (
        // O && no React é o operador lógico "E". Mas no contexto de JSX, ele é usado para renderização condicional de forma elegante (e a condição for verdadeira, o React faz o que foi pedido).
        // Abaixo, é utilizado um fragment (<>, mas também poderia ter sido usado uma div) para que a lógica possa ter mais de um elemento, tendo apenas um parent element.
        // Um Fragment agrupa múltiplos elementos sem adicionar tags extras no DOM.
        <>
          <p className="task_count">
            Você tem {taskList.filter((task) => !task.done).length} tarefas
            pendentes.
          </p>
          <button className="clear_btn" onClick={handleClearTask}>
            Limpar
          </button>
        </>
      )}
    </div>
  );
}

export default App;
