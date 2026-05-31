// data.jsx — Mock Singapore food data for BiteBudget
// Exports: PLACES, CUISINES, DIETARY_TAGS

const PLACES = [
  {
    id: 1, name: "Tian Tian Chicken Rice", location: "Maxwell Food Centre",
    cuisine: ["Chinese", "Hawker"], dietary: [], lat: 38, lng: 52,
    distance: 0.3, rating: 4.7, reviews: 2841, verified: true,
    verifiedDate: "2 days ago", verifiedBy: "community",
    hours: "10:00 AM – 8:00 PM", open: true,
    cheapest: 4.50, priceRange: [4.50, 16.00], typicalMeal: 6.50,
    popular: ["Hainanese Chicken Rice", "Roasted Chicken"],
    heroColor: "#F5E6D0",
    menu: [
      { section: "Rice", items: [
        { name: "Chicken Rice (S)", price: 4.50, verified: true, lastUpdated: "2 days ago" },
        { name: "Chicken Rice (L)", price: 5.50, verified: true, lastUpdated: "2 days ago" },
        { name: "Drumstick Rice", price: 6.50, verified: true, lastUpdated: "5 days ago" },
      ]},
      { section: "Sides", items: [
        { name: "Steamed Chicken", price: 14.00, portion: "Half", verified: true, lastUpdated: "1 week ago" },
        { name: "Roasted Chicken", price: 14.00, portion: "Half", verified: false, lastUpdated: "2 weeks ago" },
        { name: "Bean Sprouts", price: 4.00, verified: true, lastUpdated: "2 days ago" },
        { name: "Braised Egg", price: 1.00, verified: true, lastUpdated: "2 days ago" },
      ]},
      { section: "Drinks", items: [
        { name: "Iced Barley", price: 1.50, verified: true, lastUpdated: "1 week ago" },
        { name: "Lime Juice", price: 1.80, verified: true, lastUpdated: "1 week ago" },
      ]},
    ],
  },
  {
    id: 2, name: "Hill St Tai Hwa Pork Noodle", location: "Crawford Lane",
    cuisine: ["Chinese", "Hawker"], dietary: [], lat: 25, lng: 68,
    distance: 0.8, rating: 4.5, reviews: 1923, verified: true,
    verifiedDate: "5 days ago", verifiedBy: "merchant",
    hours: "9:30 AM – 9:00 PM", open: true,
    cheapest: 6.00, priceRange: [6.00, 12.00], typicalMeal: 8.00,
    popular: ["Bak Chor Mee", "Dry Mee Pok"],
    heroColor: "#E8D8C8",
    menu: [
      { section: "Noodles", items: [
        { name: "Bak Chor Mee (S)", price: 6.00, verified: true, lastUpdated: "5 days ago" },
        { name: "Bak Chor Mee (L)", price: 8.00, verified: true, lastUpdated: "5 days ago" },
        { name: "Mee Kia Dry", price: 7.00, verified: true, lastUpdated: "1 week ago" },
        { name: "Mee Pok Dry", price: 7.00, verified: true, lastUpdated: "1 week ago" },
      ]},
    ],
  },
  {
    id: 3, name: "Liao Fan Soya Sauce Chicken", location: "Chinatown Complex",
    cuisine: ["Chinese", "Hawker"], dietary: [], lat: 45, lng: 38,
    distance: 0.5, rating: 4.3, reviews: 3102, verified: true,
    verifiedDate: "1 day ago", verifiedBy: "community",
    hours: "10:30 AM – 7:30 PM", open: true,
    cheapest: 3.80, priceRange: [3.80, 15.00], typicalMeal: 5.50,
    popular: ["Soya Sauce Chicken Rice", "Char Siew Rice"],
    heroColor: "#E5D5C0",
    menu: [
      { section: "Rice", items: [
        { name: "Soya Sauce Chicken Rice", price: 3.80, verified: true, lastUpdated: "1 day ago" },
        { name: "Char Siew Rice", price: 4.50, verified: true, lastUpdated: "1 day ago" },
        { name: "Roasted Pork Rice", price: 4.50, verified: true, lastUpdated: "3 days ago" },
      ]},
      { section: "Combo", items: [
        { name: "2-item Combo Rice", price: 5.80, verified: true, lastUpdated: "1 day ago" },
        { name: "3-item Combo Rice", price: 7.50, verified: false, lastUpdated: "2 weeks ago" },
      ]},
    ],
  },
  {
    id: 4, name: "Mr & Mrs Mohgan's", location: "Crane Road",
    cuisine: ["Indian", "Hawker"], dietary: ["Halal"], lat: 60, lng: 72,
    distance: 1.2, rating: 4.6, reviews: 987, verified: true,
    verifiedDate: "3 days ago", verifiedBy: "community",
    hours: "6:30 AM – 1:00 PM", open: false,
    cheapest: 1.50, priceRange: [1.50, 6.00], typicalMeal: 4.00,
    popular: ["Crispy Prata", "Egg Prata"],
    heroColor: "#F0E0C8",
    menu: [
      { section: "Prata", items: [
        { name: "Plain Prata", price: 1.50, verified: true, lastUpdated: "3 days ago" },
        { name: "Egg Prata", price: 2.00, verified: true, lastUpdated: "3 days ago" },
        { name: "Cheese Prata", price: 2.50, verified: true, lastUpdated: "1 week ago" },
        { name: "Mushroom Prata", price: 3.00, verified: true, lastUpdated: "1 week ago" },
      ]},
      { section: "Drinks", items: [
        { name: "Teh Tarik", price: 1.50, verified: true, lastUpdated: "3 days ago" },
        { name: "Milo Dinosaur", price: 2.50, verified: true, lastUpdated: "1 week ago" },
      ]},
    ],
  },
  {
    id: 5, name: "328 Katong Laksa", location: "East Coast Road",
    cuisine: ["Malay", "Hawker"], dietary: [], lat: 72, lng: 45,
    distance: 2.1, rating: 4.4, reviews: 1567, verified: true,
    verifiedDate: "1 week ago", verifiedBy: "merchant",
    hours: "10:00 AM – 10:00 PM", open: true,
    cheapest: 6.00, priceRange: [6.00, 12.00], typicalMeal: 8.00,
    popular: ["Katong Laksa", "Otah"],
    heroColor: "#F2D9C4",
    menu: [
      { section: "Laksa", items: [
        { name: "Laksa (S)", price: 6.00, verified: true, lastUpdated: "1 week ago" },
        { name: "Laksa (M)", price: 8.00, verified: true, lastUpdated: "1 week ago" },
        { name: "Laksa (L)", price: 11.00, verified: true, lastUpdated: "1 week ago" },
      ]},
      { section: "Sides", items: [
        { name: "Otah (2pcs)", price: 3.00, verified: true, lastUpdated: "2 weeks ago" },
      ]},
    ],
  },
  {
    id: 6, name: "Song Fa Bak Kut Teh", location: "New Bridge Road",
    cuisine: ["Chinese", "Restaurant"], dietary: [], lat: 32, lng: 30,
    distance: 0.6, rating: 4.2, reviews: 2234, verified: true,
    verifiedDate: "4 days ago", verifiedBy: "merchant",
    hours: "9:00 AM – 9:30 PM", open: true,
    cheapest: 7.50, priceRange: [7.50, 25.00], typicalMeal: 14.00,
    popular: ["Pork Ribs Soup", "Braised Pig Trotter"],
    heroColor: "#DDE8D8",
    menu: [
      { section: "Soup", items: [
        { name: "Pork Ribs Soup", price: 7.90, verified: true, lastUpdated: "4 days ago" },
        { name: "Premium Ribs", price: 10.90, verified: true, lastUpdated: "4 days ago" },
        { name: "Pig Kidney Soup", price: 8.90, verified: true, lastUpdated: "1 week ago" },
      ]},
      { section: "Sides", items: [
        { name: "Braised Pig Trotter", price: 8.90, verified: true, lastUpdated: "4 days ago" },
        { name: "Salted Vegetables", price: 5.50, verified: true, lastUpdated: "1 week ago" },
        { name: "You Tiao (2pcs)", price: 2.50, verified: true, lastUpdated: "4 days ago" },
      ]},
    ],
  },
  {
    id: 7, name: "The Coconut Club", location: "Ann Siang Hill",
    cuisine: ["Malay", "Restaurant"], dietary: ["Halal"], lat: 50, lng: 25,
    distance: 0.9, rating: 4.5, reviews: 1102, verified: true,
    verifiedDate: "1 day ago", verifiedBy: "merchant",
    hours: "11:00 AM – 3:00 PM, 5:30–9:30 PM", open: true,
    cheapest: 12.80, priceRange: [12.80, 28.00], typicalMeal: 18.00,
    popular: ["Nasi Lemak", "Ayam Goreng Berempah"],
    heroColor: "#E0EDE5",
    menu: [
      { section: "Mains", items: [
        { name: "Nasi Lemak Set", price: 12.80, verified: true, lastUpdated: "1 day ago" },
        { name: "Ayam Goreng Berempah", price: 16.80, verified: true, lastUpdated: "1 day ago" },
        { name: "Beef Rendang", price: 18.80, verified: true, lastUpdated: "3 days ago" },
      ]},
      { section: "Sides", items: [
        { name: "Ikan Bilis", price: 3.00, verified: true, lastUpdated: "1 day ago" },
        { name: "Sambal Prawn", price: 6.00, verified: true, lastUpdated: "1 week ago" },
      ]},
    ],
  },
  {
    id: 8, name: "Ya Kun Kaya Toast", location: "Far East Square",
    cuisine: ["Chinese", "Cafe"], dietary: [], lat: 15, lng: 42,
    distance: 1.5, rating: 4.1, reviews: 4521, verified: true,
    verifiedDate: "6 days ago", verifiedBy: "merchant",
    hours: "7:30 AM – 7:00 PM", open: true,
    cheapest: 2.40, priceRange: [2.40, 8.80], typicalMeal: 5.50,
    popular: ["Kaya Toast Set", "French Toast"],
    heroColor: "#F5EDE0",
    menu: [
      { section: "Toast Sets", items: [
        { name: "Kaya Toast Set A", price: 4.80, verified: true, lastUpdated: "6 days ago" },
        { name: "Kaya Toast Set B", price: 5.80, verified: true, lastUpdated: "6 days ago" },
        { name: "French Toast Set", price: 6.80, verified: true, lastUpdated: "6 days ago" },
      ]},
      { section: "A La Carte", items: [
        { name: "Kaya Toast", price: 2.40, verified: true, lastUpdated: "6 days ago" },
        { name: "Soft Boiled Eggs", price: 2.20, verified: true, lastUpdated: "6 days ago" },
        { name: "Kopi", price: 2.00, verified: true, lastUpdated: "1 week ago" },
        { name: "Kopi-O", price: 1.80, verified: true, lastUpdated: "1 week ago" },
        { name: "Teh", price: 2.00, verified: true, lastUpdated: "1 week ago" },
      ]},
    ],
  },
];

const CUISINES = ["Chinese", "Malay", "Indian", "Western", "Japanese", "Korean", "Thai"];
const VENUE_TYPES = ["Hawker", "Restaurant", "Cafe"];
const DIETARY_TAGS = ["Halal", "Vegetarian"];
const SORT_OPTIONS = [
  { key: "cheapest", label: "Cheapest" },
  { key: "closest", label: "Closest" },
  { key: "rating", label: "Top Rated" },
  { key: "verified", label: "Most Verified" },
  { key: "value", label: "Best Value" },
];

Object.assign(window, { PLACES, CUISINES, VENUE_TYPES, DIETARY_TAGS, SORT_OPTIONS });
