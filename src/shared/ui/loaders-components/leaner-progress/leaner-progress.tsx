import s from './leaner-progress.module.scss'

export const LeanerProgress = () => {
  return (
    <div className={s.linearActivity}>
      <div className={s.indeterminate}></div>
    </div>
  )
}
