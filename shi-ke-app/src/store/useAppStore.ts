import { create } from "zustand";
import type { Work, Template, GeneratingStatus, TabType } from "@/types";
import { mockWorks, mockTemplates, mockUser } from "@/utils/mockData";

interface AppState {
  user: typeof mockUser;
  works: Work[];
  templates: Template[];
  selectedTemplate: Template | null;
  generatingStatus: GeneratingStatus;
  generatingProgress: number;
  currentWork: Work | null;
  activeTab: TabType;

  selectTemplate: (template: Template) => void;
  startGenerating: () => void;
  cancelGenerating: () => void;
  setGeneratingStatus: (status: GeneratingStatus) => void;
  setGeneratingProgress: (progress: number) => void;
  completeGenerating: () => void;
  setCurrentWork: (work: Work | null) => void;
  setActiveTab: (tab: TabType) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: mockUser,
  works: mockWorks,
  templates: mockTemplates,
  selectedTemplate: null,
  generatingStatus: "idle",
  generatingProgress: 0,
  currentWork: null,
  activeTab: "home",

  selectTemplate: (template) => set({ selectedTemplate: template }),

  startGenerating: () =>
    set({ generatingStatus: "analyzing", generatingProgress: 0 }),

  cancelGenerating: () =>
    set({ generatingStatus: "idle", generatingProgress: 0 }),

  setGeneratingStatus: (status) => set({ generatingStatus: status }),

  setGeneratingProgress: (progress) => set({ generatingProgress: progress }),

  completeGenerating: () => {
    const { selectedTemplate, works } = get();
    const newWork: Work = {
      id: Date.now().toString(),
      title: selectedTemplate?.name || "新作品",
      coverImage: selectedTemplate?.coverImage || "/assets/home-recent-1.jpg",
      duration: `${Math.floor(Math.random() * 2) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
      createdAt: "刚刚",
      photoCount: Math.floor(Math.random() * 1000) + 200,
      selectedMoments: Math.floor(Math.random() * 30) + 20,
    };
    set({
      generatingStatus: "done",
      generatingProgress: 100,
      currentWork: newWork,
      works: [newWork, ...works],
    });
  },

  setCurrentWork: (work) => set({ currentWork: work }),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));
