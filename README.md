# Movies-explorer-api :tv:

## [API сервиса поиска фильмов](https://api.kuzpavel1985.nomoredomains.icu)

### :computer: Установка и запуск проекта
>*клонируйте репозиторий*<br/>
> `git clone https://github.com/PavelKuzmichev/movies-explorer-api`<br/>
>*установите зависимости*<br/>
> `npm install`<br/>
>*запустите сервер*<br/>
> `npm run start`<br/>
>*запустите сервер с hot-reload*<br/>
> `npm run dev`

### :key: Auth
- POST /signup - создание пользователя с переданными данными: name, email, password
- POST /signin - проверяет переданные email и password и возвращает JWT-token

### :man: User
- GET /users/me - возвращает информацию о пользователе (name и email)
- PATCH /users/me - обновляет данные пользователя (name и email)

### :video_camera: Movies
- GET /movies - возвращает сохраненные пользователем фильмы
- POST /movies - создаёт фильм с переданными данными: country, director, duration, year, description, image, trailer, movieId, nameRU, nameEN и thumbnail
- DELETE /movies/movieId - удаляет сохранённый фильм по ID

### :rocket: Технологии
- Node.js 
- Express.js 
- MongoDB 
- Rest API
- nginx 

