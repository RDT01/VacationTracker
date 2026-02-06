import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calendar, Plane, Hotel, Plus, MapPin, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Trash2, Edit2, X, Home, Briefcase, User, CalendarDays, Download, Upload, Car, Ticket, Landmark, UtensilsCrossed, ShoppingBag, Star, Mic, DollarSign, Sun, Moon } from 'lucide-react';
import DateInput from './DateInput';

// Popular airlines
const AIRLINES = [
  'American Airlines', 'Delta Air Lines', 'United Airlines', 'Southwest Airlines', 'JetBlue Airways',
  'Alaska Airlines', 'Spirit Airlines', 'Frontier Airlines', 'Allegiant Air', 'Hawaiian Airlines',
  'Air Canada', 'WestJet', 'British Airways', 'Virgin Atlantic', 'Lufthansa',
  'Air France', 'KLM', 'Emirates', 'Qatar Airways', 'Etihad Airways',
  'Singapore Airlines', 'Cathay Pacific', 'Japan Airlines', 'ANA', 'Korean Air',
  'Qantas', 'Air New Zealand', 'Turkish Airlines', 'Swiss International', 'Iberia',
  'Alitalia', 'Aer Lingus', 'TAP Air Portugal', 'LOT Polish Airlines', 'Scandinavian Airlines',
  'Finnair', 'Icelandair', 'Norwegian Air', 'Ryanair', 'easyJet',
  'Vueling', 'Wizz Air', 'AirAsia', 'IndiGo', 'SpiceJet',
  'China Southern', 'China Eastern', 'Air China', 'EVA Air', 'Thai Airways'
];

// Popular hotel chains
const HOTEL_CHAINS = [
  'Marriott', 'Hilton', 'Hyatt', 'InterContinental', 'Four Seasons',
  'Ritz-Carlton', 'Waldorf Astoria', 'St. Regis', 'W Hotels', 'Westin',
  'Sheraton', 'Renaissance', 'Courtyard', 'Fairfield Inn', 'Residence Inn',
  'Hampton Inn', 'Holiday Inn', 'Holiday Inn Express', 'Crowne Plaza', 'Hotel Indigo',
  'Best Western', 'Radisson', 'Ramada', 'Days Inn', 'Super 8',
  'Motel 6', 'La Quinta', 'Comfort Inn', 'Quality Inn', 'Sleep Inn',
  'Clarion', 'Cambria', 'Choice Hotels', 'Wyndham', 'DoubleTree',
  'Embassy Suites', 'Homewood Suites', 'Home2 Suites', 'Tru by Hilton', 'Canopy by Hilton',
  'Kimpton', 'Andaz', 'Grand Hyatt', 'Park Hyatt', 'Hyatt Regency',
  'Hyatt Place', 'Hyatt House', 'Aloft', 'Element', 'Moxy',
  'AC Hotels', 'Autograph Collection', 'Tribute Portfolio', 'Curio Collection', 'The Luxury Collection',
  'Sofitel', 'Pullman', 'Novotel', 'Mercure', 'Ibis',
  'Accor', 'MGallery', 'Fairmont', 'Raffles', 'Swissôtel'
];

// Popular worldwide destinations
const DESTINATIONS = [
  'Paris, France', 'London, United Kingdom', 'New York, USA', 'Tokyo, Japan', 'Rome, Italy',
  'Barcelona, Spain', 'Amsterdam, Netherlands', 'Dubai, UAE', 'Singapore', 'Bangkok, Thailand',
  'Los Angeles, USA', 'Istanbul, Turkey', 'Berlin, Germany', 'Prague, Czech Republic', 'Vienna, Austria',
  'Athens, Greece', 'Sydney, Australia', 'Melbourne, Australia', 'Toronto, Canada', 'Vancouver, Canada',
  'Mexico City, Mexico', 'Cancun, Mexico', 'Rio de Janeiro, Brazil', 'Buenos Aires, Argentina', 'Lima, Peru',
  'Lisbon, Portugal', 'Madrid, Spain', 'Munich, Germany', 'Venice, Italy', 'Florence, Italy',
  'Edinburgh, United Kingdom', 'Dublin, Ireland', 'Reykjavik, Iceland', 'Copenhagen, Denmark', 'Stockholm, Sweden',
  'Oslo, Norway', 'Helsinki, Finland', 'Budapest, Hungary', 'Krakow, Poland', 'Warsaw, Poland',
  'Brussels, Belgium', 'Zurich, Switzerland', 'Geneva, Switzerland', 'Milan, Italy', 'Naples, Italy',
  'Seville, Spain', 'Valencia, Spain', 'Porto, Portugal', 'Nice, France', 'Lyon, France',
  'Marseille, France', 'Brussels, Belgium', 'Bruges, Belgium', 'Luxembourg City, Luxembourg',
  'Hong Kong', 'Shanghai, China', 'Beijing, China', 'Seoul, South Korea', 'Taipei, Taiwan',
  'Kuala Lumpur, Malaysia', 'Jakarta, Indonesia', 'Bali, Indonesia', 'Manila, Philippines', 'Hanoi, Vietnam',
  'Ho Chi Minh City, Vietnam', 'Phuket, Thailand', 'Mumbai, India', 'New Delhi, India', 'Bangalore, India',
  'Dubai, UAE', 'Abu Dhabi, UAE', 'Doha, Qatar', 'Tel Aviv, Israel', 'Jerusalem, Israel',
  'Cairo, Egypt', 'Marrakech, Morocco', 'Casablanca, Morocco', 'Cape Town, South Africa', 'Johannesburg, South Africa',
  'Nairobi, Kenya', 'Mauritius', 'Seychelles', 'Maldives', 'Bora Bora, French Polynesia',
  'Fiji', 'Auckland, New Zealand', 'Queenstown, New Zealand', 'Christchurch, New Zealand',
  'Las Vegas, USA', 'San Francisco, USA', 'Chicago, USA', 'Miami, USA', 'Orlando, USA',
  'Boston, USA', 'Seattle, USA', 'Washington DC, USA', 'Philadelphia, USA', 'San Diego, USA',
  'Denver, USA', 'Austin, USA', 'Nashville, USA', 'New Orleans, USA', 'Honolulu, USA',
  'Montreal, Canada', 'Calgary, Canada', 'Ottawa, Canada', 'Quebec City, Canada',
  'Havana, Cuba', 'Montego Bay, Jamaica', 'Nassau, Bahamas', 'Aruba', 'Barbados',
  'Saint Lucia', 'Turks and Caicos', 'Punta Cana, Dominican Republic', 'San Juan, Puerto Rico',
  'Cartagena, Colombia', 'Bogota, Colombia', 'Quito, Ecuador', 'Cusco, Peru', 'Santiago, Chile',
  'Sao Paulo, Brazil', 'Montevideo, Uruguay', 'Asuncion, Paraguay', 'La Paz, Bolivia'
];

// Common timezones for flight departure/arrival (IANA identifiers)
const TIMEZONES = [
  { id: '', label: 'Use browser timezone' },
  { id: 'America/New_York', label: 'Eastern (New York)' },
  { id: 'America/Chicago', label: 'Central (Chicago)' },
  { id: 'America/Denver', label: 'Mountain (Denver)' },
  { id: 'America/Los_Angeles', label: 'Pacific (Los Angeles)' },
  { id: 'America/Anchorage', label: 'Alaska (Anchorage)' },
  { id: 'Pacific/Honolulu', label: 'Hawaii (Honolulu)' },
  { id: 'America/Toronto', label: 'Eastern (Toronto)' },
  { id: 'America/Vancouver', label: 'Pacific (Vancouver)' },
  { id: 'Europe/London', label: 'London' },
  { id: 'Europe/Paris', label: 'Paris' },
  { id: 'Europe/Frankfurt', label: 'Frankfurt' },
  { id: 'Europe/Amsterdam', label: 'Amsterdam' },
  { id: 'Europe/Madrid', label: 'Madrid' },
  { id: 'Europe/Rome', label: 'Rome' },
  { id: 'Europe/Zurich', label: 'Zurich' },
  { id: 'Asia/Tokyo', label: 'Tokyo' },
  { id: 'Asia/Shanghai', label: 'Shanghai' },
  { id: 'Asia/Hong_Kong', label: 'Hong Kong' },
  { id: 'Asia/Singapore', label: 'Singapore' },
  { id: 'Asia/Seoul', label: 'Seoul' },
  { id: 'Asia/Dubai', label: 'Dubai' },
  { id: 'Asia/Bangkok', label: 'Bangkok' },
  { id: 'Australia/Sydney', label: 'Sydney' },
  { id: 'Australia/Melbourne', label: 'Melbourne' },
  { id: 'Pacific/Auckland', label: 'Auckland' }
];

// Budget categories - map to itinerary (flight, hotel, or activity type)
const BUDGET_CATEGORIES = [
  { id: 'flight', label: 'Flight', icon: Plane },
  { id: 'hotel', label: 'Hotel', icon: Hotel },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { id: 'tour', label: 'Tour', icon: Ticket },
  { id: 'museum', label: 'Museum', icon: Landmark },
  { id: 'travel', label: 'Travel', icon: Car },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'activity', label: 'Activity', icon: Star }
];

// Itinerary item types for dropdown
const ITEM_TYPES = [
  { id: 'flight', label: 'Flight', icon: Plane, color: 'blue' },
  { id: 'hotel', label: 'Hotel', icon: Hotel, color: 'purple' },
  { id: 'travel', label: 'Travel', icon: Car, color: 'emerald' },
  { id: 'tour', label: 'Tour', icon: Ticket, color: 'amber' },
  { id: 'museum', label: 'Museum', icon: Landmark, color: 'rose' },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed, color: 'orange' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'pink' },
  { id: 'activity', label: 'Activity', icon: Star, color: 'teal' }
];

// Major airport codes
const AIRPORTS = [
  { code: 'ATL', name: 'Atlanta (ATL)', city: 'Atlanta, GA' },
  { code: 'LAX', name: 'Los Angeles (LAX)', city: 'Los Angeles, CA' },
  { code: 'ORD', name: 'Chicago O\'Hare (ORD)', city: 'Chicago, IL' },
  { code: 'DFW', name: 'Dallas/Fort Worth (DFW)', city: 'Dallas, TX' },
  { code: 'DEN', name: 'Denver (DEN)', city: 'Denver, CO' },
  { code: 'JFK', name: 'New York JFK (JFK)', city: 'New York, NY' },
  { code: 'SFO', name: 'San Francisco (SFO)', city: 'San Francisco, CA' },
  { code: 'SEA', name: 'Seattle (SEA)', city: 'Seattle, WA' },
  { code: 'LAS', name: 'Las Vegas (LAS)', city: 'Las Vegas, NV' },
  { code: 'MCO', name: 'Orlando (MCO)', city: 'Orlando, FL' },
  { code: 'MIA', name: 'Miami (MIA)', city: 'Miami, FL' },
  { code: 'CLT', name: 'Charlotte (CLT)', city: 'Charlotte, NC' },
  { code: 'PHX', name: 'Phoenix (PHX)', city: 'Phoenix, AZ' },
  { code: 'EWR', name: 'Newark (EWR)', city: 'Newark, NJ' },
  { code: 'MSP', name: 'Minneapolis (MSP)', city: 'Minneapolis, MN' },
  { code: 'BOS', name: 'Boston (BOS)', city: 'Boston, MA' },
  { code: 'DTW', name: 'Detroit (DTW)', city: 'Detroit, MI' },
  { code: 'PHL', name: 'Philadelphia (PHL)', city: 'Philadelphia, PA' },
  { code: 'LGA', name: 'New York LaGuardia (LGA)', city: 'New York, NY' },
  { code: 'FLL', name: 'Fort Lauderdale (FLL)', city: 'Fort Lauderdale, FL' },
  { code: 'BWI', name: 'Baltimore (BWI)', city: 'Baltimore, MD' },
  { code: 'IAD', name: 'Washington Dulles (IAD)', city: 'Washington, DC' },
  { code: 'DCA', name: 'Washington National (DCA)', city: 'Washington, DC' },
  { code: 'SAN', name: 'San Diego (SAN)', city: 'San Diego, CA' },
  { code: 'TPA', name: 'Tampa (TPA)', city: 'Tampa, FL' },
  { code: 'PDX', name: 'Portland (PDX)', city: 'Portland, OR' },
  { code: 'HNL', name: 'Honolulu (HNL)', city: 'Honolulu, HI' },
  { code: 'YYZ', name: 'Toronto (YYZ)', city: 'Toronto, Canada' },
  { code: 'YVR', name: 'Vancouver (YVR)', city: 'Vancouver, Canada' },
  { code: 'YUL', name: 'Montreal (YUL)', city: 'Montreal, Canada' },
  { code: 'LHR', name: 'London Heathrow (LHR)', city: 'London, UK' },
  { code: 'LGW', name: 'London Gatwick (LGW)', city: 'London, UK' },
  { code: 'CDG', name: 'Paris Charles de Gaulle (CDG)', city: 'Paris, France' },
  { code: 'ORY', name: 'Paris Orly (ORY)', city: 'Paris, France' },
  { code: 'AMS', name: 'Amsterdam (AMS)', city: 'Amsterdam, Netherlands' },
  { code: 'FRA', name: 'Frankfurt (FRA)', city: 'Frankfurt, Germany' },
  { code: 'MUC', name: 'Munich (MUC)', city: 'Munich, Germany' },
  { code: 'FCO', name: 'Rome (FCO)', city: 'Rome, Italy' },
  { code: 'BCN', name: 'Barcelona (BCN)', city: 'Barcelona, Spain' },
  { code: 'MAD', name: 'Madrid (MAD)', city: 'Madrid, Spain' },
  { code: 'DXB', name: 'Dubai (DXB)', city: 'Dubai, UAE' },
  { code: 'SIN', name: 'Singapore (SIN)', city: 'Singapore' },
  { code: 'HKG', name: 'Hong Kong (HKG)', city: 'Hong Kong' },
  { code: 'NRT', name: 'Tokyo Narita (NRT)', city: 'Tokyo, Japan' },
  { code: 'HND', name: 'Tokyo Haneda (HND)', city: 'Tokyo, Japan' },
  { code: 'ICN', name: 'Seoul Incheon (ICN)', city: 'Seoul, South Korea' },
  { code: 'BKK', name: 'Bangkok (BKK)', city: 'Bangkok, Thailand' },
  { code: 'SYD', name: 'Sydney (SYD)', city: 'Sydney, Australia' },
  { code: 'MEL', name: 'Melbourne (MEL)', city: 'Melbourne, Australia' },
  { code: 'AKL', name: 'Auckland (AKL)', city: 'Auckland, New Zealand' },
  { code: 'DOH', name: 'Doha (DOH)', city: 'Doha, Qatar' },
  { code: 'IST', name: 'Istanbul (IST)', city: 'Istanbul, Turkey' },
  { code: 'ZRH', name: 'Zurich (ZRH)', city: 'Zurich, Switzerland' },
  { code: 'VIE', name: 'Vienna (VIE)', city: 'Vienna, Austria' },
  { code: 'CPH', name: 'Copenhagen (CPH)', city: 'Copenhagen, Denmark' },
  { code: 'ARN', name: 'Stockholm (ARN)', city: 'Stockholm, Sweden' },
  { code: 'OSL', name: 'Oslo (OSL)', city: 'Oslo, Norway' },
  { code: 'HEL', name: 'Helsinki (HEL)', city: 'Helsinki, Finland' },
  { code: 'ATH', name: 'Athens (ATH)', city: 'Athens, Greece' },
  { code: 'LIS', name: 'Lisbon (LIS)', city: 'Lisbon, Portugal' },
  { code: 'DUB', name: 'Dublin (DUB)', city: 'Dublin, Ireland' },
  { code: 'BRU', name: 'Brussels (BRU)', city: 'Brussels, Belgium' },
  { code: 'PRG', name: 'Prague (PRG)', city: 'Prague, Czech Republic' },
  { code: 'BUD', name: 'Budapest (BUD)', city: 'Budapest, Hungary' },
  { code: 'WAW', name: 'Warsaw (WAW)', city: 'Warsaw, Poland' },
  { code: 'KEF', name: 'Reykjavik (KEF)', city: 'Reykjavik, Iceland' },
  { code: 'GRU', name: 'Sao Paulo (GRU)', city: 'Sao Paulo, Brazil' },
  { code: 'GIG', name: 'Rio de Janeiro (GIG)', city: 'Rio de Janeiro, Brazil' },
  { code: 'EZE', name: 'Buenos Aires (EZE)', city: 'Buenos Aires, Argentina' },
  { code: 'MEX', name: 'Mexico City (MEX)', city: 'Mexico City, Mexico' },
  { code: 'CUN', name: 'Cancun (CUN)', city: 'Cancun, Mexico' },
  { code: 'LIM', name: 'Lima (LIM)', city: 'Lima, Peru' },
  { code: 'BOG', name: 'Bogota (BOG)', city: 'Bogota, Colombia' },
  { code: 'SCL', name: 'Santiago (SCL)', city: 'Santiago, Chile' },
  { code: 'DEL', name: 'New Delhi (DEL)', city: 'New Delhi, India' },
  { code: 'BOM', name: 'Mumbai (BOM)', city: 'Mumbai, India' },
  { code: 'PVG', name: 'Shanghai Pudong (PVG)', city: 'Shanghai, China' },
  { code: 'PEK', name: 'Beijing Capital (PEK)', city: 'Beijing, China' },
  { code: 'KUL', name: 'Kuala Lumpur (KUL)', city: 'Kuala Lumpur, Malaysia' },
  { code: 'CGK', name: 'Jakarta (CGK)', city: 'Jakarta, Indonesia' },
  { code: 'DPS', name: 'Bali (DPS)', city: 'Bali, Indonesia' },
  { code: 'MNL', name: 'Manila (MNL)', city: 'Manila, Philippines' },
  { code: 'SGN', name: 'Ho Chi Minh City (SGN)', city: 'Ho Chi Minh City, Vietnam' },
  { code: 'HAN', name: 'Hanoi (HAN)', city: 'Hanoi, Vietnam' },
  { code: 'CAI', name: 'Cairo (CAI)', city: 'Cairo, Egypt' },
  { code: 'JNB', name: 'Johannesburg (JNB)', city: 'Johannesburg, South Africa' },
  { code: 'CPT', name: 'Cape Town (CPT)', city: 'Cape Town, South Africa' }
];

// Calendar View Component - Month Grid Layout
// Compute first and last dates from all itinerary items (flights, hotels, activities)
function getTripDateRangeFromItems(trip) {
  const dates = [];
  (trip.flights || []).forEach(f => {
    if (f.departureTime) {
      const s = String(f.departureTime);
      dates.push(s.includes('T') ? s.split('T')[0] : s);
    }
    if (f.arrivalTime) {
      const s = String(f.arrivalTime);
      dates.push(s.includes('T') ? s.split('T')[0] : s);
    }
  });
  (trip.hotels || []).forEach(h => {
    if (h.checkInDate) dates.push(h.checkInDate);
    if (h.checkOutDate) dates.push(h.checkOutDate);
  });
  (trip.activities || []).forEach(a => {
    if (a.date) dates.push(a.date);
  });
  if (dates.length === 0) return null;
  dates.sort();
  return { first: dates[0], last: dates[dates.length - 1] };
}

function CalendarView({ trip, onEditItem, onDeleteItem, formatDate }) {
  const activityRange = getTripDateRangeFromItems(trip);
  const [viewMode, setViewMode] = useState(() => {
    if (trip.startDate && trip.endDate) return 'tripDates';
    if (activityRange) return 'customRange';
    return 'month';
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (activityRange) {
      return new Date(activityRange.first + 'T12:00:00');
    }
    if (trip.startDate) {
      return new Date(trip.startDate);
    }
    return new Date();
  });
  const [customRangeStart, setCustomRangeStart] = useState(() => {
    if (activityRange) return activityRange.first;
    return trip.startDate || new Date().toISOString().split('T')[0];
  });
  const [customRangeEnd, setCustomRangeEnd] = useState(() => {
    if (activityRange) return activityRange.last;
    return trip.endDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  });
  const [selectedBar, setSelectedBar] = useState(null);

  // Generate calendar grid for the month
  const generateMonthGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = lastDay.getDate();
    
    const grid = [];
    let week = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      week.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      
      if (week.length === 7) {
        grid.push(week);
        week = [];
      }
    }
    
    // Add remaining empty cells
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      grid.push(week);
    }
    
    return grid;
  };

  // Parse YYYY-MM-DD string as local date (new Date(str) treats it as UTC midnight)
  const parseLocalDate = (str) => new Date(str + 'T12:00:00');

  // Generate calendar grid for custom date range
  const generateCustomRangeGrid = () => {
    const start = parseLocalDate(customRangeStart);
    const end = parseLocalDate(customRangeEnd);
    if (start > end) return [];

    const startDayOfWeek = start.getDay();
    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - startDayOfWeek);

    const endDayOfWeek = end.getDay();
    const gridEnd = new Date(end);
    gridEnd.setDate(end.getDate() + (6 - endDayOfWeek));

    const grid = [];
    let week = [];
    const current = new Date(gridStart);

    while (current <= gridEnd) {
      week.push(new Date(current.getTime()));
      if (week.length === 7) {
        grid.push(week);
        week = [];
      }
      current.setDate(current.getDate() + 1);
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      grid.push(week);
    }

    return grid;
  };

  // Check if date is in custom range (for highlighting)
  const isInCustomRange = (date) => {
    if (!date || !customRangeStart || !customRangeEnd) return false;
    const dateStr = toLocalDateStr(date);
    return dateStr >= customRangeStart && dateStr <= customRangeEnd;
  };

  // Use local date string for calendar comparisons (avoids UTC timezone bugs)
  const toLocalDateStr = (d) => {
    const date = d instanceof Date ? d : new Date(d);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // Parse flight datetime to date string - uses timezone when set to get correct local date
  const getFlightDateStr = (dateTimeStr, timezone) => {
    if (!dateTimeStr) return null;
    const str = String(dateTimeStr);
    const d = str.includes('T') ? new Date(str) : new Date(str + 'T12:00:00');
    if (timezone) {
      return d.toLocaleDateString('en-CA', { timeZone: timezone }); // YYYY-MM-DD
    }
    if (str.includes('T')) return str.split('T')[0];
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    return toLocalDateStr(d);
  };

  // Get entry datetime for sorting (earlier = displayed first when overlapping)
  const getBarEntrySortKey = (bar) => {
    const item = bar.item;
    if (bar.type === 'flight' && item.departureTime) {
      return item.departureTime.includes('T') ? item.departureTime : item.departureTime + 'T00:00';
    }
    if (bar.type === 'hotel' && item.checkInDate) return item.checkInDate + 'T00:00';
    if (bar.type && item.date) {
      const t = (item.timeFrom || '00:00').trim();
      const m = t.match(/^(\d{1,2}):(\d{2})$/);
      const timeStr = m ? `${String(parseInt(m[1], 10)).padStart(2, '0')}:${m[2]}` : '00:00';
      return item.date + 'T' + timeStr;
    }
    return '9999-99-99T23:59';
  };

  // Get spanning bars for a week - single chip per flight/hotel spanning its column range
  const getSpanningBarsForWeek = (week) => {
    const bars = [];
    const colDateStrs = week.map(d => d ? toLocalDateStr(d) : null);
    
    // Flights
    trip.flights.forEach(flight => {
      const depDate = getFlightDateStr(flight.departureTime, flight.departureTimezone);
      const arrDate = getFlightDateStr(flight.arrivalTime, flight.arrivalTimezone) || depDate;
      if (!depDate) return;
      
      let startCol = 7, endCol = -1;
      for (let c = 0; c < 7; c++) {
        const dateStr = colDateStrs[c];
        if (!dateStr) continue;
        if (dateStr >= depDate && dateStr <= arrDate) {
          startCol = Math.min(startCol, c);
          endCol = Math.max(endCol, c);
        }
      }
      if (endCol < 0) return;
      
      const route = flight.arrivalAirport
        ? `${flight.departureAirport || '?'} → ${flight.arrivalAirport}`
        : flight.departureAirport || '';
      const flightDisplayText = flight.itemName?.trim() || `${flight.airline} ${flight.flightNumber}${route ? ` ${route}` : ''}`;
      
      bars.push({
        id: `flight-${flight.id}`,
        type: 'flight',
        displayText: flightDisplayText,
        color: 'blue',
        startCol,
        endCol: endCol + 1,
        item: flight
      });
    });
    
    // Hotels
    trip.hotels.forEach(hotel => {
      if (!hotel.checkInDate || !hotel.checkOutDate) return;
      
      let startCol = 7, endCol = -1;
      for (let c = 0; c < 7; c++) {
        const dateStr = colDateStrs[c];
        if (!dateStr) continue;
        if (dateStr >= hotel.checkInDate && dateStr <= hotel.checkOutDate) {
          startCol = Math.min(startCol, c);
          endCol = Math.max(endCol, c);
        }
      }
      if (endCol < 0) return;
      
      const hotelDisplayText = hotel.itemName?.trim() || hotel.hotelName;
      
      bars.push({
        id: `hotel-${hotel.id}`,
        type: 'hotel',
        displayText: hotelDisplayText,
        color: 'purple',
        startCol,
        endCol: endCol + 1,
        item: hotel
      });
    });
    
    // Activities (travel, tour, museum, restaurant, shopping, activity) - single day
    (trip.activities || []).forEach(activity => {
      if (!activity.date) return;
      const activityDate = activity.date;
      let startCol = -1;
      for (let c = 0; c < 7; c++) {
        if (colDateStrs[c] === activityDate) {
          startCol = c;
          break;
        }
      }
      if (startCol < 0) return;
      
      const typeConfig = getItemTypeConfig(trip, activity.type);
      const displayText = activity.itemName?.trim() || activity.name || activity.type;
      bars.push({
        id: `activity-${activity.id}`,
        type: activity.type,
        displayText,
        color: typeConfig?.color || 'teal',
        startCol,
        endCol: startCol + 1,
        item: activity
      });
    });
    
    // Sort by day (startCol), then by entry time/date
    bars.forEach(b => { b._sortKey = getBarEntrySortKey(b); });
    bars.sort((a, b) => {
      if (a.startCol !== b.startCol) return a.startCol - b.startCol;
      return a._sortKey.localeCompare(b._sortKey);
    });
    // Assign lanes: pack overlapping bars into adjacent rows so they touch (no gaps per column)
    // Two bars overlap if their column ranges intersect
    const lanes = []; // lanes[i] = list of bar indices in lane i
    bars.forEach((bar, idx) => {
      let lane = 0;
      while (true) {
        let conflicts = false;
        const existing = lanes[lane] || [];
        for (const otherIdx of existing) {
          const other = bars[otherIdx];
          // Overlap if column ranges intersect
          if (bar.startCol < other.endCol && other.startCol < bar.endCol) {
            conflicts = true;
            break;
          }
        }
        if (!conflicts) break;
        lane++;
      }
      if (!lanes[lane]) lanes[lane] = [];
      lanes[lane].push(idx);
      bar._lane = lane;
    });
    return bars;
  };

  // Check if date is within a flight span (departure through arrival, inclusive)
  const isFlightSpanDay = (date) => {
    if (!date) return null;
    const dateStr = toLocalDateStr(date);
    return trip.flights.find(flight => {
      const depDate = getFlightDateStr(flight.departureTime, flight.departureTimezone);
      const arrDate = getFlightDateStr(flight.arrivalTime, flight.arrivalTimezone) || depDate;
      if (!depDate) return false;
      return dateStr >= depDate && dateStr <= arrDate;
    });
  };

  // Check if date is within hotel stay (check-in through check-out, inclusive)
  const isHotelStayDay = (date) => {
    if (!date) return null;
    const dateStr = toLocalDateStr(date);
    return trip.hotels.find(hotel => {
      if (!hotel.checkInDate || !hotel.checkOutDate) return false;
      return dateStr >= hotel.checkInDate && dateStr <= hotel.checkOutDate;
    });
  };

  // Check if date is in trip range
  const isInTripRange = (date) => {
    if (!date || !trip.startDate || !trip.endDate) return false;
    const dateStr = toLocalDateStr(date);
    return dateStr >= trip.startDate && dateStr <= trip.endDate;
  };

  // Generate grid for trip dates (startDate to endDate)
  const generateTripDatesGrid = () => {
    if (!trip.startDate || !trip.endDate) return [];
    const start = parseLocalDate(trip.startDate);
    const end = parseLocalDate(trip.endDate);
    if (start > end) return [];
    const startDayOfWeek = start.getDay();
    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - startDayOfWeek);
    const endDayOfWeek = end.getDay();
    const gridEnd = new Date(end);
    gridEnd.setDate(end.getDate() + (6 - endDayOfWeek));
    const grid = [];
    let week = [];
    const current = new Date(gridStart);
    while (current <= gridEnd) {
      week.push(new Date(current.getTime()));
      if (week.length === 7) {
        grid.push(week);
        week = [];
      }
      current.setDate(current.getDate() + 1);
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      grid.push(week);
    }
    return grid;
  };

  const monthGrid = generateMonthGrid();
  const customRangeGrid = generateCustomRangeGrid();
  const tripDatesGrid = generateTripDatesGrid();
  const displayGrid = viewMode === 'month' ? monthGrid : viewMode === 'tripDates' ? tripDatesGrid : customRangeGrid;
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const rangeLabel = viewMode === 'tripDates'
    ? `${formatDate(trip.startDate)} – ${formatDate(trip.endDate)}`
    : viewMode === 'customRange'
      ? `${formatDate(customRangeStart)} – ${formatDate(customRangeEnd)}`
      : monthName;
  const today = toLocalDateStr(new Date());
  const showInRangeHighlight = viewMode === 'tripDates' ? isInTripRange : viewMode === 'customRange' ? isInCustomRange : isInTripRange;

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    if (viewMode === 'tripDates') return;
    const today = new Date();
    setCurrentMonth(today);
    if (viewMode === 'customRange') {
      const rangeDays = Math.ceil((new Date(customRangeEnd) - new Date(customRangeStart)) / (24 * 60 * 60 * 1000));
      const start = new Date(today);
      const end = new Date(today);
      end.setDate(end.getDate() + Math.max(0, rangeDays));
      setCustomRangeStart(start.toISOString().split('T')[0]);
      setCustomRangeEnd(end.toISOString().split('T')[0]);
    }
  };

  const fmtDateTime = (str, tz) => {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short', timeZone: tz || undefined });
  };

  const getCalendarItemTooltip = (bar) => {
    const item = bar.item;
    const lines = [];
    const add = (label, val) => { if (val != null && String(val).trim()) lines.push(`${label}: ${String(val).trim()}`); };
    if (bar.type === 'flight') {
      add('Airline', item.airline);
      add('Flight', item.flightNumber);
      add('Departure', item.departureAirport);
      if (item.departureTime) add('Departure time', fmtDateTime(item.departureTime, item.departureTimezone));
      add('Arrival', item.arrivalAirport);
      if (item.arrivalTime) add('Arrival time', fmtDateTime(item.arrivalTime, item.arrivalTimezone));
      add('Confirmation', item.confirmationNumber);
      add('Price', item.price);
    } else if (bar.type === 'hotel') {
      add('Hotel', item.hotelName);
      add('Check-in', item.checkInDate && formatDate(item.checkInDate));
      add('Check-out', item.checkOutDate && formatDate(item.checkOutDate));
      add('Room', item.roomType);
      add('Address', item.address);
      add('Confirmation', item.confirmationNumber);
      add('Price', item.price);
    } else {
      const typeLabel = getItemTypeConfig(trip, bar.type)?.label || bar.type;
      add('Type', typeLabel);
      add('Name', item.itemName || item.name);
      add('Date', item.date && formatDate(item.date));
      add('Time', item.timeFrom ? (item.timeTo ? `${item.timeFrom} – ${item.timeTo}` : item.timeFrom) : null);
      add('Address', item.address);
      add('Price', item.price);
      add('Confirmation', item.confirmationNumber);
      add('URL', item.url);
      add('Notes', item.notes);
    }
    return lines.length ? lines.join('\n') : bar.displayText;
  };

  const getEventColor = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      purple: 'bg-purple-500 text-white',
      emerald: 'bg-emerald-500 text-white',
      amber: 'bg-amber-500 text-white',
      rose: 'bg-rose-500 text-white',
      orange: 'bg-orange-500 text-white',
      pink: 'bg-pink-500 text-white',
      teal: 'bg-teal-500 text-white',
      cyan: 'bg-cyan-500 text-white',
      green: 'bg-green-500 text-white',
      red: 'bg-red-500 text-white',
      yellow: 'bg-yellow-500 text-gray-900'
    };
    return colors[color] || 'bg-gray-500 text-white';
  };

  const goToPreviousRange = () => {
    if (viewMode === 'tripDates') return;
    if (viewMode === 'customRange') {
      const start = new Date(customRangeStart);
      const end = new Date(customRangeEnd);
      const days = Math.ceil((end - start) / (24 * 60 * 60 * 1000)) + 1;
      start.setDate(start.getDate() - days);
      end.setDate(end.getDate() - days);
      setCustomRangeStart(start.toISOString().split('T')[0]);
      setCustomRangeEnd(end.toISOString().split('T')[0]);
    } else {
      goToPreviousMonth();
    }
  };

  const goToNextRange = () => {
    if (viewMode === 'tripDates') return;
    if (viewMode === 'customRange') {
      const start = new Date(customRangeStart);
      const end = new Date(customRangeEnd);
      const days = Math.ceil((end - start) / (24 * 60 * 60 * 1000)) + 1;
      start.setDate(start.getDate() + days);
      end.setDate(end.getDate() + days);
      setCustomRangeStart(start.toISOString().split('T')[0]);
      setCustomRangeEnd(end.toISOString().split('T')[0]);
    } else {
      goToNextMonth();
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col gap-4">
          {/* View mode toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            {trip.startDate && trip.endDate && (
              <button
                onClick={() => setViewMode('tripDates')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  viewMode === 'tripDates'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trip Dates
              </button>
            )}
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                viewMode === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month View
            </button>
            <button
              onClick={() => setViewMode('customRange')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                viewMode === 'customRange'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Custom Range
            </button>
          </div>

          {/* Custom range date pickers */}
          {viewMode === 'customRange' && (
            <div className="flex items-center gap-4 flex-wrap">
              <div className="min-w-[180px]">
                <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                <DateInput
                  value={customRangeStart}
                  onChange={setCustomRangeStart}
                />
              </div>
              <div className="min-w-[180px]">
                <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                <DateInput
                  value={customRangeEnd}
                  onChange={setCustomRangeEnd}
                  minDate={customRangeStart}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{rangeLabel}</h2>
            {viewMode !== 'tripDates' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousRange}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Today
                </button>
                <button
                  onClick={goToNextRange}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend - only show item types that exist in the trip */}
      {(() => {
        const legendItems = [];
        if ((trip.flights || []).length > 0) {
          legendItems.push({ id: 'flight', label: 'Flight', color: 'blue' });
        }
        if ((trip.hotels || []).length > 0) {
          legendItems.push({ id: 'hotel', label: 'Hotel Stay', color: 'purple' });
        }
        const activityTypes = [...new Set((trip.activities || []).map(a => a.type).filter(Boolean))];
        activityTypes.forEach(typeId => {
          const config = getItemTypeConfig(trip, typeId);
          if (config && !legendItems.some(i => i.id === typeId)) {
            legendItems.push({ id: config.id, label: config.label, color: config.color });
          }
        });
        if (legendItems.length === 0) return null;
        return (
          <div className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-wrap gap-4 text-sm">
              {legendItems.map(item => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${getEventColor(item.color).split(' ')[0]}`}></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-visible">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-200 dark:border-gray-500">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-1.5 text-center font-semibold text-gray-700 text-xs">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        {displayGrid.map((week, weekIdx) => {
          const spanningBars = getSpanningBarsForWeek(week);
          const maxLane = spanningBars.length > 0 ? Math.max(...spanningBars.map(b => b._lane ?? 0)) : 0;
          const numLanes = maxLane + 1;
          return (
            <div
              key={weekIdx}
              className="relative grid grid-cols-7 border-b border-gray-200 dark:border-gray-500 last:border-b-0 overflow-visible min-h-[48px] gap-y-0.5"
              style={{ gridTemplateRows: spanningBars.length > 0 ? `auto repeat(${numLanes}, 16px)` : 'auto 1fr' }}
            >
              {/* Vertical dividers - full height between columns */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={`vdiv-${weekIdx}-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-500 pointer-events-none"
                  style={{ left: `${(i / 7) * 100}%` }}
                />
              ))}
              {week.map((date, dayIdx) => {
                const dateStr = date ? toLocalDateStr(date) : null;
                const isToday = dateStr === today;
                const inRange = date && showInRangeHighlight(date);
                const hotelStay = date ? isHotelStayDay(date) : null;
                const flightSpan = date ? isFlightSpanDay(date) : null;
                return (
                  <div
                    key={dayIdx}
                    className={`p-1 min-h-[24px] ${
                      !date ? 'bg-gray-50' : ''
                    } ${inRange ? 'bg-indigo-50/30' : ''} ${hotelStay ? 'bg-purple-100/60' : ''} ${flightSpan ? 'bg-blue-100/60' : ''}`}
                    style={{ gridColumn: dayIdx + 1, gridRow: 1 }}
                  >
                    {date && (
                      <div className={`text-right ${
                        isToday 
                          ? 'w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center ml-auto font-bold text-xs' 
                          : 'text-gray-900 font-medium text-xs'
                      }`}>
                        {date.getDate()}
                      </div>
                    )}
                  </div>
                );
              })}
              {spanningBars.map((bar, barIdx) => (
                <div
                  key={bar.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedBar(prev => prev?.id === bar.id ? null : bar)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedBar(prev => prev?.id === bar.id ? null : bar)}
                  className={`text-[10px] px-1.5 py-0.5 rounded flex items-center h-full min-h-0 min-w-0 overflow-hidden break-words cursor-pointer hover:opacity-90 active:opacity-80 border transition-all group/bar relative ${selectedBar?.id === bar.id ? 'ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-gray-900 border-indigo-500 dark:border-indigo-400 scale-[1.02] shadow-md' : 'border-gray-300 dark:border-gray-400'} ${getEventColor(bar.color)}`}
                  style={{
                    gridColumn: `${bar.startCol + 1} / ${bar.endCol + 1}`,
                    gridRow: (bar._lane ?? barIdx) + 2
                  }}
                  title="Click to view details"
                >
                  <span className="min-w-0 truncate flex-1">{bar.displayText}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Item detail popover - shown on click */}
      {selectedBar && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setSelectedBar(null)} aria-hidden="true" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-indigo-500 dark:border-indigo-400 max-w-[200px] w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 overflow-y-auto flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{selectedBar.displayText}</h3>
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">{getCalendarItemTooltip(selectedBar)}</pre>
              </div>
              <div className="flex gap-2 p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
                <button
                  onClick={() => {
                    onEditItem(selectedBar.item);
                    setSelectedBar(null);
                  }}
                  className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    onDeleteItem(selectedBar.item.id, selectedBar.type);
                    setSelectedBar(null);
                  }}
                  className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Parse price string to number: "$50", "€30", "100.50" -> 50, 30, 100.5
const parsePrice = (str) => {
  if (!str || typeof str !== 'string') return 0;
  const cleaned = str.replace(/[$,€£¥\s]/g, '');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
};

// Restrict input to digits and at most one decimal point
const sanitizeAmountInput = (v) => {
  let s = String(v).replace(/[^\d.]/g, '');
  const parts = s.split('.');
  if (parts.length > 1) s = parts[0] + '.' + parts.slice(1).join('');
  return s;
};

// Slug for custom category id (lowercase, spaces to dashes)
const toSlug = (s) => (s || '').trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'custom';

// Resolve type config for display (supports custom categories)
const getItemTypeConfig = (trip, typeId) => {
  const fromTypes = ITEM_TYPES.find(t => t.id === typeId);
  if (fromTypes) return fromTypes;
  const fromCustom = (trip?.customCategories || []).find(c => c.id === typeId);
  if (fromCustom) return { id: fromCustom.id, label: fromCustom.label, icon: Star, color: 'teal' };
  return { id: typeId, label: typeId, icon: Star, color: 'teal' };
};

// Get actual spent for a category from trip itinerary items
const getActualForCategory = (trip, categoryId) => {
  if (categoryId === 'flight') {
    return (trip.flights || []).reduce((sum, f) => sum + parsePrice(f.price), 0);
  }
  if (categoryId === 'hotel') {
    return (trip.hotels || []).reduce((sum, h) => sum + parsePrice(h.price), 0);
  }
  return (trip.activities || [])
    .filter(a => a.type === categoryId)
    .reduce((sum, a) => sum + parsePrice(a.price), 0);
};

// Compute cost totals by type from a trip
const getTripCostBreakdown = (trip) => {
  const byType = {};
  let total = 0;
  (trip.flights || []).forEach(f => {
    const p = parsePrice(f.price);
    if (p > 0) {
      byType['Flight'] = (byType['Flight'] || 0) + p;
      total += p;
    }
  });
  (trip.hotels || []).forEach(h => {
    const p = parsePrice(h.price);
    if (p > 0) {
      byType['Hotel'] = (byType['Hotel'] || 0) + p;
      total += p;
    }
  });
  (trip.activities || []).forEach(a => {
    const p = parsePrice(a.price);
    if (p > 0) {
      const label = getItemTypeConfig(trip, a.type)?.label || a.type || 'Activity';
      byType[label] = (byType[label] || 0) + p;
      total += p;
    }
  });
  return { total, byType, pieData: Object.entries(byType).map(([name, value]) => ({ name, value })) };
};

// Aggregate costs and budgets across all trips
const getAllTripsCostBreakdown = (trips) => {
  let total = 0;
  const byType = {};
  trips.forEach(trip => {
    const { total: tTotal, byType: tByType } = getTripCostBreakdown(trip);
    total += tTotal;
    Object.entries(tByType).forEach(([k, v]) => { byType[k] = (byType[k] || 0) + v; });
  });
  const pieData = Object.entries(byType).map(([name, value]) => ({ name, value }));
  const totalBudget = trips.reduce((sum, t) => sum + (parsePrice(String(t.budget || '')) || 0), 0);
  return { total, byType, pieData, totalBudget };
};

// Default trip - loaded when app has no saved data. Contains all itinerary items created to date.
const DEFAULT_TRIP_SEED = {
  id: 1,
  name: 'Tersigni Italy Trip',
  destination: 'Italy',
  budgetItems: [
    { id: 1, category: 'flight', amount: 2000 },
    { id: 2, category: 'hotel', amount: 1500 },
    { id: 3, category: 'restaurant', amount: 500 }
  ],
  startDate: '2025-07-09',
  endDate: '2025-07-16',
  flights: [
    {
      id: 1001,
      type: 'flight',
      itemName: 'Flight to Rome',
      airline: 'United Airlines',
      flightNumber: 'UA123',
      departureAirport: 'ORD',
      arrivalAirport: 'FCO',
      departureTime: '2025-07-09T08:00',
      arrivalTime: '2025-07-09T22:30',
      departureTimezone: 'America/Chicago',
      arrivalTimezone: 'Europe/Rome',
      confirmationNumber: '',
      price: '850'
    },
    {
      id: 1002,
      type: 'flight',
      itemName: 'Flight home',
      airline: 'United Airlines',
      flightNumber: 'UA456',
      departureAirport: 'FCO',
      arrivalAirport: 'ORD',
      departureTime: '2025-07-16T10:00',
      arrivalTime: '2025-07-16T14:30',
      departureTimezone: 'Europe/Rome',
      arrivalTimezone: 'America/Chicago',
      confirmationNumber: '',
      price: '850'
    }
  ],
  hotels: [
    {
      id: 2001,
      type: 'hotel',
      itemName: '',
      hotelName: 'Hotel Roma',
      checkInDate: '2025-07-09',
      checkOutDate: '2025-07-16',
      address: '',
      roomType: '',
      confirmationNumber: '',
      price: '1200'
    }
  ],
  activities: [
    { id: 3001, type: 'restaurant', itemName: 'Dinner Placeholder', name: 'Dinner Placeholder', date: '2025-07-09', timeFrom: '19:00', timeTo: '', address: '', price: '50', confirmationNumber: '', url: '', notes: '' },
    { id: 3002, type: 'restaurant', itemName: 'Dinner Placeholder', name: 'Dinner Placeholder', date: '2025-07-10', timeFrom: '19:00', timeTo: '', address: '', price: '', confirmationNumber: '', url: '', notes: '' },
    { id: 3003, type: 'restaurant', itemName: 'Dinner Placeholder', name: 'Dinner Placeholder', date: '2025-07-11', timeFrom: '19:00', timeTo: '', address: '', price: '', confirmationNumber: '', url: '', notes: '' },
    { id: 3004, type: 'restaurant', itemName: 'Dinner Placeholder', name: 'Dinner Placeholder', date: '2025-07-12', timeFrom: '19:00', timeTo: '', address: '', price: '', confirmationNumber: '', url: '', notes: '' },
    { id: 3005, type: 'restaurant', itemName: 'Dinner Placeholder', name: 'Dinner Placeholder', date: '2025-07-13', timeFrom: '19:00', timeTo: '', address: '', price: '', confirmationNumber: '', url: '', notes: '' },
    { id: 3006, type: 'restaurant', itemName: 'Dinner Placeholder', name: 'Dinner Placeholder', date: '2025-07-14', timeFrom: '19:00', timeTo: '', address: '', price: '', confirmationNumber: '', url: '', notes: '' },
    { id: 3007, type: 'restaurant', itemName: 'Dinner Placeholder', name: 'Dinner Placeholder', date: '2025-07-15', timeFrom: '19:00', timeTo: '', address: '', price: '', confirmationNumber: '', url: '', notes: '' }
  ]
};

// Deep clone so each new instance gets an independent copy
const getDefaultTrip = () => JSON.parse(JSON.stringify(DEFAULT_TRIP_SEED));

export default function VacationTracker() {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('tripTrackerTrips');
    const parsed = savedTrips ? JSON.parse(savedTrips) : [];
    const normalized = parsed.length > 0
      ? parsed.map(t => ({ ...t, activities: t.activities || [], budgetItems: t.budgetItems || [] }))
      : [getDefaultTrip()];
    return normalized;
  });
  const [currentTrip, setCurrentTrip] = useState(null);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [showEditTrip, setShowEditTrip] = useState(false);
  const [editTripForm, setEditTripForm] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [itemType, setItemType] = useState('flight');
  const [activeTab, setActiveTab] = useState('trips');
  const [tripViewTab, setTripViewTab] = useState('itinerary'); // 'itinerary' | 'budget'
  const [calendarExpanded, setCalendarExpanded] = useState(true);
  const [listExpanded, setListExpanded] = useState(true);
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetCustomCategory, setNewBudgetCustomCategory] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const [customItemType, setCustomItemType] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('tripTrackerDarkMode') === 'true';
    } catch { return false; }
  });
  const [listSortOrder, setListSortOrder] = useState('group'); // 'group' | 'date'
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiListening, setAiListening] = useState(false);
  const [aiStatus, setAiStatus] = useState('');
  const aiRecognitionRef = useRef(null);
  const aiKeepListeningRef = useRef(false);
  const aiNetworkRetryCountRef = useRef(0);
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  
  // Autocomplete states
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [departureAirportSuggestions, setDepartureAirportSuggestions] = useState([]);
  const [showDepartureAirportSuggestions, setShowDepartureAirportSuggestions] = useState(false);
  const [arrivalAirportSuggestions, setArrivalAirportSuggestions] = useState([]);
  const [showArrivalAirportSuggestions, setShowArrivalAirportSuggestions] = useState(false);
  const [airlineSuggestions, setAirlineSuggestions] = useState([]);
  const [showAirlineSuggestions, setShowAirlineSuggestions] = useState(false);
  const [hotelNameSuggestions, setHotelNameSuggestions] = useState([]);
  const [showHotelNameSuggestions, setShowHotelNameSuggestions] = useState(false);
  
  const destinationInputRef = useRef(null);
  const departureInputRef = useRef(null);
  const arrivalInputRef = useRef(null);
  const airlineInputRef = useRef(null);
  const hotelNameInputRef = useRef(null);
  const tripsDropdownRef = useRef(null);
  const importInputRef = useRef(null);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tripTrackerTrips', JSON.stringify(trips));
  }, [trips]);

  // Apply dark mode to document and persist
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tripTrackerDarkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tripTrackerDarkMode', 'false');
    }
  }, [darkMode]);

  const exportData = () => {
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      trips
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vacation-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const importedTrips = data.trips ?? (Array.isArray(data) ? data : []);
        if (importedTrips.length > 0) {
          setTrips(importedTrips);
          setCurrentTrip(importedTrips[0]);
        }
      } catch (err) {
        console.error('Import failed:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // New trip form state
  const [newTrip, setNewTrip] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: ''
  });

  // New item form state
  const [newItem, setNewItem] = useState({
    itemName: '',
    airline: '', flightNumber: '', departureAirport: '', arrivalAirport: '',
    departureTime: '', arrivalTime: '', departureTimezone: '', arrivalTimezone: '',
    confirmationNumber: '', hotelName: '', checkInDate: '', checkOutDate: '',
    address: '', roomType: '', nights: 1,
    // Activity fields (travel, tour, museum, restaurant, shopping, activity)
    name: '', date: '', timeFrom: '', timeTo: '', price: '', url: '', notes: ''
  });

  const [editingItem, setEditingItem] = useState(null);

  // Filter destinations based on input
  const filterDestinations = (input) => {
    if (!input || input.length < 2) {
      setDestinationSuggestions([]);
      return;
    }
    const filtered = DESTINATIONS.filter(dest => 
      dest.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 8);
    setDestinationSuggestions(filtered);
  };

  // Filter airports based on input
  const filterAirports = (input, setSuggestions) => {
    if (!input || input.length < 1) {
      setSuggestions([]);
      return;
    }
    const filtered = AIRPORTS.filter(airport => 
      airport.code.toLowerCase().includes(input.toLowerCase()) ||
      airport.name.toLowerCase().includes(input.toLowerCase()) ||
      airport.city.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 8);
    setSuggestions(filtered);
  };

  // Filter airlines based on input
  const filterAirlines = (input) => {
    if (!input || input.length < 1) {
      setAirlineSuggestions([]);
      return;
    }
    const filtered = AIRLINES.filter(airline => 
      airline.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 8);
    setAirlineSuggestions(filtered);
  };

  // Filter hotel names based on input
  const filterHotelNames = (input) => {
    if (!input || input.length < 1) {
      setHotelNameSuggestions([]);
      return;
    }
    const filtered = HOTEL_CHAINS.filter(hotel => 
      hotel.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 8);
    setHotelNameSuggestions(filtered);
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (destinationInputRef.current && !destinationInputRef.current.contains(event.target)) {
        setShowDestinationSuggestions(false);
      }
      if (departureInputRef.current && !departureInputRef.current.contains(event.target)) {
        setShowDepartureAirportSuggestions(false);
      }
      if (arrivalInputRef.current && !arrivalInputRef.current.contains(event.target)) {
        setShowArrivalAirportSuggestions(false);
      }
      if (airlineInputRef.current && !airlineInputRef.current.contains(event.target)) {
        setShowAirlineSuggestions(false);
      }
      if (hotelNameInputRef.current && !hotelNameInputRef.current.contains(event.target)) {
        setShowHotelNameSuggestions(false);
      }
      if (tripsDropdownRef.current && !tripsDropdownRef.current.contains(event.target)) {
        setShowTripsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createTrip = () => {
    if (!newTrip.name || !newTrip.destination) return;
    
    const trip = {
      id: Date.now(),
      ...newTrip,
      flights: [],
      hotels: [],
      activities: [],
      budgetItems: []
    };
    
    setTrips([...trips, trip]);
    setNewTrip({ name: '', destination: '', startDate: '', endDate: '' });
    setShowNewTrip(false);
    setCurrentTrip(trip);
  };

  const addItem = () => {
    if (itemType === 'flight') {
      if (!newItem.airline || !newItem.flightNumber) return;
      const flight = {
        id: Date.now(),
        type: 'flight',
        itemName: newItem.itemName || '',
        airline: newItem.airline,
        flightNumber: newItem.flightNumber,
        departureAirport: newItem.departureAirport,
        arrivalAirport: newItem.arrivalAirport,
        departureTime: newItem.departureTime,
        arrivalTime: newItem.arrivalTime,
        departureTimezone: newItem.departureTimezone || '',
        arrivalTimezone: newItem.arrivalTimezone || '',
        confirmationNumber: newItem.confirmationNumber,
        price: newItem.price || ''
      };
      updateTrip({ ...currentTrip, flights: [...currentTrip.flights, flight] });
    } else if (itemType === 'hotel') {
      if (!newItem.hotelName) return;
      const hotel = {
        id: Date.now(),
        type: 'hotel',
        itemName: newItem.itemName || '',
        hotelName: newItem.hotelName,
        checkInDate: newItem.checkInDate,
        checkOutDate: newItem.checkOutDate,
        address: newItem.address,
        roomType: newItem.roomType,
        confirmationNumber: newItem.confirmationNumber,
        nights: newItem.nights,
        price: newItem.price || ''
      };
      updateTrip({ ...currentTrip, hotels: [...currentTrip.hotels, hotel] });
    } else if (isActivityType(itemType)) {
      if (itemType === '__add_new__' && !customItemType.trim()) return;
      if (!newItem.name && !newItem.itemName) return;
      let typeId = itemType;
      if (itemType === '__add_new__') {
        typeId = addCustomCategoryToTrip(customItemType.trim()) || toSlug(customItemType.trim());
      }
      const activity = {
        id: Date.now(),
        type: typeId,
        itemName: newItem.itemName || '',
        name: newItem.name || '',
        date: newItem.date || '',
        timeFrom: newItem.timeFrom || '',
        timeTo: newItem.timeTo || '',
        address: newItem.address || '',
        price: newItem.price || '',
        confirmationNumber: newItem.confirmationNumber || '',
        url: newItem.url || '',
        notes: newItem.notes || ''
      };
      const activities = currentTrip.activities || [];
      updateTrip({ ...currentTrip, activities: [...activities, activity] });
    }
    
    resetItemForm();
    if (itemType === '__add_new__') setCustomItemType('');
    setShowAddItem(false);
  };

  const updateTrip = (updatedTrip) => {
    setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    setCurrentTrip(updatedTrip);
  };

  const deleteItem = (itemId, type) => {
    if (type === 'flight') {
      updateTrip({ ...currentTrip, flights: currentTrip.flights.filter(f => f.id !== itemId) });
    } else if (type === 'hotel') {
      updateTrip({ ...currentTrip, hotels: currentTrip.hotels.filter(h => h.id !== itemId) });
    } else if (isActivityType(type)) {
      const activities = currentTrip.activities || [];
      updateTrip({ ...currentTrip, activities: activities.filter(a => a.id !== itemId) });
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setItemType(item.type);
    setNewItem(item);
    setShowAddItem(true);
  };

  const updateItem = () => {
    const activities = currentTrip.activities || [];
    if (itemType === 'flight') {
      updateTrip({
        ...currentTrip,
        flights: currentTrip.flights.map(f => f.id === editingItem.id ? { ...newItem, id: editingItem.id, type: 'flight' } : f)
      });
    } else if (itemType === 'hotel') {
      updateTrip({
        ...currentTrip,
        hotels: currentTrip.hotels.map(h => h.id === editingItem.id ? { ...newItem, id: editingItem.id, type: 'hotel' } : h)
      });
    } else if (isActivityType(itemType)) {
      updateTrip({
        ...currentTrip,
        activities: activities.map(a => a.id === editingItem.id ? { ...newItem, id: editingItem.id, type: itemType } : a)
      });
    }
    resetItemForm();
    setShowAddItem(false);
    setEditingItem(null);
  };

  const resetItemForm = (keepItemType = false) => {
    setNewItem({
      itemName: '',
      airline: '', flightNumber: '', departureAirport: '', arrivalAirport: '',
      departureTime: '', arrivalTime: '', departureTimezone: '', arrivalTimezone: '',
      confirmationNumber: '', price: '',
      hotelName: '', checkInDate: '', checkOutDate: '', address: '', roomType: '', nights: 1,
      name: '', date: '', timeFrom: '', timeTo: '', url: '', notes: ''
    });
    setEditingItem(null);
    if (!keepItemType) { setItemType('flight'); setCustomItemType(''); }
  };

  const deleteTrip = (tripId) => {
    setTrips(trips.filter(t => t.id !== tripId));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(null);
    }
  };

  const addCustomCategoryToTrip = (label) => {
    const slug = toSlug(label);
    if (!slug || BUDGET_CATEGORIES.some(c => c.id === slug) || ITEM_TYPES.some(t => t.id === slug)) return slug;
    const customs = currentTrip.customCategories || [];
    if (customs.some(c => c.id === slug)) return slug;
    updateTrip({ ...currentTrip, customCategories: [...customs, { id: slug, label: label.trim() }] });
    return slug;
  };

  const activityTypes = ['travel', 'tour', 'museum', 'restaurant', 'shopping', 'activity', ...(currentTrip?.customCategories || []).map(c => c.id)];
  const isActivityType = (t) => activityTypes.includes(t) || t === '__add_new__';

  const addBudgetItem = (category, amount) => {
    const amt = parsePrice(String(amount || ''));
    if (!amt || amt <= 0) return;
    let catId = category;
    if (newBudgetCategory === '__add_new__' && newBudgetCustomCategory.trim()) {
      catId = addCustomCategoryToTrip(newBudgetCustomCategory.trim()) || toSlug(newBudgetCustomCategory.trim());
    }
    const items = (currentTrip.budgetItems || []).filter(b => b.category !== catId);
    items.push({ id: Date.now(), category: catId, amount: amt });
    updateTrip({ ...currentTrip, budgetItems: items });
  };

  const updateBudgetItemField = (id, field, value) => {
    let items = currentTrip.budgetItems || [];
    if (field === 'category') {
      items = items.filter(b => b.id === id || b.category !== value);
    }
    items = items.map(b => {
      if (b.id !== id) return b;
      if (field === 'amount') {
        const amt = parsePrice(String(value || ''));
        return { ...b, amount: isNaN(amt) || amt < 0 ? 0 : amt };
      }
      return { ...b, category: value };
    });
    updateTrip({ ...currentTrip, budgetItems: items });
  };

  const deleteBudgetItem = (id) => {
    const items = (currentTrip.budgetItems || []).filter(b => b.id !== id);
    updateTrip({ ...currentTrip, budgetItems: items });
  };

  // Normalize speech: remove filler words, expand verb synonyms, strip leading/trailing phrases
  const normalizeSpeech = (text) => {
    if (!text) return '';
    let s = text.trim().toLowerCase()
      .replace(/[.!?]+$/g, '') // trailing punctuation
      .replace(/\s+/g, ' ');
    // Leading conversational phrases (speech-to-text often drops apostrophes: "id" for "i'd")
    s = s.replace(/^(?:hey\s+|okay\s+(?:so\s+)?|so\s+)?(?:i'?d\s+like\s+to\s+|i\s+(?:would\s+like\s+to|want\s+to|need\s+to)\s+|can\s+you\s+|could\s+you\s+)?(?:please\s+)?/i, '');
    // Filler words (standalone)
    s = s.replace(/\b(?:um|uh|like|you\s+know|kind\s+of|sort\s+of)\b/gi, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    // Verb synonyms -> "add"
    s = s.replace(/^(schedule|put|plan|create|include|book|set\s+up)\b/i, 'add');
    return s;
  };

  // Parse natural language and return items to add. Returns { items: [{ name, date, timeFrom, type }], error? }
  const parseAICommand = (text, trip) => {
    if (!text || !trip) return { items: [], error: 'No input or trip' };
    const t = normalizeSpeech(text);
    const items = [];

    // Helper: parse time "7pm", "7 pm", "19:00", "7:00 pm" -> "19:00"
    const parseTime = (s) => {
      const m = s.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
      if (!m) return null;
      let h = parseInt(m[1], 10);
      const min = m[2] ? parseInt(m[2], 10) : 0;
      if (m[3]) {
        if (m[3].toLowerCase() === 'pm' && h < 12) h += 12;
        if (m[3].toLowerCase() === 'am' && h === 12) h = 0;
      }
      return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    };

    // Helper: get dates from start to end (YYYY-MM-DD)
    const getDatesInRange = (start, end) => {
      const dates = [];
      const s = new Date(start + 'T12:00:00');
      const e = new Date(end + 'T12:00:00');
      const current = new Date(s);
      while (current <= e) {
        const y = current.getFullYear();
        const m = String(current.getMonth() + 1).padStart(2, '0');
        const d = String(current.getDate()).padStart(2, '0');
        dates.push(`${y}-${m}-${d}`);
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };

    // "add a Dinner activity to every night of my trip at 7pm" / "add X for each night at 7pm" / etc.
    const eachNightMatch = t.match(/add\s+(?:a\s+)?(.+?)\s+activity\s+to\s+(?:each|every)\s+night(?:\s+of\s+(?:my\s+)?trip)?\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i)
      || t.match(/add\s+(?:a\s+)?(.+?)\s+(?:for|to|on)\s+(?:each|every)\s+(?:night|evening)s?(?:\s+of\s+(?:my\s+)?trip)?\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i)
      || t.match(/add\s+(?:a\s+)?(.+?)\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s+(?:for|on)?\s*(?:each|every)\s+(?:night|evening)s?(?:\s+of\s+(?:my\s+)?trip)?/i)
      || t.match(/add\s+(.+?)\s+(?:for|on)?\s*(?:each|every)\s+(?:night|evening)s?(?:\s+of\s+(?:my\s+)?trip)?\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i)
      || t.match(/add\s+(.+?)\s+for\s+each\s+night(?:\s+of\s+(?:my\s+)?trip)?\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i)
      || t.match(/add\s+(.+?)\s+for\s+every\s+night\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i)
      || t.match(/add\s+(.+?)\s+(?:each|every)\s+night\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
    if (eachNightMatch && trip.startDate && trip.endDate) {
      const name = eachNightMatch[1].trim();
      const time = parseTime(eachNightMatch[2]);
      const dates = getDatesInRange(trip.startDate, trip.endDate);
      const type = /dinner|restaurant|meal|food/i.test(name) ? 'restaurant' : /breakfast|lunch/i.test(name) ? 'restaurant' : 'activity';
      dates.forEach(date => {
        items.push({ name: name || 'Placeholder', date, timeFrom: time || '19:00', type });
      });
      return { items };
    }

    // "add X on July 9 at 7pm" / "add X on July 9" / "add X on 7/9" / "add X on 2025-07-09"
    const dateAtTimeMatch = t.match(/add\s+(.+?)\s+on\s+(.+?)\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*$/i);
    if (dateAtTimeMatch) {
      const name = dateAtTimeMatch[1].trim();
      let dateStr = dateAtTimeMatch[2].trim();
      const time = parseTime(dateAtTimeMatch[3]);
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) { /* ok */ } else if (/^\d{1,2}\/\d{1,2}/.test(dateStr)) {
        const parts = dateStr.split('/');
        const m = parseInt(parts[0], 10);
        const d = parseInt(parts[1], 10);
        const y = parts[2] ? parseInt(parts[2], 10) : new Date().getFullYear();
        dateStr = `${y < 100 ? 2000 + y : y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      } else {
        const d = new Date(dateStr + 'T12:00:00');
        if (!isNaN(d.getTime())) dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      }
      const type = /dinner|restaurant|meal|food/i.test(name) ? 'restaurant' : /tour|museum|shopping/i.test(name) ? (/tour/i.test(name) ? 'tour' : /museum/i.test(name) ? 'museum' : 'shopping') : 'activity';
      items.push({ name: name || 'Activity', date: dateStr, timeFrom: time || '19:00', type });
      return { items };
    }
    const dateMatch = t.match(/add\s+(.+?)\s+on\s+(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}(?:\/\d{2,4})?|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}(?:,\s*\d{4})?)\s*$/i);
    if (dateMatch) {
      const name = dateMatch[1].trim();
      let dateStr = dateMatch[2].trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) { /* ok */ } else if (/^\d{1,2}\/\d{1,2}/.test(dateStr)) {
        const parts = dateStr.split('/');
        const m = parseInt(parts[0], 10);
        const d = parseInt(parts[1], 10);
        const y = parts[2] ? parseInt(parts[2], 10) : new Date().getFullYear();
        dateStr = `${y < 100 ? 2000 + y : y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      } else {
        const d = new Date(dateStr + 'T12:00:00');
        if (!isNaN(d.getTime())) dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      }
      const type = /dinner|restaurant|meal|food/i.test(name) ? 'restaurant' : /tour|museum|shopping/i.test(name) ? (/tour/i.test(name) ? 'tour' : /museum/i.test(name) ? 'museum' : 'shopping') : 'activity';
      items.push({ name: name || 'Activity', date: dateStr, timeFrom: '', type });
      return { items };
    }

    // "add X at 7pm" (use first day of trip or today)
    const simpleTimeMatch = t.match(/add\s+(.+?)\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
    if (simpleTimeMatch) {
      const name = simpleTimeMatch[1].trim();
      const time = parseTime(simpleTimeMatch[2]);
      const date = trip.startDate || new Date().toISOString().split('T')[0];
      const type = /dinner|restaurant|meal/i.test(name) ? 'restaurant' : 'activity';
      items.push({ name: name || 'Activity', date, timeFrom: time || '19:00', type });
      return { items };
    }

    // "add X tonight" / "add X tomorrow" / "add X tonight at 7pm"
    const tonightMatch = t.match(/^add\s+(.+?)\s+(?:tonight|tomorrow)(?:\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?))?$/i);
    if (tonightMatch) {
      const name = tonightMatch[1].trim();
      if (name.length >= 2) {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        const date = /tomorrow/i.test(t) ? tomorrow : today;
        const time = tonightMatch[2] ? parseTime(tonightMatch[2]) : null;
        const type = /dinner|restaurant|meal|food/i.test(name) ? 'restaurant' : /tour/i.test(name) ? 'tour' : /museum/i.test(name) ? 'museum' : /shopping/i.test(name) ? 'shopping' : 'activity';
        items.push({ name, date, timeFrom: time || '', type });
        return { items };
      }
    }

    // "add X" - single item, use first day of trip
    const simpleMatch = t.match(/^add\s+(.+)$/);
    if (simpleMatch) {
      const name = simpleMatch[1].trim();
      if (name.length < 2) return { items: [], error: 'Please specify what to add' };
      const date = trip.startDate || new Date().toISOString().split('T')[0];
      const type = /dinner|restaurant|meal|food/i.test(name) ? 'restaurant' : /tour/i.test(name) ? 'tour' : /museum/i.test(name) ? 'museum' : /shopping/i.test(name) ? 'shopping' : 'activity';
      items.push({ name, date, timeFrom: '', type });
      return { items };
    }

    return { items: [], error: 'Could not understand. Try: "Add dinner for each night at 7pm" or "Add museum visit on July 9" or "Schedule dinner tonight at 7"' };
  };

  const processAICommand = () => {
    if (!aiInput.trim() || !currentTrip) return;
    setAiStatus('Processing...');
    const { items, error } = parseAICommand(aiInput, currentTrip);
    if (error) {
      setAiStatus(error);
      return;
    }
    if (items.length === 0) {
      setAiStatus('No items to add. Try: "Add dinner for each night at 7pm"');
      return;
    }
    const newActivities = items.map(item => ({
      id: Date.now() + Math.random(),
      type: item.type,
      itemName: item.name,
      name: item.name,
      date: item.date,
      timeFrom: item.timeFrom || '',
      timeTo: '',
      address: '',
      price: '',
      confirmationNumber: '',
      url: '',
      notes: ''
    }));
    const activities = currentTrip.activities || [];
    updateTrip({ ...currentTrip, activities: [...activities, ...newActivities] });
    setAiStatus(`Added ${newActivities.length} item(s)!`);
    setAiInput('');
    setTimeout(() => {
      setShowAIModal(false);
      setAiStatus('');
    }, 1200);
  };

  const toggleAIMic = () => {
    if (aiListening) {
      aiKeepListeningRef.current = false;
      if (aiRecognitionRef.current) {
        try { aiRecognitionRef.current.abort(); } catch (_) {}
        try { aiRecognitionRef.current.stop(); } catch (_) {}
      }
      setAiListening(false);
      setAiStatus('');
      return;
    }
    if (!window.isSecureContext && !window.location.hostname.includes('localhost')) {
      setAiStatus('Microphone requires HTTPS. Use https:// or run on localhost.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAiStatus('Speech recognition not supported. Try Chrome or Safari.');
      return;
    }
    let recognition = aiRecognitionRef.current;
    if (!recognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      recognition.onresult = (e) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const result = e.results[i];
          if (result.isFinal && result[0]) transcript += result[0].transcript;
        }
        if (transcript.trim()) {
          setAiInput(prev => prev ? prev + ' ' + transcript.trim() : transcript.trim());
        }
      };
      recognition.onstart = () => {
        aiNetworkRetryCountRef.current = 0;
        setAiStatus('Listening... Speak now. Click mic again to stop.');
      };
      recognition.onend = () => {
        if (aiRecognitionRef.current !== recognition) return;
        if (!aiKeepListeningRef.current) {
          setAiListening(false);
          return;
        }
        setTimeout(() => {
          if (!aiKeepListeningRef.current) return;
          try {
            recognition.start();
          } catch (_) {}
        }, 100);
      };
      recognition.onerror = (e) => {
        if (e.error === 'aborted') return;
        if (e.error === 'network') {
          aiNetworkRetryCountRef.current = (aiNetworkRetryCountRef.current || 0) + 1;
          if (aiNetworkRetryCountRef.current < 3 && aiKeepListeningRef.current) {
            setAiStatus('Network hiccup, retrying...');
            setTimeout(() => {
              if (!aiKeepListeningRef.current) return;
              try { recognition.start(); } catch (_) {}
            }, 500);
            return;
          }
        }
        aiKeepListeningRef.current = false;
        setAiListening(false);
        const msg = {
          'not-allowed': 'Microphone permission denied. Allow access in browser settings.',
          'no-speech': 'No speech detected. Click mic to try again.',
          'audio-capture': 'No microphone found.',
          'network': 'Network issue. Speech recognition needs internet. Check connection and click mic to retry.',
          'service-not-allowed': 'Speech recognition service not allowed.'
        }[e.error] || `Error: ${e.error}`;
        setAiStatus(msg);
      };
      aiRecognitionRef.current = recognition;
    }
    aiKeepListeningRef.current = true;
    aiNetworkRetryCountRef.current = 0;
    setAiListening(true);
    setAiStatus('Starting...');
    try {
      recognition.start();
    } catch (err) {
      aiKeepListeningRef.current = false;
      setAiListening(false);
      setAiStatus('Could not start. Allow microphone access and try again.');
    }
  };

  useEffect(() => {
    if (!showAIModal) {
      if (aiRecognitionRef.current) {
        try { aiRecognitionRef.current.stop(); } catch (_) {}
        setAiListening(false);
      }
      aiRecognitionRef.current = null;
    }
  }, [showAIModal]);

  const getItemSortDate = (item, type) => {
    if (type === 'flight') {
      if (!item.departureTime) return '9999-99-99';
      const str = String(item.departureTime);
      const d = str.includes('T') ? new Date(str) : new Date(str + 'T12:00:00');
      if (item.departureTimezone) {
        return d.toLocaleDateString('en-CA', { timeZone: item.departureTimezone });
      }
      return str.includes('T') ? str.split('T')[0] : str;
    }
    if (type === 'hotel') return item.checkInDate || '9999-99-99';
    if (['travel','tour','museum','restaurant','shopping','activity'].includes(type)) return item.date || '9999-99-99';
    return '9999-99-99';
  };

  const getLabelTextColor = (color) => {
    const map = {
      blue: 'text-blue-400', purple: 'text-purple-400', emerald: 'text-emerald-400',
      amber: 'text-amber-400', rose: 'text-rose-400', orange: 'text-orange-400',
      pink: 'text-pink-400', teal: 'text-teal-400', cyan: 'text-cyan-400',
      green: 'text-green-400', red: 'text-red-400', yellow: 'text-yellow-400'
    };
    return map[color] || 'text-indigo-400';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Parse YYYY-MM-DD as local date (new Date(str) treats it as UTC midnight, causing off-by-one in western timezones)
    const date = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
      ? new Date(dateString + 'T12:00:00')
      : new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatFlightTime = (dateTimeStr, timezone) => {
    if (!dateTimeStr) return '';
    const d = new Date(dateTimeStr);
    const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
    if (timezone) opts.timeZone = timezone;
    const timeStr = d.toLocaleTimeString('en-US', opts);
    if (timezone) {
      const tzOption = TIMEZONES.find(t => t.id === timezone);
      const tzLabel = tzOption ? tzOption.label : timezone.split('/').pop().replace(/_/g, ' ');
      return `${timeStr} (${tzLabel})`;
    }
    return timeStr;
  };

  const formatFlightDate = (dateTimeStr, timezone) => {
    if (!dateTimeStr) return '';
    const d = new Date(dateTimeStr);
    const opts = { month: 'short', day: 'numeric' };
    if (timezone) opts.timeZone = timezone;
    return d.toLocaleDateString('en-US', opts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TripTracker</h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Trips Dropdown */}
              {trips.length > 0 && (
                <div className="relative" ref={tripsDropdownRef}>
                  <button
                    onClick={() => setShowTripsDropdown(!showTripsDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Briefcase className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden sm:inline truncate max-w-[180px]">{currentTrip ? currentTrip.name : 'My Trips'}</span>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${showTripsDropdown ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showTripsDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                      <div className="p-2">
                        {trips.map(trip => (
                          <button
                            key={trip.id}
                            onClick={() => {
                              setCurrentTrip(trip);
                              setActiveTab('trips');
                              setShowTripsDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group"
                          >
                            <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              {trip.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{trip.destination}</div>
                            {trip.startDate && trip.endDate && (
                              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* New Trip Button */}
              {!currentTrip && (
                <button
                  onClick={() => setShowNewTrip(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">New Trip</span>
                </button>
              )}
              
              {/* Back to Trips - when viewing a trip */}
              {currentTrip && (
                <button
                    onClick={() => {
                      setCurrentTrip(null);
                      setActiveTab('trips');
                    }}
                    className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    All Trips
                  </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* New Trip Modal */}
        {showNewTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Plan New Trip</h2>
                <button onClick={() => setShowNewTrip(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
                  <input
                    type="text"
                    value={newTrip.name}
                    onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                    placeholder="Summer Vacation 2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <div className="relative" ref={destinationInputRef}>
                    <input
                      type="text"
                      value={newTrip.destination}
                      onChange={(e) => {
                        setNewTrip({ ...newTrip, destination: e.target.value });
                        filterDestinations(e.target.value);
                        setShowDestinationSuggestions(true);
                      }}
                      onFocus={() => {
                        if (newTrip.destination.length >= 2) {
                          filterDestinations(newTrip.destination);
                          setShowDestinationSuggestions(true);
                        }
                      }}
                      placeholder="Paris, France"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {destinationSuggestions.map((dest, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setNewTrip({ ...newTrip, destination: dest });
                              setShowDestinationSuggestions(false);
                              setDestinationSuggestions([]);
                            }}
                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700"
                          >
                            {dest}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <DateInput
                      value={newTrip.startDate}
                      onChange={(v) => setNewTrip({ ...newTrip, startDate: v })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <DateInput
                      value={newTrip.endDate}
                      onChange={(v) => setNewTrip({ ...newTrip, endDate: v })}
                      minDate={newTrip.startDate}
                    />
                  </div>
                </div>
                
                <button
                  onClick={createTrip}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Create Trip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Trip Modal */}
        {showEditTrip && editTripForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Trip</h2>
                <button
                  onClick={() => {
                    setShowEditTrip(false);
                    setEditTripForm(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
                  <input
                    type="text"
                    value={editTripForm.name}
                    onChange={(e) => setEditTripForm({ ...editTripForm, name: e.target.value })}
                    placeholder="Summer Vacation 2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <div className="relative" ref={destinationInputRef}>
                    <input
                      type="text"
                      value={editTripForm.destination}
                      onChange={(e) => {
                        setEditTripForm({ ...editTripForm, destination: e.target.value });
                        filterDestinations(e.target.value);
                        setShowDestinationSuggestions(true);
                      }}
                      onFocus={() => {
                        if (editTripForm.destination.length >= 2) {
                          filterDestinations(editTripForm.destination);
                          setShowDestinationSuggestions(true);
                        }
                      }}
                      placeholder="Paris, France"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {destinationSuggestions.map((dest, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setEditTripForm({ ...editTripForm, destination: dest });
                              setShowDestinationSuggestions(false);
                              setDestinationSuggestions([]);
                            }}
                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700"
                          >
                            {dest}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <DateInput
                      value={editTripForm.startDate}
                      onChange={(v) => setEditTripForm({ ...editTripForm, startDate: v })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <DateInput
                      value={editTripForm.endDate}
                      onChange={(v) => setEditTripForm({ ...editTripForm, endDate: v })}
                      minDate={editTripForm.startDate}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    updateTrip(editTripForm);
                    setShowEditTrip(false);
                    setEditTripForm(null);
                  }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Update Trip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddItem && currentTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
              {/* Fixed header */}
              <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Edit' : 'Add'} Itinerary Item
                </h2>
                <button onClick={() => {
                  setShowAddItem(false);
                  setEditingItem(null);
                  resetItemForm();
                  setItemType('flight');
                }} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto min-h-0 p-6">
              {/* Type Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Item type</label>
                {itemType === '__add_new__' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customItemType}
                      onChange={(e) => setCustomItemType(e.target.value)}
                      placeholder="Type name (e.g. Entertainment)"
                      className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => { setItemType('flight'); setCustomItemType(''); }}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      title="Back to list"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <select
                    value={itemType}
                    onChange={(e) => {
                      setItemType(e.target.value);
                      if (!editingItem) resetItemForm(true);
                      if (editingItem) setNewItem({ ...editingItem, type: e.target.value });
                    }}
                    disabled={!!editingItem}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    {ITEM_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                    {(currentTrip?.customCategories || []).map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                    <option value="__add_new__">Add New</option>
                  </select>
                )}
              </div>
              
              <div className="space-y-4">
                {itemType === 'flight' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Calendar name</label>
                      <input
                        type="text"
                        value={newItem.itemName || ''}
                        onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                        placeholder="e.g. Flight to Rome"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Shown in calendar view. Leave blank to show airline and route.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                      <div className="relative" ref={airlineInputRef}>
                        <input
                          type="text"
                          value={newItem.airline}
                          onChange={(e) => {
                            setNewItem({ ...newItem, airline: e.target.value });
                            filterAirlines(e.target.value);
                            setShowAirlineSuggestions(true);
                          }}
                          onFocus={() => {
                            if (newItem.airline.length >= 1) {
                              filterAirlines(newItem.airline);
                              setShowAirlineSuggestions(true);
                            }
                          }}
                          placeholder="United Airlines"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {showAirlineSuggestions && airlineSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {airlineSuggestions.map((airline, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setNewItem({ ...newItem, airline: airline });
                                  setShowAirlineSuggestions(false);
                                }}
                                className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-900"
                              >
                                {airline}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                      <input
                        type="text"
                        value={newItem.flightNumber}
                        onChange={(e) => setNewItem({ ...newItem, flightNumber: e.target.value })}
                        placeholder="UA 123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <div className="relative" ref={departureInputRef}>
                          <input
                            type="text"
                            value={newItem.departureAirport}
                            onChange={(e) => {
                              setNewItem({ ...newItem, departureAirport: e.target.value });
                              filterAirports(e.target.value, setDepartureAirportSuggestions);
                              setShowDepartureAirportSuggestions(true);
                            }}
                            onFocus={() => {
                              if (newItem.departureAirport.length >= 1) {
                                filterAirports(newItem.departureAirport, setDepartureAirportSuggestions);
                                setShowDepartureAirportSuggestions(true);
                              }
                            }}
                            placeholder="JFK or New York"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          {showDepartureAirportSuggestions && departureAirportSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {departureAirportSuggestions.map((airport, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setNewItem({ ...newItem, departureAirport: airport.code });
                                    setShowDepartureAirportSuggestions(false);
                                    setDepartureAirportSuggestions([]);
                                  }}
                                  className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                                >
                                  <div className="font-semibold text-gray-900">{airport.code}</div>
                                  <div className="text-sm text-gray-600">{airport.city}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <div className="relative" ref={arrivalInputRef}>
                          <input
                            type="text"
                            value={newItem.arrivalAirport}
                            onChange={(e) => {
                              setNewItem({ ...newItem, arrivalAirport: e.target.value });
                              filterAirports(e.target.value, setArrivalAirportSuggestions);
                              setShowArrivalAirportSuggestions(true);
                            }}
                            onFocus={() => {
                              if (newItem.arrivalAirport.length >= 1) {
                                filterAirports(newItem.arrivalAirport, setArrivalAirportSuggestions);
                                setShowArrivalAirportSuggestions(true);
                              }
                            }}
                            placeholder="CDG or Paris"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          {showArrivalAirportSuggestions && arrivalAirportSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {arrivalAirportSuggestions.map((airport, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setNewItem({ ...newItem, arrivalAirport: airport.code });
                                    setShowArrivalAirportSuggestions(false);
                                    setArrivalAirportSuggestions([]);
                                  }}
                                  className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                                >
                                  <div className="font-semibold text-gray-900">{airport.code}</div>
                                  <div className="text-sm text-gray-600">{airport.city}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                        <input
                          type="datetime-local"
                          value={newItem.departureTime}
                          onChange={(e) => setNewItem({ ...newItem, departureTime: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <label className="block text-xs font-medium text-gray-500 mt-1 mb-1">Departure timezone</label>
                        <select
                          value={newItem.departureTimezone || ''}
                          onChange={(e) => setNewItem({ ...newItem, departureTimezone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        >
                          {TIMEZONES.map(tz => (
                            <option key={tz.id || 'browser'} value={tz.id}>{tz.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Arrival</label>
                        <input
                          type="datetime-local"
                          value={newItem.arrivalTime}
                          min={newItem.departureTime}
                          onChange={(e) => setNewItem({ ...newItem, arrivalTime: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <label className="block text-xs font-medium text-gray-500 mt-1 mb-1">Arrival timezone</label>
                        <select
                          value={newItem.arrivalTimezone || ''}
                          onChange={(e) => setNewItem({ ...newItem, arrivalTimezone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        >
                          {TIMEZONES.map(tz => (
                            <option key={tz.id || 'browser'} value={tz.id}>{tz.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Number</label>
                      <input
                        type="text"
                        value={newItem.confirmationNumber}
                        onChange={(e) => setNewItem({ ...newItem, confirmationNumber: e.target.value })}
                        placeholder="ABC123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        value={newItem.price ?? ''}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="e.g. $450 or 450"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </>
                ) : itemType === 'hotel' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Calendar name</label>
                      <input
                        type="text"
                        value={newItem.itemName || ''}
                        onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                        placeholder="e.g. Hotel in Paris"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Shown in calendar view. Leave blank to show hotel name.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                      <div className="relative" ref={hotelNameInputRef}>
                        <input
                          type="text"
                          value={newItem.hotelName}
                          onChange={(e) => {
                            setNewItem({ ...newItem, hotelName: e.target.value });
                            filterHotelNames(e.target.value);
                            setShowHotelNameSuggestions(true);
                          }}
                          onFocus={() => {
                            if (newItem.hotelName.length >= 1) {
                              filterHotelNames(newItem.hotelName);
                              setShowHotelNameSuggestions(true);
                            }
                          }}
                          placeholder="Grand Hotel Paris"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        {showHotelNameSuggestions && hotelNameSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {hotelNameSuggestions.map((hotel, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setNewItem({ ...newItem, hotelName: hotel });
                                  setShowHotelNameSuggestions(false);
                                }}
                                className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-900"
                              >
                                {hotel}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={newItem.address}
                        onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
                        placeholder="123 Rue de Rivoli, Paris"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-In</label>
                        <DateInput
                          value={newItem.checkInDate}
                          onChange={(v) => setNewItem({ ...newItem, checkInDate: v })}
                          defaultMonth={currentTrip?.startDate}
                          minDate={currentTrip?.startDate}
                          maxDate={currentTrip?.endDate}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out</label>
                        <DateInput
                          value={newItem.checkOutDate}
                          onChange={(v) => setNewItem({ ...newItem, checkOutDate: v })}
                          minDate={newItem.checkInDate}
                          defaultMonth={newItem.checkInDate || currentTrip?.startDate}
                          maxDate={currentTrip?.endDate}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                      <input
                        type="text"
                        value={newItem.roomType}
                        onChange={(e) => setNewItem({ ...newItem, roomType: e.target.value })}
                        placeholder="Deluxe King"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Number</label>
                      <input
                        type="text"
                        value={newItem.confirmationNumber}
                        onChange={(e) => setNewItem({ ...newItem, confirmationNumber: e.target.value })}
                        placeholder="HTL789"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        value={newItem.price ?? ''}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="e.g. $200/night or 200"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </>
                ) : isActivityType(itemType) ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Calendar name</label>
                      <input
                        type="text"
                        value={newItem.itemName || ''}
                        onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                        placeholder={`e.g. ${(ITEM_TYPES.find(t => t.id === itemType) || currentTrip?.customCategories?.find(c => c.id === itemType))?.label || itemType} in Rome`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={newItem.name || ''}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder={`e.g. ${itemType === 'restaurant' ? 'Trattoria Roma' : itemType === 'museum' ? 'Vatican Museums' : itemType === 'tour' ? 'Colosseum Tour' : 'Activity name'}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <DateInput
                        value={newItem.date || ''}
                        onChange={(v) => setNewItem({ ...newItem, date: v })}
                        defaultMonth={currentTrip?.startDate}
                        minDate={currentTrip?.startDate}
                        maxDate={currentTrip?.endDate}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time from</label>
                        <input
                          type="time"
                          value={newItem.timeFrom || ''}
                          onChange={(e) => setNewItem({ ...newItem, timeFrom: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time to</label>
                        <input
                          type="time"
                          value={newItem.timeTo || ''}
                          onChange={(e) => setNewItem({ ...newItem, timeTo: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={newItem.address || ''}
                        onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
                        placeholder="123 Main St"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        value={newItem.price || ''}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="e.g. $50 or €30"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation number</label>
                      <input
                        type="text"
                        value={newItem.confirmationNumber || ''}
                        onChange={(e) => setNewItem({ ...newItem, confirmationNumber: e.target.value })}
                        placeholder="ABC123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input
                        type="url"
                        value={newItem.url || ''}
                        onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={newItem.notes || ''}
                        onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                        placeholder="Additional notes..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </>
                ) : null}
              </div>
              </div>

              {/* Fixed footer with Save/Update button */}
              {(itemType === 'flight' || itemType === 'hotel' || isActivityType(itemType)) && (
                <div className="p-6 pt-4 flex-shrink-0 border-t border-gray-200">
                  <button
                    onClick={editingItem ? updateItem : addItem}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    {editingItem ? 'Update' : 'Add'} {ITEM_TYPES.find(t => t.id === itemType)?.label || currentTrip?.customCategories?.find(c => c.id === itemType)?.label || customItemType.trim() || itemType}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI / Tell AI Modal */}
        {showAIModal && currentTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-white" />
                  </span>
                  Tell AI what to add
                </h2>
                <button
                  onClick={() => {
                    setShowAIModal(false);
                    setAiInput('');
                    setAiStatus('');
                    if (aiListening && aiRecognitionRef.current) {
                      aiRecognitionRef.current.stop();
                      setAiListening(false);
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Examples: &quot;Add dinner placeholder for each night at 7pm&quot;, &quot;Add museum visit on July 9&quot;
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Microphone permission is remembered by your browser once granted.
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && processAICommand()}
                  placeholder="Add dinner for each night at 7pm"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={toggleAIMic}
                  disabled={!(window.SpeechRecognition || window.webkitSpeechRecognition)}
                  className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    aiListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={window.SpeechRecognition || window.webkitSpeechRecognition ? 'Click to start, click again to stop' : 'Speech not supported'}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
              {aiStatus && (
                <div className={`text-sm mb-4 ${aiStatus.startsWith('Added') ? 'text-green-600' : aiStatus.startsWith('Could not') || aiStatus.startsWith('No items') ? 'text-amber-600' : 'text-gray-500'}`}>
                  {aiStatus}
                </div>
              )}
              <button
                onClick={processAICommand}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-colors font-medium"
              >
                Add to itinerary
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {activeTab === 'home' && (
          <div className="text-center py-12 px-4 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to TripTracker</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your all-in-one vacation planning companion. Track flights, hotels, and create amazing travel itineraries.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">{trips.length}</div>
                <div className="text-sm text-gray-600">Total Trips</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {trips.reduce((sum, trip) => sum + trip.flights.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Flights Booked</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {trips.reduce((sum, trip) => sum + trip.hotels.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Hotels Reserved</div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('trips');
                setShowNewTrip(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Plan a New Trip
            </button>
          </div>
        )}

        {activeTab === 'trips' && !currentTrip ? (
          // Trips List
          <div>
            {trips.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
                <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
                <button
                  onClick={() => setShowNewTrip(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Trip
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">My Trips</h2>
                {trips.map(trip => (
                  <div
                    key={trip.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setCurrentTrip(trip);
                      setActiveTab('trips');
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{trip.name}</h3>
                        <p className="text-indigo-600 font-medium mb-3">{trip.destination}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {trip.startDate && trip.endDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-4 mt-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Plane className="w-4 h-4" />
                            <span>{trip.flights.length} flights</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Hotel className="w-4 h-4" />
                            <span>{trip.hotels.length} hotels</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditTripForm({
                              ...trip,
                              name: trip.name,
                              destination: trip.destination || '',
                              startDate: trip.startDate || '',
                              endDate: trip.endDate || ''
                            });
                            setShowDestinationSuggestions(false);
                            setShowEditTrip(true);
                          }}
                          className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                          title="Edit trip"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTrip(trip.id);
                          }}
                          className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                          title="Delete trip"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <ChevronRight className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {activeTab === 'trips' && currentTrip && (
          // Trip Detail View
          <div>
            <div className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentTrip.name}</h2>
                  <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-3">{currentTrip.destination}</p>
                  {currentTrip.startDate && currentTrip.endDate && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <span>{formatDate(currentTrip.startDate)} - {formatDate(currentTrip.endDate)}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditTripForm({
                        ...currentTrip,
                        name: currentTrip.name,
                        destination: currentTrip.destination || '',
                        startDate: currentTrip.startDate || '',
                        endDate: currentTrip.endDate || ''
                      });
                      setShowDestinationSuggestions(false);
                      setShowEditTrip(true);
                    }}
                    className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    title="Edit trip"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteTrip(currentTrip.id)}
                    className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                    title="Delete trip"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trip sub-tabs: Itinerary | Budget | Add + Tell AI (right) */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setTripViewTab('itinerary')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    tripViewTab === 'itinerary' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setTripViewTab('budget')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-1.5 ${
                    tripViewTab === 'budget' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  Budget
                </button>
              </div>
              {tripViewTab === 'itinerary' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setItemType('flight');
                      resetItemForm();
                      setShowAddItem(true);
                    }}
                    className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    title="Add itinerary item"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setShowAIModal(true);
                      setAiInput('');
                      setAiStatus('');
                    }}
                    className="p-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-colors"
                    title="Tell the app what to add"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {tripViewTab === 'itinerary' && (
            <>
            {/* Collapsible Calendar Section */}
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => setCalendarExpanded(!calendarExpanded)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-indigo-600" />
                  Calendar
                </h3>
                {calendarExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {calendarExpanded && (
                <div className="border-t border-gray-200 p-4">
                  <CalendarView trip={currentTrip} onEditItem={startEdit} onDeleteItem={deleteItem} formatDate={formatDate} />
                </div>
              )}
            </div>

            {/* Collapsible List Section */}
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => setListExpanded(!listExpanded)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Itinerary List
                </h3>
                {listExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {listExpanded && (
                <div className="border-t border-gray-200 p-4 space-y-6">
            {/* Sort order toggle */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-600">Sort by:</span>
              <button
                onClick={() => setListSortOrder('group')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  listSortOrder === 'group' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Group
              </button>
              <button
                onClick={() => setListSortOrder('date')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  listSortOrder === 'date' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Date
              </button>
            </div>

            {listSortOrder === 'group' ? (
              <>
            {/* Flights Section */}
            {currentTrip.flights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-indigo-600" />
                  Flights
                </h3>
                <div className="space-y-3">
                  {currentTrip.flights.map(flight => (
                    <div key={flight.id} className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">
                            {flight.airline} {flight.flightNumber}
                          </div>
                          {flight.confirmationNumber && (
                            <div className="text-sm text-gray-600 mt-1">
                              Confirmation: {flight.confirmationNumber}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(flight)}
                            className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteItem(flight.id, 'flight')}
                            className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-700">
                        <div className="flex-1">
                          <div className="text-2xl font-bold">{flight.departureAirport}</div>
                          {flight.departureTime && (
                            <div className="text-sm text-gray-600">
                              {formatFlightDate(flight.departureTime, flight.departureTimezone)}{' '}
                              {formatFlightTime(flight.departureTime, flight.departureTimezone)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-shrink-0">
                          <div className="w-12 h-px bg-gray-300 relative">
                            <Plane className="w-4 h-4 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                          </div>
                        </div>
                        
                        <div className="flex-1 text-right">
                          <div className="text-2xl font-bold">{flight.arrivalAirport}</div>
                          {flight.arrivalTime && (
                            <div className="text-sm text-gray-600">
                              {formatFlightDate(flight.arrivalTime, flight.arrivalTimezone)}{' '}
                              {formatFlightTime(flight.arrivalTime, flight.arrivalTimezone)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hotels Section */}
            {currentTrip.hotels.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-indigo-600" />
                  Hotels
                </h3>
                <div className="space-y-3">
                  {currentTrip.hotels.map(hotel => (
                    <div key={hotel.id} className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-lg mb-1">
                            {hotel.hotelName}
                          </div>
                          {hotel.address && (
                            <div className="text-sm text-gray-600 mb-2">{hotel.address}</div>
                          )}
                          {hotel.roomType && (
                            <div className="text-sm text-gray-700 mb-1">Room: {hotel.roomType}</div>
                          )}
                          {hotel.confirmationNumber && (
                            <div className="text-sm text-gray-600">
                              Confirmation: {hotel.confirmationNumber}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(hotel)}
                            className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteItem(hotel.id, 'hotel')}
                            className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">
                            {formatDate(hotel.checkInDate)} → {formatDate(hotel.checkOutDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities Section */}
            {(currentTrip.activities || []).length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-indigo-600" />
                  Activities & Reservations
                </h3>
                <div className="space-y-3">
                  {(currentTrip.activities || []).map(activity => {
                    const typeConfig = getItemTypeConfig(currentTrip, activity.type);
                    const Icon = typeConfig?.icon || Star;
                    return (
                      <div key={activity.id} className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-5 h-5 text-indigo-600" />
                              <span className="text-xs font-medium text-gray-500 uppercase">{typeConfig?.label || activity.type}</span>
                            </div>
                            <div className="font-semibold text-gray-900 text-lg">
                              {activity.itemName || activity.name || 'Untitled'}
                            </div>
                            {activity.date && (
                              <div className="text-sm text-gray-600 mt-1">
                                {formatDate(activity.date)}
                                {activity.timeFrom && ` • ${activity.timeFrom}${activity.timeTo ? ` – ${activity.timeTo}` : ''}`}
                              </div>
                            )}
                            {activity.address && <div className="text-sm text-gray-600 mt-1">{activity.address}</div>}
                            {activity.price && <div className="text-sm text-gray-600 mt-1">Price: {activity.price}</div>}
                            {activity.confirmationNumber && <div className="text-sm text-gray-600 mt-1">Confirmation: {activity.confirmationNumber}</div>}
                            {activity.url && (
                              <a href={activity.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline mt-1 block">
                                View link
                              </a>
                            )}
                            {activity.notes && <div className="text-sm text-gray-600 mt-2 italic">{activity.notes}</div>}
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(activity)} className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button onClick={() => deleteItem(activity.id, activity.type)} className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            </>
            ) : (
            /* List by date - combined sorted list with date labels */
            (() => {
              const items = [
                ...(currentTrip.flights || []).map(f => ({ ...f, _sortType: 'flight' })),
                ...(currentTrip.hotels || []).map(h => ({ ...h, _sortType: 'hotel' })),
                ...((currentTrip.activities || []).map(a => ({ ...a, _sortType: a.type })))
              ];
              items.sort((a, b) => getItemSortDate(a, a._sortType).localeCompare(getItemSortDate(b, b._sortType)));
              const byDate = {};
              items.forEach(item => {
                const d = getItemSortDate(item, item._sortType);
                if (!byDate[d]) byDate[d] = [];
                byDate[d].push(item);
              });
              const dateKeys = Object.keys(byDate).filter(k => k !== '9999-99-99').sort();
              const unscheduled = byDate['9999-99-99'] || [];
              const renderItem = (item) => {
                    const type = item._sortType;
                    if (type === 'flight') {
                      return (
                        <div key={`flight-${item.id}`} className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-blue-400 bg-black px-2 py-0.5 rounded">Flight</span>
                              <span className="text-sm text-gray-500">{item.departureTime && formatDate(getItemSortDate(item, 'flight'))}</span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => startEdit(item)} className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"><Edit2 className="w-5 h-5" /></button>
                              <button onClick={() => deleteItem(item.id, 'flight')} className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"><Trash2 className="w-5 h-5" /></button>
                            </div>
                          </div>
                          <div className="font-semibold text-gray-900">{item.airline} {item.flightNumber}</div>
                          <div className="flex items-center gap-4 text-gray-700 mt-2">
                            <div><span className="font-bold">{item.departureAirport}</span>{item.departureTime && <span className="text-sm text-gray-600 block">{formatFlightDate(item.departureTime, item.departureTimezone)} {formatFlightTime(item.departureTime, item.departureTimezone)}</span>}</div>
                            <Plane className="w-4 h-4 text-indigo-600 rotate-90 flex-shrink-0" />
                            <div><span className="font-bold">{item.arrivalAirport}</span>{item.arrivalTime && <span className="text-sm text-gray-600 block">{formatFlightDate(item.arrivalTime, item.arrivalTimezone)} {formatFlightTime(item.arrivalTime, item.arrivalTimezone)}</span>}</div>
                          </div>
                        </div>
                      );
                    }
                    if (type === 'hotel') {
                      return (
                        <div key={`hotel-${item.id}`} className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-purple-400 bg-black px-2 py-0.5 rounded">Hotel</span>
                              <span className="text-sm text-gray-500">{formatDate(item.checkInDate)}</span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => startEdit(item)} className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"><Edit2 className="w-5 h-5" /></button>
                              <button onClick={() => deleteItem(item.id, 'hotel')} className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"><Trash2 className="w-5 h-5" /></button>
                            </div>
                          </div>
                          <div className="font-semibold text-gray-900">{item.hotelName}</div>
                          <div className="text-sm text-gray-600 mt-1">{formatDate(item.checkInDate)} → {formatDate(item.checkOutDate)}</div>
                          {item.address && <div className="text-sm text-gray-600 mt-1">{item.address}</div>}
                        </div>
                      );
                    }
                    const typeConfig = getItemTypeConfig(currentTrip, type);
                    const Icon = typeConfig?.icon || Star;
                    return (
                      <div key={`activity-${item.id}`} className="itinerary-item-card bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-medium bg-black px-2 py-0.5 rounded flex items-center gap-1 ${getLabelTextColor(typeConfig?.color)}`}>
                              <Icon className="w-3 h-3" />{typeConfig?.label || type}
                            </span>
                            <span className="text-sm text-gray-500">{item.date && formatDate(item.date)}</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(item)} className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"><Edit2 className="w-5 h-5" /></button>
                            <button onClick={() => deleteItem(item.id, type)} className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"><Trash2 className="w-5 h-5" /></button>
                          </div>
                        </div>
                        <div className="font-semibold text-gray-900">{item.itemName || item.name || 'Untitled'}</div>
                        {item.date && <div className="text-sm text-gray-600 mt-1">{formatDate(item.date)}{item.timeFrom && ` • ${item.timeFrom}${item.timeTo ? ` – ${item.timeTo}` : ''}`}</div>}
                        {item.address && <div className="text-sm text-gray-600 mt-1">{item.address}</div>}
                        {item.price && <div className="text-sm text-gray-600 mt-1">Price: {item.price}</div>}
                      </div>
                    );
                  };
              return (
                <div className="space-y-6">
                  {dateKeys.map(dateStr => (
                    <div key={dateStr}>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 px-1">{formatDate(dateStr)}</h4>
                      <div className="space-y-3">
                        {byDate[dateStr].map(item => renderItem(item))}
                      </div>
                    </div>
                  ))}
                  {unscheduled.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1">Unscheduled</h4>
                      <div className="space-y-3">
                        {unscheduled.map(item => renderItem(item))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
            )}

            {/* Empty State - inside list section */}
            {currentTrip.flights.length === 0 && currentTrip.hotels.length === 0 && (currentTrip.activities || []).length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start planning your trip</h3>
                <p className="text-gray-600 mb-6">Add flights, hotels, and activities to organize your vacation</p>
              </div>
            )}
                </div>
              )}
            </div>
            </>
            )}

            {tripViewTab === 'budget' && (
              <div className="mb-6 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    Budget Categories
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">Add budget amounts by category. Actual spending is pulled from your itinerary items (flights, hotels, activities with prices).</p>

                  {/* Budget list - inline editable rows */}
                  <div className="space-y-3">
                    {/* Header row */}
                    <div className="flex items-center gap-4 py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      <div className="flex-1 min-w-0">Category</div>
                      <div className="w-24 text-right">Budgeted</div>
                      <div className="w-24 text-right">Actual</div>
                      <div className="w-24 text-right">Variance</div>
                      <div className="w-10"></div>
                    </div>

                    {/* Existing budget items - inline editable */}
                    {(() => {
                      const customFromBudget = [...new Set((currentTrip.budgetItems || []).map(b => b.category).filter(id => !BUDGET_CATEGORIES.some(c => c.id === id)))];
                      const tripCustoms = (currentTrip.customCategories || []).map(c => ({ id: c.id, label: c.label }));
                      const seen = new Set(BUDGET_CATEGORIES.map(c => c.id));
                      const extra = [...tripCustoms, ...customFromBudget.map(id => ({ id, label: id }))].filter(c => !seen.has(c.id) && seen.add(c.id));
                      const allCategories = [...BUDGET_CATEGORIES, ...extra];
                      return (currentTrip.budgetItems || []).map(bi => {
                      const actual = getActualForCategory(currentTrip, bi.category);
                      const variance = actual - bi.amount;
                      return (
                        <div key={bi.id} className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-50/70 transition-colors">
                          <div className="flex-1 min-w-0">
                            <select
                              value={bi.category}
                              onChange={(e) => updateBudgetItemField(bi.id, 'category', e.target.value)}
                              className="w-full px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                            >
                              {allCategories.map(c => (
                                <option key={c.id} value={c.id}>{c.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="w-24">
                            <input
                              type="text"
                              inputMode="decimal"
                              value={bi.amount || ''}
                              onChange={(e) => updateBudgetItemField(bi.id, 'amount', sanitizeAmountInput(e.target.value))}
                              placeholder="0"
                              className="w-full px-3 py-2 text-sm text-right text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300"
                            />
                          </div>
                          <div className="w-24 text-right text-sm text-gray-700">${actual.toLocaleString(0)}</div>
                          <div className={`w-24 text-right text-sm font-medium ${variance > 0 ? 'text-red-600' : variance < 0 ? 'text-green-600' : 'text-gray-500'}`}>
                            {variance > 0 ? '+' : ''}{variance === 0 ? '0' : `$${variance.toLocaleString(0)}`}
                          </div>
                          <div className="w-10 flex justify-end">
                            <button onClick={() => deleteBudgetItem(bi.id)} className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors" title="Remove"><Trash2 className="w-5 h-5" /></button>
                          </div>
                        </div>
                      );
                    });
                    })()}

                    {/* Add new row */}
                    <div className="flex items-center gap-4 py-3 px-4 rounded-lg bg-indigo-50/50 border border-indigo-100 border-dashed">
                      <div className="flex-1 min-w-0">
                        {newBudgetCategory === '__add_new__' ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={newBudgetCustomCategory}
                              onChange={(e) => setNewBudgetCustomCategory(e.target.value)}
                              placeholder="Category name"
                              className="flex-1 min-w-0 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => { setNewBudgetCategory(''); setNewBudgetCustomCategory(''); }}
                              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                              title="Back to list"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                            <select
                            value={newBudgetCategory}
                            onChange={(e) => setNewBudgetCategory(e.target.value)}
                            className="w-full px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="">Select...</option>
                            {BUDGET_CATEGORIES.map(c => (
                              <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                            {(currentTrip?.customCategories || []).map(c => (
                              <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                            <option value="__add_new__">Add New</option>
                          </select>
                        )}
                      </div>
                      <div className="w-24">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={newBudgetAmount}
                          onChange={(e) => setNewBudgetAmount(sanitizeAmountInput(e.target.value))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const cat = newBudgetCategory === '__add_new__' ? newBudgetCustomCategory.trim() : newBudgetCategory;
                              if (cat && parsePrice(newBudgetAmount) > 0) {
                                addBudgetItem(cat, newBudgetAmount);
                                setNewBudgetAmount('');
                                if (newBudgetCategory === '__add_new__') { setNewBudgetCustomCategory(''); setNewBudgetCategory(''); }
                              }
                            }
                          }}
                          placeholder="Amount"
                          className="w-full px-3 py-2 text-sm text-right text-gray-600 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
                        />
                      </div>
                      <div className="w-24"></div>
                      <div className="w-24"></div>
                      <div className="w-10 flex justify-end">
                        <button
                          onClick={() => {
                            const cat = newBudgetCategory === '__add_new__' ? newBudgetCustomCategory.trim() : newBudgetCategory;
                            if (cat && parsePrice(newBudgetAmount) > 0) {
                              addBudgetItem(cat, newBudgetAmount);
                              setNewBudgetAmount('');
                              if (newBudgetCategory === '__add_new__') { setNewBudgetCustomCategory(''); setNewBudgetCategory(''); }
                            }
                          }}
                          className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                          title="Add"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary & progress */}
                  {(() => {
                    const items = currentTrip.budgetItems || [];
                    const totalBudget = items.reduce((s, b) => s + b.amount, 0);
                    const totalActual = items.reduce((s, b) => s + getActualForCategory(currentTrip, b.category), 0);
                    const pctUsed = totalBudget > 0 ? Math.min(150, (totalActual / totalBudget) * 100) : 0;
                    const pieData = items.map(bi => ({
                      name: BUDGET_CATEGORIES.find(c => c.id === bi.category)?.label || bi.category,
                      value: getActualForCategory(currentTrip, bi.category)
                    })).filter(d => d.value > 0);
                    const COLORS = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];
                    return (
                      <>
                        {items.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-gray-200 grid sm:grid-cols-2 gap-6">
                            <div>
                              <div className="text-sm text-gray-600 mb-1">Total Budget / Actual</div>
                              <div className="text-2xl font-bold text-gray-900">${totalActual.toLocaleString(0)} / ${totalBudget.toLocaleString(0)}</div>
                              <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all ${pctUsed > 100 ? 'bg-red-500' : pctUsed > 80 ? 'bg-amber-500' : 'bg-indigo-600'}`} style={{ width: `${Math.min(100, pctUsed)}%` }} />
                              </div>
                              <p className="text-xs text-gray-600 mt-2">
                                {totalActual > totalBudget ? (
                                  <span className="text-red-600">Over budget by ${(totalActual - totalBudget).toLocaleString(0)}</span>
                                ) : (
                                  <span>${(totalBudget - totalActual).toLocaleString(0)} remaining</span>
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                        {pieData.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="text-base font-semibold text-gray-900 mb-4">Spending by Category</h4>
                            <div className="h-64 flex items-stretch">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ top: 20, right: 140, left: 20, bottom: 20 }}>
                                  <Pie data={pieData} cx="38%" cy="50%" innerRadius={45} outerRadius={85} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine>
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                  </Pie>
                                  <Tooltip formatter={(v) => [`$${Number(v).toLocaleString(0)}`, 'Actual']} />
                                  <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: 16 }} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Travel Profile</h2>
                  <p className="text-gray-600">Manage your travel preferences</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Demo Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Load a sample trip with flights, hotels, activities, and budget items to explore the app.
              </p>
              <button
                onClick={() => {
                  const demo = getDefaultTrip();
                  const baseId = Date.now();
                  demo.id = baseId;
                  (demo.flights || []).forEach((f, i) => { f.id = baseId + 1000 + i; });
                  (demo.hotels || []).forEach((h, i) => { h.id = baseId + 2000 + i; });
                  (demo.activities || []).forEach((a, i) => { a.id = baseId + 3000 + i; });
                  (demo.budgetItems || []).forEach((b, i) => { b.id = baseId + 4000 + i; });
                  setTrips(prev => [...prev, demo]);
                  setCurrentTrip(demo);
                  setActiveTab('trips');
                  setTripViewTab('itinerary');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Install Demo Data
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Travel Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Total Trips</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-600">{trips.length}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Plane className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Flights Taken</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-600">
                    {trips.reduce((sum, trip) => sum + trip.flights.length, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Hotel className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Hotel Stays</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-600">
                    {trips.reduce((sum, trip) => sum + trip.hotels.length, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Backup</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your trips are saved in your browser. Export a backup to keep your data across devices or future builds.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  Export Backup
                </button>
                <input
                  ref={importInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={importData}
                  className="hidden"
                />
                <button
                  onClick={() => importInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
                >
                  <Upload className="w-5 h-5" />
                  Import Backup
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Destinations</h3>
              {trips.length > 0 ? (
                <div className="space-y-2">
                  {trips.slice(0, 5).map(trip => (
                    <div key={trip.id} className="flex items-center gap-3 py-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="text-gray-700">{trip.destination}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">No destinations yet. Start planning your first trip!</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around">
            <button
              onClick={() => {
                setActiveTab('trips');
                setCurrentTrip(null);
              }}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === 'trips' && !currentTrip 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Home className={`w-6 h-6 mb-1 ${activeTab === 'trips' && !currentTrip ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('trips');
                setTripViewTab('itinerary');
                if (!currentTrip && trips.length > 0) setCurrentTrip(trips[0]);
              }}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === 'trips' && currentTrip && tripViewTab === 'itinerary' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Briefcase className={`w-6 h-6 mb-1 ${activeTab === 'trips' && currentTrip && tripViewTab === 'itinerary' ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
              <span className="text-xs font-medium">Itinerary</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('trips');
                setTripViewTab('budget');
                if (!currentTrip && trips.length > 0) setCurrentTrip(trips[0]);
              }}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === 'trips' && tripViewTab === 'budget' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <DollarSign className={`w-6 h-6 mb-1 ${activeTab === 'trips' && tripViewTab === 'budget' ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
              <span className="text-xs font-medium">Budget</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === 'profile' 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <User className={`w-6 h-6 mb-1 ${activeTab === 'profile' ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
