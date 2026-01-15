from sqlalchemy import Column, String, Integer, ForeignKey, DateTime # type: ignore
from sqlalchemy.orm import relationship # type: ignore
from ..database import Base
import uuid
from datetime import datetime

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, index=True)
    age = Column(Integer, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)

    # relations
    history = relationship('UserHistoryModel', backref='user', lazy=True)


    def __repr__(self):
        return f"<User(email='{self.email}', name='{self.name}', role='{self.role}', plan='{self.plan}')>"
    
class UserHistoryModel(Base):
    __tablename__ = "user_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Simulation Metrics
    duration = Column(Integer, nullable=False, default=0) # in seconds
    violations = Column(Integer, nullable=False, default=0) # safety incidents
    traffic_count = Column(Integer, nullable=False, default=0) # total aircraft handled

    def __repr__(self):
        return f'<History {self.id} User={self.user_id}>'
