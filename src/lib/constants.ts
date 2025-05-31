export const time = {
	Millisecond: 1,
	Second: 1000,
	Minute: 60_000,
	Hour: 3_600_000,
} as const;

export const size = {
	KB: 1024,
	MB: 1_048_576,
	GB: 1_073_741_824,
	TB: 1_099_511_627_776,
} as const;

export const keys = {
	SessionStorage: {
		SpotifyCodeVerifier: "spotify_code_verifier",
		SpotifyState: "spotify_state",
	},
	LocalStorage: {
		SpotifyTokens: "spotify_tokens",
	},
} as const;
