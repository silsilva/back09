import Airtable from "airtable";

export const airtableBase = Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLEKEY,
});

export const base = Airtable.base(process.env.AIRTABLEKEY2);
