// Sistema de Gestión Militar - FAR
// Aplicación Web para Institución Militar Cubana

// Actualizar fecha y hora en tiempo real
function updateDateTime() {
    const now = new Date();
    
    // Formato de fecha en español
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('es-ES', options);
    
    // Formato de hora
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    
    if (dateElement) {
        dateElement.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Navegación entre secciones
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Añadir clase active al enlace clickeado
            this.classList.add('active');
            
            // Ocultar todas las secciones
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostrar la sección correspondiente
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Guardar en localStorage para persistencia
            localStorage.setItem('currentSection', targetId);
        });
    });
    
    // Restaurar sección guardada
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
        const targetLink = document.querySelector(`a[href="#${savedSection}"]`);
        if (targetLink) {
            navLinks.forEach(nav => nav.classList.remove('active'));
            targetLink.classList.add('active');
            
            sections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(savedSection);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }
    }
}

// Función de logout
function logout() {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
        // Limpiar datos de sesión
        localStorage.removeItem('currentSection');
        sessionStorage.clear();
        
        // Redirigir a página de login (simulado)
        alert('Sesión cerrada correctamente. Redirigiendo...');
        window.location.reload();
    }
}

// Manejo del formulario de mensajes
function setupMessageForm() {
    const form = document.querySelector('.message-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const recipient = document.getElementById('recipient').value;
            const priority = document.getElementById('priority').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!recipient || !subject || !message) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            // Simular envío de mensaje encriptado
            console.log('Enviando mensaje encriptado:', {
                recipient,
                priority,
                subject,
                message,
                timestamp: new Date().toISOString()
            });
            
            // Mostrar confirmación
            alert(`Mensaje ${priority.toUpperCase()} enviado exitosamente a ${recipient}\n\nAsunto: ${subject}`);
            
            // Limpiar formulario
            form.reset();
        });
    }
}

// Funcionalidad de búsqueda y filtros
function setupFilters() {
    const searchInput = document.querySelector('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterTable(searchTerm, filterSelects);
        });
    }
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterTable(searchTerm, filterSelects);
        });
    });
}

function filterTable(searchTerm, filters) {
    const table = document.querySelector('#personal .data-table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    const gradoFilter = filters[0]?.value.toLowerCase() || '';
    const unidadFilter = filters[1]?.value.toLowerCase() || '';
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const nombre = cells[1]?.textContent.toLowerCase() || '';
        const grado = cells[2]?.textContent.toLowerCase() || '';
        const unidad = cells[3]?.textContent.toLowerCase() || '';
        
        const matchesSearch = !searchTerm || 
            nombre.includes(searchTerm) || 
            grado.includes(searchTerm) || 
            unidad.includes(searchTerm);
        
        const matchesGrado = !gradoFilter || grado.includes(gradoFilter);
        const matchesUnidad = !unidadFilter || unidad.includes(unidadFilter);
        
        if (matchesSearch && matchesGrado && matchesUnidad) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Simulación de actualizaciones en tiempo real
function simulateRealTimeUpdates() {
    // Actualizar estadísticas aleatoriamente para demostración
    setInterval(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length > 0) {
            // Solo para demostración visual
            console.log('Actualizando estadísticas en tiempo real...');
        }
    }, 30000); // Cada 30 segundos
}

// Notificaciones push simuladas
function checkNotifications() {
    const notifications = [
        {
            type: 'urgent',
            title: 'Nuevo Mensaje del Comando',
            message: 'Se requiere confirmación de recibido',
            time: 'Ahora'
        }
    ];
    
    // Verificar notificaciones cada minuto
    setInterval(() => {
        console.log('Verificando nuevas notificaciones...');
        // En una implementación real, esto haría una petición AJAX
    }, 60000);
}

// Inicialización de la aplicación
function initApp() {
    console.log('Inicializando Sistema de Gestión Militar FAR v2.5.1');
    
    // Actualizar fecha y hora inmediatamente
    updateDateTime();
    
    // Configurar actualización de fecha/hora cada segundo
    setInterval(updateDateTime, 1000);
    
    // Configurar navegación
    setupNavigation();
    
    // Configurar formulario de mensajes
    setupMessageForm();
    
    // Configurar filtros
    setupFilters();
    
    // Iniciar actualizaciones en tiempo real
    simulateRealTimeUpdates();
    
    // Iniciar verificación de notificaciones
    checkNotifications();
    
    // Marcar mensajes como leídos al hacer click
    const messageItems = document.querySelectorAll('.message-item.unread');
    messageItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });
    
    console.log('Sistema inicializado correctamente');
    console.log('Usuario autenticado: Capitán Juan Pérez Rodríguez');
    console.log('Nivel de acceso: CONFIDENCIAL');
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initApp);

// Service Worker para funcionalidad offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('ServiceWorker registrado:', registration.scope);
        // }).catch(error => {
        //     console.log('ServiceWorker falló:', error);
        // });
    });
}

// Exportar funciones para uso global
window.logout = logout;
window.updateDateTime = updateDateTime;
