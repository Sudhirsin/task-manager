import { Button, Card, Stack } from "react-bootstrap"
import TaksItem from "./TaksItem"
import TaskTitle from "./TaskTitle"

import { useTasks } from "../contexts/TaskContext"


function TaskCard({
  id,
  title,
  description,
  status,
}) {

  const { deleteTask } = useTasks();

  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3 pb-3 border-bottom">
          <TaskTitle />
        </Card.Title>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <TaksItem
            title={title}
            description={description}
            status={status}
            id={id}
          />
        </Card.Title>

        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button className="ms-auto" onClick={() => deleteTask(id)} variant="outline-secondary">
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default TaskCard
