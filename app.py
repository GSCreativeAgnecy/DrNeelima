from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates

# Import database
from database import Base, engine
import models  # noqa: F401 — register models with SQLAlchemy before create_all

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Dr. Neelima Talari", description="Obstetrician & Gynecologist")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Import and include routers
from routes.main import router as main_router
from routes.appointments import router as appointment_router

app.include_router(main_router)
app.include_router(appointment_router)


@app.exception_handler(404)
async def not_found(request, exc):
    from fastapi.responses import HTMLResponse
    from fastapi.templating import Jinja2Templates

    templates = Jinja2Templates(directory="templates")
    return templates.TemplateResponse("404.html", {"request": request}, status_code=404)
