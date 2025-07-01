import { useUserSettings } from "@/lib/state/settings.ts";
import { applyDocumentStyle } from "@/lib/utils.ts";
import React from "react";

/**
 * Use this hook to reapply preferences on refresh or change.
 */
export function useWatchUserPreferences() {
	const accent = useUserSettings((state) => state.accent);
	const primaryColor = useUserSettings((state) => state.primaryColor);

	React.useEffect(() => {
		applyDocumentStyle("now-playing-accent", accent);
		applyDocumentStyle("primary-color", primaryColor);
	}, [accent, primaryColor]);
}
