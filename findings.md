# Findings & Decisions

## Requirements
- System-level Hebrew RTL text alignment (right-alignment when text is Hebrew)
- Not about reversed character order, about proper bidirectional text direction
- Primary focus: browsers, specifically Google Chrome
- Hebrew text should align to the right automatically when detected
- Keep system UI in English (implied preference)

## Research Findings

### Current System State (Ubuntu 26.04 LTS)
- **Locale**: he_IL.utf8 is already installed and available
- **Keyboard**: Hebrew (il) layout is already configured in GNOME input sources alongside US
- **Fonts**: 112 Hebrew-capable fonts installed, including:
  - Noto Sans Hebrew (multiple weights)
  - Noto Serif Hebrew
  - DejaVu Sans (supports Hebrew glyphs)
- **GNOME Version**: Ubuntu 26.04 ships with GNOME 46+ which has mature RTL support
- **GTK Version**: GTK4 present with improved bidirectional text rendering

### Key Technical Components for RTL Support

#### 1. Locale Configuration
- Primary locale: he_IL.UTF-8 (Hebrew, Israel)
- Keep LC_MESSAGES=en_US.UTF-8 for English UI
- LC_CTYPE=he_IL.UTF-8 for proper character classification

#### 2. GNOME/GTK Bidirectional Text
- GNOME setting: `org.gnome.desktop.interface text-direction`
- GTK environment variable: `GTK_TEXT_DIRECTION` (values: ltr, rtl, auto)
- Pango handles text direction detection automatically when `auto` is set
- GTK applications will detect Hebrew Unicode range (U+0590-U+05FF) and switch to RTL

#### 3. Chrome/Chromium RTL
- Chrome uses Blink rendering engine with built-in bidi support
- Chrome respects system locale settings for default text direction
- Hebrew language must be added in Chrome settings for proper RTL detection
- Chrome's `chrome://settings/languages` controls per-language text direction
- Hebrew websites with proper HTML `dir="rtl"` or `lang="he"` will render correctly

#### 4. Font Configuration
- Fontconfig rules needed for Hebrew font fallback prioritization
- Noto Sans Hebrew is the optimal choice for UI text
- Noto Serif Hebrew for serif content
- DejaVu Sans as fallback for mixed Latin/Hebrew text

#### 5. Environment Variables
Critical variables for RTL support:
- `LANG=he_IL.UTF-8` - System default locale
- `LC_CTYPE=he_IL.UTF-8` - Character handling
- `GTK_TEXT_DIRECTION=auto` - GTK automatic direction
- `QT_QPA_PLATFORMTHEME=gtk2` - Qt apps follow GTK theme (if applicable)

### Ubuntu 26.04 Specific Notes
- Uses systemd-localed for locale management
- GNOME 46 has improved Wayland RTL support
- PipeWire audio (no impact on RTL)
- Snap and Flatpak apps may need separate locale configuration
- Chrome installed via .deb or snap - different config locations

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Set GTK_TEXT_DIRECTION=auto rather than RTL | Allows mixed LTR/RTL content; RTL forces everything right |
| Configure locale at user level (~/.profile) not system-wide | Avoids affecting other users or system services |
| Keep English LC_MESSAGES | User wants English UI with Hebrew text support |
| Use fontconfig for Hebrew prioritization | Consistent across all applications using fontconfig |
| Configure Chrome via both system locale and browser settings | Chrome respects system but needs explicit Hebrew language entry |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| None yet | - |

## Resources
- Ubuntu locale documentation: https://help.ubuntu.com/community/Locale
- GNOME bidi support: https://gitlab.gnome.org/GNOME/gtk/-/blob/main/docs/text-direction.md
- Chrome language settings: chrome://settings/languages
- Pango bidirectional text: https://docs.gtk.org/Pango/pango_bidi.html
- Hebrew Unicode range: U+0590-U+05FF (letters), U+FB1D-U+FB4F (presentation forms)

## Visual/Browser Findings
- Hebrew websites (ynet.co.il, haaretz.co.il) use proper HTML dir="rtl" attributes
- Chrome will automatically detect and render these correctly when Hebrew is in language list
- Mixed Hebrew-English text requires bidi algorithm (Unicode BiDi) support
- Text alignment (right vs left) is separate from text direction (RTL vs LTR)
