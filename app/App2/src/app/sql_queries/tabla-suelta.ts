export const tabla_suelta = `
 select 'No FKs >-' [ES REFERENCIADA],
    fks.tab as TABLA,
    '>- no FKs' [TIENE COLUMNAS FK] 
 from
    (select schema_name(tab.schema_id) %2B '.' %2B tab.name as tab,
        count(fk.name) as fk_cnt
    from sys.tables as tab
        left join sys.foreign_keys as fk
            on tab.object_id = fk.parent_object_id
    group by schema_name(tab.schema_id), tab.name) fks
    inner join 
    (select schema_name(tab.schema_id) %2B '.' %2B tab.name as tab,
        count(fk.name) ref_cnt
    from sys.tables as tab
        left join sys.foreign_keys as fk
            on tab.object_id = fk.referenced_object_id
    group by schema_name(tab.schema_id), tab.name) refs
    on fks.tab = refs.tab 
where fks.fk_cnt %2B refs.ref_cnt = 0`;

