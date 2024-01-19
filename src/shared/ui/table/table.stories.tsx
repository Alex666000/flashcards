import type { Meta, StoryObj } from '@storybook/react'

import { CSSProperties } from 'react'

import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

import { Table } from './'

const meta = {
    component: Table.Root,
    tags: ['autodocs'],
    title: 'Components/Table',
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: (
            <>
                <Table.Head>
                    <Table.Row>
                        <Table.HeadCell>№</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Link</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell />
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut sed do eiusmod tempoei usmodr sit amet, consectetur
                            adipiscing elit, sed do...
                        </Table.Cell>
                        <Table.Cell>
                            <Typography
                                as={'a'}
                                href={'https://react.dev/'}
                                target={'_blank'}
                                variant={'link1'}
                            >
                                Docs
                            </Typography>
                        </Table.Cell>
                        <Table.Cell>Frontend</Table.Cell>
                        <Table.Cell>29.08.2023</Table.Cell>
                        <Table.Cell> 🚀</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut sed do eiusmod tempoei usmodr sit amet, consectetur
                            adipiscing elit, sed do...
                        </Table.Cell>
                        <Table.Cell>
                            <Typography
                                as={'a'}
                                href={'https://react.dev/'}
                                target={'_blank'}
                                variant={'link1'}
                            >
                                Docs
                            </Typography>
                        </Table.Cell>
                        <Table.Cell>Frontend</Table.Cell>
                        <Table.Cell>29.08.2023</Table.Cell>
                        <Table.Cell>👨🏼‍💻</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </>
        ),
    },
}

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'

const data = [
    {
        date: '30.08.2023',
        description: description,
        id: '01',
        link: {
            path: 'https://react.dev/',
            title: 'React Docs',
        },
        number: 1,
        type: 'Frontend',
    },
    {
        date: '30.08.2023',
        description: description,
        id: '02',
        link: {
            path: 'https://nodejs.org/en/docs',
            title: 'NodeJS Docs',
        },
        number: 2,
        type: 'Backend',
    },
    {
        date: '30.08.2023',
        description: description,
        id: '03',
        link: {
            path: 'https://git-scm.com/doc',
            title: 'Git Docs',
        },
        number: 3,
        type: 'Devops',
    },
]

export const MappedTable: Story = {
    args: {
        children: (
            <>
                <Table.Head>
                    <Table.HeadCell>№</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Link</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {data.map((el) => (
                        <Table.Row key={el.id}>
                            <Table.Cell>{el.number}</Table.Cell>
                            <Table.Cell>{el.description}</Table.Cell>
                            <Table.Cell>
                                <Typography
                                    as={'a'}
                                    href={el.link.path}
                                    target={'_blank'}
                                    variant={'link1'}
                                >
                                    {el.link.title}
                                </Typography>
                            </Table.Cell>
                            <Table.Cell>{el.type}</Table.Cell>
                            <Table.Cell>{el.date}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </>
        ),
    },
}

export const Empty = {
    render: () => {
        const styles: CSSProperties = {
            color: 'var(--color-dark-100)',
            marginBottom: '15px',
        }

        return (
            <Table.Empty>
                <Typography style={styles} variant={'body1'}>
                    This pack is empty. Click add new card to fill this pack
                </Typography>
                <Button>Add New Card</Button>
            </Table.Empty>
        )
    },
}
