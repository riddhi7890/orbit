from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.waste import router as waste_router
from app.routes.bins import router as bins_router
from app.routes.sensors import router as sensors_router
from app.routes.dashboard import router as dashboard_router
from app.routes.recommendations import router as recommendations_router
from app.routes.recovery import router as recovery_router
from app.routes.collection import router as collection_router
from app.routes.recovery_records import router as recovery_records_router


app = FastAPI(title="ORBIT API")


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API routers
app.include_router(waste_router)
app.include_router(bins_router)
app.include_router(sensors_router)
app.include_router(dashboard_router)
app.include_router(recommendations_router)
app.include_router(recovery_router)
app.include_router(collection_router)
app.include_router(recovery_records_router)


@app.get("/")
def root():
    return {
        "message": "ORBIT Backend is running"
    }