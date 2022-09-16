import React, { useState, useEffect } from 'react';

interface SpotifyPlaybackProps {
	token: string
}

function SpotifyPlayback({ token }: SpotifyPlaybackProps) {

	const track = {
		name: "",
		album: {
			images: [{ url: "" }]
		},
		artists: [{ name: "" }]
	};

	const [is_paused, setPaused] = useState(false);
	const [is_active, setActive] = useState(false);
	const [player, setPlayer] = useState<undefined|Spotify.Player>(undefined);
	const [current_track, setTrack] = useState(track);

	useEffect(() => {

		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {

			const player = new window.Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: cb => { cb(token); },
				volume: 0.5
			});

			setPlayer(player);

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', ( state => {

				if (!state) {
					return;
				}
				
				console.log(state.track_window);

				setTrack(state.track_window.current_track);
				setPaused(state.paused);


				player.getCurrentState().then( state => {
					(!state)? setActive(false) : setActive(true)
				});

			}));

			player.connect();

		};
	}, [token]);

	if (!is_active) {
		return <></>;
	}

	return (
		<div className="flex items-center">
			<img src={current_track.album.images[0].url}
			     className="h-9 w-9 mr-2" alt="" />

			<div className="flex flex-col justify-center">
				<div className="text-sm">
					{current_track.name}
				</div>
				<div className="text-xs text-gray-400">
					{current_track.artists[0].name}
				</div>
			</div>

			{!player ? '' : (
				<button className="btn-spotify" onClick={() => { player.togglePlay() }} >
					{ is_paused ? "PLAY" : "PAUSE" }
				</button>
			)}
		</div>
	);
}

export default SpotifyPlayback;