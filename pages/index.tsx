import React, { useEffect, useState } from "react";
// import axios from "axios";
// import  { useQuery } from 'react-query';
import { useQuery, gql } from "@apollo/client";
import ProductList from "@components/ProductList/ProductList";
// SERVER SIDE RENDERING
// export const getServerSideProps = async () => {
// STATIC SITE GENERATION
export const getStaticProps = async () => {
  const PROTOCOL = process.env.PROTOCOL;
  const URL = process.env.BKND_URL;

  const response = await fetch(`${PROTOCOL}${URL}/api/avo`);
  const { data: productList }: TAPIAvoResponse = await response.json();
  return {
    props: {
      productList,
    },
  };
};

// const query = `
// 	query {
// 			avos {
// 				id
// 				image
// 				name
// 				createdAt
// 				sku
// 				price
// 				attributes {
// 					description
// 					taste
// 					shape
// 					hardiness
// 				}
// 			}
// 	}`;

const avocadoFragment = `
		id
		image
		name
		createdAt
		sku
		price
		attributes {
			description
			taste
			shape
			hardiness
		}
	`;

// const baseUrl = process.env.NEXT_PUBLIC_SERVICES_URL || "http://localhost:3000";

// const requester = axios.create({
// 	baseURL: baseUrl,
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// });

// const requester = (endpoint?: string, data?: Record<string, number | string>) =>
//   fetch(`${baseUrl}/${endpoint}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

const useAvocados = () => {
  const query = gql`
		query GetAllAvos {
			avos {
				${avocadoFragment}
			}
		}
	`;
  return useQuery(query);
  // return useQuery('avocados', async () => {
  // 	const response = await requester.post<{data: {avos: TProduct[]}}>('graphql', { query });
  // 	return response.data.data.avos;
  // });
  // const [data, setData] = useState<TProduct[]>([]);
  // const [status, setStatus] = useState<
  //   'success' | 'loading' | 'error' | 'idle'
  // >('idle');
  // useEffect(() => {
  //   const fetchQuery = async () => {
  //     setStatus('loading');
  //     try {
  //       const response = await requester('graphql', { query });
  //       const {
  //         data: { avos },
  //       } = (await response.json()) as { data: { avos: TProduct[] } };
  //       setData(avos);
  //       setStatus('success');
  //     } catch (e) {
  //       console.log('Something went wrong fetching the data', e);
  // 			setStatus('error');
  //     }
  //   };
  //   fetchQuery();
  // }, []);
  // return { data, status };
};

const useAvocado = (id: number | string) => {
  const query = gql`
  query GetAvo($avoId: ID!) {
      avo(id: $avoId) {
        ${avocadoFragment}
      }
    }
  `;
  return useQuery(query, { variables: { avoId: id } });
};

// const Home = ({ productList }: { productList: TProduct[] }) => {
const Home = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { data, loading } = useAvocados();
  console.log({ data, loading });
  return (
    <section style={{ textAlign: "center" }}>
      <div style={{ margin: "2rem 0" }}>
        <button onClick={() => setIsEnabled(true)}>Fetch child</button>
        {isEnabled && <ChildComponent />}
      </div>
      <h1>Tipos de aguacates</h1>
      <ProductList products={data.avos} />
    </section>
  );
};


function ChildComponent() {
  const { data, loading } = useAvocado(1)
  console.log('Single avocado: ', { data, loading })
  return <p>Mounted</p>
}

export default Home;
