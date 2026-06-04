import incidentData from './lib/data/index.js';

declare const Chart: any;

document.addEventListener('DOMContentLoaded', () => {
  renderSummary(incidentData.summary);
  renderVectors(incidentData.vectors);
  renderTimeline(incidentData.timeline);
  renderMitigation(incidentData.mitigation);
  renderChart();
  startTerminals();
});

function createDataRow(label: string, value: string): string {
  return `
    <div class="data-row">
      <span class="data-label">${label}</span>
      <span class="data-value">${value}</span>
    </div>
  `;
}

function renderSummary(summary: any) {
  const container = document.getElementById('summary-content');
  if (!container) return;

  container.innerHTML = `
    ${createDataRow('VULNERABILITY', summary.vulnerability_type)}
    ${createDataRow('TARGET COMPONENT', summary.component)}
    ${createDataRow('DISCOVERER', summary.discoverer)}
    ${createDataRow('BOUNTY AWARDED', summary.bounty)}
    <div style="margin-top: 1rem; color: var(--text-dim); line-height: 1.5;">
      > ${summary.summary}
    </div>
  `;
}

function renderVectors(vectors: any[]) {
  const container = document.getElementById('vectors-content');
  if (!container) return;

  let html = '';
  vectors.forEach(v => {
    html += `
      <div class="vector-card severity-${v.severity}">
        <div class="vector-title">[${v.severity.toUpperCase()}] ${v.vector}</div>
        <div class="vector-desc">${v.description}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderTimeline(timeline: any[]) {
  const container = document.getElementById('timeline-content');
  if (!container) return;

  let html = '';
  timeline.forEach(t => {
    html += `
      <div class="timeline-item">
        <div class="timeline-date">${t.date}</div>
        <div class="timeline-event">${t.event}</div>
        <div class="timeline-details">${t.details}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderMitigation(mit: any) {
  const container = document.getElementById('mitigation-content');
  if (!container) return;

  container.innerHTML = `
    ${createDataRow('PATCH STATUS', `<span style="color: #10b981;">${mit.patch_status}</span>`)}
    ${createDataRow('DELIVERY METHOD', mit.patch_method)}
    <div style="margin-top: 1rem; color: var(--text-dim); line-height: 1.5;">
      <strong>System Hardening:</strong> ${mit.system_hardening}
    </div>
    <div style="margin-top: 1rem; color: #fbbf24; line-height: 1.5;">
      <strong>Recommendation:</strong> ${mit.recommendation_for_users}
    </div>
  `;
}

function renderChart() {
  const ctx = document.getElementById('cvssChart') as HTMLCanvasElement;
  if (!ctx) return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Attack Vector', 'Complexity', 'Privileges Required', 'User Interaction', 'Scope', 'Confidentiality', 'Integrity', 'Availability'],
      datasets: [{
        label: 'CVSS v3.1 Metrics',
        data: [8, 7, 9, 10, 5, 10, 10, 10], // Simulated severity metrics
        backgroundColor: 'rgba(227, 25, 55, 0.2)',
        borderColor: '#E31937',
        pointBackgroundColor: '#00f3ff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00f3ff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: { color: '#94a3b8', font: { family: 'Fira Code', size: 10 } },
          ticks: { display: false, max: 10, min: 0 }
        }
      },
      plugins: {
        legend: { labels: { color: '#e2e8f0', font: { family: 'Inter' } } }
      }
    }
  });
}

function startTerminals() {
  const redLogs = [
    "[*] Targeting Baseband MAC: 9C:43:1E:XX:XX:XX",
    "[*] Crafting malicious L2CAP ping packet...",
    "    [>] Injecting fragment 1/3...",
    "    [>] Injecting fragment 2/3...",
    "    [>] Injecting fragment 3/3...",
    "[+] Heap Buffer Overflow triggered successfully!",
    "[*] Pivoting to Out-of-Bounds Write...",
    "[$$$] ROOT SHELL OBTAINED!"
  ];

  const blueLogs = [
    "[*] Starting L2CAP traffic monitoring on hci0...",
    "    [OK] Normal ping packet received (Size: 45 bytes)",
    "    [OK] Normal ping packet received (Size: 62 bytes)",
    "[!] WARNING: Anomalous traffic detected!",
    "    [>] Source: Unknown | Protocol: L2CAP | Size: 1028 bytes",
    "    [>] Signature Match: HEAP_OVERFLOW_CVE-2023-32157",
    "[X] MALICIOUS PAYLOAD INTERCEPTED",
    "[*] Dropping packet and blacklisting MAC...",
    "[+] Defense successful. System secured."
  ];

  const redContainer = document.getElementById("red-terminal-body");
  const blueContainer = document.getElementById("blue-terminal-body");

  if (!redContainer || !blueContainer) return;

  let redIndex = 0;
  let blueIndex = 0;

  function typeLine(container: HTMLElement, text: string) {
    const el = document.createElement("div");
    el.className = "log-line";
    el.textContent = text;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  const redInterval = setInterval(() => {
    if (redIndex < redLogs.length) {
      typeLine(redContainer, redLogs[redIndex]);
      redIndex++;
    } else {
      clearInterval(redInterval);
    }
  }, 1000);

  setTimeout(() => {
    const blueInterval = setInterval(() => {
      if (blueIndex < blueLogs.length) {
        typeLine(blueContainer, blueLogs[blueIndex]);
        blueIndex++;
      } else {
        clearInterval(blueInterval);
      }
    }, 900);
  }, 500);
}