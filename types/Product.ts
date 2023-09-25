export type ProductItem = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  price: number;
  description: string;
  images: string[];
};

export type BannerItem = {
  _id: string;
  _createdAt: string;
  image: string;
  buttonText: string;
  product: string;
  desc: string;
  midText: string;
  smallText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
};

export type DataSet = {
  products: ProductItem[];
  bannerData: BannerItem[];
};
