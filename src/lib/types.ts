export interface SpotifyTokens {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

export interface MarqueeAlbumItem {
	position: `${number}`;
	primarybgcolor: string;
	secondarybgcolor: string;
	adamid: string;
	title: string;
	artwork: {
		width: number;
		url: string;
		height: number;
		textColor3: string;
		textColor2: string;
		textColor4: string;
		textColor1: string;
		bgColor: string;
		hasP3: boolean;
	};
	url: string;
	name: string;
	artistName: string;
}
