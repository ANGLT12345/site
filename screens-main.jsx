// screens-main.jsx — Home (Map + List) and Detail screens
// Exports: HomeScreen, PlaceDetailScreen

function StylizedMap({ places, budget, selectedPin, onPinClick }) {
  const t = useTheme();
  const filtered = places.filter(p => budget >= 50 || p.cheapest <= budget);

  // SVG-based stylized map
  const roadColor = t.mapRoad;
  const bgColor = t.mapBg;
  const waterColor = t.mapWater;
  const parkColor = t.mapPark;

  return React.createElement('div', {
    style: {
      position: 'relative', width: '100%', height: '100%',
      background: bgColor, overflow: 'hidden',
    },
  },
    // SVG map background
    React.createElement('svg', {
      viewBox: '0 0 100 100', preserveAspectRatio: 'none',
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 },
    },
      // Water feature (river/reservoir)
      React.createElement('path', { d: 'M0 85 Q20 82 40 88 Q60 92 80 86 Q90 83 100 87 V100 H0 Z', fill: waterColor }),
      // Parks
      React.createElement('rect', { x: 8, y: 15, width: 12, height: 10, rx: 2, fill: parkColor, opacity: 0.6 }),
      React.createElement('rect', { x: 75, y: 55, width: 15, height: 12, rx: 2, fill: parkColor, opacity: 0.6 }),
      React.createElement('circle', { cx: 55, cy: 20, r: 6, fill: parkColor, opacity: 0.5 }),
      // Major roads (horizontal)
      React.createElement('rect', { x: 0, y: 30, width: 100, height: 1.2, fill: roadColor }),
      React.createElement('rect', { x: 0, y: 50, width: 100, height: 1.5, fill: roadColor }),
      React.createElement('rect', { x: 0, y: 70, width: 100, height: 1.2, fill: roadColor }),
      // Major roads (vertical)
      React.createElement('rect', { x: 25, y: 0, width: 1.2, height: 100, fill: roadColor }),
      React.createElement('rect', { x: 50, y: 0, width: 1.5, height: 100, fill: roadColor }),
      React.createElement('rect', { x: 75, y: 0, width: 1.2, height: 100, fill: roadColor }),
      // Minor roads
      React.createElement('rect', { x: 0, y: 40, width: 100, height: 0.5, fill: roadColor, opacity: 0.5 }),
      React.createElement('rect', { x: 0, y: 60, width: 100, height: 0.5, fill: roadColor, opacity: 0.5 }),
      React.createElement('rect', { x: 12, y: 0, width: 0.5, height: 100, fill: roadColor, opacity: 0.5 }),
      React.createElement('rect', { x: 38, y: 0, width: 0.5, height: 100, fill: roadColor, opacity: 0.5 }),
      React.createElement('rect', { x: 62, y: 0, width: 0.5, height: 100, fill: roadColor, opacity: 0.5 }),
      React.createElement('rect', { x: 88, y: 0, width: 0.5, height: 100, fill: roadColor, opacity: 0.5 }),
      // Diagonal road
      React.createElement('line', { x1: 5, y1: 25, x2: 95, y2: 75, stroke: roadColor, strokeWidth: 1 }),
      // Blocks
      ...[
        [3, 33, 8, 6], [14, 33, 10, 6], [27, 33, 10, 6],
        [3, 52, 8, 7], [14, 52, 10, 7], [27, 52, 10, 7],
        [52, 33, 10, 6], [64, 33, 10, 6], [77, 33, 10, 6],
        [52, 52, 10, 7], [64, 52, 8, 7],
        [3, 72, 8, 8], [14, 72, 10, 8], [27, 72, 10, 8],
        [52, 72, 10, 8], [64, 72, 10, 8], [77, 72, 10, 8],
      ].map(([x, y, w, h], i) =>
        React.createElement('rect', {
          key: `b${i}`, x, y, width: w, height: h, rx: 0.5,
          fill: t.themeName === 'pasar' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        })
      )
    ),
    // User location dot
    React.createElement('div', {
      style: {
        position: 'absolute', top: '50%', left: '45%',
        width: 14, height: 14, borderRadius: '50%',
        background: '#4A90D9', border: '3px solid white',
        boxShadow: '0 0 0 6px rgba(74,144,217,0.2), 0 2px 4px rgba(0,0,0,0.15)',
        transform: 'translate(-50%, -50%)', zIndex: 5,
      },
    }),
    // Food pins
    filtered.map(place =>
      React.createElement(MapPin, {
        key: place.id, place,
        selected: selectedPin === place.id,
        onClick: () => onPinClick(place),
        style: { top: `${place.lat}%`, left: `${place.lng}%` },
      })
    )
  );
}

function HomeScreen({ onSelectPlace, budget, onBudgetChange, budgetMode }) {
  const t = useTheme();
  const [viewMode, setViewMode] = React.useState('map');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [selectedPin, setSelectedPin] = React.useState(null);
  const [sheetPlace, setSheetPlace] = React.useState(null);
  const [sortBy, setSortBy] = React.useState('cheapest');

  const allFilters = ['Open Now', ...CUISINES.slice(0, 4), 'Halal', 'Vegetarian', 'Hawker', 'Cafe'];

  const toggleFilter = (f) => {
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const filteredPlaces = React.useMemo(() => {
    let result = [...PLACES];
    if (budget < 50) result = result.filter(p => p.cheapest <= budget);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) ||
        p.cuisine.some(c => c.toLowerCase().includes(q))
      );
    }
    if (activeFilters.includes('Open Now')) result = result.filter(p => p.open);
    if (activeFilters.includes('Halal')) result = result.filter(p => p.dietary.includes('Halal'));
    if (activeFilters.includes('Vegetarian')) result = result.filter(p => p.dietary.includes('Vegetarian'));
    ['Hawker', 'Cafe', 'Restaurant'].forEach(type => {
      if (activeFilters.includes(type)) result = result.filter(p => p.cuisine.includes(type));
    });
    CUISINES.forEach(c => {
      if (activeFilters.includes(c)) result = result.filter(p => p.cuisine.includes(c));
    });
    // Sort
    if (sortBy === 'cheapest') result.sort((a, b) => a.cheapest - b.cheapest);
    else if (sortBy === 'closest') result.sort((a, b) => a.distance - b.distance);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [budget, searchQuery, activeFilters, sortBy]);

  const handlePinClick = (place) => {
    setSelectedPin(place.id);
    setSheetPlace(place);
  };

  const suggestions = [
    { label: 'Under $5', action: () => onBudgetChange(5) },
    { label: 'Lunch lah', action: () => { setActiveFilters(['Open Now']); } },
    { label: 'Cheap dinner', action: () => onBudgetChange(8) },
    { label: 'Halal food', action: () => toggleFilter('Halal') },
  ];

  return React.createElement('div', {
    style: {
      display: 'flex', flexDirection: 'column', height: '100%',
      background: t.bg, position: 'relative',
    },
  },
    // Top controls area
    React.createElement('div', {
      style: {
        position: viewMode === 'map' ? 'absolute' : 'relative',
        top: 0, left: 0, right: 0, zIndex: 15,
        padding: '8px 16px 0',
        background: viewMode === 'map' ? 'transparent' : t.bg,
      },
    },
      // Search bar
      React.createElement(SearchBar, { value: searchQuery, onChange: setSearchQuery }),
      // Filter row
      React.createElement('div', {
        style: { marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 },
      },
        // View toggle
        React.createElement('button', {
          onClick: () => setViewMode(v => v === 'map' ? 'list' : 'map'),
          style: {
            flexShrink: 0, width: 34, height: 34, borderRadius: 10,
            background: t.surface, border: `1.5px solid ${t.border}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 1px 3px ${t.shadow}`,
          },
        },
          React.createElement('svg', {
            width: 16, height: 16, viewBox: '0 0 24 24', fill: t.textSecondary,
          },
            viewMode === 'map'
              ? React.createElement('path', { d: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' })
              : React.createElement('path', { d: 'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z' })
          )
        ),
        React.createElement('div', { style: { flex: 1, overflow: 'hidden' } },
          React.createElement(FilterChips, {
            chips: allFilters, active: activeFilters, onToggle: toggleFilter,
          })
        )
      ),
      // Budget control
      React.createElement('div', {
        style: {
          marginTop: 8, padding: '10px 14px',
          background: t.surface, borderRadius: 14,
          boxShadow: `0 2px 8px ${t.shadow}`,
          border: `1px solid ${t.border}`,
        },
      },
        budgetMode === 'presets'
          ? React.createElement('div', null,
              React.createElement('div', {
                style: {
                  fontSize: 12, fontWeight: 600, color: t.textSecondary,
                  fontFamily: t.font.body, marginBottom: 8,
                },
              }, 'Max budget per meal'),
              React.createElement(BudgetPresets, { value: budget, onChange: onBudgetChange })
            )
          : React.createElement(BudgetSlider, {
              value: budget, onChange: onBudgetChange, max: 50,
            })
      ),
    ),

    // Main content
    viewMode === 'map'
      ? React.createElement('div', { style: { flex: 1, position: 'relative' } },
          React.createElement(StylizedMap, {
            places: PLACES, budget, selectedPin, onPinClick: handlePinClick,
          }),
          // Quick suggestions
          React.createElement('div', {
            style: {
              position: 'absolute', bottom: 16, left: 16, right: 16,
              display: 'flex', gap: 8, zIndex: 10,
            },
          },
            suggestions.map((s, i) =>
              React.createElement(SuggestionPill, { key: i, label: s.label, onClick: s.action })
            )
          ),
          // Bottom sheet preview
          React.createElement(BottomSheet, {
            open: !!sheetPlace, onClose: () => { setSheetPlace(null); setSelectedPin(null); },
            height: '35%',
          },
            sheetPlace && React.createElement('div', null,
              React.createElement(PlaceCard, {
                place: sheetPlace,
                onClick: () => onSelectPlace(sheetPlace),
                variant: 'featured',
              }),
              React.createElement('button', {
                onClick: () => onSelectPlace(sheetPlace),
                style: {
                  width: '100%', marginTop: 12, padding: '12px',
                  background: t.primary, color: '#fff', border: 'none',
                  borderRadius: 12, fontSize: 14, fontWeight: 700,
                  fontFamily: t.font.heading, cursor: 'pointer',
                },
              }, 'View Menu & Prices')
            )
          )
        )
      : // List view
        React.createElement('div', {
          style: {
            flex: 1, overflow: 'auto', padding: '8px 16px 16px',
            marginTop: viewMode === 'list' ? 0 : 0,
          },
        },
          // Sort bar
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 10, marginTop: 4,
            },
          },
            React.createElement('span', {
              style: { fontSize: 13, color: t.textSecondary, fontFamily: t.font.body },
            }, `${filteredPlaces.length} places found`),
            React.createElement('select', {
              value: sortBy, onChange: e => setSortBy(e.target.value),
              style: {
                fontSize: 12, fontWeight: 600, color: t.primary,
                background: 'none', border: 'none', fontFamily: t.font.body,
                cursor: 'pointer',
              },
            },
              SORT_OPTIONS.map(o =>
                React.createElement('option', { key: o.key, value: o.key }, o.label)
              )
            )
          ),
          // Place cards
          React.createElement('div', {
            style: { display: 'flex', flexDirection: 'column', gap: 10 },
          },
            filteredPlaces.map(place =>
              React.createElement(PlaceCard, {
                key: place.id, place,
                onClick: () => onSelectPlace(place),
                variant: 'standard',
              })
            ),
            filteredPlaces.length === 0 && React.createElement('div', {
              style: {
                textAlign: 'center', padding: '40px 20px',
                color: t.textTertiary, fontFamily: t.font.body,
              },
            },
              React.createElement('div', { style: { fontSize: 32, marginBottom: 12 } }, '🔍'),
              React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text } },
                'No places found leh'),
              React.createElement('div', { style: { fontSize: 13, marginTop: 4 } },
                'Try increasing your budget or removing filters')
            )
          )
        )
  );
}

function PlaceDetailScreen({ place, onBack, onMealAdd }) {
  const t = useTheme();
  const [mealItems, setMealItems] = React.useState([]);
  const [activeSection, setActiveSection] = React.useState(0);

  const mealTotal = mealItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddItem = (item) => {
    setMealItems(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) return prev.filter(i => i.name !== item.name);
      return [...prev, item];
    });
  };

  return React.createElement('div', {
    style: {
      display: 'flex', flexDirection: 'column', height: '100%',
      background: t.bg, overflow: 'auto',
    },
  },
    // Hero area
    React.createElement('div', {
      style: {
        position: 'relative', height: 180,
        background: place.heroColor || t.surfaceAlt,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      },
    },
      React.createElement('span', { style: { fontSize: 64, opacity: 0.3 } },
        place.cuisine.includes('Indian') ? '🫓' : place.cuisine.includes('Malay') ? '🍜' : '🍚'
      ),
      // Back button
      React.createElement('button', {
        onClick: onBack,
        style: {
          position: 'absolute', top: 12, left: 12,
          width: 36, height: 36, borderRadius: 12,
          background: 'rgba(255,255,255,0.85)', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        },
      },
        React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: '#1a1a1a' },
          React.createElement('path', { d: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' })
        )
      ),
      // Save + Share
      React.createElement('div', {
        style: { position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 },
      },
        ['M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z',
         'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z'
        ].map((d, i) =>
          React.createElement('button', {
            key: i,
            style: {
              width: 36, height: 36, borderRadius: 12,
              background: 'rgba(255,255,255,0.85)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            },
          },
            React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: '#1a1a1a' },
              React.createElement('path', { d })
            )
          )
        )
      )
    ),

    // Info section
    React.createElement('div', {
      style: {
        padding: '16px 16px 0', background: t.surface,
        borderRadius: '0', marginTop: -20,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        position: 'relative',
      },
    },
      React.createElement('h1', {
        style: {
          fontSize: 22, fontWeight: 800, color: t.text,
          fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.5px',
        },
      }, place.name),
      React.createElement('div', {
        style: {
          fontSize: 13, color: t.textSecondary, fontFamily: t.font.body,
          marginTop: 4,
        },
      }, place.location),
      // Rating + Verified row
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, flexWrap: 'wrap' },
      },
        React.createElement(StarRating, { rating: place.rating, size: 14 }),
        React.createElement('span', {
          style: { fontSize: 12, color: t.textTertiary, fontFamily: t.font.body },
        }, `${place.reviews.toLocaleString()} reviews`),
        place.verified && React.createElement(VerifiedBadge, { size: 'large', date: place.verifiedDate }),
      ),
      // Quick info chips
      React.createElement('div', {
        style: { display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' },
      },
        [
          { icon: '🕐', text: place.hours },
          { icon: '📍', text: `${place.distance}km away` },
          ...place.dietary.map(d => ({ icon: d === 'Halal' ? '☪' : '🌱', text: d })),
        ].map((chip, i) =>
          React.createElement('span', {
            key: i,
            style: {
              fontSize: 11, color: t.textSecondary, fontFamily: t.font.body,
              background: t.surfaceAlt, padding: '5px 10px', borderRadius: 8,
              display: 'flex', alignItems: 'center', gap: 4,
            },
          }, `${chip.icon} ${chip.text}`)
        )
      ),
      // Typical meal cost
      React.createElement('div', {
        style: {
          marginTop: 16, padding: '14px 16px',
          background: t.surfaceAlt, borderRadius: 14,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        },
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 12, color: t.textSecondary, fontFamily: t.font.body },
          }, 'Typical meal cost'),
          React.createElement('div', {
            style: {
              fontSize: 26, fontWeight: 800, color: t.primary,
              fontFamily: t.font.heading, letterSpacing: '-1px',
            },
          }, `$${place.typicalMeal.toFixed(2)}`)
        ),
        React.createElement('div', {
          style: { textAlign: 'right' },
        },
          React.createElement('div', {
            style: { fontSize: 11, color: t.textTertiary, fontFamily: t.font.body },
          }, 'Price range'),
          React.createElement('div', {
            style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: t.font.heading },
          }, `$${place.priceRange[0].toFixed(2)} – $${place.priceRange[1].toFixed(2)}`)
        )
      ),
      // Navigate button
      React.createElement('button', {
        style: {
          width: '100%', marginTop: 14, padding: '13px',
          background: t.primary, color: '#fff', border: 'none',
          borderRadius: 14, fontSize: 15, fontWeight: 700,
          fontFamily: t.font.heading, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        },
      },
        React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
          React.createElement('path', { d: 'M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z' })
        ),
        'Navigate'
      ),
    ),

    // Menu section
    React.createElement('div', { style: { padding: '16px', background: t.bg } },
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 12,
        },
      },
        React.createElement('h2', {
          style: {
            fontSize: 18, fontWeight: 800, color: t.text,
            fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.3px',
          },
        }, 'Menu & Prices'),
        React.createElement('span', {
          style: { fontSize: 11, color: t.textTertiary, fontFamily: t.font.body },
        }, 'All prices in SGD')
      ),
      // Menu section tabs
      React.createElement('div', {
        style: { display: 'flex', gap: 0, marginBottom: 4, borderBottom: `2px solid ${t.border}` },
      },
        place.menu.map((section, i) =>
          React.createElement('button', {
            key: i, onClick: () => setActiveSection(i),
            style: {
              padding: '8px 16px', background: 'none', border: 'none',
              borderBottom: activeSection === i ? `2px solid ${t.primary}` : '2px solid transparent',
              marginBottom: -2, cursor: 'pointer',
              fontSize: 13, fontWeight: activeSection === i ? 700 : 500,
              color: activeSection === i ? t.primary : t.textSecondary,
              fontFamily: t.font.body, transition: 'all 0.2s',
            },
          }, section.section)
        )
      ),
      // Menu items
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 14, padding: '4px 14px',
          marginTop: 8, border: `1px solid ${t.border}`,
        },
      },
        place.menu[activeSection] && place.menu[activeSection].items.map((item, i) =>
          React.createElement(MenuItemRow, { key: i, item, onAdd: handleAddItem })
        )
      ),
    ),

    // Meal builder (sticky bottom)
    mealItems.length > 0 && React.createElement('div', {
      style: {
        position: 'sticky', bottom: 0, left: 0, right: 0,
        padding: '12px 16px', background: t.surface,
        borderTop: `1px solid ${t.border}`,
        boxShadow: `0 -4px 12px ${t.shadow}`,
      },
    },
      React.createElement('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        },
      },
        React.createElement('div', null,
          React.createElement('div', {
            style: { fontSize: 12, color: t.textSecondary, fontFamily: t.font.body },
          }, `${mealItems.length} item${mealItems.length > 1 ? 's' : ''} selected`),
          React.createElement('div', {
            style: {
              fontSize: 22, fontWeight: 800, color: t.primary,
              fontFamily: t.font.heading, letterSpacing: '-0.5px',
            },
          }, `$${mealTotal.toFixed(2)}`)
        ),
        React.createElement('div', {
          style: { fontSize: 12, color: t.textTertiary, fontFamily: t.font.body, textAlign: 'right' },
        }, 'Estimated total')
      )
    ),

    // Reviews teaser
    React.createElement('div', { style: { padding: '0 16px 24px', background: t.bg } },
      React.createElement('h2', {
        style: {
          fontSize: 16, fontWeight: 700, color: t.text,
          fontFamily: t.font.heading, margin: '0 0 10px', letterSpacing: '-0.3px',
        },
      }, 'Price Accuracy'),
      React.createElement('div', {
        style: {
          background: t.surface, borderRadius: 14, padding: '14px',
          border: `1px solid ${t.border}`,
        },
      },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
        },
          React.createElement('div', {
            style: {
              width: 40, height: 40, borderRadius: 10,
              background: `${t.verified}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            },
          },
            React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: t.verified },
              React.createElement('path', { d: 'M10 0l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 12.2 5.2 14.6l.9-5.3L2.3 5.6l5.3-.8L10 0z' })
            )
          ),
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontSize: 14, fontWeight: 700, color: t.text, fontFamily: t.font.heading },
            }, '94% accurate'),
            React.createElement('div', {
              style: { fontSize: 11, color: t.textTertiary, fontFamily: t.font.body },
            }, 'Based on 47 community reports')
          )
        ),
        React.createElement('div', {
          style: { fontSize: 12, color: t.textSecondary, fontFamily: t.font.body, lineHeight: 1.5 },
        }, 'Prices last confirmed by 12 users this week. Most recent check: ' + place.verifiedDate + '.')
      )
    )
  );
}

Object.assign(window, { HomeScreen, PlaceDetailScreen, StylizedMap });
