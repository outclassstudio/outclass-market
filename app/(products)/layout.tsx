import ProductHeader from "@/components/product-header";

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProductHeader />
      <div className="mt-[60px]">{children}</div>
    </div>
  );
}
