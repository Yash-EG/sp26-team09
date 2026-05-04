# Requirements - Scene Scout

**Project Name:** Scene Scout \
**Team:** Bridger Hansen, Yash Patel \
**Course:** CSC 340 \
**Version:** 2.0 \
**Date:** 2026-05-04

---

## 1. Overview

**Vision.** An app for local bands to promote their shows and for audiences to discover and engage with local live music.

**Glossary** Terms used in the project

- **Customer / Audience** — A user who discovers and attends shows
- **Band / Provider** — A user who posts shows and manages their presence
- **Show** — A live music event posted by a band
- **Post** — A band's social update (image + caption)
- **Feed** — The browsable list of shows or posts

**Primary Users / Roles.**

- **Customer** — Discover shows, follow bands, engage with posts
- **Band** — Promote shows, post updates, view engagement stats

**Scope (implemented).**

- Band and customer account creation and login
- Band profile management (bio, contact info, social links, genre)
- Show creation, editing, and deletion by bands
- Customer feed with genre filtering
- Show details with map integration
- Customer follow/unfollow bands
- Customer mark shows as interested
- Band posts with images and captions
- Customer likes and comments on posts
- Genre-based show recommendations for customers
- Band statistics (follower count, per-show save counts)
- Public band profile page for customers

**Out of scope (deferred).**

- Ticket purchasing / payment processing
- AI Chatbot
- Venue seating layout

> This document is **requirements‑level** and solution‑neutral; design decisions (UI layouts, API endpoints, schemas) are documented separately.

---

## 2. Functional Requirements (User Stories)

Each story is written as: **As a `<role>`, I want `<capability>`, so that `<benefit>`.** Each story includes at least one **Given/When/Then** scenario.

### 2.1 Customer Stories

- **US‑CUST‑001 —**
  _Story:_ As a customer, I want to sign up and log in, so that I can access my personalized feed.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given a new user with no account
    When  they fill out the signup form and select Customer role
    Then  an account is created and they are redirected to the feed
  ```

- **US‑CUST‑002 —**
  _Story:_ As a customer, I want to browse all shows in my feed with genre filtering, so that I can discover shows that match my taste.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is logged in
    When  they open the Feed page and select a genre filter
    Then  only shows matching that genre are displayed
  ```

- **US‑CUST‑003 —**
  _Story:_ As a customer, I want to view full show details including venue, date, price, lineup, and a map, so that I know where and when to go.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is browsing the feed
    When  they click on a show card
    Then  they see all show details and an embedded map of the venue
  ```

- **US‑CUST‑004 —**
  _Story:_ As a customer, I want to mark shows as interested, so that I can keep track of shows I plan to attend.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is viewing a show's detail page
    When  they click the Interested button
    Then  the show is saved to their interested list and the band's save count increases
  ```

- **US‑CUST‑005 —**
  _Story:_ As a customer, I want to follow and unfollow bands, so that I can stay updated on bands I like.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is viewing a band's profile page
    When  they click the Follow button
    Then  the band is added to their following list and the band's follower count increases
  ```

- **US‑CUST‑006 —**
  _Story:_ As a customer, I want to browse posts from all bands and filter by bands I follow, so that I can stay up to date on band activity.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is on the Updates page
    When  they toggle the Following filter
    Then  only posts from bands they follow are shown
  ```

- **US‑CUST‑007 —**
  _Story:_ As a customer, I want to like and unlike band posts, so that I can show appreciation for content I enjoy.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is viewing a post
    When  they click the like button
    Then  the like count increments and the button reflects their liked state
  ```

- **US‑CUST‑008 —**
  _Story:_ As a customer, I want to comment on band posts with a 280 character limit, so that I can engage with the band and other fans.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is viewing a post's comment section
    When  they type a comment and submit
    Then  the comment appears under the post with their name and timestamp
  ```

- **US‑CUST‑009 —**
  _Story:_ As a customer, I want to view a band's public profile page, so that I can learn about the band and see their upcoming shows.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer clicks on a band's name anywhere in the app
    When  the band profile page loads
    Then  they see the band's bio, genre, social links, and upcoming shows
  ```

- **US‑CUST‑010 —**
  _Story:_ As a customer, I want to receive show recommendations based on my preferred genres, so that I can discover relevant shows without searching.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer has selected preferred genres on their profile
    When  they visit their profile page
    Then  upcoming shows matching their genres are shown in the Recommended section
  ```

- **US‑CUST‑011 —**
  _Story:_ As a customer, I want to manage my profile including name, bio, location, and preferred genres.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the customer is on their profile page
    When  they edit their details and save
    Then  the updated profile is saved and reflected across the app
  ```

### 2.2 Provider (Band) Stories

- **US‑PROV‑001 —**
  _Story:_ As a band, I want to register and log in, so that I can manage my presence on the platform.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given a band with no account
    When  they fill out the signup form and select Band / Artist role
    Then  a band account is created and they are redirected to their dashboard
  ```

- **US‑PROV‑002 —**
  _Story:_ As a band, I want to create a show listing with date, venue, price, genre, and ticket link, so that audiences can discover and attend my show.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band is logged in
    When  they fill out the show creation form and submit
    Then  the show appears on the audience feed with all entered details
  ```

- **US‑PROV‑003 —**
  _Story:_ As a band, I want to update or delete my show listings, so that I can keep information accurate or remove cancelled shows.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band has an active show listing
    When  they edit the show details or delete it
    Then  the changes are immediately reflected on the feed
  ```

- **US‑PROV‑004 —**
  _Story:_ As a band, I want to manage my profile including bio, contact info, social links, and genre, so that audiences know who we are.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band is logged in and on their profile page
    When  they update their profile information and save
    Then  the profile is updated and visible on their public band page
  ```

- **US‑PROV‑005 —**
  _Story:_ As a band, I want to create posts with images and captions, so that I can share updates with my audience.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band is on the Posts page
    When  they fill out the post form and submit
    Then  the post appears on the Updates feed for all customers
  ```

- **US‑PROV‑006 —**
  _Story:_ As a band, I want to see the like count and comments on my posts, so that I can gauge audience engagement.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band is on their Posts page
    When  they view their post cards
    Then  each post shows the current like count and a comment section with all comments
  ```

- **US‑PROV‑007 —**
  _Story:_ As a band, I want to view my statistics including follower count and how many people saved each show, so that I can understand my reach.
  _Acceptance:_
  ```gherkin
  Scenario:
    Given the band is on their Stats page
    When  the page loads
    Then  they see total follower count and a table of shows with their interested counts
  ```

---

## 3. Non‑Functional Requirements

- **Performance:** The app must be responsive across all screen sizes with fast load times.
- **Security:** Passwords are stored as hashed values. Database credentials are not committed to the repository.
- **Usability:** The UI must be accessible and intuitive for both band and customer roles with clear role-based navigation.

---

## 4. Assumptions, Constraints, and Policies

- Users self-identify as either a Customer or a Band at signup — no admin verification.
- All show listings are assumed to be legitimate and posted in good faith.
- The app uses a single shared PostgreSQL database hosted on Neon.
- The app is not limited by geography — any band can post shows anywhere.

---

## 5. Milestones (course‑aligned)

- **M2 Requirements** — SRS + stories opened as issues.
- **M3 High‑fidelity prototype** — core customer/provider flows fully interactive.
- **M4 Design** — architecture, schema, API outline.
- **M5 Backend API** — key endpoints implemented and tested.
- **M6 Increment** — customer and band use cases end‑to‑end in MVC app.
- **M7 Final** — complete system, all use cases implemented and documented.

---

## 6. Change Management

- Stories are living artifacts; changes are tracked via repository issues and linked pull requests.
- Major changes update this SRS document.
