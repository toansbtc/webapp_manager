import React, { useState } from 'react'
import Image from 'next/image';

export default function home() {


    const [description, setDescription] = useState('')



    return (
        <div style={styles.pageContainer}>
            <div style={styles.mainImageContainer}>
                <Image
                    unoptimized
                    src="/bg.jpg"
                    alt="Main Feature"
                    width={800}
                    height={200}
                    style={styles.mainImage}
                />
                <p style={styles.mainDescription}>
                    {description !== '' ? description : 'empty text'}
                </p>
            </div>

            {/* Grid of Images and Descriptions */}
            <div style={styles.gridContainer}>
                {gridItems.map((item, index) => (
                    <div key={index} style={styles.gridItem}>
                        <Image
                            unoptimized
                            src={item.imageUrl}
                            alt={item.altText}
                            width={300}
                            height={200}
                            style={styles.gridImage}
                        />
                        <p style={styles.gridDescription}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Data for grid items
const gridItems = [
    {
        imageUrl: '/bg.jpg',
        altText: 'Image 1',
        description: 'This is the description for Image 1.',
    },
    {
        imageUrl: '/bg.jpg',
        altText: 'Image 2',
        description: 'This is the description for Image 2.',
    },
    {
        imageUrl: '/bg.jpg',
        altText: 'Image 3',
        description: 'This is the description for Image 3.',
    },
    {
        imageUrl: '/bg.jpg',
        altText: 'Image 4',
        description: 'This is the description for Image 4.',
    },
    // Add more items as needed
];

// CSS-in-JS styles
const styles = {
    pageContainer: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    mainImageContainer: {
        marginBottom: '40px',
        //   textAlign: 'center',
    },
    mainImage: {
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
    },
    mainDescription: {
        marginTop: '20px',
        fontSize: '1.2em',
        color: '#555',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    gridItem: {
        //   textAlign: 'center',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    gridImage: {
        borderRadius: '8px',
        width: '100%',
        height: 'auto',
    },
    gridDescription: {
        marginTop: '15px',
        fontSize: '1em',
        color: '#444',
    },
};

