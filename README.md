# Удалить пакет: pnpm remove @ayub-begimkulov/i18n

                                          # Правила вертски html:
# Сначала свеху идет название блока - потом - контеинер приложения Арр - остальные стили файла
гл.блок размеры + заливка + границы -- cм.пример header.module.scss
# Сложение обычных классов стилей:
return <Component className={`${s[variant]} ${s[color]} ${className ?? ''}`} {...rest} />
# Слова - наименования, часто используемые в CSS-классах: https://github.com/yoksel/common-words
# Блочным элементам задаем ширину резиновую И ТОЛЬКО БЛОЧНЫМ ЭЛЕМЕНТАМ МОЖНО ЗАДАВАТЬ РАЗМЕРЫ:
width: 100% + если есть ширина, то и max-width: 500рх к примеру;
# Как искать к чему относится "неровный элемент" в браузере:
отрываем инспектор элем. и ищем блок или компоненту где неровность есть, смотрим его класс и ищем этот
класс в блоке или компоненте в проекте в соответствии с тем что проинспектировали 
# Света конспект:_ Блочные элементы_занимают всю ширину родителя, а высоту занимает столько сколько у него контента, высота меняется по 
контенту если к примеру скукожим экран...
2.50 если задать просто width то это будет хардкод, мы строго задали ширину, если уменьшим экран тогда появится скролл, стандартное поведение
браузера если не помещается контент 3.30 харкод высоты height тоже появится скролл при уменьшении экрана по высоте. Ад верстальщика когда появляется
горизонтальный скролл, значит по ширине наши элементы не влезают в своих родителей, горизонтального скролла не должно быть ни в каких случаях.
5.30 хардкодить высоту нельзя, тогда текст полезет на другой блок, тк в наш блок контент не помещается. Высоту хардкодить можно где высота не будет
зависеть от контента, например одно слово Отправить в button, а не много слов, тут даже надо хардкодить высоту... В кнопках, карточках... А в дивках,
в блоках, высота не задается жлементам , как правило в верстке высота не задаётся элементам.7.00 делаем высоту и ширину не хардкодом? min-height _ 
пишем вместо высоты_ мин выоста и если контента будет больше высота подстроиться под контент, только тогда когда его много, больше чем на 200рх 
по высоте. 9.10 max-width, width: 100% _ с помощью этого даже решаем проблему адаптивности,
# Отвечает за синий кружок когда нажали и ушли на аватарку &:focus-visible { 
    outline: 2px solid var(--color-info-700);
}
# эти 3 своиства делают резиновой размеры при сжатии экрана
width: 100%;
max-width: 130px;
min-height: 46px;
# сначала пишется у главного начального класса transition: 0.3s; - потом при ховере к примеру: как будет изменяться тень
filter: drop-shadow(0 0 6px var(--color-accent-100));
# один элемент никогда не оборачиваем в div-ку
# div-ки -- стилизуют несколько элементов чтобы их стилизовать флексами от родителя.'

                                            # React
# Нейминг: - 2.08.00 — неиминг название функций обработчиков например: onInputChange или когда колбек то onTodolist Added
- если метод вызывается на event-e то on_target_onClick: if => onEvent => name on_target_Event: например: onBookCardClick (т.е нажали по
- карточкам книг...указываем по чём кликнули). Еще пример onKey_target_Down
- когда метод передаем пропсами из родителя в дочку всегда начинается с handle а заканчивается событием к примеру в дочке вызываем этот 
  колбек на событие onBlur - значит в родителе называем "обработать установку книг", в родителе в названии пропса удаляем handle и итог 
  такой: onSetBookBlur={handleSetBookBlur}. Методы которые создаются не на события называют стандартно с глагола6 createDeck() например..
#                       FLOW авторизации: 34 (Ульби) + в папке см конспекты - TODO - todo16v4 (про логику me() запроса, логин, лагаут ..)
в features делаем запрос на сервер и полученные авторизационные данные отрисуем в ui папке форму LoginForm. Теперь есть сущность user 
которая отвечает авторизован ли Юзер или нет? И внутри себя она хранит данные об этом пользователе - для формы авторизации 
сделали отдельную фичу которая изолирует внутри себя данные формы LoginForm ошибки индикацию загрузки 
идем внутри фичи AuthByUserName использовали сущность пользователя - это ниже лежащии слой
делаем me() запрос где определяем авторизован пользователь после обновления страницы или нет? Данные авторизации достаем и проверяем
авторизован ли он или нет? initAuthData - и если юзер авторизован показываем авторизованные страницы если нет редиректим на login

# конспекты - TODO - todo16v3 - про FLOW статуса показ ошибка работа с формой формик

#                       Lazy ленивая подгрузка (52 видео  13.30)
Страницы всегда подгружаем лениво + компоненты которые можем подгрузить отложенно: LoginForm  и т.д. + редюсеры + библиотеки 
+ Заинжектили редюсеры в РТК квери + DynamicModuleLoader - для компонент с их редюсерами в свзяке,

#                       FSD и архитектура (структура и флоу переиспользования 86-87 video):
- app - pages - features - entities (переиспользуемые компоненты без своего state) - shared (переиспользуемые компоненты без своего state)
- импорты из своего слоя только относительные от паблик апи
- __________________________________________________________________________________________________________________________________________
- Создаем сущность Профиля 35-37,
- В entities или features делаем запросы за данными - данные сохранили в стейте - отрисовываем их в entities в Ui, например нам на основе
- данных надо отрисовать карточку профиля ProfileCard -- потом ProfileCard отрисовываем на странице ProfilePage
- ProfileCard, 41 - не должен обладать стейтом своим данными, состоянием, должен быть слой entities переиспользуемым из проекта в проект
- и в этом проекте могли много карточек отрисовать ProfileCard ProfileCard ProfileCard...
- ProfileCard (переиспользуемый самостоятельный тупой компонент) должен лишь принимать данные в пропсах, все данные 
  вынесем на слой pages в ProfilePage:данные из селектоов крутилок, ошибку и с сервера данные.. ProfilePage рисует ProfileCard и прокидывает 
- в него пропсы с данными 8 мин + 33 - если хотим редактировать ProfileCard дробим его на подкомпоненты и на уровне странице редактируем 
  данные а на уровне карточки профиля - видеть сухие данные пользователя: возраст и тд, функционал  который относится к редектированию 
  этот функционал страницы: на уровне ProfilePage создаем -- ProfilePageHeader и тут логика редактирования...
  - Если не надо переиспользовать компонент со слоя сущностей, то в этом слое разрешено делать запросы и хранить данные, но в entities
  желательно этого не делать...
  - ProfilePage и любая страница тоже чистая просто что-то отрисовывает и прокидывает данные, а в entities в ui уже разварачиваем, рисуем 
  много разметки
- __________________________________________________________________________________________________________________________________________
- ИЛИ 86 видео на примере: просто "звездочки" которые используем где угодно, переиспользуемые компоненты: StarRating (лежит в shared,
- получает данные для отрисовки из пропсов). Создаем entities Rating (для хранения данных у себя в стейте), в папке создаем RatingCard 
  (карточка - переиспользуемая логика по оценке функционала..) использует нижележащии слой StarRating -- когда захотим внедрить на какую-то из стрнаниц оценку статьи, мы создаем 
- отдельные фичи: ProfileRating и ArticleRating которые будут работать с бэкендом иметь внутреннюю логику, определять какой текст будет 
  внутри  карточки с реитингом те это конкретная реализация и потом мы эти фичи на нужных страницах используем уже. ProfileRating и ArticleRating внутри себя
- изолируют логику и наверх на pages отдают лишь компонент который остается лишь добавить на страницу - модули получаются с такой
- связанностью что всегда их можем удалить - нет сложных пересечении и выпилить из этой структыры любой компонент легко
- RatingCard принимает пропсы сверху от страницы и перепрокидывает их в StarRating. Внутри RatingCard лоакальное состояние допускается
- например для закрытия Модалки
87 создаем фичу имплиментацию рейтинга: ArticlePage запрашивает данные рисует RatingCard и прокидывает в него полученные данные,
- фичу ArticleRating добавляем на страницу ArticleDetailsPage -- в features - api - articleRatingApi.ts елаем РТК запрос за данными
- в ArticleRating все полученные данные достаем и прокидываем данные вниз в RatingCArd - StarRating
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
##
#
#
#
#
#
#















