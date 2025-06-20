"""
All Occasion Cards - Flask Backend API

This Flask application serves as the backend for the All Occasion Cards website.
It provides a comprehensive data structure that can later be used to dynamically
serve content to the React frontend.

Features:
- RESTful API endpoints for all website content
- Comprehensive data structure for cards, content, and metadata
- Error handling and logging
- Debug mode support
- CORS support for frontend integration
- Health check endpoint
- Detailed API documentation

Author: Backend Developer
Date: 2024
"""

from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import logging
import os
from datetime import datetime
from typing import Dict, List, Any, Optional
import json

# Configure logging for debugging and monitoring
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for frontend integration
CORS(app, origins=["http://localhost:3000", "http://localhost:5173"])

# Configuration
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
app.config['JSON_SORT_KEYS'] = False  # Maintain order in JSON responses

# =============================================================================
# DATA STRUCTURE - Comprehensive content management for the website
# =============================================================================

class WebsiteData:
    """
    Central data structure that holds all website content.
    This class is designed to be easily extensible for future content management.
    """
    
    def __init__(self):
        """Initialize the website data structure with all content."""
        self._initialize_data()
    
    def _initialize_data(self):
        """Initialize all website data with comprehensive content structure."""
        
        # Header/Navigation data
        self.header = {
            "logo": {
                "text": "All Occasion Cards",
                "font_family": "Dancing Script",
                "font_size": "2rem"
            },
            "navigation": [
                {"id": "gallery", "text": "Gallery", "href": "#gallery"},
                {"id": "about", "text": "About", "href": "#about"},
                {"id": "contact", "text": "Contact", "href": "#contact"}
            ]
        }
        
        # Hero section data
        self.hero = {
            "title": "Handcrafted Cards for Every Occasion",
            "subtitle": "Bringing warmth and personality to your special moments with carefully crafted greeting cards",
            "background": {
                "type": "wood",
                "opacity": 0.1,
                "color": "#8B4513"
            },
            "animation": {
                "duration": 0.8,
                "delay": 0.2
            }
        }
        
        # About section data
        self.about = {
            "title": "About Us",
            "content": [
                {
                    "id": "intro",
                    "text": "Welcome to our cozy corner of creativity! We're passionate about crafting beautiful, heartfelt greeting cards that bring warmth and joy to every occasion. Each card is carefully designed with love and attention to detail, making your special moments even more memorable."
                },
                {
                    "id": "journey",
                    "text": "Our journey began with a simple idea: to create cards that feel like they were made by a friend, not a factory. We believe that the perfect card can speak volumes and create lasting connections between people. That's why we pour our hearts into every design, ensuring that each card carries its own unique personality and charm."
                },
                {
                    "id": "quality",
                    "text": "Whether you're celebrating a birthday, expressing sympathy, or just want to brighten someone's day, we have a card that will help you convey your feelings perfectly. Each card is made with high-quality materials and designed to be treasured for years to come."
                }
            ],
            "animation": {
                "duration": 0.8,
                "viewport_once": True
            }
        }
        
        # Gallery/Cards data
        self.gallery = {
            "title": "Our Collection",
            "cards": [
                {
                    "id": 1,
                    "name": "Birthday Celebration",
                    "category": "birthday",
                    "description": "A vibrant birthday card with colorful balloons and confetti",
                    "price": 4.99,
                    "image_url": "/images/cards/birthday-1.jpg",
                    "rotation": 2.5,
                    "tags": ["birthday", "celebration", "colorful"]
                },
                {
                    "id": 2,
                    "name": "Sympathy & Comfort",
                    "category": "sympathy",
                    "description": "A gentle sympathy card with soft floral design",
                    "price": 5.99,
                    "image_url": "/images/cards/sympathy-1.jpg",
                    "rotation": -1.8,
                    "tags": ["sympathy", "comfort", "floral"]
                },
                {
                    "id": 3,
                    "name": "Wedding Congratulations",
                    "category": "wedding",
                    "description": "An elegant wedding card with gold accents",
                    "price": 6.99,
                    "image_url": "/images/cards/wedding-1.jpg",
                    "rotation": 3.2,
                    "tags": ["wedding", "elegant", "gold"]
                },
                {
                    "id": 4,
                    "name": "Thank You Note",
                    "category": "thank_you",
                    "description": "A heartfelt thank you card with handwritten style",
                    "price": 3.99,
                    "image_url": "/images/cards/thank-you-1.jpg",
                    "rotation": -2.1,
                    "tags": ["thank_you", "handwritten", "heartfelt"]
                },
                {
                    "id": 5,
                    "name": "Holiday Cheer",
                    "category": "holiday",
                    "description": "A festive holiday card with warm winter scenes",
                    "price": 4.99,
                    "image_url": "/images/cards/holiday-1.jpg",
                    "rotation": 1.5,
                    "tags": ["holiday", "festive", "winter"]
                },
                {
                    "id": 6,
                    "name": "Get Well Soon",
                    "category": "get_well",
                    "description": "A cheerful get well card with bright flowers",
                    "price": 4.49,
                    "image_url": "/images/cards/get-well-1.jpg",
                    "rotation": -0.8,
                    "tags": ["get_well", "cheerful", "flowers"]
                }
            ],
            "categories": [
                "birthday", "sympathy", "wedding", "thank_you", "holiday", "get_well"
            ],
            "animation": {
                "duration": 0.5,
                "delay_increment": 0.1
            }
        }
        
        # Contact information
        self.contact = {
            "title": "Get in Touch",
            "info": [
                {
                    "id": "email",
                    "type": "email",
                    "icon": "FaEnvelope",
                    "value": "hello@alloccasioncards.com",
                    "label": "Email Address"
                },
                {
                    "id": "phone",
                    "type": "phone",
                    "icon": "FaPhone",
                    "value": "(555) 123-4567",
                    "label": "Phone Number"
                }
            ],
            "social_media": [
                {
                    "id": "instagram",
                    "platform": "Instagram",
                    "url": "https://instagram.com/alloccasioncards",
                    "icon": "FaInstagram"
                },
                {
                    "id": "facebook",
                    "platform": "Facebook",
                    "url": "https://facebook.com/alloccasioncards",
                    "icon": "FaFacebook"
                }
            ],
            "business_hours": {
                "monday": "9:00 AM - 6:00 PM",
                "tuesday": "9:00 AM - 6:00 PM",
                "wednesday": "9:00 AM - 6:00 PM",
                "thursday": "9:00 AM - 6:00 PM",
                "friday": "9:00 AM - 6:00 PM",
                "saturday": "10:00 AM - 4:00 PM",
                "sunday": "Closed"
            }
        }
        
        # Footer data
        self.footer = {
            "copyright": f"© {datetime.now().year} All Occasion Cards. All rights reserved.",
            "links": [
                {"text": "Privacy Policy", "url": "/privacy"},
                {"text": "Terms of Service", "url": "/terms"},
                {"text": "Shipping Info", "url": "/shipping"}
            ]
        }
        
        # Website metadata
        self.metadata = {
            "site_name": "All Occasion Cards",
            "description": "Handcrafted greeting cards for every special moment",
            "keywords": ["greeting cards", "handcrafted", "personalized", "occasions"],
            "author": "All Occasion Cards Team",
            "version": "1.0.0",
            "last_updated": datetime.now().isoformat()
        }
        
        # Theme configuration (for future frontend integration)
        self.theme = {
            "colors": {
                "primary": "#4A5568",
                "secondary": "#F7FAFC",
                "text": "#2D3748",
                "background": "#FFFFFF",
                "paper": "#FEFEFE",
                "wood": "#8B4513"
            },
            "fonts": {
                "heading": "Dancing Script",
                "body": "Quicksand"
            },
            "border_radius": {
                "small": "4px",
                "medium": "8px",
                "large": "16px"
            },
            "shadows": {
                "subtle": "0 1px 3px rgba(0,0,0,0.1)",
                "medium": "0 4px 6px rgba(0,0,0,0.1)"
            }
        }

# Initialize the data structure
website_data = WebsiteData()

# =============================================================================
# ERROR HANDLING
# =============================================================================

class APIError(Exception):
    """Custom exception for API errors with detailed information."""
    
    def __init__(self, message: str, status_code: int = 400, error_code: str = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.error_code = error_code

@app.errorhandler(APIError)
def handle_api_error(error):
    """Handle custom API errors with proper JSON response."""
    logger.error(f"API Error: {error.message} (Status: {error.status_code})")
    
    response = {
        "error": {
            "message": error.message,
            "status_code": error.status_code,
            "error_code": error.error_code,
            "timestamp": datetime.now().isoformat()
        }
    }
    
    return jsonify(response), error.status_code

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors with custom response."""
    logger.warning(f"404 Error: {request.url}")
    
    response = {
        "error": {
            "message": "Resource not found",
            "status_code": 404,
            "error_code": "NOT_FOUND",
            "timestamp": datetime.now().isoformat(),
            "requested_url": request.url
        }
    }
    
    return jsonify(response), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors with custom response."""
    logger.error(f"500 Error: {str(error)}")
    
    response = {
        "error": {
            "message": "Internal server error",
            "status_code": 500,
            "error_code": "INTERNAL_ERROR",
            "timestamp": datetime.now().isoformat()
        }
    }
    
    return jsonify(response), 500

# =============================================================================
# API ENDPOINTS
# =============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify the API is running.
    
    Returns:
        JSON response with API status and basic information
    """
    logger.info("Health check requested")
    
    try:
        response = {
            "status": "healthy",
            "message": "All Occasion Cards API is running",
            "timestamp": datetime.now().isoformat(),
            "version": website_data.metadata["version"],
            "debug_mode": app.config['DEBUG']
        }
        
        logger.debug(f"Health check response: {response}")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise APIError("Health check failed", 500, "HEALTH_CHECK_FAILED")

@app.route('/api/content', methods=['GET'])
def get_all_content():
    """
    Get all website content in a single response.
    
    Returns:
        JSON response with complete website data structure
    """
    logger.info("All content requested")
    
    try:
        response = {
            "header": website_data.header,
            "hero": website_data.hero,
            "about": website_data.about,
            "gallery": website_data.gallery,
            "contact": website_data.contact,
            "footer": website_data.footer,
            "metadata": website_data.metadata,
            "theme": website_data.theme
        }
        
        logger.debug("All content retrieved successfully")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Failed to retrieve all content: {str(e)}")
        raise APIError("Failed to retrieve content", 500, "CONTENT_RETRIEVAL_FAILED")

@app.route('/api/content/<section>', methods=['GET'])
def get_section_content(section: str):
    """
    Get content for a specific section of the website.
    
    Args:
        section (str): The section name (header, hero, about, gallery, contact, footer)
    
    Returns:
        JSON response with section-specific content
    """
    logger.info(f"Content requested for section: {section}")
    
    try:
        # Validate section name
        valid_sections = ['header', 'hero', 'about', 'gallery', 'contact', 'footer', 'metadata', 'theme']
        
        if section not in valid_sections:
            raise APIError(f"Invalid section: {section}", 400, "INVALID_SECTION")
        
        # Get section data
        section_data = getattr(website_data, section, None)
        
        if section_data is None:
            raise APIError(f"Section not found: {section}", 404, "SECTION_NOT_FOUND")
        
        response = {
            "section": section,
            "data": section_data,
            "timestamp": datetime.now().isoformat()
        }
        
        logger.debug(f"Section content retrieved: {section}")
        return jsonify(response), 200
        
    except APIError:
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve section content: {str(e)}")
        raise APIError("Failed to retrieve section content", 500, "SECTION_RETRIEVAL_FAILED")

@app.route('/api/cards', methods=['GET'])
def get_cards():
    """
    Get all cards with optional filtering.
    
    Query Parameters:
        category (str): Filter by card category
        min_price (float): Minimum price filter
        max_price (float): Maximum price filter
        tags (str): Comma-separated tags to filter by
    
    Returns:
        JSON response with filtered cards
    """
    logger.info("Cards requested with filters")
    
    try:
        # Get query parameters
        category = request.args.get('category')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        tags = request.args.get('tags', '').split(',') if request.args.get('tags') else []
        
        # Start with all cards
        cards = website_data.gallery["cards"].copy()
        
        # Apply filters
        if category:
            cards = [card for card in cards if card["category"] == category]
            logger.debug(f"Filtered by category: {category}")
        
        if min_price is not None:
            cards = [card for card in cards if card["price"] >= min_price]
            logger.debug(f"Filtered by min_price: {min_price}")
        
        if max_price is not None:
            cards = [card for card in cards if card["price"] <= max_price]
            logger.debug(f"Filtered by max_price: {max_price}")
        
        if tags and tags[0]:  # Check if tags list is not empty and first element is not empty
            cards = [card for card in cards if any(tag in card["tags"] for tag in tags)]
            logger.debug(f"Filtered by tags: {tags}")
        
        response = {
            "cards": cards,
            "total_count": len(cards),
            "filters_applied": {
                "category": category,
                "min_price": min_price,
                "max_price": max_price,
                "tags": tags if tags and tags[0] else None
            },
            "timestamp": datetime.now().isoformat()
        }
        
        logger.debug(f"Cards retrieved: {len(cards)} cards found")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Failed to retrieve cards: {str(e)}")
        raise APIError("Failed to retrieve cards", 500, "CARDS_RETRIEVAL_FAILED")

@app.route('/api/cards/<int:card_id>', methods=['GET'])
def get_card_by_id(card_id: int):
    """
    Get a specific card by its ID.
    
    Args:
        card_id (int): The unique identifier of the card
    
    Returns:
        JSON response with card details
    """
    logger.info(f"Card requested by ID: {card_id}")
    
    try:
        # Find card by ID
        card = next((c for c in website_data.gallery["cards"] if c["id"] == card_id), None)
        
        if card is None:
            raise APIError(f"Card not found with ID: {card_id}", 404, "CARD_NOT_FOUND")
        
        response = {
            "card": card,
            "timestamp": datetime.now().isoformat()
        }
        
        logger.debug(f"Card retrieved: {card['name']}")
        return jsonify(response), 200
        
    except APIError:
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve card: {str(e)}")
        raise APIError("Failed to retrieve card", 500, "CARD_RETRIEVAL_FAILED")

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """
    Get all available card categories.
    
    Returns:
        JSON response with list of categories
    """
    logger.info("Categories requested")
    
    try:
        response = {
            "categories": website_data.gallery["categories"],
            "total_count": len(website_data.gallery["categories"]),
            "timestamp": datetime.now().isoformat()
        }
        
        logger.debug("Categories retrieved successfully")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Failed to retrieve categories: {str(e)}")
        raise APIError("Failed to retrieve categories", 500, "CATEGORIES_RETRIEVAL_FAILED")

@app.route('/api/contact', methods=['GET'])
def get_contact_info():
    """
    Get contact information.
    
    Returns:
        JSON response with contact details
    """
    logger.info("Contact information requested")
    
    try:
        response = {
            "contact": website_data.contact,
            "timestamp": datetime.now().isoformat()
        }
        
        logger.debug("Contact information retrieved successfully")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Failed to retrieve contact information: {str(e)}")
        raise APIError("Failed to retrieve contact information", 500, "CONTACT_RETRIEVAL_FAILED")

# =============================================================================
# DEBUGGING AND DEVELOPMENT ENDPOINTS
# =============================================================================

@app.route('/api/debug/data', methods=['GET'])
def debug_data_structure():
    """
    Debug endpoint to inspect the complete data structure.
    Only available in debug mode.
    
    Returns:
        JSON response with complete data structure and metadata
    """
    if not app.config['DEBUG']:
        raise APIError("Debug endpoint not available in production", 403, "DEBUG_DISABLED")
    
    logger.info("Debug data structure requested")
    
    try:
        # Get all data attributes
        data_attributes = {attr: getattr(website_data, attr) for attr in dir(website_data) 
                          if not attr.startswith('_') and not callable(getattr(website_data, attr))}
        
        response = {
            "debug_info": {
                "data_structure": data_attributes,
                "app_config": {
                    "debug": app.config['DEBUG'],
                    "json_sort_keys": app.config['JSON_SORT_KEYS']
                },
                "timestamp": datetime.now().isoformat()
            }
        }
        
        logger.debug("Debug data structure retrieved")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Failed to retrieve debug data: {str(e)}")
        raise APIError("Failed to retrieve debug data", 500, "DEBUG_RETRIEVAL_FAILED")

@app.route('/api/debug/logs', methods=['GET'])
def debug_logs():
    """
    Debug endpoint to view recent application logs.
    Only available in debug mode.
    
    Returns:
        JSON response with recent log entries
    """
    if not app.config['DEBUG']:
        raise APIError("Debug endpoint not available in production", 403, "DEBUG_DISABLED")
    
    logger.info("Debug logs requested")
    
    try:
        # Read recent log entries from file
        log_entries = []
        try:
            with open('app.log', 'r') as log_file:
                # Get last 50 lines
                lines = log_file.readlines()
                log_entries = lines[-50:] if len(lines) > 50 else lines
        except FileNotFoundError:
            log_entries = ["No log file found"]
        
        response = {
            "debug_logs": {
                "recent_entries": log_entries,
                "total_entries": len(log_entries),
                "timestamp": datetime.now().isoformat()
            }
        }
        
        logger.debug("Debug logs retrieved")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Failed to retrieve debug logs: {str(e)}")
        raise APIError("Failed to retrieve debug logs", 500, "DEBUG_LOGS_RETRIEVAL_FAILED")

# =============================================================================
# APPLICATION STARTUP
# =============================================================================

@app.before_request
def log_request():
    """Log all incoming requests for debugging purposes."""
    logger.info(f"Request: {request.method} {request.url} from {request.remote_addr}")

@app.after_request
def log_response(response):
    """Log all outgoing responses for debugging purposes."""
    logger.info(f"Response: {response.status_code} for {request.method} {request.url}")
    return response

if __name__ == '__main__':
    # Log application startup
    logger.info("=" * 60)
    logger.info("All Occasion Cards Flask Backend Starting...")
    logger.info(f"Debug Mode: {app.config['DEBUG']}")
    logger.info(f"Environment: {os.environ.get('FLASK_ENV', 'development')}")
    logger.info("=" * 60)
    
    # Start the Flask development server
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=app.config['DEBUG'],
        use_reloader=True
    )
