import { firestore } from "./firestore";
const collection: FirebaseFirestore.CollectionReference =
  firestore.collection("users");

export class User {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id) {
    this.id;
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  static async createNewUser(data) {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUserSnap.id;
  }
  async push() {
    this.ref.update(this.data);
  }
  setData(data) {
    this.data = data;
  }
  static async getOneUser(userId) {
    const userData = await collection.doc(userId).get();
    if (userData.exists) {
      return userData;
    } else {
      return null;
    }
  }
  async getData() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
}
