@echo off
echo ========================================================
echo   Starting Social Media Reach Analysis System...
echo ========================================================
echo.

set PROJECT_DIR=%~dp0
set PYTHON_EXE=C:\Users\venug\anaconda3\python.exe

echo [1/2] Starting FastAPI Backend on port 8000...
start "ReachAI - Backend (Port 8000)" cmd /k "cd /d %PROJECT_DIR% && %PYTHON_EXE% -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/2] Starting Next.js Frontend on port 3000...
start "ReachAI - Frontend (Port 3000)" cmd /k "cd /d %PROJECT_DIR%frontend && npm.cmd run dev"

echo.
echo ========================================================
echo   Both servers launched successfully!
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:8000
echo   API Docs:  http://localhost:8000/docs
echo ========================================================
echo.
timeout /t 5 >nul
start http://localhost:3000
