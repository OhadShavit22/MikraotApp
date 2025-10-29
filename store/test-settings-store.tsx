import TestSettings from '@/models/test-settings';
import { create } from 'zustand';

export interface TestSettingsState {
  testSettings: TestSettings;
  setTestSettings: (testSettings: TestSettings) => void;
}
 
export const useTestSettingsStore = create<TestSettingsState>((set) => ({
  testSettings: new TestSettings("", [], ""),
  setTestSettings: (newSettings: TestSettings) => set({testSettings: newSettings})
}))

