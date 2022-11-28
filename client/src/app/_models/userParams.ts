export class UserParams {
  gender!: string;
  minAge: number = 18;
  maxAge: number = 99;
  pageNumber: number = 1;
  pageSize: number = 12;
  orderBy: string = 'lastActive';
  faculty: number = 0;

  constructor() {
    this.gender = 'everyone';
  }
}
