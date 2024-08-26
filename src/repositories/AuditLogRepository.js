const { getRepository } = require('typeorm');
import AuditLog from '../entities/AuditLog';

class AuditLogRepository {
  constructor() {
    this.repo = getRepository(AuditLog);
  }

  async createLog(log) {
    return await this.repo.save(log);
  }

  async findLogs(filter = {}) {
    return await this.repo.find({ where: filter, order: { timestamp: 'DESC' } });
  }
}

export default AuditLogRepository;
