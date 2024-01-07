import { ComponentPropsWithoutRef, ElementRef, JSX, forwardRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { nanoid } from '@reduxjs/toolkit'

import s from './tabs.module.scss'

type TabInfo = {
    title: string
    /**
     * Должен быть уникальным
     */
    value: string
}

type TabsProps = {
    tabs: TabInfo[]
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const Tabs = forwardRef<ElementRef<typeof Tabs.Root>, TabsProps>(
    ({ tabs, ...restProps }, ref): JSX.Element => {
        const tabsWithValue = tabs.map((t: any) => ({ ...t, value: nanoid() }))

        return (
            <Tabs.Root className={s.root} defaultValue={tabsWithValue} ref={ref} {...restProps}>
                <Tabs.List aria-label={'tabs-switcher'} className={s.list}>
                    {tabsWithValue.map((tab: any, index: number) => {
                        return (
                            <Tabs.Trigger className={s.TabsTrigger} key={index} value={tab.value}>
                                {tab.title}
                            </Tabs.Trigger>
                        )
                    })}
                </Tabs.List>
            </Tabs.Root>
        )
    }
)
