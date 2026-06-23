setTimeout(async () => {
    if (!window.fbDb) return;
    try {
        const q = await window.fbDb.collection('users').where('email', '==', 'guglielmo.piersanti@gmail.com').get();
        if (!q.empty) {
            const docId = q.docs[0].id;
            await window.fbDb.collection('users').doc(docId).update({
                role: 'docente',
                setupComplete: true,
                approved: true
            });
            console.log("Utente guglielmo.piersanti@gmail.com approvato forzatamente!");
        } else {
            console.log("Utente guglielmo.piersanti@gmail.com non trovato in users!");
        }
    } catch (e) {
        console.error(e);
    }
}, 5000);
