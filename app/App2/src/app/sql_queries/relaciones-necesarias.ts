export const relaciones_necesarias = `
select [TABLE_NAME (PK)] as 'TABLA REFERENCIADA', [COL_NAME (PK)] as 'COLUMNA REFERENCIADA', [TABLE_NAME (FK)] as 'TABLA', [COL_NAME (FK)] 'COLUMNA' from 
( select s1.* from 
  (	select CAST(tab.object_id AS varchar(255)) %2B'-'%2B CAST(col.column_id AS varchar(255)) as 'COLUMN_IDE',
    tab.name as 'TABLE_NAME (FK)', col.name as 'COL_NAME (FK)'
    from sys.tables as tab
    inner join sys.columns as col
    on tab.object_id = col.object_id where tab.schema_id = 1) s1 
  where s1.COLUMN_IDE NOT IN 
  (
  select CAST(tab.object_id AS varchar(255)) %2B'-'%2B CAST(col.column_id AS varchar(255)) as 'FK_COL'
   from sys.tables as tab
    inner join sys.foreign_key_columns as fkc
    on tab.object_id = fkc.parent_object_id
    inner join sys.columns as col
    on fkc.parent_object_id = col.object_id 
    and fkc.parent_column_id = col.column_id
    where tab.schema_id = 1 
  union 
  select CAST(ind.object_id AS varchar(255)) %2B'-'%2B CAST(indc.column_id AS varchar(255)) as 'PK_COL' 
  from sys.indexes as ind 
    inner join sys.index_columns as indc
    on   ind.object_id = indc.object_id
    and ind.index_id = indc.index_id
    where is_primary_key = 1)
) C1,
(
select CAST(ind.object_id AS varchar(255)) %2B'-'%2B CAST(indc.column_id AS varchar(255)) as 'COLUMN_IDE',
	OBJECT_NAME(ind.object_id) as 'TABLE_NAME (PK)', COL_NAME(ind.object_id, indc.column_id) as 'COL_NAME (PK)'
 from sys.indexes as ind 
	inner join sys.index_columns as indc 
	on   ind.object_id = indc.object_id 
	and ind.index_id = indc.index_id 
	where is_primary_key = 1) C2
 where 
	COL_NAME(CAST(SUBSTRING(C1.COLUMN_IDE, 1, CHARINDEX('-', C1.COLUMN_IDE) - 1) as INT), CAST(SUBSTRING(C1.COLUMN_IDE, CHARINDEX('-', C1.COLUMN_IDE) %2B 1, 2) as INT))
 = COL_NAME( CAST(SUBSTRING(C2.COLUMN_IDE, 1, CHARINDEX('-', C2.COLUMN_IDE) - 1) as INT), CAST(SUBSTRING(C2.COLUMN_IDE, CHARINDEX('-', C2.COLUMN_IDE) %2B 1, 2) as INT))
	and SUBSTRING(C1.COLUMN_IDE, 1, CHARINDEX('-', C1.COLUMN_IDE) - 1) != SUBSTRING(C2.COLUMN_IDE, 1, CHARINDEX('-', C1.COLUMN_IDE) - 1) 
	order by c1.[TABLE_NAME (FK)], c2.[TABLE_NAME (PK)]`;
