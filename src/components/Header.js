import React from 'react'

import { getAuth, signOut } from 'firebase/auth';
import { Button, Stack, Dropdown } from "react-bootstrap"

const Header = ({ openAddTaskModal, user }) => {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Task Manager</h1>
      <Button variant="outline-primary" onClick={openAddTaskModal}>
        Add Task
      </Button>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {user?.displayName}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  )
}

export default Header