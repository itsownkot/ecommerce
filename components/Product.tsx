import { ProductItem } from "@/types/Product";
import Link from "next/link";
import { urlFor } from "@/lib/client";

type Props = {
  product: ProductItem;
};

const Product = ({ product }: Props) => {
  const url = `products/${product.slug.current}`;

  return (
    <div className="hover:scale-105 transition">
      <Link href={url}>
        <div className="border rounded-md">
          <img
            src={urlFor(product.images[0]).url()}
            alt={product.title}
            width={250}
            height={250}
            className="bg-gray-200 rounded-md"
          />
          <div className="pl-2">
            <p>{product.title}</p>
            <p className="font-bold">${product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Product;
