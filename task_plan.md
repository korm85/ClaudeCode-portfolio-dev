# Task Plan: System-Level Hebrew RTL Text Alignment on Ubuntu 26.04

## Goal
Enable system-level bidirectional text support so that Hebrew text automatically aligns to the right and renders with proper RTL directionality across all applications, particularly browsers.

## Current Phase
Phase 7

## Phases

### Phase 1: Requirements & Discovery
- [x] Understand user intent (system-level RTL alignment for Hebrew, not just input)
- [x] Identify that user wants text alignment, not reversed character order
- [x] Inspect current system state (locale, fonts, keyboard already present)
- [x] Document findings in findings.md
- **Status:** complete

### Phase 2: System Locale & Environment Configuration
- [x] Verify Hebrew locale is fully configured (he_IL.UTF-8)
- [x] Set system-wide locale variables for Hebrew/RTL support
- [x] Configure LC_MESSAGES to remain English (user preference implied)
- [x] Update ~/.profile and ~/.bashrc with proper RTL settings
- **Status:** complete

### Phase 3: GNOME Desktop & GTK RTL Configuration
- [x] Configure GNOME text-direction settings for RTL support
- [x] Set GTK default direction to automatic (RTL for Hebrew, LTR for English)
- [x] Configure Pango/FreeType for proper bidirectional rendering
- [x] Update GNOME input sources to prioritize Hebrew context
- **Status:** complete

### Phase 4: Browser-Specific RTL Configuration
- [x] Configure Chrome/Chromium to recognize Hebrew as RTL language
- [x] Set up Chrome language preferences with Hebrew
- [x] Configure Chrome's bidirectional text rendering
- [ ] Install Chrome extension for RTL text direction enforcement if needed
- **Status:** complete

### Phase 5: Text Editor RTL Configuration
- [x] Configure VS Code for Hebrew RTL text direction (not installed)
- [x] Set up gedit/gedit for bidirectional text (GTK auto-detect handles this)
- [x] Configure nano for Hebrew display
- [x] Set up LibreOffice for Complex Text Layout (CTL) if installed
- **Status:** complete

### Phase 6: Font & Rendering Optimization
- [x] Verify Hebrew font fallback chain is optimal
- [x] Configure fontconfig for Hebrew glyph substitution
- [x] Ensure Noto Sans Hebrew, DejaVu fonts are prioritized
- [x] Test rendering quality in various applications
- **Status:** complete

### Phase 7: Testing & Verification
- [ ] Test Hebrew text in Chrome address bar and web forms
- [ ] Test Hebrew websites (ynet.co.il, haaretz.co.il) for proper RTL
- [ ] Test mixed Hebrew/English text direction
- [ ] Test system dialog boxes and menus
- [ ] Verify text alignment in GTK applications
- **Status:** pending

## Key Questions (Answered)
1. Should the desktop UI itself flip to RTL, or only Hebrew text content?
   - **Answer**: Only where text is written — Hebrew text should align right, UI stays LTR
2. Which browser is primary?
   - **Answer**: Google Chrome
3. Should system messages remain in English?
   - **Answer**: Yes, keep English UI. Hebrew text should be RTL-aligned, system in English

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Keep LC_MESSAGES=en_US.UTF-8 | **Confirmed**: User wants system UI in English |
| Set LC_CTYPE=he_IL.UTF-8 | Hebrew text classification for proper RTL detection |
| Configure GTK_TEXT_DIRECTION=auto (not RTL) | **Key decision**: Auto-detects RTL for Hebrew, keeps LTR for English — matches user's need |
| Scope: Chrome + text editors only | **Confirmed**: User does not need full system RTL flip |
| Use fontconfig for Hebrew font prioritization | Ensures consistent Hebrew rendering across apps |
| Keep GNOME UI in LTR | System menus/dialogs stay left-to-right in English |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| None yet | - | - |

## Notes
- System already has he_IL.utf8 locale installed
- Hebrew keyboard layout (il) already in GNOME input sources
- 112 Hebrew fonts already installed (Noto Sans Hebrew, DejaVu, etc.)
- Ubuntu 26.04 uses GNOME 46+ which has improved RTL support
- GTK4 has better bidirectional text support than GTK3
- Chrome uses its own text rendering engine (Blink) but respects system locale

## Implementation Commands Preview (REFINED)
```bash
# Phase 2: Locale (Hebrew text classification, English UI)
sudo update-locale LANG=en_US.UTF-8 LC_CTYPE=he_IL.UTF-8 LC_MESSAGES=en_US.UTF-8

# Phase 3: GTK auto-detect (RTL for Hebrew text, LTR for English)
# Add to ~/.profile:
export GTK_TEXT_DIRECTION=auto

# Phase 4: Chrome — Add Hebrew via chrome://settings/languages
# Then set Hebrew text direction to RTL in Chrome settings

# Phase 5: VS Code settings.json
{
  "editor.wordWrap": "on",
  "editor.renderWhitespace": "boundary",
  "workbench.tree.indent": 20
}
# Install "RTL" extension in VS Code for explicit RTL toggle
```
