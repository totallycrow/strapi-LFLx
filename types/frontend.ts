/**
 * Frontend Types and Schemas for Strapi API
 * 
 * This file contains all types and schemas necessary for the frontend
 * to fetch and work with data from the Strapi backend.
 */

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
 */
export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, unknown>;
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
}

/**
 * Common populate options for posts
 */
export const PostPopulateOptions = {
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
 */
export const AuthorPopulateOptions = {
  all: {
    populate: ['avatar', 'posts'],
  },
  minimal: {
    populate: ['avatar'],
  },
} as const;

/**
 * Common populate options for categories
 */
export const CategoryPopulateOptions = {
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


