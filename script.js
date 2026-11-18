const VERSES = [
  { t: "Kommet her zu mir alle, die ihr mühselig und beladen seid; ich will euch erquicken.", r: "Matthäus 11,28", k: "Trost" },
  { t: "Fürchte dich nicht, ich bin mit dir; weiche nicht, denn ich bin dein Gott; ich stärke dich, ich helfe dir auch.", r: "Jesaja 41,10", k: "Trost" },
  { t: "Den Frieden lasse ich euch, meinen Frieden gebe ich euch. Nicht gebe ich euch, wie die Welt gibt. Euer Herz erschrecke nicht und fürchte sich nicht.", r: "Johannes 14,27", k: "Frieden" },
  { t: "Meine Seele ist stille zu Gott, der mir hilft.", r: "Psalm 62,2", k: "Stille" },
  { t: "Durch Stillesein und Hoffen würdet ihr stark sein.", r: "Jesaja 30,15", k: "Stille" },
  { t: "Und nach dem Feuer kam ein stilles, sanftes Sausen.", r: "1. Könige 19,12", k: "Stille" },
  { t: "Seid stille und erkennet, daß ich Gott bin!", r: "Psalm 46,11", k: "Stille" },
  { t: "Die Güte des HERRN ist's, daß wir nicht gar aus sind; seine Barmherzigkeit hat noch kein Ende, sondern sie ist alle Morgen neu, und deine Treue ist groß.", r: "Klagelieder 3,22–23", k: "Dank" },
  { t: "Sorget nichts! sondern in allen Dingen lasset eure Bitten im Gebet und Flehen mit Danksagung vor Gott kund werden.", r: "Philipper 4,6", k: "Gebet" },
  { t: "Und der Friede Gottes, welcher höher ist denn alle Vernunft, bewahre eure Herzen und Sinne in Christo Jesu.", r: "Philipper 4,7", k: "Frieden" },
  { t: "Von allen Seiten umgibst du mich und hältst deine Hand über mir.", r: "Psalm 139,5", k: "Trost" },
  { t: "Danket dem HERRN; denn er ist freundlich, und seine Güte währet ewiglich.", r: "Psalm 106,1", k: "Dank" },
  { t: "Bittet, so wird euch gegeben; suchet, so werdet ihr finden; klopfet an, so wird euch aufgetan.", r: "Matthäus 7,7", k: "Gebet" },
  { t: "Wenn aber du betest, so gehe in dein Kämmerlein und schließ die Tür zu und bete zu deinem Vater im Verborgenen.", r: "Matthäus 6,6", k: "Gebet" },
  { t: "Sei stille dem HERRN und warte auf ihn.", r: "Psalm 37,7", k: "Stille" },
  { t: "Ich hebe meine Augen auf zu den Bergen, von welchen mir Hilfe kommt. Meine Hilfe kommt vom HERRN, der Himmel und Erde gemacht hat.", r: "Psalm 121,1–2", k: "Trost" },
  { t: "Alle eure Sorge werfet auf ihn; denn er sorgt für euch.", r: "1. Petrus 5,7", k: "Trost" },
  { t: "Lobe den HERRN, meine Seele, und vergiß nicht, was er dir Gutes getan hat!", r: "Psalm 103,2", k: "Dank" },
  { t: "Ich bin das Licht der Welt; wer mir nachfolgt, der wird nicht wandeln in der Finsternis, sondern wird das Licht des Lebens haben.", r: "Johannes 8,12", k: "Glaube" },
  { t: "Es ist aber der Glaube eine gewisse Zuversicht des, das man hofft, und ein Nichtzweifeln an dem, das man nicht sieht.", r: "Hebräer 11,1", k: "Glaube" },
  { t: "Ich glaube, lieber Herr; hilf meinem Unglauben!", r: "Markus 9,24", k: "Glaube" },
  { t: "Nun aber bleibt Glaube, Hoffnung, Liebe, diese drei; aber die Liebe ist die größte unter ihnen.", r: "1. Korinther 13,13", k: "Glaube" },
  { t: "Wir wissen aber, daß denen, die Gott lieben, alle Dinge zum Besten dienen.", r: "Römer 8,28", k: "Trost" }
];

// Morgens den Morgensegen, abends den Abendsegen aufklappen
const hour = new Date().getHours();
document.getElementById(hour >= 4 && hour < 15 ? "morning" : "evening").open = true;

// Meine Anliegen: nur im Browser dieses Geräts gespeichert
const REQ_KEY = "stille-zeit-anliegen";
let reqs = [];
try { reqs = JSON.parse(localStorage.getItem(REQ_KEY)) || []; } catch (e) { reqs = []; }
function saveReqs() { try { localStorage.setItem(REQ_KEY, JSON.stringify(reqs)); } catch (e) {} }
function renderReqs() {
  const list = document.getElementById("reqList");
  list.innerHTML = "";
  document.getElementById("reqEmpty").hidden = reqs.length > 0;
  reqs.forEach((r, i) => {
    const li = document.createElement("li");
    if (r.done) li.className = "done";
    const txt = document.createElement("span"); txt.className = "txt"; txt.textContent = r.t;
    const d = document.createElement("span"); d.className = "date";
    d.textContent = new Date(r.d).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }) + (r.done ? " · erhört" : "");
    txt.appendChild(d);
    const mark = document.createElement("button"); mark.type = "button"; mark.className = "mark";
    mark.textContent = r.done ? "✓ Erhört" : "Erhört";
    mark.setAttribute("aria-pressed", String(!!r.done));
    mark.addEventListener("click", () => { reqs[i].done = !reqs[i].done; saveReqs(); renderReqs(); });
    const del = document.createElement("button"); del.type = "button"; del.className = "del";
    del.textContent = "Löschen"; del.setAttribute("aria-label", "Anliegen löschen");
    del.addEventListener("click", () => { reqs.splice(i, 1); saveReqs(); renderReqs(); });
    li.append(txt, mark, del); list.appendChild(li);
  });
}
document.getElementById("reqForm").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("reqInput");
  const t = input.value.trim();
  if (!t) return;
  reqs.unshift({ t, d: Date.now(), done: false });
  input.value = ""; saveReqs(); renderReqs();
});
renderReqs();

// Wort für heute: nach Datum gewählt, damit es den ganzen Tag gleich bleibt
const now = new Date();
document.getElementById("today").textContent = now.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
let dailyIdx = Math.floor(now.getTime() / 86400000 + 0) % VERSES.length;
function showDaily() {
  document.getElementById("dailyText").textContent = "„" + VERSES[dailyIdx].t + "“";
  document.getElementById("dailyRef").textContent = VERSES[dailyIdx].r;
}
document.getElementById("nextVerse").addEventListener("click", () => { dailyIdx = (dailyIdx + 1) % VERSES.length; showDaily(); });
showDaily();

// Bibeltexte mit Themenfilter
const topics = ["Alle", ...new Set(VERSES.map(v => v.k))];
let topic = "Alle";
const tagsEl = document.getElementById("tags");
function renderVerses() {
  tagsEl.innerHTML = "";
  topics.forEach(k => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = k; b.setAttribute("aria-pressed", String(k === topic));
    b.addEventListener("click", () => { topic = k; renderVerses(); });
    tagsEl.appendChild(b);
  });
  const list = document.getElementById("verseList");
  list.innerHTML = "";
  VERSES.filter(v => topic === "Alle" || v.k === topic).forEach(v => {
    const q = document.createElement("blockquote");
    const p = document.createElement("p"); p.textContent = v.t;
    const c = document.createElement("cite"); c.textContent = v.r + " · " + v.k;
    q.append(p, c); list.appendChild(q);
  });
}
renderVerses();

// Stille-Timer
let minutes = 3, remaining = 180, timer = null, audio = null, wakeLock = null;
const timeEl = document.getElementById("time"), hintEl = document.getElementById("hint");
const breathEl = document.getElementById("breath"), startBtn = document.getElementById("startBtn");
const fmt = s => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");

function bell() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    [528, 792].forEach((f, i) => {
      const o = audio.createOscillator(), g = audio.createGain();
      o.frequency.value = f; o.type = "sine";
      g.gain.setValueAtTime(0.0001, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(i ? 0.05 : 0.15, audio.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 4);
      o.connect(g).connect(audio.destination); o.start(); o.stop(audio.currentTime + 4.2);
    });
  } catch (e) {}
}
function stop(done) {
  clearInterval(timer); timer = null;
  breathEl.classList.remove("running");
  startBtn.textContent = "Stille beginnen";
  if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; }
  if (done) { bell(); hintEl.textContent = "Amen"; remaining = minutes * 60; timeEl.textContent = fmt(remaining); }
  else { remaining = minutes * 60; timeEl.textContent = fmt(remaining); hintEl.textContent = "bereit"; }
}
startBtn.addEventListener("click", async () => {
  if (timer) { stop(false); return; }
  remaining = minutes * 60; timeEl.textContent = fmt(remaining);
  bell(); breathEl.classList.add("running"); hintEl.textContent = "einatmen · ausatmen";
  startBtn.textContent = "Beenden";
  try { wakeLock = await navigator.wakeLock?.request("screen"); } catch (e) {}
  const end = Date.now() + remaining * 1000;
  timer = setInterval(() => {
    remaining = Math.max(0, Math.round((end - Date.now()) / 1000));
    timeEl.textContent = fmt(remaining);
    if (remaining === 0) stop(true);
  }, 250);
});
document.querySelectorAll(".durations button").forEach(b => b.addEventListener("click", () => {
  if (timer) return;
  minutes = Number(b.dataset.min);
  document.querySelectorAll(".durations button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  remaining = minutes * 60; timeEl.textContent = fmt(remaining); hintEl.textContent = "bereit";
}));
