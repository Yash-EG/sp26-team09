Requirements – Starter Template
Project Name: Scene Scout
Team: Bridger Hansen - Audience Side, Yash Patel - Band Side
Course: CSC 340
Version: 1.0
Date: 2026-02-03

1. Overview
An app for local basement/garage bands to promote their show and for audiences to find local cheap shows.

Glossary Terms used in the project

Term 1: Audience - User
Term 2: Band - Seller/Uploader
Term 3: Show - Event being uploaded

Primary Users / Roles.

Audience  — Find local small shows
Bands - Promote local cheap shows

Scope (this semester).
Bands can post shows
Account management and creation
UI Accessibility
Genre segregation

Out of scope (deferred).
Selling Tickets
AI Chatbot
Map Integration
Venue Layout

This document is requirements‑level and solution‑neutral; design decisions (UI layouts, API endpoints, schemas) are documented separately.

2. Functional Requirements (User Stories)
Write each story as: As a <role>, I want <capability>, so that <benefit>. Each story includes at least one Given/When/Then scenario.

2.1 Customer Stories
US‑CUST‑001 —
Story: As an audience member, I want to login and check my local feed.
Acceptance:

Scenario:
  Given the audience member has an account already
  When  the audience member opens the app
  Then  a list of nearby shows are displayed
US‑CUST‑002 —
Story: As an audience member, I want to redirect to apple/google maps to get to the show destination.
Acceptance:

Scenario: 
  Given the audience member is logged in.
  When  the audience member clicks on destination in the show details 
  Then  redirect to a preferred navigation app

US-CUST-003-
Story: As an audience member , I want to see details for a show including ticket medium, location, price, genre, band lineup.

Scenario:
	Given the audience member is on their feed and logged in.
	When the audience member clicks on a show
	Then they see all of the details of the show

US-CUST-004-
Story: As an audience member, I want to see posters/images for the show
  Given the audience member is on their feed and logged in
  When the audience member scrolls through their feed
  Then they see all of the shows with marketing images/posters.

US-CUST-005-
Story: As an audience member, I want to search for local shows
  Given the audience member is logged in and on their feed and has a band or genre in mind.
  When the audience member clicks on the search bar
  Then the search filters all local bands within the search details

2.2 Provider Stories
US‑PROV‑001 —
Story: As a provider, I want … so that …
Acceptance:

Scenario: <happy path>
  Given <preconditions>
  When  <action>
  Then  <observable outcome>
US‑PROV‑002 —
Story: As a provider, I want … so that …
Acceptance:

Scenario: <happy path>
  Given <preconditions>
  When  <action>
  Then  <observable outcome>
2.3 SysAdmin Stories
US‑ADMIN‑001 —
Story: As a sysadmin, I want … so that …
Acceptance:

Scenario: <happy path>
  Given <preconditions>
  When  <action>
  Then  <observable outcome>
US‑ADMIN‑002 —
Story: As a sysadmin, I want … so that …
Acceptance:

Scenario: <happy path>
  Given <preconditions>
  When  <action>
  Then  <observable outcome>
3. Non‑Functional Requirements (make them measurable)
Performance: description
Availability/Reliability: description
Security/Privacy: description
Usability: description
4. Assumptions, Constraints, and Policies
list any rules, policies, assumptions, etc.
5. Milestones (course‑aligned)
M2 Requirements — this file + stories opened as issues.
M3 High‑fidelity prototype — core customer/provider flows fully interactive.
M4 Design — architecture, schema, API outline.
M5 Backend API — key endpoints + tests.
M6 Increment — ≥2 use cases end‑to‑end.
M7 Final — complete system & documentation.
6. Change Management
Stories are living artifacts; changes are tracked via repository issues and linked pull requests.
Major changes should update this SRS.
