INSERT INTO templates (name, tx_id, description, template_type_id, template_definition, created_by, is_active, is_public) VALUES 
('Reporte de Ventas Mensuales', NULL, 'Una plantilla para generar un reporte detallado de ventas por mes.', 1, E'{"title": "Reporte de Ventas", "header": "Periodo: {{start_date}} a {{end_date}}", "body": "Tabla de ventas...", "format_version": "1.0"}', 1, TRUE, TRUE),
('Resumen de Inventario', 'tx_abc-123', 'Un resumen de los niveles de inventario actuales y las proximas ordenes.', 2, E'{"title": "Resumen de Inventario", "content": "<h1>Resumen del inventario</h1><p>Ultima actualizacion: {{current_date}}</p><div id=\\"inventory_table\\">...</div>"}', 1, TRUE, FALSE),
('Ficha de Cliente', NULL, 'Una plantilla simple para generar una ficha de cliente con informacion de contacto y historial.', 1, E'{"title": "Ficha del Cliente: {{client_name}}", "data": {"client": "{{client_info}}", "history": "{{transaction_history}}"}}', 1, TRUE, TRUE),
('Informe Anual de Gastos', 'tx_xyz-456', 'Plantilla para un reporte anual de los gastos de la compania.', 3, E'{"title": "Informe Anual de Gastos", "sections": [{"title": "Resumen Ejecutivo", "content": "..."}, {"title": "Detalle de Gastos", "content": "..."}]}', 1, FALSE, TRUE),
('Reporte de Marketing', NULL, 'Reporte HTML para visualizar el rendimiento de las campanas de marketing.', 2, E'{"title": "Reporte de Campanas de Marketing", "chart_data": "{{chart_data}}", "performance_metrics": "{{metrics}}"}', 1, TRUE, FALSE),
('Plantilla Desactivada', NULL, 'Una plantilla que no esta activa y no deberia ser usada para nuevos reportes.', 1, E'{"title": "Plantilla Inactiva", "body": "Esta plantilla esta marcada como inactiva."}', 1, FALSE, FALSE);



--
-- Mock data para la tabla 'reports'
--
-- Los report_status_id corresponden a los IDs de la tabla report_status:
-- 1: COMPLETED
-- 2: PENDING
-- 3: GENERATING
-- 4: ERROR
-- 5: CANCELLED
-- 6: FAILED
--
-- Todos los user_id se establecen en 1, como se solicito.
-- Los template_id hacen referencia a los IDs de los templates creados arriba.
-- Nota: 'id' es de tipo UUID y se genera automaticamente.

INSERT INTO reports (title, description, report_url, status_details, generation_params, user_id, template_id, report_status_id, completed_at) VALUES
('Reporte de Ventas Enero 2024', 'Reporte mensual de ventas del 2024.', '/reports/jan-sales-report.pdf', NULL, '{"start_date": "2024-01-01", "end_date": "2024-01-31"}', 1, 1, 1, NOW()),
('Inventario Q1 2024', 'Resumen del inventario para el primer trimestre.', '/reports/q1-inventory.html', NULL, '{"quarter": 1, "year": 2024}', 1, 2, 1, NOW()),
('Ficha de Cliente: Juan Perez', 'Ficha completa del cliente Juan Perez.', '/reports/client-juanperez.pdf', NULL, '{"client_id": 12345}', 1, 3, 1, NOW()),
('Reporte de Marketing Mensual', 'Reporte de rendimiento de marketing para el mes de febrero.', '/reports/feb-marketing.html', NULL, '{"campaign_id": "camp_abc", "period": "2024-02"}', 1, 5, 1, NOW()),
('Informe Anual 2023', 'Informe de gastos anual en formato DOCX.', '/reports/annual-report-2023.docx', NULL, '{"year": 2023}', 1, 4, 1, NOW()),
('Reporte de Ventas Febrero 2024', 'Reporte de ventas en espera de generacion.', NULL, NULL, '{"start_date": "2024-02-01", "end_date": "2024-02-29"}', 1, 1, 2, NULL),
('Reporte en Generacion', 'Reporte que actualmente se esta procesando.', NULL, NULL, '{"some_param": "value"}', 1, 2, 3, NULL),
('Reporte con Error', 'Reporte que fallo durante el proceso de generacion.', NULL, 'Error: No se pudo conectar al servicio de datos.', '{"invalid_param": "fail"}', 1, 3, 4, NOW()),
('Reporte con Error (Fallido)', 'Reporte que fallo durante el proceso de generacion.', NULL, 'Error: El microservicio de reportes no respondio a tiempo.', '{"invalid_param": "fail"}', 1, 4, 6, NOW()),
('Reporte Cancelado', 'Un reporte que el usuario cancelo antes de que terminara.', NULL, 'Cancelado por el usuario.', '{"request_id": "cancel_123"}', 1, 5, 5, NULL);
