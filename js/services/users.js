window.EroiDB = window.EroiDB || {};

window.EroiDB.getUser = function(email) {
  if (!email) return null;
  return (dbState.users && dbState.users[email.toLowerCase()]) || null;
};

window.EroiDB.saveUser = function(email, userData) {
  if (!email) return;
  const key = email.toLowerCase();
  if (!dbState.users) dbState.users = {};
  dbState.users[key] = { ...dbState.users[key], ...userData };
  this.save();
};

window.EroiDB.updateUserRole = async function(email, newRole) {
  if (!email) return;
  const key = email.toLowerCase();
  if (dbState.users && dbState.users[key]) {
    dbState.users[key].role = newRole;
    this.save();
  }
  if (window.fbDb) {
    try {
      const q = await window.fbDb.collection('hub_users').where('email', '==', email).get();
      if (!q.empty) {
        await window.fbDb.collection('hub_users').doc(q.docs[0].id).update({ role: newRole });
      }
    } catch (e) {
      console.error("Firestore update role error:", e);
    }
  }
};

window.EroiDB.deleteUser = async function(email) {
  if (!email) return;
  const key = email.toLowerCase();
  if (dbState.users && dbState.users[key]) {
    delete dbState.users[key];
    if (dbState.students_profile && dbState.students_profile[key]) {
      delete dbState.students_profile[key];
    }
    if (dbState.inventories && dbState.inventories[key]) {
      delete dbState.inventories[key];
    }
    this.save();
  }
  if (window.fbDb) {
    try {
      const q = await window.fbDb.collection('hub_users').where('email', '==', email).get();
      if (!q.empty) {
        const batch = window.fbDb.batch();
        q.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
      }
    } catch (e) {
      console.error("Firestore delete user error:", e);
    }
  }
};

window.EroiDB.getAllUsers = function() {
  return Object.values(dbState.users || {});
};

window.EroiDB.syncCloudUsers = async function() {
  if (!window.fbDb) return;
  try {
    // Sincronizza prima le classi per identificare i docenti attivi sulla Rotta
    let classesTeachers = new Set();
    try {
      const clsSnap = await window.fbDb.collection('hub_classes').get().catch(() => ({ docs: [] }));
      clsSnap.docs.forEach(cd => {
        const cdata = cd.data() || {};
        if (cdata.teacherEmail) classesTeachers.add(cdata.teacherEmail.toLowerCase().trim());
        if (Array.isArray(cdata.collaboratori)) {
          cdata.collaboratori.forEach(em => classesTeachers.add(String(em).toLowerCase().trim()));
        }
      });
    } catch (_) {}

    const snap = await window.fbDb.collection('hub_users').get().catch(() => ({ docs: [] }));
    let changed = false;
    dbState.users = {};

    const mockTestEmails = [
      'testhero12345@gmail.com',
      'test@example.com',
      'docente.aurora@gmail.com',
      'achille.studente@gmail.com',
      'ulisse.studente@gmail.com',
      'artu.studente@gmail.com'
    ];

    snap.docs.forEach(doc => {
      const d = doc.data() || {};
      const email = (d.email || '').toLowerCase().trim();
      if (!email || email.includes('studenti.prof-memmo.local') || email.includes('@studenti.profmemmo.internal')) return;
      if (mockTestEmails.includes(email)) return;
      if (d.role === 'pending' || d.statusAccount === 'pending') return;

      const userPlan = (d.plan || d.abbonamento || d.subscription || 'base').toLowerCase();
      const userGioco = (d.gioco || d.game || '').toLowerCase();
      const isAdmin = d.role === 'admin' || email === 'prof.memmo@gmail.com';
      const isViandante = d.role === 'viandante' || d.role === 'forestiero' || userPlan === 'viandante';
      const hasEcosystemPlan = userPlan.includes('ecosistema') || userPlan.includes('didattic');
      const isRottaGame = userGioco.includes('eroi') || userGioco.includes('rotta');
      const hasClasses = classesTeachers.has(email);

      // Includi SOLO utenti che hanno accesso a La Rotta degli Eroi
      if (!isAdmin && !isViandante && !hasEcosystemPlan && !isRottaGame && !hasClasses) {
        return;
      }

      let role = 'docente';
      if (isAdmin) role = 'admin';
      else if (isViandante) role = 'forestiero';
      else role = 'docente';

      const userObj = {
        id: doc.id,
        email: email,
        name: (d.anagrafica && (d.anagrafica.nome || d.anagrafica.cognome))
          ? `${d.anagrafica.nome || ''} ${d.anagrafica.cognome || ''}`.trim()
          : (d.nome ? `${d.nome || ''} ${d.cognome || ''}`.trim() : (d.displayName || email.split('@')[0])),
        role: role,
        plan: userPlan,
        scuola: (d.anagrafica && d.anagrafica.istituto) || d.scuola || d.school || '',
        classId: d.classId || '',
        joinedAt: d.createdAt ? (d.createdAt.toDate ? d.createdAt.toDate().getTime() : new Date(d.createdAt).getTime()) : Date.now()
      };

      dbState.users[email] = userObj;
      changed = true;
    });

    if (changed) this.save();
  } catch(e) {
    console.warn("Sync cloud users error:", e);
  }
};

window.EroiDB.getStudentProfile = function(email) {
  if (!email) return null;
  return (dbState.students_profile && dbState.students_profile[email.toLowerCase()]) || null;
};

window.EroiDB.saveStudentProfile = function(email, profileData) {
  if (!email) return;
  const key = email.toLowerCase();
  if (!dbState.students_profile) dbState.students_profile = {};
  dbState.students_profile[key] = { ...dbState.students_profile[key], ...profileData };
  this.save();
};

window.EroiDB.getAllStudents = function() {
  return Object.values(dbState.students_profile || {});
};

window.EroiDB.getTeacherPlayerProfile = function(email) {
  if (!dbState.teacher_profiles) dbState.teacher_profiles = {};
  return dbState.teacher_profiles[email.toLowerCase()] || null;
};

window.EroiDB.saveTeacherPlayerProfile = function(email, profileData) {
  if (!dbState.teacher_profiles) dbState.teacher_profiles = {};
  const key = email.toLowerCase();
  dbState.teacher_profiles[key] = { ...dbState.teacher_profiles[key], ...profileData };
  this.save();
};
