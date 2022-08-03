import React, { FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import ShareIcon from '@mui/icons-material/Share'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { NotiType } from '../lib/type'

interface ModalProp {
  data: NotiType
  handleModalClose: () => void
}

const Modal: FC<ModalProp> = ({ data, handleModalClose }) => {
  const { message, isOpen } = data
  const [open, setOpen] = useState(isOpen)

  const handleClose = (): void => {
    setOpen(false)
    handleModalClose()
  }

  const handleShare = (): void => {
    // TODO 복사 기능
  }

  return (
    <div>
      <Dialog
        open={open}
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
          <Button variant={'contained'} startIcon={<ShareIcon />} onClick={handleShare}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
