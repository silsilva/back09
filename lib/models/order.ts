import { firestore } from "../firestore";

const collection = firestore.collection("orders");
export class Order {
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
    const newUserSnap = await collection.add(data);
    const newUser = new Order(newUserSnap.id);
    newUser.data = data;
    return newUserSnap;
  }
  static async searchOrder(id: string) {
    const order = await collection.where("userId", "==", id).get();
    return order.docs;
  }
}
