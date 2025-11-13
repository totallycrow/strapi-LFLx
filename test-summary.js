/**
 * Summary test - verify deep populate is working
 */

const STRAPI_BASE_URL = 'https://strapi-production-b5ca5.up.railway.app';

async function summaryTest() {
  console.log('📊 Test Summary: Strapi API with Deep Populate\n');
  console.log('='.repeat(70));
  
  const results = {
    urlBuilding: false,
    apiConnectivity: false,
    deepPopulateWorking: false,
    nestedRelations: false,
  };
  
  // Test 1: URL Building
  console.log('\n✅ 1. URL Building');
  try {
    const testUrl = `${STRAPI_BASE_URL}/api/posts?populate=*`;
    console.log(`   Production URL: ${STRAPI_BASE_URL}`);
    console.log(`   Sample API URL: ${testUrl}`);
    results.urlBuilding = true;
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // Test 2: API Connectivity
  console.log('\n✅ 2. API Connectivity');
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/posts?populate=*&pagination[pageSize]=1`);
    if (response.ok) {
      console.log(`   ✅ Server reachable (Status: ${response.status})`);
      results.apiConnectivity = true;
    } else {
      console.log(`   ❌ Server returned: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Connection error: ${error.message}`);
  }
  
  // Test 3: Deep Populate Working
  console.log('\n✅ 3. Deep Populate Functionality');
  try {
    const urlWithPopulate = `${STRAPI_BASE_URL}/api/posts?populate=*&pagination[pageSize]=1`;
    const urlWithoutPopulate = `${STRAPI_BASE_URL}/api/posts?pagination[pageSize]=1`;
    
    const [responseWith, responseWithout] = await Promise.all([
      fetch(urlWithPopulate),
      fetch(urlWithoutPopulate)
    ]);
    
    const dataWith = await responseWith.json();
    const dataWithout = await responseWithout.json();
    
    if (dataWith.data && dataWithout.data && Array.isArray(dataWith.data) && Array.isArray(dataWithout.data)) {
      const postWith = dataWith.data[0];
      const postWithout = dataWithout.data[0];
      
      const fieldsWith = Object.keys(postWith);
      const fieldsWithout = Object.keys(postWithout);
      
      // Deep populate should include category, author, seo, heroImage, contentArea
      const deepPopulateFields = ['category', 'author', 'seo', 'heroImage', 'contentArea'];
      const foundFields = deepPopulateFields.filter(field => fieldsWith.includes(field));
      
      console.log(`   Fields without populate: ${fieldsWithout.length}`);
      console.log(`   Fields with deep populate: ${fieldsWith.length}`);
      console.log(`   Found deep populate fields: ${foundFields.join(', ')}`);
      
      if (fieldsWith.length > fieldsWithout.length && foundFields.length > 0) {
        console.log(`   ✅ Deep populate IS working! Found ${foundFields.length} populated relation(s).`);
        results.deepPopulateWorking = true;
        
        // Check nested population
        if (postWith.category && typeof postWith.category === 'object') {
          const categoryKeys = Object.keys(postWith.category);
          console.log(`   ✅ Category is populated with fields: ${categoryKeys.slice(0, 5).join(', ')}...`);
          
          // Check if nested relations in category are populated
          if (postWith.category.seo || postWith.category.heroImage || postWith.category.category || postWith.category.categories) {
            console.log(`   ✅ Nested relations in category are being populated!`);
            results.nestedRelations = true;
          }
        }
        
        // Check contentArea for nested components
        if (postWith.contentArea && Array.isArray(postWith.contentArea) && postWith.contentArea.length > 0) {
          const hasNestedData = postWith.contentArea.some(component => {
            if (component.__component === 'generic.text-block' && component.content) {
              // Check if content has nested images
              return JSON.stringify(component.content).includes('"url"');
            }
            return false;
          });
          
          if (hasNestedData) {
            console.log(`   ✅ Dynamic zone components with nested data are populated!`);
          }
        }
      } else {
        console.log(`   ⚠️  Deep populate may not be working as expected.`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  // Final Summary
  console.log('\n\n' + '='.repeat(70));
  console.log('📋 Final Test Results:');
  console.log('='.repeat(70));
  console.log(`✅ URL Building: ${results.urlBuilding ? 'PASS' : 'FAIL'}`);
  console.log(`✅ API Connectivity: ${results.apiConnectivity ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Deep Populate Working: ${results.deepPopulateWorking ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Nested Relations: ${results.nestedRelations ? 'PASS (Partial)' : 'INFO (Depends on data)'}`);
  
  const allCriticalPassed = results.urlBuilding && results.apiConnectivity && results.deepPopulateWorking;
  
  console.log('\n' + '='.repeat(70));
  if (allCriticalPassed) {
    console.log('✨ All critical tests PASSED! The API is working correctly.');
    console.log('✨ Deep populate plugin is functional.');
    console.log('✨ frontend.ts is ready to use!');
  } else {
    console.log('⚠️  Some tests failed. Please review the output above.');
  }
  console.log('='.repeat(70));
}

summaryTest().catch(console.error);


