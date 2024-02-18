import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetRandomCardQuery, useRateCardMutation } from '@/features/cards/rtk-api'
import { useGetDeckInfoQuery } from '@/features/decks/api'
import { RateCardForm, RateType } from '@/features/forms/rate-card/rate-card'
import { requestHandler } from '@/shared/lib/utils/request-handler'
import { BackButton } from '@/shared/ui/back-button'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { Typography } from '@/shared/ui/typography'

import s from './learn-card-page.module.scss'

/**
 * LearnCardPage - представляет страницу для изучения карточек: cards
 * useGetRandomCardQuery() - для получения информации о колоде и случайной карточке соответственно
 * При нажатии на кнопку оценки вызывается функция onSubmit, которая отправляет запрос на оценку
 * карточки. Если запрос успешен, режим оценки устанавливается в false, чтобы скрыть ответ
 * и вернуться к вопросу
 */
const LearnCardPage = () => {
  // для управления режимом оценки карточки. Когда пользователь нажимает кнопку "Show Answer",
  // устанавливается режим оценки (rateMode), который показывает ответ на карточку
  const [rateMode, setRateMode] = useState(false)

  const [rateCard] = useRateCardMutation()

  // для получения параметров из URL - получаем id из урла
  const params = useParams()
  const id = params.id as string
  const { currentData: deckData } = useGetDeckInfoQuery({ id })
  const { currentData: cardData } = useGetRandomCardQuery({ id })

  const onSubmit = async (data: RateType) => {
    await requestHandler(async () => {
      await rateCard({ cardId: cardData!.id, grade: +data.grade, packId: id }).unwrap()
      setRateMode(false)
    })
  }

  return (
    <section className={s.learnCardBlock}>
      <Container>
        <BackButton />
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
