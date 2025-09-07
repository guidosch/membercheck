export class Member {
    constructor(
        public firstName: string,
        public lastName: string,
        public email?: string,
        public verfifiedMember: boolean = false,
        public verificationNumber?: number
    ) {}
}
