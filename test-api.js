/**
 * Test script for Strapi API with deep populate plugin
 * 
 * This script tests:
 * 1. URL building functions
 * 2. API connectivity to production server
 * 3. Deep populate functionality
 */

const STRAPI_BASE_URL = 'https://strapi-production-b5ca5.up.railway.app';
const STRAPI_API_URL = `${STRAPI_BASE_URL}/api`;

// Simple URL builder function (matches frontend.ts logic)
function buildStrapiUrl(endpoint, params = {}) {
  const normalizedEndpoint = endpoint.startsWith('/api') 
    ? endpoint 
    : endpoint.startsWith('/')
    ? `/api${endpoint}`
    : `/api/${endpoint}`;
  
  const url = new URL(normalizedEndpoint, STRAPI_BASE_URL);
  
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
      url.searchParams.append('populate', JSON.stringify(params.populate));
    }
  }
  
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      url.searchParams.append(`filters[${key}]`, JSON.stringify(value));
    });
  }
  
  if (params.sort) {
    if (typeof params.sort === 'string') {
      url.searchParams.append('sort', params.sort);
    } else if (Array.isArray(params.sort)) {
      params.sort.forEach((sort) => {
        url.searchParams.append('sort[]', sort);
      });
    }
  }
  
  if (params.pagination) {
    if (params.pagination.page !== undefined) {
      url.searchParams.append('pagination[page]', params.pagination.page.toString());
    }
    if (params.pagination.pageSize !== undefined) {
      url.searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
  }
  
  return url.toString();
}

// Test function
async function testAPI() {
  console.log('🧪 Testing Strapi API with Deep Populate Plugin\n');
  console.log('=' .repeat(60));
  
  // Test 1: URL building
  console.log('\n1️⃣ Testing URL Building Functions');
  console.log('-'.repeat(60));
  
  const testUrls = [
    { desc: 'Posts with deep populate', endpoint: '/posts', params: { populate: '*' } },
    { desc: 'Posts with array populate', endpoint: '/posts', params: { populate: ['author', 'category'] } },
    { desc: 'Single post', endpoint: '/posts/1', params: { populate: '*' } },
    { desc: 'Authors with deep populate', endpoint: '/authors', params: { populate: '*' } },
    { desc: 'Categories with deep populate', endpoint: '/categories', params: { populate: '*' } },
    { desc: 'Posts with filters and pagination', endpoint: '/posts', params: { populate: '*', pagination: { page: 1, pageSize: 5 } } },
  ];
  
  testUrls.forEach(({ desc, endpoint, params }) => {
    const url = buildStrapiUrl(endpoint, params);
    console.log(`\n${desc}:`);
    console.log(`  ${url}`);
  });
  
  // Test 2: API Connectivity
  console.log('\n\n2️⃣ Testing API Connectivity');
  console.log('-'.repeat(60));
  
  try {
    // Test basic connectivity
    console.log('\n📡 Testing basic connectivity...');
    const healthCheck = await fetch(`${STRAPI_BASE_URL}/_health`);
    if (healthCheck.ok) {
      console.log('✅ Server is reachable');
    } else {
      console.log('⚠️  Health check returned:', healthCheck.status);
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
  }
  
  // Test 3: Test endpoints with different populate strategies
  console.log('\n\n3️⃣ Testing API Endpoints');
  console.log('-'.repeat(60));
  
  const endpoints = [
    { name: 'Posts (no populate)', endpoint: '/posts', params: {} },
    { name: 'Posts (deep populate *)', endpoint: '/posts', params: { populate: '*', pagination: { pageSize: 1 } } },
    { name: 'Authors (deep populate *)', endpoint: '/authors', params: { populate: '*', pagination: { pageSize: 1 } } },
    { name: 'Categories (deep populate *)', endpoint: '/categories', params: { populate: '*', pagination: { pageSize: 1 } } },
  ];
  
  for (const { name, endpoint, params } of endpoints) {
    try {
      console.log(`\n📋 Testing: ${name}`);
      const url = buildStrapiUrl(endpoint, params);
      console.log(`   URL: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`   ✅ Status: ${response.status} OK`);
        console.log(`   📊 Response structure:`, JSON.stringify({
          hasData: !!data.data,
          dataType: Array.isArray(data.data) ? 'array' : typeof data.data,
          dataLength: Array.isArray(data.data) ? data.data.length : 'N/A',
          hasMeta: !!data.meta,
        }, null, 2));
        
        // If we have data, show a sample of the structure
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const firstItem = data.data[0];
          console.log(`   🔍 First item keys:`, Object.keys(firstItem).join(', '));
          if (firstItem.attributes) {
            console.log(`   🔍 First item attributes keys:`, Object.keys(firstItem.attributes).join(', '));
          }
        } else if (data.data && !Array.isArray(data.data)) {
          console.log(`   🔍 Data keys:`, Object.keys(data.data).join(', '));
          if (data.data.attributes) {
            console.log(`   🔍 Attributes keys:`, Object.keys(data.data.attributes).join(', '));
          }
        }
      } else {
        console.log(`   ❌ Status: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        if (errorText) {
          console.log(`   Error: ${errorText.substring(0, 200)}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  // Test 4: Verify deep populate is working
  console.log('\n\n4️⃣ Verifying Deep Populate Functionality');
  console.log('-'.repeat(60));
  
  try {
    console.log('\n🔍 Comparing populate strategies...');
    
    // Test without populate
    const urlNoPopulate = buildStrapiUrl('/posts', { pagination: { pageSize: 1 } });
    const responseNoPopulate = await fetch(urlNoPopulate);
    
    // Test with deep populate
    const urlDeepPopulate = buildStrapiUrl('/posts', { populate: '*', pagination: { pageSize: 1 } });
    const responseDeepPopulate = await fetch(urlDeepPopulate);
    
    if (responseNoPopulate.ok && responseDeepPopulate.ok) {
      const dataNoPopulate = await responseNoPopulate.json();
      const dataDeepPopulate = await responseDeepPopulate.json();
      
      if (dataNoPopulate.data && dataDeepPopulate.data) {
        const itemNoPopulate = Array.isArray(dataNoPopulate.data) ? dataNoPopulate.data[0] : dataNoPopulate.data;
        const itemDeepPopulate = Array.isArray(dataDeepPopulate.data) ? dataDeepPopulate.data[0] : dataDeepPopulate.data;
        
        if (itemNoPopulate && itemDeepPopulate) {
          const attrsNoPopulate = itemNoPopulate.attributes || {};
          const attrsDeepPopulate = itemDeepPopulate.attributes || {};
          
          console.log('\n   Without populate:');
          console.log(`   - Author populated: ${!!attrsNoPopulate.author}`);
          console.log(`   - Category populated: ${!!attrsNoPopulate.category}`);
          
          console.log('\n   With deep populate (*):');
          console.log(`   - Author populated: ${!!attrsDeepPopulate.author}`);
          if (attrsDeepPopulate.author) {
            const authorAttrs = attrsDeepPopulate.author.attributes || attrsDeepPopulate.author;
            console.log(`   - Author avatar populated: ${!!authorAttrs.avatar}`);
          }
          console.log(`   - Category populated: ${!!attrsDeepPopulate.category}`);
          if (attrsDeepPopulate.category) {
            const categoryAttrs = attrsDeepPopulate.category.attributes || attrsDeepPopulate.category;
            console.log(`   - Category seo populated: ${!!categoryAttrs.seo}`);
            console.log(`   - Category heroImage populated: ${!!categoryAttrs.heroImage}`);
          }
          
          if ((attrsDeepPopulate.author && !attrsNoPopulate.author) || 
              (attrsDeepPopulate.category && !attrsNoPopulate.category)) {
            console.log('\n   ✅ Deep populate is working! Relations are being populated.');
          } else {
            console.log('\n   ⚠️  Deep populate may not be working as expected. Check plugin configuration.');
          }
        }
      }
    }
  } catch (error) {
    console.log(`   ❌ Error comparing populate strategies: ${error.message}`);
  }
  
  console.log('\n\n' + '='.repeat(60));
  console.log('✨ Testing complete!');
}

// Run tests
testAPI().catch(console.error);


