const viewMode = document.getElementById("view-mode");
const editMode = document.getElementById("edit-mode");
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const cancelBtn = document.getElementById("cancel-btn");
const saveBtn = document.getElementById("save-btn");
const editTitleInput = document.getElementById("edit-title-input");
const editDescInput = document.getElementById("edit-description-input");
const editPriority = document.getElementById("edit-priority-select");
const editDueDate = document.getElementById("edit-due-date-input");
const todoTitle = document.getElementById("todo-title");
const todoDesc = document.getElementById("todo-description");
const priorityBadge = document.getElementById("priority-badge");
const priorityBar = document.getElementById("priority-indicator");
// const statusBadge = document.getElementById("status-badge");
// const statusControl = document.getElementById("status-control");
const dueDateEl = document.getElementById("due-date-el");

const state = {
  title: "Design new onboarding flow for mobile app",
  description:
    "Create wireframes and prototypes for the revamped mobile onboarding experience. Coordinate with the UX team on brand guidelines and accessibility requirements. This includes user research synthesis, low-fidelity sketches, high-fidelity mockups, and handoff documentation for the engineering team.",
  priority: "High",
  dueDate: new Date("2026-04-16T18:00:00Z"),
  status: "In Progress",
};

// helper functions
function pad(n) {
  return String(n).padStart(2, "0");
}

function toLocalDatetimeValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatDueDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// priority
const PRIORITY_BADGE_CLASS = {
  High: "priority-high",
  Medium: "priority-medium",
  Low: "priority-low",
};
const PRIORITY_BAR_COLOR = {
  High: "#c0392b",
  Medium: "#e67e22",
  Low: "#27ae60",
};

function applyPriority(p) {
  priorityBadge.textContent = p;
  priorityBadge.className = "badge " + PRIORITY_BADGE_CLASS[p];
  priorityBadge.setAttribute("aria-label", "Priority: " + p);
  priorityBar.style.background = PRIORITY_BAR_COLOR[p];
}

function getTimeRemaining() {
  const now = Date.now();
  const diff = state.dueDate - now;
  const abs = Math.abs(diff);

  const mins = Math.floor(abs / 60000);
  const hrs = Math.floor(abs / 3600000);
  const days = Math.floor(abs / 86400000);

  let text, cls;

  if (diff < 0) {
    cls = "overdue";
    if (hrs < 1) text = `Overdue by ${mins} min${mins !== 1 ? "s" : ""}`;
    else if (hrs < 24) text = `Overdue by ${hrs} hr${hrs !== 1 ? "s" : ""}`;
    else text = `Overdue by ${days} day${days !== 1 ? "s" : ""}`;
  } else if (diff < 3600000) {
    cls = "overdue";
    text = "Due now!";
  } else if (days < 1) {
    cls = "soon";
    text = `Due in ${hrs} hour${hrs !== 1 ? "s" : ""}`;
  } else if (days === 1) {
    cls = "soon";
    text = "Due tomorrow";
  } else {
    cls = "ok";
    text = `Due in ${days} days`;
  }

  return { text, cls };
}

function updateTimeRemaining() {
  const el = document.getElementById("time-remaining");
  const { text, cls } = getTimeRemaining();

  el.textContent = text;
  el.className = cls;
  el.setAttribute("aria-label", "Time remaining: " + text);

  if (cls === "overdue") {
    state.status = "Overdue";
    state.priority = "High";

    applyPriority("High");

    const status = document.getElementById("status-badge");
    status.textContent = "Overdue";
    status.className = "badge status-overdue";
    status.setAttribute("aria-label", "Status: Overdue");
  }
}

document
  .getElementById("complete-toggle")
  .addEventListener("change", function () {
    const card = document.getElementById("todo-card");
    const title = document.getElementById("todo-title");
    const status = document.getElementById("status-badge");

    if (this.checked) {
      card.classList.add("completed");
      title.classList.add("struck");
      status.textContent = "Done";
      status.className = "badge status-done";
      status.setAttribute("aria-label", "Status: Done");
    } else {
      card.classList.remove("completed");
      title.classList.remove("struck");
      status.textContent = "In Progress";
      status.className = "badge status-progress";
      status.setAttribute("aria-label", "Status: In Progress");
    }
  });

updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

// edit mode
function openEdit() {
  // fill inputs with current state
  editTitleInput.value = state.title;
  editDescInput.value = state.description;
  editPriority.value = state.priority;
  editDueDate.value = toLocalDatetimeValue(state.dueDate);

  viewMode.hidden = true;
  editMode.hidden = false;

  editTitleInput.focus();
}

function closeEdit() {
  viewMode.hidden = false;
  editMode.hidden = true;

  editBtn.focus();
}

editBtn.addEventListener("click", openEdit);
cancelBtn.addEventListener("click", closeEdit);

saveBtn.addEventListener("click", () => {
  const newTitle = editTitleInput.value.trim();
  const newDesc = editDescInput.value.trim();
  const newPri = editPriority.value;
  const newDate = new Date(editDueDate.value);

  if (!newTitle) {
    editTitleInput.focus();
    return;
  }

  // update state
  state.title = newTitle;
  state.description = newDesc;
  state.priority = newPri;
  if (!isNaN(newDate)) state.dueDate = newDate;

  // update DOM
  todoTitle.textContent = state.title;
  todoDesc.textContent = state.description;
  applyPriority(state.priority);

  // update due date display
  dueDateEl.textContent = "Due " + formatDueDate(state.dueDate);
  dueDateEl.setAttribute("datetime", state.dueDate.toISOString());

  updateTimeRemaining();
  closeEdit();
});
