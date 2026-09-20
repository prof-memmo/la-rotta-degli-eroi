window.EroiDB = window.EroiDB || {};

window.EroiDB.getClasses = function() {
  return dbState.classes || {};
};

window.EroiDB.syncCloudClasses = async function() {
  if (!window.fbDb) return;
  try {
    const user = window.Auth ? window.Auth.getUser() : null;
    if (!user) return;
    const uid = (window.fbAuth && window.fbAuth.currentUser) ? window.fbAuth.currentUser.uid : null;
    const email = (user.email || '').toLowerCase();
    const isSuperAdmin = user.role === 'admin' || email === 'prof.memmo@gmail.com';

    let snap;
    if (isSuperAdmin) {
      snap = await window.fbDb.collection('hub_classes').get().catch(() => ({ docs: [] }));
    } else {
      const q1 = uid ? window.fbDb.collection('hub_classes').where('teacherId', '==', uid).get().catch(() => ({ docs: [] })) : Promise.resolve({ docs: [] });
      const q2 = window.fbDb.collection('hub_classes').where('teacherEmail', '==', email).get().catch(() => ({ docs: [] }));
      const q3 = uid ? window.fbDb.collection('hub_classes').where('teacherIds', 'array-contains', uid).get().catch(() => ({ docs: [] })) : Promise.resolve({ docs: [] });
      const q4 = window.fbDb.collection('hub_classes').where('collaboratori', 'array-contains', email).get().catch(() => ({ docs: [] }));
      const results = await Promise.all([q1, q2, q3, q4]);
      const docMap = new Map();
      results.forEach(r => r.docs && r.docs.forEach(d => docMap.set(d.id, d)));
      snap = { docs: Array.from(docMap.values()) };
    }

    dbState.classes = {};
    dbState.students_profile = {};

    if (snap && snap.docs) {
      snap.docs.forEach(doc => {
        const d = doc.data() || {};
        const classId = doc.id;
        const className = d.name || d.nome || `Classe ${d.code || classId}`;
        const classCode = d.code || classId;
        
        dbState.classes[classId] = {
          id: classId,
          name: className,
          code: classCode,
          teacher: d.teacherEmail || (d.teacherId === uid ? email : (d.teacher || '')),
          collaborators: d.collaboratori || d.collaborators || [],
          school: (d.anagrafica && d.anagrafica.istituto) || d.school || d.istituto || '',
          city: (d.anagrafica && d.anagrafica.citta) || d.city || d.citta || '',
          roster: d.roster || {},
          isTest: d.isTest || false
        };

        // Popola gli studenti dal roster reale di questa classe
        if (d.roster && typeof d.roster === 'object') {
          Object.entries(d.roster).forEach(([slotKey, student]) => {
            if (student && (student.nickname || student.claimed || student.name)) {
              const studentKey = `${classId}_${slotKey}`.toLowerCase();
              const nick = student.nickname || student.name || `Studente ${slotKey.toUpperCase()}`;
              dbState.students_profile[studentKey] = {
                slotKey: slotKey,
                classId: classId,
                className: className,
                name: nick,
                email: student.email || `${classCode}_${slotKey}@studenti.prof-memmo.local`,
                avatarClass: student.avatar || 'Custode della Sapienza',
                level: student.level || 'Viaggiatore',
                xp: student.xp || student.punti || 0,
                dracme: student.dracme || student.dobloni || 10,
                stats: student.stats || { coraggio: 10, astuzia: 10, sapienza: 10, onore: 10 },
                activeHelper: student.activeHelper || null,
                activeArtifacts: student.activeArtifacts || [],
                unlockedAreas: student.unlockedAreas || ["Accademia"],
                joinedAt: student.joinedAt || d.createdAt || Date.now()
              };
            }
          });
        }
      });
      window.EroiDB.save();
    }
  } catch (e) {
    console.warn("Sync cloud classes error from hub_classes:", e);
  }
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
    this.save();
  }
  if (window.fbDb) {
    window.fbDb.collection('hub_classes').doc(classId).delete().catch(e => {
      console.warn("Firestore delete class error:", e);
    });
  }
};

