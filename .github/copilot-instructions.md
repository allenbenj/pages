# Copilot Instructions

> Repo-wide rules live here. For deeper per-folder rules, we may add `AGENTS.md` or scoped `*.instructions.md` files.

---

## Repository Purpose & Tech Stack

**Project:** "An Edifice of Lies" - A comprehensive web-based case presentation documenting State v. Benjamin Allen, revealing contradictions, investigative failures, and prosecutorial misconduct through interactive visualizations.  
**Primary Language:** HTML5, CSS3, JavaScript (Vanilla)  
**Framework:** None - pure vanilla implementation, no build tools  
**Package Manager:** None required for core functionality  
**Runtime:** Modern web browser (Chrome/Edge recommended)  
**Key Dependencies:** Google Fonts (Playfair Display, Crimson Text, Fredericka the Great)

---

## Quickstart

### Install Dependencies
```bash
# No installation required - static HTML/CSS/JS site
# Just clone and open in browser
git clone [repo-url]
```

### Build
```bash
# No build process required
# Open index.html directly in a browser
```

### Test
```bash
# Visual testing - open each HTML page in browser
# Check: orbital carousel rotates, modals open/close, videos play
# Expected: All pages load without console errors
```

### Lint / Format
```bash
# No formal linter configured
# Maintain existing code style: 4-space indentation, single quotes in JS
```

---

## CI Parity (First-Class Requirement)

**Run the same commands CI runs.** The workflow files are the source of truth.

| Workflow File | Key Jobs | What It Checks |
|---------------|----------|----------------|
| `.github/workflows/node.js.yml` | `build` | Node.js compatibility across 18.x, 20.x, 22.x |

If instructions contradict workflow files, **treat workflows as authoritative** and flag the discrepancy.

---

## Project Layout Map

> "If you need X, look in Y"

| Path | Purpose |
|------|---------|
| `index.html` | Main entry point / Overview page |
| `*.html` (root) | Individual presentation pages (12 total) |
| `shared/` | All shared CSS, JS, and HTML snippets |
| `shared/styles.css` | Global styles and CSS variables |
| `shared/carousel-nav.css` | Orbital carousel navigation styles |
| `shared/orbital-carousel.js` | 3D elliptical navigation logic |
| `shared/image-modal.js` | Modal viewer for images/videos |
| `shared/card-*.js` | Card utilities and color schemes |
| `documents/` | Evidence files, graphics, mindmaps |
| `documents/graphics/` | Images, logos, and visual assets |
| `documents/graphics/inserts/` | Timeline insert images |
| `documents/mindmaps/` | OPML mindmap source files |
| `video/` | Video evidence files (.mp4) |
| `audio/` | Audio evidence files (.opus) |
| `.github/workflows/` | CI configuration |

---

## Conventions & Guardrails (Anti-Misbehavior Rules)

**Do NOT:**
- ❌ Reformat unrelated HTML/CSS files
- ❌ Change CSS variable names in `:root` without updating all usages
- ❌ Modify `shared/` files without checking all 12 HTML pages that use them
- ❌ Remove `_backup` files - they are intentional version snapshots
- ❌ Change video/image paths without verifying files exist
- ❌ Break the orbital carousel positioning math (radiusX, radiusY, centerX, centerY)

**Do:**
- ✅ Test changes in Chrome/Edge AND Firefox
- ✅ Preserve cache-busting query strings on CSS links (e.g., `?v=639006186749527756`)
- ✅ Keep modal functionality working (Escape key closes, click outside closes)
- ✅ Match existing indentation (4 spaces for HTML/CSS/JS)
- ✅ Update README.md if adding new pages or features

---

## Definition of Done (PR Checklist)

A PR is ready when:
- [ ] All 12 HTML pages load without console errors
- [ ] Orbital carousel rotates correctly on hover
- [ ] Image/video modals open and close properly
- [ ] Videos play in modal viewer
- [ ] No broken image/video links
- [ ] Responsive layout works on mobile viewport
- [ ] README updated if behavior changed

---

## Known Gotchas

1. **CSS cache busting:** Browser caches CSS aggressively → Update the `?v=` query string on `<link>` tags when changing `styles.css`
2. **Orbital carousel math:** The ellipse uses `radiusX=580`, `radiusY=280` → Changing these breaks item positioning on all pages
3. **Video modal won't play:** Modal expects video in `video/` folder with exact filename → Check path and file extension (.mp4, .webm, .ogg, .mov)
4. **Backup files:** Files ending in `_backup.js` or `_backup.css` are intentional snapshots → Don't delete or merge them
5. **Font loading:** Google Fonts loaded via `@import` in CSS → Slow connections may show FOUT (flash of unstyled text)
6. **Modal z-index:** Modals must stay above carousel (z-index hierarchy) → Don't lower modal z-index below 1000

---

## Troubleshooting Commands

| Problem | Try This |
|---------|----------|
| CSS changes not showing | Hard refresh: `Ctrl+Shift+R` or update `?v=` param |
| Carousel not rotating | Check browser console for JS errors in `orbital-carousel.js` |
| Modal won't open | Verify `image-modal.js` is loaded and modal HTML exists |
| Video won't play | Check file path, ensure video codec is browser-compatible |
| Page layout broken | Check for unclosed HTML tags, validate with browser DevTools |

---

## Minimal Exploration Rule

**Trust this file first.** Only search the codebase when information is missing here.

When exploring:
1. Check `index.html` first (main entry point, shows page structure)
2. Check `shared/styles.css` for CSS variables and global styles
3. Check `shared/orbital-carousel.js` for navigation logic
4. Check README.md for feature documentation
5. Ask if still unclear

---

## PowerShell Helper Scripts

Several PowerShell scripts exist for batch operations:

| Script | Purpose |
|--------|---------|
| `add-modal.ps1` | Add modal HTML to pages |
| `fix-image-links.ps1` | Batch fix image paths |
| `fix-video-links.ps1` | Batch fix video paths |
| `update-modal-video.ps1` | Update modal video functionality |

Run with: `.\script-name.ps1` from project root.
