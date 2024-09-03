import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

export default async function getMerchantOrder(id: number) {
  const respuesta = await mercadopago.merchant_orders.get(id);
  return respuesta.body;
}
export { getMerchantOrder };

export async function createPreference(data) {
  try {
    const preference = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + process.env.MP_TOKEN,
        },
        body: JSON.stringify(data),
      }
    );
    console.log("createPreference en mercadopago");

    const dataa = await preference.json();

    return dataa;
  } catch (error) {
    throw "Error al crear la preferencia en MercadoPago: " + error.message;
  }
}
