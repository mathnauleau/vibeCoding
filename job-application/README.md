![Example](example.png)

# Job Application script

## Purpose
Applying to a new job has a lot of redundant steps. This project aims to automate some parts of the process so the user can more quickly focus on the preparing the interview.
The bash script performs the following actions:
- Create a new folder in a specific location in the Finder (mac) and rename it with the name of a company
- Duplicate a resume and motivation letter into this new folder
- Duplicate a Keynote file into this new folder
- Add a new entry in Notion based on the company name (and add location, position, website etc).
- Generate a text file with company facts and figure, based on a Chat-GPT prompt.

## How is works
The bash script:
- Takes a company name as input
- Uses macOS command-line tools (mkdir, cp, curl)
- Integrates with APIs (Notion, OpenAI)
- Handles file paths and organization

## Execute the script
Here is what to run in the CLI to execute and run the script:

```bash 
chmod +x job_automation.sh
./job_automation.sh "Apple Inc" "iOS Developer" "Cupertino, CA" "https://apple.com"
```