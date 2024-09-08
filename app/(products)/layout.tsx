import ProductHeader from "@/components/product/product-header";

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProductHeader title={""} />
      <div className="mt-[10px]">{children}</div>
    </div>
  );
}
