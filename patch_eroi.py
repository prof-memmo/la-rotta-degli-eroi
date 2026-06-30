import re

app_path = "/Users/guglielmopiersanti/.gemini/antigravity-ide/scratch/la-rotta-degli-eroi/js/app.js"
index_path = "/Users/guglielmopiersanti/.gemini/antigravity-ide/scratch/la-rotta-degli-eroi/index.html"

with open(app_path, "r", encoding="utf-8") as f:
    app_js = f.read()

# 1. UPDATE archiviaAnnoCorrente
old_archivia = r"""          const usersSnapshot = await window.fbDb.collection('users').get();
          let batch = window.fbDb.batch();
          
          usersSnapshot.docs.forEach(doc => {
              const data = doc.data();
              if (data.role !== 'admin' && data.role !== 'docente') {
                  batch.update(doc.ref, { archivedYear: backupName, status: 'archived', classId: null, classCode: null });
              }
          });"""

new_archivia = """          const usersSnapshot = await window.fbDb.collection('users').get();
          const classesSnapshot = await window.fbDb.collection('classes').get();
          let batch = window.fbDb.batch();
          
          // CREATE SNAPSHOT FOR THE ARCHIVE
          let leaderboard = [];
          classesSnapshot.docs.forEach(doc => {
              const data = doc.data();
              if(data.status !== 'archived') {
                  leaderboard.push({
                      id: doc.id,
                      name: data.name,
                      points: data.xp || data.points || 0,
                      dracme: data.dracme || 0,
                      school: data.school || '',
                      classRoom: data.classRoom || data.section || ''
                  });
                  batch.update(doc.ref, { archivedYear: backupName, status: 'archived' });
              }
          });
          leaderboard.sort((a,b) => b.points - a.points);
          
          const archiveRef = window.fbDb.collection('archives').doc();
          batch.set(archiveRef, {
              yearName: backupName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              leaderboard: leaderboard
          });

          usersSnapshot.docs.forEach(doc => {
              const data = doc.data();
              if (data.role !== 'admin' && data.role !== 'docente' && data.status !== 'archived') {
                  batch.update(doc.ref, { 
                      archivedYear: backupName, 
                      status: 'archived', 
                      archivedClassId: data.classId || null,
                      archivedClassCode: data.classCode || null,
                      classId: null, 
                      classCode: null 
                  });
              }
          });"""

if old_archivia in app_js:
    app_js = app_js.replace(old_archivia, new_archivia)

# 2. ADD ripristinaAnnoArchiviato & loadHistoricalArchives into EroiApp
new_functions = """    ripristinaAnnoArchiviato: async function(backupName) {
      if(!EroiDB.isAdminOrDocente()) return;
      if(!confirm(`Sei ASSOLUTAMENTE sicuro di voler RIPRISTINARE l'anno archiviato "${backupName}"?\\nQuesta operazione rimetterà in gioco tutte le classi e gli studenti di quell'anno.`)) return;
      try {
          const usersSnapshot = await window.fbDb.collection('users').where('archivedYear', '==', backupName).get();
          const classesSnapshot = await window.fbDb.collection('classes').where('archivedYear', '==', backupName).get();
          const archivesSnapshot = await window.fbDb.collection('archives').where('yearName', '==', backupName).get();
          
          let batch = window.fbDb.batch();
          
          usersSnapshot.docs.forEach(doc => {
              const data = doc.data();
              batch.update(doc.ref, { 
                  status: 'active', 
                  classId: data.archivedClassId || null, 
                  classCode: data.archivedClassCode || null,
                  archivedYear: firebase.firestore.FieldValue.delete(),
                  archivedClassId: firebase.firestore.FieldValue.delete(),
                  archivedClassCode: firebase.firestore.FieldValue.delete()
              });
          });

          classesSnapshot.docs.forEach(doc => {
              batch.update(doc.ref, { 
                  status: 'active',
                  archivedYear: firebase.firestore.FieldValue.delete()
              });
          });

          archivesSnapshot.docs.forEach(doc => {
              batch.delete(doc.ref);
          });

          await batch.commit();
          this.showToast(`Ripristino dell'anno "${backupName}" completato con successo!`, 'success');
          setTimeout(() => window.location.reload(), 1500);
      } catch(e) {
          console.error(e);
          alert("Errore durante il ripristino: " + e.message);
      }
    },

    loadHistoricalArchives: async function() {
      if(!EroiDB.isAdminOrDocente()) return;
      try {
          const snapshot = await window.fbDb.collection('archives').orderBy('timestamp', 'desc').get();
          const container = document.getElementById('admin-historical-archives-list');
          if(!container) return;
          
          if(snapshot.empty) {
              container.innerHTML = '<p style="color:var(--text-muted); font-size: 0.9rem;">Nessun anno archiviato trovato.</p>';
              return;
          }
          
          let html = '<div style="display: flex; flex-direction: column; gap: 15px;">';
          snapshot.docs.forEach(doc => {
              const data = doc.data();
              const d = data.timestamp ? data.timestamp.toDate().toLocaleDateString() : 'Data Sconosciuta';
              
              let lbHtml = '<div style="margin-top:10px; display:none; background:rgba(0,0,0,0.2); padding:10px; border-radius:6px;" id="archive-lb-'+doc.id+'">';
              lbHtml += '<h4 style="margin-bottom:10px; color:var(--gold); border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">Classifica Finale</h4>';
              
              if(data.leaderboard && data.leaderboard.length > 0) {
                  data.leaderboard.forEach((t, i) => {
                      let badge = '';
                      if(i===0) badge = '🥇';
                      else if(i===1) badge = '🥈';
                      else if(i===2) badge = '🥉';
                      else badge = (i+1)+'°';
                      
                      lbHtml += `<div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px dashed rgba(255,255,255,0.05); font-size:0.9rem;">
                          <span>${badge} <strong>${t.name}</strong> <span style="color:var(--text-muted); font-size:0.8rem;">(${t.classRoom} - ${t.school})</span></span>
                          <span style="color:var(--gold); font-weight:bold;">${t.points} xp</span>
                      </div>`;
                  });
              } else {
                  lbHtml += '<p style="font-size:0.85rem; color:var(--text-muted);">Classifica non disponibile o vuota.</p>';
              }
              lbHtml += '</div>';

              html += `
              <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                      <div>
                          <h4 style="margin: 0; color: var(--text-light); font-size: 1.1rem;"><i class="fa-solid fa-box-archive" style="color:var(--accent-gold);"></i> ${data.yearName}</h4>
                          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Archiviato il: ${d}</div>
                      </div>
                      <div style="display: flex; gap: 10px;">
                          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="const el = document.getElementById('archive-lb-${doc.id}'); el.style.display = el.style.display === 'none' ? 'block' : 'none';"><i class="fa-solid fa-eye"></i> Classifica</button>
                          <button class="btn text-danger" style="background: rgba(231, 76, 60, 0.1); border: 1px solid var(--danger-color); padding: 6px 12px; font-size: 0.8rem;" onclick="EroiApp.ripristinaAnnoArchiviato('${data.yearName}')"><i class="fa-solid fa-rotate-left"></i> Ripristina</button>
                      </div>
                  </div>
                  ${lbHtml}
              </div>`;
          });
          html += '</div>';
          container.innerHTML = html;
      } catch(e) {
          console.error("Errore caricamento archivio storico:", e);
      }
    },
"""

if "ripristinaAnnoArchiviato:" not in app_js:
    # insert before archiviaAnnoCorrente: async function
    app_js = app_js.replace("archiviaAnnoCorrente: async function", new_functions + "\n    archiviaAnnoCorrente: async function")

# Call loadHistoricalArchives on admin load
load_admin_hook = r"this.renderAdminClassesList();"
new_load_admin_hook = r"""this.renderAdminClassesList();
        this.loadHistoricalArchives();"""
app_js = app_js.replace(load_admin_hook, new_load_admin_hook)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_js)

# 3. UPDATE admin.html
with open(index_path, "r", encoding="utf-8") as f:
    index_html = f.read()

admin_archivio_ui = """              <div style="margin-top: 30px; padding: 15px; border: 1px solid var(--danger-color); border-radius: 10px; background: rgba(231, 76, 60, 0.1);">
                  <h3 class="text-danger" style="margin-top:0;"><i class="fa-solid fa-triangle-exclamation"></i> Danger Zone: Archiviazione Annuale</h3>
                  <p style="font-size: 0.85rem; margin-bottom: 15px; color: var(--text-light);">Questa opzione trasferisce tutti gli studenti dell'anno in corso nell'Archivio Storico. Non è reversibile!</p>
                  <button class="btn text-danger" style="width: 100%; background: transparent; border: 1px solid var(--danger-color);" onclick="EroiApp.archiviaAnnoCorrente()">
                      <i class="fa-solid fa-box-archive"></i> Esegui Archiviazione Anno
                  </button>
              </div>"""

new_admin_archivio_ui = """              <div style="margin-top: 30px; padding: 15px; border: 1px solid var(--danger-color); border-radius: 10px; background: rgba(231, 76, 60, 0.1);">
                  <h3 class="text-danger" style="margin-top:0;"><i class="fa-solid fa-triangle-exclamation"></i> Danger Zone: Archiviazione Annuale</h3>
                  <p style="font-size: 0.85rem; margin-bottom: 15px; color: var(--text-light);">Questa opzione archivia tutte le classi e gli studenti dell'anno in corso, salvandone una "fotografia" della classifica. Se necessario, l'operazione potrà essere annullata dall'Archivio Storico.</p>
                  <button class="btn text-danger" style="width: 100%; background: transparent; border: 1px solid var(--danger-color);" onclick="EroiApp.archiviaAnnoCorrente()">
                      <i class="fa-solid fa-box-archive"></i> Esegui Archiviazione Anno
                  </button>
              </div>
              
              <div id="admin-historical-archives-area" style="margin-top: 30px; padding: 15px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: rgba(255, 255, 255, 0.02);">
                  <h3 style="color: var(--gold); margin-top:0;"><i class="fa-solid fa-clock-rotate-left"></i> Archivio Storico</h3>
                  <p style="font-size: 0.85rem; margin-bottom: 15px; color: var(--text-muted);">Consulta le classifiche degli anni passati o ripristina un anno archiviato per errore.</p>
                  <div id="admin-historical-archives-list">
                      <p style="font-size: 0.85rem; color: var(--text-muted);">Caricamento archivio in corso...</p>
                  </div>
              </div>"""

if admin_archivio_ui in index_html:
    index_html = index_html.replace(admin_archivio_ui, new_admin_archivio_ui)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(index_html)

print("Patch applied to La Rotta degli Eroi.")
