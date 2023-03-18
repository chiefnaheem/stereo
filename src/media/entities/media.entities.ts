import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Media {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })


}