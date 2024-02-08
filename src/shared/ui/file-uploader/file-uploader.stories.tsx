import { Button } from '@/shared/ui/button'
import { FileUploader } from '@/shared/ui/file-uploader/file-uploader'
import { Icon } from '@/shared/ui/icon/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Meta } from '@storybook/react'

const meta = {
  component: FileUploader,
  tags: ['autodocs'],
  title: 'Components/FileUploader',
} satisfies Meta<typeof FileUploader>

export default meta

export const DefaultModeButton = {
  render: () => {
    return <FileUploader name={'file'} onChange={() => {}} />
  },
}

export const FullWidthButton = {
  render: () => {
    return (
      <FileUploader as={Button} fullWidth name={'file'} onChange={() => {}}>
        Choose File
      </FileUploader>
    )
  },
}

export const IconButtonUploader = {
  render: () => {
    return (
      <FileUploader
        as={IconButton}
        icon={<Icon height={20} name={'more'} width={20} />}
        name={'file'}
        onChange={() => {}}
      />
    )
  },
}
