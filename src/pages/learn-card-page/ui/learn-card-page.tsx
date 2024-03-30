import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetRandomCardQuery, useRateCardMutation } from '@/features/cards/api/cards.api'
import { RateCardForm, RateType } from '@/features/forms'
import { handleRequestOnServer } from '@/shared/lib'
import { BackButton } from '@/shared/ui/back-button'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { Typography } from '@/shared/ui/typography'

import s from './learn-card-page.module.scss'

import { useGetDeckQuery } from '../../../features/decks/api'

const LearnCardPage = () => {
  const [rateMode, setRateMode] = useState(false)

  const [rateCard] = useRateCardMutation()

  const params = useParams()
  const id = params.id as string
  const { currentData: deckData } = useGetDeckQuery({ id })
  const { currentData: cardData } = useGetRandomCardQuery({ id })

  const onSubmit = async (data: RateType) => {
    await handleRequestOnServer(async () => {
      await rateCard({ cardId: cardData!.id, grade: +data.grade, packId: id }).unwrap()
      setRateMode(false)
    })
  }

  return (
    <section className={s.learnCardBlock}>
      <Container>
        <BackButton className={s.link} />
        <div>
          <Card className={s.content}>
            <Typography as={'h1'} className={s.title} variant={'large'}>
              Learn {deckData?.name}
            </Typography>
            <div className={s.question}>
              <Typography variant={'body1'}>
                <b>Question:</b> {cardData?.question}
              </Typography>
              <Typography className={s.caption} variant={'body2'}>
                Count of attempts: {cardData?.shots}
              </Typography>
              {cardData?.questionImg && (
                <img alt={'Question Image'} className={s.cover} src={cardData.questionImg} />
              )}
            </div>

            {rateMode ? (
              <>
                <div className={s.answer}>
                  <Typography className={s.answerText} variant={'body1'}>
                    <b>Answer:</b> {cardData?.answer}
                  </Typography>
                  {cardData?.answerImg && (
                    <img alt={'Question Image'} className={s.cover} src={cardData.answerImg} />
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
        </div>
      </Container>
    </section>
  )
}

export default memo(LearnCardPage)
