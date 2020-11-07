import jwt from 'jsonwebtoken';

export const INSIGHTS_URL = 'https://insights.opentok.com'

export const getToken = (apiKey, apiSecret) => {
  const currentTime = Math.floor(new Date() / 1000);
  return jwt.sign({
    iss: apiKey,
    ist: 'project',
    iat: currentTime,
    exp: currentTime + (60 * 60) // 1 hour
  }, apiSecret);
}
