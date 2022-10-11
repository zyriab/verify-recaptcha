/* eslint-disable no-console */
import fetch from 'cross-fetch';

export default async function verifyToken(token: string) {
  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`,
      { method: 'POST' }
    );

    const resData = await res.json();

    if (resData.success) return true;

    throw new Error(
      `${resData['error-codes']} -- check https://developers.google.com/recaptcha/docs/verify for more information.`
    );
  } catch (e) {
    console.error(e);
    return false;
  }
}
