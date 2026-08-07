window.EroiDB = window.EroiDB || {};

window.EroiDB.getClasses = function() {
      return dbState.classes;
    };

window.EroiDB.saveClass = function(classId, classData) {
      if (!classData.code) {
        classData.code = "ER-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      }
      if (!classData.collaborators) {
        classData.collaborators = [];
      }
      dbState.classes[classId] = { ...dbState.classes[classId], ...classData };
      this.save();
    };

window.EroiDB.deleteClass = function(classId) {
      if (dbState.classes[classId]) {
        delete dbState.classes[classId];
        // Sgancia gli studenti associati a questa classe rimettendoli in classe null
        Object.keys(dbState.users).forEach(email => {
          if (dbState.users[email].classId === classId) {
            dbState.users[email].classId = "";
          }
        });
        this.save();
      }
    };

