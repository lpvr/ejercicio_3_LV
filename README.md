# Ejercicio_3_LV
Realizar una prueba de carga del servicio de login, para efectos del ejercicio, se brindará el siguiente CURL:

# Instrucciones para montar ambiente

Es necesario instalar Chocolatey que es un gestor de paquetes que nos permite instalar K6, para hacerlo en Windows abrir un PowerShell con permisos de administrador y ejecutar:

Permitir a política de ejecución

    Set-ExecutionPolicy Bypass -Scope Process -Force

Para instalar

    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; 
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

Para validar instalación

    choco -?    

La versión instalada es 2.5.1

Para instalar k6 ejecutamos 

    choco install k6

La versión instalada es v1.3.0

# Metricas 

Las métricas se pueden ver en: 

    https://grafana.com/docs/k6/latest/using-k6/metrics/reference/

# Para garantizar una prueba con parametros definidos 

Se configuran umbrales donde se define la duración mínima 1500ms, y error menor a 3%

También se configura el rate que determina las transacciones por segundo en 20TPS

# Ejemplo resultado

        scenarios: (100.00%) 1 scenario, 50 max VUs, 1m30s max duration (incl. graceful stop):
                * login_test: 20.00 iterations/s for 1m0s (maxVUs: 10-50, gracefulStop: 30s)



    █ THRESHOLDS

        http_req_duration
        ✓ 'p(95)<1500' p(95)=354.39ms

        http_req_failed
        ✗ 'rate<0.03' rate=18.12%


    █ TOTAL RESULTS

        checks_total.......: 2394   39.679842/s
        checks_succeeded...: 90.93% 2177 out of 2394
        checks_failed......: 9.06%  217 out of 2394

        ✗ status is 201
        ↳  81% — ✓ 980 / ✗ 217
        ✓ response time ≤ 1500ms

        HTTP
        http_req_duration..............: avg=340.88ms min=313.52ms med=335.99ms max=755.31ms p(90)=349.52ms p(95)=354.39ms
        { expected_response:true }...: avg=341.74ms min=314.5ms  med=336.53ms max=755.31ms p(90)=350.01ms p(95)=354.77ms
        http_req_failed................: 18.12% 217 out of 1197
        http_reqs......................: 1197   19.839921/s

        EXECUTION
        dropped_iterations.............: 4      0.066299/s
        iteration_duration.............: avg=341.58ms min=314.5ms  med=336.46ms max=835.61ms p(90)=349.78ms p(95)=354.78ms
        iterations.....................: 1197   19.839921/s
        vus............................: 6      min=6           max=10
        vus_max........................: 14     min=14          max=14

        NETWORK
        data_received..................: 674 kB 11 kB/s
        data_sent......................: 142 kB 2.3 kB/s




    running (1m00.3s), 00/14 VUs, 1197 complete and 0 interrupted iterations
    login_test ✓ [======================================] 00/14 VUs  1m0s  20.00 iters/s
    ERRO[0060] thresholds on metrics 'http_req_failed' have been crossed



