from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React app to access

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Gemini API
api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.0-flash')

# Store conversation history (in production, use a database)
conversations = []

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        logger.info(f"Received message: {user_message}")
        
        # Generate response using Gemini
        response = model.generate_content(user_message)
        bot_response = response.text.strip()
        
        # Store conversation
        conversation_entry = {
            'id': len(conversations) + 1,
            'user_message': user_message,
            'bot_response': bot_response,
            'timestamp': datetime.now().isoformat()
        }
        conversations.append(conversation_entry)
        
        logger.info(f"Generated response: {bot_response[:100]}...")
        
        return jsonify({
            'response': bot_response,
            'status': 'success',
            'timestamp': conversation_entry['timestamp']
        })
    
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': f'Failed to generate response: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'conversations_count': len(conversations)
    })

@app.route('/api/history', methods=['GET'])
def get_history():
    return jsonify({
        'conversations': conversations[-10:],  # Return last 10 conversations
        'total': len(conversations)
    })

@app.route('/api/clear-history', methods=['POST'])
def clear_history():
    global conversations
    conversations = []
    return jsonify({'status': 'success', 'message': 'History cleared'})

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(debug=True, port=5000, host='0.0.0.0')