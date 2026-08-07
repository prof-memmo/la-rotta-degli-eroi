window.EroiDB = window.EroiDB || {};\nwindow.EroiDB.getMissions =() {
      // Restituisce solo le missioni non nascoste
      return dbState.missions.filter(m => !m.hidden);
    };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.saveMission =(missionId, missionData) {
      const index = dbState.missions.findIndex(m => m.id === missionId);
      if (index !== -1) {
        dbState.missions[index] = { ...dbState.missions[index], ...missionData, hidden: false };
      } else {
        dbState.missions.push({ id: missionId, ...missionData, hidden: false });
      };\n\nwindow.EroiDB = window.EroiDB || {};\nwindow.EroiDB.deleteMission =(missionId) {
      // Elimina definitivamente (solo per missioni custom)
      dbState.missions = dbState.missions.filter(m => m.id !== missionId);
      this.save();
    };\n