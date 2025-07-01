# 1. Use the official Python image
FROM python:3.10

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy all project files into the container
COPY . .

# 4. Install all required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# 5. Run the Flask app
CMD ["python", "main.py"]
