import { Lead, LeadDocument } from './lead.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class LeadRepository {
  constructor(
    @InjectModel(Lead.name)
    private leadModel: Model<LeadDocument>,
  ) {}

  /**
   *
   * @description get all lead acording to where condition
   * @return {LeadDocument[]}
   * @param {object} where
   * @param {number} skip
   * @param {number} perPage
   */
  async findWithPaggination(
    where: object,
    skip: number,
    perPage: number,
  ): Promise<LeadDocument[]> {
    return await this.leadModel.find(where).skip(skip).limit(perPage).exec();
  }

  async findOne(where: object): Promise<LeadDocument> {
    return await this.leadModel.findOne(where).exec();
  }
  /**
   * @description fetch all document depent on pipline
   * @param {Array} pipline
   * @returns {LeadDocument[]}
   */
  async leadAggregate(pipline: any): Promise<any> {
    return await this.leadModel.aggregate(pipline).exec();
  }

  async countDocuments(condition: object): Promise<number> {
    return await this.leadModel.countDocuments(condition).exec();
  }

  /**
   * @description find document by id and update it
   * @param {string} id
   * @param {object} payload
   * @returns {LeadDocument}
   */
  async findByIdAndUpdate(id: string, payload: object): Promise<LeadDocument> {
    return await this.leadModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
  }

  /**
   * @description find document by condition and update it
   * @param {object} condition
   * @param {object} payload
   * @returns {LeadDocument}
   */
  async findOneAndUpdate(
    condition: object,
    payload: object,
  ): Promise<LeadDocument> {
    return await this.leadModel
      .findOneAndUpdate(condition, payload, { new: true })
      .exec();
  }

  /**
   * @description create document for Lead model and return
   * @param {object} payload
   * @returns {LeadDocument}
   */
  async create(payload: object): Promise<LeadDocument> {
    return await this.leadModel.create(payload);
  }

  /**
   * @description find document from lead by id
   * @param {string} id
   * @returns {LeadDocument}
   */
  async findById(id: string): Promise<LeadDocument> {
    return await this.leadModel.findById(id).exec();
  }
}
