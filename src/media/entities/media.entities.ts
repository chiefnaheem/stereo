import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaStatusEnum, MediaTypeEnum } from '../enum/media.enum';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MediaTypeEnum })
  type: MediaTypeEnum;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, default: null, type: 'text' })
  description: string;

  @Column({ nullable: false })
  url: string;

  @Column({ type: 'enum', enum: MediaStatusEnum, default: MediaStatusEnum.ACTIVE })
  status: MediaStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, default: null })
  deletedAt: Date;
}
