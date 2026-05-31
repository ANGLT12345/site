// app.jsx — Main app shell, routing, state, auth, and tweaks integration

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "chili",
  "font": "jakarta",
  "density": "comfortable",
  "budgetMode": "slider",
  "cardStyle": "standard",
  "homeLayout": "fullmap",
  "showOnboarding": true
}/*EDITMODE-END*/;

function AppContent() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = React.useState(tw.showOnboarding ? 'onboarding' : 'home');
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [budget, setBudget] = React.useState(10);
  const [prevScreen, setPrevScreen] = React.useState(null);
  const [transitioning, setTransitioning] = React.useState(false);

  // Auth + data state
  const [user, setUser] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [places, setPlaces] = React.useState(PLACES);
  const [savedIds, setSavedIds] = React.useState(new Set());
  const [savedPlaces, setSavedPlaces] = React.useState([]);
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  // Load places from DB on mount
  React.useEffect(() => {
    fetchPlaces().then(data => {
      if (data && data.length > 0) setPlaces(data);
    }).catch(() => {});
  }, []);

  // Auth state listener
  React.useEffect(() => {
    const { data: { subscription } } = db.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data: prof } = await db.from('profiles').select('*').eq('id', u.id).single();
        setProfile(prof);
        const { data: saved } = await db.from('saved_places').select('place_id').eq('user_id', u.id);
        setSavedIds(new Set((saved || []).map(r => r.place_id)));
        const full = await fetchSavedPlacesForUser(u.id);
        setSavedPlaces(full);
      } else {
        setProfile(null);
        setSavedIds(new Set());
        setSavedPlaces([]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const toggleSave = React.useCallback(async (placeId) => {
    if (!user) { setShowAuthModal(true); return; }
    const isSaved = savedIds.has(placeId);
    setSavedIds(prev => {
      const next = new Set(prev);
      isSaved ? next.delete(placeId) : next.add(placeId);
      return next;
    });
    setSavedPlaces(prev => {
      if (isSaved) return prev.filter(p => p.id !== placeId);
      const place = places.find(p => p.id === placeId);
      return place ? [...prev, place] : prev;
    });
    if (isSaved) {
      await db.from('saved_places').delete().eq('user_id', user.id).eq('place_id', placeId);
    } else {
      await db.from('saved_places').insert({ user_id: user.id, place_id: placeId });
    }
  }, [user, savedIds, places]);

  const navigateTo = React.useCallback((newScreen, direction) => {
    setTransitioning(true);
    setTimeout(() => {
      setPrevScreen(screen);
      setScreen(newScreen);
      setTransitioning(false);
    }, 50);
  }, [screen]);

  const handleSelectPlace = React.useCallback((place) => {
    setSelectedPlace(place);
    navigateTo('detail', 'left');
  }, [navigateTo]);

  const handleBack = React.useCallback(() => {
    navigateTo(prevScreen || 'home', 'right');
    setSelectedPlace(null);
  }, [navigateTo, prevScreen]);

  const handleTabNav = React.useCallback((tab) => {
    setActiveTab(tab);
    if (tab === 'home') navigateTo('home');
    else if (tab === 'search') navigateTo('home');
    else if (tab === 'saved') navigateTo('saved');
    else if (tab === 'profile') navigateTo('profile');
  }, [navigateTo]);

  const handleOnboardingComplete = React.useCallback((budgetPref) => {
    setBudget(budgetPref);
    navigateTo('home');
    setTweak('showOnboarding', false);
  }, [navigateTo, setTweak]);

  const screenStyle = {
    flex: 1, display: 'flex', flexDirection: 'column',
    overflow: 'hidden', position: 'relative',
    transition: transitioning ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
  };

  const renderScreen = () => {
    if (screen === 'onboarding') {
      return React.createElement(OnboardingScreen, { onComplete: handleOnboardingComplete });
    }
    if (screen === 'detail' && selectedPlace) {
      return React.createElement(PlaceDetailScreen, {
        place: selectedPlace, onBack: handleBack,
        savedIds, onToggleSave: toggleSave,
      });
    }
    if (screen === 'saved') {
      return React.createElement(SavedScreen, {
        user, savedPlaces, savedIds,
        onLogin: () => setShowAuthModal(true),
        onSelectPlace: handleSelectPlace,
        onToggleSave: toggleSave,
      });
    }
    if (screen === 'profile') {
      return React.createElement(ProfileScreen, {
        user, profile,
        savedCount: savedIds.size,
        onLogin: () => setShowAuthModal(true),
        onLogout: async () => { await db.auth.signOut(); },
      });
    }
    return React.createElement(HomeScreen, {
      places, onSelectPlace: handleSelectPlace,
      budget, onBudgetChange: setBudget,
      budgetMode: tw.budgetMode,
      savedIds, onToggleSave: toggleSave,
    });
  };

  const showNav = screen !== 'onboarding' && screen !== 'detail';

  return React.createElement(ThemeProvider, {
    theme: tw.theme, font: tw.font, density: tw.density,
  },
    React.createElement(AppShell, {
      showNav, activeTab, onTabNav: handleTabNav, tw, setTweak,
      overlay: showAuthModal && React.createElement(AuthModal, {
        onClose: () => setShowAuthModal(false),
        onSuccess: () => setShowAuthModal(false),
      }),
    },
      React.createElement('div', { style: screenStyle }, renderScreen())
    )
  );
}

function AppShell({ showNav, activeTab, onTabNav, tw, setTweak, overlay, children }) {
  const t = useTheme();
  return React.createElement(React.Fragment, null,
    React.createElement('div', {
      style: {
        display: 'flex', flexDirection: 'column', height: '100%',
        background: t.bg, fontFamily: t.font.body,
        color: t.text, overflow: 'hidden', position: 'relative',
      },
    },
      children,
      showNav && React.createElement(BottomNav, { active: activeTab, onNavigate: onTabNav }),
      overlay
    ),
    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label: 'Visual Theme' }),
      React.createElement(TweakRadio, {
        label: 'Color',
        value: tw.theme,
        options: ['chili', 'kaya', 'pandan', 'pasar'],
        onChange: v => setTweak('theme', v),
      }),
      React.createElement(TweakRadio, {
        label: 'Typography',
        value: tw.font,
        options: ['jakarta', 'space', 'outfit'],
        onChange: v => setTweak('font', v),
      }),
      React.createElement(TweakSection, { label: 'Layout' }),
      React.createElement(TweakRadio, {
        label: 'Density',
        value: tw.density,
        options: ['compact', 'comfortable', 'spacious'],
        onChange: v => setTweak('density', v),
      }),
      React.createElement(TweakSelect, {
        label: 'Budget control',
        value: tw.budgetMode,
        options: ['slider', 'presets'],
        onChange: v => setTweak('budgetMode', v),
      }),
      React.createElement(TweakSection, { label: 'Flow' }),
      React.createElement(TweakToggle, {
        label: 'Show onboarding',
        value: tw.showOnboarding,
        onChange: v => { setTweak('showOnboarding', v); if (v) window.location.reload(); },
      }),
    )
  );
}

function BiteBudgetApp() {
  return React.createElement(AppContent, null);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(BiteBudgetApp));
