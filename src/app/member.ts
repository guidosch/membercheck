export class Member {
    constructor(
        public firstName: string,
        public lastName: string,
        public email?: string,
        public isVerified: boolean = false,
        public verificationNumber?: number
    ) {}
}
