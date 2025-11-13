/**
 * Frontend Types and Schemas for Strapi API
 * 
 * This file contains all types and schemas necessary for the frontend
 * to fetch and work with data from the Strapi backend.
 */

// ============================================================================
// Configuration
// ============================================================================

/**
 * Strapi API Base URL (Production)
 */
export const STRAPI_BASE_URL = 'https://strapi-production-b5ca5.up.railway.app';

/**
 * Strapi API Endpoint
 */
export const STRAPI_API_URL = `${STRAPI_BASE_URL}/api`;

// ============================================================================
// Base Types
// ============================================================================

/**
 * Strapi Media/File object structure
 */
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string | null;
  url: string;
}

/**
 * Strapi API Response wrapper types
 */
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  documentId: string;
  attributes: T;
  meta?: Record<string, unknown>;
}

export type StrapiSingleResponse<T> = StrapiResponse<StrapiEntity<T>>;
export type StrapiCollectionResponse<T> = StrapiResponse<StrapiEntity<T>[]>;

// ============================================================================
// Component Types
// ============================================================================

/**
 * SEO Component
 */
export interface SeoComponent {
  id?: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: StrapiMedia | null;
}

/**
 * Hero Image Component
 */
export interface HeroImageComponent {
  id?: number;
  image?: StrapiMedia | null;
  caption?: string | null;
  alt?: string | null;
}

/**
 * Text Block Component
 */
export interface TextBlockComponent {
  id?: number;
  content: unknown; // Blocks content (RichText)
}

/**
 * Image Block Component
 */
export interface ImageBlockComponent {
  id?: number;
  image?: StrapiMedia | null;
  caption?: string | null;
  alt?: string | null;
}

/**
 * Image Link Component
 */
export interface ImageLinkComponent {
  id?: number;
  image?: StrapiMedia | null;
  url?: string | null;
  caption?: string | null;
  alt?: string | null;
  openInNewTab?: boolean | null;
}

/**
 * GIF Embed Component
 */
export interface GifEmbedComponent {
  id?: number;
  url?: string | null;
  alt?: string | null;
}

/**
 * Video Embed Component
 */
export interface VideoEmbedComponent {
  id?: number;
  url?: string | null;
  caption?: string | null;
}

/**
 * AdSense Block Component
 */
export interface AdsenseBlockComponent {
  id?: number;
  slotId?: string | null;
  format?: string | null;
  label?: string | null;
  responsive?: boolean | null;
  desktopOnly?: boolean | null;
}

/**
 * Custom Ad Break Component
 */
export interface CustomAdBreakComponent {
  id?: number;
  type?: string | null;
}

/**
 * Dynamic Zone Component Union Type
 */
export type DynamicZoneComponent =
  | ({ __component: 'generic.adsense-block' } & AdsenseBlockComponent)
  | ({ __component: 'generic.custom-ad-break' } & CustomAdBreakComponent)
  | ({ __component: 'generic.gif-embed' } & GifEmbedComponent)
  | ({ __component: 'generic.image-block' } & ImageBlockComponent)
  | ({ __component: 'generic.image-link' } & ImageLinkComponent)
  | ({ __component: 'generic.text-block' } & TextBlockComponent)
  | ({ __component: 'generic.video-embed' } & VideoEmbedComponent);

// ============================================================================
// Content Type Attributes
// ============================================================================

/**
 * Author Attributes
 */
export interface AuthorAttributes {
  name?: string | null;
  shortBio?: string | null;
  slug?: string | null;
  avatar?: StrapiMedia | null;
  source?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  posts?: PostEntity[];
}

/**
 * Category Attributes
 */
export interface CategoryAttributes {
  name?: string | null;
  slug?: string | null;
  weight?: number | null;
  contentShort?: string | null;
  contentLong?: string | null;
  source?: string | null;
  seo?: SeoComponent | null;
  heroImage?: HeroImageComponent | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  posts?: PostEntity[];
  category?: CategoryEntity | null;
  categories?: CategoryEntity[];
}

/**
 * Post Attributes
 */
export interface PostAttributes {
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  showcaseDescription?: string | null;
  source?: string | null;
  seo?: SeoComponent | null;
  heroImage?: HeroImageComponent | null;
  contentArea?: DynamicZoneComponent[] | null;
  author?: AuthorEntity | null;
  category?: CategoryEntity | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
}

// ============================================================================
// Entity Types (with id and documentId)
// ============================================================================

/**
 * Author Entity
 */
export interface AuthorEntity extends StrapiEntity<AuthorAttributes> {}

/**
 * Category Entity
 */
export interface CategoryEntity extends StrapiEntity<CategoryAttributes> {}

/**
 * Post Entity
 */
export interface PostEntity extends StrapiEntity<PostAttributes> {}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Single Author Response
 */
export type AuthorResponse = StrapiSingleResponse<AuthorAttributes>;

/**
 * Author Collection Response
 */
export type AuthorsResponse = StrapiCollectionResponse<AuthorAttributes>;

/**
 * Single Category Response
 */
export type CategoryResponse = StrapiSingleResponse<CategoryAttributes>;

/**
 * Category Collection Response
 */
export type CategoriesResponse = StrapiCollectionResponse<CategoryAttributes>;

/**
 * Single Post Response
 */
export type PostResponse = StrapiSingleResponse<PostAttributes>;

/**
 * Post Collection Response
 */
export type PostsResponse = StrapiCollectionResponse<PostAttributes>;

// ============================================================================
// Query Parameter Types
// ============================================================================

/**
 * Strapi Query Parameters
 * 
 * Supports standard Strapi populate as well as deep populate plugin syntax.
 * With @fourlights/strapi-plugin-deep-populate enabled, you can use:
 * - populate: '*' to deep populate all relations
 * - populate: ['field1', 'field2'] for selective deep population
 * - populate: { field: { populate: '*' } } for nested deep population
 */
export interface StrapiQueryParams {
  populate?: '*' | string | string[] | Record<string, unknown>;
  fields?: string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string;
  /**
   * Deep populate specific options (when using deep populate plugin)
   */
  deepPopulate?: {
    omitEmpty?: boolean; // Omit empty relations from the response
  };
}

/**
 * Common populate options for posts
 * 
 * With @fourlights/strapi-plugin-deep-populate enabled:
 * - Use 'deep' option to populate all relations automatically
 * - Standard 'all' and 'minimal' options still work with explicit populate
 */
export const PostPopulateOptions = {
  /**
   * Deep populate all relations using wildcard (requires deep populate plugin)
   */
  deep: {
    populate: '*',
  },
  all: {
    populate: {
      author: {
        populate: ['avatar'],
      },
      category: {
        populate: ['seo', 'heroImage'],
      },
      seo: {
        populate: ['ogImage'],
      },
      heroImage: {
        populate: ['image'],
      },
      contentArea: {
        populate: {
          on: {
            'generic.image-block': { populate: ['image'] },
            'generic.image-link': { populate: ['image'] },
            'generic.hero-image': { populate: ['image'] },
            'generic.seo': { populate: ['ogImage'] },
          },
        },
      },
    },
  },
  minimal: {
    populate: ['author', 'category'],
  },
} as const;

/**
 * Common populate options for authors
 * 
 * With @fourlights/strapi-plugin-deep-populate enabled:
 * - Use 'deep' option to populate all relations automatically
 */
export const AuthorPopulateOptions = {
  /**
   * Deep populate all relations using wildcard (requires deep populate plugin)
   */
  deep: {
    populate: '*',
  },
  all: {
    populate: ['avatar', 'posts'],
  },
  minimal: {
    populate: ['avatar'],
  },
} as const;

/**
 * Common populate options for categories
 * 
 * With @fourlights/strapi-plugin-deep-populate enabled:
 * - Use 'deep' option to populate all relations automatically
 */
export const CategoryPopulateOptions = {
  /**
   * Deep populate all relations using wildcard (requires deep populate plugin)
   */
  deep: {
    populate: '*',
  },
  all: {
    populate: {
      seo: {
        populate: ['ogImage'],
      },
      heroImage: {
        populate: ['image'],
      },
      category: true,
      categories: true,
    },
  },
  minimal: {
    populate: ['seo', 'heroImage'],
  },
} as const;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Build a Strapi API URL with query parameters
 * 
 * @param endpoint - API endpoint path (e.g., '/posts' or '/posts/1')
 *                   Can be relative (will be prefixed with /api) or absolute
 * @param params - Query parameters
 * @returns Full URL with query string
 * 
 * @example
 * buildStrapiUrl('/posts', { populate: '*', filters: { slug: { $eq: 'my-post' } } })
 * buildStrapiUrl('/api/posts/1', { populate: '*' })
 */
export function buildStrapiUrl(
  endpoint: string,
  params?: StrapiQueryParams
): string {
  // Ensure endpoint starts with /api
  const normalizedEndpoint = endpoint.startsWith('/api') 
    ? endpoint 
    : endpoint.startsWith('/')
    ? `/api${endpoint}`
    : `/api/${endpoint}`;
  
  const url = new URL(normalizedEndpoint, STRAPI_BASE_URL);
  
  if (params) {
    // Handle populate parameter (supports deep populate plugin)
    if (params.populate !== undefined) {
      if (params.populate === '*') {
        url.searchParams.append('populate', '*');
      } else if (typeof params.populate === 'string') {
        url.searchParams.append('populate', params.populate);
      } else if (Array.isArray(params.populate)) {
        params.populate.forEach((field) => {
          url.searchParams.append('populate[]', field);
        });
      } else {
        // For nested populate objects, we need to encode it properly
        // Deep populate plugin handles this automatically when using '*'
        url.searchParams.append('populate', JSON.stringify(params.populate));
      }
    }
    
    // Handle fields
    if (params.fields) {
      params.fields.forEach((field) => {
        url.searchParams.append('fields[]', field);
      });
    }
    
    // Handle filters
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        url.searchParams.append(`filters[${key}]`, JSON.stringify(value));
      });
    }
    
    // Handle sort
    if (params.sort) {
      if (typeof params.sort === 'string') {
        url.searchParams.append('sort', params.sort);
      } else if (Array.isArray(params.sort)) {
        params.sort.forEach((sort) => {
          url.searchParams.append('sort[]', sort);
        });
      }
    }
    
    // Handle pagination
    if (params.pagination) {
      if (params.pagination.page !== undefined) {
        url.searchParams.append('pagination[page]', params.pagination.page.toString());
      }
      if (params.pagination.pageSize !== undefined) {
        url.searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
      }
      if (params.pagination.start !== undefined) {
        url.searchParams.append('pagination[start]', params.pagination.start.toString());
      }
      if (params.pagination.limit !== undefined) {
        url.searchParams.append('pagination[limit]', params.pagination.limit.toString());
      }
    }
    
    // Handle publication state
    if (params.publicationState) {
      url.searchParams.append('publicationState', params.publicationState);
    }
    
    // Handle locale
    if (params.locale) {
      url.searchParams.append('locale', params.locale);
    }
  }
  
  return url.toString();
}

/**
 * Fetch data from Strapi API with deep populate support
 * 
 * @param endpoint - API endpoint path (e.g., '/posts' or '/posts/1')
 * @param params - Query parameters (supports deep populate with populate: '*')
 * @param options - Fetch options
 * @returns Promise resolving to the response data
 * 
 * @example
 * const post = await fetchStrapiData('/posts', { populate: '*' });
 */
export async function fetchStrapiData<T>(
  endpoint: string,
  params?: StrapiQueryParams,
  options?: RequestInit
): Promise<T> {
  const url = buildStrapiUrl(endpoint, params);
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Extract attributes from an entity
 */
export type ExtractAttributes<T> = T extends StrapiEntity<infer A> ? A : never;

/**
 * Extract entity from a response
 */
export type ExtractEntity<T> = T extends StrapiSingleResponse<infer E>
  ? E
  : T extends StrapiCollectionResponse<infer E>
  ? E
  : never;

/**
 * Flatten entity to just attributes (useful for form data)
 */
export type FlattenEntity<T> = T extends StrapiEntity<infer A> ? A : T;

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if a dynamic zone component is a specific type
 */
export function isComponentType<T extends DynamicZoneComponent>(
  component: DynamicZoneComponent,
  type: string
): component is T {
  return component.__component === type;
}

/**
 * Type guard to check if media exists
 */
export function hasMedia(media: StrapiMedia | null | undefined): media is StrapiMedia {
  return media !== null && media !== undefined;
}


