/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { AuditEntity } from '../data/model/AuditEntity';
import { APIFeatures } from 'util/API/Feature';

@Injectable()
export class AuditService {
  async getAuditLogs(
    querystr?,
    action?: string,
    performedBy?: string,
    entity?: string,
    from?: any,
    to?: any,
  ) {
    const filter: any = {};
    if (action) filter.action = action;
    if (performedBy) filter.performedBy = performedBy;
    if (entity) filter.entity = entity;
    if (from && to) filter.createdAt = { $gte: from, $lte: to };
    const query = AuditEntity.find(filter);
    const data = new APIFeatures(query, querystr)
      .sort()
      .search()
      .limitFields()
      .paginate();
    return await data.query;
  }
  async getAuditLogById(id: string) {
    return await AuditEntity.findById(id);
  }
  async getAuditLogsByEntity(entity: string, entityId: string) {
    return await AuditEntity.find({ entity: entity, entityId: entityId });
  }
  async getAuditLogsByUser(userId: string) {
    return await AuditEntity.find({ performedBy: userId });
  }
  async getAuditFromToDates(from: Date, to: Date) {
    return await AuditEntity.find({
      createdAt: { $gte: from, $lte: to },
    }).populate('performedBy', 'name');
  }
  async getAuditLogss(
    querystr?: any,
    action?: string,
    performedBy?: string,
    entity?: string,
    from?: any,
    to?: any,
  ) {
    const filter: any = {};

    // Apply individual filters
    if (action && action !== 'all') {
      filter.action = action;
    }

    if (performedBy && performedBy !== 'all') {
      filter.performedBy = performedBy;
    }

    if (entity && entity !== 'all') {
      // Check if your model uses 'entityType' or 'entity'
      // Adjust based on your actual schema
      filter.entityType = entity; // or filter.entity = entity;
    }

    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    console.log('Audit filter:', filter); // Debug log

    // Create base query with filter
    const query = AuditEntity.find(filter).populate('performedBy', 'name'); // Populate user name if needed

    // Apply APIFeatures (search, sort, pagination)
    const data = new APIFeatures(query, querystr)
      .sort()
      .search()
      .limitFields()
      .paginate();

    return await data.query;
  }
}
