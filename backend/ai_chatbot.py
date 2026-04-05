from google import genai
from google.genai import types
from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

ai_bp = Blueprint("ai", __name__)

client = None
api_key = os.getenv("GEMINI_API_KEY")

if api_key and api_key != "your_gemini_api_key_here":
    try:
        client = genai.Client(api_key=api_key)
        print("✅ Gemini AI initialized with google-genai client")
    except Exception as e:
        print(f"❌ Error: {e}")

@ai_bp.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")
        
        if not user_message:
            return jsonify({"response": "Please enter a message."}), 400
        
        if client:
            response = client.models.generate_content(
                model="gemini-1.5-flash",
                contents=user_message
            )
            return jsonify({
                "success": True,
                "response": response.text,
                "provider": "gemini-1.5-flash"
            })
        else:
            return jsonify({
                "success": False,
                "response": "⚠️ AI not configured. Please add your Gemini API Key to .env file"
            }), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "response": f"Error: {str(e)}"
        }), 500