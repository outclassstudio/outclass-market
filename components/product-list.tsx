"use client";

import { InitialProducts } from "@/app/(tabs)/home/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/home/actions";

interface ProductsProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductsProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);

          if (newProducts.length) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
        rootMargin: "0px 0px -100px 0px",
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    //clean-up function
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {isLastPage ? null : (
        <span
          ref={trigger}
          className="mb-40 ext-sm font-semibold bg-orange-500 w-fix mx-auto 
      px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩중" : "더 가져오기"}
        </span>
      )}
    </div>
  );
}
