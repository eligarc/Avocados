import React from 'react'
import styles from './ProductSummary.module.sass'

type ProductSummaryProps = {
	product: TProduct
}

const ProductSummary = ({ product: { name, image, price, sku, attributes} }: ProductSummaryProps) => (
	<section className={styles.group}>
		<div className={styles.item}>
			<div className={styles.image}>
				<img src={image} alt={name} width={250} height={250} />
			</div>
			<div className={styles.content}>
				<p className={styles.name}>{name}</p>
				<p className={styles.price}>${price}</p>
				<span className={styles.sku}>SKU: {sku}</span>
			</div>
		</div>
		<div className={styles.description}>
			<h3>About this avocado</h3>
			<p>{attributes.description}</p>
		</div>
	</section>
)

export default ProductSummary