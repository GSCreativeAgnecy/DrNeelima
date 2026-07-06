from pydantic import BaseModel, Field, EmailStr
from datetime import date


class AppointmentCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=1, le=150)
    phone: str = Field(..., min_length=10, max_length=20)
    email: str = Field(..., max_length=100)
    appointment_date: date
    preferred_time: str = Field(..., pattern=r"^\d{2}:\d{2}$")
    reason: str = Field(..., min_length=5, max_length=500)


class AppointmentResponse(BaseModel):
    id: int
    full_name: str
    appointment_date: date
    preferred_time: str

    model_config = {"from_attributes": True}
