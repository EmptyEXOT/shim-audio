import { ClientSession } from 'src/session/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  fname: string;

  @Column({ length: 50 })
  sname: string;

  @Column({ unique: true, length: 128 })
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({})
  password: string;

  // @Column()
  // roles: string;

  @OneToMany(() => ClientSession, (session) => session.user)
  sessions: ClientSession[];
}
