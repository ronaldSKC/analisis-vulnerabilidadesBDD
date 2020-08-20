export const anomalias_constraints = (constraint) => {
  return `DBCC CHECKCONSTRAINTS (${constraint})`;
} ;
export const anomalias_relaciones_necesarias =
  (tabla_padre, columna_padre, tabla_hija, columna_hija ) =>  {
  return `SELECT * FROM [${tabla_hija}] WHERE [${columna_hija}] NOT IN (SELECT [${columna_padre}] from [${tabla_padre}])`;
};
