# GenAI-App

This is a web-based chat application that allows users to interact with several Large Language Models (LLMs). The application features a user authentication system, a chat interface for sending messages to AI models, and the ability to select from different models like Llama 3, Granite, and Mixtral.

## Features

- **User Authentication**: Secure user signup and login functionality.
- **Chat Interface**: A user-friendly interface to send and receive messages from AI models.
- **Model Selection**: Easily switch between different LLMs (Llama 3, Granite, and Mixtral).
- **AI-Generated Responses**: The application displays detailed responses from the AI, including a summary of the user's message, a sentiment score, and a suggested response.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend**:
  - [Python](https://www.python.org/)
  - [Flask](https://flask.palletsprojects.com/)
  - [LangChain](https://www.langchain.com/)
  - [IBM Watsonx](https://www.ibm.com/watsonx)

- **Database**:
  - [MongoDB](https://www.mongodb.com/) (inferred from the use of `mongoose`)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Python](https://www.python.org/downloads/) (v3.9 or later)
- [pip](https://pip.pypa.io/en/stable/installation/) (comes with Python)

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup

1.  **Navigate to the Backend Directory**:
    ```bash
    cd Backend
    ```

2.  **Create and Activate a Virtual Environment**:
    - For macOS/Linux:
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```
    - For Windows:
      ```bash
      python -m venv venv
      .\venv\Scripts\activate
      ```

3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment Variables**:
    Open `Backend/config.py` and replace the placeholder values for `project_id` and `watsonx_api_key` with your actual IBM Watsonx credentials.

5.  **Run the Backend Server**:
    ```bash
    python app.py
    ```
    The backend server will be running on `http://127.0.0.1:5000`.

### 3. Frontend Setup

1.  **Navigate to the Root Directory**:
    (If you are in the `Backend` directory, go back one level)
    ```bash
    cd ..
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the Frontend Development Server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Project Structure

```
.
├── Backend/
│   ├── app.py              # Flask application
│   ├── model.py            # AI model logic with LangChain and Watsonx
│   ├── config.py           # Backend configuration
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── app/
│   │   ├── api/            # API routes for authentication and chat
│   │   ├── chat/           # Chat page components
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   └── components/         # Shared React components
├── package.json            # Frontend dependencies and scripts
└── README.md               # This file
```