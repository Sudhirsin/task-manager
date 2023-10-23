import React from 'react'

import { Dropdown } from "react-bootstrap"
import { TASK_STATUS, useTasks } from '../contexts/TaskContext'


const TaksItem = ({ id, title, description, status }) => {
  const { editTask } = useTasks();

  return (
    <>
      <div className="me-2">{title}</div>
      <div className="me-2">{description}</div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {status}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.values(TASK_STATUS)
            ?.filter(stat => stat !== status)
            ?.map(finalStatus => <Dropdown.Item onClick={() => editTask({ id, status: finalStatus })}>{finalStatus}</Dropdown.Item>)
          }
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default TaksItem