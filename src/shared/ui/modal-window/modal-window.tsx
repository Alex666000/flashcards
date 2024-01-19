import { FC, PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import { Card } from '@/shared/ui/card/card'
import { Icon } from '@/shared/ui/icon/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Typography } from '@/shared/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal-window.module.scss'

type Props = {
    open: boolean //  Флаг, указывающий, открыто ли модальное окно
    setOpen: (value: boolean) => void // Функция для изменения значения флага открытия модального окна
    title: string // Заголовок модального окна
} & PropsWithChildren // Дополнительный тип, который позволяет компоненту принимать и отображать дочерние элементы (children).

/**
 * Dialog.Table: Основной контейнер для управления состоянием модального окна.
 * Dialog.Portal: Портал для размещения дочерних компонентов за пределами текущей иерархии DOM.
 * Dialog.Overlay: Подложка, затемняющая фон при открытом модальном окне.
 * Dialog.Content: Контент модального окна.
 * Card: компонент карточки, который служит контейнером для стилизации модального окна.
 * Dialog.Title: Заголовок модального окна.
 * Typography: компонент текста, отображающий заголовок.
 * Dialog.Close: Кнопка закрытия модального окна.
 * IconButton: компонент кнопки с иконкой для закрытия.
 * ToastContainer: Контейнер для отображения уведомлений
 */
export const ModalWindow: FC<Props> = ({ children, open, setOpen, title }) => {
    return (
        <Dialog.Root onOpenChange={setOpen} open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className={s.overlay} />
                <div className={s.root}>
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
                            // @ts-ignore
                            enableMultiContainer
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
