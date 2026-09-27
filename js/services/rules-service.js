/**
 * ===================================================================
 * RULES-SERVICE.JS - Modulo Centralizzato e Dinamico del Regolamento
 * Progetto: La Rotta degli Eroi (Ecosistema Prof. Memmo)
 * ===================================================================
 * 
 * - Preserva fedelmente lo stile grafico nativo de La Rotta degli Eroi (border-left gold, box studente/docente)
 * - Sincronizzazione Realtime Firestore su collezione "eroi_settings" / doc "official_rules"
 * - Fallback istantaneo offline con zero-flicker
 * - Live Editor per Super-Admin (prof.memmo@gmail.com)
 */

(function(window) {
    'use strict';

    const SUPER_ADMIN_EMAIL = 'prof.memmo@gmail.com';

    const DEFAULT_EROI_RULES_TEXT = `[STUDENTE]
1. Il Cammino dell'Eroe
Il tuo obiettivo è guadagnare XP per salire di livello ed ottenere Dracme da spendere nello Shop. Risolvi i quiz e partecipa alle missioni per progredire sulla mappa.

2. Economia e Progressione
L'economia degli studenti è completamente indipendente. Le quantità di oggetti nel Mercato (stock) diminuiscono solo quando un altro studente acquista l'oggetto.

3. L'Inventario e gli Equipaggiamenti
Nell'inventario puoi accumulare consumabili (indizi, tentativi extra), skin per l'avatar e Artefatti. Puoi tenere attivi fino a 2 Artefatti contemporaneamente.

4. Gli Aiutanti (Secondo Quadrimestre)
Dal secondo quadrimestre potrai scegliere un Aiutante fisso (Eroi, Paladini, Cavalieri o Divinità) che ti garantirà un bonus passivo, un potere speciale a usi limitati e un'immunità contro malus. Questa funzione si attiva automaticamente a partire dal 1° febbraio di ogni anno scolastico.

5. Benessere e Pausa di Navigazione
A tutela del benessere visivo e della concentrazione, dopo 45 minuti di navigazione continua è prevista una pausa di riposo per consentire il recupero delle energie.

[DOCENTE]
1. Due Mondi Separati (Universo Parallelo)
Il docente opera in un universo parallelo. Può giocare come un normale studente (accumulando XP e Dracme reali sul proprio profilo), ma senza MAI interferire con l'economia, lo stock o i log degli studenti.

2. Isolamento Economico
Gli acquisti del docente nello Shop NON decrementano la giacenza (stock) degli oggetti disponibili per gli studenti, né influenzano le statistiche globali.

3. Gestione Didattica
Dal Pannello Docente, l'insegnante gestisce le classi, attiva il 2° quadrimestre e monitora i progressi degli studenti, leggendo esclusivamente i dati del sistema didattico.

4. Non Interferenza
Il gameplay personale del docente è isolato. Qualsiasi progresso nella storia o acquisto effettuato dal docente non ha alcun impatto sul bilanciamento della classe.`;

    const RulesService = {
        _gameKey: 'eroi',
        _collectionName: 'eroi_settings',
        _docId: 'official_rules',
        _storageKey: 'eroi_rules_official_text',
        _rawText: '',
        _lastUpdated: null,
        _updatedBy: '',
        _isInitialized: false,
        _listeners: [],
        _unsubscribeFirestore: null,

        getDefaultText() {
            return DEFAULT_EROI_RULES_TEXT.trim();
        },

        isSuperAdmin(email) {
            const fbUserEmail = (window.fbAuth && window.fbAuth.currentUser && window.fbAuth.currentUser.email) ||
                                (window.firebase && window.firebase.auth && window.firebase.auth().currentUser && window.firebase.auth().currentUser.email);
            const userEmail = (email || fbUserEmail || (window.currentUser && window.currentUser.email) || window.currentUserEmail || '').toLowerCase();
            return userEmail === SUPER_ADMIN_EMAIL.toLowerCase();
        },

        getRawText() {
            return (this._rawText && this._rawText.trim().length > 0) ? this._rawText : this.getDefaultText();
        },

        subscribe(callback) {
            if (typeof callback === 'function' && !this._listeners.includes(callback)) {
                this._listeners.push(callback);
            }
            return () => {
                this._listeners = this._listeners.filter(cb => cb !== callback);
            };
        },

        _notify() {
            const text = this.getRawText();
            this._listeners.forEach(cb => {
                try {
                    cb(text);
                } catch (e) {
                    console.error("Errore listener RulesService (Rotta Eroi):", e);
                }
            });
        },

        async init() {
            // 1. Carica istantaneamente da cache locale o default (Zero-flicker)
            try {
                const cached = localStorage.getItem(this._storageKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed && parsed.text) {
                        this._rawText = parsed.text;
                        this._lastUpdated = parsed.lastUpdated || null;
                        this._updatedBy = parsed.updatedBy || '';
                    }
                }
            } catch (e) {
                console.warn("Errore lettura cache regolamento Rotta Eroi:", e);
            }

            if (!this._rawText) {
                this._rawText = this.getDefaultText();
            }

            this._notify();

            // 2. Setup listener Firestore
            if (this._isInitialized) return;
            this._isInitialized = true;

            const db = window.fbDb || window.db || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
            if (!db) {
                console.info("Firestore non ancora disponibile per Rotta Eroi. Uso cache locale.");
                return;
            }

            try {
                this._unsubscribeFirestore = db.collection('settings').doc(this._docId)
                    .onSnapshot(docSnap => {
                        if (docSnap.exists) {
                            const data = docSnap.data();
                            if (data && data.text) {
                                this._rawText = data.text;
                                this._lastUpdated = data.lastUpdated || null;
                                this._updatedBy = data.updatedBy || '';

                                try {
                                    localStorage.setItem(this._storageKey, JSON.stringify({
                                        text: this._rawText,
                                        lastUpdated: this._lastUpdated,
                                        updatedBy: this._updatedBy
                                    }));
                                } catch (e) {}

                                this._notify();
                            }
                        }
                    }, err => {
                        console.warn("Firestore snapshot regolamento Rotta Eroi (normale se offline):", err.message);
                    });
            } catch (err) {
                console.warn("Inizializzazione Firestore listener regolamento Rotta Eroi fallita:", err);
            }
        },

        async saveToCloud(newText) {
            const db = window.fbDb || window.db || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
            if (!db) {
                throw new Error("Firestore non disponibile. Verifica la connessione a Internet.");
            }

            const fbUser = (window.fbAuth && window.fbAuth.currentUser) ||
                           (window.firebase && window.firebase.auth && window.firebase.auth().currentUser);
            const userEmail = (fbUser && fbUser.email ? fbUser.email : (window.currentUserEmail || '')).toLowerCase();

            if (!this.isSuperAdmin(userEmail)) {
                throw new Error("Accesso negato: solo il Super-Admin (" + SUPER_ADMIN_EMAIL + ") può salvare il regolamento.");
            }

            const cleanText = (newText || '').trim();
            if (!cleanText) {
                throw new Error("Il testo del regolamento non può essere vuoto.");
            }

            const nowIso = new Date().toISOString();
            const payload = {
                text: cleanText,
                lastUpdated: nowIso,
                updatedBy: userEmail,
                gameKey: this._gameKey
            };

            await db.collection('settings').doc(this._docId).set(payload, { merge: true });

            this._rawText = cleanText;
            this._lastUpdated = nowIso;
            this._updatedBy = userEmail;

            try {
                localStorage.setItem(this._storageKey, JSON.stringify({
                    text: this._rawText,
                    lastUpdated: this._lastUpdated,
                    updatedBy: this._updatedBy
                }));
            } catch (e) {}

            this._notify();
            return { success: true, lastUpdated: nowIso };
        },

        parseSections(text) {
            const src = (text || this.getRawText()).trim();
            const result = {
                studente: [],
                docente: []
            };

            if (!src) return result;

            const studentSectionMatch = src.match(/\[STUDENTE\]([\s\S]*?)(?=\[DOCENTE\]|$)/i);
            const teacherSectionMatch = src.match(/\[DOCENTE\]([\s\S]*?)$/i);

            const parseBlock = (rawBlock) => {
                if (!rawBlock) return [];
                const blocks = rawBlock.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
                const items = [];

                blocks.forEach((block, index) => {
                    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
                    if (lines.length === 0) return;

                    let firstLine = lines[0].replace(/^[\u2022\*\-]\s*/, '').trim();
                    let title = '';
                    let content = '';

                    const matchNumbered = firstLine.match(/^(\d+[\.\)]\s*)(.*)$/);
                    if (matchNumbered) {
                        firstLine = matchNumbered[2].trim();
                    }

                    if (lines.length > 1) {
                        title = firstLine;
                        content = lines.slice(1).join(' ').trim();
                    } else {
                        const colonMatch = firstLine.match(/^([^:]{3,60}):\s*(.+)$/);
                        if (colonMatch) {
                            title = colonMatch[1].trim();
                            content = colonMatch[2].trim();
                        } else {
                            content = firstLine;
                        }
                    }

                    if (title) {
                        title = title.replace(/:\s*$/, '').trim();
                    }

                    items.push({
                        index: index + 1,
                        titolo: title || `Regola ${index + 1}`,
                        testo: content || title
                    });
                });

                return items;
            };

            if (studentSectionMatch) {
                result.studente = parseBlock(studentSectionMatch[1]);
            } else {
                result.studente = parseBlock(src);
            }

            if (teacherSectionMatch) {
                result.docente = parseBlock(teacherSectionMatch[1]);
            }

            return result;
        },

        // ===================================================================
        // VISTA GIOCO (#view-regolamento in index.html)
        // Stile nativo de La Rotta degli Eroi: border-left: 3px solid var(--gold)
        // ===================================================================
        renderPublicView(user = {}) {
            const rules = this.parseSections();
            const studBox = document.getElementById('rules-student-box');
            const teachBox = document.getElementById('rules-teacher-box');
            const teachSection = document.getElementById('rules-teacher-section');

            if (studBox) {
                studBox.innerHTML = rules.studente.map(r => `
                    <div style="margin-bottom: 15px; padding: 12px; background: rgba(255,255,255,0.02); border-left: 3px solid var(--gold); border-radius: 4px;">
                        <strong style="color: var(--text-light); font-size: 0.95rem; display: block; margin-bottom: 4px;">
                            ${r.index}. ${r.titolo}
                        </strong>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.45;">${r.testo}</p>
                    </div>
                `).join('');
            }

            const isTeacherOrAdmin = user && (user.role === 'docente' || user.role === 'teacher' || user.role === 'admin');
            if (teachSection && teachBox) {
                if (isTeacherOrAdmin && rules.docente.length > 0) {
                    teachSection.style.display = 'block';
                    teachBox.innerHTML = rules.docente.map(r => `
                        <div style="margin-bottom: 15px; padding: 12px; background: rgba(255,255,255,0.02); border-left: 3px solid var(--gold); border-radius: 4px;">
                            <strong style="color: var(--text-light); font-size: 0.95rem; display: block; margin-bottom: 4px;">
                                ${r.index}. ${r.titolo}
                            </strong>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.45;">${r.testo}</p>
                        </div>
                    `).join('');
                } else if (!isTeacherOrAdmin) {
                    teachSection.style.display = 'none';
                }
            }
        },

        // ===================================================================
        // VISTA SUPER-ADMIN (Dashboard Admin in index.html)
        // ===================================================================
        renderAdminEditor(containerId = 'admin-rules-editor-container') {
            const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!container) return;

            const text = this.getRawText();
            const fbUser = (window.fbAuth && window.fbAuth.currentUser) || 
                           (window.firebase && window.firebase.auth && window.firebase.auth().currentUser);
            const userEmail = fbUser ? (fbUser.email || '') : (window.currentUserEmail || '');
            const isAuthAdmin = userEmail.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();

            container.innerHTML = `
                <div style="margin-bottom: 25px; padding: 20px; border: 1.5px solid var(--gold); border-radius: 16px; background: rgba(0,0,0,0.3);">
                    <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <h3 style="margin: 0 0 6px 0; font-size: 1.15rem; color: var(--gold); display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-gavel"></i> Regolamento Ufficiale di Campagna • Live Editor
                            </h3>
                            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
                                Modifica il regolamento di bordo per Studenti e Docenti. Le modifiche si sincronizzano in tempo reale.
                            </p>
                        </div>
                        <div>
                            ${isAuthAdmin ? `
                                <span style="font-size: 0.75rem; background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fa-solid fa-circle-check"></i> Super-Admin Autenticato (${userEmail})
                                </span>
                            ` : `
                                <span style="font-size: 0.75rem; background: rgba(212, 175, 55, 0.15); color: var(--gold); border: 1px solid rgba(212, 175, 55, 0.3); padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                                    <i class="fa-solid fa-cloud-arrow-up"></i> Cloud Sync (${SUPER_ADMIN_EMAIL})
                                </span>
                            `}
                        </div>
                    </div>

                    <div style="margin-bottom: 16px;">
                        <textarea id="eroi-rules-textarea" rows="18" style="width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.4); border: 1px solid rgba(212,175,55,0.4); border-radius: 8px; color: #fff; padding: 14px; font-size: 0.9rem; line-height: 1.6; font-family: inherit; resize: vertical; outline: none;">${text}</textarea>
                    </div>

                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <button type="button" id="btn-save-eroi-rules" onclick="window.EroiRulesService.handleSaveButton()" style="background: var(--gold); color: #000; border: none; padding: 10px 22px; border-radius: 20px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase;">
                            <i class="fa-solid fa-floppy-disk"></i> SALVA REGOLAMENTO
                        </button>
                        
                        <button type="button" onclick="window.EroiRulesService.handleResetButton()" style="background: transparent; color: var(--text-muted); border: 1px solid rgba(255,255,255,0.2); padding: 10px 18px; border-radius: 20px; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-rotate-left"></i> Ripristina Predefinito
                        </button>
                    </div>
                </div>
            `;
        },

        async handleSaveButton() {
            const textarea = document.getElementById('eroi-rules-textarea');
            if (!textarea) return;

            const btn = document.getElementById('btn-save-eroi-rules');
            const originalHtml = btn ? btn.innerHTML : '';
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> SALVATAGGIO...`;
            }

            try {
                await this.saveToCloud(textarea.value);
                if (btn) {
                    btn.innerHTML = `<i class="fa-solid fa-check"></i> SALVATO CON SUCCESSO!`;
                    btn.style.background = '#22c55e';
                    btn.style.color = '#fff';
                }
                setTimeout(() => {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalHtml;
                        btn.style.background = 'var(--gold)';
                        btn.style.color = '#000';
                    }
                }, 2000);
            } catch (err) {
                alert("Errore salvataggio: " + (err.message || err));
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = originalHtml;
                }
            }
        },

        handleResetButton() {
            if (!confirm("Vuoi ripristinare il testo del regolamento a quello predefinito ufficiale de La Rotta degli Eroi?")) return;
            const textarea = document.getElementById('eroi-rules-textarea');
            if (textarea) {
                textarea.value = this.getDefaultText();
            }
        }
    };

    window.RulesService = RulesService;
    window.EroiRulesService = RulesService;

    // Auto-inizializzazione
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => RulesService.init());
    } else {
        RulesService.init();
    }

})(window);
