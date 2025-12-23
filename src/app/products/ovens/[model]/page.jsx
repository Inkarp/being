import ProductDetails from './ProductDetails';

export default async function ModelPage({ params }) {
  const { model } =await params;

  const res = await fetch(
    `http://localhost:5001/api/products/ovens/${model}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return (
      <div className=" mx-auto py-20 text-center text-red-500">
        Model not found
      </div>
    );
  }

  const product = await res.json();

  return <ProductDetails product={product} />;
}
