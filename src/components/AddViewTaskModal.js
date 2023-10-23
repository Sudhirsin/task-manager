import { useRef } from "react"

import { Form, Modal, Button } from "react-bootstrap"

import { useTasks, TASK_STATUS } from "../contexts/TaskContext"

export default function AddViewTaskModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const descriptionRef = useRef()
  const titleRef = useRef()
  const statusRef = useRef()
  const { addTask } = useTasks()

  async function handleSubmit(e) {
    e.preventDefault()
    addTask({
      description: descriptionRef.current.value,
      title: titleRef.current.value,
      status: statusRef.current.value,
    })

    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={titleRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Status</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={statusRef}>
              {Object.keys(TASK_STATUS)?.map(status => <option id={TASK_STATUS[status]} value={TASK_STATUS[status]}>{TASK_STATUS[status]}</option>)}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
