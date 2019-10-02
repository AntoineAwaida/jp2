export default function p_SousFamille(tx) {
  return tx.executeSql(`CREATE TABLE p_SousFamille (
        Code nvarchar(4) NOT NULL
      , Libelle nvarchar(30) NULL
      , CodeDefaut bit NULL
      , SupAutorisee bit NULL
      )`);
}
