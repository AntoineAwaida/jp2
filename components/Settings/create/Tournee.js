export default function Tournee(tx) {
  return tx.executeSql(
    `CREATE TABLE Tournee
        (
            Code INT PRIMARY KEY NOT NULL,
            DateDebut VARCHAR(100),
            Code_PocketPC VARCHAR(4),
            HeureFin VARCHAR(100)

        )`
  );
}
