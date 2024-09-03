import { firestore } from "../firestore";
const collection = firestore.collection("auth");
export class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  constructor(id?: string) {
    if (id) {
      this.ref = collection.doc(id);
    }
  }

  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push() {
    this.ref.update(this.data);
  }

  static async create(data) {
    const newAuthSnap = await collection.add(data);
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = data;
    return newAuthSnap;
  }

  static async findByEmail(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    const user = await collection.where("email", "==", cleanEmail).get();
    if (user.docs.length) {
      const first = user.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.data = first.data();
      return newAuth;
    }
    return null;
  }
}
