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
const statusBadge = document.getElementById("status-badge");
const statusControl = document.getElementById("status-control");
const dueDateEl = document.getElementById("due-date-el");
const checkbox = document.getElementById("complete-toggle");
const card = document.getElementById("todo-card");
const timeEl = document.getElementById("time-remaining");
const overdueEl = document.getElementById("overdue-indicator");

const state = {
  title: "Design new onboarding flow for mobile app",
  description:
    "Create wireframes and prototypes for the revamped mobile onboarding experience. Coordinate with the UX team on brand guidelines and accessibility requirements. This includes user research synthesis, low-fidelity sketches, high-fidelity mockups, and handoff documentation for the engineering team.",
  priority: "High",
  dueDate: new Date("2026-04-18T18:00:00Z"),
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

function plural(value, unit) {
  return value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;
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

// status
const STATUS_CLASS = {
  Pending: "badge status-pending",
  "In Progress": "badge status-progress",
  Done: "badge status-done",
};

function applyStatus(s) {
  state.status = s;

  // badge
  statusBadge.textContent = s;
  statusBadge.className = STATUS_CLASS[s] || "badge";
  statusBadge.setAttribute("aria-label", "Status: " + s);

  // dropdown sync
  statusControl.value = s;

  // checkbox sync
  const isDone = s === "Done";
  checkbox.checked = isDone;

  card.classList.toggle("completed", isDone);
  todoTitle.classList.toggle("struck", isDone);
}

statusControl.addEventListener("change", () => {
  applyStatus(statusControl.value);
});

checkbox.addEventListener("change", () => {
  applyStatus(checkbox.checked ? "Done" : "Pending");
});

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
    if (mins < 60) text = `Overdue by ${plural(mins, "min")}`;
    else if (hrs < 24) text = `Overdue by ${plural(hrs, "hr")}`;
    else text = `Overdue by ${plural(days, "day")}`;
  } else {
    cls = "ok";
    if (mins < 60) text = `Due in ${plural(mins, "min")}`;
    else if (hrs < 24) text = `Due in ${plural(hrs, "hour")}`;
    else text = `Due in ${plural(days, "day")}`;
  }

  return { text, cls };
}

function updateTimeRemaining() {
  if (state.status === "Done") {
    timeEl.textContent = "Completed";
    timeEl.className = "done";
    timeEl.setAttribute("aria-label", "Task completed");

    return;
  }

  const { text, cls } = getTimeRemaining();

  timeEl.textContent = text;
  timeEl.className = "";
  timeEl.classList.add(cls);
  timeEl.setAttribute("aria-label", "Time remaining: " + text);

  const isOverdue = cls === "overdue";
  statusControl.disabled = false;

  if (isOverdue) {
    applyPriority("High");
    // document.getElementById("overdue-indicator").style.display = "block";
    overdueEl.classList.add("visible");
  } else {
    applyPriority(state.priority); 
    applyStatus(state.status);
    overdueEl.classList.remove("visible");
  }
}

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
