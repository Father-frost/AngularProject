export class UserBriefModel{
    public static FullName(user: UserBriefModel): string {
        return  user.firstName + ' ' + user.lastName;
    }

    constructor(
        public firstName: string,
        public lastName: string,
        public tgLink: string,
    )
    {
    }
}