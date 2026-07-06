from sqlalchemy import Column, Integer, String, Date, Time, Text, DateTime, func

from database import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False)
    appointment_date = Column(Date, nullable=False)
    preferred_time = Column(String(20), nullable=False)
    reason = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
