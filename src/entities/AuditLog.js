import { EntitySchema } from 'typeorm';

const AuditLog = new EntitySchema({
  name: 'AuditLog',
  tableName: 'audit_logs',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    action: {
      type: 'varchar',
    },
    userId: {
      type: 'int',
    },
    timestamp: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
});

export default AuditLog