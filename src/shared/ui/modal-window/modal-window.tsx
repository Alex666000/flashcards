import { FC, PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import { Card } from '@/shared/ui/card/card'
import { Icon } from '@/shared/ui/icon/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Typography } from '@/shared/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal-window.module.scss'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
} & PropsWithChildren

export const ModalWindow: FC<Props> = ({ children, open, setOpen, title }) => {
  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.modal_overlay} />
        <div className={s.modal_root}>
          <Dialog.Content className={s.window} forceMount>
            <Card className={s.card}>
              <div className={s.header}>
                <Dialog.Title asChild>
                  <Typography as={'h2'} className={'DialogTitle'} variant={'h2'}>
                    {title}
                  </Typography>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <IconButton
                    aria-label={'Close'}
                    icon={<Icon height={22} name={'cross'} width={22} />}
                  />
                </Dialog.Close>
              </div>
              <div className={s.content}>{children}</div>
            </Card>
            <ToastContainer
              autoClose={5000}
              closeOnClick
              containerId={'modal'}
              draggable
              hideProgressBar={false}
              newestOnTop={false}
              pauseOnFocusLoss
              pauseOnHover
              position={'bottom-left'}
              rtl={false}
              theme={'dark'}
            />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
