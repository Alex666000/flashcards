import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetRandomCardQuery, useRateCardMutation } from '@/features/cards/rtk-api'
import { useGetDeckInfoQuery } from '@/features/decks/api'
import { RateCardForm, RateType } from '@/features/forms/rate-card/rate-card'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { BackButton } from '@/shared/ui/back-button'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import s from './learn-card-page.module.scss'

const LearnCardPage = () => {
  const [rateMode, setRateMode] = useState(false)

  const [rateCard] = useRateCardMutation()

  const params = useParams()
  const id = params.id as string
  const { currentData: pack } = useGetDeckInfoQuery({ id })
  const { currentData: card } = useGetRandomCardQuery({ id })

  const onSubmit = async (data: RateType) => {
    await requestHandler(async () => {
      await rateCard({ cardId: card!.id, grade: +data.grade, packId: id }).unwrap()
      setRateMode(false)
    })
  }

  return (
    <>
      <BackButton />
      <section className={s.root}>
        <Card className={s.content}>
          <Typography as={'h1'} className={s.title} variant={'large'}>
            Learn {pack?.name}
          </Typography>
          <div className={s.question}>
            <Typography variant={'body1'}>
              <b>Question:</b> {card?.question}
            </Typography>
            <Typography className={s.caption} variant={'body2'}>
              Count of attempts: {card?.shots}
            </Typography>
            {card?.questionImg && (
              <img alt={'Question Image'} className={s.cover} src={card.questionImg} />
            )}
          </div>

          {rateMode ? (
            <>
              <div className={s.answer}>
                <Typography className={s.answerText} variant={'body1'}>
                  <b>Answer:</b> {card?.answer}
                </Typography>
                {card?.answerImg && (
                  <img alt={'Question Image'} className={s.cover} src={card.answerImg} />
                )}
              </div>
              <Typography className={s.rate} variant={'body1'}>
                <b>Rate yourself:</b>
              </Typography>
              <RateCardForm onSubmit={onSubmit} />
            </>
          ) : (
            <Button fullWidth onClick={() => setRateMode(true)}>
              Show Answer
            </Button>
          )}
        </Card>
      </section>
    </>
  )
}

export default memo(LearnCardPage)
