export interface IResource {
  id: number;
  name: string;
  price: number;
}
export interface IResourceResponse {
  success: boolean;
  message: string;
  data: IResource[];
}  