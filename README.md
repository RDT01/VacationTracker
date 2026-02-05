# VacationTracker

A comprehensive vacation planning and tracking application built with React. Track flights, hotels, and visualize your entire trip in a beautiful calendar interface.

![VacationTracker](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### ✈️ Flight Tracking
- Add flights with airline, flight number, airports, and times
- Autocomplete for 50+ major airlines worldwide
- Track departure and arrival times
- Store confirmation numbers
- Smart arrival time picker (starts from departure date)

### 🏨 Hotel Management
- Track hotel bookings with check-in/check-out dates
- Autocomplete for 50+ major hotel chains
- Store room types and addresses
- Confirmation number tracking

### 📅 Calendar View
- **Month-grid calendar layout** (landscape mode)
- **Color-coded events**:
  - 🔵 Blue: Flight departures
  - 🔷 Cyan: Flight arrivals
  - 🟢 Green: Hotel check-ins
  - 🟠 Orange: Hotel check-outs
  - 🟣 Purple background: Hotel stay days
- Navigate between months with Previous/Next buttons
- "Today" indicator highlighted
- Trip date range highlighting
- Shows up to 3 events per day with "+X more" indicator

### 📋 List View
- Traditional detailed list view of flights and hotels
- Edit and delete any booking
- View all details at a glance
- Quick add buttons for flights and hotels

### 💾 Data Persistence
- Automatically saves all trips to browser localStorage
- Data persists across sessions and page refreshes
- No server or account required

### 🎨 Modern UI/UX
- Clean, mobile-friendly interface
- **Bottom navigation**: Home, Trips, Calendar, Profile
- **Trips dropdown** in toolbar for quick access
- Toggle between List and Calendar views
- Responsive design optimized for mobile and desktop

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/RDT01/VacationTracker.git
cd VacationTracker
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Usage Guide

### Creating Your First Trip

1. Click the **"New Trip"** button
2. Enter your trip details:
   - Trip name (e.g., "Summer Vacation 2024")
   - Destination (autocomplete available)
   - Start and end dates
3. Click **"Create Trip"**

### Adding Flights

1. Open your trip
2. Click **"Add Flight"**
3. Fill in flight details:
   - Airline (autocomplete with major airlines)
   - Flight number
   - Departure airport (autocomplete with codes)
   - Arrival airport
   - Departure and arrival times
   - Confirmation number (optional)
4. Click **"Add Flight"**

### Adding Hotels

1. Open your trip
2. Click **"Add Hotel"**
3. Fill in hotel details:
   - Hotel name (autocomplete with major chains)
   - Address
   - Check-in and check-out dates
   - Room type (optional)
   - Confirmation number (optional)
4. Click **"Add Hotel"**

### Viewing Your Trip

- **List View**: Click "List View" to see detailed cards for each booking
- **Calendar View**: Click "Calendar View" to see your trip in a month grid
- **Quick Access**: Use the Calendar tab in bottom navigation or trips dropdown

## Tech Stack

- **React 18.2.0** - Frontend framework
- **Lucide React** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage API** - Client-side data persistence

## Project Structure

```
VacationTracker/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── VacationTracker.jsx     # Main application component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles + Tailwind
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## License

This project is licensed under the MIT License.

## Author

**RDT01**

---

Made with ❤️ for travelers everywhere
