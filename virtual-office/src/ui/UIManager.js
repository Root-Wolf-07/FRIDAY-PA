export class UIManager {
  constructor(roomData, onSelectRoom, onToggleCamMode, onToggleLight, onResetView) {
    this.roomData = roomData;
    this.onSelectRoom = onSelectRoom;
    this.onToggleCamMode = onToggleCamMode;
    this.onToggleLight = onToggleLight;
    this.onResetView = onResetView;

    this.bindEvents();
  }

  bindEvents() {
    // Room Pills
    document.querySelectorAll('.nav-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const roomId = pill.getAttribute('data-room');
        this.onSelectRoom(roomId);
      });
    });

    // Camera Mode Toggle
    const btnCam = document.getElementById('btnToggleCamMode');
    if (btnCam) {
      btnCam.addEventListener('click', () => this.onToggleCamMode());
    }

    // Light Toggle
    const btnLight = document.getElementById('btnToggleLight');
    if (btnLight) {
      btnLight.addEventListener('click', () => this.onToggleLight());
    }

    // Reset View
    const btnReset = document.getElementById('btnResetView');
    if (btnReset) {
      btnReset.addEventListener('click', () => this.onResetView());
    }

    // Close Dossier
    const btnClose = document.getElementById('btnCloseDossier');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        const card = document.getElementById('roomDossierCard');
        if (card) card.classList.remove('visible');
      });
    }
  }

  updatePills(activeId) {
    document.querySelectorAll('.nav-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-room') === activeId);
    });
  }

  showDossier(data) {
    const card = document.getElementById('roomDossierCard');
    if (!card) return;

    document.getElementById('dossierZoneTag').textContent = data.zone;
    document.getElementById('dossierTitle').textContent = data.name;
    document.getElementById('dossierDesc').textContent = data.desc;

    const grid = document.getElementById('dossierSpecsGrid');
    grid.innerHTML = data.kpis.map(k => `
      <div class="dossier-spec-box">
        <div class="spec-box-lbl">${k.label}</div>
        <div class="spec-box-val">${k.val}</div>
      </div>
    `).join('');

    document.getElementById('dossierPctVal').textContent = `${data.progress}%`;
    document.getElementById('dossierBarFill').style.width = `${data.progress}%`;

    card.classList.add('visible');
  }

  updateMinimap(camera) {
    const canvas = document.getElementById('minimapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#060c16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.fillRect(14, 14, 45, 35); // Master
    ctx.fillRect(90, 14, 45, 35); // Alpha
    ctx.fillRect(14, 60, 38, 35); // Beta
    ctx.fillRect(56, 60, 38, 35); // Gamma
    ctx.fillRect(98, 60, 38, 35); // Delta

    const cx = (camera.position.x / 48 + 0.5) * (canvas.width - 20) + 10;
    const cz = (camera.position.z / 36 + 0.5) * (canvas.height - 20) + 10;

    ctx.fillStyle = '#00ff9d';
    ctx.beginPath();
    ctx.arc(cx, cz, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
