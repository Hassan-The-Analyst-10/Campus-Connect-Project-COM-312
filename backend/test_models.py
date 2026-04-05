import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("❌ No API key found in .env file")
    exit(1)

genai.configure(api_key=api_key)

print("🔍 Available Gemini models for your API key:\n")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"  ✅ {model.name}")

print("\n💡 Recommended models:")
print("  - gemini-1.5-flash (fast, good for chat)")
print("  - gemini-1.5-pro (more powerful, slightly slower)")