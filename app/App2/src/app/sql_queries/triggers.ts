export const triggers_consulta = `SELECT  
	tab.name as TableName, 
	ob.name as TriggerName, 
	tr_ev.type_desc as FireEvent, 
	tr.parent_class_desc as ParentClass, 
	OBJECT_DEFINITION(tr.object_id) as TriggerDefinition  
FROM sys.objects ob 
INNER JOIN sys.triggers tr ON ob.object_id = tr.object_id 
INNER JOIN sys.trigger_events tr_ev ON tr.object_id = tr_ev.object_id 
INNER JOIN sys.tables tab ON tr.parent_id = tab.object_id  
WHERE ob.type = 'TR'
`;
