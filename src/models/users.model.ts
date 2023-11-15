import { AllowNull, BelongsToMany, Column, DeletedAt, HasMany, IsEmail, Length, Model, Table } from 'sequelize-typescript';
import { Role } from '../constant/enum';
import { ProjectUser } from './projectUser.model';
import { Project } from './projects.model';
import { TimeSheet } from './timesheets.model';

@Table
export class User extends Model<User> {
  @IsEmail
  @Column({ unique: true })
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column({ defaultValue: Role.User })
  role: Role;

  @Length({ min: 3, max: 36 })
  @Column
  name: string;

  @DeletedAt
  deletionDate: Date;

  @BelongsToMany(() => Project, {
    through:
      { model: () => ProjectUser }
  })
  projects: Project;

  @HasMany(() => TimeSheet)
  timesheets: TimeSheet[];
}
