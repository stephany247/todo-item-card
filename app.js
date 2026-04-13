const DUE_DATE = new Date('2026-04-17T18:00:00Z');

function getTimeRemaining() {
  const now = Date.now();
  const diff = DUE_DATE - now;
  const abs = Math.abs(diff);

  const mins = Math.floor(abs / 60000);
  const hrs  = Math.floor(abs / 3600000);
  const days = Math.floor(abs / 86400000);

  let text, cls;

  if (diff < 0) {
    cls = 'overdue';
    if (hrs < 1)       text = `Overdue by ${mins} min${mins !== 1 ? 's' : ''}`;
    else if (hrs < 24) text = `Overdue by ${hrs} hr${hrs !== 1 ? 's' : ''}`;
    else               text = `Overdue by ${days} day${days !== 1 ? 's' : ''}`;
  } else if (diff < 3600000) {
    cls = 'overdue'; text = 'Due now!';
  } else if (days < 1) {
    cls = 'soon'; text = `Due in ${hrs} hour${hrs !== 1 ? 's' : ''}`;
  } else if (days === 1) {
    cls = 'soon'; text = 'Due tomorrow';
  } else {
    cls = 'ok'; text = `Due in ${days} days`;
  }

  return { text, cls };
}

function updateTimeRemaining() {
  const el = document.getElementById('time-remaining');
  const { text, cls } = getTimeRemaining();
  el.textContent = text;
  el.className = cls;
  el.setAttribute('aria-label', 'Time remaining: ' + text);
}

document.getElementById('complete-toggle').addEventListener('change', function () {
  const card   = document.getElementById('todo-card');
  const title  = document.getElementById('todo-title');
  const status = document.getElementById('status-badge');

  if (this.checked) {
    card.classList.add('completed');
    title.classList.add('struck');
    status.textContent = 'Done';
    status.className = 'badge status-done';
    status.setAttribute('aria-label', 'Status: Done');
  } else {
    card.classList.remove('completed');
    title.classList.remove('struck');
    status.textContent = 'In Progress';
    status.className = 'badge status-progress';
    status.setAttribute('aria-label', 'Status: In Progress');
  }
});

updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);
