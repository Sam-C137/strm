/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: {
		readonly VITE_API_BASE_URL: string;
		readonly VITE_REDIRECT_URL: string;
	};
}
