import React from 'react';
import NextImage, { ImageProps } from 'next/image';
import styles from './Image.module.css';

function Image({ className, ...props }: ImageProps) {
	return (
		<div className={className || 'w-full'}>
			<NextImage {...props} sizes="100vw" fill className={styles.image} />
		</div>
	);
}

export default Image;