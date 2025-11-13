import type { Schema, Struct } from '@strapi/strapi';

export interface GenericAdsenseBlock extends Struct.ComponentSchema {
  collectionName: 'components_generic_adsense_blocks';
  info: {
    displayName: 'AdsenseBlock';
  };
  attributes: {
    desktopOnly: Schema.Attribute.Boolean;
    format: Schema.Attribute.String;
    label: Schema.Attribute.String;
    responsive: Schema.Attribute.Boolean;
    slotId: Schema.Attribute.String;
  };
}

export interface GenericCustomAdBreak extends Struct.ComponentSchema {
  collectionName: 'components_generic_custom_ad_breaks';
  info: {
    displayName: 'CustomAdBreak';
  };
  attributes: {
    type: Schema.Attribute.String;
  };
}

export interface GenericGifEmbed extends Struct.ComponentSchema {
  collectionName: 'components_generic_gif_embeds';
  info: {
    displayName: 'GifEmbed';
  };
  attributes: {
    alt: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface GenericHeroImage extends Struct.ComponentSchema {
  collectionName: 'components_generic_hero_images';
  info: {
    displayName: 'HeroImage';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface GenericImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_generic_image_blocks';
  info: {
    displayName: 'ImageBlock';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface GenericImageLink extends Struct.ComponentSchema {
  collectionName: 'components_generic_image_links';
  info: {
    displayName: 'ImageLink';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    openInNewTab: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
  };
}

export interface GenericSeo extends Struct.ComponentSchema {
  collectionName: 'components_generic_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface GenericTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_generic_text_blocks';
  info: {
    displayName: 'TextBlock';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface GenericVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_generic_video_embeds';
  info: {
    displayName: 'videoEmbed';
  };
  attributes: {
    caption: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'generic.adsense-block': GenericAdsenseBlock;
      'generic.custom-ad-break': GenericCustomAdBreak;
      'generic.gif-embed': GenericGifEmbed;
      'generic.hero-image': GenericHeroImage;
      'generic.image-block': GenericImageBlock;
      'generic.image-link': GenericImageLink;
      'generic.seo': GenericSeo;
      'generic.text-block': GenericTextBlock;
      'generic.video-embed': GenericVideoEmbed;
    }
  }
}
