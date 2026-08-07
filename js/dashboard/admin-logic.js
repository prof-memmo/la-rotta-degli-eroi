window.EroiApp = window.EroiApp || {};\nwindow.EroiApp.switchAdminTab =(tab) {
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
    };\n\nwindow.EroiApp = window.EroiApp || {};\nwindow.EroiApp.renderAdminDashboard =() {
      const settings = window.EroiDB.getSettings();
      
      // Ricarica input impostazioni globali
      document.getElementById('admin-setting-appname').value = settings.appName;
      document.getElementById('admin-setting-copyright').value = settings.copyright;
      document.getElementById('admin-setting-contacts').value = settings.contacts;

      this.renderPendingRequests();
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
              };\n\nwindow.EroiApp = window.EroiApp || {};\nwindow.EroiApp.setAdminUserFilter =(filter) {
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
        };\n\nwindow.EroiApp = window.EroiApp || {};\nwindow.EroiApp.renderAdminAllUsers =() {
      const tbody = document.querySelector('#admin-all-users-table tbody');
      if(!tbody) return;
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Sincronizzazione utenti in corso dal cloud...</td></tr>';

      try {
        await window.EroiDB.syncCloudUsers();
      } catch (e) {
        console.warn("Errore durante syncCloudUsers in renderAdminAllUsers:", e);
      };\n\nwindow.EroiApp = window.EroiApp || {};\nwindow.EroiApp.deleteUserAdmin =(email) {
      if (!confirm(`Sei ASSOLUTAMENTE sicuro di voler eliminare DEFINITIVAMENTE l'utente ${email}? L'azione è irreversibile e cancellerà anche i suoi progressi se è studente.`)) return;
      try {
        await window.EroiDB.deleteUser(email);
        this.showToast(`Utente ${email} eliminato definitivamente.`, "success");
        this.renderAdminAllUsers();
      } catch (e) {
        console.error("Errore eliminazione utente:", e);
        alert("Errore durante l'eliminazione: " + e.message);
      };\n\nwindow.EroiApp = window.EroiApp || {};\nwindow.EroiApp.filterAdminUsers =() {
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
          };\n\nwindow.EroiApp = window.EroiApp || {};\nwindow.EroiApp.renderAdminSchoolsList =() {
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
        };\n