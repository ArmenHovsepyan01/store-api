export interface createUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  isPublished: false;
  category: string;
  main_image: string;
  images: ImagesArrayItem[];
  colors?: [];
  sizes?: [];
}

interface ImagesArrayItem {
  id: number;
  imageUrl: string;
  productId: number;
}

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
