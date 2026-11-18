const $ = (id) => document.getElementById(id);
const C = {
  sky: "#4A90F0", skyDeep: "#3D7FE6", night: "#0E1A44", navy: "#23306B", paper: "#FFF7EA", cloud: "#DCEBFF", white: "#FFFFFF",
  slate: "#3D4A7A", star: "#B9D3FF", tomato: "#FF5A4E", saffron: "#FFB020", pink: "#FF8AD0", butter: "#FFE45C", lilac: "#B8A6FF", plum: "#6A2C70",
};
const COUNTRIES = ["ID", "IN", "CN", "US", "JP", "OT"];
const TEAMS = ["ID", "IN", "CN", "US", "JP"];
const CODE = { ID: "IDN", IN: "IND", CN: "CHN", US: "USA", JP: "JPN", OT: "OTH" };
const TEAM = { ID: C.tomato, IN: C.saffron, CN: C.pink, US: C.lilac, JP: C.butter, OT: C.cloud };
const TEAM_BAR = { ...TEAM, US: "#8F78F0", JP: "#E8C400", OT: "#9DB6E0" };
const TEAM_CLS = { ID: "bg-tomato", IN: "bg-saffron", CN: "bg-pink", US: "bg-lilac", JP: "bg-butter", OT: "bg-cloud" };
const STATUS = [0, 0.5, 0, 1, 2, 3, 4, 5];
const SLEEP_N = 5;
const PHRASE_N = 4;
const MIN_GROUP = 30;
const PCT_METRICS = ["revisions", "pages", "coffee", "sleep", "pace"];
const PERSONAS = ["finisher", "hill_climber", "lost_runner", "water_station", "caffeine_pacer", "night_runner", "sprinter", "steady_jogger"];
const URL_APP = "thesirun.embarko.app";
const BRAND = "Marathon by ThesiRun";
const TAG = "#ThesisMarathon";
const QR = "1fde0c7f,10441f41,1745be5d,1758755d,1753dc5d,105eea41,1fd5557f,164c00,1172fff9,f8c0c7f,845e491,dacba6b,5c38ba2,1880d4ff,ff919cd,11224d83,feff982,179800fb,5f7e965,acb973,1f648bf9,18d311,1fda1b5d,10494b13,1750f7fb,174a8e82,1745e78f,104f312b,1fdf8372".split(",").map((r) => parseInt(r, 16));
const TERMS = {
  ID: { thesis: "Skripsi", guide: "Dospem", defense: "Sidang", ch: "Bab", acc: "ACC" },
  IN: { thesis: "Final Year Project", guide: "Guide", defense: "Viva", ch: "Chapter", acc: "Approved" },
  CN: { thesis: "Bishe", guide: "Daoshi", defense: "Dabian", ch: "Chapter", acc: "Approved" },
  US: { thesis: "Senior Thesis", guide: "Advisor", defense: "Defense", ch: "Chapter", acc: "Sign-off" },
  JP: { thesis: "Sotsuron", guide: "Sensei", defense: "Happyokai", ch: "Chapter", acc: "OK" },
  OT: { thesis: "Thesis", guide: "Supervisor", defense: "Defense", ch: "Chapter", acc: "Approved" },
};
const LANDMARK = { CN: ["Canton Tower", 600], US: ["Empire State Building", 381], JP: ["Tokyo Tower", 333], OT: ["Eiffel Tower", 330] };

const I18N = {
  id: {
    nav_arena: "Arena", nav_compare: "Bandingkan", nav_run: "Isi lari",
    hero_title: "Skripsimu, versi lari.", hero_sub: "Halaman jadi jarak, revisi jadi tanjakan. Isi satu menit, dapat recap dan kartu buat dipamerkan.",
    start: "Mulai lari", sample_btn: "Coba contoh run", alumni: "Sudah lulus? Kenang lari skripsimu.",
    live_kicker: "Live · 5 negara", live_title: "Papan skor", see_arena: "Buka Arena", runners: "runner",
    cold_title: "Jadilah 100 runner pertama", cold_body: "Persentil terbuka setelah 30 runner per negara. Tanpa data palsu.",
    yesterday: "Kemarin", win: "menang", yesterday_champ: "Juara kemarin",
    cat_pages: "halaman", cat_revisions: "revisi", cat_night: "begadang", cat_waiting: "nunggu balasan", cat_runners: "runner", cat_pace: "pace",
    m_n: "Runner", m_pages: "Total halaman", m_avg_revisions: "Rata-rata revisi", m_avg_sleep: "Jam tidur", m_avg_reply: "Tunggu dospem", m_avg_pace: "Hari per bab",
    cmp_kicker: "Baru", cmp_title: "Bandingkan siapa pun", cmp_sub: "Negara vs negara, kampus vs kampus. Kamu yang pilih.",
    how_title: "Cara kerjanya", how_1: "Isi data skripsi", how_1s: "Slider dan chip, sekitar 60 detik.", how_2: "Tonton recap 10 slide", how_2s: "Hari, jarak, tanjakan revisi, persona.", how_3: "Bagikan kartu, ajak pacer", how_3s: "Kartu 9:16 dan duel dengan teman.",
    form_kicker: "Pemanasan · 60 detik", form_title: "Siapkan larimu", form_sub: "Nama, lagu, dan kalimatmu tidak pernah keluar dari perangkat ini.",
    g_profile: "Profil runner", g_progress: "Posisi lari", g_numbers: "Angka larimu", g_personal: "Sentuhan pribadi · tidak dikirim",
    f_name: "Nama panggilan", local_only: "· tetap di HP-mu", f_country: "Tim", f_campus: "Kampus (opsional)", f_degree: "Jenjang",
    c_ID: "Indonesia", c_IN: "India", c_CN: "Tiongkok", c_US: "Amerika Serikat", c_JP: "Jepang", c_OT: "Lainnya",
    deg_S1: "S1", deg_DIP: "D3/D4", deg_S2: "S2", deg_ALUM: "Alumni",
    f_status: "Posisi {thesis_l}-mu sekarang", st_0: "Cari judul", st_1: "Proposal", st_2: "{ch} 1", st_3: "{ch} 2", st_4: "{ch} 3", st_5: "{ch} 4", st_6: "{ch} 5", st_7: "Sudah {defense}",
    f_start: "Mulai {thesis_l}", r_pages: "Jarak · halaman", r_revisions: "Tanjakan · revisi", r_title_changes: "Ganti judul", r_approvals: "{acc} dari {guide}",
    r_reply_days: "Balasan {guide} rata-rata (hari)", r_coffee: "Kopi/teh per minggu",
    f_sleep: "Biasa tidur jam", sl_0: "< 22.00", sl_1: "00.00", sl_2: "02.00", sl_3: "04.00", sl_4: "Tidak tidur",
    f_song: "Lagu teman nugas (opsional)", f_phrase: "Kalimat andalan ke {guide}",
    ph_0: "Mohon maaf mengganggu waktunya", ph_1: "Izin bertanya, Pak/Bu", ph_2: "Sudah saya revisi sesuai arahan", ph_3: "Kapan bisa bimbingan lagi?",
    phrase_custom: "Atau tulis sendiri", f_share: "Ikut statistik global (anonim)",
    privacy: "Yang dikirim hanya angka, negara, jenjang, dan kampus. Nama, lagu, kalimat, dan IP tidak disimpan.",
    go: "Lihat lari skripsiku", sending: "Menghitung…", pick_month: "Pilih bulan", this_month: "Bulan ini", prev_year: "Tahun sebelumnya", next_year: "Tahun berikutnya", err_required: "Pilih tim, jenjang, posisi, dan bulan mulai dulu ya.",
    card_title: "Kartu lari-mu", share: "Bagikan / Download", replay: "Putar ulang story",
    duo_title: "Kartu duo pacer", pacer_kicker: "Cari pacer", pacer_title: "Tantang teman", pacer_body: "Kirim link ke teman. Mereka isi, kalian dapat skor duel dan kecocokan.",
    pacer_btn: "Bagikan link pacer", pacer_text: "Duel skripsi denganku di ThesiRun!", copied: "Link disalin",
    pacer_invite: "{name} ngajak kamu duel jadi pacer! Isi larimu di bawah untuk lihat skor kecocokan.", see_board: "Buka Arena",
    board_sub: "Penderitaan bersama, lima negara. Siapa paling kuat?",
    s1: "Siap lihat lari {thesis_l}-mu, {name}?", tap: "Ketuk kanan untuk lanjut",
    s2k: "Kamu sudah lari", s2u: "hari", s2s: "Lebih lama dari masa promo paket data mana pun.",
    s3k: "Jarak tempuh", s3u: "halaman",
    s4k: "Tanjakan revisi", s4s: "{rev} kali revisi. Setinggi {cmp}.",
    s5k: "Pos minum terlama", days_up: "HARI", s5s: "rata-rata menunggu balasan {guide}. Total sekitar {wait} hari di pos minum.",
    s6k: "Bahan bakar", s6u: "gelas/minggu", s6s: "Lari malam sampai jam {time}.",
    s7k: "Dibanding runner lain",
    pct_revisions: "Revisimu lebih banyak dari {p}% dari {n} runner ThesiRun.", pct_pages: "Halamanmu lebih banyak dari {p}% dari {n} runner ThesiRun.",
    pct_coffee: "Kopimu lebih banyak dari {p}% dari {n} runner ThesiRun.", pct_sleep: "Kamu tidur lebih larut dari {p}% dari {n} runner ThesiRun.",
    pct_pace: "Pace-mu lebih santai dari {p}% dari {n} runner ThesiRun.", pct_team: "Di tim {team}: {p}% dari {n} runner.",
    first30: "Kamu salah satu dari 30 runner pertama! Statistik terbuka setelah 30 runner.",
    s8k: "Kamu menyumbang", s8u: "halaman", s8s: "untuk {team}.", s8_league: "Liga 5 negara · total halaman", s8_wait: "Liga dimulai begitu tim-tim punya runner.",
    s9k: "Kamu adalah…", s10: "{ch} {next} menunggumu.", s10s: "Kamu lebih dekat ke finish dari yang kamu kira.",
    s10f: "{days} hari, {pages} halaman, {rev} revisi. Selamat, kamu sudah finish!", see_card: "Lihat kartuku",
    p_finisher: "Finisher", p_hill_climber: "Pendaki Revisi", p_lost_runner: "Si Nyasar Rute", p_water_station: "Penunggu Pos Minum",
    p_caffeine_pacer: "Caffeine Pacer", p_night_runner: "Night Runner", p_sprinter: "Sprinter", p_steady_jogger: "Steady Jogger",
    pm_revisions: "Revisi", pm_pages: "Halaman", pm_coffee: "Kopi", pm_sleep: "Jam tidur", pm_pace: "Hari/bab", card_pct: "{m} lebih dari {p}% · dari {n} runner",
    here: "kamu di sini", duo_hi: "Pace kembar! Nugas bareng wajib.", duo_mid: "Cocok jadi partner nugas.", duo_lo: "Beda pace, tapi bisa saling narik.",
    match: "COCOK", intl: "International Pacers", sample_name: "Sample Runner", sample_song: "Lo-fi buat revisi",
    arena_kicker: "Thesis Run 2026", tab_country: "Negara", tab_campus: "Kampus", tab_compare: "Duel", tab_personal: "Teman",
    league_country: "Liga 5 negara", league_campus: "Liga kampus", league_note: "Negara tampil begitu punya runner. Angka dari data asli, tanpa seed.",
    cta_team: "Tambah poin buat {team}", cta_any: "Tambah poin buat timmu", yours: "timmu", your_campus: "kampusmu",
    no_data: "belum ada runner", all: "Semua",
    campus_note: "Hanya kampus dengan minimal 10 runner.", no_campus: "Belum ada kampus dengan 10 runner. Ajak teman sekampusmu!", invite_campus: "Ajak teman sekampus",
    side_a: "Sisi kiri", side_b: "Sisi kanan", swap: "Tukar posisi", popular: "Duel populer", mode_country: "Negara", mode_campus: "Kampus",
    cmp_share: "Bagikan duel {a} vs {b}", cmp_note_country: "Nilai dari data asli. Bar menunjukkan porsi masing-masing.", cmp_note_campus: "Hanya kampus dengan minimal 10 runner, boleh beda negara.",
    cmp_empty: "Belum ada 2 kampus dengan 10 runner. Coba mode Negara dulu.", score: "Skor",
    duel_title: "Duel antar teman", duel_body: "Kirim link pacer. Temanmu isi larinya, kalian dapat skor duel 5 kategori dan kecocokan.",
    duel_btn: "Bagikan link pacer", duel_start: "Isi larimu dulu", duel_history: "Riwayat duel", duel_empty: "Belum ada duel. Tantang satu teman dulu!",
    duel_privacy: "Duel hanya lewat link yang kamu bagikan sendiri. Nama teman tersimpan di HP ini saja, tidak ada papan peringkat orang asing.",
    unit_days: "hari", unit_dch: "h/bab",
  },
  en: {
    nav_arena: "Arena", nav_compare: "Compare", nav_run: "Log run",
    hero_title: "Your thesis, as a run.", hero_sub: "Pages become distance, revisions become hills. One minute in, you get a recap and a card to show off.",
    start: "Start your run", sample_btn: "Try a sample run", alumni: "Already graduated? Relive your thesis run.",
    live_kicker: "Live · 5 nations", live_title: "Scoreboard", see_arena: "Open Arena", runners: "runners",
    cold_title: "Be one of the first 100 runners", cold_body: "Percentiles unlock at 30 runners per country. No fake data.",
    yesterday: "Yesterday", win: "won", yesterday_champ: "Yesterday's champions",
    cat_pages: "pages", cat_revisions: "revisions", cat_night: "late nights", cat_waiting: "waiting for replies", cat_runners: "runners", cat_pace: "pace",
    m_n: "Runners", m_pages: "Total pages", m_avg_revisions: "Avg revisions", m_avg_sleep: "Bedtime", m_avg_reply: "Supervisor wait", m_avg_pace: "Days per chapter",
    cmp_kicker: "New", cmp_title: "Compare anyone", cmp_sub: "Nation vs nation, campus vs campus. You pick.",
    how_title: "How it works", how_1: "Log your thesis", how_1s: "Sliders and chips, about 60 seconds.", how_2: "Watch a 10-slide recap", how_2s: "Days, distance, revision hills, persona.", how_3: "Share the card, find a pacer", how_3s: "A 9:16 card and a duel with friends.",
    form_kicker: "Warm-up · 60 seconds", form_title: "Get ready to run", form_sub: "Your name, song, and phrase never leave this device.",
    g_profile: "Runner profile", g_progress: "Where you are", g_numbers: "Your numbers", g_personal: "Personal touch · never sent",
    f_name: "Nickname", local_only: "· stays on your phone", f_country: "Team", f_campus: "Campus (optional)", f_degree: "Degree",
    c_ID: "Indonesia", c_IN: "India", c_CN: "China", c_US: "United States", c_JP: "Japan", c_OT: "Other",
    deg_S1: "Bachelor", deg_DIP: "Diploma", deg_S2: "Master", deg_ALUM: "Alumni",
    f_status: "Where's your {thesis} now", st_0: "Finding a topic", st_1: "Proposal", st_2: "{ch} 1", st_3: "{ch} 2", st_4: "{ch} 3", st_5: "{ch} 4", st_6: "{ch} 5", st_7: "{defense} done",
    f_start: "{thesis} started", r_pages: "Distance · pages", r_revisions: "Hills · revisions", r_title_changes: "Title changes", r_approvals: "{acc} by your {guide}",
    r_reply_days: "Avg {guide} reply time (days)", r_coffee: "Coffee/tea per week",
    f_sleep: "Usual bedtime", sl_0: "< 10 PM", sl_1: "12 AM", sl_2: "2 AM", sl_3: "4 AM", sl_4: "No sleep",
    f_song: "Study song (optional)", f_phrase: "Go-to line for your {guide}",
    ph_0: "Sorry to bother you", ph_1: "Just following up on my draft", ph_2: "Revised as per your feedback", ph_3: "When can we meet again?",
    phrase_custom: "Or write your own", f_share: "Join global stats (anonymous)",
    privacy: "Only numbers, country, degree, and campus are sent. Name, song, phrase, and IP are never stored.",
    go: "Show my thesis run", sending: "Crunching…", pick_month: "Pick a month", this_month: "This month", prev_year: "Previous year", next_year: "Next year", err_required: "Pick your team, degree, stage, and start month first.",
    card_title: "Your run card", share: "Share / Download", replay: "Replay story",
    duo_title: "Pacer duo card", pacer_kicker: "Find a pacer", pacer_title: "Challenge a friend", pacer_body: "Send a link to a friend. They fill it in, you both get a duel score and a match score.",
    pacer_btn: "Share pacer link", pacer_text: "Duel my thesis run on ThesiRun!", copied: "Link copied",
    pacer_invite: "{name} challenged you to a pacer duel! Log your run below to see your match score.", see_board: "Open Arena",
    board_sub: "Shared suffering, five nations. Who's toughest?",
    s1: "Ready to see your {thesis_l} run, {name}?", tap: "Tap right to continue",
    s2k: "You've been running for", s2u: "days", s2s: "Longer than any free trial.",
    s3k: "Distance", s3u: "pages",
    s4k: "Revision hills", s4s: "{rev} revisions. As high as {cmp}.",
    s5k: "Longest water station", days_up: "DAYS", s5s: "average wait for your {guide}'s reply. About {wait} days at the water station in total.",
    s6k: "Fuel", s6u: "cups/week", s6s: "Night runs until {time}.",
    s7k: "Against other runners",
    pct_revisions: "You revised more than {p}% of {n} ThesiRun runners.", pct_pages: "You wrote more pages than {p}% of {n} ThesiRun runners.",
    pct_coffee: "You drink more coffee than {p}% of {n} ThesiRun runners.", pct_sleep: "You sleep later than {p}% of {n} ThesiRun runners.",
    pct_pace: "Your pace is more relaxed than {p}% of {n} ThesiRun runners.", pct_team: "In team {team}: {p}% of {n} runners.",
    first30: "You're one of the first 30 runners! Stats unlock after 30 runners.",
    s8k: "You just added", s8u: "pages", s8s: "for {team}.", s8_league: "Five-nation league · total pages", s8_wait: "The league starts once teams have runners.",
    s9k: "You are…", s10: "{ch} {next} is waiting.", s10s: "You're closer to the finish than you think.",
    s10f: "{days} days, {pages} pages, {rev} revisions. Congrats, you finished!", see_card: "See my card",
    p_finisher: "Finisher", p_hill_climber: "Hill Climber", p_lost_runner: "Lost Runner", p_water_station: "Water Station Waiter",
    p_caffeine_pacer: "Caffeine Pacer", p_night_runner: "Night Runner", p_sprinter: "Sprinter", p_steady_jogger: "Steady Jogger",
    pm_revisions: "Revisions", pm_pages: "Pages", pm_coffee: "Coffee", pm_sleep: "Bedtime", pm_pace: "Days/chapter", card_pct: "{m} above {p}% · of {n} runners",
    here: "you are here", duo_hi: "Twin pace! Study together, now.", duo_mid: "Great study partners.", duo_lo: "Different pace, you'll pull each other along.",
    match: "MATCH", intl: "International Pacers", sample_name: "Sample Runner", sample_song: "Lo-fi beats to revise to",
    arena_kicker: "Thesis Run 2026", tab_country: "Nations", tab_campus: "Campus", tab_compare: "Duel", tab_personal: "Friends",
    league_country: "Five-nation league", league_campus: "Campus league", league_note: "A nation appears once it has runners. Real data only, no seeds.",
    cta_team: "Add points for {team}", cta_any: "Add points for your team", yours: "your team", your_campus: "your campus",
    no_data: "no runners yet", all: "All",
    campus_note: "Only campuses with at least 10 runners.", no_campus: "No campus has 10 runners yet. Bring your classmates!", invite_campus: "Invite classmates",
    side_a: "Left side", side_b: "Right side", swap: "Swap sides", popular: "Popular duels", mode_country: "Nations", mode_campus: "Campus",
    cmp_share: "Share {a} vs {b}", cmp_note_country: "Values from real data. Bars show each side's share.", cmp_note_campus: "Only campuses with at least 10 runners, any country.",
    cmp_empty: "There aren't 2 campuses with 10 runners yet. Try Nations mode first.", score: "Score",
    duel_title: "Duel with friends", duel_body: "Send a pacer link. Your friend logs their run, you both get a 5-category duel score and a match score.",
    duel_btn: "Share pacer link", duel_start: "Log your run first", duel_history: "Duel history", duel_empty: "No duels yet. Challenge a friend first!",
    duel_privacy: "Duels only happen through links you share yourself. Friends' names stay on this device, and there's no ranking of strangers.",
    unit_days: "days", unit_dch: "d/ch",
  },
};

const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  json: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
};

const relabels = [];
let lang = store.get("lang") || ((navigator.language || "").toLowerCase().startsWith("id") ? "id" : "en");
let tc = null;
let stats;
let run = null;
let slides = [];
let idx = 0;
let pacer = null;
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = (n) => Number(n).toLocaleString(lang === "id" ? "id-ID" : "en-US");

function h(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function terms() {
  const tm = TERMS[tc || (lang === "id" ? "ID" : "OT")];
  return { ...tm, thesis_l: tm.thesis.toLowerCase() };
}

function t(key, vars = {}) {
  const s = I18N[lang][key] ?? I18N.en[key] ?? key;
  const all = { ...terms(), ...vars };
  return s.replace(/\{(\w+)\}/g, (m, k) => (Object.hasOwn(all, k) ? all[k] : m));
}

const countryName = (c) => t("c_" + c);

function applyI18n() {
  document.documentElement.lang = lang;
  for (const e of document.querySelectorAll("[data-i18n]")) e.textContent = t(e.dataset.i18n);
  for (const e of document.querySelectorAll("[data-i18n-ph]")) e.placeholder = t(e.dataset.i18nPh);
  for (const e of document.querySelectorAll("[data-i18n-aria]")) e.setAttribute("aria-label", t(e.dataset.i18nAria));
  if ($("lang")) $("lang").textContent = lang === "id" ? "EN" : "ID";
  relabels.forEach((f) => f());
}

function countUp(el, to) {
  if (reduced()) return (el.textContent = fmt(to));
  const t0 = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - t0) / 900);
    el.textContent = fmt(Math.round(to * (1 - (1 - p) ** 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function count(n) {
  const s = h("span", "tabular-nums", "0");
  s.dataset.count = n;
  return s;
}

const POSES = {
  run: { box: [120, 140], parts: [
    ["l", "M58 78 L40 100 L22 96", "pants", 16], ["e", 17, 97, 10, 6, "shoe"], ["r", 36, 54, 28, 19, 3, "prop", -20, 50, 63],
    ["l", "M62 44 L46 58 L54 70", "skin", 9], ["l", "M60 78 L76 102 L72 126", "pants", 16], ["e", 80, 129, 11, 6, "shoe"],
    ["l", "M64 40 L58 78", "shirt", 28], ["l", "M64 46 L82 58 L94 48", "skin", 9], ["c", 70, 22, 13, "skin"],
    ["f", "M81 19 L93 25 L80 28 Z", "skin"], ["f", "M57 22 C57 8 80 6 83 16 L68 15 C66 20 62 22 57 22 Z", "hair"],
    ["l", "M58 17 C46 12 42 26 30 19", "hair", 6], ["l", "M75 21 q3 2 6 0", "eye", 1.8],
  ] },
  lunge: { box: [130, 135], parts: [
    ["l", "M58 84 L34 100 L12 114", "pants", 16], ["e", 8, 116, 10, 6, "shoe"], ["l", "M62 84 L86 92 L88 124", "pants", 16],
    ["e", 94, 127, 11, 6, "shoe"], ["l", "M68 48 L60 86", "shirt", 28], ["l", "M68 52 L92 50 L112 42", "skin", 9],
    ["c", 64, 14, 7, "hair"], ["c", 74, 30, 13, "skin"], ["f", "M85 27 L97 33 L84 36 Z", "skin"],
    ["f", "M61 30 C60 16 84 12 87 24 L72 22 C70 26 66 28 61 30 Z", "hair"], ["l", "M79 29 q3 2 6 0", "eye", 1.8],
    ["r", 104, 22, 20, 26, 2, "paper", 10, 114, 35], ["l", "M108 30 h10 M108 36 h10", "accent2", 2],
  ] },
  sit: { box: [130, 105], parts: [
    ["l", "M40 92 L74 100 L104 94", "pants", 16], ["e", 110, 94, 10, 6, "shoe"], ["l", "M58 54 L60 90", "shirt", 28],
    ["r", 76, 62, 40, 26, 3, "prop"], ["r", 70, 88, 52, 5, 2.5, "ink"], ["l", "M60 60 L78 76 L90 82", "skin", 9],
    ["r", 18, 80, 14, 16, 3, "cup"], ["l", "M22 74 q-3 -5 0 -9 M28 74 q-3 -5 0 -9", "steam", 2],
    ["c", 62, 36, 13, "skin"], ["f", "M73 33 L85 39 L72 42 Z", "skin"],
    ["f", "M49 38 C46 18 76 16 76 28 L62 26 C58 34 54 44 49 50 Z", "hair"], ["l", "M67 35 q3 2 6 0", "eye", 1.8],
  ] },
  jump: { box: [120, 138], parts: [
    ["l", "M60 82 L42 108 L32 128", "pants", 15], ["l", "M60 82 L78 108 L88 128", "pants", 15],
    ["e", 28, 130, 10, 6, "shoe"], ["e", 92, 130, 10, 6, "shoe"], ["l", "M60 48 L60 82", "shirt", 28],
    ["l", "M58 52 L38 36 L30 14", "skin", 9], ["l", "M62 52 L82 36 L90 14", "skin", 9], ["c", 60, 28, 13, "skin"],
    ["f", "M71 25 L83 31 L70 34 Z", "skin"], ["f", "M42 17 L60 9 L78 17 L60 25 Z", "cap"], ["l", "M76 17 L80 31", "accent", 2.5],
    ["l", "M64 28 q3 2 6 0", "eye", 1.8],
  ] },
};
const BASE_PAL = { ink: C.night, eye: C.night, cup: C.saffron, steam: C.white, cap: C.night, accent: C.butter, paper: C.white, accent2: C.tomato };
const PALS = [
  { skin: "#A86B47", shirt: C.tomato, pants: C.navy, hair: "#1B1B2F", shoe: C.white, prop: C.lilac },
  { skin: "#F7C6B0", shirt: C.pink, pants: C.plum, hair: "#C96A2B", shoe: C.night, prop: C.white },
  { skin: "#6E4329", shirt: C.butter, pants: C.navy, hair: "#1B1B2F", shoe: C.white, prop: C.white, eye: C.paper },
  { skin: "#E3A07A", shirt: C.lilac, pants: "#1B1B2F", hair: "#3A2418", shoe: C.tomato, prop: C.white },
  { skin: "#F7C6B0", shirt: C.saffron, pants: C.navy, hair: "#3A2418", shoe: C.white, prop: C.butter },
  { skin: "#A86B47", shirt: C.white, pants: C.navy, hair: "#1B1B2F", shoe: C.white, prop: C.lilac, cap: C.night },
];
const PERSONA_ART = {
  finisher: ["jump", 2], hill_climber: ["lunge", 1], lost_runner: ["run", 3], water_station: ["sit", 0],
  caffeine_pacer: ["sit", 3], night_runner: ["run", 2], sprinter: ["run", 0], steady_jogger: ["run", 4],
};
const pal = (i, over) => ({ ...BASE_PAL, ...PALS[i % PALS.length], ...over });

const NS = "http://www.w3.org/2000/svg";
const ICONS = {
  play: "M6 3 20 12 6 21Z",
  swap: "M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4",
  x: "M18 6 6 18M6 6l12 12",
  up: "m18 15-6-6-6 6",
  down: "m6 9 6 6 6-6",
  arrow: "M5 12h14M12 5l7 7-7 7",
  plus: "M5 12h14M12 5v14",
  minus: "M5 12h14",
  share: "M15 5a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0M15 19a3 3 0 1 0 6 0a3 3 0 1 0-6 0M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98",
  replay: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z",
  globe: "M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20",
  campus: "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  check: "M20 6 9 17l-5-5",
  music: "M9 18V5l12-2v13M3 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0M15 16a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  code: "m16 18 6-6-6-6M8 6l-6 6 6 6",
  prev: "m15 18-6-6 6-6",
  next: "m9 18 6-6-6-6",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
};

function icon(name, cls = "size-5") {
  return sv("svg", { viewBox: "0 0 24 24", class: "shrink-0 " + cls, "aria-hidden": "true", fill: name === "play" ? "currentColor" : "none", stroke: "currentColor", "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }, [sv("path", { d: ICONS[name] })]);
}

function drawIcon(x, name, X, Y, size, color) {
  x.save();
  x.translate(X, Y);
  x.scale(size / 24, size / 24);
  x.strokeStyle = color;
  x.lineWidth = 2.4;
  x.lineCap = x.lineJoin = "round";
  x.stroke(new Path2D(ICONS[name]));
  x.restore();
}

function busy(btn, on) {
  btn.setAttribute("aria-busy", String(on));
  btn.disabled = on;
}

const stagger = (el, i) => (el.style.setProperty("--i", i), el);

const revealer = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), revealer.unobserve(e.target))), { rootMargin: "0px 0px -8% 0px" }) : null;
let openSel = null;
function closeSelect(focus) {
  if (!openSel) return;
  openSel.menu.hidden = true;
  openSel.btn.setAttribute("aria-expanded", "false");
  if (focus) openSel.btn.focus();
  openSel = null;
}
document.addEventListener("pointerdown", (e) => openSel && !openSel.btn.parentNode.contains(e.target) && closeSelect());

function enhanceSelect(sel) {
  const wrap = h("div", `relative ${sel.className}`), btn = h("button", "select-btn"), value = h("span", "truncate"), menu = h("ul", "select-menu");
  const lbl = sel.labels?.[0];
  value.id = `${sel.id}-value`;
  menu.id = `${sel.id}-list`;
  menu.hidden = true;
  menu.tabIndex = -1;
  menu.setAttribute("role", "listbox");
  btn.type = "button";
  btn.setAttribute("aria-haspopup", "listbox");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", menu.id);
  if (lbl) {
    lbl.id ||= `${sel.id}-label`;
    btn.setAttribute("aria-labelledby", `${lbl.id} ${value.id}`);
    menu.setAttribute("aria-labelledby", lbl.id);
  }
  btn.append(value, icon("down", "size-4 shrink-0"));
  sel.hidden = true;
  sel.after(wrap);
  wrap.append(sel, btn, menu);
  let act = 0;
  const move = (i, scroll = true) => {
    const items = [...menu.children];
    if (!items.length) return;
    act = Math.max(0, Math.min(items.length - 1, i));
    items.forEach((li, j) => li.classList.toggle("is-active", j === act));
    menu.setAttribute("aria-activedescendant", items[act].id);
    if (scroll) items[act].scrollIntoView({ block: "nearest" });
  };
  const pick = (v) => {
    closeSelect(true);
    if (v === sel.value) return;
    sel.value = v;
    sel.dispatchEvent(new Event("change", { bubbles: true }));
    sync();
  };
  const sync = () => {
    value.textContent = sel.selectedOptions[0]?.textContent ?? "–";
    btn.disabled = sel.disabled;
    menu.replaceChildren(...[...sel.options].map((o, i) => {
      const li = h("li", "select-opt");
      li.id = `${sel.id}-o${i}`;
      li.dataset.value = o.value;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(o.selected));
      li.append(h("span", "min-w-0 flex-1", o.textContent), icon("check", "size-4 shrink-0"));
      li.addEventListener("click", () => pick(o.value));
      return li;
    }));
    if (openSel?.menu === menu) sel.disabled ? closeSelect() : move(act, false);
  };
  const open = () => {
    closeSelect();
    openSel = { btn, menu };
    menu.hidden = false;
    menu.classList.toggle("end", wrap.getBoundingClientRect().left + menu.offsetWidth > document.documentElement.clientWidth - 8);
    btn.setAttribute("aria-expanded", "true");
    move(sel.selectedIndex);
    menu.focus({ preventScroll: true });
  };
  btn.addEventListener("click", () => (openSel?.menu === menu ? closeSelect(true) : open()));
  btn.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    open();
  });
  menu.addEventListener("pointermove", (e) => {
    const li = e.target.closest("li");
    if (li) move([...menu.children].indexOf(li), false);
  });
  menu.addEventListener("keydown", (e) => {
    const k = e.key, n = menu.children.length;
    if (k === "Tab") return closeSelect();
    if (k === "ArrowDown") move(act + 1);
    else if (k === "ArrowUp") move(act - 1);
    else if (k === "Home" || k === "PageUp") move(0);
    else if (k === "End" || k === "PageDown") move(n - 1);
    else if ((k === "Enter" || k === " ") && n) pick(menu.children[act].dataset.value);
    else if (k === "Escape") closeSelect(true);
    else return;
    e.preventDefault();
    e.stopPropagation();
  });
  new MutationObserver(sync).observe(sel, { childList: true, attributes: true, attributeFilter: ["disabled"] });
  sync();
}

function enhanceMonth(inp) {
  const wrap = h("div", "relative"), btn = h("button", "field month-btn"), value = h("span", "truncate"), menu = h("div", "month-menu");
  const head = h("div", "mb-2 flex items-center justify-between gap-2"), year = h("b", "font-display text-xl font-extrabold tracking-tight"), grid = h("div", "grid grid-cols-3 gap-1.5"), foot = h("button", "mt-2 h-11 w-full cursor-pointer rounded-full text-sm font-extrabold text-sky transition hover:bg-cloud focus-visible:ring-4 focus-visible:ring-sky focus-visible:outline-none");
  const nav = (d, name, key) => {
    const b = h("button", "round size-11");
    b.type = "button";
    b.dataset.i18nAria = key;
    b.append(icon(name, "size-5"));
    b.addEventListener("click", () => draw(view + d));
    return b;
  };
  const prev = nav(-1, "prev", "prev_year"), next = nav(1, "next", "next_year");
  const lbl = document.querySelector(`label[for="${inp.id}"]`);
  btn.id = `${inp.id}-btn`;
  btn.type = foot.type = "button";
  btn.setAttribute("aria-haspopup", "dialog");
  btn.setAttribute("aria-expanded", "false");
  if (lbl) lbl.htmlFor = btn.id;
  menu.hidden = true;
  menu.setAttribute("role", "dialog");
  btn.append(value, icon("calendar", "size-5 shrink-0"));
  head.append(prev, year, next);
  menu.append(head, grid, foot);
  inp.after(wrap);
  wrap.append(inp, btn, menu);
  const ym = (s) => s.split("-").map(Number);
  const nowYm = () => new Date().toISOString().slice(0, 7);
  const lo = () => ym(inp.min || "1970-01"), hi = () => ym(inp.max || nowYm());
  const name = (y, m, o) => new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", { ...o, timeZone: "UTC" }).format(Date.UTC(y, m - 1, 1));
  let view = ym(inp.value || nowYm())[0];
  const draw = (y) => {
    const [ly, lm] = lo(), [hy, hm] = hi(), [sy, sm] = inp.value ? ym(inp.value) : [0, 0], [ny, nm] = ym(nowYm());
    view = Math.min(hy, Math.max(ly, y));
    year.textContent = view;
    prev.disabled = view <= ly;
    next.disabled = view >= hy;
    grid.replaceChildren(...Array.from({ length: 12 }, (_, i) => {
      const m = i + 1, v = `${view}-${String(m).padStart(2, "0")}`, c = h("button", "month-cell", name(view, m, { month: "short" }));
      c.type = "button";
      c.disabled = (view === ly && m < lm) || (view === hy && m > hm);
      c.classList.toggle("is-now", view === ny && m === nm);
      c.setAttribute("aria-pressed", String(view === sy && m === sm));
      c.setAttribute("aria-label", name(view, m, { month: "long", year: "numeric" }));
      c.addEventListener("click", () => pick(v));
      return c;
    }));
  };
  const relabel = () => {
    value.textContent = inp.value ? name(...ym(inp.value), { month: "long", year: "numeric" }) : t("pick_month");
    value.classList.toggle("text-slate", !inp.value);
    foot.textContent = t("this_month");
    menu.setAttribute("aria-label", lbl?.textContent || t("pick_month"));
    prev.setAttribute("aria-label", t("prev_year"));
    next.setAttribute("aria-label", t("next_year"));
    if (!menu.hidden) draw(view);
  };
  const pick = (v) => {
    inp.value = v;
    inp.dispatchEvent(new Event("change", { bubbles: true }));
    relabel();
    closeSelect(true);
  };
  const open = () => {
    closeSelect();
    openSel = { btn, menu };
    menu.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    draw(ym(inp.value || nowYm())[0]);
    (grid.querySelector("[aria-pressed=true]") || grid.querySelector(".is-now:not(:disabled)") || grid.querySelector(".month-cell:not(:disabled)"))?.focus({ preventScroll: true });
  };
  foot.addEventListener("click", () => pick(nowYm()));
  btn.addEventListener("click", () => (openSel?.menu === menu ? closeSelect(true) : open()));
  menu.addEventListener("keydown", (e) => {
    const cells = [...grid.children], i = cells.indexOf(document.activeElement);
    const go = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 }[e.key];
    if (e.key === "Escape") closeSelect(true);
    else if (go && i >= 0) cells[Math.min(11, Math.max(0, i + go))].focus();
    else if (e.key === "PageUp" || e.key === "PageDown") draw(view + (e.key === "PageUp" ? -1 : 1));
    else return;
    e.preventDefault();
    e.stopPropagation();
  });
  relabels.push(relabel);
  relabel();
}

function hydrate() {
  for (const e of document.querySelectorAll("input[data-month]")) enhanceMonth(e);
  for (const e of document.querySelectorAll("select")) enhanceSelect(e);
  for (const e of document.querySelectorAll("[data-icon]")) e.replaceWith(icon(e.dataset.icon, e.className || "size-5"));
  for (const e of document.querySelectorAll("[data-reveal]")) revealer ? revealer.observe(e) : e.classList.add("in");
}
function sv(tag, attrs, kids = []) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  e.append(...kids);
  return e;
}

function svgFigure(pose, p, x, y, s, flip = false, float = false) {
  const kids = POSES[pose].parts.map((q) => {
    const [k] = q;
    if (k === "l") return sv("path", { d: q[1], fill: "none", stroke: p[q[2]], "stroke-width": q[3], "stroke-linecap": "round", "stroke-linejoin": "round" });
    if (k === "f") return sv("path", { d: q[1], fill: p[q[2]] });
    if (k === "c") return sv("circle", { cx: q[1], cy: q[2], r: q[3], fill: p[q[4]] });
    if (k === "e") return sv("ellipse", { cx: q[1], cy: q[2], rx: q[3], ry: q[4], fill: p[q[5]] });
    const r = sv("rect", { x: q[1], y: q[2], width: q[3], height: q[4], rx: q[5], fill: p[q[6]] });
    if (q[7]) r.setAttribute("transform", `rotate(${q[7]} ${q[8]} ${q[9]})`);
    return r;
  });
  const inner = sv("g", float ? { class: "animate-float" } : {}, kids);
  return sv("g", { transform: `translate(${x} ${y}) scale(${flip ? -s : s} ${s})` }, [inner]);
}

const CLOUD = "M0 20 a14 14 0 0 1 14 -14 a18 18 0 0 1 32 -2 a12 12 0 0 1 14 16 Z";
const STAR = "M0 -10 L3 -3 L10 -3 L4 1 L6 9 L0 4 L-6 9 L-4 1 L-10 -3 L-3 -3 Z";

function scene(w, hh, items) {
  const svg = sv("svg", { viewBox: `0 0 ${w} ${hh}`, class: "size-full", "aria-hidden": "true", preserveAspectRatio: "xMidYMid meet" });
  for (const it of items) {
    const [k, ...a] = it;
    if (k === "fig") svg.append(svgFigure(a[0], pal(a[1], a[6]), a[2], a[3], a[4], a[5], true));
    else if (k === "cloud") svg.append(sv("g", { class: "animate-drift" }, [sv("path", { d: CLOUD, fill: C.cloud, opacity: a[3] ?? 0.7, transform: `translate(${a[0]} ${a[1]}) scale(${a[2]})` })]));
    else if (k === "star") svg.append(sv("path", { d: STAR, fill: a[3] || C.butter, transform: `translate(${a[0]} ${a[1]}) scale(${a[2]})` }));
    else if (k === "paper")
      svg.append(sv("g", { transform: `translate(${a[0]} ${a[1]}) rotate(${a[2]})` }, [
        sv("rect", { width: 24, height: 32, rx: 2, fill: C.white }),
        sv("path", { d: "M5 9 h14 M5 15 h14 M5 21 h9", stroke: C.star, "stroke-width": 2.5, "stroke-linecap": "round" }),
      ]));
    else if (k === "raw") svg.append(a[0]);
  }
  return svg;
}

const HERO = [
  ["cloud", 18, 50, 1, 0.7], ["cloud", 290, 24, 1, 0.7], ["cloud", 150, 288, 0.8, 0.5],
  ["star", 200, 30, 1], ["star", 40, 200, 0.8, C.star], ["star", 360, 180, 0.8],
  ["paper", 120, 20, -12], ["paper", 250, 120, 16],
  ["fig", "lunge", 1, 150, 40, 1.1, false], ["fig", "run", 0, 0, 110, 1.05, false],
  ["fig", "jump", 2, 250, 170, 1, false], ["fig", "sit", 3, 110, 210, 0.95, false],
];

function drawFigure(x, pose, p, ox, oy, s, flip = false) {
  x.save();
  x.translate(ox, oy);
  x.scale(flip ? -s : s, s);
  x.lineCap = x.lineJoin = "round";
  for (const q of POSES[pose].parts) {
    const k = q[0];
    if (k === "l") {
      x.strokeStyle = p[q[2]];
      x.lineWidth = q[3];
      x.stroke(new Path2D(q[1]));
    } else if (k === "f") {
      x.fillStyle = p[q[2]];
      x.fill(new Path2D(q[1]));
    } else {
      x.beginPath();
      if (k === "c") x.arc(q[1], q[2], q[3], 0, Math.PI * 2);
      else if (k === "e") x.ellipse(q[1], q[2], q[3], q[4], 0, 0, Math.PI * 2);
      else {
        x.save();
        if (q[7]) {
          x.translate(q[8], q[9]);
          x.rotate((q[7] * Math.PI) / 180);
          x.translate(-q[8], -q[9]);
        }
        x.roundRect(q[1], q[2], q[3], q[4], q[5]);
        x.restore();
      }
      x.fillStyle = p[k === "c" ? q[4] : k === "e" ? q[5] : q[6]];
      x.fill();
    }
  }
  x.restore();
}

function drawDecor(x, kind, ox, oy, s, color, alpha = 1) {
  x.save();
  x.globalAlpha = alpha;
  x.translate(ox, oy);
  x.scale(s, s);
  x.fillStyle = color;
  x.fill(new Path2D(kind === "cloud" ? CLOUD : STAR));
  x.restore();
}

function burstPoints(points, r) {
  return Array.from({ length: points * 2 }, (_, i) => {
    const rr = i % 2 ? r * 0.72 : r, a = (Math.PI * i) / points;
    return [rr * Math.cos(a), rr * Math.sin(a)];
  });
}

function burst(color, cls, points = 14) {
  return sv("svg", { viewBox: "-50 -50 100 100", class: cls, "aria-hidden": "true" }, [
    sv("polygon", { points: burstPoints(points, 50).map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" "), fill: color }),
  ]);
}

async function loadStats() {
  try {
    const r = await fetch("/api/stats");
    stats = r.ok ? await r.json() : null;
  } catch {
    stats = null;
  }
  return stats;
}

function persona(r) {
  if (r.chapters === 5 || r.degree === "ALUM") return "finisher";
  if (r.revisions >= 15) return "hill_climber";
  if (r.title_changes >= 3) return "lost_runner";
  if (r.reply_days >= 7) return "water_station";
  if (r.coffee >= 21) return "caffeine_pacer";
  if (r.sleep >= 2) return "night_runner";
  if (r.days / Math.max(r.chapters, 0.5) <= 14) return "sprinter";
  return "steady_jogger";
}

function daysSince(month) {
  const [y, m] = month.split("-").map(Number);
  return Math.min(3650, Math.max(1, Math.floor((Date.now() - Date.UTC(y, m - 1, 1)) / 864e5)));
}

function compute(f) {
  const chapters = STATUS[f.status];
  const days = f.days ?? daysSince(f.start);
  const r = { ...f, chapters, days };
  return { ...r, pace: Math.round(days / Math.max(chapters, 0.5)), elev: f.revisions * 25, wait: f.reply_days * Math.max(1, f.revisions), persona: persona(r), finished: chapters === 5 || f.degree === "ALUM" };
}

function payload(r) {
  const keys = ["country", "degree", "chapters", "days", "pages", "revisions", "title_changes", "approvals", "reply_days", "coffee", "sleep", "website"];
  return { ...Object.fromEntries(keys.map((k) => [k, r[k]])), campus: r.campus || null };
}

function elevCmp(elev, country) {
  const x = (m) => "×" + Math.max(1, Math.round(elev / m));
  const L = lang === "id";
  if (country === "ID") return elev < 100 ? (L ? "tangga kos lantai 3" : "a 3-floor boarding house staircase") : elev < 500 ? "Monas " + x(132) : elev < 1000 ? "Tangkuban Parahu" : L ? "setengah Rinjani" : "half of Mount Rinjani";
  if (country === "IN") return elev < 100 ? (L ? "tangga hostel lantai 3" : "a 3-floor hostel staircase") : elev < 500 ? "Qutub Minar " + x(73) : elev < 1000 ? "Nandi Hills" : L ? "setengah Kedarnath" : "half of Kedarnath";
  const [name, m] = LANDMARK[country] || LANDMARK.OT;
  return `${name} ${x(m)}`;
}

function bestPct(api) {
  const p = api?.percentiles;
  if (!p || p.revisions == null) return null;
  const k = PCT_METRICS.reduce((a, b) => (p[b] > p[a] ? b : a));
  return { k, p: p[k], n: api.n, cp: api.country_percentiles?.[k], cn: api.country_n };
}

function seed(r) {
  let x = 2166136261;
  for (const c of JSON.stringify([r.country, r.degree, r.status, r.start || r.days, r.pages, r.revisions, r.title_changes, r.approvals, r.reply_days, r.coffee, r.sleep])) x = Math.imul(x ^ c.charCodeAt(0), 16777619);
  return x >>> 0;
}

function rng(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let q = Math.imul(a ^ (a >>> 15), 1 | a);
    q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
    return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
  };
}

const enc = (o) => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o)))).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
const dec = (s) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replaceAll("-", "+").replaceAll("_", "/")), (c) => c.charCodeAt(0))));

function readPacer() {
  const m = location.hash.match(/^#p=([\w-]{1,600})$/);
  if (!m) return null;
  try {
    const o = dec(m[1]);
    const n = (v, max) => Math.min(max, Math.max(0, Number(v) || 0));
    if (!COUNTRIES.includes(o.c)) return null;
    return {
      name: String(o.n || "").slice(0, 20) || "Runner", country: o.c, pace: n(o.p, 3650), revisions: n(o.r, 50), coffee: n(o.k, 50),
      sleep: n(o.s, 4), chapters: n(o.b, 5), pages: n(o.g, 300), approvals: n(o.a, 30), persona: PERSONAS.includes(o.q) ? o.q : "steady_jogger",
    };
  } catch {
    return null;
  }
}

const pacerUrl = (r) => `${location.origin}/#p=${enc({ n: r.name, c: r.country, p: r.pace, r: r.revisions, k: r.coffee, s: r.sleep, b: r.chapters, g: r.pages, a: r.approvals, q: r.persona })}`;

function matchScore(a, b) {
  const v = (o) => [Math.min(o.pace, 365) / 365, o.revisions / 50, o.coffee / 50, o.sleep / 4, o.chapters / 5];
  const va = v(a), vb = v(b);
  return Math.round(99 - (va.reduce((s, x, i) => s + Math.abs(x - vb[i]), 0) / va.length) * 60);
}

function duelScore(a, b) {
  let sa = 0, sb = 0;
  for (const k of ["pages", "revisions", "coffee", "sleep", "approvals"]) {
    if ((a[k] ?? 0) > (b[k] ?? 0)) sa++;
    else if ((b[k] ?? 0) > (a[k] ?? 0)) sb++;
  }
  return [sa, sb];
}

async function shareLink(url, text, msgEl) {
  if (navigator.share) {
    try {
      return await navigator.share({ title: "ThesiRun", text, url });
    } catch (e) {
      if (e.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    msgEl.replaceChildren(icon("check", "mr-1.5 inline size-4"), t("copied"));
  } catch {
    msgEl.textContent = url;
  }
  msgEl.classList.remove("hidden", "animate-pop");
  void msgEl.offsetWidth;
  msgEl.classList.add("animate-pop");
}

function chip(name, value, key) {
  const l = h("label", "chip"), i = h("input", "sr-only"), s = h("span");
  Object.assign(i, { type: "radio", name, value, required: value === 0 });
  s.dataset.i18n = key;
  l.append(i, s);
  return l;
}

function buildForm() {
  $("status").append(...STATUS.map((_, i) => chip("status", i, "st_" + i)));
  $("sleep").append(...Array.from({ length: SLEEP_N }, (_, i) => chip("sleep", i, "sl_" + i)));
  $("phrases").append(...Array.from({ length: PHRASE_N }, (_, i) => chip("phrase", i, "ph_" + i)));
  $("sleep").querySelectorAll("input")[1].checked = true;

  for (const el of document.querySelectorAll("[data-range]")) {
    const k = el.dataset.range;
    el.className = "rounded-3xl bg-paper px-4 pt-3 pb-1";
    const lab = h("label", "flex items-baseline justify-between gap-3 text-sm font-extrabold"), out = h("output", "font-display text-4xl leading-none font-extrabold tabular-nums", el.dataset.value);
    const span = h("span");
    span.dataset.i18n = "r_" + k;
    lab.htmlFor = "r-" + k;
    lab.append(span, out);
    const inp = h("input", "w-full");
    Object.assign(inp, { id: "r-" + k, name: k, type: "range", min: 0, max: el.dataset.max, value: el.dataset.value });
    inp.addEventListener("input", () => (out.textContent = inp.value));
    el.append(lab, inp);
  }

  for (const el of document.querySelectorAll("[data-stepper]")) {
    const k = el.dataset.stepper, max = +el.dataset.max;
    el.className = "flex items-center justify-between gap-4 rounded-3xl bg-paper p-4";
    const lab = h("label", "text-sm font-extrabold");
    lab.dataset.i18n = "r_" + k;
    lab.htmlFor = "s-" + k;
    const inp = h("input", "w-14 bg-transparent text-center font-display text-3xl font-extrabold tabular-nums");
    Object.assign(inp, { id: "s-" + k, name: k, type: "number", min: 0, max, value: 0, inputMode: "numeric" });
    const btn = (txt, d) => {
      const b = h("button", "step");
      b.append(icon(txt, "size-5"));
      b.type = "button";
      b.setAttribute("aria-label", (d > 0 ? "+" : "−") + " " + k);
      b.addEventListener("click", () => (inp.value = Math.min(max, Math.max(0, (+inp.value || 0) + d))));
      return b;
    };
    const box = h("div", "flex items-center gap-2");
    box.append(btn("minus", -1), inp, btn("plus", 1));
    el.append(lab, box);
  }

  const now = new Date();
  $("start-month").max = now.toISOString().slice(0, 7);
  $("start-month").min = `${now.getUTCFullYear() - 10}-01`;

  $("form").addEventListener("change", (e) => {
    if (e.target.name === "country") {
      tc = e.target.value;
      applyI18n();
    }
  });
  $("form").addEventListener("submit", onSubmit);
}

function readForm() {
  const f = new FormData($("form"));
  const num = (k, max) => Math.min(max, Math.max(0, Math.round(Number(f.get(k)) || 0)));
  const ph = f.get("phrase");
  return {
    name: String(f.get("name") || "").trim().slice(0, 20), country: f.get("country"), campus: String(f.get("campus") || "").trim().slice(0, 60),
    degree: f.get("degree"), status: f.get("status") == null ? null : +f.get("status"), start: f.get("start"),
    pages: num("pages", 300), revisions: num("revisions", 50), title_changes: num("title_changes", 10), approvals: num("approvals", 30),
    reply_days: num("reply_days", 30), coffee: num("coffee", 50), sleep: num("sleep", 4),
    song: String(f.get("song") || "").trim().slice(0, 40), phrase: String(f.get("phrase_custom") || "").trim().slice(0, 40) || (ph == null ? "" : t("ph_" + ph)),
    share: f.get("share") === "on", website: String(f.get("website") || ""),
  };
}

async function onSubmit(e) {
  e.preventDefault();
  const f = readForm();
  const err = $("form-error");
  if (!f.country || !f.degree || f.status == null || !f.start) {
    err.textContent = t("err_required");
    err.classList.remove("hidden");
    err.scrollIntoView({ block: "center" });
    return;
  }
  err.classList.add("hidden");
  run = compute(f);
  store.set("team", run.country);
  const btn = e.submitter || $("form").querySelector("button:not([type])");
  busy(btn, true);
  btn.lastChild.textContent = t("sending");
  if (f.share && !store.get("submitted")) {
    try {
      const res = await fetch("/api/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload(run)) });
      if (res.ok) {
        run.api = await res.json();
        store.set("submitted", "1");
      }
    } catch {}
  }
  await loadStats();
  busy(btn, false);
  btn.lastChild.textContent = t("go");
  openStory();
}

function sampleRun() {
  const c = lang === "id" ? "ID" : "IN";
  tc = c;
  return {
    ...compute({
      name: t("sample_name"), country: c, campus: "", degree: "S1", status: 4, days: 142, pages: 87, revisions: 14, title_changes: 2,
      approvals: 6, reply_days: 7, coffee: 14, sleep: 2, song: t("sample_song"), phrase: t("ph_0"), share: false, website: "",
    }),
    sample: true,
  };
}

const kicker = (text, cls = "") => h("p", "animate-rise relative text-2xl font-extrabold " + cls, text);
const sub = (text, cls = "") => h("p", "animate-rise relative mt-4 text-xl leading-snug font-semibold " + cls, text);

function giant(cls, ...kids) {
  const p = h("p", "animate-rise relative font-display text-[clamp(4.5rem,30cqw,11rem)] leading-[0.82] font-extrabold tracking-[-0.06em] " + cls);
  p.append(...kids);
  return p;
}

function art(cls, w, hh, items) {
  const d = h("div", cls);
  d.setAttribute("aria-hidden", "true");
  d.append(scene(w, hh, items));
  return d;
}

function inBurst(color, child, size = "size-56") {
  const d = h("div", `relative mx-auto flex items-center justify-center ${size}`);
  d.append(burst(color, "absolute inset-0 size-full animate-spin-slow"), child);
  child.classList.add("relative");
  return d;
}

function seeCard() {
  const b = h("button", "btn relative mt-8 w-full bg-butter text-night", t("see_card"));
  b.type = "button";
  b.addEventListener("click", closeStory);
  return b;
}

function routeDiamonds(r) {
  const next = Math.min(5, Math.floor(r.chapters) + 1);
  const box = h("div", "animate-rise relative mt-8"), row = h("div", "flex items-center"), labels = h("div", "mt-2 flex justify-between text-xs font-extrabold");
  for (let i = 1; i <= 6; i++) {
    if (i > 1) row.append(h("span", "h-0 flex-1 border-t-4 border-dotted border-white"));
    const done = r.finished || i <= r.chapters, cur = !r.finished && i === next;
    row.append(h("span", "size-6 shrink-0 rotate-45 rounded-sm border-[3px] " + (done ? "border-night bg-night" : cur ? "border-butter bg-butter" : "border-white")));
    labels.append(h("span", "w-8 text-center", i < 6 ? String(i) : "FIN"));
  }
  box.append(row, labels);
  return box;
}

function personaFigure(r, cls, w = 140, hh = 150, s = 1) {
  const [pose, pi] = PERSONA_ART[r.persona];
  const [bw, bh] = POSES[pose].box;
  return art(cls, w, hh, [["fig", pose, pi, (w - bw * s) / 2, (hh - bh * s) / 2, s, false]]);
}

function teamLeague() {
  const c = stats?.countries || {};
  return TEAMS.map((k) => ({ k, v: c[k]?.pages ?? 0, n: c[k]?.n ?? 0 })).sort((a, b) => b.v - a.v);
}

function buildSlides(r) {
  const S = [];
  const add = (cls, make, onShow) => S.push({ cls, make, onShow });
  const pct = bestPct(r.api);
  const [pose, pi] = PERSONA_ART[r.persona];

  add("bg-sky text-night", () => [
    art("animate-rise relative mx-auto aspect-[39/30] w-full max-w-sm", 390, 300, [
      ["cloud", 20, 40, 1.2, 0.7], ["cloud", 270, 20, 1, 0.6], ["star", 60, 120, 1], ["star", 340, 160, 0.8, C.star], ["paper", 300, 90, 14],
      ["fig", pose, pi, 130, 60, 1.6, false],
    ]),
    h("p", "animate-rise relative mt-6 font-display text-[clamp(2.4rem,11cqw,3.5rem)] leading-[0.95] font-extrabold tracking-tight text-white", t("s1", { name: r.name || "Runner" })),
    h("p", "relative mt-6 font-bold", t("tap")),
  ]);

  add("bg-sky text-night", () => [
    art("absolute right-0 bottom-20 w-1/2 max-w-56", 160, 160, [["fig", "run", 0, 10, 10, 1.05, false], ["paper", 4, 120, -10]]),
    kicker(t("s2k")),
    giant("text-white", count(r.days)),
    h("p", "animate-rise relative mt-3 -rotate-3 self-start rounded-2xl bg-butter px-5 py-1 font-display text-6xl font-extrabold tracking-tight", t("s2u")),
    sub(t("s2s"), "max-w-xs"),
  ]);

  add("bg-butter text-night", () => {
    const bar = h("div", "animate-rise relative mt-6 h-5 overflow-hidden rounded-full bg-night/15"), fill = h("div", "h-full rounded-full bg-night");
    fill.style.width = Math.min(100, r.pages / 3) + "%";
    bar.append(fill);
    const scale = h("div", "relative mt-1 flex justify-between text-sm font-bold");
    scale.append(h("span", "", "0"), h("span", "", "300"));
    return [
      art("absolute -top-4 right-2 w-40 opacity-90", 130, 140, [["paper", 10, 20, -14], ["paper", 60, 6, 10], ["paper", 90, 60, 22], ["star", 40, 100, 1, C.white]]),
      kicker(t("s3k")), giant("", count(r.pages)), h("p", "animate-rise relative font-display text-5xl font-extrabold", t("s3u")), bar, scale,
    ];
  });

  add("bg-pink text-night", () => [
    art("animate-rise relative mx-auto aspect-[39/24] w-full max-w-sm", 390, 240, [
      ["raw", sv("path", { d: "M10 240 L120 90 L180 160 L260 40 L380 240 Z", fill: C.navy })],
      ["raw", sv("path", { d: "M240 68 L260 40 L280 70 L268 64 L260 74 L252 64 Z", fill: C.paper })],
      ["fig", "lunge", 1, 120, 70, 1.15, false], ["star", 50, 40, 1],
    ]),
    giant("-mt-6 text-[clamp(4rem,24cqw,9rem)]", count(r.elev), " m"),
    kicker(t("s4k"), "mt-2"),
    sub(t("s4s", { rev: fmt(r.revisions), cmp: elevCmp(r.elev, r.country) })),
  ]);

  add("bg-night text-paper", () => [
    art("absolute right-2 bottom-24 w-44", 130, 105, [["fig", "sit", 3, 0, 0, 1, false]]),
    kicker(t("s5k")),
    (() => {
      const p = giant("text-butter");
      p.append(count(r.reply_days));
      return p;
    })(),
    h("p", "animate-rise relative font-display text-5xl font-extrabold text-butter", t("days_up")),
    sub(t("s5s", { wait: fmt(r.wait) }), "max-w-xs"),
  ]);

  add("bg-tomato text-night", () => {
    const chips = h("div", "animate-rise relative mt-6 flex flex-wrap gap-2");
    for (let i = 0; i < SLEEP_N; i++) chips.append(h("span", "rounded-full border-2 border-night px-4 py-2 font-bold " + (i === r.sleep ? "bg-night text-butter" : ""), t("sl_" + i)));
    return [kicker(t("s6k")), giant("", count(r.coffee)), h("p", "animate-rise relative font-display text-4xl font-extrabold", t("s6u")), chips, sub(t("s6s", { time: t("sl_" + r.sleep) }))];
  });

  if (pct)
    add("bg-night text-pink", () => {
      const big = h("p", "font-display text-7xl font-extrabold text-night tabular-nums");
      big.append(count(pct.p), "%");
      const out = [kicker(t("s7k")), inBurst(C.butter, big, "size-64 my-4"), sub(t("pct_" + pct.k, { p: pct.p, n: fmt(pct.n) }))];
      if (pct.cp != null) out.push(sub(t("pct_team", { team: CODE[r.country], p: pct.cp, n: fmt(pct.cn) }), "text-paper text-base"));
      return out;
    });
  else if (r.api)
    add("bg-night text-pink", () => [kicker(t("s7k")), inBurst(C.butter, personaFigure(r, "size-40"), "size-64 my-4"), sub(t("first30"))]);

  add(`${TEAM_CLS[r.country]} text-night`, () => {
    const lg = teamLeague(), max = Math.max(1, ...lg.map((x) => x.v));
    const list = h("ol", "animate-rise relative -ml-6 mt-6 grid gap-1.5");
    lg.forEach((x, i) => {
      const li = h("li", "flex h-11 items-center justify-between rounded-r-full px-4 font-extrabold " + (x.k === r.country ? "bg-night text-butter" : TEAM_CLS[x.k] + " ring-2 ring-night/15"));
      li.style.width = `calc(${40 + (x.v / max) * 52}% + 1.5rem)`;
      li.append(h("span", "", `${i + 1} · ${CODE[x.k]}`), h("span", "tabular-nums", x.n ? fmt(x.v) : "–"));
      list.append(li);
    });
    const any = lg.some((x) => x.n);
    return [
      kicker(t("s8k")),
      giant("text-[clamp(3.5rem,20cqw,7rem)]", count(r.pages)),
      h("p", "animate-rise relative font-display text-3xl font-extrabold", `${t("s8u")} ${t("s8s", { team: countryName(r.country) })}`),
      list,
      h("p", "relative mt-3 text-sm font-bold", any ? t("s8_league") : t("s8_wait")),
    ];
  });

  add("bg-night text-butter", () => {
    const name = t("p_" + r.persona).toUpperCase().split(" ");
    const box = h("div", "animate-rise relative -mx-8 mt-4");
    name.forEach((w, i) => box.append(h("p", "font-display text-[clamp(3.5rem,24cqw,8rem)] leading-[0.82] font-extrabold tracking-[-0.055em] whitespace-nowrap " + (i % 2 ? "text-pink" : "text-butter"), w)));
    return [kicker(t("s9k"), "text-mist"), inBurst(C.sky, personaFigure(r, "size-44", 140, 150, 1), "size-64 mt-2"), box];
  });

  if (r.finished)
    add("bg-night text-butter", () => [
      inBurst(C.butter, personaFigure({ persona: "finisher" }, "size-40")),
      h("p", "animate-rise relative mt-6 font-display text-[clamp(3.5rem,20cqw,7rem)] leading-[0.85] font-extrabold tracking-tight", "FINISHER"),
      sub(t("s10f", { days: fmt(r.days), pages: fmt(r.pages), rev: fmt(r.revisions) }), "text-paper"),
      routeDiamonds(r),
      seeCard(),
    ], () => {
      confetti();
      navigator.vibrate?.(80);
    });
  else
    add("bg-sky text-night", () => [
      routeDiamonds(r),
      h("p", "animate-rise relative mt-10 font-display text-[clamp(3rem,15cqw,5.5rem)] leading-[0.9] font-extrabold tracking-tight text-white", t("s10", { next: Math.min(5, Math.floor(r.chapters) + 1) })),
      sub(t("s10s")),
      seeCard(),
    ]);

  return S;
}

const FRAME = "@container relative h-full w-full overflow-hidden select-none lg:h-[min(92dvh,56rem)] lg:w-auto lg:aspect-[9/16] lg:rounded-[2rem] lg:shadow-2xl ";

function openStory() {
  tc = run.country;
  slides = buildSlides(run);
  $("bars").replaceChildren(...slides.map(() => h("span", "h-1 flex-1 rounded-full bg-current/30")));
  $("sample-tag").classList.toggle("hidden", !run.sample);
  document.body.classList.add("overflow-hidden");
  $("story").hidden = false;
  show(0);
  $("next").focus();
}

function show(i) {
  idx = Math.max(0, Math.min(slides.length - 1, i));
  const s = slides[idx];
  $("frame").className = FRAME + s.cls;
  $("slide").replaceChildren(...s.make());
  [...$("slide").querySelectorAll(".animate-rise")].forEach((e, j) => (e.style.animationDelay = j * 70 + "ms"));
  [...$("bars").children].forEach((b, j) => (b.className = "h-1 flex-1 rounded-full " + (j <= idx ? "bg-current" : "bg-current/30")));
  $("counter").textContent = `${idx + 1}/${slides.length}`;
  for (const e of $("slide").querySelectorAll("[data-count]")) countUp(e, +e.dataset.count);
  s.onShow?.();
}

const next = () => (idx === slides.length - 1 ? closeStory() : show(idx + 1));

function closeStory() {
  $("story").hidden = true;
  document.body.classList.remove("overflow-hidden");
  showResult();
}

function confetti() {
  if (reduced()) return;
  const cv = h("canvas", "pointer-events-none fixed inset-0 z-[60]");
  cv.width = innerWidth;
  cv.height = innerHeight;
  document.body.append(cv);
  const x = cv.getContext("2d"), cols = [C.butter, C.pink, C.tomato, C.saffron, C.sky, C.lilac, C.white];
  const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.5, vx: (Math.random() - 0.5) * 4, vy: 4 + Math.random() * 6, c: cols[(Math.random() * cols.length) | 0], s: 6 + Math.random() * 7 }));
  const t0 = performance.now();
  const frame = (now) => {
    x.clearRect(0, 0, cv.width, cv.height);
    for (const p of ps) {
      p.x += p.vx;
      p.y += p.vy;
      x.fillStyle = p.c;
      x.fillRect(p.x, p.y, p.s, p.s * 0.6);
    }
    if (now - t0 < 1500) requestAnimationFrame(frame);
    else cv.remove();
  };
  requestAnimationFrame(frame);
}

const W = 1080, H = 1920, M = 72;
const DISPLAY = "'Bricolage Grotesque', Figtree, system-ui, sans-serif";
const fgOn = (bg) => (bg === C.night ? C.paper : C.night);

function font(x, w, s, display = false) {
  x.font = `${w} ${s}px ${display ? DISPLAY : "Figtree, system-ui, sans-serif"}`;
}

function fit(x, text, maxW, w, size, min = 32, display = false) {
  for (; size > min; size -= 2) {
    font(x, w, size, display);
    if (x.measureText(text).width <= maxW) return text;
  }
  font(x, w, min, display);
  if (x.measureText(text).width <= maxW) return text;
  while (text.length > 1 && x.measureText(text + "…").width > maxW) text = text.slice(0, -1);
  return text + "…";
}

function pill(x, text, X, Y, bg, fg, size = 40, align = "left") {
  font(x, 800, size);
  const w = x.measureText(text).width + size * 1.4, hh = size * 1.9, left = align === "right" ? X - w : align === "center" ? X - w / 2 : X;
  x.beginPath();
  x.roundRect(left, Y, w, hh, hh / 2);
  x.fillStyle = bg;
  x.fill();
  x.fillStyle = fg;
  x.textAlign = "left";
  x.fillText(text, left + size * 0.7, Y + hh * 0.68);
}

function drawBurst(x, cx, cy, r, color) {
  x.beginPath();
  for (const [px, py] of burstPoints(14, r)) x.lineTo(cx + px, cy + py);
  x.closePath();
  x.fillStyle = color;
  x.fill();
}

function drawQR(x, X, Y, size, fg) {
  const n = QR.length, pad = size * 0.08, m = (size - 2 * pad) / n;
  x.beginPath();
  x.roundRect(X, Y, size, size, size * 0.12);
  x.fillStyle = C.white;
  x.fill();
  x.fillStyle = fg;
  QR.forEach((row, j) => {
    for (let i = 0; i < n; i++) if ((row >> (n - 1 - i)) & 1) x.fillRect(X + pad + i * m, Y + pad + j * m, m + 0.5, m + 0.5);
  });
}

function drawPin(x, px, py, s = 1) {
  x.save();
  x.translate(px, py);
  x.scale(s, s);
  x.fillStyle = C.tomato;
  x.fill(new Path2D("M0 0 C-10 -14 -22 -24 -22 -40 A22 22 0 0 1 22 -40 C22 -24 10 -14 0 0 Z"));
  x.beginPath();
  x.arc(0, -40, 9, 0, Math.PI * 2);
  x.fillStyle = C.paper;
  x.fill();
  x.restore();
}

function drawFlag(x, fx, fy) {
  x.fillStyle = C.night;
  x.fillRect(fx, fy, 8, 110);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    x.fillStyle = (i + j) % 2 ? C.night : C.white;
    x.fillRect(fx + 8 + i * 18, fy + j * 18, 18, 18);
  }
}

function drawRoute(x, r, bx, by, bw, bh) {
  const rand = rng(seed(r)), wp = [], pts = [];
  for (let i = 0; i <= 6; i++) wp.push([bx + 90 + ((bw - 180) * i) / 6, by + bh / 2 + (i === 0 || i === 6 ? 0 : (rand() - 0.5) * (bh - 300))]);
  for (let i = 0; i < 6; i++) {
    const [p0, p1, p2, p3] = [wp[Math.max(0, i - 1)], wp[i], wp[i + 1], wp[Math.min(6, i + 2)]];
    for (let s = 0; s < 24; s++) {
      const u = s / 24, u2 = u * u, u3 = u2 * u;
      pts.push([0, 1].map((d) => 0.5 * (2 * p1[d] + (p2[d] - p0[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * u3)));
    }
  }
  pts.push(wp[6]);
  const f = r.finished ? 1 : Math.max(0.08, r.chapters / 5), here = Math.max(1, Math.round(pts.length * f)) - 1;
  pts[here][2] = 2;
  const loops = Math.min(10, r.title_changes);
  for (let k = loops; k >= 1; k--) {
    const at = Math.floor((k / (loops + 1)) * pts.length);
    if (Math.abs(at - here) < 14) continue;
    const [px, py] = pts[at], R = 34 + rand() * 14, dir = rand() < 0.5 ? -1 : 1;
    const ring = Array.from({ length: 28 }, (_, j) => [px + R * Math.sin((2 * Math.PI * j) / 28), py + dir * (R - R * Math.cos((2 * Math.PI * j) / 28))]);
    pts.splice(at, 0, ...ring);
  }
  const cut = r.finished ? pts.length : Math.max(2, pts.findIndex((q) => q[2] === 2) + 1);
  const line = (arr) => {
    x.beginPath();
    arr.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)));
    x.stroke();
  };
  x.lineCap = x.lineJoin = "round";
  x.strokeStyle = "rgba(255,255,255,.75)";
  x.lineWidth = 10;
  x.setLineDash([2, 26]);
  line(pts.slice(cut - 1));
  x.setLineDash([]);
  x.strokeStyle = C.white;
  x.lineWidth = 18;
  line(pts.slice(0, cut));
  x.beginPath();
  x.arc(wp[0][0], wp[0][1], 22, 0, Math.PI * 2);
  x.fillStyle = C.night;
  x.fill();
  x.beginPath();
  x.arc(wp[0][0], wp[0][1], 9, 0, Math.PI * 2);
  x.fillStyle = C.white;
  x.fill();
  x.fillStyle = C.night;
  font(x, 800, 32);
  x.fillText("START", wp[0][0] - 46, wp[0][1] + 64);
  drawFlag(x, wp[6][0] - 4, wp[6][1] - 110);
  if (!r.finished) {
    const [px, py] = pts[cut - 1];
    drawPin(x, px, py - 6, 1.6);
    font(x, 800, 28);
    const lw = x.measureText(t("here")).width + 40, lx = Math.min(Math.max(px, bx + lw / 2 + 16), bx + bw - lw / 2 - 16);
    pill(x, t("here"), lx, py - 186 < by + 16 ? py + 24 : py - 186, C.night, C.white, 28, "center");
  }
}

async function fontsReady() {
  await Promise.all([document.fonts.load("800 40px Figtree"), document.fonts.load(`800 40px ${DISPLAY}`)]).catch(() => {});
  await document.fonts.ready;
}

async function drawCard(r) {
  await fontsReady();
  const cv = $("card"), x = cv.getContext("2d");
  cv.blob = null;
  const bg = r.finished ? C.night : TEAM[r.country], fg = fgOn(bg);
  x.textAlign = "left";
  x.fillStyle = bg;
  x.fillRect(0, 0, W, H);
  x.fillStyle = fg;
  font(x, 800, 80, true);
  x.fillText("ThesiRun", M, 150);
  pill(x, `TEAM ${CODE[r.country]}`, W - M, 84, r.finished ? C.butter : C.night, r.finished ? C.night : C.white, 38, "right");
  if (r.sample) pill(x, "SAMPLE", W - M, 172, C.butter, C.night, 30, "right");
  x.fillStyle = fg;
  x.fillText(fit(x, `${r.name || "Runner"} · Thesis Run 2026`, 700, 700, 44), M, 236);

  const by = 290, bh = 640, bw = W - 2 * M;
  x.save();
  x.beginPath();
  x.roundRect(M, by, bw, bh, 56);
  x.fillStyle = C.sky;
  x.fill();
  x.clip();
  drawDecor(x, "cloud", M + bw - 300, by + 60, 2.4, C.cloud, 0.7);
  drawDecor(x, "cloud", M + 40, by + bh - 120, 1.8, C.cloud, 0.5);
  drawDecor(x, "star", M + bw / 2, by + 70, 2.2, C.butter);
  if (r.finished) {
    drawBurst(x, W / 2, by + bh / 2, 250, C.butter);
    const [bwj, bhj] = POSES.jump.box;
    drawFigure(x, "jump", pal(2), W / 2 - (bwj * 3) / 2, by + bh / 2 - (bhj * 3) / 2, 3);
  } else {
    drawRoute(x, r, M, by, bw - 300, bh);
    const [pose, pi] = PERSONA_ART[r.persona], [fw, fh] = POSES[pose].box, s = 2.3;
    drawFigure(x, pose, pal(pi), M + bw - fw * s - 30, by + bh - fh * s - 40, s);
  }
  x.restore();

  const words = t("p_" + r.persona).toUpperCase();
  x.fillStyle = fg;
  x.fillText(fit(x, words, W - 2 * M, 800, 150, 70, true), M, by + bh + 150);

  const py = by + bh + 200, ph = 320;
  x.beginPath();
  x.roundRect(M, py, bw, ph, 44);
  x.fillStyle = C.paper;
  x.fill();
  const tm = TERMS[r.country];
  const grid = [["Distance", `${r.pages} pg`], ["Pace", `${r.pace} d/ch`], ["Elev.", `${fmt(r.elev)} m`], ["Time", `${fmt(r.days)} d`], ["Kudos", `${r.approvals} ${tm.acc}`], ["Fuel", `${r.coffee} cups`]];
  grid.forEach(([label, val], i) => {
    const X = M + 44 + (i % 3) * 310, Y = py + 78 + Math.floor(i / 3) * 140;
    x.fillStyle = C.slate;
    font(x, 700, 30);
    x.fillText(label, X, Y);
    x.fillStyle = C.night;
    x.fillText(fit(x, val, 280, 800, 60, 34, true), X, Y + 62);
  });

  const pct = bestPct(r.api);
  let y = py + ph + 50;
  if (pct) {
    const txt = t("card_pct", { m: t("pm_" + pct.k), p: pct.p, n: fmt(pct.n) });
    let s = 38;
    for (; s > 24; s -= 2) {
      font(x, 800, s);
      if (x.measureText(txt).width + s * 1.4 <= bw) break;
    }
    pill(x, txt, M, y, C.butter, C.night, s);
    y += 120;
  }
  x.fillStyle = fg;
  if (r.song) {
    drawIcon(x, "music", M, (y += 40) - 36, 40, fg);
    x.fillText(fit(x, `"${r.song}"`, bw - 56, 700, 42, 30), M + 56, y);
  }
  if (r.phrase) x.fillText(fit(x, `"${r.phrase}"`, bw, 600, 40, 28), M, (y += 64));

  x.fillStyle = fg;
  font(x, 800, 52, true);
  x.fillText(BRAND, M, 1790);
  font(x, 700, 36);
  x.fillText(TAG, M, 1846);
  drawQR(x, W - M - 190, 1676, 190, C.night);
  TEAMS.forEach((k, i) => {
    x.fillStyle = TEAM[k];
    x.fillRect((W / 5) * i, H - 26, W / 5, 26);
  });
  try {
    cv.toBlob((b) => (cv.blob = b), "image/png");
  } catch {}
}

async function drawDuo(a, b) {
  await fontsReady();
  const cv = $("duo"), x = cv.getContext("2d");
  cv.blob = null;
  const top = TEAM[a.country], bot = a.country === b.country ? C.sky : TEAM[b.country];
  const score = matchScore(a, b), [sa, sb] = duelScore(a, b);
  const half = (p, bg, y0, flip, fx) => {
    x.fillStyle = bg;
    x.fillRect(0, y0, W, H / 2);
    const [pose, pi] = PERSONA_ART[p.persona], [fw, fh] = POSES[pose].box, s = 2.6;
    drawFigure(x, pose, pal(pi), flip ? fx + fw * s : fx, y0 + H / 2 - fh * s - 60, s, flip);
    x.fillStyle = C.night;
    x.textAlign = "left";
    x.fillText(fit(x, p.name || "Runner", 560, 800, 110, 56, true), M, y0 + 250);
    font(x, 800, 40);
    x.fillText(`TEAM ${CODE[p.country]}`, M, y0 + 320);
    font(x, 600, 40);
    x.fillText(t("p_" + p.persona), M, y0 + 380);
  };
  half(a, top, 0, false, W - M - 340);
  half(b, bot, H / 2, true, W - M - 340);
  x.fillStyle = C.night;
  font(x, 800, 56, true);
  x.fillText("ThesiRun · Pacer Duel", M, 120);
  drawBurst(x, W / 2, H / 2, 210, C.butter);
  x.fillStyle = C.night;
  x.textAlign = "center";
  font(x, 800, 150, true);
  x.fillText(`${sa}–${sb}`, W / 2, H / 2 + 30);
  font(x, 800, 36);
  x.fillText(`${t("match")} ${score}`, W / 2, H / 2 + 90);
  const label = t(score >= 85 ? "duo_hi" : score >= 65 ? "duo_mid" : "duo_lo");
  font(x, 800, 44);
  x.fillText(fit(x, label, W - 2 * M, 800, 44, 28), W / 2, H - 260);
  if (a.country !== b.country) pill(x, `${CODE[a.country]} + ${CODE[b.country]} · ${t("intl")}`, W / 2, H - 230, C.night, C.butter, 38, "center");
  x.textAlign = "center";
  x.fillStyle = C.night;
  font(x, 800, 48, true);
  x.fillText(BRAND, W / 2, H - 90);
  font(x, 700, 34);
  x.fillText(TAG, W / 2, H - 40);
  x.textAlign = "left";
  try {
    cv.toBlob((bl) => (cv.blob = bl), "image/png");
  } catch {}
  return [sa, sb];
}

async function shareCanvas(cv, name, btn) {
  if (!cv.blob && btn) {
    busy(btn, true);
    for (let i = 0; !cv.blob && i < 50; i++) await new Promise((r) => setTimeout(r, 100));
    busy(btn, false);
  }
  const blob = cv.blob;
  if (!blob) return;
  const file = new File([blob], name, { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      return await navigator.share({ files: [file], text: `${BRAND} https://${URL_APP} ${TAG}` });
    } catch (e) {
      if (e.name === "AbortError") return;
    }
  }
  const a = h("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

async function drawResult() {
  await drawCard(run);
  if (pacer && !run.sample) {
    const [sa, sb] = await drawDuo(pacer, run);
    const duels = store.json("duels", []).filter((d) => d.n !== pacer.name || d.c !== pacer.country);
    duels.unshift({ n: pacer.name, c: pacer.country, a: sb, b: sa, m: matchScore(pacer, run) });
    store.set("duels", JSON.stringify(duels.slice(0, 10)));
  }
}

function showResult() {
  $("result").classList.remove("hidden");
  $("pacer-box").classList.toggle("hidden", !!run.sample);
  $("duo-box").classList.toggle("hidden", !pacer || !!run.sample);
  if (!run.sample) store.set("me", pacerUrl(run));
  $("result").scrollIntoView();
  drawResult();
}

function renderLanding() {
  const c = stats?.countries || {};
  $("league").setAttribute("aria-busy", String(stats === undefined));
  if (stats === undefined) return $("league").replaceChildren(...TEAMS.map(() => h("li", "skeleton h-36")));
  $("league").replaceChildren(...TEAMS.map((k, i) => {
    const li = stagger(h("li", `lift relative grid cursor-default gap-1 overflow-hidden rounded-3xl p-4 hover:-rotate-1 ${TEAM_CLS[k]}`), i);
    const n = h("span", "font-display text-5xl leading-none font-extrabold tracking-tight tabular-nums", "0");
    li.append(h("span", "kicker", CODE[k]), h("span", "font-bold", countryName(k)), n, h("span", "text-sm font-semibold", t("runners")));
    countUp(n, c[k]?.n ?? 0);
    return li;
  }));
  const total = COUNTRIES.reduce((s, k) => s + (c[k]?.n ?? 0), 0);
  $("cold").classList.toggle("hidden", total >= 100);
  $("cold-bars").replaceChildren(...TEAMS.map((k) => {
    const n = Math.min(MIN_GROUP, c[k]?.n ?? 0), d = h("div", "text-sm font-bold");
    const track = h("div", "mt-1 h-2.5 overflow-hidden rounded-full bg-cloud"), fill = h("div", "h-full origin-left animate-grow rounded-full");
    fill.style.width = (n / MIN_GROUP) * 100 + "%";
    fill.style.background = TEAM_BAR[k];
    track.append(fill);
    d.append(h("span", "", `${CODE[k]} ${n}/${MIN_GROUP}`), track);
    return d;
  }));
  const w = stats?.daily?.winners;
  const parts = w ? Object.entries(w).filter(([, v]) => v).map(([k, v]) => `${CODE[v]} ${t("win")} ${t("cat_" + k)}`) : [];
  $("daily").textContent = `${t("yesterday")}: ${parts.join(", ")}`;
  $("daily").classList.toggle("hidden", !parts.length);
  $("campuses").replaceChildren(...[...new Set((stats?.campuses || []).map((x) => x.name))].map((n) => Object.assign(h("option"), { value: n })));
}

const sleepLabel = (v) => t("sl_" + Math.min(4, Math.max(0, Math.round(v))));
const MX = [
  ["n", (v) => fmt(v)],
  ["pages", (v) => fmt(v)],
  ["avg_revisions", (v) => v.toFixed(1)],
  ["avg_sleep", sleepLabel],
  ["avg_reply", (v) => `${v.toFixed(1)} ${t("unit_days")}`],
  ["avg_pace", (v) => `${Math.round(v)} ${t("unit_dch")}`],
];
const MX_F = Object.fromEntries(MX);
const arena = { tab: "negara", metric: "n", cmetric: "n", filter: "all", mode: "country", a: "ID", b: "IN" };

function pills(el, items, on, pick) {
  el.replaceChildren(...items.map(([key, label]) => {
    const b = h("button", "pill shadow-drop", label);
    b.type = "button";
    b.setAttribute("aria-pressed", String(key === on));
    b.addEventListener("click", () => pick(key));
    return b;
  }));
}

function skeletonRows(el, n = 5) {
  el.replaceChildren(...Array.from({ length: n }, () => h("li", "skeleton my-2 h-12 rounded-2xl")));
}

function leagueRow(rank, code, color, name, sub, value, share, mine) {
  const li = stagger(h("li", "-mx-2 flex min-h-16 items-center gap-3 rounded-2xl border-b border-line px-2 py-2 transition duration-200 last:border-0 hover:bg-cloud/60 " + (mine ? "border-0 bg-glow hover:bg-glow" : "")), rank - 1);
  const tile = h("span", "team h-8 w-12 rounded-xl", code);
  tile.style.background = color;
  const mid = h("div", "grid min-w-0 flex-1 gap-1.5"), track = h("div", "h-2 rounded-full bg-cloud"), fill = h("div", "h-2 origin-left animate-grow rounded-full");
  fill.style.width = Math.max(4, share) + "%";
  fill.style.background = TEAM_BAR[code === "OTH" ? "OT" : Object.keys(CODE).find((k) => CODE[k] === code)] || color;
  track.append(fill);
  const nm = h("span", "truncate text-[15px] font-extrabold", name);
  if (sub) nm.append(h("span", "font-semibold text-slate", ` · ${sub}`));
  mid.append(nm, track);
  li.append(h("span", "w-7 font-display text-2xl font-extrabold", String(rank)), tile, mid, h("b", "shrink-0 text-right tabular-nums", value));
  return li;
}

function renderCountryLeague() {
  const c = stats?.countries || {}, mine = store.get("team");
  pills($("metric-country"), MX.map(([k]) => [k, t("m_" + k)]), arena.metric, (k) => ((arena.metric = k), renderArena()));
  $("metric-country-label").textContent = t("m_" + arena.metric);
  if (stats === undefined) return skeletonRows($("league-country"));
  const rows = TEAMS.map((k) => ({ k, v: c[k]?.[arena.metric] })).sort((a, b) => (b.v ?? -1) - (a.v ?? -1));
  const max = Math.max(1e-9, ...rows.map((r) => r.v ?? 0));
  $("league-country").replaceChildren(...rows.map((r, i) => leagueRow(i + 1, CODE[r.k], TEAM[r.k], countryName(r.k), r.k === mine ? t("yours") : c[r.k] ? `${fmt(c[r.k].n)} ${t("runners")}` : t("no_data"), r.v == null ? "–" : MX_F[arena.metric](r.v), ((r.v ?? 0) / max) * 100, r.k === mine)));
  const w = stats?.daily?.winners;
  const parts = w ? Object.entries(w).filter(([, v]) => v).map(([k, v]) => `${CODE[v]} ${t("win")} ${t("cat_" + k)}`) : [];
  $("daily").textContent = parts.join(" · ");
  $("daily-box").classList.toggle("hidden", !parts.length);
  $("cta-team").lastChild.textContent = mine && TEAMS.includes(mine) ? t("cta_team", { team: countryName(mine) }) : t("cta_any");
}

function renderCampusLeague() {
  const all = stats?.campuses || [];
  pills($("filter-campus"), [["all", t("all")], ...COUNTRIES.map((k) => [k, CODE[k]])], arena.filter, (k) => ((arena.filter = k), renderArena()));
  pills($("metric-campus"), MX.map(([k]) => [k, t("m_" + k)]), arena.cmetric, (k) => ((arena.cmetric = k), renderArena()));
  if (stats === undefined) return skeletonRows($("league-campus"), 4);
  const list = all.filter((x) => arena.filter === "all" || x.country === arena.filter).sort((a, b) => (b[arena.cmetric] ?? -1) - (a[arena.cmetric] ?? -1));
  const max = Math.max(1e-9, ...list.map((x) => x[arena.cmetric] ?? 0));
  const myCampus = (store.get("campus") || "").toLowerCase();
  $("league-campus").replaceChildren(...list.map((x, i) => leagueRow(i + 1, CODE[x.country], TEAM[x.country], x.name, `${fmt(x.n)} ${t("runners")}`, x[arena.cmetric] == null ? "–" : MX_F[arena.cmetric](x[arena.cmetric]), ((x[arena.cmetric] ?? 0) / max) * 100, myCampus && x.name.toLowerCase() === myCampus)));
  $("league-campus").classList.toggle("hidden", !list.length);
  $("no-campus").classList.toggle("hidden", list.length > 0);
}

function cmpOptions() {
  if (arena.mode === "country") return COUNTRIES.map((k) => ({ id: k, name: countryName(k), country: k, data: stats?.countries?.[k] }));
  return (stats?.campuses || []).map((x) => ({ id: `${x.country}:${x.name}`, name: x.name, country: x.country, data: x }));
}

function writeHash() {
  history.replaceState(null, "", `#compare/${arena.mode}/${encodeURIComponent(arena.a)}/${encodeURIComponent(arena.b)}`);
}

function renderCompare() {
  const opts = cmpOptions();
  pills($("cmp-mode"), [["country", t("mode_country")], ["campus", t("mode_campus")]], arena.mode, (m) => {
    arena.mode = m;
    const o = cmpOptions();
    arena.a = o[0]?.id ?? "";
    arena.b = o[1]?.id ?? "";
    writeHash();
    renderArena();
  });
  for (const b of $("cmp-mode").children) b.classList.remove("shadow-drop");
  const byId = Object.fromEntries(opts.map((o) => [o.id, o]));
  if (!byId[arena.a]) arena.a = opts[0]?.id ?? "";
  if (!byId[arena.b] || arena.b === arena.a) arena.b = opts.find((o) => o.id !== arena.a)?.id ?? "";
  const A = byId[arena.a], B = byId[arena.b];
  const ok = !!(A && B);
  for (const [side, o, sel] of [["a", A, $("sel-a")], ["b", B, $("sel-b")]]) {
    $(`cmp-${side}`).style.background = o ? TEAM[o.country] : C.cloud;
    $(`cmp-${side}-code`).textContent = o ? CODE[o.country] : "–";
    $(`cmp-${side}-name`).textContent = o ? o.name : "–";
    sel.replaceChildren(...opts.map((x) => Object.assign(h("option", "", arena.mode === "country" ? x.name : `${x.name} · ${CODE[x.country]}`), { value: x.id, selected: x.id === arena[side] })));
    sel.disabled = !ok;
  }
  const quick = arena.mode === "country" ? [["ID", "IN"], ["ID", "JP"], ["CN", "US"], ["IN", "CN"], ["JP", "US"]] : opts.length >= 2 ? [[0, 1], [0, 2], [1, 2]].filter(([i, j]) => opts[i] && opts[j]).map(([i, j]) => [opts[i].id, opts[j].id]) : [];
  $("cmp-quick").replaceChildren(...quick.map(([a, b]) => {
    const on = (arena.a === a && arena.b === b) || (arena.a === b && arena.b === a);
    const lbl = arena.mode === "country" ? `${CODE[a]} vs ${CODE[b]}` : `${byId[a].name} vs ${byId[b].name}`;
    const btn = h("button", "pill shadow-drop", lbl);
    btn.type = "button";
    btn.setAttribute("aria-pressed", String(on));
    btn.addEventListener("click", () => {
      arena.a = a;
      arena.b = b;
      writeHash();
      renderArena();
    });
    return btn;
  }));
  let sa = 0, sb = 0;
  if (stats === undefined) return $("cmp-rows").replaceChildren(...MX.map(() => h("li", "skeleton h-20")));
  $("cmp-rows").replaceChildren(...(ok ? MX : []).map(([k, f], i) => {
    const va = A.data?.[k], vb = B.data?.[k];
    const li = stagger(h("li", "card grid gap-2 transition duration-200 hover:-translate-y-0.5 hover:shadow-drop"), i);
    const top = h("div", "flex items-center justify-between gap-2");
    const val = (v, o, win) => {
      const s = h("b", "rounded-full px-2.5 py-0.5 tabular-nums", v == null ? "–" : f(v));
      if (win) s.style.background = TEAM[o.country];
      return s;
    };
    const wa = va != null && vb != null && va > vb, wb = va != null && vb != null && vb > va;
    sa += wa;
    sb += wb;
    top.append(val(va, A, wa), h("span", "text-center text-sm font-extrabold", t("m_" + k)), val(vb, B, wb));
    const bar = h("div", "flex h-3.5 origin-center animate-grow gap-1 overflow-hidden rounded-full"), l = h("div", "rounded-full"), r = h("div", "rounded-full");
    const total = (va ?? 0) + (vb ?? 0), share = total ? ((va ?? 0) / total) * 100 : 50;
    l.style.flex = String(share);
    r.style.flex = String(100 - share);
    l.style.background = va == null ? C.cloud : TEAM_BAR[A.country];
    r.style.background = vb == null ? C.cloud : TEAM_BAR[B.country];
    bar.append(l, r);
    li.append(top, bar);
    return li;
  }));
  $("cmp-score").textContent = ok ? `${sa}–${sb}` : "";
  $("cmp-note").textContent = ok ? t(arena.mode === "country" ? "cmp_note_country" : "cmp_note_campus") : t("cmp_empty");
  $("cmp-share").lastChild.textContent = ok ? t("cmp_share", { a: arena.mode === "country" ? CODE[A.country] : A.name, b: arena.mode === "country" ? CODE[B.country] : B.name }) : t("cmp_share", { a: "A", b: "B" });
  $("cmp-share").disabled = !ok;
}

function renderPersonal() {
  const me = store.get("me");
  $("duel-share").lastChild.textContent = me ? t("duel_btn") : t("duel_start");
  const duels = store.json("duels", []);
  $("duel-list").replaceChildren(...duels.map((d, i) => {
    const code = CODE[d.c] || "OTH";
    return leagueRow(i + 1, code, TEAM[d.c] || C.cloud, String(d.n || "Runner").slice(0, 20), `${t("match")} ${Number(d.m) || 0}`, `${Number(d.a) || 0}–${Number(d.b) || 0}`, 0, false);
  }));
  $("duel-list").classList.toggle("hidden", !duels.length);
  $("duel-empty").classList.toggle("hidden", duels.length > 0);
}

function setTab(tab) {
  arena.tab = tab;
  for (const b of document.querySelectorAll("[data-tab]")) b.setAttribute("aria-selected", String(b.dataset.tab === tab));
  for (const p of ["negara", "kampus", "compare", "personal"]) {
    $("p-" + p).classList.toggle("hidden", p !== tab);
    $("p-" + p).classList.toggle("grid", p === tab);
  }
}

function readHash() {
  const [tab, mode, a, b] = location.hash.slice(1).split("/").map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return "";
    }
  });
  if (["negara", "kampus", "compare", "personal"].includes(tab)) arena.tab = tab;
  if (tab === "compare" && ["country", "campus"].includes(mode)) {
    arena.mode = mode;
    if (a) arena.a = a.slice(0, 80);
    if (b) arena.b = b.slice(0, 80);
  }
}

function renderArena() {
  setTab(arena.tab);
  renderCountryLeague();
  renderCampusLeague();
  renderCompare();
  renderPersonal();
}

function initArena() {
  readHash();
  $("arena-art").append(scene(390, 250, [
    ["cloud", 280, 30, 1, 0.7], ["star", 190, 30, 0.8], ["star", 30, 60, 0.8, C.star],
    ["raw", sv("path", { d: "M0 236 C120 214 270 214 390 236 L390 250 L0 250 Z", fill: C.skyDeep })],
    ["fig", "run", 1, 40, 80, 1, false], ["fig", "run", 2, 180, 86, 0.95, false],
    ["raw", sv("rect", { x: 350, y: 106, width: 4, height: 120, fill: C.night })],
    ["raw", sv("path", { d: "M354 108 h28 v22 h-28 Z", fill: C.white })],
  ]));
  $("duel-art").append(scene(390, 220, [
    ["star", 60, 30, 0.8], ["star", 340, 50, 1],
    ["raw", burst(C.butter, "", 12)],
    ["fig", "lunge", 0, 20, 60, 1.15, false], ["fig", "lunge", 4, 370, 60, 1.15, true],
  ]));
  const b = $("duel-art").querySelector("svg svg");
  if (b) Object.entries({ x: 160, y: 60, width: 70, height: 70 }).forEach(([k, v]) => b.setAttribute(k, v));
  for (const btn of document.querySelectorAll("[data-tab]"))
    btn.addEventListener("click", () => {
      setTab(btn.dataset.tab);
      history.replaceState(null, "", btn.dataset.tab === "compare" ? `#compare/${arena.mode}/${encodeURIComponent(arena.a)}/${encodeURIComponent(arena.b)}` : "#" + btn.dataset.tab);
    });
  document.querySelector("[role=tablist]").addEventListener("keydown", (e) => {
    const tabs = [...document.querySelectorAll("[data-tab]")], i = tabs.findIndex((x) => x.dataset.tab === arena.tab);
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const nx = tabs[(i + d + tabs.length) % tabs.length];
    nx.focus();
    nx.click();
  });
  for (const a of document.querySelectorAll("[data-goto]"))
    a.addEventListener("click", (e) => {
      e.preventDefault();
      arena.tab = a.dataset.goto;
      writeHash();
      renderArena();
      scrollTo({ top: 0 });
    });
  $("sel-a").addEventListener("change", (e) => {
    arena.a = e.target.value;
    if (arena.a === arena.b) arena.b = cmpOptions().find((o) => o.id !== arena.a)?.id ?? "";
    writeHash();
    renderArena();
  });
  $("sel-b").addEventListener("change", (e) => {
    arena.b = e.target.value;
    if (arena.a === arena.b) arena.a = cmpOptions().find((o) => o.id !== arena.b)?.id ?? "";
    writeHash();
    renderArena();
  });
  $("swap").addEventListener("click", () => {
    [arena.a, arena.b] = [arena.b, arena.a];
    writeHash();
    renderArena();
  });
  $("cmp-share").addEventListener("click", () => {
    writeHash();
    shareLink(location.href, "ThesiRun Arena", $("cmp-msg"));
  });
  $("duel-share").addEventListener("click", () => {
    const me = store.get("me");
    if (!me) return (location.href = "/#run");
    shareLink(me, t("pacer_text"), $("duel-msg"));
  });
  addEventListener("hashchange", () => {
    readHash();
    renderArena();
  });
}

function render() {
  applyI18n();
  if (pacer && $("pacer-banner")) $("pacer-banner").textContent = t("pacer_invite", { name: pacer.name });
  if ($("league")) renderLanding();
  if ($("p-negara")) renderArena();
}

$("lang")?.addEventListener("click", () => {
  lang = lang === "id" ? "en" : "id";
  store.set("lang", lang);
  render();
  if (run && !$("result")?.classList.contains("hidden")) drawResult();
});

if ($("form")) {
  pacer = readPacer();
  $("hero-art").append(scene(390, 340, HERO));
  buildForm();
  for (const b of document.querySelectorAll("[data-sample]"))
    b.addEventListener("click", () => {
      run = sampleRun();
      openStory();
    });
  $("campus").addEventListener("change", (e) => store.set("campus", e.target.value.trim().slice(0, 60)));
  $("share-card").addEventListener("click", (e) => shareCanvas($("card"), "thesirun.png", e.currentTarget));
  $("share-duo").addEventListener("click", (e) => shareCanvas($("duo"), "thesirun-duel.png", e.currentTarget));
  $("pacer").addEventListener("click", () => shareLink(pacerUrl(run), t("pacer_text"), $("pacer-msg")));
  $("replay").addEventListener("click", openStory);
  $("close").addEventListener("click", closeStory);
  $("prev").addEventListener("click", () => show(idx - 1));
  $("next").addEventListener("click", next);
  $("slide").addEventListener("click", (e) => {
    if (e.target.closest("button, a")) return;
    const f = $("frame").getBoundingClientRect();
    e.clientX - f.left < f.width / 3 ? show(idx - 1) : next();
  });
  document.addEventListener("keydown", (e) => {
    if ($("story").hidden) return;
    if (["ArrowRight", "ArrowDown"].includes(e.key)) next();
    else if (["ArrowLeft", "ArrowUp"].includes(e.key)) show(idx - 1);
    else if (e.key === "Escape") closeStory();
    else return;
    e.preventDefault();
  });
  if (pacer) {
    $("pacer-banner").classList.remove("hidden");
    $("run").scrollIntoView();
  }
}

if ($("p-negara")) initArena();

hydrate();
render();
if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
loadStats().then(render);
