import { AllowNull, BeforeCreate, BeforeUpdate, BelongsTo, Column, DeletedAt, ForeignKey, IsDate, IsEmail, Length, Model, Table, Unique, Validate } from 'sequelize-typescript';
import { User } from './users.model';
import { HOURS_WORKED, Status } from '../constant/enum';
import { Project } from './projects.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Table({ timestamps: false })
export class TimeSheet extends Model<TimeSheet> {
    @ForeignKey(() => User)
    @AllowNull(false)
    @Unique('userId-date')
    @Column
    userId: number;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    projectId: number;

    @AllowNull(false)
    @IsDate
    @Unique('userId-date')
    @Column
    date: Date;

    @AllowNull(false)
    @Column({ defaultValue: HOURS_WORKED })
    hours_worked: number

    @AllowNull(false)
    @Column({ defaultValue: Status.INIT })
    status: Status

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Project)
    project: Project;

    @BeforeCreate
    @BeforeUpdate
    static checkProjectBelongsToUser(instance: TimeSheet) {
        return User.findByPk(instance.userId, { include: [Project] }).then((user: any) => {
            if (!user || !user.dataValues.projects.some((project) => project.id === instance.projectId)) {
                throw new HttpException('User not in Project', HttpStatus.BAD_REQUEST);
            }
        });
    }

    @BeforeCreate
    static checkUniqueDate(instance: TimeSheet) {
        return TimeSheet.findOne({ where: { userId: instance.userId, date: instance.date } }).then((existingTimeSheet) => {
            if (existingTimeSheet) {
                throw new HttpException('Duplicated date for this user', HttpStatus.BAD_REQUEST);
            }
        });
    }
}
