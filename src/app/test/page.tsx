import ProductCard from "../_components/card";

const TestPage = () => {
  const product = {
    image: "/img/.png",
    name: "سیگار وینستون کلاسیک الترا لایت نقره ای کینگ",
    category: "سیگار",
    price: "۲۰۰۰۰۰",
  };

  return (
    <div className="container mx-auto text-foreground">
      <ProductCard product={product} />
    </div>
  );
};

export default TestPage;
