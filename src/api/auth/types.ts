export interface ILoginForm {
  phone: string;
  password: string;
}
export interface ILoginResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    }
  }
}
