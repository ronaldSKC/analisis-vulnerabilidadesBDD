export const relaciones_necesarias_V2 = `
select S1.[TABLE_NAME (PK)], S1.[COL_NAME (PK)], S1.[TABLE_NAME], S1.[COL_NAME] from (
select CAST(OBJECT_ID_PK as varchar(255)) %2B '-' %2B CAST(COLUMN_ID_PK as varchar(255)) %2B'-'%2B CAST(OBJECT_ID as varchar(255)) %2B'-'%2B CAST(COLUMN_ID as varchar(255)) as 'CODE', * from 
(
	select * from (select * from (select CAST(ind.object_id as varchar(255)) %2B'-'%2B CAST(indc.column_id as varchar(255)) as PK_CODE, ind.object_id as 'OBJECT_ID_PK', indc.column_id as 'COLUMN_ID_PK',
	OBJECT_NAME(ind.object_id) as 'TABLE_NAME (PK)', COL_NAME(ind.object_id, indc.column_id) as 'COL_NAME (PK)' 
	from sys.indexes as ind 
	inner join sys.index_columns as indc 
	on   ind.object_id = indc.object_id 
	and ind.index_id = indc.index_id 
	where is_primary_key = 1) pk 
	left join 
	(select CAST(parent_object_id as varchar(255)) %2B '-' %2B 
		   CAST(parent_column_id as varchar(255)) 
		   as RCODE 
		   from sys.foreign_key_columns) fk 
	on pk.PK_CODE = fk.RCODE) s3 where RCODE is NULL 
) C1, 
(
	select * from (
	select CAST(tab.object_id AS varchar(255)) %2B'-'%2B CAST(col.column_id AS varchar(255)) as 'COLUMN_IDE', tab.object_id as 'OBJECT_ID', tab.name as 'TABLE_NAME', col.name as 'COL_NAME', col.column_id as 'COLUMN_ID' 
	from sys.tables as tab 
	inner join sys.columns as col 
	on tab.object_id = col.object_id ) s1 
	where s1.COLUMN_IDE NOT IN   
	(
	select CAST(tab.object_id AS varchar(255)) %2B'-'%2B CAST(col.column_id AS varchar(255)) as 'FK_COL' 
	from sys.tables as tab 
	inner join sys.foreign_key_columns as fkc 
	on tab.object_id = fkc.parent_object_id 
	inner join sys.columns as col 
	on fkc.parent_object_id = col.object_id 
	and fkc.parent_column_id = col.column_id 
	
	) 

) C2 
	where C1.[COL_NAME (PK)] = C2.COL_NAME and C1.OBJECT_ID_PK != C2.OBJECT_ID 
) S1 
 left join 
( 
	select CAST(referenced_object_id as varchar(255)) %2B '-' %2B CAST(referenced_column_id as varchar(255)) %2B '-' %2B CAST(parent_object_id as varchar(255)) %2B'-'%2B CAST(parent_column_id as varchar(255)) as RCODE from sys.foreign_key_columns ) S2 
	on S1.CODE = S2.RCODE; 
	`;
