import { Flex, FlexProps } from '@/shared/ui/stack/flex/flex'

type HStackProps = Omit<FlexProps, 'flexDirection'>

export const HStack = (props: HStackProps) => {
  return <Flex flexDirection={'row'} {...props} />
}
