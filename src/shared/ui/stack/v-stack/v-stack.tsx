import { Flex, FlexProps } from '@/shared/ui/stack/flex/flex'

type VStackProps = Omit<FlexProps, 'flexDirection'>

export const VStack = (props: VStackProps) => {
  const { alignItems = 'start' } = props

  return <Flex {...props} alignItems={alignItems} flexDirection={'column'} />
}
