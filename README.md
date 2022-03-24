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
Projekt jest częścią backendową do naszej [aplikacji](https://github.com/team-prstmw/HousesForSaleSearcher) służącej do kupowania i sprzedawania domów.

## III. [Wersja live](https://pacific-refuge-80597.herokuapp.com/api)

## IV. Wykorzystane technologie:
- Node.js
- MongoDB

## V. Narzędzia z jakimi pracowaliśmy:
- Postman
- MongoDB Compass
- Asana
- Visual Studio Code
- Git
- Swagger/OpenAPI


## VI. Organizacja pracy

Organizacja pracy zespołu oraz code review były przeprowadzane w serwisie GitHub.
Zadania opisano oraz rozdzielano w oprogramowaniu Asana.
Do daily korzystaliśmy z Google Meet. Daily były przeprowadzane w każdy wtorek, czwartek oraz niedzielę.
Podczas codziennej komunikacji korzystano z Discorda.


## VII. Dostępne zapytania

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
   - GET /transactions/  
   Pobieranie wszystkich transakcji.
3. Domy
   - POST /create-new-house    
   Dodawanie nowego domu na sprzedaż.
   - GET /houses 
   Pobieranie danych wszystkich domów.
   - PATCH /houses/:id     
   Zmiana statusu domu na niemożliwy do kupna.
   - GET /houses/:id     
   Pobieranie szczegółowych danych domu.
4. Użytkownik
   - POST /users  
   Tworzenie nowego użytkownika.
   - POST /login  
   Logowanie użytkownika.
   - PATCH /users
   Edycja danych użytkownika.
   - PATCH /users/passwd      
   Zmiana hasła użytkownika.
   - PATCH /users/deletion  
   Usuwanie użytkownika.
   - PATCH /users/:id/cash  
   Zmiana środków użytkownika.
   - POST /logout  
   Wylogowywanie użytkownika.
   - GET /users/my-favorites    
   Pobieranie danych wszystkich ulubionych domów użytkownika.  
   - GET /users/my-houses    
   Pobieranie danych wszystkich domów użytkownika.