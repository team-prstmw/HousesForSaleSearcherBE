# Houses For Sale Searcher - CodersCamp 2021/22 Project Node.js + MongoDB
## I. Team

The team worked as part of the [CodersCamp](https://coderscamp.pl/) course. The application was made by the course participants with the help of a mentor.

**Mentor**: [Filip Hałoń](https://github.com/FilipHalon)

**Participants**:

-   [Marta Goniszewska](https://github.com/mgoniszewska)
-   [Tomasz Ikert](https://github.com/ike-tom)
-   [Patryk Jurczyk](https://github.com/PatrykJurczyk)
-   [Wojciech Okularczyk](https://github.com/shadowas-py)


## II. Project description
Project is a backend for our [app](https://github.com/team-prstmw/HousesForSaleSearcher), which is used to buy and sell houses.

## III. [Swagger - API description](https://pacific-refuge-80597.herokuapp.com/api/doc/#/)

## IV. [DEMO](https://pacific-refuge-80597.herokuapp.com/api)

## V. Tech stack
- Node.js
- MongoDB

## VI. Tools
- Postman
- MongoDB Compass
- Asana
- Visual Studio Code
- Git
- Swagger/OpenAPI


## VII. Workflow
The organization of the team's work and code review were carried out on GitHub. Tasks are described and distributed in the Asana. We used Google Meet for meetings. Meetings were conducted every Tuesday, Thursday, and Sunday. Discord was used in everyday communication.

## VIII. Available methods

1. Favorites
   - POST /favorites  
   Add house to favorites for logged user.   
   - DELETE /favorites/:id  
   Delete house from favorites for logged user.
2. Transactions
   - POST /transactions    
   Transaction process (buy house).
   - GET /transactions/:id    
   Get transaction details by id.
   - GET /transactions/  
   Get all transactions.
3. Houses
   - POST /create-new-house    
   Add a new house.
   - GET /houses   
   Get houses list with optional filtering and/or sorting.
   - PATCH /houses/:id     
   Delete house.
   - GET /houses/:id     
   House details.
4. User
   - POST /users  
   Create user.
   - POST /login  
   Logs user into the system.
   - PATCH /users  
   Update user.
   - PATCH /users/passwd      
   Change user password.
   - PATCH /users/deletion  
   Delete user.
   - PATCH /users/:id/cash  
   Change avaiable amount of user's cash.
   - POST /logout  
   Logout user.
   - GET /users/my-favorites    
   List of user's favorite houses.  
   - GET /users/my-houses    
   List houses owned by logged user.
