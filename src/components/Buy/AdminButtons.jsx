import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminButtons = ({ setOperation, setShowDialogue, selectedOption, bulkData }) => {

  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-end gap-5 flex-1 '>
      <Button
        variant="contained"
        size="large"
        sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
        onClick={() => {
          setOperation('Publish')
          setShowDialogue(true)
        }}
        disabled={(bulkData.length > 0 && selectedOption === 'UnPublished') ? false : true}
      >
        Publish
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
        onClick={() => {
          setOperation('Unpublish')
          setShowDialogue(true)
        }}
        disabled={(bulkData.length > 0 && selectedOption === 'Published') ? false : true}
      >
        Unpulish
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
        onClick={() => {
          setOperation('Delete');
          setShowDialogue(true)
        }}
        disabled={bulkData.length > 0 ? false : true}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{ bgcolor: "#716EDC", maxWidth: 'max-content', "&:hover": { bgcolor: "#716EDC" } }}
        onClick={() => {
          navigate('/admin/property')
        }}

      >
        Add
      </Button>
    </div>
  )
}

export default AdminButtons