#!/bin/bash

# Job Application Automation Script
# Usage: ./job_automation.sh "Company Name" "Position" "Location" "Website"

# Configuration - UPDATE THESE PATHS AND KEYS
BASE_FOLDER="$HOME/Work/09_Portfolio 2025/Companies"
RESUME_TEMPLATE="$HOME/Work/CV/EN_resume.pdf"
COVER_LETTER_TEMPLATE="$HOME/Work/CV/EN_motivation.pdf"
KEYNOTE_TEMPLATE="$HOME/Work/CV/Slideshow_template.key"
NOTION_API_KEY="your_notion_api_key_here" # https://www.notion.so/profile/integrations
NOTION_DATABASE_ID="your_notion_database_id_here" # https://api.notion.com/v1/databases/{database_id}
OPENAI_API_KEY="your_openai_api_key_here" # https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key

# Input validation
if [ $# -lt 1 ]; then
    echo "Usage: $0 \"Company Name\" [Position] [Location] [Website]"
    echo "Example: $0 \"Apple Inc\" \"Software Engineer\" \"Cupertino, CA\" \"https://apple.com\""
    exit 1
fi

COMPANY_NAME="$1"
POSITION="${2:-Software Engineer}"
LOCATION="${3:-TBD}"
WEBSITE="${4:-}"

echo "🚀 Starting job application setup for: $COMPANY_NAME"

# 1. Create company folder
COMPANY_FOLDER="$BASE_FOLDER/$COMPANY_NAME"
echo "📁 Creating folder: $COMPANY_FOLDER"

if [ ! -d "$COMPANY_FOLDER" ]; then
    mkdir -p "$COMPANY_FOLDER"
    echo "✅ Folder created successfully"
else
    echo "⚠️  Folder already exists"
fi

# 2. Copy resume and cover letter
echo "📄 Copying documents..."

if [ -f "$RESUME_TEMPLATE" ]; then
    cp "$RESUME_TEMPLATE" "$COMPANY_FOLDER/resume_${COMPANY_NAME// /_}.pdf"
    echo "✅ Resume copied"
else
    echo "❌ Resume template not found at: $RESUME_TEMPLATE"
fi

if [ -f "$COVER_LETTER_TEMPLATE" ]; then
    cp "$COVER_LETTER_TEMPLATE" "$COMPANY_FOLDER/cover_letter_${COMPANY_NAME// /_}.docx"
    echo "✅ Cover letter copied"
else
    echo "❌ Cover letter template not found at: $COVER_LETTER_TEMPLATE"
fi

# 3. Copy Keynote presentation
echo "🎯 Copying Keynote presentation..."

if [ -f "$KEYNOTE_TEMPLATE" ]; then
    cp -r "$KEYNOTE_TEMPLATE" "$COMPANY_FOLDER/presentation_${COMPANY_NAME// /_}.key"
    echo "✅ Keynote presentation copied"
else
    echo "❌ Keynote template not found at: $KEYNOTE_TEMPLATE"
fi

# 4. Add entry to Notion (requires valid API key and database ID)
echo "📝 Adding entry to Notion..."

if [ "$NOTION_API_KEY" != "your_notion_api_key_here" ] && [ "$NOTION_DATABASE_ID" != "your_notion_database_id_here" ]; then
    NOTION_PAYLOAD=$(cat <<EOF
{
  "parent": { "database_id": "$NOTION_DATABASE_ID" },
  "properties": {
    "Company": {
      "title": [
        {
          "text": {
            "content": "$COMPANY_NAME"
          }
        }
      ]
    },
    "Position": {
      "rich_text": [
        {
          "text": {
            "content": "$POSITION"
          }
        }
      ]
    },
    "Location": {
      "rich_text": [
        {
          "text": {
            "content": "$LOCATION"
          }
        }
      ]
    },
    "Website": {
      "url": "$WEBSITE"
    },
    "Status": {
      "select": {
        "name": "To Apply"
      }
    },
    "Date Added": {
      "date": {
        "start": "$(date +%Y-%m-%d)"
      }
    }
  }
}
EOF
)

    curl -X POST "https://api.notion.com/v1/pages" \
        -H "Authorization: Bearer $NOTION_API_KEY" \
        -H "Content-Type: application/json" \
        -H "Notion-Version: 2022-06-28" \
        -d "$NOTION_PAYLOAD" \
        > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo "✅ Notion entry created"
    else
        echo "❌ Failed to create Notion entry"
    fi
else
    echo "⚠️  Skipping Notion integration (API key not configured)"
fi

# 5. Generate company research file using ChatGPT
echo "🔍 Generating company research..."

if [ "$OPENAI_API_KEY" != "your_openai_api_key_here" ] && [ -n "$WEBSITE" ]; then
    RESEARCH_PROMPT="Provide a brief company research summary for $COMPANY_NAME. Include: company size, main products/services, recent news, company culture, and key facts that would be useful for a job interview. Keep it concise and factual."
    
    OPENAI_PAYLOAD=$(cat <<EOF
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "$RESEARCH_PROMPT"
    }
  ],
  "max_tokens": 500,
  "temperature": 0.7
}
EOF
)

    RESEARCH_RESPONSE=$(curl -s -X POST "https://api.openai.com/v1/chat/completions" \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -H "Content-Type: application/json" \
        -d "$OPENAI_PAYLOAD")

    if [ $? -eq 0 ]; then
        # Extract the content from the JSON response (requires jq for proper parsing)
        # For now, we'll create a basic research file
        cat > "$COMPANY_FOLDER/company_research.txt" <<EOF
Company Research: $COMPANY_NAME
Generated on: $(date)
Position: $POSITION
Location: $LOCATION
Website: $WEBSITE

=== Research Notes ===
[AI-generated research would appear here]

=== Interview Preparation ===
- Company mission and values
- Recent company news
- Key products/services
- Company culture insights

=== Questions to Ask ===
- What does success look like in this role?
- What are the biggest challenges facing the team?
- How does the company measure employee growth?

EOF
        echo "✅ Company research file created"
    else
        echo "❌ Failed to generate company research"
    fi
else
    echo "⚠️  Skipping company research (OpenAI API key not configured or no website provided)"
fi

# 6. Open the folder in Finder
echo "📂 Opening folder in Finder..."
open "$COMPANY_FOLDER"

echo ""
echo "🎉 Job application setup complete for $COMPANY_NAME!"
echo "📁 Files created in: $COMPANY_FOLDER"