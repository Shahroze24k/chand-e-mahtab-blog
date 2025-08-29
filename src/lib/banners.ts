// Banner management utilities for Chand-e-Mahtab blog

export interface Banner {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  descriptionUrdu: string;
  path: string;
  tags: string[];
  suitable_for: string[];
}

export interface BannerCategory {
  name: string;
  nameUrdu: string;
  banners: string[];
}

export interface BannersConfig {
  defaultBanners: Banner[];
  categories: BannerCategory[];
}

// Load banners configuration
export async function getBannersConfig(): Promise<BannersConfig> {
  try {
    const response = await fetch('/banners/banners-config.json');
    if (!response.ok) {
      throw new Error('Failed to load banners config');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading banners config:', error);
    // Return fallback config
    return {
      defaultBanners: [],
      categories: []
    };
  }
}

// Get all available banners
export async function getAvailableBanners(): Promise<Banner[]> {
  const config = await getBannersConfig();
  return config.defaultBanners;
}

// Get banners by category
export async function getBannersByCategory(categoryName: string): Promise<Banner[]> {
  const config = await getBannersConfig();
  const category = config.categories.find(cat => cat.name === categoryName);
  
  if (!category) {
    return [];
  }
  
  return config.defaultBanners.filter(banner => 
    category.banners.includes(banner.id)
  );
}

// Get banner by ID
export async function getBannerById(id: string): Promise<Banner | null> {
  const config = await getBannersConfig();
  return config.defaultBanners.find(banner => banner.id === id) || null;
}

// Get random banner
export async function getRandomBanner(): Promise<Banner | null> {
  const banners = await getAvailableBanners();
  if (banners.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * banners.length);
  return banners[randomIndex];
}

// Get banner suggestions based on tags
export async function getSuggestedBanners(tags: string[]): Promise<Banner[]> {
  const banners = await getAvailableBanners();
  const tagLowercase = tags.map(tag => tag.toLowerCase());
  
  return banners.filter(banner => 
    banner.tags.some(bannerTag => 
      tagLowercase.some(tag => 
        bannerTag.toLowerCase().includes(tag) || tag.includes(bannerTag.toLowerCase())
      )
    )
  );
}

// Client-side banner loading (for components)
export function loadBannersConfig(): Promise<BannersConfig> {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return Promise.resolve({
      defaultBanners: [],
      categories: []
    });
  }
  
  return fetch('/banners/banners-config.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error loading banners config:', error);
      return {
        defaultBanners: [],
        categories: []
      };
    });
}
