# Todo Item Card

A accessible, responsive todo task card built with plain HTML, CSS, and JavaScript. Built as a Stage 0 submission for the HNG Frontend Internship.

## Features

- **Priority badge** — High / Medium / Low
- **Status indicator** — Pending / In Progress / Done
- **Due date** with live time remaining (updates every 60 seconds)
- **Completion toggle** — strikes through the title and updates the status to Done
- **Tags/categories** — work, urgent, design
- **Edit & Delete** action buttons
- Fully keyboard navigable and screen-reader accessible
- Responsive from 320px to 1200px

## Project Structure

```
├── index.html   # Markup and structure
├── style.css    # Styling and responsive layout
├── app.js       # Time remaining logic and checkbox toggle
└── README.md
```

## Getting Started

No build tools or dependencies required. Just open `index.html` in a browser.

```bash
git clone https://github.com/stephany247/todo-item-card.git
cd todo-item-card
open index.html
```

## data-testid Reference

| Element | data-testid |
|---|---|
| Card container | `test-todo-card` |
| Task title | `test-todo-title` |
| Description | `test-todo-description` |
| Priority badge | `test-todo-priority` |
| Due date | `test-todo-due-date` |
| Time remaining | `test-todo-time-remaining` |
| Status indicator | `test-todo-status` |
| Completion checkbox | `test-todo-complete-toggle` |
| Tags list | `test-todo-tags` |
| Work tag | `test-todo-tag-work` |
| Urgent tag | `test-todo-tag-urgent` |
| Edit button | `test-todo-edit-button` |
| Delete button | `test-todo-delete-button` |

## Accessibility

- Semantic HTML (`article`, `h2`, `p`, `time`, `ul`, `button`)
- Real `<input type="checkbox">` with `aria-label`
- `aria-live="polite"` on the time remaining element
- Visible focus styles on all interactive elements
- WCAG AA compliant color contrast

## Built With

- HTML
- CSS
- JavaScript (vanilla)
