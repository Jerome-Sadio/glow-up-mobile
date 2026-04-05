@echo off
title Glow Up - Level Up Your Life
cls
echo ========================================================
echo          GLOW UP: LEVEL UP YOUR LIFE
echo ========================================================
echo.
echo [1/2] Starting development server...
echo.

REM Start the dev server in the background
start /B cmd /c "npm run dev" > nul 2>&1

REM Wait for the server to be ready on port 5173
echo Waiting for server to be ready on port 5173...
:WAIT_LOOP
timeout /t 2 /nobreak > nul
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 2; exit 0 } catch { exit 1 }"
if %errorlevel% neq 0 (
    echo    Still waiting...
    goto WAIT_LOOP
)

echo.
echo Server is ready!
echo.
echo [2/2] Opening Microsoft Edge...
start microsoft-edge:http://localhost:5173

echo.
echo ========================================================
echo   App is running at: http://localhost:5173
echo   Press Ctrl+C or close this window to stop the server.
echo ========================================================
echo.

REM Keep the window open so the server keeps running
cmd /k "npm run dev"
