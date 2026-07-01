import { sleep } from '@/lib/sleep';

export const instant = false;

const REPORT_ROWS = [
  { country: 'United States', sessions: 84_203, bounce: '38%', duration: '3m 12s' },
  { country: 'United Kingdom', sessions: 31_540, bounce: '42%', duration: '2m 47s' },
  { country: 'Germany', sessions: 18_921, bounce: '35%', duration: '4m 01s' },
  { country: 'Japan', sessions: 14_382, bounce: '29%', duration: '5m 18s' },
  { country: 'Canada', sessions: 12_087, bounce: '41%', duration: '2m 55s' },
];

async function getReport() {
  await sleep(2000);
  return { rows: REPORT_ROWS, generatedAt: new Date().toLocaleString() };
}

export default async function BlockingPage() {
  const report = await getReport();

  return (
    <>
      <div className="badge blocking">⏳ Blocking Navigation</div>
      <h1>Analytics Report</h1>
      <p>
        This page exports <code>instant = false</code>, which opts out of
        instant navigation enforcement. The browser waits the full 2 seconds
        before the page appears — no shell is shown during the wait.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 32 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #2a2a2a', textAlign: 'left' }}>
            <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600, fontSize: 13 }}>Country</th>
            <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600, fontSize: 13 }}>Sessions</th>
            <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600, fontSize: 13 }}>Bounce</th>
            <th style={{ padding: '8px 12px', color: '#888', fontWeight: 600, fontSize: 13 }}>Avg Duration</th>
          </tr>
        </thead>
        <tbody>
          {report.rows.map(row => (
            <tr key={row.country} style={{ borderBottom: '1px solid #1f1f1f' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>{row.country}</td>
              <td style={{ padding: '12px', color: '#aaa' }}>{row.sessions.toLocaleString()}</td>
              <td style={{ padding: '12px', color: '#aaa' }}>{row.bounce}</td>
              <td style={{ padding: '12px', color: '#aaa' }}>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="meta-note">
        <strong>Report generated:</strong> {report.generatedAt}. Notice the
        timestamp changes on every navigation — no caching, full server
        round trip each time. Use blocking sparingly (e.g. content-driven
        pages where a loading shell feels jarring).
      </p>
    </>
  );
}
