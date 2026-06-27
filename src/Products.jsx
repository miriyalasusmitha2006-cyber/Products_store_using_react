import { useEffect, useState } from "react";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Load all products
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setAllProducts(data.products);
      });

    // Load categories
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) =>
          typeof item === "string"
            ? { slug: item, name: item }
            : { slug: item.slug, name: item.name }
        );
        setCategories(formatted);
      });
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "all") {
      setProducts(allProducts);
      return;
    }

    fetch(`https://dummyjson.com/products/category/${value}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      <div className="container">

        <h1 className="text-center text-white mb-4">
          Product Store
        </h1>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">All Categories</option>

              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          {filteredProducts.map((product) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={product.id}
            >
              <div
                className="card product-card h-100"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                />

                <div className="card-body">
                  <h5>{product.title}</h5>

                  <p className="description">
                    {product.description.substring(0, 50)}...
                  </p>

                  <h4 className="price">${product.price}</h4>

                  <button className="btn btn-warning w-100">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <span
              className="close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </span>

            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
            />

            <h2>{selectedProduct.title}</h2>

            <p>{selectedProduct.description}</p>

            <h4>${selectedProduct.price}</h4>

            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>

            <p>
              <strong>Brand:</strong> {selectedProduct.brand}
            </p>

            <p>
              <strong>Rating:</strong> {selectedProduct.rating}
            </p>

            <button className="btn btn-warning">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;