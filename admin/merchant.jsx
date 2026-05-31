// merchant.jsx — BiteBudget Merchant Portal

const SUPABASE_URL = 'https://qlnmcmjjsbwywetxwmys.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbm1jbWpqc2J3eXdldHh3bXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDQyMjQsImV4cCI6MjA5MzE4MDIyNH0.Kki8GBfEa3gJLq_kjSyzaUfzIusSnpGtRidGgQHoc4E';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  primary: '#C23B22', primaryLight: '#FDF1EE',
  sidebar: '#1A1715', sidebarHover: '#2A2522', sidebarActive: '#C23B22',
  bg: '#F8F7F4', surface: '#FFFFFF', surfaceAlt: '#F3F0EB',
  text: '#1A1715', textSec: '#7A7067', textMuted: '#B0A89E',
  border: '#E8E0D8', shadow: 'rgba(26,23,21,0.07)',
  green: '#2D8B5D', greenLight: '#EAF6F0',
  amber: '#C47D3A', amberLight: '#FDF3E7',
  red: '#C23B22', redLight: '#FDF1EE',
};

const S = {
  card: { background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: '20px 24px' },
  input: {
    width: '100%', padding: '9px 12px', border: `1.5px solid ${C.border}`,
    borderRadius: 8, fontSize: 14, color: C.text, background: C.surface, outline: 'none',
  },
  btn: (variant = 'primary') => ({
    padding: '9px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700,
    cursor: 'pointer', transition: 'opacity 0.15s',
    background: variant === 'primary' ? C.primary : variant === 'ghost' ? 'none' : C.surfaceAlt,
    color: variant === 'primary' ? '#fff' : variant === 'danger' ? C.red : C.textSec,
    border: variant === 'ghost' ? `1.5px solid ${C.border}` : 'none',
  }),
  badge: (color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
    background: color === 'green' ? C.greenLight : color === 'amber' ? C.amberLight : C.redLight,
    color: color === 'green' ? C.green : color === 'amber' ? C.amber : C.red,
  }),
};

// ─── Tiny helpers ────────────────────────────────────────────────────────────
function Icon({ d, size = 18, color = 'currentColor' }) {
  return React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: color, style: { flexShrink: 0 } },
    React.createElement('path', { d })
  );
}

function Spinner() {
  return React.createElement('div', {
    style: {
      width: 20, height: 20, borderRadius: '50%',
      border: `2px solid ${C.border}`, borderTopColor: C.primary,
      animation: 'spin 0.7s linear infinite',
    }
  });
}

const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(spinStyle);

function Toast({ message, type, onDone }) {
  React.useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return React.createElement('div', {
    style: {
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
      background: type === 'error' ? C.red : '#1A1715', color: '#fff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
  }, message);
}

// ─── Auth screens ────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = React.useState('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [isErr, setIsErr] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    try {
      if (mode === 'signup') {
        const { error } = await db.auth.signUp({ email, password, options: { data: { display_name: name || email.split('@')[0] } } });
        if (error) throw error;
        setIsErr(false); setMsg('Check your email to confirm, then sign in.');
      } else {
        const { error } = await db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // onAuth fires via listener
      }
    } catch (err) { setIsErr(true); setMsg(err.message); }
    finally { setLoading(false); }
  };

  return React.createElement('div', {
    style: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg },
  },
    React.createElement('div', { style: { width: 400, padding: '40px', background: C.surface, borderRadius: 20, boxShadow: `0 8px 40px ${C.shadow}` } },
      // Logo
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 } },
        React.createElement('div', {
          style: { width: 40, height: 40, borderRadius: 10, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
          React.createElement('span', { style: { fontSize: 14, fontWeight: 900, color: '#fff' } }, 'BB')
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 15, fontWeight: 800, color: C.text } }, 'BiteBudget'),
          React.createElement('div', { style: { fontSize: 11, color: C.textMuted } }, 'Merchant Portal'),
        )
      ),
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px' } },
        mode === 'login' ? 'Sign in to your portal' : 'Create merchant account'),
      React.createElement('p', { style: { fontSize: 13, color: C.textSec, marginBottom: 24 } },
        mode === 'login' ? 'Manage your menus, prices, and verifications.' : 'Start managing your place on BiteBudget.'),
      React.createElement('form', { onSubmit: submit },
        mode === 'signup' && React.createElement('input', {
          placeholder: 'Your name', value: name, onChange: e => setName(e.target.value),
          style: { ...S.input, marginBottom: 10 },
        }),
        React.createElement('input', {
          type: 'email', placeholder: 'Email', value: email, onChange: e => setEmail(e.target.value),
          required: true, style: { ...S.input, marginBottom: 10 },
        }),
        React.createElement('input', {
          type: 'password', placeholder: 'Password', value: password, onChange: e => setPassword(e.target.value),
          required: true, style: { ...S.input, marginBottom: msg ? 10 : 20 },
        }),
        msg && React.createElement('div', {
          style: { fontSize: 12, padding: '8px 12px', borderRadius: 8, marginBottom: 16, lineHeight: 1.4,
            background: isErr ? C.redLight : C.greenLight, color: isErr ? C.red : C.green },
        }, msg),
        React.createElement('button', {
          type: 'submit', disabled: loading,
          style: { ...S.btn('primary'), width: '100%', padding: '11px', fontSize: 14 },
        }, loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'),
      ),
      React.createElement('button', {
        onClick: () => { setMode(m => m === 'login' ? 'signup' : 'login'); setMsg(''); },
        style: { width: '100%', marginTop: 14, background: 'none', border: 'none', fontSize: 13, color: C.textSec, cursor: 'pointer' },
      }, mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'),
    )
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const NAV = [
  { key: 'dashboard', label: 'Dashboard', d: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { key: 'places',    label: 'My Places',  d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
  { key: 'menu',      label: 'Menu Editor', d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' },
  { key: 'verifications', label: 'Verifications', d: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z' },
];

function Sidebar({ active, onNavigate, user, onLogout }) {
  return React.createElement('div', {
    style: {
      width: 220, background: C.sidebar, display: 'flex', flexDirection: 'column',
      padding: '20px 12px', flexShrink: 0, height: '100vh', position: 'sticky', top: 0,
    },
  },
    // Logo
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px', marginBottom: 32 } },
      React.createElement('div', { style: { width: 32, height: 32, borderRadius: 8, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement('span', { style: { fontSize: 11, fontWeight: 900, color: '#fff' } }, 'BB')
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 13, fontWeight: 800, color: '#fff' } }, 'BiteBudget'),
        React.createElement('div', { style: { fontSize: 10, color: 'rgba(255,255,255,0.4)' } }, 'Merchant'),
      )
    ),
    // Nav items
    NAV.map(item =>
      React.createElement('button', {
        key: item.key,
        onClick: () => onNavigate(item.key),
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 8, border: 'none',
          background: active === item.key ? C.sidebarActive : 'none',
          color: active === item.key ? '#fff' : 'rgba(255,255,255,0.55)',
          fontSize: 13, fontWeight: active === item.key ? 700 : 500,
          cursor: 'pointer', marginBottom: 2, transition: 'all 0.15s', textAlign: 'left',
        },
      },
        React.createElement(Icon, { d: item.d, size: 16, color: 'currentColor' }),
        item.label
      )
    ),
    // Bottom: user + logout
    React.createElement('div', { style: { marginTop: 'auto', padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' } },
      React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
        user?.email),
      React.createElement('button', {
        onClick: onLogout,
        style: { ...S.btn('ghost'), width: '100%', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 12 },
      }, 'Sign out')
    )
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ places, verifications }) {
  const pending = verifications.filter(v => v.status === 'pending').length;
  const totalItems = places.reduce((sum, p) => sum + (p._itemCount || 0), 0);

  const stats = [
    { label: 'My Places', value: places.length, icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', color: C.primary },
    { label: 'Menu Items', value: totalItems, icon: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z', color: C.green },
    { label: 'Pending Reviews', value: pending, icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z', color: pending > 0 ? C.amber : C.textMuted },
    { label: 'Total Reports', value: verifications.length, icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z', color: C.textSec },
  ];

  return React.createElement('div', null,
    React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' } }, 'Dashboard'),
    React.createElement('p', { style: { fontSize: 14, color: C.textSec, marginBottom: 28 } }, 'Overview of your places and activity'),

    // Stats grid
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 } },
      stats.map((s, i) =>
        React.createElement('div', { key: i, style: S.card },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: '-1px' } }, s.value),
              React.createElement('div', { style: { fontSize: 12, color: C.textSec, marginTop: 4 } }, s.label),
            ),
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement(Icon, { d: s.icon, size: 16, color: s.color })
            )
          )
        )
      )
    ),

    // Recent verifications
    pending > 0 && React.createElement('div', { style: S.card },
      React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, marginBottom: 16 } }, `⚠️  ${pending} price report${pending > 1 ? 's' : ''} need your attention`),
      verifications.filter(v => v.status === 'pending').slice(0, 5).map((v, i) =>
        React.createElement('div', {
          key: i,
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: i > 0 ? `1px solid ${C.border}` : 'none' },
        },
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600 } }, v.item_name),
            React.createElement('div', { style: { fontSize: 11, color: C.textSec, marginTop: 2 } }, v.place_name)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: 12, color: C.textSec } },
              v.reported_price
                ? `Reported: $${parseFloat(v.reported_price).toFixed(2)} (was $${parseFloat(v.current_price).toFixed(2)})`
                : `Confirmed at $${parseFloat(v.current_price).toFixed(2)}`
            ),
            React.createElement('span', { style: { ...S.badge('amber'), marginTop: 4 } }, 'Pending')
          )
        )
      )
    )
  );
}

// ─── Places list ─────────────────────────────────────────────────────────────
function PlacesList({ places, allPlaces, userId, onClaim, onRefresh, toast }) {
  const [claiming, setClaiming] = React.useState(null);
  const [editing, setEditing] = React.useState(null);
  const [editForm, setEditForm] = React.useState({});

  const unclaimedPlaces = allPlaces.filter(p => !p.merchant_id);

  const handleClaim = async (placeId) => {
    setClaiming(placeId);
    const { error } = await db.from('places').update({ merchant_id: userId }).eq('id', placeId);
    if (error) toast('Failed to claim place', 'error');
    else { toast('Place claimed! ✓'); onRefresh(); }
    setClaiming(null);
  };

  const handleSaveEdit = async () => {
    const { error } = await db.from('places').update({
      name: editForm.name, location: editForm.location,
      hours: editForm.hours, open_now: editForm.open_now,
    }).eq('id', editing.id);
    if (error) toast('Failed to save changes', 'error');
    else { toast('Changes saved ✓'); setEditing(null); onRefresh(); }
  };

  return React.createElement('div', null,
    React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' } }, 'My Places'),
    React.createElement('p', { style: { fontSize: 14, color: C.textSec, marginBottom: 28 } }, 'Manage your food places on BiteBudget'),

    // My places
    places.length === 0
      ? React.createElement('div', { style: { ...S.card, textAlign: 'center', padding: '48px 24px', color: C.textSec } },
          React.createElement('div', { style: { fontSize: 36, marginBottom: 12 } }, '📍'),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 6 } }, 'No places yet'),
          React.createElement('div', { style: { fontSize: 13 } }, 'Claim a place below to start managing it.')
        )
      : React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 } },
          places.map(place =>
            React.createElement('div', { key: place.id, style: { ...S.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 16, fontWeight: 700 } }, place.name),
                React.createElement('div', { style: { fontSize: 12, color: C.textSec, marginTop: 3 } },
                  `${place.location} · ${place.hours || 'Hours not set'}`),
                React.createElement('div', { style: { display: 'flex', gap: 8, marginTop: 8 } },
                  React.createElement('span', { style: S.badge(place.open_now ? 'green' : 'amber') }, place.open_now ? '● Open' : '● Closed'),
                  React.createElement('span', { style: S.badge('green') }, `$${parseFloat(place.cheapest).toFixed(2)} from`)
                )
              ),
              React.createElement('button', {
                onClick: () => { setEditing(place); setEditForm({ name: place.name, location: place.location, hours: place.hours, open_now: place.open_now }); },
                style: S.btn('ghost'),
              }, 'Edit details')
            )
          )
        ),

    // Edit modal
    editing && React.createElement('div', {
      style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
      onClick: () => setEditing(null),
    },
      React.createElement('div', { style: { ...S.card, width: 480, padding: '28px 32px' }, onClick: e => e.stopPropagation() },
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 800, marginBottom: 20 } }, 'Edit Place'),
        [['Name', 'name', 'text'], ['Location / Hawker Centre', 'location', 'text'], ['Opening Hours', 'hours', 'text']].map(([label, key, type]) =>
          React.createElement('div', { key, style: { marginBottom: 14 } },
            React.createElement('label', { style: { fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 5 } }, label),
            React.createElement('input', { type, value: editForm[key] || '', onChange: e => setEditForm(f => ({ ...f, [key]: e.target.value })), style: S.input })
          )
        ),
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('label', { style: { fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 5 } }, 'Status'),
          React.createElement('select', {
            value: editForm.open_now ? 'open' : 'closed',
            onChange: e => setEditForm(f => ({ ...f, open_now: e.target.value === 'open' })),
            style: S.input,
          },
            React.createElement('option', { value: 'open' }, 'Open now'),
            React.createElement('option', { value: 'closed' }, 'Closed'),
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10 } },
          React.createElement('button', { onClick: () => setEditing(null), style: S.btn('ghost') }, 'Cancel'),
          React.createElement('button', { onClick: handleSaveEdit, style: S.btn('primary') }, 'Save changes'),
        )
      )
    ),

    // Claim a place
    unclaimedPlaces.length > 0 && React.createElement('div', null,
      React.createElement('h2', { style: { fontSize: 16, fontWeight: 700, marginBottom: 14, color: C.textSec } }, 'Claim a place'),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        unclaimedPlaces.map(place =>
          React.createElement('div', {
            key: place.id,
            style: { ...S.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px' },
          },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600 } }, place.name),
              React.createElement('div', { style: { fontSize: 12, color: C.textSec } }, place.location),
            ),
            React.createElement('button', {
              onClick: () => handleClaim(place.id),
              disabled: claiming === place.id,
              style: S.btn('primary'),
            }, claiming === place.id ? 'Claiming…' : 'Claim this place')
          )
        )
      )
    )
  );
}

// ─── Menu Editor ──────────────────────────────────────────────────────────────
function MenuEditor({ places, toast }) {
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [editForm, setEditForm] = React.useState({});
  const [newItem, setNewItem] = React.useState({ sectionId: '', name: '', price: '', portion: '' });
  const [addingItem, setAddingItem] = React.useState(false);
  const [newSectionName, setNewSectionName] = React.useState('');
  const [addingSection, setAddingSection] = React.useState(false);

  React.useEffect(() => {
    if (selectedPlace) loadMenu(selectedPlace.id);
  }, [selectedPlace]);

  const loadMenu = async (placeId) => {
    setLoading(true);
    const { data } = await db.from('menu_sections')
      .select('*, menu_items(*)')
      .eq('place_id', placeId)
      .order('sort_order');
    setSections(data || []);
    setLoading(false);
  };

  const handleSaveItem = async () => {
    const { error } = await db.from('menu_items').update({
      name: editForm.name,
      price: parseFloat(editForm.price),
      portion: editForm.portion || null,
      verified: editForm.verified,
      last_updated: 'just now',
    }).eq('id', editingItem.id);
    if (error) toast('Failed to save', 'error');
    else { toast('Item updated ✓'); setEditingItem(null); loadMenu(selectedPlace.id); }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm('Delete this menu item?')) return;
    const { error } = await db.from('menu_items').delete().eq('id', itemId);
    if (error) toast('Failed to delete', 'error');
    else { toast('Item deleted'); loadMenu(selectedPlace.id); }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.sectionId) return;
    const { error } = await db.from('menu_items').insert({
      section_id: newItem.sectionId,
      place_id: selectedPlace.id,
      name: newItem.name,
      price: parseFloat(newItem.price),
      portion: newItem.portion || null,
      verified: false,
      last_updated: 'just now',
    });
    if (error) toast('Failed to add item', 'error');
    else { toast('Item added ✓'); setNewItem({ sectionId: '', name: '', price: '', portion: '' }); setAddingItem(false); loadMenu(selectedPlace.id); }
  };

  const handleAddSection = async () => {
    if (!newSectionName) return;
    const nextOrder = sections.length;
    const { error } = await db.from('menu_sections').insert({ place_id: selectedPlace.id, name: newSectionName, sort_order: nextOrder });
    if (error) toast('Failed to add section', 'error');
    else { toast('Section added ✓'); setNewSectionName(''); setAddingSection(false); loadMenu(selectedPlace.id); }
  };

  const handleMarkVerified = async (item) => {
    const { error } = await db.from('menu_items').update({ verified: !item.verified, last_updated: 'just now' }).eq('id', item.id);
    if (error) toast('Failed', 'error');
    else { toast(item.verified ? 'Unverified' : 'Marked verified ✓'); loadMenu(selectedPlace.id); }
  };

  if (places.length === 0) {
    return React.createElement('div', null,
      React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' } }, 'Menu Editor'),
      React.createElement('div', { style: { ...S.card, textAlign: 'center', padding: '48px', color: C.textSec } },
        'Claim a place first to edit its menu.'
      )
    );
  }

  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 } },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' } }, 'Menu Editor'),
        React.createElement('p', { style: { fontSize: 14, color: C.textSec } }, 'Edit prices and menu items')
      ),
      // Place selector
      React.createElement('select', {
        value: selectedPlace?.id || '',
        onChange: e => setSelectedPlace(places.find(p => p.id === e.target.value) || null),
        style: { ...S.input, width: 220 },
      },
        React.createElement('option', { value: '' }, 'Select a place…'),
        places.map(p => React.createElement('option', { key: p.id, value: p.id }, p.name))
      )
    ),

    !selectedPlace
      ? React.createElement('div', { style: { ...S.card, textAlign: 'center', padding: '48px', color: C.textSec } }, 'Select a place above to edit its menu.')
      : loading
        ? React.createElement('div', { style: { display: 'flex', justifyContent: 'center', padding: 40 } }, React.createElement(Spinner))
        : React.createElement('div', null,
            // Sections + items
            sections.map(section =>
              React.createElement('div', { key: section.id, style: { ...S.card, marginBottom: 16 } },
                React.createElement('h3', { style: { fontSize: 15, fontWeight: 700, marginBottom: 14, color: C.text } }, section.name),
                (section.menu_items || []).map((item, i) =>
                  React.createElement('div', {
                    key: item.id,
                    style: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? `1px solid ${C.border}` : 'none' },
                  },
                    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                      React.createElement('div', { style: { fontSize: 14, fontWeight: 500 } }, item.name),
                      item.portion && React.createElement('div', { style: { fontSize: 11, color: C.textMuted } }, item.portion),
                    ),
                    React.createElement('span', { style: S.badge(item.verified ? 'green' : 'amber') }, item.verified ? '✓ Verified' : 'Unverified'),
                    React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: C.primary, minWidth: 50, textAlign: 'right' } },
                      `$${parseFloat(item.price).toFixed(2)}`),
                    React.createElement('div', { style: { display: 'flex', gap: 6 } },
                      React.createElement('button', {
                        onClick: () => handleMarkVerified(item),
                        style: { ...S.btn('ghost'), padding: '5px 10px', fontSize: 11 },
                        title: item.verified ? 'Unverify' : 'Mark verified',
                      }, item.verified ? '✓' : '○'),
                      React.createElement('button', {
                        onClick: () => { setEditingItem(item); setEditForm({ name: item.name, price: item.price, portion: item.portion || '', verified: item.verified }); },
                        style: { ...S.btn('ghost'), padding: '5px 10px', fontSize: 11 },
                      }, 'Edit'),
                      React.createElement('button', {
                        onClick: () => handleDeleteItem(item.id),
                        style: { ...S.btn('ghost'), padding: '5px 10px', fontSize: 11, color: C.red },
                      }, 'Del'),
                    )
                  )
                ),
                // Add item to this section
                React.createElement('button', {
                  onClick: () => { setAddingItem(true); setNewItem(f => ({ ...f, sectionId: section.id })); },
                  style: { ...S.btn('ghost'), marginTop: 12, fontSize: 12, width: '100%' },
                }, '+ Add item to ' + section.name)
              )
            ),

            // Add section
            addingSection
              ? React.createElement('div', { style: { ...S.card, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 } },
                  React.createElement('input', {
                    placeholder: 'Section name (e.g. Rice, Drinks)', value: newSectionName,
                    onChange: e => setNewSectionName(e.target.value),
                    style: { ...S.input, flex: 1 },
                    onKeyDown: e => e.key === 'Enter' && handleAddSection(),
                    autoFocus: true,
                  }),
                  React.createElement('button', { onClick: handleAddSection, style: S.btn('primary') }, 'Add'),
                  React.createElement('button', { onClick: () => setAddingSection(false), style: S.btn('ghost') }, 'Cancel'),
                )
              : React.createElement('button', {
                  onClick: () => setAddingSection(true),
                  style: { ...S.btn('ghost'), width: '100%', marginBottom: 16 },
                }, '+ Add section'),
          ),

    // Edit item modal
    editingItem && React.createElement('div', {
      style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
      onClick: () => setEditingItem(null),
    },
      React.createElement('div', { style: { ...S.card, width: 440, padding: '28px 32px' }, onClick: e => e.stopPropagation() },
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 800, marginBottom: 20 } }, 'Edit Menu Item'),
        [['Item name', 'name', 'text'], ['Price (SGD)', 'price', 'number'], ['Portion note', 'portion', 'text']].map(([label, key, type]) =>
          React.createElement('div', { key, style: { marginBottom: 14 } },
            React.createElement('label', { style: { fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 5 } }, label),
            React.createElement('input', { type, value: editForm[key] || '', step: type === 'number' ? '0.10' : undefined, onChange: e => setEditForm(f => ({ ...f, [key]: e.target.value })), style: S.input })
          )
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 } },
          React.createElement('input', { type: 'checkbox', id: 'verified-chk', checked: editForm.verified || false, onChange: e => setEditForm(f => ({ ...f, verified: e.target.checked })) }),
          React.createElement('label', { htmlFor: 'verified-chk', style: { fontSize: 13, cursor: 'pointer' } }, 'Mark as verified'),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10 } },
          React.createElement('button', { onClick: () => setEditingItem(null), style: S.btn('ghost') }, 'Cancel'),
          React.createElement('button', { onClick: handleSaveItem, style: S.btn('primary') }, 'Save'),
        )
      )
    ),

    // Add item modal
    addingItem && React.createElement('div', {
      style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
      onClick: () => setAddingItem(false),
    },
      React.createElement('div', { style: { ...S.card, width: 440, padding: '28px 32px' }, onClick: e => e.stopPropagation() },
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 800, marginBottom: 20 } }, 'Add Menu Item'),
        React.createElement('div', { style: { marginBottom: 14 } },
          React.createElement('label', { style: { fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 5 } }, 'Section'),
          React.createElement('select', {
            value: newItem.sectionId, onChange: e => setNewItem(f => ({ ...f, sectionId: e.target.value })),
            style: S.input,
          },
            React.createElement('option', { value: '' }, 'Select section…'),
            sections.map(s => React.createElement('option', { key: s.id, value: s.id }, s.name))
          )
        ),
        [['Item name', 'name', 'text'], ['Price (SGD)', 'price', 'number'], ['Portion note (optional)', 'portion', 'text']].map(([label, key, type]) =>
          React.createElement('div', { key, style: { marginBottom: 14 } },
            React.createElement('label', { style: { fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 5 } }, label),
            React.createElement('input', { type, value: newItem[key] || '', step: type === 'number' ? '0.10' : undefined, onChange: e => setNewItem(f => ({ ...f, [key]: e.target.value })), style: S.input })
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10 } },
          React.createElement('button', { onClick: () => setAddingItem(false), style: S.btn('ghost') }, 'Cancel'),
          React.createElement('button', { onClick: handleAddItem, style: S.btn('primary') }, 'Add item'),
        )
      )
    ),
  );
}

// ─── Verifications ────────────────────────────────────────────────────────────
function Verifications({ verifications, onRefresh, toast }) {
  const [filter, setFilter] = React.useState('pending');

  const filtered = verifications.filter(v => filter === 'all' || v.status === filter);

  const handle = async (v, action) => {
    if (action === 'confirm') {
      // Accept the verified price — update menu item
      await db.from('menu_items').update({ price: v.verified_price, verified: true, last_updated: 'just now' }).eq('id', v.menu_item_id);
      await db.from('price_verifications').update({ status: 'confirmed' }).eq('id', v.id);
      toast('Price confirmed and updated ✓');
    } else if (action === 'accept_report') {
      // Accept the reported new price
      await db.from('menu_items').update({ price: v.reported_price, verified: true, last_updated: 'just now' }).eq('id', v.menu_item_id);
      await db.from('price_verifications').update({ status: 'confirmed' }).eq('id', v.id);
      toast('Price updated to reported amount ✓');
    } else if (action === 'reject') {
      await db.from('price_verifications').update({ status: 'rejected' }).eq('id', v.id);
      toast('Report rejected');
    }
    onRefresh();
  };

  return React.createElement('div', null,
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 } },
      React.createElement('div', null,
        React.createElement('h1', { style: { fontSize: 24, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' } }, 'Price Verifications'),
        React.createElement('p', { style: { fontSize: 14, color: C.textSec } }, 'Community price reports for your places')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6 } },
        ['pending', 'confirmed', 'rejected', 'all'].map(f =>
          React.createElement('button', {
            key: f, onClick: () => setFilter(f),
            style: {
              ...S.btn(filter === f ? 'primary' : 'ghost'),
              padding: '6px 14px', fontSize: 12, textTransform: 'capitalize',
            },
          }, f)
        )
      )
    ),

    filtered.length === 0
      ? React.createElement('div', { style: { ...S.card, textAlign: 'center', padding: '48px', color: C.textSec } },
          React.createElement('div', { style: { fontSize: 36, marginBottom: 12 } }, '✅'),
          React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: C.text } }, `No ${filter === 'all' ? '' : filter} reports`),
        )
      : React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          filtered.map(v =>
            React.createElement('div', { key: v.id, style: { ...S.card, display: 'flex', gap: 16, alignItems: 'center' } },
              // Status dot
              React.createElement('div', {
                style: { width: 8, height: 8, borderRadius: '50%', background: v.status === 'pending' ? C.amber : v.status === 'confirmed' ? C.green : C.textMuted, flexShrink: 0 },
              }),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('div', { style: { fontSize: 14, fontWeight: 600 } }, v.item_name),
                React.createElement('div', { style: { fontSize: 12, color: C.textSec, marginTop: 2 } },
                  `${v.place_name} · Submitted ${new Date(v.created_at).toLocaleDateString()}`),
                v.notes && React.createElement('div', { style: { fontSize: 12, color: C.textSec, marginTop: 4, fontStyle: 'italic' } }, `"${v.notes}"`),
              ),
              // Price info
              React.createElement('div', { style: { textAlign: 'right', flexShrink: 0 } },
                v.reported_price
                  ? React.createElement('div', null,
                      React.createElement('div', { style: { fontSize: 11, color: C.textSec } }, 'Reported new price'),
                      React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: C.red } }, `$${parseFloat(v.reported_price).toFixed(2)}`),
                      React.createElement('div', { style: { fontSize: 11, color: C.textMuted } }, `was $${parseFloat(v.current_price).toFixed(2)}`),
                    )
                  : React.createElement('div', null,
                      React.createElement('div', { style: { fontSize: 11, color: C.textSec } }, 'Price confirmed at'),
                      React.createElement('div', { style: { fontSize: 16, fontWeight: 800, color: C.green } }, `$${parseFloat(v.verified_price || v.current_price).toFixed(2)}`),
                    )
              ),
              // Actions
              v.status === 'pending' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 } },
                v.reported_price
                  ? React.createElement(React.Fragment, null,
                      React.createElement('button', { onClick: () => handle(v, 'accept_report'), style: { ...S.btn('primary'), padding: '6px 12px', fontSize: 12 } }, 'Accept change'),
                      React.createElement('button', { onClick: () => handle(v, 'reject'), style: { ...S.btn('ghost'), padding: '6px 12px', fontSize: 12 } }, 'Reject')
                    )
                  : React.createElement(React.Fragment, null,
                      React.createElement('button', { onClick: () => handle(v, 'confirm'), style: { ...S.btn('primary'), padding: '6px 12px', fontSize: 12 } }, 'Accept ✓'),
                      React.createElement('button', { onClick: () => handle(v, 'reject'), style: { ...S.btn('ghost'), padding: '6px 12px', fontSize: 12 } }, 'Reject')
                    )
              ),
              v.status !== 'pending' && React.createElement('span', { style: S.badge(v.status === 'confirmed' ? 'green' : 'amber') },
                v.status === 'confirmed' ? 'Confirmed' : 'Rejected'
              )
            )
          )
        )
  );
}

// ─── App shell ───────────────────────────────────────────────────────────────
function MerchantApp() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState('dashboard');
  const [myPlaces, setMyPlaces] = React.useState([]);
  const [allPlaces, setAllPlaces] = React.useState([]);
  const [verifications, setVerifications] = React.useState([]);
  const [toast, setToast] = React.useState(null);

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  React.useEffect(() => {
    const { data: { subscription } } = db.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    db.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (user) { loadData(); }
  }, [user]);

  const loadData = async () => {
    const [{ data: all }, { data: verifs }] = await Promise.all([
      db.from('places').select('*').order('name'),
      user ? db.from('verification_queue').select('*').order('created_at', { ascending: false }) : { data: [] },
    ]);
    const allP = all || [];
    setAllPlaces(allP);
    setMyPlaces(allP.filter(p => p.merchant_id === user?.id));

    // Count items per place
    const placeIds = allP.filter(p => p.merchant_id === user?.id).map(p => p.id);
    if (placeIds.length > 0) {
      const { data: itemCounts } = await db.from('menu_items').select('place_id').in('place_id', placeIds);
      const counts = (itemCounts || []).reduce((acc, r) => { acc[r.place_id] = (acc[r.place_id] || 0) + 1; return acc; }, {});
      setMyPlaces(prev => prev.map(p => ({ ...p, _itemCount: counts[p.id] || 0 })));
    }

    // Only show verifications for my places
    const myPlaceIds = new Set(allP.filter(p => p.merchant_id === user?.id).map(p => p.id));
    setVerifications((verifs || []).filter(v => myPlaceIds.has(v.place_id)));
  };

  if (loading) {
    return React.createElement('div', { style: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      React.createElement(Spinner)
    );
  }

  if (!user) return React.createElement(AuthScreen, { onAuth: setUser });

  const pendingCount = verifications.filter(v => v.status === 'pending').length;

  return React.createElement('div', { style: { display: 'flex', height: '100vh', overflow: 'hidden' } },
    React.createElement(Sidebar, {
      active: page, onNavigate: setPage,
      user,
      onLogout: async () => { await db.auth.signOut(); setUser(null); },
    }),
    React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '32px 40px', position: 'relative' } },
      // Pending badge in header area
      pendingCount > 0 && page !== 'verifications' && React.createElement('div', {
        style: {
          position: 'fixed', top: 20, right: 24, zIndex: 50,
          background: C.amber, color: '#fff', padding: '6px 14px',
          borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(196,125,58,0.4)',
        },
        onClick: () => setPage('verifications'),
      }, `${pendingCount} price report${pendingCount > 1 ? 's' : ''} pending →`),

      page === 'dashboard' && React.createElement(Dashboard, { places: myPlaces, verifications }),
      page === 'places' && React.createElement(PlacesList, { places: myPlaces, allPlaces, userId: user.id, onClaim: () => {}, onRefresh: loadData, toast: showToast }),
      page === 'menu' && React.createElement(MenuEditor, { places: myPlaces, toast: showToast }),
      page === 'verifications' && React.createElement(Verifications, { verifications, onRefresh: loadData, toast: showToast }),
    ),
    toast && React.createElement(Toast, { message: toast.msg, type: toast.type, onDone: () => setToast(null) }),
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(MerchantApp));
