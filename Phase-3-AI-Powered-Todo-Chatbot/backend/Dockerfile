# Use the centralized Dockerfile for backend

# This is a reference Dockerfile that uses the centralized version
# See docker/Dockerfile.backend for the actual implementation
# To build: docker build -f docker/Dockerfile.backend -t todo-backend .
# This file exists for convenience and standard project structure

FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 7860

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]