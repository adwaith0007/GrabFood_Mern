import food_s1 from "../../assets/food_s1.png";
import s2_1 from "../../assets/s2_1.png";
import s2_2 from "../../assets/s2_2.png";
import s3 from "../../assets/s3.png";
import s4_1 from "../../assets/s4_1.png";
// import s5bg from "../../assets/s5bg.png";

// import api from '../../api';
// const server = import.meta.env.VITE_SERVER;

import "../../App.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/reducer/useReducer";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/reducer/cartReducer";
import api from "../../api";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";

const Home = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const userId = user?._id;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get(`/cart/${userId}`);
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error(error.response?.data?.message || "An error occurred");
        if (error.response?.data?.message === "User is blocked") {
          Cookie.remove("token");
          dispatch(userNotExist());
          navigate("/login");
        }
      }
      //  finally {
      //   setLoading(false);
      // }
    };

    fetchCartItems();
  }, [userId, dispatch, navigate]);

  useEffect(() => {
    if (cartItems?.length > 0) {
      cartItems.forEach((item) => {
        dispatch(
          addItemToCart({
            name: item.name,
            productId: item.productId,
            price: item.price,
            // imageUrl: `${server}/${item.productImage[0].replace(/ /g, "%20")}`,
            quantity: item.quantity,
          })
        );
      });
    }
  }, [cartItems, dispatch]);

  return (
    <div className=" bg-[#e5d9ca] w-full ">
      <div className="container mx-auto px-4 py-10 xl:px-0">
        <div className="  max-w-screen-xl md:mx-auto px-4 py-10 xl:px-0 flex justify-center items-center ">
          <div className="text-center md:text-left mb-10">
            <div className=" hidden md:block text-[20px] md:text-[50px]  md:leading-[60px] lg:leading-[60px] font-bold mb-3 xl:mb-10">
              <h1>
                Food you love,
                <br /> delivered to you
              </h1>
            </div>

            <div className=" md:hidden text-[20px] sm:text-[30px] md:text-[60px] md:leading-[80px] font-bold mb-3 xl:mb-10">
              <h1>Food you love, delivered to you</h1>
            </div>

            <div className=" hidden md:block mb-10 w-[400px] lg:w-[560px] ">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                in lorem augue. Cras facilisis lacus nibh, volutpat varius neque
                imperdiet sit amet.
              </p>
            </div>

            <div className="md:hidden flex justify-center items-center mr-3 ">
              <div>
                <img className="" src={food_s1}></img>
              </div>
            </div>

            <div>
              <Link
                to={"/menu"}
                className=" border bg-[#ff9e39] font-semibold px-10 py-2 rounded-[50px] "
              >
                Explore Menu
              </Link>
            </div>
          </div>

          <div className=" hidden md:block ">
            <img src={food_s1}></img>
          </div>
        </div>

        <div className="h-[30vh]  hidden  ">
          <div className="flex xl:flex-row flex-col gap-[20px] xl:gap-[200px] ">
            <div className="flex bg-[#ede8e3]  h-[200px] w-[470px] rounded-[20px] shadow relative  ">
              <div className=" flex flex-col pl-20 gap-3 py-5 w-[340px]  ">
                <div className="">
                  <h3 className="text-[20px] font-semibold ">
                    Enjoy your Organic Food
                  </h3>
                </div>

                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div>
                  <Link
                    to={"/menu"}
                    className="border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
              <div>
                <img
                  className="h-[200px] w-[200px] absolute left-[350px]  "
                  src={s2_1}
                ></img>
              </div>
            </div>

            <div className="flex bg-[#ede8e3]  h-[200px] w-[470px] rounded-[20px] shadow relative  ">
              <div className=" flex flex-col pl-20 gap-3 py-5 w-[340px]  ">
                <div className="">
                  <h3 className="text-[20px] font-semibold ">
                    Enjoy your Dellcious Food
                  </h3>
                </div>

                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div>
                  <Link
                    to={"/menu"}
                    className="border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
              <div>
                <img
                  className="h-[200px] w-[200px]  absolute left-[350px]  "
                  src={s2_2}
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div className="  max-w-screen-xl md:mx-auto px-4 py-10 xl:px-0 flex justify-center items-center ">
          <div className="flex flex-col md:flex-row w-full  mt-3 md:gap-[30px] lg:gap-[100px] ">
            <div className="hidden md:block">
              <img
                className=" sm:h-auto md:h-auto xl:h-[500px] w-full object-cover "
                src={s3}
                alt="s3"
              ></img>
            </div>

            <div className="mt-5 flex flex-col items-center md:items-start ">
              <div className=" text-[20px] md:text-[40px] text-center md:text-left font-bold ">
                <h3>We Deliver Anywhere</h3>
              </div>

              <div className="block md:hidden mt-4">
                <img
                  className="h-[300px]  w-full object-cover"
                  src={s3}
                  alt="s3"
                ></img>
              </div>

              <div className="w-full md:w-[450px] mt-5">
                <p className="text-center md:text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus in lorem augue. Cras facilisis lacus nibh, volutpat
                  varius neque imperdiet sit amet.
                </p>
              </div>

              <div className="flex gap-5 mt-5">
                <div>
                  <Link
                    to={"/menu"}
                    className="border bg-[#ffb73a] font-medium px-6 py-2 rounded-[50px]"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[100vh] hidden">
          <div className="text-[40px] font-bold ">
            <h3 className="text-center">
              We Offer You <br /> Different Tastes
            </h3>
          </div>

          <div className="flex gap-5 mt-7 ">
            <div className="bg-[#ff9e39] w-[250px] h-[307px] rounded-[20px] ">
              <div className="flex justify-center mt-5">
                <button className="flex bg-[#efe3d3] rounded-[40px] font-medium shadow gap-7  items-center pl-2 pr-20 py-2 ">
                  <img src={s4_1}></img>
                  Salads
                </button>
              </div>

              <div className="flex justify-center mt-5">
                <button className="flex bg-[#efe3d3] rounded-[40px] font-medium shadow gap-7  items-center pl-2 pr-20 py-2 ">
                  <img src={s4_1}></img>
                  Dessert
                </button>
              </div>

              <div className="flex justify-center mt-5">
                <button className="flex bg-[#efe3d3] rounded-[40px] font-medium shadow gap-7  items-center pl-2 pr-20 py-2 ">
                  <img src={s4_1}></img>
                  Drinks
                </button>
              </div>
            </div>

            <div className=" hidden lg:grid  lg:grid-cols-2 w-[955px] gap-4   ">
              <div className="flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ">
                <div className=" flex flex-col pl-5 gap-3 py-5 w-[340px]  ">
                  <div className="">
                    <h3 className="text-[20px] font-semibold ">
                      Grilled Vegetables
                    </h3>
                  </div>

                  <div className="w-[200px]">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>

                  <div className="flex">
                    <div>
                      <h3 className=" font-semibold px-6 py-2 rounded-[50px]">
                        ₹450
                      </h3>
                    </div>

                    <div>
                      <button className="border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    className="h-[200px] w-[200px] absolute left-[230px]  "
                    src={s2_1}
                  ></img>
                </div>
              </div>

              <div className="flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ">
                <div className=" flex flex-col pl-5 gap-3 py-5 w-[340px]  ">
                  <div className="">
                    <h3 className="text-[20px] font-semibold ">
                      Grilled Vegetables
                    </h3>
                  </div>

                  <div className="w-[200px]">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>

                  <div className="flex">
                    <div>
                      <h3 className=" font-semibold px-6 py-2 rounded-[50px]">
                        ₹450
                      </h3>
                    </div>

                    <div>
                      <button className="border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    className="h-[200px] w-[200px] absolute left-[230px]  "
                    src={s2_1}
                  ></img>
                </div>
              </div>

              <div className="flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ">
                <div className=" flex flex-col pl-5 gap-3 py-5 w-[340px]  ">
                  <div className="">
                    <h3 className="text-[20px] font-semibold ">
                      Grilled Vegetables
                    </h3>
                  </div>

                  <div className="w-[200px]">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>

                  <div className="flex">
                    <div>
                      <h3 className=" font-semibold px-6 py-2 rounded-[50px]">
                        ₹450
                      </h3>
                    </div>

                    <div>
                      <button className="border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    className="h-[200px] w-[200px] absolute left-[230px]  "
                    src={s2_1}
                  ></img>
                </div>
              </div>

              <div className="flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ">
                <div className=" flex flex-col pl-5 gap-3 py-5 w-[340px]  ">
                  <div className="">
                    <h3 className="text-[20px] font-semibold ">
                      Grilled Vegetables
                    </h3>
                  </div>

                  <div className="w-[200px]">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>

                  <div className="flex">
                    <div>
                      <h3 className=" font-semibold px-6 py-2 rounded-[50px]">
                        ₹450
                      </h3>
                    </div>

                    <div>
                      <button className="border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    className="h-[200px] w-[200px] absolute left-[230px]  "
                    src={s2_1}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="h-[100vh] w-full myContainer bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${s5bg})` }}>5dfgdfg</div> */}

        {/* <div className="h-[100vh]">
          <img src={s5bg} ></img>
          6</div> */}
      </div>
    </div>
  );
};

export default Home;
