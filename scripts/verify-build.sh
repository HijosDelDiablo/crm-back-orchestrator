#!/bin/bash

# Script de verificación de build
# Este script verifica que el build sea exitoso antes del deployment

set -e  # Salir inmediatamente si cualquier comando falla

echo "🔨 Iniciando verificación de build..."

# Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf dist/

# Instalar dependencias
echo "📦 Instalando dependencias..."
yarn install --frozen-lockfile

# Ejecutar linter
echo "🔍 Ejecutando linter..."
yarn lint

# Ejecutar tests
echo "🧪 Ejecutando tests..."
yarn test

# Construir aplicación
echo "🏗️ Construyendo aplicación..."
yarn build

# Verificar que el build fue exitoso
echo "✅ Verificando artefactos de build..."

if [ ! -d "dist" ]; then
    echo "❌ ERROR: Directorio 'dist' no encontrado"
    exit 1
fi

if [ ! -f "dist/main.js" ]; then
    echo "❌ ERROR: Archivo 'dist/main.js' no encontrado"
    exit 1
fi

# Verificar que el archivo principal no esté vacío
if [ ! -s "dist/main.js" ]; then
    echo "❌ ERROR: 'dist/main.js' está vacío"
    exit 1
fi

# Contar archivos en dist
file_count=$(find dist -type f -name "*.js" | wc -l)
echo "📁 Archivos JavaScript generados: $file_count"

if [ $file_count -eq 0 ]; then
    echo "❌ ERROR: No se generaron archivos JavaScript"
    exit 1
fi

echo "✅ Build verificado exitosamente!"
echo "🚀 Listo para deployment"

# Mostrar estructura del build
echo "📋 Estructura del build:"
tree dist/ 2>/dev/null || find dist -type f -name "*.js" | head -10