import type { StateWithSetter } from "@/lib/types.ts";
import { applyDocumentStyle } from "@/lib/utils.ts";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserSettings = {
	accent: string;
	primaryColor: string;
	/**
	 * ignore theme, handled by next-themes
	 */
	sidebarPosition: "left" | "right";
	/**
	 * music section
	 */
	volume: number;
	shuffle: boolean;
};

export const useUserSettings = create<StateWithSetter<UserSettings>>()(
	persist(
		(set) => ({
			accent: "#f0b100",
			primaryColor: "#0085ff",
			sidebarPosition: "left",
			volume: 50,
			shuffle: false,
			setAccent: (accent) => {
				applyDocumentStyle("now-playing-accent", accent);
				set({ accent });
			},
			setPrimaryColor: (color) => {
				applyDocumentStyle("primary-color", color);
				set({ primaryColor: color });
			},
			setSidebarPosition: (position) => set({ sidebarPosition: position }),
			setVolume: (volume) => set({ volume }),
			setShuffle: (shuffle) => set({ shuffle }),
		}),
		{
			name: "user-settings",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
