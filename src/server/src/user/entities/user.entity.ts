import { ApiProperty } from '@nestjs/swagger';
import { ClientSession } from 'src/session/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ type: 'number', uniqueItems: true, example: 0 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: 'string', example: 'John' })
  @Column({ length: 50 })
  fname: string;

  @ApiProperty({ type: 'string', example: 'Doe' })
  @Column({ length: 50 })
  sname: string;

  @ApiProperty({ type: 'string', example: 'johndoe@gmail.com' })
  @Column({ unique: true, length: 128 })
  email: string;

  @ApiProperty({ type: 'boolean', example: true })
  @Column({ default: false })
  isActive: boolean;

  @ApiProperty({
    type: 'string',
    example: '$2a$12$OA5xW0/X9XP4dIPgbaj0pOc8WteeNB14.B/5B9UBkIfhNwKerW4g2',
  })
  @Column({})
  password: string;

  @ApiProperty({})
  @OneToMany(() => ClientSession, (session) => session.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  sessions: ClientSession[];
}
