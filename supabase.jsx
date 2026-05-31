// supabase.jsx — client init + async data helpers

const SUPABASE_URL = 'https://qlnmcmjjsbwywetxwmys.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbm1jbWpqc2J3eXdldHh3bXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDQyMjQsImV4cCI6MjA5MzE4MDIyNH0.Kki8GBfEa3gJLq_kjSyzaUfzIusSnpGtRidGgQHoc4E';

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function transformPlace(row) {
  return {
    ...row,
    open: row.open_now,
    reviews: row.review_count,
    verifiedDate: row.verified_date,
    verifiedBy: row.verified_by,
    typicalMeal: parseFloat(row.typical_meal),
    cheapest: parseFloat(row.cheapest),
    priceRange: [parseFloat(row.price_min), parseFloat(row.price_max)],
    heroColor: row.hero_color,
    distance: parseFloat((Math.abs(row.lat - 50) * 0.03 + Math.abs(row.lng - 45) * 0.03).toFixed(1)) || 0.5,
  };
}

function transformMenu(sections) {
  return (sections || []).map(s => ({
    section: s.name,
    items: (s.menu_items || []).sort((a, b) => a.name.localeCompare(b.name)).map(item => ({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      portion: item.portion,
      verified: item.verified,
      lastUpdated: item.last_updated,
    })),
  }));
}

async function fetchPlaces() {
  const { data, error } = await db.from('places').select('*').order('cheapest');
  if (error || !data) return null;
  return data.map(transformPlace);
}

async function fetchMenuForPlace(placeId) {
  const { data, error } = await db
    .from('menu_sections')
    .select('*, menu_items(*)')
    .eq('place_id', placeId)
    .order('sort_order');
  if (error || !data) return [];
  return transformMenu(data);
}

async function fetchSavedPlacesForUser(userId) {
  const { data, error } = await db
    .from('saved_places')
    .select('place_id, places(*)')
    .eq('user_id', userId);
  if (error || !data) return [];
  return data.filter(r => r.places).map(r => transformPlace(r.places));
}

Object.assign(window, { db, fetchPlaces, fetchMenuForPlace, fetchSavedPlacesForUser });
