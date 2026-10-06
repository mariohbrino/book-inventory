import crypto from "node:crypto";

import { createUser, getUserByEmail } from "../models/users.js";
import {
  buildAuthorizationUrl,
  buildLogoutUrl,
  exchangeCodeForTokens,
} from "../services/auth0.js";
import { createSessionToken } from "../services/session.js";

const STATE_COOKIE = "oauth_state";
const SESSION_COOKIE = "session";
const ONE_DAY = 24 * 60 * 60 * 1000;
const TEN_MINUTES = 10 * 60 * 1000;

/**
 * Reads the payload of a JWT without verifying it.
 * Auth0 already verified the id_token when it issued it over TLS,
 * so here we only need to read the claims it carries.
 */
const readTokenPayload = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(Buffer.from(payload, "base64url").toString());
};

export const login = (request, response) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Starts the OAuth 2.0 login flow by redirecting to Auth0'
   */
  void request;

  // The state protects against CSRF: we only accept a callback
  // that matches a login this server started.
  const state = crypto.randomBytes(16).toString("hex");

  response.cookie(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: TEN_MINUTES,
  });

  return response.redirect(buildAuthorizationUrl(state));
};

export const callback = async (request, response) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Auth0 redirects here with the authorization code'
   */
  const { code, state } = request.query;

  if (!state || state !== request.cookies?.[STATE_COOKIE]) {
    return response.status(400).json({ error: "Invalid state parameter" });
  }

  response.clearCookie(STATE_COOKIE);

  if (!code) {
    return response.status(400).json({ error: "Missing authorization code" });
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const profile = readTokenPayload(tokens.id_token);

    let user = await getUserByEmail(profile.email);

    if (!user) {
      user = await createUser({
        username: profile.name || profile.email,
        email: profile.email,
        role: "user",
        provider: "auth0",
        auth0Id: profile.sub,
      });
    }

    const sessionToken = createSessionToken({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    response.cookie(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: ONE_DAY,
    });

    return response.json({
      message: "Logged in successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error during authentication callback: ", error);
    return response.status(500).json({ error: "Authentication failed" });
  }
};

export const logout = (request, response) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Clears the session cookie and ends the Auth0 session'
   */
  void request;

  response.clearCookie(SESSION_COOKIE);

  return response.redirect(buildLogoutUrl());
};

export const me = (request, response) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Returns the logged in user. Requires authentication.'
   * #swagger.responses[401] = { description: 'Authentication required' }
   */
  return response.json({ data: request.user });
};
