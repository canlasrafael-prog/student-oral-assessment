// Session Store Service for FinSpeak ADB
// Manages local state persistence, session history, teacher annotations, custom jargon, and bookmarks

const STORAGE_KEYS = {
  SESSIONS: 'finspeak_adb_sessions',
  BOOKMARKS: 'finspeak_adb_lexicon_bookmarks',
  TEACHER_LOGS: 'finspeak_adb_teacher_annotations',
  SPRINT_PROGRESS: 'finspeak_adb_sprint_progress',
  CUSTOM_LEXICON: 'finspeak_adb_custom_lexicon'
};

export const sessionStore = {
  getSessions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveSession(sessionData) {
    try {
      const sessions = this.getSessions();
      const newSession = {
        id: 'sess-' + Date.now(),
        timestamp: new Date().toISOString(),
        ...sessionData
      };
      sessions.unshift(newSession);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions.slice(0, 50)));
      return newSession;
    } catch (e) {
      console.warn('Failed to save session:', e);
      return null;
    }
  },

  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(termId) {
    try {
      const bookmarks = this.getBookmarks();
      const index = bookmarks.indexOf(termId);
      if (index > -1) {
        bookmarks.splice(index, 1);
      } else {
        bookmarks.push(termId);
      }
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return bookmarks;
    } catch (e) {
      return [];
    }
  },

  getTeacherAnnotations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEACHER_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addTeacherAnnotation(annotation) {
    try {
      const notes = this.getTeacherAnnotations();
      const newNote = {
        id: 'note-' + Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ...annotation
      };
      notes.unshift(newNote);
      localStorage.setItem(STORAGE_KEYS.TEACHER_LOGS, JSON.stringify(notes));
      return notes;
    } catch (e) {
      return [];
    }
  },

  getCustomLexicon() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_LEXICON);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addCustomLexicon(item) {
    try {
      const list = this.getCustomLexicon();
      const newItem = {
        id: 'cust-' + Date.now(),
        isCustom: true,
        difficulty: item.difficulty || 'Executive',
        collocations: item.collocations || [],
        ...item
      };
      list.unshift(newItem);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_LEXICON, JSON.stringify(list));
      return newItem;
    } catch (e) {
      console.warn('Failed to add custom jargon:', e);
      return null;
    }
  },

  getSprintProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SPRINT_PROGRESS);
      return data ? JSON.parse(data) : { rewriteCompleted: 0, collocationStreak: 0, bestScore: 0 };
    } catch (e) {
      return { rewriteCompleted: 0, collocationStreak: 0, bestScore: 0 };
    }
  },

  updateSprintProgress(update) {
    try {
      const current = this.getSprintProgress();
      const updated = { ...current, ...update };
      localStorage.setItem(STORAGE_KEYS.SPRINT_PROGRESS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return null;
    }
  }
};
