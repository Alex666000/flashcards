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















