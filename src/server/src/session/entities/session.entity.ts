import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'SET NULL' })
  user: User;

  @Column()
  refreshToken: string;

  @Column()
  browser: string;

  @Column()
  os: string;

  @Column()
  lastActive: Date;
}
