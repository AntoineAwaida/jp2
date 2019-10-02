export default function p_Remise(tx) {
  return tx.executeSql(`CREATE TABLE p_Remise (
        Code nvarchar(4) NOT NULL
      , Libelle nvarchar(30) NULL
      , CodeDefaut bit NULL
      , SupAutorisee bit NULL
      )`);
}
