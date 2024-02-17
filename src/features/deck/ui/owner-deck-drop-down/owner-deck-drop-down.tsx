import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/lib/constants/route-path'
import { DropDown, DropDownItemWithIcon } from '@/shared/ui/drop-down_'
import { Icon } from '@/shared/ui/icon'

type Props = {
  onDeleteHandler: () => void
  onEditHandler: (value: boolean) => void
}

export const OwnerDeckDropDown: FC<Props> = ({ onDeleteHandler, onEditHandler }) => {
  const navigate = useNavigate()

  return (
    <DropDown>
      <DropDownItemWithIcon
        icon={<Icon name={'play'} />}
        onSelect={() => navigate(`.${ROUTES.learn}`)}
        text={'Learn'}
      />
      <DropDownItemWithIcon
        icon={<Icon name={'edit'} />}
        onSelect={() => onEditHandler(true)}
        text={'Edit'}
      />
      <DropDownItemWithIcon
        icon={<Icon name={'delete'} />}
        onSelect={onDeleteHandler}
        text={'Delete'}
      />
    </DropDown>
  )
}
