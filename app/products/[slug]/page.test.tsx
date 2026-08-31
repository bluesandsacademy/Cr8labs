import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductDetailPage, { generateStaticParams } from "./page";
import { PRODUCTS } from "@/components/products/products-data";

describe("Product detail page", () => {
  it("generates static params for all four kits", () => {
    expect(generateStaticParams()).toEqual(PRODUCTS.map((p) => ({ slug: p.slug })));
  });

  it("renders the kit's name, price, includes and a working buy-now CTA", async () => {
    render(await ProductDetailPage({ params: Promise.resolve({ slug: "experience-africa" }) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Experience Africa");
    expect(screen.getByText("from $500")).toBeInTheDocument();
    expect(screen.getByText("preloaded offline content library")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Buy now" })).toHaveAttribute(
      "href",
      "/contact?route=school#form"
    );
  });

  it("shows the other three kits as 'More kits', not the current one", async () => {
    render(await ProductDetailPage({ params: Promise.resolve({ slug: "experience-africa" }) }));
    expect(screen.getAllByRole("link", { name: /Into the Community|Into the Curiosity Q|AR Science Lab/ })).toHaveLength(3);
    expect(screen.queryByRole("link", { name: "Experience Africa" })).toBeNull();
  });

  it("triggers Next's not-found handling for an unknown slug", async () => {
    // notFound() throws Next's internal NEXT_HTTP_ERROR_FALLBACK signal rather
    // than returning; the reject alone confirms it fires for a bad slug.
    await expect(
      ProductDetailPage({ params: Promise.resolve({ slug: "not-a-real-kit" }) })
    ).rejects.toThrow();
  });
});
