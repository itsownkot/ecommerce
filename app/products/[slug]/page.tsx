import { ProductItem } from "@/types/Product";
import { client } from "@/lib/client";
import { Product, ProductDetails } from "@/components";

type Props = {
  params: { slug: string };
};

const getProduct = async (
  slug: string
): Promise<{ product: ProductItem; allProducts: ProductItem[] }> => {
  const product = await client.fetch(
    `*[_type == "products" && slug.current == "${slug}"][0]`
  );
  const allProducts = await client.fetch(`*[_type == "products"]`);

  return { product, allProducts };
};

const ProductPage = async ({ params: { slug } }: Props) => {
  const { product, allProducts } = await getProduct(slug.toLowerCase());

  return (
    <div>
      {/* container for product */}
      <ProductDetails product={product} />

      {/* recommended products */}
      <div className="mt-16 overflow-hidden">
        <h2 className="font-bold text-xl text-center">You may also like</h2>
        <div className="mt-10 flex gap-3 animate-track w-[180%] hover:pause">
          {allProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
