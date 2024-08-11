export type userRequest = {
	auth0Id: string
	email: string
}

export type TUser = {
    _id?: string;
    email?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
    address?: string;
  };
