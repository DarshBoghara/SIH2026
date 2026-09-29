/* ═══════════════════════════════════════════════════════════════
   BioSync — Master Motion System & Interactivity Script
   Smart India Hackathon 2026 — Problem Statement 26139
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursorGlow();
  initScrollProgress();
  initNav();
  initBackgroundCanvas();
  initHeroMotion();
  initScrollReveal();
  initMolecularMotion();
  initDataJourney();
  initArchitectureMotion();
  initQuantumLabMotion();
  initShapMotion();
  initSimulationWorkstation();
  initStatCounters();
  initInnovationStack();
  initGalleryLightbox();
  initScrollSpy();
  initPhysicalCards();
});

/* ── 1. BioSync Loading Sequence (1.0–1.2s Max) ── */
function initLoader() {
  const loader = document.getElementById('biosync-loader');
  const progressBar = document.getElementById('loader-progress-bar');
  const statusText = document.getElementById('loader-status-text');

  if (!loader) return;

  const startTime = performance.now();
  const duration = 1100; // ms

  function updateLoader(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = Math.min(1, Math.pow(progress, 1.4)); // smooth acceleration

    if (progressBar) {
      progressBar.style.width = `${(ease * 100).toFixed(1)}%`;
    }

    if (statusText) {
      if (progress > 0.65) {
        statusText.textContent = 'QUANTUM–CLASSICAL PIPELINE READY';
      } else if (progress > 0.3) {
        statusText.textContent = 'HYBRID ENGINE INITIALIZING';
      }
    }

    if (progress < 1) {
      requestAnimationFrame(updateLoader);
    } else {
      setTimeout(() => {
        loader.classList.add('loader-hidden');
      }, 100);
    }
  }

  requestAnimationFrame(updateLoader);
}

/* ── 2. Ambient Desktop Cursor Glow (Lerp Interpolation) ── */
function initCursorGlow() {
  const glow = document.getElementById('cursor-ambient-glow');
  if (!glow) return;

  // Check if touch or reduced motion
  const isTouch = window.matchMedia('(hover: none), (max-width: 900px)').matches;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || isReduced) return;

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;
  let isMoving = false;

  window.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      glow.classList.add('active');
    }
  }, { passive: true });

  function renderGlow() {
    // Smooth lerp: 8% per frame
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    glow.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderGlow);
  }

  requestAnimationFrame(renderGlow);
}

/* ── 3. Top Scroll Progress (2px) & Floating Button ── */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const topBtn = document.getElementById('floating-top-btn');

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (topBtn) {
      if (scrollTop > 450) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ── 4. Mobile Navigation Drawer ── */
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Executive Dropdown click toggle & accessibility
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = trigger.closest('.nav-has-dropdown');
      if (!parent) return;
      const wasOpen = parent.classList.contains('open');

      document.querySelectorAll('.nav-has-dropdown.open').forEach(d => {
        if (d !== parent) {
          d.classList.remove('open');
          const t = d.querySelector('.nav-dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      parent.classList.toggle('open', !wasOpen);
      trigger.setAttribute('aria-expanded', !wasOpen);
    });
  });

  // Close dropdowns on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-has-dropdown')) {
      document.querySelectorAll('.nav-has-dropdown.open').forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ── 5. Ambient Quantum Network Canvas ── */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 42000), 32);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.5 + 0.8,
      color: i % 3 === 0 ? 'rgba(5, 150, 105, ' : i % 3 === 1 ? 'rgba(13, 148, 136, ' : 'rgba(16, 185, 129, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}0.4)`;
      ctx.fill();

      // Brief synaptic lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(148, 163, 184, ${(0.1 * (1 - dist / 130)).toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery.matches) {
    render();
  }
}

/* ── 6. HERO MOTION: HYBRID ENGINE & SYNC PULSE (WOW #1) ── */
function initHeroMotion() {
  const orbitSystem = document.getElementById('orbit-system');
  const stage = document.getElementById('hero-interactive-stage');
  const connectorsGroup = document.getElementById('engine-connectors');
  const photonsGroup = document.getElementById('engine-photons');
  const monitorVal = document.getElementById('monitor-stage-name');
  const activePhaseLabel = document.getElementById('orbit-active-phase');
  const pipelineStatusText = document.getElementById('hero-pipeline-status');

  if (!orbitSystem) return;

  const nodes = orbitSystem.querySelectorAll('.orbit-node');
  const count = nodes.length;
  const radiusPercent = 42;
  const nodePositions = [];

  // Distribute 7 nodes around 360 deg
  nodes.forEach((node, idx) => {
    const angleDeg = idx * (360 / count) - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const xPct = 50 + radiusPercent * Math.cos(angleRad);
    const yPct = 50 + radiusPercent * Math.sin(angleRad);

    node.style.left = `${xPct.toFixed(2)}%`;
    node.style.top = `${yPct.toFixed(2)}%`;

    const svgX = 260 + (radiusPercent * 5.2) * Math.cos(angleRad);
    const svgY = 260 + (radiusPercent * 5.2) * Math.sin(angleRad);
    nodePositions.push({ x: svgX, y: svgY, node: node });
  });

  // Render SVG connecting paths
  if (connectorsGroup) {
    connectorsGroup.innerHTML = '';
    nodePositions.forEach((pos, idx) => {
      // Radial connection from center (260, 260)
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '260');
      line.setAttribute('y1', '260');
      line.setAttribute('x2', pos.x.toFixed(1));
      line.setAttribute('y2', pos.y.toFixed(1));
      line.setAttribute('stroke', 'rgba(37, 99, 235, 0.25)');
      line.setAttribute('stroke-width', '1.2');
      line.setAttribute('stroke-dasharray', '3 4');
      connectorsGroup.appendChild(line);

      // Peripheral connection between consecutive nodes
      const nextPos = nodePositions[(idx + 1) % nodePositions.length];
      const ringLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ringLine.setAttribute('x1', pos.x.toFixed(1));
      ringLine.setAttribute('y1', pos.y.toFixed(1));
      ringLine.setAttribute('x2', nextPos.x.toFixed(1));
      ringLine.setAttribute('y2', nextPos.y.toFixed(1));
      ringLine.setAttribute('stroke', 'rgba(226, 232, 240, 0.8)');
      ringLine.setAttribute('stroke-width', '1');
      connectorsGroup.appendChild(ringLine);
    });
  }

  // 9-Step Computational Data Cycle
  const sequenceSteps = [
    {
      activeNode: 0,
      phase: 'STAGE 01',
      status: '1. Ingesting Multi-Omic & Clinical Streams',
      pipeline: 'INGESTION ACTIVE'
    },
    {
      activeNode: 1,
      phase: 'STAGE 02',
      status: '2. Preprocessing: Imputation & Filtering',
      pipeline: 'PREPROCESSING'
    },
    {
      activeNode: 1,
      phase: 'STAGE 03',
      status: '3. Data Compression: PCA Orthogonal Reduction',
      pipeline: 'PCA COMPRESSION'
    },
    {
      activeNode: 2,
      phase: 'STAGE 04',
      status: '4. Quantum Feature Mapping: Angle Encoding',
      pipeline: 'HILBERT MAPPING'
    },
    {
      activeNode: 2,
      phase: 'STAGE 05',
      status: '5. Quantum Circuit Execution: Parameterized Ansatz',
      pipeline: 'VQC / QNN / QSVM'
    },
    {
      activeNode: 3,
      phase: 'STAGE 06',
      status: '6. Classical Benchmarking: SVM, RF, XGBoost',
      pipeline: 'EMPIRICAL BENCHMARK'
    },
    {
      activeNode: 4,
      phase: 'STAGE 07',
      status: '7. SHAP Attribution: Feature Importance',
      pipeline: 'EXPLAINABILITY'
    },
    {
      activeNode: 5,
      phase: 'STAGE 08',
      status: '8. Calibrated Risk Stratification & Tiers',
      pipeline: 'DECISION SUPPORT'
    },
    {
      activeNode: 6,
      phase: 'STAGE 09',
      status: '9. System Synchronized: Continuous Biological Loop',
      pipeline: 'SYSTEM SYNCHRONIZED'
    }
  ];

  let currentStepIdx = 0;
  let isUserHovering = false;

  function runSequenceStep() {
    if (isUserHovering) return;

    const step = sequenceSteps[currentStepIdx];

    nodes.forEach((node, idx) => {
      if (idx === step.activeNode) {
        node.classList.add('active-stage');
      } else {
        node.classList.remove('active-stage');
      }
    });

    if (monitorVal) monitorVal.textContent = step.status;
    if (activePhaseLabel) activePhaseLabel.textContent = step.phase;
    if (pipelineStatusText) pipelineStatusText.textContent = step.pipeline;

    emitPhotonToNode(step.activeNode);

    currentStepIdx = (currentStepIdx + 1) % sequenceSteps.length;
  }

  // Slow, subtle, organic photon travel along connection path
  function emitPhotonToNode(nodeIdx) {
    if (!photonsGroup || !nodePositions[nodeIdx]) return;
    const target = nodePositions[nodeIdx];

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '260');
    circle.setAttribute('cy', '260');
    circle.setAttribute('r', '3');
    circle.setAttribute('fill', '#2563EB');
    circle.setAttribute('filter', 'url(#glow-filter)');
    photonsGroup.appendChild(circle);

    const startTime = performance.now();
    const duration = 1000; // slow, intentional

    function animatePhoton(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Gentle scientific ease-out
      const ease = 1 - Math.pow(1 - progress, 2.5);

      const curX = 260 + (target.x - 260) * ease;
      const curY = 260 + (target.y - 260) * ease;

      circle.setAttribute('cx', curX.toFixed(1));
      circle.setAttribute('cy', curY.toFixed(1));
      circle.setAttribute('opacity', (0.85 * (1 - progress * 0.3)).toFixed(2));

      if (progress < 1) {
        requestAnimationFrame(animatePhoton);
      } else {
        if (photonsGroup.contains(circle)) {
          photonsGroup.removeChild(circle);
        }
      }
    }

    requestAnimationFrame(animatePhoton);
  }

  setInterval(runSequenceStep, 1750);
  runSequenceStep();

  // Every 8–12 seconds (specifically 10s): Subtle Synchronization Pulse across the system
  function triggerSystemSyncPulse() {
    orbitSystem.classList.add('sync-pulsing');
    setTimeout(() => {
      orbitSystem.classList.remove('sync-pulsing');
    }, 1200);
  }
  setInterval(triggerSystemSyncPulse, 10000);

  // Node inspection on hover
  nodes.forEach((node, idx) => {
    node.addEventListener('mouseenter', () => {
      isUserHovering = true;
      nodes.forEach(n => n.classList.remove('active-stage'));
      node.classList.add('active-stage');
      const step = sequenceSteps.find(s => s.activeNode === idx) || sequenceSteps[0];
      if (monitorVal) monitorVal.textContent = step.status;
      if (activePhaseLabel) activePhaseLabel.textContent = `INSPECTING`;
    });

    node.addEventListener('mouseleave', () => {
      isUserHovering = false;
    });
  });

  // Responsive Parallax on Mouse Move (2–4 degrees max)
  if (stage) {
    const frame = stage.querySelector('.hero-engine-frame');
    stage.addEventListener('mousemove', e => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / (rect.width / 2)) * 3.5;
      const rotateX = -(y / (rect.height / 2)) * 3.5;

      if (frame) {
        frame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      }
    }, { passive: true });

    stage.addEventListener('mouseleave', () => {
      if (frame) {
        frame.style.transform = '';
      }
    });
  }
}

/* ── 7. SCROLL-DRIVEN STORYTELLING MOTION ── */
function initScrollReveal() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // Group elements: sections and cards
  const sections = document.querySelectorAll('.section');
  const cardGroups = document.querySelectorAll('.cards-grid, .sim-preview-grid, .hybrid-triad-grid, .viability-grid');

  // Add motion-reveal class to sections
  sections.forEach(section => {
    section.classList.add('motion-reveal');
  });

  // Stagger items inside card grids
  cardGroups.forEach(group => {
    const cards = group.children;
    Array.from(cards).forEach((card, idx) => {
      card.classList.add('motion-reveal');
      card.style.setProperty('--stagger-index', idx);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.motion-reveal').forEach(el => {
    observer.observe(el);
  });
}

/* ── 8. MOLECULAR SECTION MOTION ── */
function initMolecularMotion() {
  const galleryCards = document.querySelectorAll('.gallery-card');

  // IntersectionObserver for clip-path image reveal + one scanline pass
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('image-revealed');

        // Trigger single scan-line pass
        card.classList.add('scan-once');
        setTimeout(() => {
          card.classList.remove('scan-once');
        }, 1300);

        obs.unobserve(card);
      }
    });
  }, { threshold: 0.2 });

  galleryCards.forEach(card => observer.observe(card));

  // Hover triggers single scanline pass
  galleryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('scan-once')) {
        card.classList.add('scan-once');
        setTimeout(() => {
          card.classList.remove('scan-once');
        }, 1300);
      }
    });
  });

  // Molecular Pipeline sequential illumination
  const flowDiagram = document.getElementById('molecular-flow-diagram');
  if (flowDiagram) {
    const nodes = flowDiagram.querySelectorAll('.mflow-node');
    let currentIdx = 0;

    setInterval(() => {
      nodes.forEach((n, idx) => {
        if (idx === currentIdx) {
          n.classList.add('active-mflow');
        } else {
          n.classList.remove('active-mflow');
        }
      });
      currentIdx = (currentIdx + 1) % nodes.length;
    }, 1600); // contemplative timing
  }
}

/* ── 9. SOLUTION DATA JOURNEY ── */
function initDataJourney() {
  const pipeline = document.getElementById('canonical-pipeline');
  const photon = document.getElementById('pipeline-photon');
  if (!pipeline || !photon) return;

  const stepNodes = pipeline.querySelectorAll('.pipeline-step-node');

  function updateDataPacket() {
    const rect = pipeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top < windowH && rect.bottom > 0) {
      const progress = Math.max(0, Math.min(1, (windowH * 0.5 - rect.top) / rect.height));
      photon.style.top = `${(progress * 100).toFixed(2)}%`;

      stepNodes.forEach(node => {
        const nodeRect = node.getBoundingClientRect();
        if (nodeRect.top < windowH * 0.55 && nodeRect.bottom > windowH * 0.45) {
          node.classList.add('active-stage');
        } else {
          node.classList.remove('active-stage');
        }
      });
    }
  }

  window.addEventListener('scroll', updateDataPacket, { passive: true });
}

/* ── 10. ARCHITECTURE REVERSIBLE MOTION & SPINE (WOW #3) ── */
function initArchitectureMotion() {
  const spineFill = document.getElementById('spine-progress-fill');
  const spineCursor = document.getElementById('spine-cursor');
  const archSection = document.getElementById('architecture');
  const layers = document.querySelectorAll('.arch-layer');

  function updateArchitecture() {
    if (!archSection || !spineFill) return;
    const rect = archSection.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Drawing progresses with scroll, naturally reverses on scroll up
    if (rect.top < windowH && rect.bottom > 0) {
      const progress = Math.max(0, Math.min(1, (windowH * 0.5 - rect.top) / (rect.height * 0.8)));
      const pct = (progress * 100).toFixed(1);
      spineFill.style.height = `${pct}%`;
      if (spineCursor) spineCursor.style.top = `${pct}%`;

      // Active layer expands and glows, inactive layers quiet down
      layers.forEach(layer => {
        const lRect = layer.getBoundingClientRect();
        if (lRect.top < windowH * 0.58 && lRect.bottom > windowH * 0.38) {
          layer.classList.add('active-layer');
        } else {
          layer.classList.remove('active-layer');
        }
      });
    }
  }

  window.addEventListener('scroll', updateArchitecture, { passive: true });

  // Accordion Expand/Collapse
  layers.forEach(layer => {
    layer.addEventListener('click', () => {
      const isExpanded = layer.classList.contains('expanded');
      layers.forEach(l => l.classList.remove('expanded'));
      if (!isExpanded) {
        layer.classList.add('expanded');
      }
    });

    layer.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        layer.click();
      }
    });
  });
}

/* ── 11. QUANTUM MOTION: CIRCUITS & SEQUENTIAL DRAW (WOW #4) ── */
function initQuantumLabMotion() {
  const tabButtons = document.querySelectorAll('.qml-tab-btn');
  const tabPanels = document.querySelectorAll('.qml-tab-panel');
  const dynamicGroup = document.getElementById('circuit-dynamic-elements');
  const pulsesGroup = document.getElementById('circuit-pulses');
  const activeBadge = document.getElementById('circuit-active-badge');

    const circuitConfigs = {
    vqc: {
      name: 'CIRCUIT: 4-QUBIT VQC ANSATZ',
      render: () => `
        <!-- Step 1: Feature Encoding RY(x) -->
        <g class="gate-draw-step-1">
          <rect x="90" y="24" width="70" height="32" class="circuit-gate-rect gate-ry" />
          <text x="125" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RY(x₀)</text>
          <rect x="90" y="69" width="70" height="32" class="circuit-gate-rect gate-ry" />
          <text x="125" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RY(x₁)</text>
          <rect x="90" y="114" width="70" height="32" class="circuit-gate-rect gate-ry" />
          <text x="125" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RY(x₂)</text>
          <rect x="90" y="159" width="70" height="32" class="circuit-gate-rect gate-ry" />
          <text x="125" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RY(x₃)</text>
        </g>

        <!-- Step 2: Entangling CNOT Gates -->
        <g class="gate-draw-step-2">
          <circle cx="210" cy="40" r="4.5" class="gate-cnot-ctrl" fill="#059669" />
          <line x1="210" y1="40" x2="210" y2="85" stroke="#059669" stroke-width="2" />
          <circle cx="210" cy="85" r="8" class="gate-cnot-target" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
          <line x1="202" y1="85" x2="218" y2="85" stroke="#059669" stroke-width="2" />

          <circle cx="260" cy="130" r="4.5" class="gate-cnot-ctrl" fill="#059669" />
          <line x1="260" y1="130" x2="260" y2="175" stroke="#059669" stroke-width="2" />
          <circle cx="260" cy="175" r="8" class="gate-cnot-target" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
          <line x1="252" y1="175" x2="268" y2="175" stroke="#059669" stroke-width="2" />
        </g>

        <!-- Step 3: Parameterized Rotations RZ(θ) -->
        <g class="gate-draw-step-3">
          <rect x="320" y="24" width="70" height="32" class="circuit-gate-rect gate-rz" />
          <text x="355" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RZ(θ₁)</text>
          <rect x="320" y="69" width="70" height="32" class="circuit-gate-rect gate-rz" />
          <text x="355" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RZ(θ₂)</text>
          <rect x="320" y="114" width="70" height="32" class="circuit-gate-rect gate-rz" />
          <text x="355" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RZ(θ₃)</text>
          <rect x="320" y="159" width="70" height="32" class="circuit-gate-rect gate-rz" />
          <text x="355" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">RZ(θ₄)</text>
        </g>

        <!-- Step 4: Measurement Registers M -->
        <g class="gate-draw-step-4">
          <rect x="440" y="24" width="46" height="32" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="40" class="gate-text" fill="#047857" style="fill:#047857!important;">M₀</text>
          <rect x="440" y="69" width="46" height="32" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="85" class="gate-text" fill="#047857" style="fill:#047857!important;">M₁</text>
          <rect x="440" y="114" width="46" height="32" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="130" class="gate-text" fill="#047857" style="fill:#047857!important;">M₂</text>
          <rect x="440" y="159" width="46" height="32" fill="#FFFFFF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="175" class="gate-text" fill="#047857" style="fill:#047857!important;">M₃</text>
        </g>
      `
    },
    qnn: {
      name: 'CIRCUIT: LAYERED QUANTUM NEURAL NETWORK',
      render: () => `
        <!-- Step 1: Unitary Input Encoding U(x) -->
        <g class="gate-draw-step-1">
          <rect x="90" y="24" width="75" height="32" class="circuit-gate-rect gate-ry" />
          <text x="127" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U₁(x)</text>
          <rect x="90" y="69" width="75" height="32" class="circuit-gate-rect gate-ry" />
          <text x="127" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U₂(x)</text>
          <rect x="90" y="114" width="75" height="32" class="circuit-gate-rect gate-ry" />
          <text x="127" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U₃(x)</text>
          <rect x="90" y="159" width="75" height="32" class="circuit-gate-rect gate-ry" />
          <text x="127" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U₄(x)</text>
        </g>

        <!-- Step 2: Variational Neural Weights W(θ) -->
        <g class="gate-draw-step-2">
          <rect x="215" y="24" width="75" height="32" class="circuit-gate-rect gate-rz" />
          <text x="252" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">W₁(θ)</text>
          <rect x="215" y="69" width="75" height="32" class="circuit-gate-rect gate-rz" />
          <text x="252" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">W₂(θ)</text>
          <rect x="215" y="114" width="75" height="32" class="circuit-gate-rect gate-rz" />
          <text x="252" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">W₃(θ)</text>
          <rect x="215" y="159" width="75" height="32" class="circuit-gate-rect gate-rz" />
          <text x="252" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">W₄(θ)</text>
        </g>

        <!-- Step 3: All-to-All Quantum Entanglement -->
        <g class="gate-draw-step-3">
          <circle cx="330" cy="40" r="4.5" class="gate-cnot-ctrl" fill="#059669" />
          <line x1="330" y1="40" x2="330" y2="130" stroke="#059669" stroke-width="2" />
          <circle cx="330" cy="130" r="8" class="gate-cnot-target" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
          <line x1="322" y1="130" x2="338" y2="130" stroke="#059669" stroke-width="2" />

          <circle cx="375" cy="85" r="4.5" class="gate-cnot-ctrl" fill="#059669" />
          <line x1="375" y1="85" x2="375" y2="175" stroke="#059669" stroke-width="2" />
          <circle cx="375" cy="175" r="8" class="gate-cnot-target" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
          <line x1="367" y1="175" x2="383" y2="175" stroke="#059669" stroke-width="2" />
        </g>

        <!-- Step 4: Expectation Value Readout ⟨Z⟩ -->
        <g class="gate-draw-step-4">
          <rect x="440" y="24" width="46" height="32" fill="#EFF6FF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="40" class="gate-text" fill="#047857" style="fill:#047857!important;">⟨Z₀⟩</text>
          <rect x="440" y="69" width="46" height="32" fill="#EFF6FF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="85" class="gate-text" fill="#047857" style="fill:#047857!important;">⟨Z₁⟩</text>
          <rect x="440" y="114" width="46" height="32" fill="#EFF6FF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="130" class="gate-text" fill="#047857" style="fill:#047857!important;">⟨Z₂⟩</text>
          <rect x="440" y="159" width="46" height="32" fill="#EFF6FF" stroke="#059669" stroke-width="1.5" rx="4" />
          <text x="463" y="175" class="gate-text" fill="#047857" style="fill:#047857!important;">⟨Z₃⟩</text>
        </g>
      `
    },
    qsvm: {
      name: 'CIRCUIT: QUANTUM KERNEL ESTIMATION (QSVM)',
      render: () => `
        <!-- Step 1: Hadamard Superposition H -->
        <g class="gate-draw-step-1">
          <rect x="90" y="24" width="60" height="32" class="circuit-gate-rect gate-ry" />
          <text x="120" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">H</text>
          <rect x="90" y="69" width="60" height="32" class="circuit-gate-rect gate-ry" />
          <text x="120" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">H</text>
          <rect x="90" y="114" width="60" height="32" class="circuit-gate-rect gate-ry" />
          <text x="120" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">H</text>
          <rect x="90" y="159" width="60" height="32" class="circuit-gate-rect gate-ry" />
          <text x="120" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">H</text>
        </g>

        <!-- Step 2: First Data Map U_Φ(x) -->
        <g class="gate-draw-step-2">
          <rect x="195" y="24" width="85" height="32" class="circuit-gate-rect gate-rz" />
          <text x="237" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ(x₁)</text>
          <rect x="195" y="69" width="85" height="32" class="circuit-gate-rect gate-rz" />
          <text x="237" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ(x₂)</text>
          <rect x="195" y="114" width="85" height="32" class="circuit-gate-rect gate-rz" />
          <text x="237" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ(x₃)</text>
          <rect x="195" y="159" width="85" height="32" class="circuit-gate-rect gate-rz" />
          <text x="237" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ(x₄)</text>
        </g>

        <!-- Step 3: Inverse Data Map U_Φ†(z) -->
        <g class="gate-draw-step-3">
          <rect x="325" y="24" width="90" height="32" class="circuit-gate-rect gate-ry" />
          <text x="370" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ†(z₁)</text>
          <rect x="325" y="69" width="90" height="32" class="circuit-gate-rect gate-ry" />
          <text x="370" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ†(z₂)</text>
          <rect x="325" y="114" width="90" height="32" class="circuit-gate-rect gate-ry" />
          <text x="370" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ†(z₃)</text>
          <rect x="325" y="159" width="90" height="32" class="circuit-gate-rect gate-ry" />
          <text x="370" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">U_Φ†(z₄)</text>
        </g>

        <!-- Step 4: Kernel State Overlap |⟨0|0⟩|² -->
        <g class="gate-draw-step-4">
          <rect x="445" y="24" width="46" height="32" fill="#FFFFFF" stroke="#06B6D4" stroke-width="1.5" rx="4" />
          <text x="468" y="40" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">|0⟩</text>
          <rect x="445" y="69" width="46" height="32" fill="#FFFFFF" stroke="#06B6D4" stroke-width="1.5" rx="4" />
          <text x="468" y="85" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">|0⟩</text>
          <rect x="445" y="114" width="46" height="32" fill="#FFFFFF" stroke="#06B6D4" stroke-width="1.5" rx="4" />
          <text x="468" y="130" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">|0⟩</text>
          <rect x="445" y="159" width="46" height="32" fill="#FFFFFF" stroke="#06B6D4" stroke-width="1.5" rx="4" />
          <text x="468" y="175" class="gate-text" fill="#064E3B" style="fill:#064E3B!important;">|0⟩</text>
        </g>
      `
    }
  };

  // 600ms animated circuit morph transition
  function renderCircuit(tabKey) {
    if (!dynamicGroup) return;
    const config = circuitConfigs[tabKey] || circuitConfigs.vqc;

    if (activeBadge) activeBadge.textContent = config.name;

    // 1. Old circuit fades + dissolves
    dynamicGroup.style.opacity = '0';
    dynamicGroup.style.transform = 'scale(0.95) translateX(-10px)';
    dynamicGroup.style.transition = 'all 0.28s var(--ease-physical)';

    setTimeout(() => {
      // 2. New circuit draws from left to right with sequential gate animations
      dynamicGroup.innerHTML = config.render();
      dynamicGroup.style.opacity = '1';
      dynamicGroup.style.transform = 'scale(1) translateX(0)';

      // 3. Central quantum node pulses
      const qmlNode = document.getElementById('hnode-3');
      if (qmlNode) {
        qmlNode.classList.add('active-stage');
        setTimeout(() => qmlNode.classList.remove('active-stage'), 600);
      }
    }, 280);
  }

  renderCircuit('vqc');

  // Continuous pulses traveling along 4 qubit lines
  function emitQuantumPulse() {
    if (!pulsesGroup) return;
    const wireY = [40, 85, 130, 175][Math.floor(Math.random() * 4)];

    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('cx', '50');
    pulse.setAttribute('cy', wireY.toString());
    pulse.setAttribute('r', '2.8');
    pulse.setAttribute('fill', '#2563EB');
    pulse.setAttribute('filter', 'url(#glow-filter)');
    pulsesGroup.appendChild(pulse);

    const startTime = performance.now();
    const duration = 1600;

    function animate(time) {
      const elapsed = time - startTime;
      const progress = elapsed / duration;
      const x = 50 + progress * 660;

      pulse.setAttribute('cx', x.toFixed(1));
      pulse.setAttribute('opacity', (1 - Math.abs(progress - 0.5) * 1.6).toFixed(2));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (pulsesGroup.contains(pulse)) pulsesGroup.removeChild(pulse);
      }
    }

    requestAnimationFrame(animate);
  }

  setInterval(emitQuantumPulse, 550);

  // Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      renderCircuit(targetTab);
    });
  });

  // Split-Screen Classical Data Points Grid
  const classicalGrid = document.getElementById('classical-points-grid');
  if (classicalGrid) {
    classicalGrid.innerHTML = '';
    for (let i = 0; i < 48; i++) {
      const dot = document.createElement('div');
      dot.className = 'data-dot';
      dot.style.opacity = (Math.random() * 0.7 + 0.2).toFixed(2);
      classicalGrid.appendChild(dot);
    }
  }
}

/* ── 12. SHAP MOTION & FEATURE FOCUS ── */
function initShapMotion() {
  const shapSection = document.getElementById('explainability');
  const chart = document.getElementById('shap-bar-chart');
  const rows = document.querySelectorAll('.shap-row');
  let animated = false;

  // Animate from zero on scroll
  function checkScroll() {
    if (animated || !shapSection) return;
    const rect = shapSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      animated = true;
      rows.forEach((row, idx) => {
        const bar = row.querySelector('.shap-bar');
        if (bar) {
          const finalWidth = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = finalWidth;
          }, idx * 120);
        }
      });
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  // Hover on feature: highlight active feature, dim unrelated features
  if (chart) {
    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        chart.classList.add('has-hover');
        row.classList.add('is-hovered');
      });

      row.addEventListener('mouseleave', () => {
        chart.classList.remove('has-hover');
        row.classList.remove('is-hovered');
      });
    });
  }
}

/* ── 13. SIMULATIONS WORKSTATION ── */
function initSimulationWorkstation() {
  const btn1ykr = document.getElementById('sim-btn-1ykr');
  const btn4kd1 = document.getElementById('sim-btn-4kd1');
  const panel1ykr = document.getElementById('sim-panel-1ykr');
  const panel4kd1 = document.getElementById('sim-panel-4kd1');

  function switchTarget(target) {
    if (target === '1ykr') {
      if (btn1ykr) btn1ykr.classList.add('active');
      if (btn4kd1) btn4kd1.classList.remove('active');
      if (panel1ykr) panel1ykr.classList.add('active');
      if (panel4kd1) panel4kd1.classList.remove('active');
    } else {
      if (btn4kd1) btn4kd1.classList.add('active');
      if (btn1ykr) btn1ykr.classList.remove('active');
      if (panel4kd1) panel4kd1.classList.add('active');
      if (panel1ykr) panel1ykr.classList.remove('active');
    }
  }

  if (btn1ykr) btn1ykr.addEventListener('click', () => switchTarget('1ykr'));
  if (btn4kd1) btn4kd1.addEventListener('click', () => switchTarget('4kd1'));

  document.querySelectorAll('.sim-preview-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.simTarget;
      if (target) switchTarget(target);
    });
  });

  const searchInput = document.getElementById('docking-search-input');
  const table = document.getElementById('docking-affinity-table');
  if (searchInput && table) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
}

/* ── 14. RESEARCH EVIDENCE NUMBERS COUNTER ── */
function initStatCounters() {
  const simSection = document.getElementById('simulations');
  const statCards = document.querySelectorAll('.stat-card');
  let animated = false;

  function countUp() {
    if (animated || !simSection) return;
    const rect = simSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.72) {
      animated = true;
      statCards.forEach(card => {
        const numElem = card.querySelector('.stat-num');
        const raw = card.dataset.stat;
        if (!numElem || !raw) return;

        const target = parseFloat(raw);
        const isPercent = numElem.textContent.includes('%');
        const isNegative = raw.startsWith('-');
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = (target * ease).toFixed(target % 1 === 0 ? 0 : target.toString().split('.')[1]?.length || 1);

          numElem.textContent = `${isNegative && !current.startsWith('-') ? '-' : ''}${current}${isPercent ? '%' : ''}`;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            numElem.textContent = `${raw}${isPercent ? '%' : ''}`;
          }
        }

        requestAnimationFrame(step);
      });
    }
  }

  window.addEventListener('scroll', countUp, { passive: true });
  countUp();
}

/* ── 15. 3D INNOVATION STACK PROGRESSIVE ASSEMBLY (WOW #5) ── */
function initInnovationStack() {
  const stack = document.getElementById('innovation-3d-stack');
  if (!stack) return;

  const layers = stack.querySelectorAll('.istack-layer');

  function checkStackScroll() {
    const rect = stack.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top < windowH * 0.8 && rect.bottom > 0) {
      layers.forEach((layer, idx) => {
        setTimeout(() => {
          layer.classList.add('locked-in');
        }, idx * 110);
      });
    }
  }

  window.addEventListener('scroll', checkStackScroll, { passive: true });
  checkStackScroll();
}

/* ── 16. GALLERY LIGHTBOX MODAL ── */
function initGalleryLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (!modal || !modalImg) return;

  function openModal(src, alt, caption) {
    modalImg.src = src;
    modalImg.alt = alt;
    modalCaption.textContent = caption || alt;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-card').forEach(card => {
    const img = card.querySelector('.gallery-img');
    const zoomBtn = card.querySelector('.gallery-zoom-btn');
    if (!img) return;

    const triggerZoom = () => {
      openModal(img.src, img.alt, img.dataset.caption);
    };

    if (zoomBtn) zoomBtn.addEventListener('click', triggerZoom);
    img.addEventListener('click', triggerZoom);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ── 17. SCROLLSPY ACTIVE LINK TRACKING (Dropdown-Aware) ── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

  function onScroll() {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
            
            // Highlight parent dropdown trigger if inside a dropdown
            const parentDropdown = link.closest('.nav-has-dropdown');
            dropdownTriggers.forEach(t => t.classList.remove('has-active'));
            if (parentDropdown) {
              const trigger = parentDropdown.querySelector('.nav-dropdown-trigger');
              if (trigger) trigger.classList.add('has-active');
            }
          }
        });
      }
    });
  }

  // Close dropdown on mobile when any link is clicked
  const allDropdownLinks = document.querySelectorAll('.dropdown-card-item');
  const navLinksList = document.getElementById('nav-links');
  allDropdownLinks.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinksList && navLinksList.classList.contains('open')) {
        navLinksList.classList.remove('open');
      }
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── 18. PHYSICAL CARDS SUBTLE TILT ── */
function initPhysicalCards() {
  const isTouch = window.matchMedia('(hover: none), (max-width: 900px)').matches;
  if (isTouch) return;

  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / (rect.width / 2)) * 3.5;
      const rotateX = -(y / (rect.height / 2)) * 3.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale(1.015)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
