import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as nodemailer from 'nodemailer';
import { ConfigEmailEntity } from './entities/email.entity';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectRepository(ConfigEmailEntity)
    private EmailRepository: Repository<ConfigEmailEntity>,
  ) { }
  async sendEmail(data: any) {
    console.log(data);
    
    this.transporter = nodemailer.createTransport({
      host: data.host,
      port: data.port,
      secure: data.secure,
      auth: {
        user: data.auth.user,
        pass: data.auth.pass,
      },

    });
    const item:any={}
    item.name = "Test Email"
    item.message = "xin chào"
    const result = await this.transporter.sendMail(
      {
        from: `${data.Brand} <${data.auth.user}>`,
        to: data.toemail,
        subject: data.subject,
        html: data.text,
        // attachments: [
        //   {
        //     filename: data.attachment.filename,
        //     content: data.attachment.content,
        //   }
        // ]
        // attachment: {
        //   filename: data.attachment.filename,
        //   content: data.attachment.content,
        // }
        // html: require('./email-template.html')({"Test Email","xin chào"})
      });
    return result
  }
  async create(createEmailDto: CreateEmailDto) {
    this.EmailRepository.create(createEmailDto);
    const result = await this.EmailRepository.save(createEmailDto);
    return result
  }
  async findAll() {
    return await this.EmailRepository.find();
  }
  async findOne(id: string) {
    return await this.EmailRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.EmailRepository.findOne({ where: { id: id } });
  }
  async update(id: string, data: Partial<UpdateEmailDto>) {
    await this.EmailRepository.update({ id }, data);
    return await this.EmailRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.EmailRepository.delete({ id });
    return { deleted: true };
  }
} 