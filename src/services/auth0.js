import { loadAuthConfig } from "../configs/auth.js";

export const buildAuthorizationUrl = (state) => {
  const { domain, clientId, callbackUrl } = loadAuthConfig();

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: callbackUrl,
    scope: "openid profile email",
    state: state,
  });

  return `https://${domain}/authorize?${params.toString()}`;
};

export const exchangeCodeForTokens = async (code) => {
  const { domain, clientId, clientSecret, callbackUrl } = loadAuthConfig();

  const response = await fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: callbackUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange authorization code");
  }

  return response.json();
};

export const buildLogoutUrl = () => {
  const { domain, clientId, callbackUrl } = loadAuthConfig();

  // The returnTo must be listed in "Allowed Logout URLs" on Auth0.
  // We derive it from the callback URL so both stay in sync.
  const returnTo = new URL(callbackUrl).origin;

  const params = new URLSearchParams({
    client_id: clientId,
    returnTo: returnTo,
  });

  return `https://${domain}/v2/logout?${params.toString()}`;
};
