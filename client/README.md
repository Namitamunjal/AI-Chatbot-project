# AI Chatbot Project

This is a full-stack AI Chatbot project built using React for the frontend and Flask for the backend, with Tailwind CSS for styling.

---

## Project Structure

```
.
├── backend/
│   ├── venv/
│   ├── app.py
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── Chatbot.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## Tech Stack

* **Frontend**: React, Tailwind CSS v3
* **Backend**: Flask, Python
* **Styling**: Tailwind CSS
* **API**: OpenAI or Gemini API

---

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Backend Setup

1.  **Navigate to the backend folder**:
    ```bash
    cd backend
    ```

2.  **Create a virtual environment**:
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment**:
    * **Windows**:
        ```bash
        venv\Scripts\activate
        ```
    * **Unix/macOS**:
        ```bash
        source venv/bin/activate
        ```

4.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Create a `.env` file**:
    Create a file named `.env` in the `backend/` directory and add your API key:
    ```
    API_KEY=your_openai_or_gemini_api_key
    ```

6.  **Run Flask server**:
    ```bash
    python app.py
    ```

### Frontend Setup

1.  **Navigate to the frontend folder**:
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Ensure Tailwind v3 config is correct**:
    Verify the following files have the correct Tailwind CSS configuration:

    * **`tailwind.config.js`**:
        ```javascript
        module.exports = {
          content: ["./src/**/*.{js,jsx}"],
          theme: {
            extend: {},
          },
          plugins: [],
        }
        ```

    * **`postcss.config.js`** (create this file if it doesn't exist in the frontend root):
        ```javascript
        module.exports = {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        }
        ```

    * **`src/index.css`**:
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

4.  **Start frontend development server**:
    ```bash
    npm start
    ```

---

## Integration

* Ensure your backend is running on `http://localhost:5000`.
* To simplify API calls from the frontend, add a `proxy` entry to your `frontend/package.json` file:

    ```json
    "proxy": "http://localhost:5000"
    ```

---

## Testing

1.  Open your browser and navigate to `http://localhost:3000`.
2.  Test the chatbot interaction by sending messages.
3.  Monitor your backend console for request logs to ensure proper communication.

---

## Deployment

### Backend

You can deploy the backend to platforms like:

* Render
* Heroku
* Railway

### Frontend

You can deploy the frontend to platforms like:

* Vercel
* Netlify
* GitHub Pages

---

## Notes

* Always keep your `.env` file private and do not commit it to version control.
* This project uses Tailwind CSS version 3.
* For the best performance and experience, use modern web browsers.

---

## Contribution

Feel free to open issues or pull requests to contribute to the project or suggest changes.

---

## License

This project is licensed under the MIT License.