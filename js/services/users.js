window.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getUser =(email) {
      return dbState.users[email.toLowerCase()] || null;
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.saveUser =(email, userData) {
      const key = email.toLowerCase();
      dbState.users[key] = { ...dbState.users[key], ...userData };
      this.save();
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.updateUserRole =(email, newRole) {
      const key = email.toLowerCase();
      if (dbState.users[key]) {
        dbState.users[key].role = newRole;
        this.save();
      };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.deleteUser =(email) {
      const key = email.toLowerCase();
      if (dbState.users[key]) {
        delete dbState.users[key];
        if (dbState.students_profile[key]) {
          delete dbState.students_profile[key];
        };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getAllUsers =() {
      return Object.values(dbState.users);
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.syncCloudUsers =() {
      if (!window.fbDb) return;
      try {
        const snap = await window.fbDb.collection('users').get();
        let changed = false;
        snap.docs.forEach(doc => {
          const d = doc.data();
          if (!d.email || d.role === 'pending' || d.status === 'pending') return; // I pending si gestiscono a parte
          const key = d.email.toLowerCase();
          if (!dbState.users[key]) {
            dbState.users[key] = d;
            changed = true;
          } else {
            // Aggiorna se i ruoli non coincidono
            if (dbState.users[key].role !== d.role) {
              dbState.users[key].role = d.role;
              changed = true;
            };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getStudentProfile =(email) {
      return dbState.students_profile[email.toLowerCase()] || null;
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.saveStudentProfile =(email, profileData) {
      const key = email.toLowerCase();
      dbState.students_profile[key] = { ...dbState.students_profile[key], ...profileData };
      this.save();
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getAllStudents =() {
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
        };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getTeacherPlayerProfile =(email) {
      if (!dbState.teacher_profiles) dbState.teacher_profiles = {};
      return dbState.teacher_profiles[email.toLowerCase()] || null;
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.saveTeacherPlayerProfile =(email, profileData) {
      if (!dbState.teacher_profiles) dbState.teacher_profiles = {};
      const key = email.toLowerCase();
      dbState.teacher_profiles[key] = { ...dbState.teacher_profiles[key], ...profileData };
      this.save();
    };\n