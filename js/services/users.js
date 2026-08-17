window.EroiDB = window.EroiDB || {};

window.EroiDB.getUser = function(email) {
      return dbState.users[email.toLowerCase()] || null;
    };

window.EroiDB.saveUser = function(email, userData) {
      const key = email.toLowerCase();
      dbState.users[key] = { ...dbState.users[key], ...userData };
      this.save();
    };

window.EroiDB.updateUserRole = async function(email, newRole) {
      const key = email.toLowerCase();
      if (dbState.users[key]) {
        dbState.users[key].role = newRole;
        this.save();
      }
      if (window.fbDb) {
        try {
          const q = await window.fbDb.collection('users').where('email', '==', email).get();
          if (!q.empty) {
            await window.fbDb.collection('users').doc(q.docs[0].id).update({ role: newRole });
          }
        } catch (e) {
          console.error("Firestore update role error:", e);
        }
      }
    };

window.EroiDB.deleteUser = async function(email) {
      const key = email.toLowerCase();
      if (dbState.users[key]) {
        delete dbState.users[key];
        if (dbState.students_profile[key]) {
          delete dbState.students_profile[key];
        }
        if (dbState.inventories[key]) {
          delete dbState.inventories[key];
        }
        this.save();
      }
      // Elimina anche da Firestore per mantenere la sincronia
      if (window.fbDb) {
        try {
          const q = await window.fbDb.collection('users').where('email', '==', email).get();
          if (!q.empty) {
            const batch = window.fbDb.batch();
            q.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
          }
        } catch (e) { console.error("Firestore delete user error:", e); }
      }
    };

window.EroiDB.getAllUsers = function() {
      return Object.values(dbState.users);
    };

window.EroiDB.syncCloudUsers = async function() {
      if (!window.fbDb) return;
      try {
        let snap = await window.fbDb.collection('users').get();
        if (snap.empty) {
          try { snap = await window.fbDb.collection('eroi_users').get(); } catch(e){}
        }
        let changed = false;
        snap.docs.forEach(doc => {
          const d = doc.data();
          const email = (d.email || doc.id).toLowerCase().trim();
          if (!email || d.role === 'pending' || d.status === 'pending') return;
          const userObj = {
            ...d,
            email: email,
            name: d.name || d.nome || d.displayName || email.split('@')[0],
            role: d.role || d.ruolo || 'student',
            scuola: d.scuola || d.school || '',
            classId: d.classId || d.classe || '',
            joinedAt: d.joinedAt || d.createdAt || Date.now()
          };
          if (!dbState.users[email]) {
            dbState.users[email] = userObj;
            changed = true;
          } else {
            dbState.users[email] = { ...dbState.users[email], ...userObj };
            changed = true;
          }
        });
        if (changed) this.save();
      } catch(e) { console.warn("Sync cloud users error:", e); }
    };

window.EroiDB.getStudentProfile = function(email) {
      return dbState.students_profile[email.toLowerCase()] || null;
    };

window.EroiDB.saveStudentProfile = function(email, profileData) {
      const key = email.toLowerCase();
      dbState.students_profile[key] = { ...dbState.students_profile[key], ...profileData };
      this.save();
    };

window.EroiDB.getAllStudents = function() {
      const profiles = Object.values(dbState.students_profile);
      const allUsers = Object.values(dbState.users || {});
      
      // Fallback per gli studenti registrati su Firebase che non hanno ancora il profilo locale sincronizzato
      allUsers.forEach(u => {
        const key = (u.email || '').toLowerCase();
        if (key && u.role === 'student' && !dbState.students_profile[key]) {
           profiles.push({
             name: u.name || u.email.split('@')[0],
             email: u.email,
             avatarClass: 'viandante',
             xp: 0,
             dracme: 10,
             items: [],
             completedMissions: [],
             citta: ''
           });
        }
      });
      return profiles;
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

