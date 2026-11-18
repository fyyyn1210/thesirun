// Server data is rendered with textContent only (§11: no innerHTML for server data).
fetch("/api/stats")
  .then((r) => r.json())
  .then((s) => {
    for (const c of ["ID", "IN"]) {
      document.getElementById("n-" + c).textContent = s.countries[c]?.n ?? 0;
    }
  })
  .catch(() => {});
