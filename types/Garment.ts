export interface Brand {
  id: string
  name: string
  slug: string
  garments?: Garment[]
}

export interface Color {
  id: string
  name: string
  slug: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  garments?: Garment[]
}

export interface GarmentCategory {
  id: string
  slug: string
  name: string
  subCategories?: GarmentSubCategory[]
  garments?: Garment[]
}

export interface GarmentSubCategory {
  id: string
  slug: string
  name: string
  parentCategory?: GarmentCategory
  garments?: Garment[]
}

export interface GarmentImage {
  id: string
  url: string
  name: string
  garment?: Garment
}

export interface Garment {
  id: string
  title: string
  description: string
  owner: User
  brand: Brand
  color: Color
  category?: GarmentCategory
  subCategory?: GarmentSubCategory
  images?: GarmentImage[]
}
