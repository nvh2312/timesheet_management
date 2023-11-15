import { AllowNull, BelongsTo, Column, DeletedAt, ForeignKey, HasMany, IsEmail, Length, Model, Table } from 'sequelize-typescript';
import { Project } from './projects.model';

@Table
export class Task extends Model<Task> {
    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column
    projectId: number;
    
    @Length({ min: 3, max: 100 })
    @Column
    name: string;

    @DeletedAt
    achiveAt: Date;

    @BelongsTo(() => Project)
    project: Project;
}
