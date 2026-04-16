# Todo Item Card

A accessible, responsive todo task card built with plain HTML, CSS, and JavaScript. Built as a Stage 0 and stage 1A submission for the HNG Frontend Internship.

## What Changed from Stage 0

- **Edit mode** — clicking Edit opens an inline form to update the title, description, priority, and due date. Save applies changes; Cancel restores previous values. Focus returns to the Edit button on close.
- **Status control** — dropdown to manually set status between Pending, In Progress, and Done.
- **Status sync** — checkbox, status badge, and status dropdown stay in sync at all times.
- **Priority indicator bar** — coloured bar at the top of the card changes based on priority (red = High, amber = Medium, green = Low).
- **Expand / collapse** — long descriptions are collapsed by default with a Show more / Show less toggle.
- **Overdue indicator** — red banner appears at the top of the card when the task is past its due date.
- **Granular time remaining** — now shows minutes, hours, days. Stops updating and shows "Completed" when status is Done.
- **Time interval** — updates every 30 seconds (was 60 seconds in Stage 0).

## Features

- **Priority badge** — High / Medium / Low
- **Status indicator and dropdown control** — Pending / In Progress / Done
- **Due date** with live time remaining (updates every 30 seconds)
- **Completion toggle** — strikes through the title and updates with the status dropdown
- **Tags/categories** — work, urgent, design
- Expand / collapse for long descriptions
- Overdue indicator banner
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

### Stage 0 (still present)

| Element             | data-testid                 |
| ------------------- | --------------------------- |
| Card container      | `test-todo-card`            |
| Task title          | `test-todo-title`           |
| Description         | `test-todo-description`     |
| Priority badge      | `test-todo-priority`        |
| Due date            | `test-todo-due-date`        |
| Time remaining      | `test-todo-time-remaining`  |
| Status indicator    | `test-todo-status`          |
| Completion checkbox | `test-todo-complete-toggle` |
| Tags list           | `test-todo-tags`            |
| Work tag            | `test-todo-tag-work`        |
| Urgent tag          | `test-todo-tag-urgent`      |
| Edit button         | `test-todo-edit-button`     |
| Delete button       | `test-todo-delete-button`   |

### Stage 1a (new)

| Element                | data-testid                        |
| ---------------------- | ---------------------------------- |
| Edit form container    | `test-todo-edit-form`              |
| Title input            | `test-todo-edit-title-input`       |
| Description textarea   | `test-todo-edit-description-input` |
| Priority select        | `test-todo-edit-priority-select`   |
| Due date input         | `test-todo-edit-due-date-input`    |
| Save button            | `test-todo-save-button`            |
| Cancel button          | `test-todo-cancel-button`          |
| Status dropdown        | `test-todo-status-control`         |
| Priority indicator bar | `test-todo-priority-indicator`     |
| Expand/collapse toggle | `test-todo-expand-toggle`          |
| Collapsible section    | `test-todo-collapsible-section`    |
| Overdue indicator      | `test-todo-overdue-indicator`      |

---

## Accessibility

- Semantic HTML (`article`, `h2`, `p`, `time`, `ul`, `button`)
- Real `<input type="checkbox">` with `aria-label`
- `aria-live="polite"` on the time remaining element and overdue indicator
- Visible focus styles on all interactive elements
- WCAG AA compliant color contrast
- All form fields in edit mode have `<label for="">` associations
- Expand toggle uses `aria-expanded` and `aria-controls`
- Collapsible section has matching `id` for `aria-controls`
- All buttons have accessible names via visible text or `aria-label`
- Focus returns to Edit button when edit mode is closed
- Full keyboard navigation: Tab → Checkbox → Status control → Expand toggle → Edit → Delete → (in edit mode) Save → Cancel

---

## Known Limitations

- Tags are hard-coded and not editable in the edit form
- No persistent storage — state resets on page refresh

---

## Built With

- HTML
- CSS
- JavaScript (vanilla)
