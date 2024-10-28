import { ClientSession } from 'src/session/entities/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string;

  @OneToOne(() => ClientSession, (session) => session.refreshToken)
  session: ClientSession;

  @CreateDateColumn()
  createdAt: Date;
}
