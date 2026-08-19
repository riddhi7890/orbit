from fastapi import FastAPI

app = FastAPI(title="ORBIT API")


@app.get("/")
def root():
    return {
        "message": "ORBIT Backend is running"
    }