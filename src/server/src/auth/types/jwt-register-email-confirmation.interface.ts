export interface JwtRegisterEmailConfirmation {
  sub: number; // id пользователя, которому принадлежит ссылка подтверждения
  email: string; // email пользователя, которому принадлежит ссылка подтверждения
}
