import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tradepivotgroup.com';

  // In a more complex app, you'd fetch dynamic routes (e.g. projects) here
  // For now, we have the main landing page.
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Example of how to add more pages:
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
  ];
}
