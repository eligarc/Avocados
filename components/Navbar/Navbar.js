import React from 'react'
import Link from 'next/link'

const Navbar = () => {
	return (
		<div>
		<nav>
			<Link href="/" prefetch={false}>
				Home
			</Link>
			<Link href="/about" prefetch={false}>
				About
			</Link>
		</nav>
		</div>
	)
}

export default Navbar