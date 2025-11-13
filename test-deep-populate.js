/**
 * Detailed test to inspect the actual response structure
 */

const STRAPI_BASE_URL = 'https://strapi-production-b5ca5.up.railway.app';

async function inspectResponse() {
  console.log('🔍 Inspecting response structure...\n');
  
  try {
    // Test with deep populate
    const url = `${STRAPI_BASE_URL}/api/posts?populate=*&pagination[pageSize]=1`;
    console.log(`URL: ${url}\n`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Full response structure:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      const post = data.data[0];
      console.log('\n\n📝 Post structure:');
      console.log(JSON.stringify(post, null, 2));
      
      // Check if author exists and what it contains
      if (post.author) {
        console.log('\n\n👤 Author structure:');
        console.log(JSON.stringify(post.author, null, 2));
      } else {
        console.log('\n⚠️  Author is not populated or is null');
      }
      
      // Check if category exists and what it contains
      if (post.category) {
        console.log('\n\n📁 Category structure:');
        console.log(JSON.stringify(post.category, null, 2));
      } else {
        console.log('\n⚠️  Category is not populated or is null');
      }
      
      // Check if category.seo exists
      if (post.category && post.category.seo) {
        console.log('\n\n🔍 Category SEO structure:');
        console.log(JSON.stringify(post.category.seo, null, 2));
      } else if (post.category) {
        console.log('\n⚠️  Category SEO is not populated');
      }
    }
    
    // Also test without populate for comparison
    console.log('\n\n' + '='.repeat(60));
    console.log('📋 Testing WITHOUT populate for comparison:\n');
    
    const urlNoPopulate = `${STRAPI_BASE_URL}/api/posts?pagination[pageSize]=1`;
    const responseNoPopulate = await fetch(urlNoPopulate);
    const dataNoPopulate = await responseNoPopulate.json();
    
    if (dataNoPopulate.data && Array.isArray(dataNoPopulate.data) && dataNoPopulate.data.length > 0) {
      const postNoPopulate = dataNoPopulate.data[0];
      console.log('Post keys without populate:', Object.keys(postNoPopulate).join(', '));
      
      // Check which fields are null vs populated
      console.log('\nField comparison:');
      console.log(`- author: ${postNoPopulate.author !== undefined ? (postNoPopulate.author ? 'populated' : 'null/undefined') : 'missing'}`);
      console.log(`- category: ${postNoPopulate.category !== undefined ? (postNoPopulate.category ? 'populated' : 'null/undefined') : 'missing'}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

inspectResponse();


