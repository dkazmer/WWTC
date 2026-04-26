// Cannot abstract anything related to imports: all data needs to be static

import type { Picture } from '@sveltejs/enhanced-img';

const images = import.meta.glob<true, string, Picture>(
	'/static/images/2025-05-03/thumbnail_20250503_11{4159,3717,3704}.{jpg,png}',
	{
		query: { enhanced: true, w: 1080 },
		eager: true,
		import: 'default'
	}
);
export const gallery = Object.values(images);

const images2 = import.meta.glob<true, string, Picture>(
	'/static/images/2025-05-03/thumbnail_20250503_12{1958,2016,1743,1659}.{jpg,png}',
	{
		query: { enhanced: true, w: 504 },
		eager: true,
		import: 'default'
	}
);
export const gallery2 = Object.values(images2);

const images3 = import.meta.glob<true, string, Picture>(
	'/static/images/2025-05-03/thumbnail_20250503_12{2034,2049,2135,2148,4236}.{jpg,png}',
	{
		query: { enhanced: true, w: 1080 },
		eager: true,
		import: 'default'
	}
);
export const gallery3 = Object.values(images3);

const images4 = import.meta.glob<true, string, Picture>(
	'/static/images/2025-05-03/thumbnail_20250503_121{940,923,900,805}.{jpg,png}',
	{
		query: { enhanced: true, w: 504 },
		eager: true,
		import: 'default'
	}
);
export const gallery4 = Object.values(images4);

const images5 = import.meta.glob<true, string, Picture>(
	'/static/images/2025-05-03/thumbnail_20250503_1{14454,14102,21721,14136,13353}.{jpg,png}',
	{
		query: { enhanced: true, w: 1080 },
		eager: true,
		import: 'default'
	}
);
export const gallery5 = Object.values(images5);

const images6 = import.meta.glob<true, string, Picture>(
	'/static/images/2024-05-04/20240504_1{13418,21208,21216,21326,21448,21509}.{jpg,png}',
	{
		query: { enhanced: true, w: 1080 },
		eager: true,
		import: 'default'
	}
);
const images6a = import.meta.glob<true, string, Picture | null>('/static/images/2024-05-04/20240504_121240.{jpg,png}', {
	query: { enhanced: true, w: 504 },
	eager: true,
	import: 'default'
});
export const gallery6 = Object.values({ ...images6a, ...images6 }).toSpliced(0, 0, null);

const imagesLast = import.meta.glob<true, string, Picture>(
	'/static/images/2012_stf/{IMG_4727,IMG_4731,IMG_4722,IMG_4732}.{jpg,png}',
	{
		query: { enhanced: true, w: 504 },
		eager: true,
		import: 'default'
	}
);
export const galleryLast = Object.values(imagesLast);
