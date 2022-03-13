# Houses For Sale Searcher - CodersCamp 2021/22 Projekt Node.js + MongoDB
## I. Zespół projektowy

Zespół pracował w ramach kursu [CodersCamp](https://coderscamp.pl/).
Aplikację wykonali uczestnicy kursu przy pomocy mentora.

**Mentor**: [Filip Hałoń](https://github.com/FilipHalon)

**Uczestnicy**:

-   [Marta Goniszewska](https://github.com/mgoniszewska)
-   [Tomasz Ikert](https://github.com/ike-tom)
-   [Patryk Jurczyk](https://github.com/PatrykJurczyk)
-   [Wojciech Okularczyk](https://github.com/shadowas-py)


## II. Opis projektu:
Projekt jest częścią backendową do naszej [aplikacji](https://github.com/team-prstmw/HousesForSaleSearcher) slużącej do kupowania i sprzedawania domów.

## III. Wykorzystane technologie:
- Node.js
- MongoDB

## IV. Narzędzia z jakimi pracowaliśmy:
- Postman
- MongoDB Compass
- Asana
- Visual Studio Code
- Git


## V. Organizacja pracy

Organizacja pracy zespołu oraz code review były przeprowadzane w serwisie GitHub.
Zadania opisano oraz rozdzielano w oprogramowaniu Asana.
Do daily korzystaliśmy z Google Meet. Daily były przeprowadzane w każdy wtorek, czwartek oraz niedzielę.
Podczas codziennej komunikacji korzystano z Discorda.


## VI. Dostępne zapytania

1. Ulubione
   - POST /favorites  
   Dodawanie nowego domu do ulubionych.   
   - DELETE /favorites/:id  
   Usuwanie wybranego domu z listy ulubionych.
2. Transakcje
   - POST /transactions    
   Kupowanie domu.
   - GET /transactions/:id    
   Pobieranie danych kupującego, sprzedającego, domu i ceny wybranej transakcji.
3. Domy
   - POST /create-new-house    
   Dodawanie nowego domu na sprzedaż.
   - GET /houses-list  
   Pobieranie danych wszystkich domów.
   - PATCH /houses/:id   
   Zmiana statusu domu na niemożliwy do kupna.
4. Użytkownik
   - POST /users  
   Tworzenie nowego użytkownika.
   - POST /login  
   Logowanie użytkownika.
   - PATCH /users/:id  
   Edycja danych użytkownika.
   - PATCH /users/:id/passwd  
   Zmiana hasła użytkownika.
   - PATCH /users/:id/deletion  
   Usuwanie użytkownika.
   - POST /logout  
   Wylogowywanie użytkownika.
   - GET /users/my-favorites  
   Pobieranie danych wszystkich ulubionych domów użytkownika.  

