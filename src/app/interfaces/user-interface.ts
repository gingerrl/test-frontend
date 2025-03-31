export interface User{
  id?: string
  user: string
  firstName: string
  middleName: string
  firstSurname: string
  secondLastName: string
  department: Department
  post: Post
  email: string


}

export interface Department{
id?: string;
nameDepa: string
}

export interface Post{
id?: string;
namePost: string
}
