import React from 'react'

import { Container, Dropdown } from "react-bootstrap"
import { TASK_STATUS } from '../contexts/TaskContext'


const Filter = ({ status, setStatus }) => {
  return (
    <Container className='d-flex justify-content-between my-3'>
      <div>
        <h5>Filter by status</h5>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {status}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.values(TASK_STATUS)
            ?.filter(stat => stat !== status)
            ?.map(finalStatus => <Dropdown.Item onClick={() => setStatus(finalStatus)}>{finalStatus}</Dropdown.Item>)
          }
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}

export default Filter