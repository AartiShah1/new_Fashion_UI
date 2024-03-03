import React from 'react';
import styled from 'styled-components';
import react , { useEffect, useState }from 'react';
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import Sidebar from '../component/Sidebar';

const Dashboard = () => {


    const [productData, setProduct] = useState(0);
    const [userData, setUser] = useState(0);
    const [orderData, setOrder] = useState(0);
    const [maxCount, setMaxCount] = useState(0);
    const [userInfo, setUserInfo] = useState([]);
  const [auth, setAuth] = useState([]);
  const navigate = useNavigate();
  
  // console.log('productData,userData, orderData', productData,userData, orderData)
    useEffect(() => {

      let userData = JSON.parse(localStorage.getItem("userInfo"));
      if(userData){
        setUserInfo(auth);
      }
      else{
        localStorage.removeItem('userInfo');
        navigate('/',{replace:true})
      }

    //   let userData = JSON.parse(localStorage.getItem("userInfo"));
  
    //   if (userData) {
    //     navigate("/adminpage/", { replace: true });
    //   } else {
    //     navigate("/login", { replace: true });
    //   }
      const fetchData = async () => {
        try {
          const response = await fetch(
            "  http://localhost:4500/users/status/count"
          ); // Replace with your API endpoint
          const result = await response.json();
          setProduct(result.output[1][0].productCount);
          setUser(result.output[0][0].userCount);
          setOrder(result.output[2][0].orderCount);
            let x = Math.max(result.output[1][0].productCount, result.output[0][0].userCount, result.output[2][0].orderCount);
            console.log('x',x)
          setMaxCount(x);
          // console.log('resp',, , )
  
          // const getUser = await fetch(" http://localhost:4000/signup/all"); // Replace with your API endpoint
          // const res = await getUser.json();
          // 
  
        // const getFeed = await fetch(
        //     " http://localhost:4000/order/all"
        //   ); // Replace with your API endpoint
        //   const resp = await getFeed.json();
        //   console.log('resp',productData.output, userData.output, orderData.output)
        //   
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

    const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 12%;
  background-color: white; /* Set your desired background color */
`;

const ChartsContainer = styled.div`
  flex: 1;
  padding: 20px; /* Adjust the padding as needed */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ChartWrapper = styled.div`
  width: 60%; /* Adjust the width as needed */
  margin-bottom: 20px; /* Adjust the margin as needed */
`;

const ChartHeading = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;



  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <br />

      <ChartsContainer>
        <ChartWrapper>
        <ChartHeading>Bar Chart</ChartHeading>
          <Chart
          options={{
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: ["Product", "users", "orders"],
            },
            yaxis: { max: maxCount + 10 }
          }}
          series={[
            {
              name: "series-1",
              data: [productData, userData, orderData],
            },
          ]}
          type="bar"
          width="500"
          />
        </ChartWrapper>

        <ChartWrapper>
        <ChartHeading>Donut Chart</ChartHeading>
          <Chart
            height={550}
            width={380}
            options={{
              type: "donut",
              labels: ["product", "Users", "orders"],
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                    },
                  },
                },
              },
            }}
            series={[productData, userData, orderData]}
            type="donut"
          />
        </ChartWrapper>
      </ChartsContainer>
    </Container>
  );
};

export default Dashboard