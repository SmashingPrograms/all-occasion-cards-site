"""
Comprehensive Test Suite for All Occasion Cards Flask Backend

This test suite covers all aspects of the Flask application including:
- API endpoint functionality
- Data structure validation
- Error handling
- Request/response formatting
- Debug endpoints
- Edge cases and error conditions

The tests are designed to be run with pytest and provide detailed debugging
information for each test case.

Author: Test Developer
Date: 2024
"""

import pytest
import json
import logging
from datetime import datetime
from unittest.mock import patch, MagicMock
from app import app, website_data, APIError

# Configure test logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# =============================================================================
# TEST FIXTURES AND SETUP
# =============================================================================

@pytest.fixture
def client():
    """
    Create a test client for the Flask application.
    This fixture provides a client that can make requests to the app for testing.
    """
    app.config['TESTING'] = True
    app.config['DEBUG'] = True
    
    with app.test_client() as client:
        # Set up test context
        with app.app_context():
            yield client

@pytest.fixture
def sample_card_data():
    """
    Sample card data for testing purposes.
    Returns a dictionary with valid card information.
    """
    return {
        "id": 1,
        "name": "Test Birthday Card",
        "category": "birthday",
        "description": "A test birthday card",
        "price": 4.99,
        "image_url": "/images/cards/test-birthday.jpg",
        "rotation": 2.5,
        "tags": ["birthday", "test", "celebration"]
    }

@pytest.fixture
def sample_contact_data():
    """
    Sample contact data for testing purposes.
    Returns a dictionary with valid contact information.
    """
    return {
        "title": "Get in Touch",
        "info": [
            {
                "id": "email",
                "type": "email",
                "icon": "FaEnvelope",
                "value": "test@example.com",
                "label": "Email Address"
            }
        ]
    }

# =============================================================================
# HEALTH CHECK TESTS
# =============================================================================

class TestHealthCheck:
    """Test cases for the health check endpoint."""
    
    def test_health_check_success(self, client):
        """
        Test that the health check endpoint returns a successful response
        with all required fields.
        """
        logger.info("Testing health check endpoint success")
        
        response = client.get('/api/health')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'status' in data
        assert 'message' in data
        assert 'timestamp' in data
        assert 'version' in data
        assert 'debug_mode' in data
        
        # Verify specific values
        assert data['status'] == 'healthy'
        assert data['message'] == 'All Occasion Cards API is running'
        assert data['debug_mode'] is True
        assert data['version'] == '1.0.0'
        
        # Verify timestamp format
        datetime.fromisoformat(data['timestamp'])
        
        logger.info("Health check test passed successfully")
    
    def test_health_check_response_format(self, client):
        """
        Test that the health check response has the correct JSON format
        and content type.
        """
        logger.info("Testing health check response format")
        
        response = client.get('/api/health')
        
        # Verify content type
        assert response.content_type == 'application/json'
        
        # Verify JSON is valid
        data = json.loads(response.data)
        assert isinstance(data, dict)
        
        logger.info("Health check response format test passed")

# =============================================================================
# CONTENT ENDPOINT TESTS
# =============================================================================

class TestContentEndpoints:
    """Test cases for content-related endpoints."""
    
    def test_get_all_content_success(self, client):
        """
        Test that the get all content endpoint returns the complete
        website data structure.
        """
        logger.info("Testing get all content endpoint")
        
        response = client.get('/api/content')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'header' in data
        assert 'hero' in data
        assert 'about' in data
        assert 'gallery' in data
        assert 'contact' in data
        assert 'footer' in data
        assert 'metadata' in data
        assert 'theme' in data
        
        # Verify data types
        assert isinstance(data['header'], dict)
        assert isinstance(data['hero'], dict)
        assert isinstance(data['about'], dict)
        assert isinstance(data['gallery'], dict)
        assert isinstance(data['contact'], dict)
        assert isinstance(data['footer'], dict)
        assert isinstance(data['metadata'], dict)
        assert isinstance(data['theme'], dict)
        
        logger.info("Get all content test passed")
    
    def test_get_section_content_success(self, client):
        """
        Test that individual section content endpoints return
        the correct data structure.
        """
        logger.info("Testing get section content endpoints")
        
        sections = ['header', 'hero', 'about', 'gallery', 'contact', 'footer', 'metadata', 'theme']
        
        for section in sections:
            logger.debug(f"Testing section: {section}")
            
            response = client.get(f'/api/content/{section}')
            data = json.loads(response.data)
            
            # Verify response structure
            assert response.status_code == 200
            assert 'section' in data
            assert 'data' in data
            assert 'timestamp' in data
            
            # Verify section name
            assert data['section'] == section
            
            # Verify data is not empty
            assert data['data'] is not None
            
            # Verify timestamp format
            datetime.fromisoformat(data['timestamp'])
        
        logger.info("All section content tests passed")
    
    def test_get_section_content_invalid_section(self, client):
        """
        Test that requesting an invalid section returns a proper error response.
        """
        logger.info("Testing invalid section request")
        
        response = client.get('/api/content/invalid_section')
        data = json.loads(response.data)
        
        # Verify error response
        assert response.status_code == 400
        assert 'error' in data
        assert data['error']['message'] == 'Invalid section: invalid_section'
        assert data['error']['error_code'] == 'INVALID_SECTION'
        
        logger.info("Invalid section test passed")
    
    def test_get_section_content_nonexistent_section(self, client):
        """
        Test that requesting a nonexistent section returns a proper error response.
        """
        logger.info("Testing nonexistent section request")
        
        # Mock getattr to return None for a valid section name
        with patch.object(website_data, 'nonexistent', None):
            response = client.get('/api/content/nonexistent')
            data = json.loads(response.data)
            
            # Verify error response
            assert response.status_code == 404
            assert 'error' in data
            assert data['error']['message'] == 'Section not found: nonexistent'
            assert data['error']['error_code'] == 'SECTION_NOT_FOUND'
        
        logger.info("Nonexistent section test passed")

# =============================================================================
# CARDS ENDPOINT TESTS
# =============================================================================

class TestCardsEndpoints:
    """Test cases for card-related endpoints."""
    
    def test_get_cards_success(self, client):
        """
        Test that the get cards endpoint returns all cards without filters.
        """
        logger.info("Testing get cards endpoint without filters")
        
        response = client.get('/api/cards')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'cards' in data
        assert 'total_count' in data
        assert 'filters_applied' in data
        assert 'timestamp' in data
        
        # Verify data types
        assert isinstance(data['cards'], list)
        assert isinstance(data['total_count'], int)
        assert isinstance(data['filters_applied'], dict)
        
        # Verify we have cards
        assert len(data['cards']) > 0
        assert data['total_count'] == len(data['cards'])
        
        # Verify card structure
        for card in data['cards']:
            assert 'id' in card
            assert 'name' in card
            assert 'category' in card
            assert 'description' in card
            assert 'price' in card
            assert 'image_url' in card
            assert 'rotation' in card
            assert 'tags' in card
        
        logger.info("Get cards test passed")
    
    def test_get_cards_with_category_filter(self, client):
        """
        Test that the get cards endpoint properly filters by category.
        """
        logger.info("Testing get cards with category filter")
        
        response = client.get('/api/cards?category=birthday')
        data = json.loads(response.data)
        
        # Verify response
        assert response.status_code == 200
        assert 'cards' in data
        
        # Verify all returned cards are birthday cards
        for card in data['cards']:
            assert card['category'] == 'birthday'
        
        # Verify filters applied
        assert data['filters_applied']['category'] == 'birthday'
        
        logger.info("Category filter test passed")
    
    def test_get_cards_with_price_filters(self, client):
        """
        Test that the get cards endpoint properly filters by price range.
        """
        logger.info("Testing get cards with price filters")
        
        # Test minimum price filter
        response = client.get('/api/cards?min_price=5.0')
        data = json.loads(response.data)
        
        assert response.status_code == 200
        for card in data['cards']:
            assert card['price'] >= 5.0
        
        # Test maximum price filter
        response = client.get('/api/cards?max_price=5.0')
        data = json.loads(response.data)
        
        assert response.status_code == 200
        for card in data['cards']:
            assert card['price'] <= 5.0
        
        # Test both filters together
        response = client.get('/api/cards?min_price=4.0&max_price=6.0')
        data = json.loads(response.data)
        
        assert response.status_code == 200
        for card in data['cards']:
            assert 4.0 <= card['price'] <= 6.0
        
        logger.info("Price filter tests passed")
    
    def test_get_cards_with_tags_filter(self, client):
        """
        Test that the get cards endpoint properly filters by tags.
        """
        logger.info("Testing get cards with tags filter")
        
        response = client.get('/api/cards?tags=birthday,celebration')
        data = json.loads(response.data)
        
        # Verify response
        assert response.status_code == 200
        assert 'cards' in data
        
        # Verify all returned cards have at least one of the specified tags
        for card in data['cards']:
            assert any(tag in card['tags'] for tag in ['birthday', 'celebration'])
        
        # Verify filters applied
        assert data['filters_applied']['tags'] == ['birthday', 'celebration']
        
        logger.info("Tags filter test passed")
    
    def test_get_card_by_id_success(self, client):
        """
        Test that getting a card by ID returns the correct card.
        """
        logger.info("Testing get card by ID")
        
        # Test with a known card ID
        response = client.get('/api/cards/1')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'card' in data
        assert 'timestamp' in data
        
        # Verify card data
        card = data['card']
        assert card['id'] == 1
        assert 'name' in card
        assert 'category' in card
        assert 'description' in card
        assert 'price' in card
        
        logger.info("Get card by ID test passed")
    
    def test_get_card_by_id_not_found(self, client):
        """
        Test that requesting a nonexistent card ID returns a proper error.
        """
        logger.info("Testing get card by nonexistent ID")
        
        response = client.get('/api/cards/999')
        data = json.loads(response.data)
        
        # Verify error response
        assert response.status_code == 404
        assert 'error' in data
        assert data['error']['message'] == 'Card not found with ID: 999'
        assert data['error']['error_code'] == 'CARD_NOT_FOUND'
        
        logger.info("Card not found test passed")
    
    def test_get_categories_success(self, client):
        """
        Test that the categories endpoint returns all available categories.
        """
        logger.info("Testing get categories endpoint")
        
        response = client.get('/api/categories')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'categories' in data
        assert 'total_count' in data
        assert 'timestamp' in data
        
        # Verify data types
        assert isinstance(data['categories'], list)
        assert isinstance(data['total_count'], int)
        
        # Verify we have categories
        assert len(data['categories']) > 0
        assert data['total_count'] == len(data['categories'])
        
        # Verify expected categories exist
        expected_categories = ['birthday', 'sympathy', 'wedding', 'thank_you', 'holiday', 'get_well']
        for category in expected_categories:
            assert category in data['categories']
        
        logger.info("Get categories test passed")

# =============================================================================
# CONTACT ENDPOINT TESTS
# =============================================================================

class TestContactEndpoints:
    """Test cases for contact-related endpoints."""
    
    def test_get_contact_info_success(self, client):
        """
        Test that the contact endpoint returns complete contact information.
        """
        logger.info("Testing get contact info endpoint")
        
        response = client.get('/api/contact')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'contact' in data
        assert 'timestamp' in data
        
        # Verify contact data structure
        contact = data['contact']
        assert 'title' in contact
        assert 'info' in contact
        assert 'social_media' in contact
        assert 'business_hours' in contact
        
        # Verify info array
        assert isinstance(contact['info'], list)
        assert len(contact['info']) > 0
        
        # Verify each contact info item
        for info_item in contact['info']:
            assert 'id' in info_item
            assert 'type' in info_item
            assert 'icon' in info_item
            assert 'value' in info_item
            assert 'label' in info_item
        
        # Verify social media array
        assert isinstance(contact['social_media'], list)
        
        # Verify business hours
        assert isinstance(contact['business_hours'], dict)
        expected_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        for day in expected_days:
            assert day in contact['business_hours']
        
        logger.info("Get contact info test passed")

# =============================================================================
# DEBUG ENDPOINT TESTS
# =============================================================================

class TestDebugEndpoints:
    """Test cases for debug endpoints."""
    
    def test_debug_data_structure_success(self, client):
        """
        Test that the debug data structure endpoint returns complete debug information.
        """
        logger.info("Testing debug data structure endpoint")
        
        response = client.get('/api/debug/data')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'debug_info' in data
        
        debug_info = data['debug_info']
        assert 'data_structure' in debug_info
        assert 'app_config' in debug_info
        assert 'timestamp' in debug_info
        
        # Verify app config
        app_config = debug_info['app_config']
        assert 'debug' in app_config
        assert 'json_sort_keys' in app_config
        assert app_config['debug'] is True
        
        # Verify data structure contains expected sections
        data_structure = debug_info['data_structure']
        expected_sections = ['header', 'hero', 'about', 'gallery', 'contact', 'footer', 'metadata', 'theme']
        for section in expected_sections:
            assert section in data_structure
        
        logger.info("Debug data structure test passed")
    
    def test_debug_logs_success(self, client):
        """
        Test that the debug logs endpoint returns log information.
        """
        logger.info("Testing debug logs endpoint")
        
        response = client.get('/api/debug/logs')
        data = json.loads(response.data)
        
        # Verify response structure
        assert response.status_code == 200
        assert 'debug_logs' in data
        
        debug_logs = data['debug_logs']
        assert 'recent_entries' in debug_logs
        assert 'total_entries' in debug_logs
        assert 'timestamp' in debug_logs
        
        # Verify data types
        assert isinstance(debug_logs['recent_entries'], list)
        assert isinstance(debug_logs['total_entries'], int)
        
        logger.info("Debug logs test passed")
    
    def test_debug_endpoints_disabled_in_production(self, client):
        """
        Test that debug endpoints are disabled when debug mode is off.
        """
        logger.info("Testing debug endpoints disabled in production")
        
        # Temporarily disable debug mode
        original_debug = app.config['DEBUG']
        app.config['DEBUG'] = False
        
        try:
            # Test debug data endpoint
            response = client.get('/api/debug/data')
            data = json.loads(response.data)
            
            assert response.status_code == 403
            assert 'error' in data
            assert data['error']['message'] == 'Debug endpoint not available in production'
            assert data['error']['error_code'] == 'DEBUG_DISABLED'
            
            # Test debug logs endpoint
            response = client.get('/api/debug/logs')
            data = json.loads(response.data)
            
            assert response.status_code == 403
            assert 'error' in data
            assert data['error']['message'] == 'Debug endpoint not available in production'
            assert data['error']['error_code'] == 'DEBUG_DISABLED'
            
        finally:
            # Restore debug mode
            app.config['DEBUG'] = original_debug
        
        logger.info("Debug endpoints disabled test passed")

# =============================================================================
# ERROR HANDLING TESTS
# =============================================================================

class TestErrorHandling:
    """Test cases for error handling and edge cases."""
    
    def test_404_error_handling(self, client):
        """
        Test that 404 errors are handled properly with custom response.
        """
        logger.info("Testing 404 error handling")
        
        response = client.get('/api/nonexistent_endpoint')
        data = json.loads(response.data)
        
        # Verify error response
        assert response.status_code == 404
        assert 'error' in data
        assert data['error']['message'] == 'Resource not found'
        assert data['error']['error_code'] == 'NOT_FOUND'
        assert 'requested_url' in data['error']
        
        logger.info("404 error handling test passed")
    
    def test_500_error_handling(self, client):
        """
        Test that 500 errors are handled properly with custom response.
        """
        logger.info("Testing 500 error handling")
        
        # Mock an endpoint to raise an exception
        @app.route('/api/test_error')
        def test_error():
            raise Exception("Test error")
        
        response = client.get('/api/test_error')
        data = json.loads(response.data)
        
        # Verify error response
        assert response.status_code == 500
        assert 'error' in data
        assert data['error']['message'] == 'Internal server error'
        assert data['error']['error_code'] == 'INTERNAL_ERROR'
        
        logger.info("500 error handling test passed")
    
    def test_api_error_custom_exception(self, client):
        """
        Test that custom APIError exceptions are handled properly.
        """
        logger.info("Testing custom APIError handling")
        
        # Mock an endpoint to raise a custom APIError
        @app.route('/api/test_api_error')
        def test_api_error():
            raise APIError("Test API error", 400, "TEST_ERROR")
        
        response = client.get('/api/test_api_error')
        data = json.loads(response.data)
        
        # Verify error response
        assert response.status_code == 400
        assert 'error' in data
        assert data['error']['message'] == 'Test API error'
        assert data['error']['error_code'] == 'TEST_ERROR'
        
        logger.info("Custom APIError handling test passed")

# =============================================================================
# DATA VALIDATION TESTS
# =============================================================================

class TestDataValidation:
    """Test cases for data structure validation."""
    
    def test_website_data_structure(self):
        """
        Test that the website data structure contains all required sections
        with proper data types.
        """
        logger.info("Testing website data structure validation")
        
        # Verify all required sections exist
        required_sections = ['header', 'hero', 'about', 'gallery', 'contact', 'footer', 'metadata', 'theme']
        for section in required_sections:
            assert hasattr(website_data, section)
            section_data = getattr(website_data, section)
            assert section_data is not None
            assert isinstance(section_data, dict)
        
        # Verify header structure
        assert 'logo' in website_data.header
        assert 'navigation' in website_data.header
        assert isinstance(website_data.header['navigation'], list)
        
        # Verify hero structure
        assert 'title' in website_data.hero
        assert 'subtitle' in website_data.hero
        assert 'background' in website_data.hero
        assert 'animation' in website_data.hero
        
        # Verify about structure
        assert 'title' in website_data.about
        assert 'content' in website_data.about
        assert isinstance(website_data.about['content'], list)
        
        # Verify gallery structure
        assert 'title' in website_data.gallery
        assert 'cards' in website_data.gallery
        assert 'categories' in website_data.gallery
        assert isinstance(website_data.gallery['cards'], list)
        assert isinstance(website_data.gallery['categories'], list)
        
        # Verify contact structure
        assert 'title' in website_data.contact
        assert 'info' in website_data.contact
        assert 'social_media' in website_data.contact
        assert 'business_hours' in website_data.contact
        
        # Verify footer structure
        assert 'copyright' in website_data.footer
        assert 'links' in website_data.footer
        assert isinstance(website_data.footer['links'], list)
        
        # Verify metadata structure
        assert 'site_name' in website_data.metadata
        assert 'description' in website_data.metadata
        assert 'keywords' in website_data.metadata
        assert 'version' in website_data.metadata
        
        # Verify theme structure
        assert 'colors' in website_data.theme
        assert 'fonts' in website_data.theme
        assert 'border_radius' in website_data.theme
        assert 'shadows' in website_data.theme
        
        logger.info("Website data structure validation passed")
    
    def test_card_data_structure(self):
        """
        Test that all cards in the gallery have the required structure.
        """
        logger.info("Testing card data structure validation")
        
        for card in website_data.gallery['cards']:
            # Verify required fields
            assert 'id' in card
            assert 'name' in card
            assert 'category' in card
            assert 'description' in card
            assert 'price' in card
            assert 'image_url' in card
            assert 'rotation' in card
            assert 'tags' in card
            
            # Verify data types
            assert isinstance(card['id'], int)
            assert isinstance(card['name'], str)
            assert isinstance(card['category'], str)
            assert isinstance(card['description'], str)
            assert isinstance(card['price'], (int, float))
            assert isinstance(card['image_url'], str)
            assert isinstance(card['rotation'], (int, float))
            assert isinstance(card['tags'], list)
            
            # Verify price is positive
            assert card['price'] > 0
            
            # Verify tags are strings
            for tag in card['tags']:
                assert isinstance(tag, str)
            
            # Verify category is valid
            assert card['category'] in website_data.gallery['categories']
        
        logger.info("Card data structure validation passed")

# =============================================================================
# INTEGRATION TESTS
# =============================================================================

class TestIntegration:
    """Integration tests that test multiple endpoints together."""
    
    def test_complete_workflow(self, client):
        """
        Test a complete workflow from health check to content retrieval.
        """
        logger.info("Testing complete workflow")
        
        # 1. Health check
        response = client.get('/api/health')
        assert response.status_code == 200
        
        # 2. Get all content
        response = client.get('/api/content')
        assert response.status_code == 200
        
        # 3. Get categories
        response = client.get('/api/categories')
        assert response.status_code == 200
        categories_data = json.loads(response.data)
        
        # 4. Get cards for each category
        for category in categories_data['categories']:
            response = client.get(f'/api/cards?category={category}')
            assert response.status_code == 200
        
        # 5. Get contact info
        response = client.get('/api/contact')
        assert response.status_code == 200
        
        logger.info("Complete workflow test passed")
    
    def test_data_consistency(self, client):
        """
        Test that data is consistent across different endpoints.
        """
        logger.info("Testing data consistency across endpoints")
        
        # Get all content
        all_content_response = client.get('/api/content')
        all_content_data = json.loads(all_content_response.data)
        
        # Get individual sections and verify consistency
        sections = ['header', 'hero', 'about', 'gallery', 'contact', 'footer']
        
        for section in sections:
            section_response = client.get(f'/api/content/{section}')
            section_data = json.loads(section_response.data)
            
            # Verify the section data matches
            assert section_data['data'] == all_content_data[section]
        
        logger.info("Data consistency test passed")

# =============================================================================
# PERFORMANCE TESTS
# =============================================================================

class TestPerformance:
    """Performance tests for the API endpoints."""
    
    def test_response_time_health_check(self, client):
        """
        Test that health check endpoint responds quickly.
        """
        logger.info("Testing health check response time")
        
        import time
        start_time = time.time()
        
        response = client.get('/api/health')
        
        end_time = time.time()
        response_time = end_time - start_time
        
        # Verify response is successful
        assert response.status_code == 200
        
        # Verify response time is reasonable (less than 1 second)
        assert response_time < 1.0
        
        logger.info(f"Health check response time: {response_time:.3f} seconds")
    
    def test_response_time_content_retrieval(self, client):
        """
        Test that content retrieval endpoints respond quickly.
        """
        logger.info("Testing content retrieval response time")
        
        import time
        start_time = time.time()
        
        response = client.get('/api/content')
        
        end_time = time.time()
        response_time = end_time - start_time
        
        # Verify response is successful
        assert response.status_code == 200
        
        # Verify response time is reasonable (less than 1 second)
        assert response_time < 1.0
        
        logger.info(f"Content retrieval response time: {response_time:.3f} seconds")

# =============================================================================
# MAIN TEST RUNNER
# =============================================================================

if __name__ == '__main__':
    """
    Run the test suite directly if this file is executed.
    This allows for easy debugging and development of tests.
    """
    logger.info("=" * 60)
    logger.info("Starting All Occasion Cards Flask Backend Test Suite")
    logger.info("=" * 60)
    
    # Run tests with pytest
    import sys
    import pytest
    
    # Add command line arguments for pytest
    args = [
        __file__,
        '-v',  # Verbose output
        '--tb=short',  # Short traceback format
        '--capture=no',  # Show print statements
        '--log-cli-level=DEBUG'  # Show debug logs
    ]
    
    # Run the tests
    exit_code = pytest.main(args)
    
    logger.info("=" * 60)
    logger.info(f"Test suite completed with exit code: {exit_code}")
    logger.info("=" * 60)
    
    sys.exit(exit_code) 