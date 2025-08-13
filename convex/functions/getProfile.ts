import { query } from '../_generated/server';

export const getProfile = query(async ({ auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) return console.log("Unauthenticated");
  console.log("identity: ", identity);

  return {
    subject: identity.subject,
    tokenIdentifier: identity.tokenIdentifier,
    issuer: identity.issuer,
    email: identity.email
  };
});