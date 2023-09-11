import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ orderBy: { title: "ASC" } })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.books)
  user!: User;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column()
  summary: string;

  @Column({ default: 0 })
  readings: number;

  @DeleteDateColumn()
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;
}
