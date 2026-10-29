const root = document.getElementById('root');

function readBalance() {
  try {
    return window.PK96 && typeof window.PK96.getBalance === 'function'
      ? Number(window.PK96.getBalance()) || 0
      : 0;
  } catch {
    return 0;
  }
}

function render() {
  if (!root) return;
  root.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at top,#17385d,#07111e 65%);font-family:Montserrat,Arial,sans-serif;color:#fff;text-align:center">
      <section style="width:min(560px,100%);padding:32px;border:1px solid rgba(255,255,255,.18);border-radius:20px;background:rgba(8,20,35,.92);box-shadow:0 18px 60px rgba(0,0,0,.35)">
        <h1 style="margin:0 0 10px;font-size:clamp(28px,6vw,46px)">Penalty Nations Cup</h1>
        <p style="margin:0 0 24px;color:#b8c8d9">Game loaded successfully</p>
        <div style="display:inline-flex;gap:10px;align-items:center;padding:12px 18px;border-radius:12px;background:#102a46;color:#dcecff;font-weight:700">Lobby balance: <strong id="game-balance">0</strong></div>
        <button id="start-game" type="button" style="display:block;margin:26px auto 0;padding:13px 28px;border:0;border-radius:10px;background:#e41827;color:#fff;font-weight:800;cursor:pointer">Start Game</button>
        <p id="game-status" style="min-height:24px;margin:18px 0 0;color:#a9bfd2"></p>
      </section>
    </main>`;
  const balance = document.getElementById('game-balance');
  const status = document.getElementById('game-status');
  const refresh = () => { if (balance) balance.textContent = String(readBalance()); };
  refresh();
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'PK96_BALANCE_UPDATE') refresh();
  });
  document.getElementById('start-game')?.addEventListener('click', () => {
    refresh();
    if (status) status.textContent = 'Ready to play with your lobby balance.';
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
else render();
