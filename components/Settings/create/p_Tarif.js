export default function p_Tarif(tx) {
  return tx.executeSql(`CREATE TABLE p_Tarif (
        Code nvarchar(8) NOT NULL
      , Libelle nvarchar(30) NULL
      , CodeDefaut bit NULL
      , SupAutorisee bit NULL
      )`);
}
