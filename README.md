# Scene Scout

CSC 340 Team 09 project for finding and posting small, local live music shows.

Scene Scout is a full-stack web application that helps local bands advertise shows and helps concert fans discover events nearby. The final implementation is a unified MVC application using Spring Boot for the backend and React for the frontend, serving both band and customer roles from a single codebase.

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
|-- mvc-app/                     # Final MVC application (Spring Boot + React)
|   |-- frontend/                # React + Vite frontend (both customer and band views)
|   `-- src/                     # Spring Boot backend
|-- backend-api/                 # Earlier standalone backend API (milestone 5)
|-- high-fidelity-prototype/     # Earlier React prototypes (milestone 3)
|   |-- customer/                # Customer-facing prototype
|   `-- provider/                # Band/provider-facing prototype
|-- docs/                        # SRS, class diagram, and project documentation
|-- README.md                    # Whole-project documentation
`-- Reqs Testing Plan.md         # Requirements testing plan
```

The final deliverable is the **mvc-app**. See [mvc-app/README.md](mvc-app/README.md) for setup instructions and use-case mappings.

## Prerequisites

Before running the project, make sure you have the following installed:

- Java 25 or a compatible JDK
- Node.js and npm
- Git
- PostgreSQL database access
- Mapbox API key (required for the map feature on show details)

## Running the App

See [mvc-app/README.md](mvc-app/README.md) for full setup instructions.

### Quick Start

**1. Clone the repository**
```bash
git clone git@github.com:Yash-EG/sp26-team09.git
cd sp26-team09/mvc-app
```

**2. Configure the database** — create `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://<host>/<db>?user=<user>&password=<password>&sslmode=require
spring.jpa.hibernate.ddl-auto=update
```

**3. Start the backend** — open `mvc-app` in IntelliJ or VS Code and run `Application.java`, or:
```bash
mvn spring-boot:run
```

**4. Start the frontend** — open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Both servers must be running at the same time.

## App Features

### Customer / Audience

1. Sign up and log in as a customer.
2. Browse all shows in the feed with genre filtering.
3. View show details including venue, date, price, lineup, ticket link, and an embedded map.
4. Mark shows as interested and track them.
5. Follow and unfollow bands.
6. View public band profile pages with upcoming shows.
7. Browse band posts and filter by followed bands.
8. Like and unlike posts with real-time counts.
9. Comment on posts (280 character limit).
10. Get genre-based show recommendations from their profile page.
11. Manage profile including name, bio, location, and preferred genres.

### Provider / Band

1. Sign up and log in as a band.
2. Manage band profile with bio, contact info, social links, genre, and more.
3. Create, update, and delete show listings.
4. View upcoming and past shows on the Bookings page.
5. Create and delete posts with images and captions.
6. See like counts and comments on their posts.
7. View statistics including total follower count and per-show save counts.

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
