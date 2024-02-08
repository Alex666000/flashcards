import { Flex, FlexProps } from '@/shared/ui/stack/flex/Flex'

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props

  return <Flex {...props} align={align} direction={'column'} />
}
