import { CVData } from '../types/cv';
import { SAMPLE_STUDENT_CV } from '../data/templates';

const STORAGE_KEY = 'cv_maker_app_data_v2';
const ACTIVE_CV_KEY = 'cv_maker_active_id_v2';

export interface StorageState {
  cvs: CVData[];
  activeCvId: string | null;
}

export function loadSavedCVs(): CVData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // Seed initial sample CV on first visit
      saveAllCVs([SAMPLE_STUDENT_CV]);
      return [SAMPLE_STUDENT_CV];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [SAMPLE_STUDENT_CV];
  } catch (err) {
    console.error('Failed to load CVs from localStorage:', err);
    return [SAMPLE_STUDENT_CV];
  }
}

export function saveAllCVs(cvs: CVData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvs));
  } catch (err) {
    console.error('Failed to save CVs to localStorage:', err);
  }
}

export function getActiveCVId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_CV_KEY);
  } catch {
    return null;
  }
}

export function setActiveCVId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_CV_KEY, id);
  } catch (err) {
    console.error('Failed to set active CV ID:', err);
  }
}

export function saveSingleCV(cv: CVData): CVData[] {
  const current = loadSavedCVs();
  const index = current.findIndex(item => item.id === cv.id);
  const updatedCV = {
    ...cv,
    updatedAt: new Date().toISOString()
  };

  let newList: CVData[];
  if (index >= 0) {
    newList = [...current];
    newList[index] = updatedCV;
  } else {
    newList = [updatedCV, ...current];
  }

  saveAllCVs(newList);
  setActiveCVId(updatedCV.id);
  return newList;
}

export function deleteCV(id: string): CVData[] {
  const current = loadSavedCVs();
  const filtered = current.filter(item => item.id !== id);
  saveAllCVs(filtered);
  
  const activeId = getActiveCVId();
  if (activeId === id) {
    if (filtered.length > 0) {
      setActiveCVId(filtered[0].id);
    } else {
      localStorage.removeItem(ACTIVE_CV_KEY);
    }
  }
  return filtered;
}

export function duplicateCV(id: string): { list: CVData[]; newCv: CVData | null } {
  const current = loadSavedCVs();
  const target = current.find(item => item.id === id);
  if (!target) return { list: current, newCv: null };

  const newCv: CVData = {
    ...target,
    id: 'cv-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    title: `${target.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const newList = [newCv, ...current];
  saveAllCVs(newList);
  setActiveCVId(newCv.id);
  return { list: newList, newCv };
}

export function createNewCV(templateId: CVData['templateId'] = 'ats-student', title?: string): CVData {
  const newCv: CVData = {
    ...SAMPLE_STUDENT_CV,
    id: 'cv-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    title: title || (templateId === 'hr-professional' ? 'My HR Professional CV' : templateId === 'ats-professional' ? 'My ATS Professional CV' : 'My Student Resume'),
    templateId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const current = loadSavedCVs();
  saveAllCVs([newCv, ...current]);
  setActiveCVId(newCv.id);
  return newCv;
}
