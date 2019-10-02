import createTables from "./createTables";

export default async function create() {
  const result = await createTables();
  if (result !== "finished") {
    throw Error(result.message);
  }

  return "ok";
}
