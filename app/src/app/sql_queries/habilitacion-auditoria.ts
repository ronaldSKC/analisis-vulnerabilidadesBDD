export const creacion_auditoria = `
USE master;
CREATE SERVER AUDIT Auditoria_BD TO FILE ( FILEPATH = 'E:\\Auditoria2' )`;

export const habilitacion_auditoria = `
USE master; 
ALTER SERVER AUDIT Auditoria_BD  WITH (STATE = ON)`;

export const espec_audit_bd = `
USE Orders;
CREATE DATABASE AUDIT SPECIFICATION Audit_Data_Modification FOR SERVER AUDIT Auditoria_BD 
ADD ( SELECT, INSERT, UPDATE, DELETE ON Schema::dbo BY public), ADD ( SCHEMA_OBJECT_CHANGE_GROUP) 
WITH (STATE = ON)`;

export const prefijo_archivo_log = `SELECT log_file_name from sys.server_file_audits where name='Auditoria_BD';`;

export const log_auditoria = (prefijo: string) => {
  return `SELECT distinct fn.event_time, 
	   fn.action_id, 
	   dm.name, 
	   fn.server_instance_name, 
	   fn.session_server_principal_name, 
	   fn.database_name, 
	   fn.schema_name, 
	   fn.object_name, 
	   fn.statement    
 FROM sys.fn_get_audit_file ('E:\\Auditoria2\\${prefijo}', DEFAULT, DEFAULT) as fn
 inner join sys.dm_audit_actions as dm on fn.action_id = dm.action_id
 WHERE (dm.name = 'ALTER' or 
	  dm.name = 'DROP' or 
	  dm.name = 'SELECT' or
	  dm.name = 'UPDATE' or
	  dm.name = 'INSERT' or
	  dm.name = 'DELETE') and
	  database_name = 'Orders'
`;

}


