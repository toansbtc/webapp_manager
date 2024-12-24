import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Item from '../../../public/Screenshot 2024-12-04 122823.png';

export default function Active() {
  const router = useRouter();
  const { category } = router.query;

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const allNews = {
      'hien-mau': [
        { id: 1, title: 'Hiền Mẫu News 1', image: Item, views: 610 },
        { id: 2, title: 'Hiền Mẫu News 2', image: Item, views: 520 },
      ],
      'gia-truong': [
        { id: 3, title: 'Gia Trưởng News 1', image: Item, views: 430 },
        { id: 4, title: 'Gia Trưởng News 2', image: Item, views: 880 },
      ],
      'gioi-tre': [
        { id: 5, title: 'Giới Trẻ News 1', image: Item, views: 340 },
        { id: 6, title: 'Giới Trẻ News 2', image: Item, views: 120 },
      ],
    };

    if (category) {
      const categoryKey = Array.isArray(category) ? category[0] : category;
      if (allNews[categoryKey]) {
        setNewsList(allNews[categoryKey]);
      } else {
        setNewsList([]);
      }
    }
  }, [category]);

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1 style={{ color: '#2E7D32' }}>
          {typeof category === 'string' ? category.replace('-', ' ').toUpperCase() : ''}
        </h1>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          padding: '0 20px',
        }}
      >
        {newsList.map((news) => (
          <div
            key={news.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={news.image}
              alt={news.title}
              layout="responsive"
              width={500}
              height={300}
            />
            <div
              style={{
                padding: '10px',
                backgroundColor: '#f9f9f9',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{news.title}</h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#555',
                }}
              >
                <span style={{ marginRight: '5px' }}>
                  <i className="fas fa-eye"></i>
                </span>
                <span>{news.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
