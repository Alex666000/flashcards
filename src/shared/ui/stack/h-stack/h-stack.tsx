import { Flex, FlexProps } from '@/shared/ui/stack/flex/Flex'

type HStackProps = Omit<FlexProps, 'flexDirection'>

export const HStack = (props: HStackProps) => {
  return <Flex flexDirection={'row'} {...props} />
}
