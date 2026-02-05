import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Plane, Hotel, Plus, MapPin, ChevronRight, Trash2, Edit2, X, Home, Briefcase, User, CalendarDays } from 'lucide-react';

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
function CalendarView({ trip, onEditItem, onDeleteItem, formatDate }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (trip.startDate) {
      return new Date(trip.startDate);
    }
    return new Date();
  });

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

  // Get events for a specific date
  const getEventsForDate = (date) => {
    if (!date) return [];
    
    const events = [];
    const dateStr = date.toISOString().split('T')[0];
    
    // Check flights
    trip.flights.forEach(flight => {
      if (flight.departureTime) {
        const flightDate = new Date(flight.departureTime).toISOString().split('T')[0];
        if (flightDate === dateStr) {
          events.push({
            ...flight,
            type: 'flight-departure',
            displayText: `${flight.airline} ${flight.flightNumber}`,
            color: 'blue'
          });
        }
      }
      if (flight.arrivalTime) {
        const arrivalDate = new Date(flight.arrivalTime).toISOString().split('T')[0];
        if (arrivalDate === dateStr) {
          events.push({
            ...flight,
            type: 'flight-arrival',
            displayText: `Arrive ${flight.arrivalAirport}`,
            color: 'cyan'
          });
        }
      }
    });
    
    // Check hotel check-ins
    trip.hotels.forEach(hotel => {
      if (hotel.checkInDate === dateStr) {
        events.push({
          ...hotel,
          type: 'hotel-checkin',
          displayText: `Stay: ${hotel.hotelName}`,
          color: 'green'
        });
      }
      if (hotel.checkOutDate === dateStr) {
        events.push({
          ...hotel,
          type: 'hotel-checkout',
          displayText: `Checkout ${hotel.hotelName}`,
          color: 'orange'
        });
      }
    });
    
    return events;
  };

  // Check if date is during hotel stay (but not check-in or checkout day)
  const isHotelStayDay = (date) => {
    if (!date) return null;
    const dateStr = date.toISOString().split('T')[0];
    return trip.hotels.find(hotel => {
      if (!hotel.checkInDate || !hotel.checkOutDate) return false;
      return dateStr > hotel.checkInDate && dateStr < hotel.checkOutDate;
    });
  };

  // Check if date is in trip range
  const isInTripRange = (date) => {
    if (!date || !trip.startDate || !trip.endDate) return false;
    const dateStr = date.toISOString().split('T')[0];
    return dateStr >= trip.startDate && dateStr <= trip.endDate;
  };

  const monthGrid = generateMonthGrid();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date().toISOString().split('T')[0];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getEventColor = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      cyan: 'bg-cyan-500 text-white',
      green: 'bg-green-500 text-white',
      orange: 'bg-orange-500 text-white',
      purple: 'bg-purple-500 text-white',
      red: 'bg-red-500 text-white',
      yellow: 'bg-yellow-500 text-gray-900'
    };
    return colors[color] || 'bg-gray-500 text-white';
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
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
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-gray-700">Flight Departure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cyan-500"></div>
            <span className="text-gray-700">Flight Arrival</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className="text-gray-700">Hotel Check-in</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500"></div>
            <span className="text-gray-700">Hotel Check-out</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-semibold text-gray-700 text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        {monthGrid.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 border-b border-gray-200 last:border-b-0">
            {week.map((date, dayIdx) => {
              const dateStr = date?.toISOString().split('T')[0];
              const isToday = dateStr === today;
              const inTripRange = isInTripRange(date);
              const events = getEventsForDate(date);
              const hotelStay = isHotelStayDay(date);
              const hasMoreEvents = events.length > 3;
              
              return (
                <div
                  key={dayIdx}
                  className={`min-h-[120px] p-2 border-r border-gray-200 last:border-r-0 ${
                    !date ? 'bg-gray-50' : ''
                  } ${inTripRange ? 'bg-indigo-50/30' : ''} ${hotelStay ? 'bg-purple-50/40' : ''}`}
                >
                  {date && (
                    <>
                      <div className={`text-right mb-1 ${
                        isToday 
                          ? 'w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center ml-auto font-bold text-sm' 
                          : 'text-gray-900 font-medium text-sm'
                      }`}>
                        {date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {events.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className={`text-xs px-2 py-0.5 rounded truncate ${getEventColor(event.color)}`}
                            title={event.displayText}
                          >
                            {event.displayText}
                          </div>
                        ))}
                        {hasMoreEvents && (
                          <div className="text-xs text-gray-600 px-2">
                            +{events.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VacationTracker() {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('tripTrackerTrips');
    return savedTrips ? JSON.parse(savedTrips) : [];
  });
  const [currentTrip, setCurrentTrip] = useState(null);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [itemType, setItemType] = useState('flight');
  const [activeTab, setActiveTab] = useState('home');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
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

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tripTrackerTrips', JSON.stringify(trips));
  }, [trips]);

  // New trip form state
  const [newTrip, setNewTrip] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: ''
  });

  // New item form state
  const [newItem, setNewItem] = useState({
    // Flight fields
    airline: '',
    flightNumber: '',
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    confirmationNumber: '',
    // Hotel fields
    hotelName: '',
    checkInDate: '',
    checkOutDate: '',
    address: '',
    roomType: '',
    nights: 1
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
      hotels: []
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
        airline: newItem.airline,
        flightNumber: newItem.flightNumber,
        departureAirport: newItem.departureAirport,
        arrivalAirport: newItem.arrivalAirport,
        departureTime: newItem.departureTime,
        arrivalTime: newItem.arrivalTime,
        confirmationNumber: newItem.confirmationNumber
      };
      
      const updatedTrip = {
        ...currentTrip,
        flights: [...currentTrip.flights, flight]
      };
      
      updateTrip(updatedTrip);
    } else {
      if (!newItem.hotelName) return;
      
      const hotel = {
        id: Date.now(),
        type: 'hotel',
        hotelName: newItem.hotelName,
        checkInDate: newItem.checkInDate,
        checkOutDate: newItem.checkOutDate,
        address: newItem.address,
        roomType: newItem.roomType,
        confirmationNumber: newItem.confirmationNumber,
        nights: newItem.nights
      };
      
      const updatedTrip = {
        ...currentTrip,
        hotels: [...currentTrip.hotels, hotel]
      };
      
      updateTrip(updatedTrip);
    }
    
    resetItemForm();
    setShowAddItem(false);
  };

  const updateTrip = (updatedTrip) => {
    setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    setCurrentTrip(updatedTrip);
  };

  const deleteItem = (itemId, itemType) => {
    const updatedTrip = {
      ...currentTrip,
      [itemType === 'flight' ? 'flights' : 'hotels']: 
        currentTrip[itemType === 'flight' ? 'flights' : 'hotels'].filter(item => item.id !== itemId)
    };
    updateTrip(updatedTrip);
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setItemType(item.type);
    setNewItem(item);
    setShowAddItem(true);
  };

  const updateItem = () => {
    if (itemType === 'flight') {
      const updatedTrip = {
        ...currentTrip,
        flights: currentTrip.flights.map(f => f.id === editingItem.id ? { ...newItem, id: editingItem.id, type: 'flight' } : f)
      };
      updateTrip(updatedTrip);
    } else {
      const updatedTrip = {
        ...currentTrip,
        hotels: currentTrip.hotels.map(h => h.id === editingItem.id ? { ...newItem, id: editingItem.id, type: 'hotel' } : h)
      };
      updateTrip(updatedTrip);
    }
    
    resetItemForm();
    setShowAddItem(false);
    setEditingItem(null);
  };

  const resetItemForm = () => {
    setNewItem({
      airline: '', flightNumber: '', departureAirport: '', arrivalAirport: '',
      departureTime: '', arrivalTime: '', confirmationNumber: '',
      hotelName: '', checkInDate: '', checkOutDate: '', address: '', roomType: '', nights: 1
    });
    setEditingItem(null);
    setItemType('flight');
  };

  const deleteTrip = (tripId) => {
    setTrips(trips.filter(t => t.id !== tripId));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TripTracker</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Trips Dropdown */}
              {trips.length > 0 && (
                <div className="relative" ref={tripsDropdownRef}>
                  <button
                    onClick={() => setShowTripsDropdown(!showTripsDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Briefcase className="w-5 h-5" />
                    <span className="hidden sm:inline">My Trips</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${showTripsDropdown ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showTripsDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                      <div className="p-2">
                        {trips.map(trip => (
                          <button
                            key={trip.id}
                            onClick={() => {
                              setCurrentTrip(trip);
                              setActiveTab('trips');
                              setViewMode('calendar');
                              setShowTripsDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors group"
                          >
                            <div className="font-medium text-gray-900 group-hover:text-indigo-600">
                              {trip.name}
                            </div>
                            <div className="text-sm text-gray-600">{trip.destination}</div>
                            {trip.startDate && trip.endDate && (
                              <div className="text-xs text-gray-500 mt-1">
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
              
              {/* Back to Trips */}
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
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
                    <input
                      type="date"
                      value={newTrip.startDate}
                      onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={newTrip.endDate}
                      min={newTrip.startDate}
                      onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

        {/* Add Item Modal */}
        {showAddItem && currentTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 my-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Edit' : 'Add'} {itemType === 'flight' ? 'Flight' : 'Hotel'}
                </h2>
                <button onClick={() => {
                  setShowAddItem(false);
                  setEditingItem(null);
                  resetItemForm();
                  setItemType('flight');
                }} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Type Toggle */}
              {!editingItem && (
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setItemType('flight')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      itemType === 'flight' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Plane className="w-4 h-4 inline mr-2" />
                    Flight
                  </button>
                  <button
                    onClick={() => setItemType('hotel')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      itemType === 'hotel' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Hotel className="w-4 h-4 inline mr-2" />
                    Hotel
                  </button>
                </div>
              )}
              
              <div className="space-y-4">
                {itemType === 'flight' ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                        <input
                          type="date"
                          value={newItem.checkInDate}
                          onChange={(e) => setNewItem({ ...newItem, checkInDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out</label>
                        <input
                          type="date"
                          value={newItem.checkOutDate}
                          min={newItem.checkInDate}
                          onChange={(e) => setNewItem({ ...newItem, checkOutDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                  </>
                )}
                
                <button
                  onClick={editingItem ? updateItem : addItem}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  {editingItem ? 'Update' : 'Add'} {itemType === 'flight' ? 'Flight' : 'Hotel'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {activeTab === 'home' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to TripTracker</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your all-in-one vacation planning companion. Track flights, hotels, and create amazing travel itineraries.
            </p>
            <div className="flex gap-4 justify-center mb-8">
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
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
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
                            deleteTrip(trip.id);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentTrip.name}</h2>
                  <p className="text-xl text-indigo-600 font-medium mb-3">{currentTrip.destination}</p>
                  {currentTrip.startDate && currentTrip.endDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>{formatDate(currentTrip.startDate)} - {formatDate(currentTrip.endDate)}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteTrip(currentTrip.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CalendarDays className="w-5 h-5" />
                Calendar View
              </button>
            </div>

            {viewMode === 'list' ? (
              <>
            {/* Quick Add Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => {
                  setItemType('flight');
                  setShowAddItem(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                <Plane className="w-5 h-5" />
                Add Flight
              </button>
              <button
                onClick={() => {
                  setItemType('hotel');
                  setShowAddItem(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                <Hotel className="w-5 h-5" />
                Add Hotel
              </button>
            </div>

            {/* Flights Section */}
            {currentTrip.flights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-indigo-600" />
                  Flights
                </h3>
                <div className="space-y-3">
                  {currentTrip.flights.map(flight => (
                    <div key={flight.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
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
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(flight.id, 'flight')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-700">
                        <div className="flex-1">
                          <div className="text-2xl font-bold">{flight.departureAirport}</div>
                          {flight.departureTime && (
                            <div className="text-sm text-gray-600">
                              {new Date(flight.departureTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{' '}
                              {new Date(flight.departureTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
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
                              {new Date(flight.arrivalTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{' '}
                              {new Date(flight.arrivalTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
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
                    <div key={hotel.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
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
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(hotel.id, 'hotel')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
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

            {/* Empty State */}
            {currentTrip.flights.length === 0 && currentTrip.hotels.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start planning your trip</h3>
                <p className="text-gray-600 mb-6">Add flights and hotels to organize your vacation</p>
              </div>
            )}
            </>
            ) : (
              /* Calendar View */
              <CalendarView trip={currentTrip} onEditItem={startEdit} onDeleteItem={deleteItem} formatDate={formatDate} />
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Statistics</h3>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-around">
            <button
              onClick={() => {
                setActiveTab('home');
                setCurrentTrip(null);
              }}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === 'home' 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className={`w-6 h-6 mb-1 ${activeTab === 'home' ? 'fill-indigo-600' : ''}`} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('trips');
                setCurrentTrip(null);
              }}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === 'trips' 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase className={`w-6 h-6 mb-1 ${activeTab === 'trips' ? 'fill-indigo-600' : ''}`} />
              <span className="text-xs font-medium">Trips</span>
            </button>
            
            <button
              onClick={() => {
                if (currentTrip) {
                  setViewMode('calendar');
                  setActiveTab('trips');
                } else if (trips.length > 0) {
                  setCurrentTrip(trips[0]);
                  setViewMode('calendar');
                  setActiveTab('trips');
                }
              }}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                viewMode === 'calendar' && currentTrip
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <CalendarDays className={`w-6 h-6 mb-1 ${viewMode === 'calendar' && currentTrip ? 'fill-indigo-600' : ''}`} />
              <span className="text-xs font-medium">Calendar</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                activeTab === 'profile' 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className={`w-6 h-6 mb-1 ${activeTab === 'profile' ? 'fill-indigo-600' : ''}`} />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
