// app.jsx — Main app shell, routing, state, and tweaks integration

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

  // Transition state
  const [transitioning, setTransitioning] = React.useState(false);
  const [slideDir, setSlideDir] = React.useState('left');

  const navigateTo = React.useCallback((newScreen, direction) => {
    setSlideDir(direction || 'left');
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

  // Screen transition styles
  const screenStyle = {
    flex: 1, display: 'flex', flexDirection: 'column',
    overflow: 'hidden', position: 'relative',
    transition: transitioning ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s',
  };

  const renderScreen = () => {
    if (screen === 'onboarding') {
      return React.createElement(OnboardingScreen, { onComplete: handleOnboardingComplete });
    }
    if (screen === 'detail' && selectedPlace) {
      return React.createElement(PlaceDetailScreen, {
        place: selectedPlace, onBack: handleBack,
      });
    }
    if (screen === 'saved') return React.createElement(SavedScreen, {});
    if (screen === 'profile') return React.createElement(ProfileScreen, {});
    // Default: home
    return React.createElement(HomeScreen, {
      onSelectPlace: handleSelectPlace,
      budget, onBudgetChange: setBudget,
      budgetMode: tw.budgetMode,
    });
  };

  const showNav = screen !== 'onboarding' && screen !== 'detail';

  return React.createElement(ThemeProvider, {
    theme: tw.theme, font: tw.font, density: tw.density,
  },
    React.createElement(AppShell, {
      showNav, activeTab, onTabNav: handleTabNav, tw, setTweak,
    },
      React.createElement('div', { style: screenStyle }, renderScreen())
    )
  );
}

function AppShell({ showNav, activeTab, onTabNav, tw, setTweak, children }) {
  const t = useTheme();

  return React.createElement(React.Fragment, null,
    React.createElement('div', {
      style: {
        display: 'flex', flexDirection: 'column', height: '100%',
        background: t.bg, fontFamily: t.font.body,
        color: t.text, overflow: 'hidden',
      },
    },
      children,
      showNav && React.createElement(BottomNav, { active: activeTab, onNavigate: onTabNav })
    ),
    // Tweaks panel
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
