// screens-aux.jsx — Onboarding, Saved, Profile, AuthModal screens
// Exports: OnboardingScreen, SavedScreen, ProfileScreen, AuthModal

function OnboardingScreen({ onComplete }) {
  const t = useTheme();
  const [step, setStep] = React.useState(0);
  const [budgetPref, setBudgetPref] = React.useState(10);
  const [dietPrefs, setDietPrefs] = React.useState([]);

  const toggleDiet = (d) => {
    setDietPrefs(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  const steps = [
    () => React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' },
    },
      React.createElement('div', {
        style: {
          width: 100, height: 100, borderRadius: 28,
          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary || t.accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 32, boxShadow: `0 12px 32px ${t.primary}30`,
        },
      },
        React.createElement('span', {
          style: { fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: t.font.heading, letterSpacing: '-1px' },
        }, 'BB')
      ),
      React.createElement('h1', {
        style: { fontSize: 28, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.8px', lineHeight: 1.2 },
      }, 'Find your next meal at the right price'),
      React.createElement('p', {
        style: { fontSize: 15, color: t.textSecondary, fontFamily: t.font.body, marginTop: 12, lineHeight: 1.5, maxWidth: 280 },
      }, 'Real menu prices. Verified by the community. No more guessing how much your food costs.'),
    ),

    () => React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 24px' },
    },
      React.createElement('div', {
        style: { width: 64, height: 64, borderRadius: 18, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
      },
        React.createElement('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: t.primary },
          React.createElement('path', { d: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' })
        )
      ),
      React.createElement('h2', { style: { fontSize: 24, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.5px' } }, 'Where are you?'),
      React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, fontFamily: t.font.body, marginTop: 8, lineHeight: 1.5 } },
        'We need your location to find food near you. We only use it when the app is open.'),
      React.createElement('button', {
        onClick: () => setStep(2),
        style: {
          marginTop: 32, padding: '14px 24px', background: t.primary, color: '#fff', border: 'none',
          borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: t.font.heading, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        },
      },
        React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
          React.createElement('path', { d: 'M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z' })
        ),
        'Enable Location'
      ),
      React.createElement('button', {
        onClick: () => setStep(2),
        style: { marginTop: 12, padding: '12px', background: 'none', border: 'none', color: t.textTertiary, fontSize: 14, fontFamily: t.font.body, cursor: 'pointer' },
      }, 'Maybe later'),
    ),

    () => React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 24px' },
    },
      React.createElement('h2', { style: { fontSize: 24, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.5px' } }, "What's your usual budget?"),
      React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, fontFamily: t.font.body, marginTop: 8, lineHeight: 1.5 } },
        'Set your default meal budget. You can always change this later.'),
      React.createElement('div', {
        style: { marginTop: 32, padding: '24px 20px', background: t.surface, borderRadius: 20, border: `1px solid ${t.border}` },
      },
        React.createElement('div', {
          style: { fontSize: 48, fontWeight: 900, color: t.primary, fontFamily: t.font.heading, textAlign: 'center', letterSpacing: '-2px', marginBottom: 20 },
        }, `$${budgetPref}`),
        React.createElement(BudgetSlider, { value: budgetPref, onChange: setBudgetPref, max: 50 }),
        React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: t.textTertiary, fontFamily: t.font.body },
        },
          React.createElement('span', null, 'Kopitiam'),
          React.createElement('span', null, 'Hawker'),
          React.createElement('span', null, 'Restaurant'),
        )
      ),
    ),

    () => React.createElement('div', {
      style: { flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 24px' },
    },
      React.createElement('h2', { style: { fontSize: 24, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.5px' } }, 'Any dietary needs?'),
      React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, fontFamily: t.font.body, marginTop: 8, lineHeight: 1.5 } },
        "We'll highlight places that match. Skip if no preference."),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 } },
        [
          { key: 'Halal', icon: '☪', desc: 'Halal-certified stalls' },
          { key: 'Vegetarian', icon: '🌱', desc: 'Vegetarian & plant-based' },
          { key: 'No Pork', icon: '🚫', desc: 'No pork dishes' },
          { key: 'No Beef', icon: '🐄', desc: 'No beef dishes' },
        ].map(d => {
          const isActive = dietPrefs.includes(d.key);
          return React.createElement('button', {
            key: d.key, onClick: () => toggleDiet(d.key),
            style: {
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14,
              background: isActive ? t.primaryLight : t.surface,
              border: isActive ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            },
          },
            React.createElement('span', { style: { fontSize: 22 } }, d.icon),
            React.createElement('div', { style: { flex: 1 } },
              React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: t.text, fontFamily: t.font.heading } }, d.key),
              React.createElement('div', { style: { fontSize: 12, color: t.textSecondary, fontFamily: t.font.body, marginTop: 1 } }, d.desc)
            ),
            isActive && React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: t.primary },
              React.createElement('path', { d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' })
            )
          );
        })
      ),
    ),
  ];

  const totalSteps = steps.length;
  const isLast = step === totalSteps - 1;

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg } },
    React.createElement('div', { style: { display: 'flex', gap: 6, justifyContent: 'center', padding: '16px 24px 0' } },
      Array.from({ length: totalSteps }, (_, i) =>
        React.createElement('div', {
          key: i,
          style: { width: i === step ? 24 : 8, height: 4, borderRadius: 2, background: i === step ? t.primary : t.border, transition: 'all 0.3s' },
        })
      )
    ),
    steps[step](),
    React.createElement('div', { style: { padding: '16px 24px 24px', display: 'flex', gap: 12 } },
      step > 0 && React.createElement('button', {
        onClick: () => setStep(s => s - 1),
        style: {
          padding: '14px 20px', background: t.surfaceAlt, border: 'none', borderRadius: 14,
          fontSize: 15, fontWeight: 600, color: t.textSecondary, fontFamily: t.font.heading, cursor: 'pointer',
        },
      }, 'Back'),
      React.createElement('button', {
        onClick: () => isLast ? onComplete(budgetPref) : setStep(s => s + 1),
        style: {
          flex: 1, padding: '14px', background: t.primary, color: '#fff', border: 'none',
          borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: t.font.heading, cursor: 'pointer',
        },
      }, isLast ? "Let's makan!" : 'Next'),
    ),
  );
}

function SavedScreen({ user, savedPlaces, savedIds, onLogin, onSelectPlace, onToggleSave }) {
  const t = useTheme();
  const [activeTab, setActiveTab] = React.useState('favorites');
  const tabs = ['Favorites', 'Searches', 'Alerts', 'Recent'];

  const savedSearches = [
    { query: 'Chicken rice under $5', results: 12 },
    { query: 'Halal hawker near Bugis', results: 8 },
    { query: 'Late night supper < $10', results: 15 },
  ];

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg } },
    React.createElement('div', { style: { padding: '16px 16px 0' } },
      React.createElement('h1', {
        style: { fontSize: 26, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.8px' },
      }, 'Saved'),
      React.createElement('div', { style: { display: 'flex', gap: 0, marginTop: 16, borderBottom: `2px solid ${t.border}` } },
        tabs.map(tab => {
          const isActive = activeTab === tab.toLowerCase();
          return React.createElement('button', {
            key: tab, onClick: () => setActiveTab(tab.toLowerCase()),
            style: {
              padding: '10px 16px', background: 'none', border: 'none',
              borderBottom: isActive ? `2px solid ${t.primary}` : '2px solid transparent',
              marginBottom: -2, cursor: 'pointer',
              fontSize: 13, fontWeight: isActive ? 700 : 500,
              color: isActive ? t.primary : t.textSecondary,
              fontFamily: t.font.body, transition: 'all 0.2s',
            },
          }, tab);
        })
      ),
    ),
    React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '16px' } },
      // Favorites tab
      activeTab === 'favorites' && (
        !user
          ? React.createElement('div', {
              style: { textAlign: 'center', padding: '48px 24px', color: t.textTertiary, fontFamily: t.font.body },
            },
              React.createElement('div', { style: { fontSize: 40, marginBottom: 16 } }, '🔖'),
              React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Save your favourites'),
              React.createElement('div', { style: { fontSize: 13, lineHeight: 1.5, marginBottom: 20 } },
                'Sign in to save places and access them from any device.'),
              React.createElement('button', {
                onClick: onLogin,
                style: {
                  padding: '12px 28px', background: t.primary, color: '#fff', border: 'none',
                  borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: t.font.heading, cursor: 'pointer',
                },
              }, 'Sign in')
            )
          : savedPlaces.length === 0
            ? React.createElement('div', {
                style: { textAlign: 'center', padding: '48px 24px', color: t.textTertiary, fontFamily: t.font.body },
              },
                React.createElement('div', { style: { fontSize: 40, marginBottom: 16 } }, '🍽️'),
                React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 } }, 'Nothing saved yet'),
                React.createElement('div', { style: { fontSize: 13 } }, 'Tap the bookmark icon on any place to save it here.')
              )
            : React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
                savedPlaces.map(place =>
                  React.createElement(PlaceCard, {
                    key: place.id, place,
                    onClick: () => onSelectPlace && onSelectPlace(place),
                    variant: 'standard',
                    isSaved: true,
                    onSave: () => onToggleSave && onToggleSave(place.id),
                  })
                )
              )
      ),

      // Searches tab
      activeTab === 'searches' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        savedSearches.map((s, i) =>
          React.createElement('div', {
            key: i,
            style: {
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px', background: t.surface, borderRadius: 14, border: `1px solid ${t.border}`,
            },
          },
            React.createElement('div', null,
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: t.text, fontFamily: t.font.body } }, s.query),
              React.createElement('div', { style: { fontSize: 12, color: t.textTertiary, fontFamily: t.font.body, marginTop: 2 } }, `${s.results} results`)
            ),
            React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: t.textTertiary },
              React.createElement('path', { d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' })
            )
          )
        )
      ),

      // Alerts tab
      activeTab === 'alerts' && React.createElement('div', {
        style: { textAlign: 'center', padding: '48px 24px', color: t.textTertiary, fontFamily: t.font.body },
      },
        React.createElement('div', {
          style: { width: 56, height: 56, borderRadius: 16, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
        },
          React.createElement('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: t.textTertiary },
            React.createElement('path', { d: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' })
          )
        ),
        React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: t.text } }, 'No alerts yet'),
        React.createElement('div', { style: { fontSize: 13, marginTop: 6, lineHeight: 1.4 } },
          'Set a budget alert to get notified when prices drop at your favourite spots.')
      ),

      // Recent tab
      activeTab === 'recent' && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
        PLACES.slice(2, 6).map(place =>
          React.createElement(PlaceCard, { key: place.id, place, variant: 'compact' })
        )
      ),
    ),
  );
}

function ProfileScreen({ user, profile, savedCount, onLogin, onLogout }) {
  const t = useTheme();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const displayName = profile?.display_name || (user?.email ? user.email.split('@')[0] : 'Guest');
  const initials = profile?.avatar_initials || displayName.slice(0, 2).toUpperCase();

  const menuItems = [
    { icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', label: 'Edit Profile' },
    { icon: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z', label: 'Notifications' },
    { icon: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z', label: 'Settings' },
    { icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4z', label: 'Merchant Portal' },
    { icon: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', label: 'Help & Support' },
  ];

  if (!user) {
    return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg, alignItems: 'center', justifyContent: 'center', padding: '32px 24px' } },
      React.createElement('div', {
        style: {
          width: 80, height: 80, borderRadius: 22,
          background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
        },
      },
        React.createElement('svg', { width: 36, height: 36, viewBox: '0 0 24 24', fill: t.textTertiary },
          React.createElement('path', { d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' })
        )
      ),
      React.createElement('h2', { style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: '0 0 8px', letterSpacing: '-0.5px' } }, 'You\'re not signed in'),
      React.createElement('p', { style: { fontSize: 14, color: t.textSecondary, fontFamily: t.font.body, textAlign: 'center', lineHeight: 1.5, marginBottom: 28 } },
        'Sign in to save places, set budget alerts, and track your meal history.'),
      React.createElement('button', {
        onClick: onLogin,
        style: {
          width: '100%', padding: '14px', background: t.primary, color: '#fff', border: 'none',
          borderRadius: 14, fontSize: 15, fontWeight: 700, fontFamily: t.font.heading, cursor: 'pointer',
        },
      }, 'Sign in / Create account'),
    );
  }

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', background: t.bg } },
    React.createElement('div', { style: { padding: '24px 16px 20px', textAlign: 'center' } },
      React.createElement('div', {
        style: {
          width: 72, height: 72, borderRadius: 20,
          background: `linear-gradient(135deg, ${t.primary}40, ${t.primary}20)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px', border: `2px solid ${t.primary}30`,
        },
      },
        React.createElement('span', { style: { fontSize: 28, fontWeight: 800, color: t.primary, fontFamily: t.font.heading } }, initials)
      ),
      React.createElement('h2', { style: { fontSize: 20, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: 0, letterSpacing: '-0.3px' } }, displayName),
      React.createElement('div', { style: { fontSize: 13, color: t.textTertiary, fontFamily: t.font.body, marginTop: 4 } },
        `${user.email} · ${savedCount || 0} saved`)
    ),

    // Premium upsell
    React.createElement('div', {
      style: { margin: '0 16px 16px', padding: '16px', background: `linear-gradient(135deg, ${t.primary}, ${t.secondary || t.accent})`, borderRadius: 16, color: '#fff' },
    },
      React.createElement('div', { style: { fontSize: 16, fontWeight: 800, fontFamily: t.font.heading, letterSpacing: '-0.3px' } }, 'Upgrade to Pro'),
      React.createElement('div', { style: { fontSize: 12, fontFamily: t.font.body, marginTop: 4, opacity: 0.85, lineHeight: 1.4 } },
        'Ad-free browsing, budget alerts, meal history & more.'),
      React.createElement('button', {
        style: {
          marginTop: 12, padding: '8px 20px',
          background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 700,
          fontFamily: t.font.heading, cursor: 'pointer', backdropFilter: 'blur(4px)',
        },
      }, '$2.98/month')
    ),

    // Menu items
    React.createElement('div', { style: { padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 2 } },
      menuItems.map((item, i) =>
        React.createElement('button', {
          key: i,
          style: {
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            background: t.surface, border: 'none',
            borderRadius: i === 0 ? '14px 14px 2px 2px' : i === menuItems.length - 1 ? '2px 2px 14px 14px' : '2px',
            cursor: 'pointer', textAlign: 'left',
            borderBottom: i < menuItems.length - 1 ? `1px solid ${t.border}` : 'none',
          },
        },
          React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: t.textSecondary },
            React.createElement('path', { d: item.icon })
          ),
          React.createElement('span', { style: { flex: 1, fontSize: 15, fontWeight: 500, color: t.text, fontFamily: t.font.body } }, item.label),
          React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: t.textTertiary },
            React.createElement('path', { d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' })
          )
        )
      )
    ),

    // Logout button
    React.createElement('div', { style: { padding: '16px' } },
      React.createElement('button', {
        onClick: async () => { setLoggingOut(true); await onLogout(); },
        disabled: loggingOut,
        style: {
          width: '100%', padding: '12px', background: 'none',
          border: `1.5px solid ${t.border}`, borderRadius: 12,
          fontSize: 14, fontWeight: 600, color: t.textSecondary,
          fontFamily: t.font.heading, cursor: loggingOut ? 'not-allowed' : 'pointer',
        },
      }, loggingOut ? 'Signing out...' : 'Sign out')
    ),

    React.createElement('div', {
      style: { padding: '0 16px 24px', textAlign: 'center', fontSize: 11, color: t.textTertiary, fontFamily: t.font.body, marginTop: 'auto' },
    }, 'BiteBudget v1.0 · Made in Singapore 🇸🇬'),
  );
}

function AuthModal({ onClose, onSuccess }) {
  const t = useTheme();
  const [mode, setMode] = React.useState('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (mode === 'signup') {
        const { error } = await db.auth.signUp({
          email, password,
          options: { data: { display_name: name || email.split('@')[0] } },
        });
        if (error) throw error;
        setIsError(false);
        setMessage('Check your email to confirm your account, then sign in.');
      } else {
        const { error } = await db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onSuccess();
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputSt = {
    width: '100%', padding: '12px 14px', marginBottom: 10, display: 'block',
    border: `1.5px solid ${t.border}`, borderRadius: 12,
    fontSize: 14, fontFamily: t.font.body, color: t.text,
    background: t.surfaceAlt, outline: 'none', boxSizing: 'border-box',
  };

  return React.createElement('div', {
    style: {
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end',
      backdropFilter: 'blur(4px)',
    },
    onClick: onClose,
  },
    React.createElement('div', {
      style: {
        background: t.surface, borderRadius: '24px 24px 0 0',
        padding: '20px 24px 32px', width: '100%',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.2)',
      },
      onClick: e => e.stopPropagation(),
    },
      React.createElement('div', {
        style: { width: 36, height: 4, borderRadius: 2, background: t.border, margin: '0 auto 20px' },
      }),
      React.createElement('h2', {
        style: { fontSize: 22, fontWeight: 800, color: t.text, fontFamily: t.font.heading, margin: '0 0 6px', letterSpacing: '-0.5px' },
      }, mode === 'login' ? 'Welcome back' : 'Create account'),
      React.createElement('p', {
        style: { fontSize: 13, color: t.textSecondary, fontFamily: t.font.body, marginBottom: 20 },
      }, mode === 'login'
        ? 'Sign in to save places and set budget alerts.'
        : 'Join to save favourites and verify prices.'),

      React.createElement('form', { onSubmit: handleSubmit },
        mode === 'signup' && React.createElement('input', {
          type: 'text', placeholder: 'Your name', value: name,
          onChange: e => setName(e.target.value),
          style: inputSt,
        }),
        React.createElement('input', {
          type: 'email', placeholder: 'Email address', value: email,
          onChange: e => setEmail(e.target.value), required: true,
          style: inputSt,
        }),
        React.createElement('input', {
          type: 'password', placeholder: 'Password (min 6 chars)', value: password,
          onChange: e => setPassword(e.target.value), required: true,
          style: inputSt,
        }),
        message && React.createElement('div', {
          style: {
            fontSize: 12, marginBottom: 12, padding: '8px 12px', borderRadius: 8,
            background: isError ? '#FEE2E2' : '#DCFCE7',
            color: isError ? '#B91C1C' : '#166534',
            fontFamily: t.font.body, lineHeight: 1.4,
          },
        }, message),
        React.createElement('button', {
          type: 'submit', disabled: loading,
          style: {
            width: '100%', padding: '14px',
            background: loading ? t.border : t.primary,
            color: '#fff', border: 'none', borderRadius: 14,
            fontSize: 15, fontWeight: 700, fontFamily: t.font.heading,
            cursor: loading ? 'not-allowed' : 'pointer',
          },
        }, loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'),
      ),

      React.createElement('button', {
        onClick: () => { setMode(m => m === 'login' ? 'signup' : 'login'); setMessage(''); },
        style: {
          width: '100%', marginTop: 12, padding: '10px',
          background: 'none', border: 'none',
          color: t.textSecondary, fontSize: 13,
          fontFamily: t.font.body, cursor: 'pointer',
        },
      }, mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'),
    )
  );
}

Object.assign(window, { OnboardingScreen, SavedScreen, ProfileScreen, AuthModal });
