# Angular Event Management Application Documentation

Welcome to the documentation for this Angular Event Management Application. This document provides an overview of the project structure, key components, basic features, and advanced functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Components](#components)
  - [List Display Component](#list-display-component)
  - [Event User Input Component](#event-user-input-component)
  - [Event Edit Component](#event-edit-component)
  - [Event Detail View Component](#event-detail-view-component)
  - [Category User Input Component](#category-user-input-component)
  - [Categories Display Component](#categories-display-component)
- [Installation](#installation)
- [Usage](#usage)
- [Advanced Features](#advanced-features)

## Introduction

this is the exam projekt for Pierre Zimmermann and Dimitrios Patsiomitros.

## Project Structure

The project follows a modular structure to organize code effectively. Key directories include:

- `src/app`: Contains the application components and services.
- `src/assets`: Stores static assets like images, styles, and fonts.
- `src/environments`: Configuration files for different environments (e.g., production, development).

## Components

### List Display Component

- Displays a paginated list of events.
- Supports filtering events by search query and category.
- Allows navigation to event editing and viewing pages.

### Event User Input Component

- Provides a form for creating new events.
- Supports event title, location, organizer, dates, times, categories, and more.

### Event Edit Component

- Allows users to edit existing events.

### Event Detail View Component

- Displays detailed information about a single event.
- Provides an option to upload and display event images.

### Category User Input Component

- Allows users to create new event categories.

### Categories Display Component

- Displays a paginated list of event categories.
- Supports filtering categories by search query.
- Provides options to delete categories.

## Installation

1. Clone the repository: `git clone https://github.com/PierreMarcelZimmermann/exam.git`
2. Navigate to the project directory: `cd angular-event-management-app`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `ng serve`
2. Open your browser and navigate to `http://localhost:4200`

## Advanced Features

In addition to the basic features mentioned above, the Angular Event Management Application also includes the following advanced features:

- Search bars for events and categories
- Pagination for events and categories
- Search filter for categories on events
- Easy and efficient navigation using Angular Routing
- Real-time Data Updates


Thank you for using this Angular Event Management Application!
