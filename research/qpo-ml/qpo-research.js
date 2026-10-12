/* ═══════════════════════════════════════════════════════════
   QPO Research Page — Minimal Academic JavaScript
   Four sections: Overview, Concepts, Papers, Structure.
   PIN-protected editing mode (PIN: 7173) with local persistence.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'qpo_research_clean_v1';
  const EDIT_PIN = '7173';

  let isEditMode = false;
  let state;

  /* ════════════════════════════════════════════════════════════
     1. INITIAL CURRICULUM & PAPERS DATA
     ════════════════════════════════════════════════════════════ */

  const CONCEPT_GROUPS = [
    {
      id: 'grp-a',
      title: 'A. QPO Astrophysics',
      items: [
        {
          id: 'a-1',
          name: 'Compact objects: neutron stars and black holes',
          explanation: 'Properties of degenerate stellar remnants, event horizons, ergospheres, and relativistic gravitational fields.'
        },
        {
          id: 'a-2',
          name: 'X-ray binaries and accretion',
          explanation: 'Roche-lobe overflow, stellar wind accretion, low-mass (LMXB) and high-mass (HMXB) systems.'
        },
        {
          id: 'a-3',
          name: 'Accretion disks and X-ray emission',
          explanation: 'Geometrically thin Shakura-Sunyaev disks, multi-temperature blackbody spectra, and inner corona Comptonization.'
        },
        {
          id: 'a-4',
          name: 'Astrophysical variability',
          explanation: 'Non-stationary stochastic flux variations, aperiodic flickering, and state-dependent outbursts.'
        },
        {
          id: 'a-5',
          name: 'Quasi-periodic versus strictly periodic signals',
          explanation: 'Difference between finite coherence times (broad Lorentzian peaks) and coherent clocks (pulsars).'
        },
        {
          id: 'a-6',
          name: 'QPO phenomenology and classifications',
          explanation: 'Low-frequency QPO classifications (Types A, B, and C) and high-frequency QPOs (HFQPOs).'
        },
        {
          id: 'a-7',
          name: 'Centroid frequency, FWHM, quality factor, and fractional rms',
          explanation: 'Mathematical definitions: nu_0, Delta nu, Q = nu_0 / Delta nu (> 2 for QPOs), and integrated rms amplitude.'
        },
        {
          id: 'a-8',
          name: 'Harmonics and frequency evolution',
          explanation: 'Sub-harmonics, second harmonics, and frequency drift during outburst state transitions.'
        },
        {
          id: 'a-9',
          name: 'Physical interpretations of QPOs and competing models',
          explanation: 'Lense-Thirring precession of truncated inner flow, Relativistic Precession Model (RPM), and diskoseismology.'
        }
      ]
    },
    {
      id: 'grp-b',
      title: 'B. Fourier Analysis and X-ray Timing',
      items: [
        {
          id: 'b-1',
          name: 'Discrete Fourier transform and FFT',
          explanation: 'Mathematical definition of DFT, Cooley-Tukey FFT algorithm, time to frequency domain mapping.'
        },
        {
          id: 'b-2',
          name: 'Sampling interval and observation duration',
          explanation: 'Impact of time-bin size Delta t and continuous observation length T on Fourier binning.'
        },
        {
          id: 'b-3',
          name: 'Nyquist frequency and frequency resolution',
          explanation: 'Upper frequency boundary nu_Nyq = 1 / (2 Delta t) and fundamental bin resolution Delta nu = 1 / T.'
        },
        {
          id: 'b-4',
          name: 'Aliasing, spectral leakage, and windowing',
          explanation: 'High-frequency signal folding below Nyquist limit, power leakage across bins, and taper windows.'
        },
        {
          id: 'b-5',
          name: 'Periodograms and power density spectra',
          explanation: 'Raw periodograms vs segment-averaged power density spectra (PDS) to reduce chi^2 variance.'
        },
        {
          id: 'b-6',
          name: 'Power-spectrum normalisation',
          explanation: 'Leahy normalisation (Poisson noise expectation = 2) vs Miyamoto fractional rms-squared normalisation.'
        },
        {
          id: 'b-7',
          name: 'Poisson noise and red/broad-band noise',
          explanation: 'Flat instrumental photon-counting white noise vs physical power-law aperiodic variability (P ~ nu^-alpha).'
        },
        {
          id: 'b-8',
          name: 'Lorentzian fitting and QPO parameter estimation',
          explanation: 'Multi-Lorentzian modeling of broadband noise and QPO components with chi^2 or maximum likelihood.'
        },
        {
          id: 'b-9',
          name: 'Statistical significance and false-positive detection',
          explanation: 'Formulating null hypothesis against red-noise continuum and computing false alarm probabilities.'
        },
        {
          id: 'b-10',
          name: 'Multiple trials and uncertainty estimation',
          explanation: 'Trial penalty (look-elsewhere effect) over number of evaluated Fourier frequencies.'
        },
        {
          id: 'b-11',
          name: 'Monte Carlo simulations and injection-recovery testing',
          explanation: 'Simulating synthetic light curves with known signals to measure detection completeness and false discovery rate.'
        },
        {
          id: 'b-12',
          name: 'Dynamic power spectra and frequency evolution',
          explanation: 'Time-frequency spectrograms (waterfall plots) tracking transient QPO frequency drift.'
        }
      ]
    },
    {
      id: 'grp-c',
      title: 'C. Astronomical Data Analysis',
      items: [
        {
          id: 'c-1',
          name: 'FITS files and event lists',
          explanation: 'Structure of Flexible Image Transport System tables, EVENTS extensions, headers, and time tags.'
        },
        {
          id: 'c-2',
          name: 'Event data versus binned light curves',
          explanation: 'Individual photon arrival timestamps vs binned count-rate time series across energy intervals.'
        },
        {
          id: 'c-3',
          name: 'Time systems and observation metadata',
          explanation: 'Mission elapsed time (MET), Terrestrial Time (TT), Barycentric Dynamical Time (TDB), and barycenter corrections.'
        },
        {
          id: 'c-4',
          name: 'Good Time Intervals and filtering',
          explanation: 'Screening for orbit passages, South Atlantic Anomaly (SAA) avoidance, and spacecraft pointing stability.'
        },
        {
          id: 'c-5',
          name: 'Energy selection and background',
          explanation: 'Pulse invariant (PI) channel filtering, instrumental background subtraction, and signal-to-noise optimisation.'
        },
        {
          id: 'c-6',
          name: 'Detector effects and dead time',
          explanation: 'Paralyzable and non-paralyzable dead time, high count rate pile-up, and resulting modifications to PDS noise baseline.'
        },
        {
          id: 'c-7',
          name: 'Astropy and Stingray',
          explanation: 'Using the community standard Python packages for astronomical coordinate conversion, FITS I/O, and spectral-timing analysis.'
        },
        {
          id: 'c-8',
          name: 'Producing and interpreting timing-analysis plots',
          explanation: 'Plotting light curves, averaged PDS with error bars, and model residuals.'
        },
        {
          id: 'c-9',
          name: 'Reproducing an existing astronomical analysis',
          explanation: 'Re-running a published reduction pipeline to verify reproducible power spectrum normalisation.'
        }
      ]
    },
    {
      id: 'grp-d',
      title: 'D. Machine Learning Foundations',
      items: [
        {
          id: 'd-1',
          name: 'Features, targets, training data, and test data',
          explanation: 'Feature matrices, labels, parameter representations, and partitioning protocols.'
        },
        {
          id: 'd-2',
          name: 'Supervised versus unsupervised learning',
          explanation: 'Labeled prediction tasks vs discovery of latent structures and clustering.'
        },
        {
          id: 'd-3',
          name: 'Linear regression',
          explanation: 'Ordinary least squares, coefficient estimation, residual sum of squares, and linear assumptions.'
        },
        {
          id: 'd-4',
          name: 'Logistic regression and classification',
          explanation: 'Sigmoid link function, log-loss objective, and binary decision boundaries.'
        },
        {
          id: 'd-5',
          name: 'Loss functions and optimisation',
          explanation: 'MSE, cross-entropy, gradient descent, learning rates, and convergence criteria.'
        },
        {
          id: 'd-6',
          name: 'Bias, variance, and overfitting',
          explanation: 'Model complexity trade-offs, underfitting vs overfitting, and generalisation gap.'
        },
        {
          id: 'd-7',
          name: 'Preprocessing and scaling',
          explanation: 'Standardization (Z-score), MinMax scaling, robust scaling, and imputing missing data.'
        },
        {
          id: 'd-8',
          name: 'Cross-validation and hyperparameter tuning',
          explanation: 'k-fold CV, stratified splits, grid search, and randomized hyperparameter search.'
        },
        {
          id: 'd-9',
          name: 'Decision trees',
          explanation: 'Recursive binary splitting, Gini impurity, entropy, and tree pruning.'
        },
        {
          id: 'd-10',
          name: 'Random forests and extra trees',
          explanation: 'Bootstrap aggregation (bagging), random feature subsets, and out-of-bag error estimation.'
        },
        {
          id: 'd-11',
          name: 'Gradient boosting',
          explanation: 'Sequential weak learner fitting, gradient descent on pseudo-residuals, XGBoost and LightGBM.'
        },
        {
          id: 'd-12',
          name: 'Support vector machines',
          explanation: 'Maximum margin hyperplanes, soft margin slack variables, and kernel trick (RBF).'
        },
        {
          id: 'd-13',
          name: 'PCA and clustering',
          explanation: 'Principal Component Analysis, k-means clustering, and unsupervised dimensionality reduction.'
        },
        {
          id: 'd-14',
          name: 'Accuracy, precision, recall, F1, ROC-AUC, and PR-AUC',
          explanation: 'Classification evaluation metrics and understanding trade-offs under class skew.'
        },
        {
          id: 'd-15',
          name: 'Class imbalance and threshold selection',
          explanation: 'Cost-sensitive learning, resampling techniques, and optimal decision threshold tuning.'
        },
        {
          id: 'd-16',
          name: 'Feature importance and model interpretation',
          explanation: 'Permutation importance, MDI, and SHAP values for physically meaningful feature attribution.'
        },
        {
          id: 'd-17',
          name: 'Data leakage and scientifically meaningful data splitting',
          explanation: 'Preventing information bleed: source-level (Leave-One-Source-Out) vs observation-level splits.'
        },
        {
          id: 'd-18',
          name: 'Calibration and uncertainty estimation',
          explanation: 'Platt scaling, isotonic regression, and assessing reliability diagrams.'
        },
        {
          id: 'd-19',
          name: 'Neural networks and backpropagation',
          explanation: 'Multilayer perceptrons, activation functions (ReLU, GELU), computational graphs, and backprop.'
        },
        {
          id: 'd-20',
          name: 'CNNs and time-series models, if relevant to the final project',
          explanation: '1D convolutions on power spectra or 2D convolutions on dynamic spectrograms.'
        },
        {
          id: 'd-21',
          name: 'Simulation-based inference, if justified by the research question',
          explanation: 'Neural posterior estimation (NPE) and likelihood-free parameter inference.'
        }
      ]
    },
    {
      id: 'grp-e',
      title: 'E. Research and Computational Practice',
      items: [
        {
          id: 'e-1',
          name: 'Reading papers critically',
          explanation: 'Dissecting methodology, checking baseline models, and evaluating claims against statistical rigor.'
        },
        {
          id: 'e-2',
          name: 'Extracting research questions and limitations from literature',
          explanation: 'Identifying unresolved physical questions and failure modes in published algorithms.'
        },
        {
          id: 'e-3',
          name: 'Python scientific computing with NumPy, SciPy, Pandas, and Matplotlib',
          explanation: 'Vectorized mathematical operations, statistical routines, dataframes, and publication figures.'
        },
        {
          id: 'e-4',
          name: 'Jupyter notebooks, Git, and reproducible workflows',
          explanation: 'Version control for research code, clean notebook hygiene, and modular Python scripts.'
        },
        {
          id: 'e-5',
          name: 'Designing a baseline experiment',
          explanation: 'Establishing a simple benchmark (e.g. classical Lorentzian fit) before proposing ML alternatives.'
        },
        {
          id: 'e-6',
          name: 'Testing methods on synthetic data',
          explanation: 'Validating pipelines on simulated light curves where true ground-truth QPO parameters are known.'
        },
        {
          id: 'e-7',
          name: 'Recording results and failed approaches',
          explanation: 'Maintaining an honest log of negative results to avoid confirmation bias.'
        },
        {
          id: 'e-8',
          name: 'Distinguishing established findings from hypotheses',
          explanation: 'Separating observational facts from theoretical interpretations and model assumptions.'
        },
        {
          id: 'e-9',
          name: 'Understanding limitations before making scientific claims',
          explanation: 'Explicitly defining observational boundaries where a proposed method is not expected to hold.'
        }
      ]
    }
  ];

  const INITIAL_PAPERS = [
    {
      id: 'paper-ingram-motta',
      title: 'A review of quasi-periodic oscillations from black hole X-ray binaries: Observation and Theory',
      authors: 'Adam R. Ingram and Sara E. Motta (2020)',
      url: 'https://arxiv.org/abs/2001.08758',
      relevance: 'A review of the observational properties, classification, and physical interpretations of QPOs in black-hole X-ray binaries.',
      isRead: true, // Already read!
      notes: ''
    },
    {
      id: 'paper-shabnam-iyyani',
      title: 'Observations and Physics of Prompt Emission of Gamma-Ray Bursts',
      authors: 'Shabnam Iyyani (2018)',
      journalInfo: 'Journal of Astrophysics and Astronomy, volume 39, article 75',
      url: 'https://doi.org/10.1007/s12036-018-9567-9',
      relevance: 'Background on GRB prompt emission, observational properties, and the physical processes relevant to high-energy astrophysics.',
      isRead: true, // Already read!
      notes: ''
    },
    {
      id: 'paper-vaughan-2005',
      title: 'A simple test for periodic signals in red noise',
      authors: 'Simon Vaughan (2005)',
      url: 'https://arxiv.org/abs/astro-ph/0412697',
      relevance: 'Understanding statistical false positives and the noise models used when assessing periodic signals.',
      isRead: false, // Unread
      notes: ''
    },
    {
      id: 'paper-kiker-2023',
      title: 'QPOML: A Machine Learning Approach to Detect and Characterize Quasi-Periodic Oscillations in X-ray Binaries',
      authors: 'Kiker and collaborators (2023)',
      url: 'https://academic.oup.com/mnras/article/524/4/4801/7193380',
      relevance: 'Directly related to applying ML to QPO detection and parameter estimation.',
      isRead: false, // Unread
      notes: ''
    }
  ];

  /* ════════════════════════════════════════════════════════════
     2. STATE INITIALISATION & LOCAL PERSISTENCE
     ════════════════════════════════════════════════════════════ */

  function buildDefaultState() {
    const concepts = {};
    CONCEPT_GROUPS.forEach(grp => {
      grp.items.forEach(it => {
        concepts[it.id] = {
          status: 'not-started', // Not Started, Learning, Understood
          notes: ''
        };
      });
    });

    const papers = {};
    INITIAL_PAPERS.forEach(p => {
      papers[p.id] = {
        isRead: p.isRead,
        notes: p.notes || ''
      };
    });

    return {
      concepts,
      papers,
      customPapers: [] // Future papers added by student in Edit Mode
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const def = buildDefaultState();
        state = {
          concepts: { ...def.concepts, ...parsed.concepts },
          papers: { ...def.papers, ...parsed.papers },
          customPapers: parsed.customPapers || []
        };
      } else {
        state = buildDefaultState();
      }
    } catch (e) {
      state = buildDefaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  function resetState() {
    if (confirm('Are you sure you want to reset your progress to default? This will clear your custom notes.')) {
      state = buildDefaultState();
      saveState();
      renderConcepts();
      renderPapers();
    }
  }

  /* ════════════════════════════════════════════════════════════
     3. PIN-PROTECTED EDIT MODE LOGIC (PIN: 7173)
     ════════════════════════════════════════════════════════════ */

  function setEditMode(active) {
    isEditMode = active;
    const btn = document.getElementById('edit-mode-toggle');
    const lockIcon = document.getElementById('lock-indicator');
    const text = document.getElementById('edit-toggle-text');
    const resetBtn = document.getElementById('reset-progress-btn');
    const addPaperForm = document.getElementById('add-paper-container');

    if (btn) {
      if (isEditMode) {
        btn.classList.add('is-editing');
        if (lockIcon) lockIcon.textContent = '🔓';
        if (text) text.textContent = 'Exit Edit Mode';
        if (resetBtn) resetBtn.style.display = 'inline-block';
        if (addPaperForm) addPaperForm.style.display = 'block';
      } else {
        btn.classList.remove('is-editing');
        if (lockIcon) lockIcon.textContent = '🔒';
        if (text) text.textContent = 'Edit Progress';
        if (resetBtn) resetBtn.style.display = 'none';
        if (addPaperForm) addPaperForm.style.display = 'none';
      }
    }

    renderConcepts();
    renderPapers();
  }

  function openPinModal() {
    const modal = document.getElementById('pin-modal');
    const input = document.getElementById('pin-input-field');
    const err = document.getElementById('pin-error-msg');
    if (modal) modal.style.display = 'flex';
    if (err) err.style.display = 'none';
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  function closePinModal() {
    const modal = document.getElementById('pin-modal');
    if (modal) modal.style.display = 'none';
  }

  function submitPin() {
    const input = document.getElementById('pin-input-field');
    const err = document.getElementById('pin-error-msg');
    if (!input) return;

    if (input.value.trim() === EDIT_PIN) {
      closePinModal();
      setEditMode(true);
    } else {
      if (err) err.style.display = 'block';
      input.select();
    }
  }

  function handleEditToggleClick() {
    if (isEditMode) {
      setEditMode(false);
    } else {
      openPinModal();
    }
  }

  /* ════════════════════════════════════════════════════════════
     4. RENDER CONCEPTS TO STUDY
     ════════════════════════════════════════════════════════════ */

  function renderConcepts() {
    const container = document.getElementById('concepts-list');
    const summary = document.getElementById('concepts-summary');
    if (!container) return;
    container.innerHTML = '';

    // Calculate dynamic stats
    let total = 0;
    let understood = 0;
    let learning = 0;

    CONCEPT_GROUPS.forEach(grp => {
      grp.items.forEach(it => {
        total++;
        const s = state.concepts[it.id]?.status || 'not-started';
        if (s === 'understood') understood++;
        if (s === 'learning') learning++;
      });
    });

    const pct = total > 0 ? Math.round((understood / total) * 100) : 0;
    if (summary) {
      summary.textContent = `${understood} of ${total} topics understood (${pct}%) · ${learning} learning`;
    }

    CONCEPT_GROUPS.forEach(grp => {
      const groupEl = document.createElement('div');
      groupEl.className = 'concept-group';

      let grpDone = 0;
      grp.items.forEach(it => {
        if (state.concepts[it.id]?.status === 'understood') grpDone++;
      });

      // Collapsible Header
      const header = document.createElement('div');
      header.className = 'concept-group-header';
      header.innerHTML = `
        <span class="concept-group-title">${grp.title}</span>
        <span class="concept-group-count">${grpDone}/${grp.items.length} Understood ▾</span>
      `;

      const itemsWrap = document.createElement('div');
      itemsWrap.className = 'concept-group-items';

      grp.items.forEach(it => {
        const itemState = state.concepts[it.id] || { status: 'not-started', notes: '' };
        const row = document.createElement('div');
        row.className = `concept-item-row is-${itemState.status}`;

        // Status Control (Interactive in Edit Mode, subtle badge in View Mode)
        const statusBox = document.createElement('div');
        statusBox.className = 'concept-status-indicator';

        if (isEditMode) {
          const select = document.createElement('select');
          select.className = 'concept-select-control';
          select.setAttribute('aria-label', `Status for ${it.name}`);
          
          [
            { val: 'not-started', label: 'Not Started' },
            { val: 'learning', label: 'Learning' },
            { val: 'understood', label: 'Understood' }
          ].forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.val;
            el.textContent = opt.label;
            if (itemState.status === opt.val) el.selected = true;
            select.appendChild(el);
          });

          select.addEventListener('change', (e) => {
            state.concepts[it.id].status = e.target.value;
            saveState();
            renderConcepts();
          });

          statusBox.appendChild(select);
        } else {
          const badge = document.createElement('span');
          badge.className = `concept-badge ${itemState.status}`;
          badge.textContent = itemState.status === 'not-started' ? 'Not Started' :
                              itemState.status === 'learning' ? 'Learning' : 'Understood';
          badge.title = 'Click "Edit Progress" to update status';
          statusBox.appendChild(badge);
        }

        row.appendChild(statusBox);

        // Details
        const details = document.createElement('div');
        details.className = 'concept-details';

        const name = document.createElement('div');
        name.className = 'concept-name';
        name.textContent = it.name;
        details.appendChild(name);

        const exp = document.createElement('div');
        exp.className = 'concept-explanation';
        exp.textContent = it.explanation;
        details.appendChild(exp);

        // Optional Notes Field
        if (isEditMode) {
          const notesBox = document.createElement('div');
          notesBox.className = 'concept-notes-area';

          const notesInput = document.createElement('textarea');
          notesInput.className = 'concept-notes-input';
          notesInput.placeholder = 'Optional notes or notebook reference...';
          notesInput.value = itemState.notes || '';

          notesInput.addEventListener('input', () => {
            state.concepts[it.id].notes = notesInput.value;
            saveState();
          });

          notesBox.appendChild(notesInput);
          details.appendChild(notesBox);
        } else if (itemState.notes) {
          const notesDisp = document.createElement('div');
          notesDisp.className = 'concept-explanation';
          notesDisp.style.marginTop = '0.35rem';
          notesDisp.style.fontStyle = 'italic';
          notesDisp.style.color = 'var(--text-muted)';
          notesDisp.textContent = `Notes: ${itemState.notes}`;
          details.appendChild(notesDisp);
        }

        row.appendChild(details);
        itemsWrap.appendChild(row);
      });

      header.addEventListener('click', () => {
        const isHidden = itemsWrap.style.display === 'none';
        itemsWrap.style.display = isHidden ? 'block' : 'none';
        header.querySelector('.concept-group-count').textContent =
          `${grpDone}/${grp.items.length} Understood ${isHidden ? '▾' : '▸'}`;
      });

      groupEl.appendChild(header);
      groupEl.appendChild(itemsWrap);
      container.appendChild(groupEl);
    });
  }

  /* ════════════════════════════════════════════════════════════
     5. RENDER RESEARCH PAPERS
     ════════════════════════════════════════════════════════════ */

  function renderPapers() {
    const container = document.getElementById('papers-list');
    const summary = document.getElementById('papers-summary');
    if (!container) return;
    container.innerHTML = '';

    const allPapers = [...INITIAL_PAPERS, ...(state.customPapers || [])];
    let readCount = 0;

    allPapers.forEach(p => {
      const pState = state.papers[p.id] || { isRead: p.isRead, notes: '' };
      if (pState.isRead) readCount++;
    });

    if (summary) {
      summary.textContent = `${readCount} of ${allPapers.length} papers read (${Math.round((readCount / allPapers.length) * 100)}%)`;
    }

    allPapers.forEach(p => {
      const pState = state.papers[p.id] || { isRead: p.isRead, notes: '' };
      const card = document.createElement('article');
      card.className = `paper-entry-card ${pState.isRead ? 'is-read' : ''}`;

      const headerRow = document.createElement('div');
      headerRow.className = 'paper-header-row';

      const titleEl = document.createElement('div');
      titleEl.className = 'paper-entry-title';
      titleEl.innerHTML = `<a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title}</a>`;
      headerRow.appendChild(titleEl);

      // Checkbox Label ("Gone through")
      const tickWrap = document.createElement('label');
      tickWrap.className = 'paper-tick-label-wrap';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'paper-checkbox';
      cb.checked = pState.isRead;
      cb.disabled = !isEditMode;

      if (!isEditMode) {
        tickWrap.title = 'Click "Edit Progress" to toggle reading status';
        tickWrap.addEventListener('click', (e) => {
          if (e.target.tagName !== 'INPUT') {
            openPinModal();
          }
        });
      } else {
        cb.addEventListener('change', () => {
          if (!state.papers[p.id]) state.papers[p.id] = { isRead: false, notes: '' };
          state.papers[p.id].isRead = cb.checked;
          saveState();
          renderPapers();
        });
      }

      const tickText = document.createElement('span');
      tickText.className = 'paper-tick-text';
      tickText.textContent = cb.checked ? 'Gone through (Read)' : 'Gone through';

      tickWrap.appendChild(cb);
      tickWrap.appendChild(tickText);
      headerRow.appendChild(tickWrap);
      card.appendChild(headerRow);

      // Authors & Year
      const auth = document.createElement('div');
      auth.className = 'paper-entry-authors';
      auth.textContent = p.authors + (p.journalInfo ? ` · ${p.journalInfo}` : '');
      card.appendChild(auth);

      // Relevance (1-2 lines)
      const rel = document.createElement('div');
      rel.className = 'paper-entry-relevance';
      rel.textContent = p.relevance;
      card.appendChild(rel);

      // Notes (in Edit Mode, or if notes exist)
      if (isEditMode) {
        const notesBox = document.createElement('div');
        notesBox.className = 'paper-notes-container';

        const label = document.createElement('div');
        label.className = 'paper-notes-label';
        label.textContent = 'Personal Notes & Observations';
        notesBox.appendChild(label);

        const textarea = document.createElement('textarea');
        textarea.className = 'paper-notes-textarea';
        textarea.placeholder = 'Key takeaways, equations to remember, questions for Prof. Iyyani...';
        textarea.value = pState.notes || '';

        textarea.addEventListener('input', () => {
          if (!state.papers[p.id]) state.papers[p.id] = { isRead: p.isRead, notes: '' };
          state.papers[p.id].notes = textarea.value;
          saveState();
        });

        notesBox.appendChild(textarea);
        card.appendChild(notesBox);
      } else if (pState.notes) {
        const notesBox = document.createElement('div');
        notesBox.className = 'paper-notes-container';
        notesBox.innerHTML = `
          <div class="paper-notes-label">Notes</div>
          <div style="font-size:0.86rem;color:var(--text-muted);font-style:italic;">${pState.notes}</div>
        `;
        card.appendChild(notesBox);
      }

      container.appendChild(card);
    });
  }

  function handleAddPaperSubmit() {
    const title = document.getElementById('new-paper-title')?.value.trim();
    const authors = document.getElementById('new-paper-authors')?.value.trim();
    const url = document.getElementById('new-paper-url')?.value.trim();
    const relevance = document.getElementById('new-paper-relevance')?.value.trim();

    if (!title || !url) {
      alert('Please provide at least a paper Title and URL.');
      return;
    }

    const newId = 'custom-' + Date.now();
    const newPaper = {
      id: newId,
      title,
      authors: authors || 'Unspecified Authors',
      url,
      relevance: relevance || 'Literature reference added for project study.',
      isRead: false
    };

    if (!state.customPapers) state.customPapers = [];
    state.customPapers.push(newPaper);
    state.papers[newId] = { isRead: false, notes: '' };

    saveState();

    // Clear form
    document.getElementById('new-paper-title').value = '';
    document.getElementById('new-paper-authors').value = '';
    document.getElementById('new-paper-url').value = '';
    document.getElementById('new-paper-relevance').value = '';

    renderPapers();
  }

  /* ════════════════════════════════════════════════════════════
     6. INITIALISATION & DOM LISTENERS
     ════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderConcepts();
    renderPapers();

    // Edit Toggle Button
    const toggleBtn = document.getElementById('edit-mode-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', handleEditToggleClick);

    // Reset Progress Button
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetState);

    // Modal Form & Cancel
    const pinForm = document.getElementById('pin-form');
    if (pinForm) pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitPin();
    });

    const pinSubmitBtn = document.getElementById('pin-submit-btn');
    if (pinSubmitBtn) pinSubmitBtn.addEventListener('click', submitPin);

    const pinCancelBtn = document.getElementById('pin-modal-cancel');
    if (pinCancelBtn) pinCancelBtn.addEventListener('click', closePinModal);

    const modal = document.getElementById('pin-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closePinModal();
      });
    }

    // Add Paper Submit
    const addPaperBtn = document.getElementById('submit-new-paper');
    if (addPaperBtn) addPaperBtn.addEventListener('click', handleAddPaperSubmit);
  });

})();
