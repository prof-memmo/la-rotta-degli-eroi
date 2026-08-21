window.EroiApp = window.EroiApp || {};

window.EroiApp.switchAdminTab = function(tab) {
      document.querySelectorAll('#view-admin-dashboard .tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      const activeBtn = document.querySelector(`#view-admin-dashboard .tab-btn[onclick*="'${tab}'"]`);
      if (activeBtn) activeBtn.classList.add('active');

      document.querySelectorAll('#view-admin-dashboard .tab-content').forEach(panel => {
        panel.classList.remove('active');
      });
      const tabEl = document.getElementById(`a-tab-${tab}`);
      if (tabEl) tabEl.classList.add('active');
    };

window.EroiApp.renderAdminDashboard = function() {
      const settings = window.EroiDB.getSettings();
      
      // Ricarica input impostazioni globali
      document.getElementById('admin-setting-appname').value = settings.appName;
      document.getElementById('admin-setting-copyright').value = settings.copyright;
      document.getElementById('admin-setting-contacts').value = settings.contacts;

      // Renderizza componenti spostati da Teacher a Admin
      this.renderTeacherMissions();
      this.renderTeacherShop();
      this.renderTeacherHelpersAndArtifacts();
      this.renderTeacherGuides();
      this.renderTeacherLogs();

      // Renderizza analytics shop
      const shopLogs = window.EroiDB.getLogs().filter(l => l.action.includes("Acquistato"));
      const analyticsBox = document.getElementById('shop-analytics-info');
      
      if (analyticsBox) {
          if (shopLogs.length === 0) {
            analyticsBox.innerHTML = `<p><i>Nessun acquisto ancora effettuato nello shop da parte degli studenti.</i></p>`;
          } else {
            const counts = {};
            shopLogs.forEach(l => {
              const match = l.action.match(/"([^"]+)"/);
              if (match) {
                const name = match[1];
                counts[name] = (counts[name] || 0) + 1;
              }
            });
            let listHtml = '<ul>';
            Object.keys(counts).forEach(name => {
              listHtml += `<li>🛍️ <strong>${name}</strong>: acquistato ${counts[name]} volte</li>`;
            });
            listHtml += '</ul>';
            analyticsBox.innerHTML = `
              <p style="margin-bottom: 10px;">Storico acquisti registrato. Prodotti popolari nel regno:</p>
              ${listHtml}
            `;
          }
      }

      // Documenti legali
      document.getElementById('legal-doc-privacy').value = settings.privacy || '';
      document.getElementById('legal-doc-terms').value = settings.terms || '';
      document.getElementById('legal-doc-cookies').value = settings.cookies || '';
      document.getElementById('legal-doc-gdpr').value = settings.gdpr || '';

      this.renderAdminAllUsers();
      this.renderAdminSchoolsList();
    };

window.EroiApp.setAdminUserFilter = function(filter) {
        this.adminUserFilter = filter;
        
        const usersWrapper = document.getElementById('admin-users-table-wrapper');
        const schoolsWrapper = document.getElementById('admin-schools-table-wrapper');
        
        if (filter === 'schools') {
            if (usersWrapper) usersWrapper.style.display = 'none';
            if (schoolsWrapper) schoolsWrapper.style.display = 'block';
            this.renderAdminSchoolsList();
        } else {
            if (usersWrapper) usersWrapper.style.display = 'block';
            if (schoolsWrapper) schoolsWrapper.style.display = 'none';
            this.renderAdminAllUsers();
        }
        
        // Update UI for active filter
        const cards = document.querySelectorAll('.filter-card');
        cards.forEach(card => {
            if (card.dataset.filter === filter) {
                card.style.border = '2px solid #5D5FEF';
            } else {
                card.style.border = '2px solid transparent';
            }
        });
    };

window.EroiApp.renderAdminAllUsers = async function() {
      const tbody = document.querySelector('#admin-all-users-table tbody');
      if(!tbody) return;
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Sincronizzazione utenti in corso dal cloud...</td></tr>';

      try {
        await window.EroiDB.syncCloudUsers();
      } catch (e) {
        console.warn("Errore durante syncCloudUsers in renderAdminAllUsers:", e);
      }
      
      const users = window.EroiDB.getAllUsers();
      
      // Update Summary Cards
      const counts = { totale: users.length, docenti: 0, studenti: 0, forestieri: 0, scuole: 0 };
      const scuoleSet = new Set();
      
      users.forEach(u => {
          if (u.role === 'admin' || u.role === 'teacher' || u.role === 'docente') counts.docenti++;
          else if (u.role === 'forestiero') counts.forestieri++;
          else counts.studenti++;
          
          if (u.scuola && u.scuola.trim() !== '') scuoleSet.add(u.scuola.trim().toLowerCase());
      });
      counts.scuole = scuoleSet.size;
      
      const elTotal = document.getElementById('admin-count-total');
      const elStudents = document.getElementById('admin-count-students');
      const elTeachers = document.getElementById('admin-count-teachers');
      const elForestieri = document.getElementById('admin-count-forestieri');
      const elSchools = document.getElementById('admin-count-schools');
      
      if (elTotal) elTotal.innerText = counts.totale;
      if (elStudents) elStudents.innerText = counts.studenti;
      if (elTeachers) elTeachers.innerText = counts.docenti;
      if (elForestieri) elForestieri.innerText = counts.forestieri;
      if (elSchools) elSchools.innerText = counts.scuole;

      tbody.innerHTML = '';

      // Applica filtro
      const filter = this.adminUserFilter || 'all';
      let filteredUsers = users;
      if (filter === 'student') {
          filteredUsers = users.filter(u => u.role !== 'docente' && u.role !== 'admin' && u.role !== 'teacher' && u.role !== 'forestiero');
      } else if (filter === 'teacher') {
          filteredUsers = users.filter(u => u.role === 'docente' || u.role === 'admin' || u.role === 'teacher');
      } else if (filter === 'forestiero') {
          filteredUsers = users.filter(u => u.role === 'forestiero');
      }

      if (filteredUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Nessun utente trovato</td></tr>';
        return;
      }

      // Sort logic
      const state = this.sortState.adminAll;
      filteredUsers.sort((a, b) => {
          let valA, valB;
          if (state.col === 'name') { valA = (a.name || '').toLowerCase(); valB = (b.name || '').toLowerCase(); }
          else if (state.col === 'email') { valA = (a.email || '').toLowerCase(); valB = (b.email || '').toLowerCase(); }
          else if (state.col === 'role') { valA = (a.role || '').toLowerCase(); valB = (b.role || '').toLowerCase(); }
          else if (state.col === 'date') { valA = this.getDateValue(a); valB = this.getDateValue(b); }
          else { valA = (a.name || '').toLowerCase(); valB = (b.name || '').toLowerCase(); }
          
          if (valA < valB) return state.asc ? -1 : 1;
          if (valA > valB) return state.asc ? 1 : -1;
          return 0;
      });

      filteredUsers.forEach(u => {
        const tr = document.createElement('tr');
        const isDocente = u.role === 'docente' || u.role === 'admin' || u.role === 'teacher';
        
        tr.innerHTML = `
          <td><strong>${u.name || 'Sconosciuto'}</strong></td>
          <td>${u.email}</td>
          <td>
            <select class="input-field" style="padding: 4px; font-size: 0.75rem; width: auto;" onchange="EroiApp.changeUserRole('${u.email}', this.value)" ${u.email === 'prof.memmo@gmail.com' ? 'disabled' : ''}>
              <option value="student" ${u.role !== 'docente' && u.role !== 'admin' && u.role !== 'teacher' && u.role !== 'forestiero' ? 'selected' : ''}>Studente</option>
              <option value="docente" ${u.role === 'docente' || u.role === 'admin' || u.role === 'teacher' ? 'selected' : ''}>Docente</option>
              <option value="forestiero" ${u.role === 'forestiero' ? 'selected' : ''}>Forestiero</option>
            </select>
          </td>
          <td style="font-size:0.85rem; color:var(--text-muted);">${this.getDateValue(u) > 0 ? new Date(this.getDateValue(u)).toLocaleDateString('it-IT') : 'N/D'}</td>
          <td style="text-align:center;"><a href="mailto:${u.email}" title="Scrivi a ${u.name || 'Sconosciuto'}" style="color:var(--gold); text-decoration:none;"><i class="fa-solid fa-envelope"></i></a></td>
          <td>
            ${u.email !== 'prof.memmo@gmail.com' ? `
              <button class="btn btn-danger" style="padding: 4px 8px; font-size:0.75rem;" onclick="EroiApp.deleteUserAdmin('${u.email}')">
                <i class="fa-solid fa-trash"></i> Elimina
              </button>
            ` : '<span style="color:var(--text-muted); font-size:0.75rem;">Admin Intoccabile</span>'}
          </td>
        `;
        tbody.appendChild(tr);
      });
    };

window.EroiApp.deleteUserAdmin = async function(email) {
      if (!confirm(`Sei ASSOLUTAMENTE sicuro di voler eliminare DEFINITIVAMENTE l'utente ${email}? L'azione è irreversibile e cancellerà anche i suoi progressi se è studente.`)) return;
      try {
        await window.EroiDB.deleteUser(email);
        this.showToast(`Utente ${email} eliminato definitivamente.`, "success");
        this.renderAdminAllUsers();
      } catch (e) {
        console.error("Errore eliminazione utente:", e);
        alert("Errore durante l'eliminazione: " + e.message);
      }
    };

window.EroiApp.filterAdminUsers = function() {
      const query = document.getElementById('admin-search-users').value.toLowerCase();
      const trs = document.querySelectorAll('#admin-all-users-table tbody tr');
      trs.forEach(tr => {
        if (tr.children.length > 1) {
          const name = tr.children[0].innerText.toLowerCase();
          const email = tr.children[1].innerText.toLowerCase();
          if (name.includes(query) || email.includes(query)) {
            tr.style.display = '';
          } else {
            tr.style.display = 'none';
          }
        }
      });
    };

window.EroiApp.renderAdminSchoolsList = function() {
      const classes = window.EroiDB.getClasses();
      const tbody = document.querySelector('#admin-schools-table tbody');
      if (!tbody) return;
      tbody.innerHTML = '';

      // Raggruppa per scuola (tutte le classi presenti nel DB)
      const schoolMap = {};
      Object.values(classes).forEach(c => {
        if (!c.school) return;
        if (!schoolMap[c.school]) {
          schoolMap[c.school] = { city: c.city || '—', classes: [] };
        }
        schoolMap[c.school].classes.push(c.name || c.id);
      });

      const schools = Object.keys(schoolMap);
      if (schools.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;"><i>Nessuna scuola registrata nel sistema.</i></td></tr>`;
        return;
      }

      schools.forEach(school => {
        const { city, classes: classList } = schoolMap[school];
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${school}</strong></td>
          <td>${city}</td>
          <td>${classList.map(cn => `<span style="background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; margin-right: 4px;">${cn}</span>`).join('')}</td>
        `;
        tbody.appendChild(tr);
      });
    };

