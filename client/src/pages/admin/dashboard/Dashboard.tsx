// import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
// import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
// import Table from "../../components/admin/DashboardTable";
// import data from "../../assets/data.json"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../../../api"

const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {

  const [monthlyRevenue , setmonthlyRevenue ]=useState<any>([]);
  const [customerData, setCustomerData] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    api.get(`/admin/customers`)
      .then((res) => {
        if (res.data.success) {
          setCustomerData(res.data.data);
        } else {
          toast.error("Error while loading data");
        }
      })
      .catch((error) => {
        toast.error("Error while loading data");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product/get");
        if (response.data.success) {
          setProductList(response.data.data);
        }
      } catch (error) {
        console.error("Error while loading products", error);
      }
    };

    fetchProducts();
  }, []);


  
  

  useEffect(() => {
    const fetchMonthlyStats = async () => {
        try {
            const res = await api.get("/order/monthlyStats");
            setmonthlyRevenue(res.data.monthlyRevenue);
        } catch (error) {
            console.error(error);
        }
    };

    fetchMonthlyStats();
}, []);


  console.log("mr:",monthlyRevenue);
  

  // const thisMonthRevenue = monthlyRevenue?.pop()

 

  const thisMonthRevenue = monthlyRevenue && monthlyRevenue.length > 0 ? monthlyRevenue.pop() : undefined;
  

  // const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 3];


  return (
    <div className="h-full" >
      
      <main className="dashboard h-full ">
        {/* <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img src={userImg} alt="User" />
        </div> */}

        <section className="widget-container">
          <WidgetItem
            // percent={40}
            amount={true}
            value={thisMonthRevenue}
            heading="Revenue"
            // color="rgb(0, 115, 255)"
          />
          <WidgetItem
            // percent={-14}
            value={customerData.length}
            // color="rgb(0 198 202)"
            heading="Users"
          />
          

          <WidgetItem
            
            value= {productList.length}
            
            heading="Products"
          />
        </section>

        <section className="graph-container">
          {/* <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_2={[300, 144, 433, 655, 237, 755 ]}
              data_1={[200, 444, 343, 556, 778, 455]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0, 115, 255)"
              bgColor_2="rgba(53, 162, 235, 0.8)"
            />
          </div> */}

<div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_2={monthlyRevenue}
              // data_1={[200, 444, 343, 556, 778, 455]}
              data_1={[0,0,0,2071,1030]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0, 115, 255)"
              bgColor_2="rgba(53, 162, 235, 0.8)"
            />
          </div>

          {/* <div className="dashboard-categories">
            <h2>Inventory</h2>

            <div>
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  value={i.value}
                  heading={i.heading}
                  color={`hsl(${i.value * 4}, ${i.value}%, 50%)`}
                />
              ))}
            </div>
          </div> */}
        </section>

        {/* <section className="transaction-container"> */}
          {/* <div className="gender-chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={[
                "hsl(340, 82%, 56%)",
                "rgba(53, 162, 235, 0.8)",
              ]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div> */}
          {/* <Table data={data.transaction} /> */}
        {/* </section> */}

        
      </main>
    </div>
  );
};



interface WidgetItemProps {
  heading: string;
  value: number;
  // percent: number;
  // color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  // percent,
  // color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `₹${value}` : value}</h4>
      {/* {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )} */}
    </div>

    {/* <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div> */}
  </article>
);

// interface CategoryItemProps {
//   color: string;
//   value: number;
//   heading: string;
// }

// const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
//   <div className="category-item">
    
//     <h5>{heading}</h5>
//     <div>
//       <div
//         style={{
//           backgroundColor: color,
//           width: `${value}%`,
//         }}
//       ></div>
//     </div>
//     <span>{value}%</span>
//   </div>
// );

export default Dashboard;
