window.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getClasses =() {
      return dbState.classes;
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.saveClass =(classId, classData) {
      if (!classData.code) {
        classData.code = "ER-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.deleteClass =(classId) {
      if (dbState.classes[classId]) {
        delete dbState.classes[classId];
        // Sgancia gli studenti associati a questa classe rimettendoli in classe null
        Object.keys(dbState.users).forEach(email => {
          if (dbState.users[email].classId === classId) {
            dbState.users[email].classId = "";
          };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getClassByCode =(code) {
      const cleanCode = code.trim().toUpperCase();
      return Object.values(dbState.classes).find(c => c.code && c.code.toUpperCase() === cleanCode) || null;
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.joinClassAsCollaborator =(classId, email) {
      const c = dbState.classes[classId];
      if (c) {
        if (!c.collaborators) c.collaborators = [];
        const cleanEmail = email.toLowerCase();
        if (!c.collaborators.includes(cleanEmail)) {
          c.collaborators.push(cleanEmail);
          this.save();
        };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.leaveClassAsCollaborator =(classId, email) {
      const c = dbState.classes[classId];
      if (c && c.collaborators) {
        const cleanEmail = email.toLowerCase();
        c.collaborators = c.collaborators.filter(e => e !== cleanEmail);
        this.save();
      };\n