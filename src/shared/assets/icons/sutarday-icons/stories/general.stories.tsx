import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon, SearchIcon } from '@/shared/assets'
import { AddMediaIcon } from '@/shared/assets/icons/sutarday-icons/AddMediaIcon'
import { ArrowDownIcon } from '@/shared/assets/icons/sutarday-icons/ArrowDown'
import { ArrowLeft } from '@/shared/assets/icons/sutarday-icons/ArrowLeft'
import { Check } from '@/shared/assets/icons/sutarday-icons/Check'
import { ClosedInputIcon } from '@/shared/assets/icons/sutarday-icons/CloseInputIcon'
import { CloseModal } from '@/shared/assets/icons/sutarday-icons/CloseModal'
import { Edit } from '@/shared/assets/icons/sutarday-icons/Edit'
import { Eye } from '@/shared/assets/icons/sutarday-icons/Eye'
import { EyeClosed } from '@/shared/assets/icons/sutarday-icons/EyeClosed'
import { LogOutIcon } from '@/shared/assets/icons/sutarday-icons/LogOutIcon'
import { MailIcon } from '@/shared/assets/icons/sutarday-icons/MailIcom'
import { More } from '@/shared/assets/icons/sutarday-icons/More'
import { Person } from '@/shared/assets/icons/sutarday-icons/Person'
import StarEmpty from '@/shared/assets/icons/sutarday-icons/StarEmpty'
import StarFilled from '@/shared/assets/icons/sutarday-icons/StarFilled'
import { Trash } from '@/shared/assets/icons/sutarday-icons/Trash'

const meta = {
  component: ArrowLeft,
  tags: ['autodocs'],
  title: 'Icons/General',
}

export default meta
export const AllIcons = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ArrowDownIcon size={16} />
        <ArrowLeft />
        <Check />
        <ClosedInputIcon />
        <CloseModal />
        <Edit />
        <Eye />
        <EyeClosed />
        <KeyboardArrowLeftIcon />
        <KeyboardArrowRightIcon />
        <LogOutIcon />
        <MailIcon />
        <More />
        <Person />
        <SearchIcon />
        <StarEmpty />
        <StarFilled />
        <Trash />
        <AddMediaIcon />
      </div>
    )
  },
}
