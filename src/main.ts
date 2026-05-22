import incidentData from './lib/data/index.js';

document.addEventListener('DOMContentLoaded', () => {
  renderSummary(incidentData.summary);
  renderVectors(incidentData.vectors);
  renderTimeline(incidentData.timeline);
  renderMitigation(incidentData.mitigation);
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
