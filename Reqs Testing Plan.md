# Requirements Testing Plan — Scene Scout

**Project Name:** Scene Scout  
**Version:** 1.0  
**Date:** April 30, 2026  
**Purpose:** Help local music lovers find local garage/indie shows that are cheap and nearby.

---

## Actors

| Actor | Description |
|-------|-------------|
| **Provider (P)** | Local bands — can create posts for showtimes and ticket details |
| **Customer (C)** | Customers — can find local shows in small venues |

---

## Use Cases

### Customer (Audience)

**UC-C1 — Create/Modify Customer Profile**
> Preferred genres, location, profile picture, and description

- Customer logs in and creates a profile
- Customer edits profile details
- Profile is saved to the database

---

**UC-C2 — View/Search Local Show Feed**
> Posts from local bands with images, ticket prices, location, time, and date

- Customer opens feed to browse local shows
- A feed of shows is retrieved from the backend
- Customer can click on show details

---

**UC-C3 — External Ticket Link**
> If the ticket is through an online vendor, link to the external ticketing site

- A customer has clicked on show details and wants to buy tickets
- Customer clicks "Buy Tickets" and is redirected to the ticket vendor

---

**UC-C4 — Save and Bookmark Shows**
> Save shows with an "interested" button

- Customer is scrolling through their feed
- Customer clicks the heart button to save a show
- Show appears in the "My Shows" tab and is saved to the database

---

**UC-C5 — Follow Bands**
> Follow bands for future announcements

- Customer wants to follow a band from the show details page
- Customer clicks the "Follow Band" button within show details
- Customer can find the band from their profile page

---

### Provider (Band)

**UC-P1 — Create/Modify Band Profile**
> Dedicated dashboard to upload bio, profile picture, and social media links

- Band logs in and creates a profile
- Band edits profile details
- Profile is saved to the database

---

**UC-P2 — Create Shows**
> Band can add a new show listing by filling out a form with date, location, and ticket prices

- Band accesses dashboard and clicks "Create Show"
- Band fills out show details in the form
- Show is saved to the database and appears in the feed

---

**UC-P3 — Create Posts**
> Band can make posts like any social media to engage with the audience

- Band accesses dashboard and clicks "Create Post"
- Band fills out post content and uploads images if desired
- Post is saved to the database and appears on the band's profile and feed

---

**UC-P4 — View Audience Statistics**
> A data page showing total engagement on their profile and upcoming gig

- Band accesses dashboard and clicks "Audience Stats"
- Band views statistics on profile engagement, show interest, and ticket sales
- Statistics are updated in real-time based on user interactions

---

## Cross-Cutting Test Scenarios (Non-Functional Requirements)

### Performance

**Scenario P1 — API Returns Show List Quickly**

| | |
|---|---|
| **Setup** | Database has 10+ shows |
| **Steps** | 1. Open EchoAPI <br> 2. Send `GET /shows` <br> 3. Record response time |
| **Expected Outcome** | Response returns in under 1 second |
| **Actual Outcome** | ✅ 226 ms |

---

**Scenario P2 — Profile Updates and Saves Quickly**

| | |
|---|---|
| **Setup** | Existing customer profile |
| **Steps** | 1. Edit profile details <br> 2. Save details <br> 3. Confirm update loads correctly |
| **Expected Outcome** | Profile saves and loads within 2 seconds |
| **Actual Outcome** | ✅ 425 ms for two PUT requests |

---

### Security & Privacy

**Scenario S1 — Customer Cannot Access Other Customer's Data**

| | |
|---|---|
| **Setup** | Two existing users with different IDs |
| **Steps** | 1. First user attempts to access second user's profile via API call <br> 2. System checks authorization |
| **Expected Outcome** | Access is denied |
| **Actual Outcome** | ✅ Access is denied |

---

**Scenario S2 — Invalid Data Is Rejected**

| | |
|---|---|
| **Setup** | Logged-in user on profile page |
| **Steps** | 1. Enter an extremely long bio <br> 2. Save profile |
| **Expected Outcome** | Profile will not save |
| **Actual Outcome** | ✅ Did not save |

---

### Usability

**Scenario U1 — Edit Profile With Ease**

| | |
|---|---|
| **Setup** | Open page without signing in |
| **Steps** | 1. Login or create profile <br> 2. Save details <br> 3. Confirm redirect to profile page |
| **Expected Outcome** | User can create and edit profile without any roadblocks |
| **Actual Outcome** | ✅|

---

**Scenario U2 — Customer Understands Where Saved Shows Are**

| | |
|---|---|
| **Setup** | Signed into a customer profile |
| **Steps** | 1. View show feed <br> 2. Click the heart icon on a show <br> 3. Navigate to "My Shows" |
| **Expected Outcome** | Customer clearly understands that "My Shows" corresponds to hearted/saved shows |
| **Actual Outcome** |✅ |
