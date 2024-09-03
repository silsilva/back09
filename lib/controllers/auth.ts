import { User } from "lib/user";
import { Auth } from "lib/auth";
import { addMinutes } from "date-fns/addMinutes";
import { sendCodeToEmail } from "lib/email";
export async function findOrCreateAuth(email: string): Promise<Auth> {
  const cleanEmail = email.trim().toLocaleLowerCase();
  Auth.findByEmail(cleanEmail);
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}
export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  const resend = await sendCodeToEmail(email);
  return { auth, resend };
}
