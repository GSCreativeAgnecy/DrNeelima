from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import get_db
from models import Appointment
from schemas import AppointmentCreate

router = APIRouter()


@router.post("/api/appointments")
async def book_appointment(
    request: Request,
    data: AppointmentCreate,
    db: Session = Depends(get_db),
):
    try:
        appointment = Appointment(
            full_name=data.full_name,
            age=data.age,
            phone=data.phone,
            email=data.email,
            appointment_date=data.appointment_date,
            preferred_time=data.preferred_time,
            reason=data.reason,
        )
        db.add(appointment)
        db.commit()
        db.refresh(appointment)

        return JSONResponse(
            content={
                "success": True,
                "message": "Appointment booked successfully!",
                "appointment_id": appointment.id,
            },
            status_code=200,
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
