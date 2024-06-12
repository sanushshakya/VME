# Use an official Python runtime as a parent image
FROM python:3.11

# Set environment variables for Flask and Beanie
ENV PYTHONUNBUFFERED 1
ENV FASTAPI_ENV production

# Set the working directory in the container to /app
WORKDIR /app

# Copy the virtual environment from your host machine into the container
COPY venv/ venv/

# Copy the rest of your FastAPI project files into the container
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Expose the port that the application will run on
EXPOSE 8000

# Define the command to run your FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
