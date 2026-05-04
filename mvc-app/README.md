# Scene Scout — MVC Application

Full-stack MVC implementation of Scene Scout using Spring Boot and React. This app serves both the band (provider) and customer (audience) experiences from a single unified codebase.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, React Router
- **Backend:** Java, Spring Boot, Spring Web MVC, Spring Data JPA
- **Database:** PostgreSQL (Neon hosted)
- **Build Tools:** Maven, npm

## Project Structure

```text
mvc-app/
|-- frontend/                          # React + Vite frontend
|   |-- src/
|   |   |-- components/                # Navbar, LoginCard, SignupCard, etc.
|   |   |-- pages/                     # Feed, Profile, Posts, Stats, Bookings, BandPage, etc.
|   |   `-- api.js                     # All API calls to the backend
|   `-- vite.config.js                 # Vite config with proxy to backend
`-- src/main/java/com/team09/demo/
    |-- controller/                    # REST controllers
    |-- entity/                        # JPA entities (Band, Customer, Show, Post, etc.)
    |-- repository/                    # Spring Data JPA repositories
    `-- service/                       # Business logic
```

## Prerequisites

- Java 21 or compatible JDK
- Node.js and npm
- PostgreSQL database access (or use the existing Neon connection)
- Maps API key (required for the map feature on show listings)

## Database Configuration

Create `src/main/resources/application.properties` with your database connection:

```properties
spring.datasource.url=jdbc:postgresql://<host>/<db>?user=<user>&password=<password>&sslmode=require
spring.jpa.hibernate.ddl-auto=update
```

This file is gitignored — do not commit it as it contains credentials.

## Running the App

### 1. Start the Backend

Open a terminal in the `mvc-app` folder and run:

```bash
# Using Maven wrapper (if available)
./mvnw spring-boot:run

# Or using system Maven
mvn spring-boot:run

# Or open mvc-app in IntelliJ / VS Code and run Application.java directly
```

The backend will start at:

```
http://localhost:8080
```

### 2. Start the Frontend

Open a second terminal in the `mvc-app/frontend` folder:

```bash
npm install
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

The Vite dev server proxies all `/api/*` requests to `http://localhost:8080`, so both servers must be running at the same time.

## App Features

### Customer / Audience

1. Sign up and log in as a customer.
2. Browse all band posts in the Updates feed.
3. Like posts and leave comments (280 character limit).
4. Filter the feed to show only posts from followed bands.
5. Follow and unfollow bands.
6. View public band profiles with upcoming shows.
7. Mark shows as interested.
8. Browse all shows in the Feed with genre filtering.
9. View and manage profile with preferred genres.
10. Get genre-based show recommendations on the profile page.

### Provider / Band

1. Sign up and log in as a band.
2. Create, view, and delete posts.
3. See like counts and comments on your posts.
4. Create, update, and delete show listings.
5. View upcoming and past shows on the Bookings page.
6. View statistics including follower count and per-show save counts.
7. Manage band profile with bio, contact info, social links, and more.

## API Endpoints

All backend endpoints use the base URL:

```
http://localhost:8080
```

### Band Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/bands` | Get all bands |
| GET | `/bands/{id}` | Get band by ID |
| GET | `/bands/email/{email}` | Get band by email |
| POST | `/bands` | Create a band |
| PUT | `/bands/{id}` | Update a band |
| DELETE | `/bands/{id}` | Delete a band |
| GET | `/bands/{id}/followers/count` | Get follower count for a band |

### Show Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/shows` | Get all shows |
| GET | `/shows/{id}` | Get show by ID |
| GET | `/shows/band/{bandId}` | Get shows by band |
| POST | `/shows` | Create a show |
| PUT | `/shows/{id}` | Update a show |
| DELETE | `/shows/{id}` | Delete a show |
| GET | `/shows/{id}/interested/count` | Get interested count for a show |

### Customer Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/customers` | Get all customers |
| GET | `/customers/{id}` | Get customer by ID |
| GET | `/customers/email/{email}` | Get customer by email |
| POST | `/customers` | Create a customer |
| PUT | `/customers/{id}` | Update a customer |
| DELETE | `/customers/{id}` | Delete a customer |
| PUT | `/customers/{id}/genres` | Set preferred genres |
| POST | `/customers/{id}/follow/{bandId}` | Follow a band |
| DELETE | `/customers/{id}/follow/{bandId}` | Unfollow a band |
| GET | `/customers/{id}/following` | Get followed bands |
| POST | `/customers/{id}/interested/{showId}` | Mark show as interested |
| DELETE | `/customers/{id}/interested/{showId}` | Unmark show as interested |
| GET | `/customers/{id}/interested` | Get interested shows |

### Post Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts/{id}` | Get post by ID |
| GET | `/posts/band/{bandId}` | Get posts by band |
| POST | `/posts` | Create a post |
| DELETE | `/posts/{id}` | Delete a post |
| POST | `/posts/{id}/like` | Like a post |
| DELETE | `/posts/{id}/like` | Unlike a post |
| GET | `/posts/{id}/comments` | Get comments on a post |
| POST | `/posts/{id}/comments` | Add a comment |
| DELETE | `/posts/{id}/comments/{commentId}` | Delete a comment |

### Genre Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/genres` | Get all genres |
| POST | `/genres` | Create a genre |

## Common Status Codes

- `200 OK` — Request succeeded
- `201 Created` — Resource created successfully
- `204 No Content` — Resource deleted successfully
- `400 Bad Request` — Request could not be completed
- `404 Not Found` — Resource not found
