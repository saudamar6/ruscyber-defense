const events = [
  {
    type: "SECURITY",
    title: "Проверка целостности завершена",
    source: "Integrity Guard",
    safe: true
  },
  {
    type: "BLOCKED",
    title: "Подозрительный запрос заблокирован",
    source: "Web Shield",
    safe: false
  },
  {
    type: "SECURITY",
    title: "Авторизация успешно проверена",
    source: "Authentication Monitor",
    safe: true
  },
  {
    type: "BLOCKED",
    title: "Превышен лимит запросов",
    source: "Rate Limiter",
    safe: false
  }
];

const eventBox = document.getElementById("events");
const terminal = document.getElementById("terminal");

function time() {
  return new Date().toLocaleTimeString("ru-RU");
}

function renderEvents() {
  eventBox.innerHTML = "";

  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "event";

    const icon = document.createElement("div");
    icon.className = "event-icon " + (event.safe ? "safe" : "danger");
    icon.textContent = event.safe ? "✓" : "!";

    const info = document.createElement("div");

    const title = document.createElement("b");
    title.textContent = event.title;

    const source = document.createElement("small");
    source.textContent = event.source;

    info.appendChild(title);
    info.appendChild(source);

    const clock = document.createElement("time");
    clock.textContent = time();

    div.appendChild(icon);
    div.appendChild(info);
    div.appendChild(clock);

    eventBox.appendChild(div);
  });
}

function terminalLine(text) {
  const p = document.createElement("p");

  const tag = document.createElement("span");
  tag.textContent = "[SYSTEM] ";

  p.appendChild(tag);
  p.appendChild(document.createTextNode(text));

  terminal.appendChild(p);

  terminal.scrollTop = terminal.scrollHeight;
}

function updateCounters() {
  const blocked = document.getElementById("blocked");
  const requests = document.getElementById("requests");

  blocked.textContent =
    Number(blocked.textContent.replace(",", "")) +
    Math.floor(Math.random() * 2);

  requests.textContent =
    Number(requests.textContent.replace(",", "")) +
    Math.floor(Math.random() * 15) + 1;
}

renderEvents();

terminalLine("Security modules initialized.");
terminalLine("Web Shield online.");
terminalLine("Integrity Guard online.");
terminalLine("Monitoring authorized infrastructure.");
terminalLine("System ready.");

setInterval(() => {
  updateCounters();
}, 3000);

setInterval(() => {
  const threat = Math.floor(Math.random() * 18) + 5;

  document.getElementById("threat").textContent =
    threat + "%";

  document.getElementById("threatBar").style.width =
    threat + "%";
}, 5000);
