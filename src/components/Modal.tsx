import React, { FC } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import ShareIcon from '@mui/icons-material/Share'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

interface ModalProp {
  message: string
  modalOpen: boolean
  handleModalClose: () => void
}

const Modal: FC<ModalProp> = ({ message, modalOpen, handleModalClose }) => {
  const handleClose = (): void => {
    handleModalClose()
  }

  return (
    <div>
      <Dialog
        open={modalOpen}
        fullWidth={true}
        maxWidth={'sm'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">
          {message}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[800],
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogActions>
          <Button variant={'contained'} startIcon={<ShareIcon />} onClick={handleClose}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
