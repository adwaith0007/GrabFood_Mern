import { useEffect, useState} from "react";
import CategoryCards from "../../components/CategoryCards";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/reducer/cartReducer";
import api from "../../api";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/reducer/useReducer";

const server = import.meta.env.VITE_SERVER;

const MenuPage = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();
// const [dropdown setDropdown] = useState(false)
  const navigate = useNavigate();

  const userId = user._id;
  // const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQueryMenu, setSearchQueryMenu] = useState("");

  const [sortBtn, setSortBtn] = useState(false);

  const [categoryBtn, setCategoryBtn] = useState(false);

  // const [bestProductBtn, setBestProductBtn] = useState(false);
  // const dropdownRef = useRef(null);

  const rowsPerPage = 8;

  // const [userFavourites, setUserFavourites] = useState([]);

  // const fetchingFavourites = async () => {
  //   try {
  //     const response = await api.get(`/user/${userId}/wishlist`);
  //     if (response.data.success) {
  //       setUserFavourites(response.data.data);
  //     } else {
  //       console.error("Failed to fetch user orders:", response.data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user orders:", error);
  //     toast.error(error.response.data.message);
  //     if (error.response.data.message === "User is blocked") {
  //       Cookie.remove("token");
  //       dispatch(userNotExist());
  //       navigate("/login");
  //     }
  //   }
  // };

  // console.log("data:", userFavourites);

  // useEffect(() => {
  //   fetchingFavourites();
  // }, [userId]);

  useEffect(() => {
    try {
      

      api.get(`/category/get`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
        }
      });
    } catch (error) {
      toast.error("Error while loading categories");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // If search query is present, fetch products based on search query
      searchProducts(searchQuery);
    } else {
      // Otherwise, fetch products based on selected category and current page
      fetchProducts();
    }
  }, [selectedCategory, currentPage, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  useEffect(() => {
    function handleClickOutside(event) {
      // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (event.target.id!="menu-item-0"){

        
        console.log(event);
        
        setSortBtn(false);
        setCategoryBtn(false);
        }
      // }
    }
    if (sortBtn||categoryBtn)
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortBtn,categoryBtn]);

  const fetchProducts = async () => {
    try {

      const response = await api.get(`/product/get?category=${selectedCategory}&page=${currentPage}&limit=${rowsPerPage}`);
      if (response.data.success) {
        setProductList(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Failed to fetch products", response.data.error);
      }
      // api
      //   .get(
      //     `/product/get?category=${selectedCategory}&page=${currentPage}&limit=${rowsPerPage}`
      //   )
      //   .then((res) => {
      //     if (res.data.success) {
      //       setProductList(res.data.data);
      //       setTotalPages(res.data.totalPages);
      //     }
      //   });
    } catch (error) {
      toast.error("Error while loading products");
      console.log("status:", error);
      if (error.response.data.message === "User is blocked") {
        Cookie.remove("token");
        dispatch(userNotExist());
        navigate("/login");
      }
    }
  };

  const HandleBestProduct = () => {
    console.log("clicked best pro");

    try {
      api
        .get(
          `/product/get_best?category=${selectedCategory}&page=${currentPage}&limit=${rowsPerPage}`
        )
        .then((res) => {
          if (res.data.success) {
            setProductList(res.data.data);
            setTotalPages(res.data.totalPages);
          }
        });
      setSortBtn(!sortBtn);
    } catch (error) {
      toast.error("Error while loading products");
      console.log(error);
    }
  };

  // const HandleProductLowToHigh =()=>{

  //   try {
  //     api
  //       .get(
  //         `/product/get_LowToHigh?page=${currentPage}&limit=${rowsPerPage}`
  //       )
  //       .then((res) => {
  //         if (res.data.success) {
  //           setProductList(res.data.data);
  //           setTotalPages(res.data.totalPages);
  //         }
  //       });
  //   } catch (error) {
  //     toast.error("Error while loading products");
  //     console.log(error);
  //   }

  // }

  const HandleProductLowToHigh = async () => {
    try {
      const res = await api.get(
        `/product/get_LowToHigh?page=${currentPage}&limit=${rowsPerPage}`
      );
      if (res.data.success) {
        setProductList(res.data.data);
        setTotalPages(res.data.totalPages);
      } else {
        console.error("Unsuccessful response from the API:", res.data.message);
      }
      setSortBtn(!sortBtn);
    } catch (error) {
      toast.error("Error while loading products");
      console.error("API call error:", error);
    }
  };

  const HandleProductHighToLow = async () => {
    console.log("clicked");
    try {
      const res = await api.get(
        `/product/get_HighToLow?page=${currentPage}&limit=${rowsPerPage}`
      );
      if (res.data.success) {
        setProductList(res.data.data);
        setTotalPages(res.data.totalPages);
      } else {
        console.error("Unsuccessful response from the API:", res.data.message);
      }
      setSortBtn(!sortBtn);
    } catch (error) {
      toast.error("Error while loading products");
      console.error("API call error:", error);
    }
  };

  const searchProducts = (query) => {
    try {
      api
        .get(
          `/product/search?q=${query}&page=${currentPage}&limit=${rowsPerPage}`
        )
        .then((res) => {
          if (res.data.success) {
            setProductList(res.data.data);
            setTotalPages(res.data.totalPages);
          }
        });
    } catch (error) {
      toast.error("Error while searching products");
      console.log(error);
    }
  };

  const addToCart = (product) => {
    api
      .post(`/cart/add/${userId}`, { product, quantity: 1 })
      .then((response) => console.log("Product added to cart:", response.data))
      .catch((error) => console.error("Error adding to cart:", error));

    const existingItem = cartItems.find(
      (item) => item.productId === product._id
    );

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      dispatch(addItemToCart(product.productName));

      setCartItems([
        ...cartItems,
        {
          productId: product._id,
          quantity: 1,
          name: product.productName,
          price: product.price,
          imageUrl: `${server}/${product.productImage[0].replace(/ /g, "%20")}`,
        },
      ]);
    }

    toast.success(`${product.productName} added to cart!`);
  };

  const selectedCategoryHandler = (name) => {
    setSelectedCategory(name);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const handleSearch = (e) => {
    e.preventDefault();

    searchProducts(searchQueryMenu);
  };

  return (
    <div className="bg-[#e5d9ca] h-full ">
      <div className="container custom-height flex flex-col justify-center items-center mx-auto  ">
        <div className=" lg:hidden mt-5 flex justify-center items-center">
          <div className="relative text-gray-600">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                name="search"
                value={searchQueryMenu}
                onChange={(e) => setSearchQueryMenu(e.target.value)}
                placeholder="Search..."
                className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className=" hidden lg:flex gap-4 ">
          {categoryList.map((item) => (
            <div key={item._id}>
              {item.categoryImage && item.categoryImage[0] && (
                <>
                  <CategoryCards
                    name={item.category}
                    imageUrl={`${server}/${item.categoryImage[0].replace(
                      / /g,
                      "%20"
                    )}`}
                    handler={() => selectedCategoryHandler(item.category)}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="w-full border-t mt-5 border-[#9a9b9e] flex justify-between ">
          <div className="relative inline-block text-left" >
            <div>
              <button
                onClick={() => setSortBtn(!sortBtn)}
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 mt-2  px-3 py-2 text-sm font-semibold text-gray-900  "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Sort
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {sortBtn && (
              <div
                className="absolute left-0 ml-2 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
               
                // tabindex="-1"
              >
                <div className="py-1" role="none"  id="hello">
                  <button
                    // onClick={()=>{setBestProductBtn(true)}}
                    onClick={() => {
                      HandleBestProduct()
                    }}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    // tabindex="-1"
                    id="menu-item-0"
                  >
                    Best selling product
                  </button>

                  <button
                    // onClick={()=>{setBestProductBtn(true)}}
                    onClick={() => {
                      HandleProductLowToHigh();
                    }}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    // tabindex="-1"
                    id="menu-item-0"
                  >
                    Price: Low to High
                  </button>

                  <button
                    onClick={() => {
                      HandleProductHighToLow();
                    }}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    // tabindex="-1"
                    id="menu-item-0"
                  >
                    Price: High to Low
                  </button>

                  {/* <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                  >
                  Support
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                  >
                  License
                </a>
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-3"
                    >
                    Sign out
                  </button>
                </form> */}
                </div>
              </div>
            )}
          </div>

          <div className="relative lg:hidden inline-block text-left">
            <div>
              <button
                onClick={() => setCategoryBtn(!categoryBtn)}
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 mt-2  px-3 py-2 text-sm font-semibold text-gray-900  "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Category
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {categoryBtn && (
              <div
                className="absolute right-0 z-20 mt-2 mr-2  w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                // tabindex="-1"
              >
                <div className="py-1" role="none">
                  {categoryList.map((item) => (
                    <div key={item._id}>
                      {item.categoryImage && item.categoryImage[0] && (
                        <>
                          <button
                            // onClick={()=>{setBestProductBtn(true)}}
                            onClick={() =>
                              selectedCategoryHandler(item.category)
                            }
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            // tabindex="-1"
                            id="menu-item-0"
                          >
                            {item.category}
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productList.map((item) => (
            <div key={item._id}>
              {item.productImage && item.productImage[0] && (
                <>
                  <ProductCard
                    productId={item._id}
                    price={item.price}
                    description={item.Description}
                    name={item.productName}
                    discountPrice={item?.discountPrice}
                    offerInPercentage={item.offerInPercentage}
                    imageUrl={`${server}/${item.productImage[0].replace(
                      / /g,
                      "%20"
                    )}`}
                    onAddToCart={() => addToCart(item)}

                    // onAddToFavorites={() => addToWishlist(item)}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-2 pb-10 ">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === index + 1
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === totalPages
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MenuPage;
