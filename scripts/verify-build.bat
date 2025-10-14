@echo off
REM Script de verificación de build para Windows
REM Este script verifica que el build sea exitoso antes del deployment

echo 🔨 Iniciando verificación de build...

REM Limpiar build anterior
echo 🧹 Limpiando build anterior...
if exist dist rmdir /s /q dist

REM Instalar dependencias
echo 📦 Instalando dependencias...
yarn install --frozen-lockfile
if %errorlevel% neq 0 (
    echo ❌ ERROR: Fallo en instalación de dependencias
    exit /b 1
)

REM Ejecutar linter
echo 🔍 Ejecutando linter...
yarn lint
if %errorlevel% neq 0 (
    echo ❌ ERROR: Linter encontró problemas
    exit /b 1
)

REM Ejecutar tests
echo 🧪 Ejecutando tests...
yarn test
if %errorlevel% neq 0 (
    echo ❌ ERROR: Tests fallaron
    exit /b 1
)

REM Construir aplicación
echo 🏗️ Construyendo aplicación...
yarn build
if %errorlevel% neq 0 (
    echo ❌ ERROR: Build falló
    exit /b 1
)

REM Verificar que el build fue exitoso
echo ✅ Verificando artefactos de build...

if not exist dist (
    echo ❌ ERROR: Directorio 'dist' no encontrado
    exit /b 1
)

if not exist dist\main.js (
    echo ❌ ERROR: Archivo 'dist\main.js' no encontrado
    exit /b 1
)

REM Contar archivos JS en dist
for /f %%i in ('dir /s /b dist\*.js ^| find /c /v ""') do set file_count=%%i
echo 📁 Archivos JavaScript generados: %file_count%

if %file_count% equ 0 (
    echo ❌ ERROR: No se generaron archivos JavaScript
    exit /b 1
)

echo ✅ Build verificado exitosamente!
echo 🚀 Listo para deployment

REM Mostrar estructura del build
echo 📋 Estructura del build:
dir dist /s