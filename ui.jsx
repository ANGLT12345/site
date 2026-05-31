// ui.jsx — Shared UI components for BiteBudget
// Exports: BottomNav, SearchBar, FilterChips, BudgetSlider, BudgetPresets,
//   PlaceCard, VerifiedBadge, PriceTag, MapPin, BottomSheet, StarRating, MenuItemRow

function BottomNav({ active, onNavigate }) {
  const t = useTheme();
  const tabs = [
    { key: 'home', label: 'Home', icon: 'M12 3L2 12h3v8h5v-5h4v5h5v-8h3L12 3z' },
    { key: 'search', label: 'Search', icon: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' },
    { key: 'saved', label: 'Saved', icon: 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z' },
    { key: 'profile', label: 'Profile', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  ];
  const navStyles = {
    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    background: t.navBg, borderTop: `1px solid ${t.border}`,
    padding: '6px 0 2px', position: 'relative', zIndex: 10,
  };
  return React.createElement('nav', { style: navStyles },
    tabs.map(tab => {
      const isActive = active === tab.key;
      return React.createElement('button', {
        key: tab.key,
        onClick: () => onNavigate(tab.key),
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px 16px',
          color: isActive ? t.primary : t.textTertiary,
          transition: 'color 0.2s',
        },
      },
        React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'currentColor' },
          React.createElement('path', { d: tab.icon })
        ),
        React.createElement('span', {
          style: { fontSize: 10, fontWeight: isActive ? 700 : 500, fontFamily: t.font.body },
        }, tab.label)
      );
    })
  );
}

function SearchBar({ value, onChange, onFocus, placeholder, theme }) {
  const t = theme || useTheme();
  return React.createElement('div', {
    style: {
      display: 'flex', alignItems: 'center', gap: 8,
      background: t.surface, border: `1.5px solid ${t.border}`,
      borderRadius: 14, padding: '10px 14px',
      boxShadow: `0 2px 8px ${t.shadow}`,
    },
  },
    React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: t.textTertiary },
      React.createElement('path', { d: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' })
    ),
    React.createElement('input', {
      type: 'text', value: value || '', onChange: e => onChange && onChange(e.target.value),
      onFocus, placeholder: placeholder || 'Search hawker, restaurant, dish...',
      style: {
        flex: 1, border: 'none', outline: 'none', background: 'none',
        fontSize: 14, fontFamily: t.font.body, color: t.text,
      },
    })
  );
}

function FilterChips({ chips, active, onToggle }) {
  const t = useTheme();
  return React.createElement('div', {
    style: {
      display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 0',
      WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
    },
  },
    chips.map(chip => {
      const isActive = active.includes(chip);
      return React.createElement('button', {
        key: chip, onClick: () => onToggle(chip),
        style: {
          flexShrink: 0, padding: '7px 14px', borderRadius: 20, border: 'none',
          background: isActive ? t.primary : t.surface,
          color: isActive ? '#fff' : t.textSecondary,
          fontSize: 12, fontWeight: 600, fontFamily: t.font.body,
          cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: isActive ? 'none' : `0 1px 3px ${t.shadow}`,
        },
      }, chip);
    })
  );
}

function BudgetSlider({ value, onChange, max, style }) {
  const t = useTheme();
  const pct = (value / max) * 100;
  return React.createElement('div', { style: { ...style } },
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 8,
      },
    },
      React.createElement('span', {
        style: { fontSize: 12, fontWeight: 600, color: t.textSecondary, fontFamily: t.font.body },
      }, 'Budget'),
      React.createElement('span', {
        style: {
          fontSize: 20, fontWeight: 800, color: t.primary,
          fontFamily: t.font.heading, letterSpacing: '-0.5px',
        },
      }, value >= max ? 'Any' : `$${value}`)
    ),
    React.createElement('div', { style: { position: 'relative', height: 28, display: 'flex', alignItems: 'center' } },
      React.createElement('div', {
        style: {
          position: 'absolute', width: '100%', height: 6, borderRadius: 3,
          background: t.border, overflow: 'hidden',
        },
      },
        React.createElement('div', {
          style: {
            height: '100%', width: `${pct}%`, background: t.budgetFill,
            borderRadius: 3, transition: 'width 0.15s',
          },
        })
      ),
      React.createElement('input', {
        type: 'range', min: 2, max, step: 1, value,
        onChange: e => onChange(Number(e.target.value)),
        style: {
          position: 'absolute', width: '100%', height: 28,
          opacity: 0, cursor: 'pointer', zIndex: 2,
        },
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', left: `calc(${pct}% - 10px)`,
          width: 20, height: 20, borderRadius: '50%', background: t.primary,
          boxShadow: `0 2px 6px ${t.shadow}`, transition: 'left 0.15s',
          pointerEvents: 'none',
        },
      })
    )
  );
}

function BudgetPresets({ value, onChange }) {
  const t = useTheme();
  const presets = [3, 5, 8, 10, 15, 20, 50];
  return React.createElement('div', {
    style: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  },
    presets.map(p =>
      React.createElement('button', {
        key: p, onClick: () => onChange(p),
        style: {
          padding: '6px 12px', borderRadius: 10,
          border: value === p ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
          background: value === p ? t.primaryLight : t.surface,
          color: value === p ? t.primary : t.textSecondary,
          fontSize: 13, fontWeight: 700, fontFamily: t.font.heading,
          cursor: 'pointer', transition: 'all 0.2s',
        },
      }, `$${p}`)
    ),
    React.createElement('button', {
      onClick: () => onChange(999),
      style: {
        padding: '6px 12px', borderRadius: 10,
        border: value >= 50 ? `2px solid ${t.primary}` : `1.5px solid ${t.border}`,
        background: value >= 999 ? t.primaryLight : t.surface,
        color: value >= 999 ? t.primary : t.textSecondary,
        fontSize: 13, fontWeight: 700, fontFamily: t.font.heading,
        cursor: 'pointer',
      },
    }, 'Any')
  );
}

function VerifiedBadge({ size, date, style }) {
  const t = useTheme();
  const s = size || 'small';
  if (s === 'small') {
    return React.createElement('span', {
      style: {
        display: 'inline-flex', alignItems: 'center', gap: 3,
        fontSize: 10, fontWeight: 600, color: t.verified,
        background: t.themeName === 'pasar' ? 'rgba(74,222,128,0.12)' : `${t.verified}10`,
        padding: '2px 6px', borderRadius: 4, fontFamily: t.font.body, ...style,
      },
    },
      React.createElement('svg', { width: 10, height: 10, viewBox: '0 0 20 20', fill: t.verified },
        React.createElement('path', { d: 'M10 0l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 12.2 5.2 14.6l.9-5.3L2.3 5.6l5.3-.8L10 0z' })
      ),
      'Verified'
    );
  }
  return React.createElement('div', {
    style: {
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: 12, color: t.verified, fontFamily: t.font.body, ...style,
    },
  },
    React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 20 20', fill: t.verified },
      React.createElement('path', { d: 'M10 0l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 12.2 5.2 14.6l.9-5.3L2.3 5.6l5.3-.8L10 0z' })
    ),
    React.createElement('span', { style: { fontWeight: 600 } }, 'Verified'),
    date && React.createElement('span', { style: { color: t.textTertiary, fontWeight: 400 } }, `· ${date}`)
  );
}

function PriceTag({ price, size, style }) {
  const t = useTheme();
  const fontSize = size === 'large' ? 18 : size === 'medium' ? 14 : 12;
  return React.createElement('span', {
    style: {
      fontFamily: t.font.heading, fontWeight: 800, fontSize,
      color: t.primary, letterSpacing: '-0.3px', ...style,
    },
  }, `$${price.toFixed(2)}`);
}

function StarRating({ rating, size }) {
  const t = useTheme();
  const s = size || 12;
  return React.createElement('div', {
    style: { display: 'inline-flex', alignItems: 'center', gap: 3 },
  },
    React.createElement('svg', { width: s, height: s, viewBox: '0 0 20 20', fill: '#F5A623' },
      React.createElement('path', { d: 'M10 0l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 12.2 5.2 14.6l.9-5.3L2.3 5.6l5.3-.8L10 0z' })
    ),
    React.createElement('span', {
      style: { fontSize: s, fontWeight: 700, color: t.text, fontFamily: t.font.heading },
    }, rating.toFixed(1))
  );
}

function PlaceCard({ place, onClick, variant, density, isSaved, onSave }) {
  const t = useTheme();
  const [hovered, setHovered] = React.useState(false);
  const isCompact = variant === 'compact' || density === 'compact';
  const isFeatured = variant === 'featured';

  const cardStyle = {
    display: 'flex', flexDirection: isFeatured ? 'column' : 'row',
    gap: isCompact ? 10 : 14,
    padding: isCompact ? '10px 12px' : isFeatured ? 0 : '14px 16px',
    background: hovered ? t.cardHover : t.surface,
    borderRadius: isFeatured ? 16 : 14,
    cursor: 'pointer', transition: 'all 0.2s',
    border: `1px solid ${t.border}`,
    overflow: 'hidden', position: 'relative',
  };

  const thumbStyle = {
    width: isFeatured ? '100%' : isCompact ? 52 : 64,
    height: isFeatured ? 120 : isCompact ? 52 : 64,
    borderRadius: isFeatured ? 0 : 10,
    background: place.heroColor || t.surfaceAlt,
    flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  };

  const foodIcon = (place.cuisine || []).includes('Indian') ? '🫓' : (place.cuisine || []).includes('Malay') ? '🍜' : '🍚';

  return React.createElement('div', {
    style: cardStyle, onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  },
    React.createElement('div', { style: thumbStyle },
      React.createElement('span', { style: { fontSize: isFeatured ? 36 : isCompact ? 20 : 24, opacity: 0.6 } }, foodIcon),
      isFeatured && place.verified && React.createElement(VerifiedBadge, {
        style: { position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,0.9)' },
      }),
      // Save button on thumb
      onSave && React.createElement('button', {
        onClick: (e) => { e.stopPropagation(); onSave(); },
        style: {
          position: 'absolute', top: 8, right: 8,
          width: 28, height: 28, borderRadius: 8,
          background: isSaved ? t.primary : 'rgba(255,255,255,0.85)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', backdropFilter: 'blur(4px)',
        },
      },
        React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: isSaved ? '#fff' : t.textSecondary },
          React.createElement('path', { d: 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z' })
        )
      )
    ),
    React.createElement('div', {
      style: {
        flex: 1, display: 'flex', flexDirection: 'column',
        gap: isCompact ? 2 : 4,
        padding: isFeatured ? '12px 14px 14px' : 0,
        minWidth: 0,
      },
    },
      React.createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
      },
        React.createElement('div', { style: { minWidth: 0 } },
          React.createElement('div', {
            style: {
              fontSize: isCompact ? 13 : 15, fontWeight: 700, color: t.text,
              fontFamily: t.font.heading, whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
            },
          }, place.name),
          React.createElement('div', {
            style: {
              fontSize: isCompact ? 11 : 12, color: t.textTertiary,
              fontFamily: t.font.body, marginTop: 1,
            },
          }, `${place.location} · ${place.distance}km`)
        ),
        React.createElement(PriceTag, { price: place.cheapest, size: isCompact ? 'small' : 'medium' })
      ),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: isCompact ? 0 : 2 },
      },
        React.createElement(StarRating, { rating: place.rating, size: isCompact ? 10 : 12 }),
        !place.open && React.createElement('span', {
          style: {
            fontSize: 10, fontWeight: 600, color: t.accent || '#E85D3A',
            background: `${t.accent || '#E85D3A'}15`, padding: '1px 6px',
            borderRadius: 4, fontFamily: t.font.body,
          },
        }, 'Closed'),
        !isCompact && place.verified && React.createElement(VerifiedBadge, {}),
        !isCompact && React.createElement('span', {
          style: { fontSize: 11, color: t.textTertiary, fontFamily: t.font.body },
        }, `~$${place.typicalMeal.toFixed(0)} meal`)
      )
    )
  );
}

function MapPin({ place, selected, onClick, style }) {
  const t = useTheme();
  const isSelected = selected;
  return React.createElement('button', {
    onClick,
    style: {
      position: 'absolute', ...style,
      transform: `translate(-50%, -100%) ${isSelected ? 'scale(1.15)' : 'scale(1)'}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'none', border: 'none', cursor: 'pointer',
      transition: 'transform 0.2s', zIndex: isSelected ? 10 : 1,
      filter: isSelected ? `drop-shadow(0 3px 6px ${t.shadow})` : 'none',
    },
  },
    React.createElement('div', {
      style: {
        background: isSelected ? t.primary : t.surface,
        color: isSelected ? t.pinText : t.text,
        padding: '4px 8px', borderRadius: 8,
        fontSize: 11, fontWeight: 800, fontFamily: t.font.heading,
        border: `1.5px solid ${isSelected ? t.primary : t.border}`,
        whiteSpace: 'nowrap', letterSpacing: '-0.3px',
        boxShadow: `0 2px 4px ${t.shadow}`,
      },
    }, `$${place.cheapest.toFixed(place.cheapest % 1 === 0 ? 0 : 2)}`),
    React.createElement('div', {
      style: {
        width: 0, height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `5px solid ${isSelected ? t.primary : t.surface}`,
        marginTop: -1,
      },
    })
  );
}

function BottomSheet({ open, onClose, height, children }) {
  const t = useTheme();
  return React.createElement('div', {
    style: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: t.surface, borderRadius: '20px 20px 0 0',
      boxShadow: `0 -4px 20px ${t.shadow}`,
      transform: open ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
      zIndex: 20, maxHeight: height || '60%', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    },
  },
    React.createElement('div', {
      style: {
        display: 'flex', justifyContent: 'center', padding: '10px 0 6px',
        cursor: 'grab',
      },
      onClick: onClose,
    },
      React.createElement('div', {
        style: {
          width: 36, height: 4, borderRadius: 2,
          background: t.border,
        },
      })
    ),
    React.createElement('div', { style: { overflow: 'auto', flex: 1, padding: '0 16px 16px' } },
      children
    )
  );
}

function MenuItemRow({ item, onAdd, onVerify }) {
  const t = useTheme();
  const [added, setAdded] = React.useState(false);
  const [verifyOpen, setVerifyOpen] = React.useState(false);
  const [verifyStep, setVerifyStep] = React.useState('options'); // 'options' | 'price' | 'done' | 'error'
  const [newPrice, setNewPrice] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const resetVerify = () => { setVerifyOpen(false); setVerifyStep('options'); setNewPrice(''); };

  const handleConfirm = async (e) => {
    e.stopPropagation();
    if (submitting) return;
    setSubmitting(true);
    try {
      await onVerify(item, 'confirmed', item.price);
      setVerifyStep('done');
    } catch (_) {
      setVerifyStep('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReport = async (e) => {
    e.stopPropagation();
    const p = parseFloat(newPrice);
    if (!newPrice || isNaN(p) || p <= 0 || submitting) return;
    setSubmitting(true);
    try {
      await onVerify(item, 'changed', p);
      setVerifyStep('done');
    } catch (_) {
      setVerifyStep('error');
    } finally {
      setSubmitting(false);
    }
  };

  const verifyColor = t.verified || '#22c55e';

  return React.createElement('div', { style: { borderBottom: `1px solid ${t.border}` } },
    // Main row
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' },
    },
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('span', {
            style: { fontSize: 14, fontWeight: 500, color: t.text, fontFamily: t.font.body },
          }, item.name),
          item.verified && React.createElement('svg', {
            width: 12, height: 12, viewBox: '0 0 20 20', fill: verifyColor,
          },
            React.createElement('path', { d: 'M10 0l2.4 4.8 5.3.8-3.8 3.7.9 5.3L10 12.2 5.2 14.6l.9-5.3L2.3 5.6l5.3-.8L10 0z' })
          )
        ),
        React.createElement('div', {
          style: { fontSize: 11, color: t.textTertiary, fontFamily: t.font.body, marginTop: 2 },
        }, item.portion ? `${item.portion} · Updated ${item.lastUpdated}` : `Updated ${item.lastUpdated}`)
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 } },
        React.createElement(PriceTag, { price: item.price }),
        onVerify && React.createElement('button', {
          onClick: (e) => { e.stopPropagation(); if (verifyOpen) resetVerify(); else setVerifyOpen(true); },
          title: 'Verify price',
          style: {
            width: 24, height: 24, borderRadius: 6,
            border: `1.5px solid ${verifyOpen ? verifyColor + '60' : t.border}`,
            background: verifyOpen ? verifyColor + '15' : 'none',
            color: verifyOpen ? verifyColor : t.textTertiary,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          },
        },
          React.createElement('svg', { width: 11, height: 11, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5 },
            React.createElement('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
          )
        ),
        onAdd && React.createElement('button', {
          onClick: (e) => { e.stopPropagation(); setAdded(!added); onAdd(item); },
          style: {
            width: 28, height: 28, borderRadius: 8,
            border: added ? 'none' : `1.5px solid ${t.border}`,
            background: added ? t.primary : 'none',
            color: added ? '#fff' : t.textTertiary,
            fontSize: 16, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          },
        }, added ? '✓' : '+')
      )
    ),
    // Inline verification panel
    verifyOpen && React.createElement('div', {
      style: { paddingBottom: 12, paddingTop: 2 },
    },
      verifyStep === 'options' && React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 10, fontWeight: 700, color: t.textTertiary, fontFamily: t.font.body, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 7 },
        }, 'Is this price still accurate?'),
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          React.createElement('button', {
            onClick: handleConfirm, disabled: submitting,
            style: {
              flex: 1, padding: '7px 6px', borderRadius: 9,
              background: verifyColor + '15', border: `1.5px solid ${verifyColor}40`,
              color: verifyColor, fontSize: 12, fontWeight: 700,
              fontFamily: t.font.body, cursor: 'pointer',
            },
          }, submitting ? '...' : `✓ Still $${(item.price || 0).toFixed(2)}`),
          React.createElement('button', {
            onClick: (e) => { e.stopPropagation(); setVerifyStep('price'); },
            style: {
              flex: 1, padding: '7px 6px', borderRadius: 9,
              background: t.primary + '12', border: `1.5px solid ${t.primary}30`,
              color: t.primary, fontSize: 12, fontWeight: 700,
              fontFamily: t.font.body, cursor: 'pointer',
            },
          }, 'Changed →'),
          React.createElement('button', {
            onClick: (e) => { e.stopPropagation(); resetVerify(); },
            style: {
              width: 30, padding: '7px', borderRadius: 9,
              background: 'none', border: `1.5px solid ${t.border}`,
              color: t.textTertiary, fontSize: 13, fontFamily: t.font.body, cursor: 'pointer',
            },
          }, '✕')
        )
      ),
      verifyStep === 'price' && React.createElement('div', null,
        React.createElement('div', {
          style: { fontSize: 10, fontWeight: 700, color: t.textTertiary, fontFamily: t.font.body, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 7 },
        }, "What's the new price?"),
        React.createElement('div', { style: { display: 'flex', gap: 6 } },
          React.createElement('div', {
            style: {
              display: 'flex', alignItems: 'center', flex: 1,
              background: t.surface, border: `1.5px solid ${t.border}`, borderRadius: 9, padding: '0 10px',
            },
          },
            React.createElement('span', { style: { color: t.textTertiary, fontSize: 13, marginRight: 3, fontFamily: t.font.body } }, '$'),
            React.createElement('input', {
              type: 'number', step: '0.10', min: '0.10', value: newPrice,
              onChange: (e) => setNewPrice(e.target.value),
              placeholder: (item.price || 0).toFixed(2),
              style: {
                flex: 1, border: 'none', background: 'none',
                fontSize: 14, fontWeight: 600, color: t.text,
                fontFamily: t.font.body, outline: 'none', padding: '8px 0',
              },
            })
          ),
          React.createElement('button', {
            onClick: handleReport,
            disabled: submitting || !newPrice || parseFloat(newPrice) <= 0,
            style: {
              padding: '7px 14px', borderRadius: 9,
              background: parseFloat(newPrice) > 0 ? t.primary : t.border,
              border: 'none', color: '#fff',
              fontSize: 12, fontWeight: 700, fontFamily: t.font.body,
              cursor: parseFloat(newPrice) > 0 && !submitting ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            },
          }, submitting ? '...' : 'Report'),
          React.createElement('button', {
            onClick: (e) => { e.stopPropagation(); setVerifyStep('options'); setNewPrice(''); },
            style: {
              width: 30, padding: '7px', borderRadius: 9,
              background: 'none', border: `1.5px solid ${t.border}`,
              color: t.textTertiary, fontSize: 13, fontFamily: t.font.body, cursor: 'pointer',
            },
          }, '←')
        )
      ),
      verifyStep === 'done' && React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' },
      },
        React.createElement('span', { style: { fontSize: 15 } }, '✅'),
        React.createElement('span', { style: { fontSize: 12, fontWeight: 700, color: verifyColor, fontFamily: t.font.body } }, 'Thanks! Your report helps keep prices accurate.'),
        React.createElement('button', {
          onClick: (e) => { e.stopPropagation(); resetVerify(); },
          style: { marginLeft: 'auto', fontSize: 11, color: t.textTertiary, background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.font.body, flexShrink: 0 },
        }, 'Close')
      ),
      verifyStep === 'error' && React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' },
      },
        React.createElement('span', { style: { fontSize: 12, color: t.textTertiary, fontFamily: t.font.body } }, 'Could not submit — please try again.'),
        React.createElement('button', {
          onClick: (e) => { e.stopPropagation(); setVerifyStep('options'); },
          style: { marginLeft: 'auto', fontSize: 11, color: t.primary, background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.font.body },
        }, 'Retry')
      )
    )
  );
}

function SuggestionPill({ label, onClick }) {
  const t = useTheme();
  return React.createElement('button', {
    onClick,
    style: {
      padding: '6px 14px', borderRadius: 20,
      background: `${t.primary}12`, border: `1px solid ${t.primary}25`,
      color: t.primary, fontSize: 12, fontWeight: 600,
      fontFamily: t.font.body, cursor: 'pointer',
      whiteSpace: 'nowrap', transition: 'all 0.2s',
    },
  }, label);
}

function useIsDesktop() {
  const [v, setV] = React.useState(() => window.innerWidth >= 1024);
  React.useEffect(() => {
    const fn = () => setV(window.innerWidth >= 1024);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return v;
}

function SidebarNav({ active, onNavigate, user, onLogin, onLogout }) {
  const t = useTheme();
  const tabs = [
    { key: 'home', label: 'Home', icon: 'M12 3L2 12h3v8h5v-5h4v5h5v-8h3L12 3z' },
    { key: 'search', label: 'Explore', icon: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' },
    { key: 'saved', label: 'Saved', icon: 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z' },
    { key: 'profile', label: 'Profile', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  ];
  return React.createElement('aside', {
    style: {
      width: 240, flexShrink: 0, background: t.surface,
      borderRight: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
      height: '100%',
    },
  },
    // Logo
    React.createElement('div', {
      style: { padding: '20px 20px 16px', borderBottom: `1px solid ${t.border}` },
    },
      React.createElement('div', {
        style: { fontSize: 22, fontWeight: 800, color: t.primary, fontFamily: t.font.heading, letterSpacing: '-0.5px' },
      }, 'BiteBudget'),
      React.createElement('div', {
        style: { fontSize: 11, color: t.textTertiary, fontFamily: t.font.body, marginTop: 2 },
      }, 'Singapore food prices')
    ),
    // Nav items
    React.createElement('nav', {
      style: { flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 2 },
    },
      tabs.map(tab => {
        const isActive = active === tab.key;
        return React.createElement('button', {
          key: tab.key,
          onClick: () => onNavigate(tab.key),
          style: {
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 12, border: 'none',
            background: isActive ? `${t.primary}18` : 'none',
            color: isActive ? t.primary : t.textSecondary,
            cursor: 'pointer', textAlign: 'left',
            fontSize: 14, fontWeight: isActive ? 700 : 500,
            fontFamily: t.font.body, transition: 'all 0.15s',
            width: '100%',
          },
        },
          React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor' },
            React.createElement('path', { d: tab.icon })
          ),
          tab.label
        );
      })
    ),
    // User section
    React.createElement('div', {
      style: { padding: '16px 16px', borderTop: `1px solid ${t.border}` },
    },
      user
        ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement('div', {
              style: {
                width: 34, height: 34, borderRadius: '50%',
                background: t.primary, color: '#fff', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, fontFamily: t.font.heading,
              },
            }, (user.email || 'U')[0].toUpperCase()),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', {
                style: { fontSize: 12, fontWeight: 600, color: t.text, fontFamily: t.font.body, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
              }, user.email),
              React.createElement('button', {
                onClick: onLogout,
                style: { fontSize: 11, color: t.textTertiary, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: t.font.body },
              }, 'Sign out')
            )
          )
        : React.createElement('button', {
            onClick: onLogin,
            style: {
              width: '100%', padding: '10px', borderRadius: 10,
              background: t.primary, border: 'none',
              color: '#fff', fontSize: 13, fontWeight: 600,
              fontFamily: t.font.body, cursor: 'pointer',
            },
          }, 'Sign in')
    )
  );
}

Object.assign(window, {
  BottomNav, SearchBar, FilterChips, BudgetSlider, BudgetPresets,
  PlaceCard, VerifiedBadge, PriceTag, MapPin, BottomSheet,
  StarRating, MenuItemRow, SuggestionPill,
  useIsDesktop, SidebarNav,
});
