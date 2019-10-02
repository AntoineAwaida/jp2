export default function p_TvaClient(tx) {
  return tx.executeSql(`CREATE TABLE p_TvaClient (
        Code nvarchar(4) NOT NULL
      , Libelle nvarchar(30) NULL
      , TauxTaxeParaf float NULL
      , Code_CompteTaxeParaf nvarchar(10) NULL
      , CodeDefaut bit NULL
      , SupAutorisee bit NULL
      )`);
}
