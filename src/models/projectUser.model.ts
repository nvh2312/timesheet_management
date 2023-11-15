import {
    Table,
    Model,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Column,
    HasMany,
} from "sequelize-typescript";
import { Project } from "./projects.model";
import { User } from "./users.model";

@Table
export class ProjectUser extends Model<ProjectUser> {
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @PrimaryKey
    @Column
    userId: number;

    @BelongsTo(() => Project)
    project: Project;

    @ForeignKey(() => Project)
    @PrimaryKey
    @Column
    projectId: number;

}
