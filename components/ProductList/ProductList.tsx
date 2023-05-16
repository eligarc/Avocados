import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ProductList.module.sass'

type ProductListProps = {
	products: TProduct[]
}

const mapProductsToCards = (products: TProduct[]) =>
	products.map(({ name, id, price, image }) => (
		<Link key={id} href={`/product/${id}`} passHref>
			<div className={styles.productCard}>
				<Image src={image} alt={name} width={250} height={250} />
				<div className={styles.content}>
					<p className={styles.name}>{name}</p>
					<p className={styles.price}>${price}</p>
				</div>
			</div>
		</Link>
	))

const ProductList = ({ products }: ProductListProps) => (
	<div className={styles.productList}>
		{mapProductsToCards(products)}
	</div>
)

export default ProductList