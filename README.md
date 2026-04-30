# Scene Scout

CSC 340 Team 09 project for finding and posting small, local live music shows.

Scene Scout is a full-stack web application that helps local bands advertise shows and helps concert fans discover events nearby. The project uses React, Tailwind CSS, and Vite for the frontend prototypes, and Spring Boot with Spring Data JPA for the backend API.

## Team Members

- Bridger Hansen
- Yash Patel

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, React Router
- **Backend:** Java, Spring Boot, Spring Web MVC, Spring Data JPA
- **Database:** PostgreSQL
- **Build Tools:** Maven, npm

## Project Structure

```text
sp26-team09/
|-- backend-api/                 # Spring Boot REST API
|-- high-fidelity-prototype/
|   |-- customer/                # React customer-facing app
|   `-- provider/                # React band/provider-facing app
|-- docs/                        # SRS, diagrams, and project documentation
|-- README.md                    # Whole-project documentation
`-- Reqs Testing Plan.md         # Requirements testing plan
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Java 25 or a compatible JDK
- Node.js and npm
- Git
- PostgreSQL database access

## Database Configuration

The backend uses PostgreSQL through the connection settings in `backend-api/src/main/resources/application.properties`.

If you are running the project with a different database, update `spring.datasource.url` in that file before starting the backend. The project currently uses `spring.jpa.hibernate.ddl-auto=update`, so Spring Boot will update the database schema based on the JPA entity classes when the application starts.

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:Yash-EG/sp26-team09.git
cd sp26-team09
```

### 2. Run the Backend API

```bash
cd backend-api
./mvnw clean install
./mvnw spring-boot:run
```

The backend API will run at:

```text
http://localhost:8080
```

### 3. Run the Customer Frontend

Open a second terminal:

```bash
cd high-fidelity-prototype/customer
npm install
npm run dev
```

The customer app will run at the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

### 4. Run the Provider Frontend

Open a third terminal:

```bash
cd high-fidelity-prototype/provider
npm install
npm run dev
```

If the customer app is already using port `5173`, Vite will choose the next open port, usually:

```text
http://localhost:5174
```

## App Functions

### Customer / Audience

1. Create and modify a customer profile with location, bio, profile picture, and preferred genres.
2. Browse local shows in a feed.
3. View show details including band, location, ticket price, date, time, genre, and ticket link.
4. Mark shows as interested.
5. Follow bands for future announcements.

### Provider / Band

1. Create and modify a band profile with bio, contact information, genres, rate, equipment, and social links.
2. Create show listings with venue, date, time, lineup, ticket price, and ticket URL.
3. Update or delete existing show listings.
4. View provider-facing pages for profile, bookings, feed, availability, and dashboard workflows.

## API Endpoints

All backend endpoints use the base URL:

```text
http://localhost:8080
```

### Band Endpoints

Base URL:

```text
http://localhost:8080/bands
```

#### 1. Get All Bands

```http
GET /bands
```

**Description:** Retrieve a list of all band profiles.

#### Example Request

```bash
curl http://localhost:8080/bands
```

#### Example Response

```json
[
  {
    "userId": 1,
    "email": "thestrokes@example.com",
    "role": "BAND",
    "status": "ACTIVE",
    "name": "The Strokes",
    "genre": "Indie Rock",
    "subgenre": "Post-Punk Revival",
    "bio": "A 5-piece indie rock band from Greensboro, NC.",
    "contactName": "Julian Casablancas",
    "phone": "336-555-0101",
    "setLength": 60,
    "membersCount": 5,
    "equipment": "Full backline provided. Need PA and monitors.",
    "rate": 200.0,
    "website": "https://thestrokes.com",
    "instagram": "@thestrokes",
    "spotify": "thestrokes",
    "soundcloud": "thestrokes"
  }
]
```

#### 2. Get Band by ID

```http
GET /bands/{id}
```

**Description:** Retrieve a single band profile by user ID.

#### Example Request

```bash
curl http://localhost:8080/bands/1
```

#### 3. Create a Band

```http
POST /bands
```

**Description:** Create a new band/provider profile.

#### Example Request

```bash
curl -X POST http://localhost:8080/bands \
  -H "Content-Type: application/json" \
  -d '{
    "email": "thestrokes@example.com",
    "passwordHash": "hashed_password",
    "role": "BAND",
    "status": "ACTIVE",
    "name": "The Strokes",
    "genre": "Indie Rock",
    "subgenre": "Post-Punk Revival",
    "bio": "A 5-piece indie rock band from Greensboro, NC.",
    "contactName": "Julian Casablancas",
    "phone": "336-555-0101",
    "setLength": 60,
    "membersCount": 5,
    "equipment": "Full backline provided. Need PA and monitors.",
    "rate": 200.00,
    "website": "https://thestrokes.com",
    "instagram": "@thestrokes",
    "spotify": "thestrokes",
    "soundcloud": "thestrokes"
  }'
```

#### 4. Get Bands by Genre

```http
GET /bands/genre/{genre}
```

**Description:** Retrieve bands that match a genre.

#### Example Request

```bash
curl http://localhost:8080/bands/genre/Indie%20Rock
```

#### 5. Update a Band

```http
PUT /bands/{id}
```

**Description:** Update an existing band profile.

#### Example Request

```bash
curl -X PUT http://localhost:8080/bands/1 \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Updated bio for upcoming Greensboro shows.",
    "rate": 250.00,
    "instagram": "@thestrokesgsb"
  }'
```

#### 6. Delete a Band

```http
DELETE /bands/{id}
```

**Description:** Delete an existing band profile.

#### Example Request

```bash
curl -X DELETE http://localhost:8080/bands/1
```

### Show Endpoints

Base URL:

```text
http://localhost:8080/shows
```

#### 1. Get All Shows

```http
GET /shows
```

**Description:** Retrieve all show listings.

#### Example Request

```bash
curl http://localhost:8080/shows
```

#### 2. Get Show by ID

```http
GET /shows/{id}
```

**Description:** Retrieve a single show by show ID.

#### Example Request

```bash
curl http://localhost:8080/shows/10
```

#### 3. Create a Show

```http
POST /shows
```

**Description:** Create a new show listing for a band.

#### Example Request

```bash
curl -X POST http://localhost:8080/shows \
  -H "Content-Type: application/json" \
  -d '{
    "band": { "userId": 1 },
    "ticketPrice": 10.00,
    "image": "https://example.com/poster.jpg",
    "description": "An intimate indie rock night in Greensboro.",
    "location": "The Blind Tiger",
    "venueAddress": "1819 Spring Garden St, Greensboro, NC 27403",
    "date": "2026-04-12",
    "doorsTime": "19:00:00",
    "showTime": "20:00:00",
    "genre": "Indie Rock",
    "ageRestriction": "All Ages",
    "lineup": "The Strokes, Opening Act TBA",
    "showStatus": "ACTIVE",
    "ticketUrl": "https://example.com/tickets"
  }'
```

#### 4. Get Shows by Band

```http
GET /shows/band/{bandId}
```

**Description:** Retrieve all shows posted by a specific band.

#### Example Request

```bash
curl http://localhost:8080/shows/band/1
```

#### 5. Get Shows by Genre

```http
GET /shows/genre/{genre}
```

**Description:** Retrieve all shows that match a genre.

#### Example Request

```bash
curl http://localhost:8080/shows/genre/Indie%20Rock
```

#### 6. Update a Show

```http
PUT /shows/{id}
```

**Description:** Update an existing show listing.

#### Example Request

```bash
curl -X PUT http://localhost:8080/shows/10 \
  -H "Content-Type: application/json" \
  -d '{
    "ticketPrice": 12.00,
    "description": "Updated show description.",
    "showStatus": "ACTIVE"
  }'
```

#### 7. Delete a Show

```http
DELETE /shows/{id}
```

**Description:** Delete an existing show listing.

#### Example Request

```bash
curl -X DELETE http://localhost:8080/shows/10
```

### Customer Endpoints

Base URL:

```text
http://localhost:8080/api/customers
```

#### 1. Get All Customers

```http
GET /api/customers
```

**Description:** Retrieve all customer profiles.

#### Example Request

```bash
curl http://localhost:8080/api/customers
```

#### 2. Get Customer by ID

```http
GET /api/customers/{id}
```

**Description:** Retrieve a single customer by user ID.

#### Example Request

```bash
curl http://localhost:8080/api/customers/2
```

#### 3. Get Customer by Email

```http
GET /api/customers/email/{email}
```

**Description:** Retrieve a customer by email address.

#### Example Request

```bash
curl http://localhost:8080/api/customers/email/fan@example.com
```

#### 4. Create a Customer

```http
POST /api/customers
```

**Description:** Create a new customer/audience profile.

#### Example Request

```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "email": "fan@example.com",
    "passwordHash": "hashed_password",
    "role": "AUDIENCE",
    "status": "ACTIVE",
    "name": "Local Music Fan",
    "bio": "Always looking for new shows.",
    "profilePictureUrl": "https://example.com/profile.jpg",
    "location": "Greensboro, NC"
  }'
```

#### 5. Update a Customer

```http
PUT /api/customers/{id}
```

**Description:** Update an existing customer profile.

#### Example Request

```bash
curl -X PUT http://localhost:8080/api/customers/2 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Fan Name",
    "bio": "Interested in indie, punk, and house shows.",
    "location": "Greensboro, NC"
  }'
```

#### 6. Update Customer Preferred Genres

```http
PUT /api/customers/{id}/genres
```

**Description:** Replace a customer's preferred genres using a list of genre IDs.

#### Example Request

```bash
curl -X PUT http://localhost:8080/api/customers/2/genres \
  -H "Content-Type: application/json" \
  -d '[1, 2, 3]'
```

#### 7. Follow a Band

```http
POST /api/customers/{id}/follow/{bandId}
```

**Description:** Mark a band as followed by a customer.

#### Example Request

```bash
curl -X POST http://localhost:8080/api/customers/2/follow/1
```

#### 8. Get Followed Bands

```http
GET /api/customers/{id}/following
```

**Description:** Retrieve the bands followed by a customer.

#### Example Request

```bash
curl http://localhost:8080/api/customers/2/following
```

#### 9. Unfollow a Band

```http
DELETE /api/customers/{id}/follow/{bandId}
```

**Description:** Remove a followed band from a customer profile.

#### Example Request

```bash
curl -X DELETE http://localhost:8080/api/customers/2/follow/1
```

#### 10. Mark Interested in a Show

```http
POST /api/customers/{id}/interested/{showId}
```

**Description:** Save a show to a customer's interested list.

#### Example Request

```bash
curl -X POST http://localhost:8080/api/customers/2/interested/10
```

#### 11. Get Interested Shows

```http
GET /api/customers/{id}/interested
```

**Description:** Retrieve shows that a customer marked as interested.

#### Example Request

```bash
curl http://localhost:8080/api/customers/2/interested
```

#### 12. Unmark Interested in a Show

```http
DELETE /api/customers/{id}/interested/{showId}
```

**Description:** Remove a show from a customer's interested list.

#### Example Request

```bash
curl -X DELETE http://localhost:8080/api/customers/2/interested/10
```

#### 13. Delete a Customer

```http
DELETE /api/customers/{id}
```

**Description:** Delete an existing customer profile.

#### Example Request

```bash
curl -X DELETE http://localhost:8080/api/customers/2
```

### Genre Endpoints

Base URL:

```text
http://localhost:8080/api/genres
```

#### 1. Get All Genres

```http
GET /api/genres
```

**Description:** Retrieve all available genres.

#### Example Request

```bash
curl http://localhost:8080/api/genres
```

#### 2. Create a Genre

```http
POST /api/genres
```

**Description:** Create a new genre.

#### Example Request

```bash
curl -X POST http://localhost:8080/api/genres \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Indie Rock"
  }'
```

## Common Status Codes

- `200 OK`: Request succeeded.
- `201 Created`: Resource was created successfully.
- `204 No Content`: Resource was deleted successfully.
- `400 Bad Request`: Request could not be completed.
- `404 Not Found`: Resource was not found.

## Additional Documentation

- Backend API documentation: [backend-api/README.md](backend-api/README.md)
- Project docs: [docs/README.md](docs/README.md)
- Software requirements specification: [docs/SceneScoutSRS.md](docs/SceneScoutSRS.md)
- UML class diagram: [docs/sceneScoutClassDiagram.png](docs/sceneScoutClassDiagram.png)
