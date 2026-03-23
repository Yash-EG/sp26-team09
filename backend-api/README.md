# Customer API & Use Case Documentation



## 1. Customer Actions
Customers can:
- Create and manage their profile  
- Set preferred genres  
- Follow bands  
- Mark interest in shows  
- View local show listings  


## 2. Customer Endpoints


#### Create Customer
**Endpoint:** `POST /api/customers`  
**Description:** Create a new customer account.

```http
POST /api/customers
Content-Type: application/json

{
  "email": "john@example.com",
  "passwordHash": "hashedpassword123",
  "role": "CUSTOMER",
  "status": "ACTIVE",
  "name": "John Doe",
  "bio": "This is a bio",
  "location": "Greensboro, NC",
  "profilePictureUrl": "https://example.com/pfp.jpg"
}
```

**Response:**
```json
{
  "userId": 9,
  "email": "john@example.com",
  "role": "CUSTOMER",
  "status": "ACTIVE",
  "name": "John Doe",
  "bio": "This is a bio",
  "location": "Greensboro, NC",
  "profilePictureUrl": "https://example.com/pfp.jpg",
  "preferredGenres": []
}
```

**Status Code:** `201 Created`

---

#### Get All Customers
**Endpoint:** `GET /api/customers`  
**Description:** Retrieve all customers

```http
GET /api/customers
```

**Status Code:** `200 OK`

---

#### Get Customer by ID
**Endpoint:** `GET /api/customers/{id}`  
**Description:** Retrieve a specific customer by ID.

```http
GET /api/customers/9
```

**Status Code:** `200 OK` or `404 Not Found`

---

#### Get Customer by Email
**Endpoint:** `GET /api/customers/email/{email}`  
**Description:** Retrieve a customer by email address.

```http
GET /api/customers/email/john@example.com
```

**Status Code:** `200 OK` or `404 Not Found`

---

#### Update Customer
**Endpoint:** `PUT /api/customers/{id}`  
**Description:** Update customer profile information.

```http
PUT /api/customers/9
Content-Type: application/json

{
  "email": "john123@example.com",
  "name": "John Doe",
  "bio": "Updated bio",
  "location": "Greensboro, NC",
  "profilePictureUrl": "https://example.com/pfp.jpg"
}
```

**Response:** Updated customer object  
**Status Code:** `200 OK` or `404 Not Found`

---

#### Update Customer Preferred Genres
**Endpoint:** `PUT /api/customers/{id}/genres`  
**Description:** Set a customer's preferred genres by genre IDs.

```http
PUT /api/customers/9/genres
Content-Type: application/json

[1, 2, 3]
```

**Response:** Updated customer object with preferred genres  
**Status Code:** `200 OK` or `400 Bad Request`

---

#### Follow a Band
**Endpoint:** `POST /api/customers/{id}/follow/{bandId}`  
**Description:** Follow a band as a customer.

```http
POST /api/customers/9/follow/2
```

**Status Code:** `201 Created` or `400 Bad Request`

---

#### Unfollow a Band
**Endpoint:** `DELETE /api/customers/{id}/follow/{bandId}`  
**Description:** Unfollow a band.

```http
DELETE /api/customers/9/follow/2
```

**Status Code:** `204 No Content` or `400 Bad Request`

---

#### Get Followed Bands
**Endpoint:** `GET /api/customers/{id}/following`  
**Description:** Get all bands a customer follows.

```http
GET /api/customers/9/following
```

**Response:** Array of band objects  
**Status Code:** `200 OK`

---

#### Mark Interest in a Show
**Endpoint:** `POST /api/customers/{id}/interested/{showId}`  
**Description:** Mark a customer as interested in a show.

```http
POST /api/customers/9/interested/1
```

**Status Code:** `200 OK` or `400 Bad Request`

---
### 3. Genre Endpoints 

#### Create Genre
**Endpoint:** `POST /api/genres`  
**Description:** Create a new genre.

```http
POST /api/genres
Content-Type: application/json

{
  "name": "Rock"
}
```

**Response:**
```json
{
  "genreId": 1,
  "name": "Rock"
}
```

**Status Code:** `201 Created`

---

#### Get All Genres
**Endpoint:** `GET /api/genres`  
**Description:** Retrieve all genres.

```http
GET /api/genres
```

**Response:**
```json
[
  { "genreId": 1, "name": "Rock" },
  { "genreId": 2, "name": "Metal" },
  { "genreId": 3, "name": "Hip-Hop" },
  { "genreId": 4, "name": "Indie" }
]
```

**Status Code:** `200 OK`

---

## 4. Use Case Mapping

### Customer Use Cases

| Use Case | Description | Related Endpoints |
|----------|-------------|-------------------|
| **US-CUST-001**  | Create/manage customer profile | `POST /api/customers`, `PUT /api/customers/{id}` |
| **US-CUST-002** | Login and view local feed | `GET /shows`, `GET /shows/genre/{genre}` |
| **US-CUST-003** | View show details | `GET /shows/{id}` |
| **US-CUST-004** | Save/bookmark shows | `POST /api/customers/{id}/interested/{showId}`, `GET /api/customers/{id}/interested` |
| **US-CUST-005**  | Follow bands | `POST /api/customers/{id}/follow/{bandId}`, `GET /api/customers/{id}/following` |
| **US-CUST-006** | Search for local shows | `GET /shows/genre/{genre}`, `GET /bands/genre/{genre}` |
| **US-CUST-007** | Set preferred genres | `PUT /api/customers/{id}/genres` |
