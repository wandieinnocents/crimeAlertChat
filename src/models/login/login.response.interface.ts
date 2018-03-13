export interface LoginResponse{

  result?: {
    email?: string;
    uId?: string;
  }
  error?:{
    code?: string;
    message?: string;
  }
}
