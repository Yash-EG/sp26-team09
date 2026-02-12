# Requirements - Scene Scout

**Project Name:** Scene Scout \
**Team:** Bridger Hansen - Audience Side, Yash Patel - Band Side \
**Course:** CSC 340 \
**Version:** 1.0 \
**Date:** 2026-02-03

---

## 1. Overview

**Vision.** An app for local basement/garage bands to promote their show and for audiences to find local cheap shows.

**Glossary** Terms used in the project

- **Term 1:** Audience - User
- **Term 2:** Band - Seller/Uploader
- **Term 3:** Show - Event being uploaded

**Primary Users / Roles.**

- **Audience** — Find local small shows
- **Bands** — Promote local cheap shows

**Scope (this semester).**

- Bands can post shows
- Account management and creation
- UI Accessibility
- Genre segregation

**Out of scope (deferred).**

- Selling Tickets
- AI Chatbot
- Map Integration
- Venue Layout

> This document is **requirements‑level** and solution‑neutral; design decisions (UI layouts, API endpoints, schemas) are documented separately.

---

## 2. Functional Requirements (User Stories)

Write each story as: **As a `<role>`, I want `<capability>`, so that `<benefit>`.** Each story includes at least one **Given/When/Then** scenario.

### 2.1 Customer Stories

- **US‑CUST‑001 —**
  _Story:_ As an audience member, I want to login and check my local feed.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the audience member has an account already
    When  the audience member opens the app
    Then  a list of nearby shows are displayed
  ```

- **US‑CUST‑002 —**
  _Story:_ As an audience member, I want to redirect to apple/google maps to get to the show destination.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the audience member is logged in.
    When  the audience member clicks on destination in the show details
    Then  redirect to a preferred navigation app
  ```

- **US‑CUST‑003 —**
  _Story:_ As an audience member, I want to see details for a show including ticket medium, location, price, genre, band lineup.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the audience member is on their feed and logged in.
    When  the audience member clicks on a show
    Then  they see all of the details of the show
  ```

- **US‑CUST‑004 —**
  _Story:_ As an audience member, I want to see posters/images for the show.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the audience member is on their feed and logged in
    When  the audience member scrolls through their feed
    Then  they see all of the shows with marketing images/posters.
  ```

- **US‑CUST‑005 —**
  _Story:_ As an audience member, I want to search for local shows.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the audience member is logged in and on their feed and has a band or genre in mind.
    When  the audience member clicks on the search bar
    Then  the search filters all local bands within the search details
  ```

### 2.2 Provider Stories

- **US‑PROV‑001 —**
  _Story:_ As a band, I want to register and login.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band member doesn't have an account
    When  they fill out the registration form and submit
    Then  a band account is created and they are logged in to their dashboard.
  ```

- **US‑PROV‑002 —**
  _Story:_ As a band member, I want to post a show with details like date, venue, price, and genre, so that local audiences can discover and attend my show.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band member is logged in to their account
    When  they fill out the show creation form and submit it
    Then  the show appears on the audience feed with all the entered details
  ```

- **US‑PROV‑003 —**
  _Story:_ As a band member, I want to update or delete my show listing, so that I can keep show information accurate or remove a cancelled show.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band member is logged in and has an active show listing
    When  they edit the show details and save
    Then  the show listing reflects the updated information on the audience feed
  ```

- **US‑PROV‑004 —**
  _Story:_ As a band member, I want to add a venue/location to my show listing, so that audience members know where the show is taking place.
  _Acceptance:_
```gherkin
  Scenario:
    Given the band member is logged in and creating a show listing
    When  they enter the venue name and address
    Then  the venue details are saved and displayed on the show listing
```
---

## 3. Non‑Functional Requirements

- **Performance:** The app should be responsive and provide smooth interactions across all screen sizes and devices.
- **Security/Privacy:** User passwords must be encrypted and user location data must only be used for filtering the local feed.
- **Usability:** The app must support screen readers and text-to-speech for accessibility.

---

## 4. Assumptions, Constraints, and Policies

- The app is limited to shows and users in the Greensboro, NC area only.
- All shows posted by bands are assumed to be legitimate and accurate.
- The app is self-sufficient and will not display advertisements or require third-party monetization.
---

## 5. Milestones (course‑aligned)

- **M2 Requirements** — this file + stories opened as issues.
- **M3 High‑fidelity prototype** — core customer/provider flows fully interactive.
- **M4 Design** — architecture, schema, API outline.
- **M5 Backend API** — key endpoints + tests.
- **M6 Increment** — ≥2 use cases end‑to‑end.
- **M7 Final** — complete system & documentation.

---

## 6. Change Management

- Stories are living artifacts; changes are tracked via repository issues and linked pull requests.
- Major changes should update this SRS.