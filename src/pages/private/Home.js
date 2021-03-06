import React, { useState, useLayoutEffect } from "react";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import { Card } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import TypeAcessEnum from "../../enums/type-access";
import TaskService from "../../services/task-service";

export default function Home() {
  let history = useHistory();
  const [taskList, setterTasks] = useState([]);
  const [msg, setMsg] = useState("");


  useLayoutEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const tasks = await (await TaskService.getTask()).docs;
    setterTasks(tasks);
  };

  const deleteTask = async (id) => {
    await TaskService.deleteTask({ id });
    history.go('/home');
  }

  return (
    <>
      <Header type={TypeAcessEnum.PRIVATE} />
      <Banner
        title="Task Management"
        message="A web page for management of tasks"
      />
      <br />
      <section id="three" className="wrapper special">
        <div className="inner align-center">
          <header className="align-center">
            <h2>Pagina das Tarefas</h2>
            <p>Aqui é apresentado todas as tarefas registradas</p>
          </header>
          <div className="flex flex-2">
            {taskList.map((task) => (
              <Card
                style={{ width: "45%", margin: "1% 0 0 0.5%" }}
                className="box"
              >
                <Card.Header style={{ padding: "0 0 0 70%" }}>
                  <Link to={`/tasks/new?id=${task.id}`}>
                    <MdModeEdit size={20} />
                  </Link>
                  <Link>
                    <MdDelete size={20} onClick={() => deleteTask(task.id)}/>
                  </Link>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{task.data().title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Prioridade: {task.data().priority}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Responsável: {task.data().responsible}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Situação: {task.data().status}
                  </Card.Subtitle>
                  <Card.Text style={{ "text-align": "center" }}>
                    Descrição: {task.data().description}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
