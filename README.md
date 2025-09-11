# 🧪 AutomaTicket - Proyecto de Automatización QA

![Cypress](https://img.shields.io/badge/Cypress-12.13.0-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)

Repositorio para la automatización de pruebas del sitio web [Ticketazo.com.ar](https://ticketazo.com.ar), desarrollado como trabajo final del curso de Automatizaciones QA.

## 📋 Descripción del Proyecto

Este proyecto contiene los tests automatizados para la plataforma de venta de entradas Ticketazo, implementados con Cypress y JavaScript. El objetivo es validar los flujos críticos y funcionalidades principales del sitio web.

## 🚀 Características

- ✅ Tests E2E (End-to-End) para los flujos principales
- ✅ Pruebas de regresión visual
- ✅ Validación de funcionalidades críticas
- ✅ Configuración de entornos (desarrollo, producción)
- ✅ Reportes de ejecución de pruebas
- ✅ Integración con GitHub Actions (CI/CD)

## 🛠️ Tecnologías Utilizadas

- **Cypress**: Framework de testing E2E
- **JavaScript**: Lenguaje de programación
- **Node.js**: Entorno de ejecución
- **Mocha**: Framework de testing para estructura de tests
- **Chai**: Biblioteca de aserciones

## 📁 Estructura del Proyecto

```
cypress-automation-ticketazo/
├── cypress/
│   ├── e2e/                 # Tests de extremo a extremo
│   ├── fixtures/            # Datos de prueba
│   ├── pages/               # Page Objects Model
│   ├── support/             # Comandos personalizados y configuración
│   └── downloads/           # Archivos descargados durante las pruebas
├── reports/                 # Reportes de ejecución
├── cypress.config.js        # Configuración principal de Cypress
├── package.json             # Dependencias y scripts del proyecto
└── README.md               # Este archivo
```

## ⚙️ Requisitos Previos

- Node.js (versión 16 o superior)
- npm (generalmente incluido con Node.js)
- Navegador Chrome, Firefox o Edge

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd cypress-automation-ticketazo
```

2. Instala las dependencias:
```bash
npm install
```

## 🎯 Ejecución de Tests

### Ejecutar todos los tests en modo headless:
```bash
npm test
```

### Ejecutar tests en modo interactivo:
```bash
npm run cy:open
```

### Ejecutar tests específicos:
```bash
npx cypress run --spec "cypress/e2e/login.spec.js"
```

### Ejecutar tests en un navegador específico:
```bash
npx cypress run --browser chrome
```

## 📊 Generación de Reportes

El proyecto incluye configuración para generar reportes en formato HTML y JSON:

```bash
npm run test:report
```

Los reportes se guardarán en la carpeta `reports/`.

## 🧩 Casos de Prueba Implementados

- ✅ Flujo de registro de usuario
- ✅ Inicio de sesión y cierre de sesión
- ✅ Búsqueda y filtrado de eventos
- ✅ Selección y compra de tickets
- ✅ Proceso de checkout y pago
- ✅ Gestión del carrito de compras
- ✅ Validación de responsive design

## 🤝 Contribución

Para contribuir a este proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas del Curso

Este proyecto fue desarrollado como trabajo final del curso de Automatizaciones QA, demostrando las habilidades adquiridas en:

- Configuración de entornos de testing
- Implementación de patrones de diseño (Page Object Model)
- Creación de casos de prueba automatizados
- Generación de reportes y documentación
- Integración con CI/CD

## 📧 Contacto

Para cualquier consulta sobre este proyecto, puedes contactarme a través de:
- Email: [tu-email@ejemplo.com]
- LinkedIn: [tu perfil de LinkedIn]

## 📄 Licencia

Este proyecto es de uso educativo como parte del curso de Automatizaciones QA.

---

**Nota**: Este proyecto es para fines educativos y de demostración de habilidades en automatización de pruebas.
