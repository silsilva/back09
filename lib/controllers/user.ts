import { User } from "lib/models/user";
import { Auth } from "lib/models/auth";

export async function modXUser(body: any, token: string) {
  try {
    const newUser = new User(token);

    const newAuth = new Auth(body.authId);
    await newAuth.pull();
    await newUser.pull();
    newAuth.data.email = body.data.email;
    newUser.data = body.data;
    await newAuth.push();
    await newUser.push();
    return newUser.data;
  } catch (e) {
    throw "A fallado";
  }
}

export async function modAllUser(body: any, token: string) {
  try {
    const newUser = new User(token);
    const newAuth = new Auth(body.authId);
    await newAuth.pull();
    await newUser.pull();
    if (body.data.email) {
      newAuth.data.email = body.data.email;
    }
    newUser.data = body.data;
    await newAuth.push();
    await newUser.modData();
    return newUser.data;
  } catch (e) {
    throw "A fallado";
  }
}
