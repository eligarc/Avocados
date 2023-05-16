import React from 'react'
import ProductSummary from '@components/ProductSummary/ProductSummary'
import { GetStaticProps } from 'next'

export const getStaticPaths = async () => {
	const PROTOCOL = process.env.PROTOCOL
	const URL = process.env.BKND_URL
	const response = await fetch(`${PROTOCOL}${URL}/api/avo`)
	const { data: productList }: TAPIAvoResponse = await response.json()
	const paths = productList.map(({ id }) => ({ params: { id } }))
	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const PROTOCOL = process.env.PROTOCOL
	const URL = process.env.BKND_URL

	const id = params?.id as string;
	const response = await fetch(`${PROTOCOL}${URL}/api/avo/${id}`)
	const product: TProduct = await response.json()
	return {
		props: {
			product
		}
	}
}

const ProductItem = ({ product }: {product: TProduct}) => {
	console.log(product)
	return (
		<>
			{product === null ? null : <ProductSummary product={product} />}
		</>
	)
}

export default ProductItem