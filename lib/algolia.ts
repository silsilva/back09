import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIAKEY, process.env.ALGOLIAKEY2);

export const products = client.initIndex("products");
