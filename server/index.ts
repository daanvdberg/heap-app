import 'reflect-metadata';

import { config } from 'dotenv';
config();

import express from 'express';
import session from 'express-session';

import { env } from './config/globals';
import { logger } from './config/logger';

import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import SpotifyWebApi from 'spotify-web-api-node';

declare global {
	var access_token: string;
}

global.access_token = '';

const app = express();

let spotifyApi = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_CALLBACK_URL
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

passport.use(
    new SpotifyStrategy(
        {
            clientID: env.SPOTIFY_CLIENT_ID,
            clientSecret: env.SPOTIFY_CLIENT_SECRET,
            callbackURL: env.SPOTIFY_CALLBACK_URL
        },
        function (accessToken, refreshToken, expires_in, profile, done) {
            spotifyApi.setAccessToken(accessToken);
            spotifyApi.setRefreshToken(refreshToken);
	        global.access_token = accessToken;

            process.nextTick(function () {
                return done(null, profile);
            });
        }
    )
);

app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
        scope: env.SPOTIFY_PERMISSION_SCOPE
    })
);

app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', {}),
    function (req, res) {
        res.redirect('/');
    }
);

app.get(
    '/auth/token',
    (req, res) => {
        res.json({ access_token: access_token});
    }
);

app.on('listening', () => {
	logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
});
